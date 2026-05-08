import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Volume2, VolumeX, History as HistoryIcon, Plus, Trash2, X, MessageSquare, Mic, MicOff, Skull } from 'lucide-react';
import { Language, ThemeType } from '../types';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

interface ChatSession {
  id: string;
  title: string;
  timestamp: number;
  messages: ChatMessage[];
  apiHistory: any[];
}

const STORAGE_KEY = 'jubilean_ai_chats';

const SYSTEM_PROMPT = (lang: Language, theme: ThemeType, stats: { energy: number; weather: any; location: any; locationName: string | null; locationStatus: string }) => {
  let persona = `You are the "Iron Assistant," adopting the persona of Daenerys Targaryen, Mother of Dragons.`;
  if (theme === 'harry_potter') persona = `You are the "Magical Assistant," adopting the persona of a wise Professor from Hogwarts.`;
  if (theme === 'solo_leveling') persona = `You are the "System Architect," adopting the cold, strategic persona of the System from Solo Leveling.`;
  if (theme === 'fc_mobile') persona = `You are the "Club Manager," adopting a professional, high-energy football manager persona.`;
  if (theme === 'rpg') persona = `You are the "Guild Master," adopting a classic fantasy RPG quest-giver persona.`;
  if (theme === 'normal') persona = `You are a helpful and polite smart home AI assistant.`;

  return `${persona}
The project was built by the honorable students of Govt. Jubilee High School.
The project is called "Smart Energy Saving AI House Powered by Jubileans."
Your goal is to answer questions about the project, daily tasks, and protecting the realm/home from disasters.

Current Language: ${lang.toUpperCase()}. You MUST respond in ${lang}.

Live Data:
- Current Energy Produced: ${stats.energy.toFixed(2)} kW
- Current Weather: ${stats.weather ? `${stats.weather.temp}°C, ${stats.weather.condition}, Wind: ${stats.weather.windSpeed} km/h` : 'Unknown'}
- Location: ${stats.locationName || 'Sunamganj, Bangladesh'}

Safety Priorities:
1. Human life first.
2. Immediate actions for disasters (Earthquake, Flood, Fire).
3. Clear, simple instructions.

Tone: Match your persona. Stay focused on protection and efficiency.`;
};

interface AIAssistantProps {
  language: Language;
  energy: number;
  weather: { temp: number; condition: string; windSpeed: number } | null;
  location: { lat: number; lon: number } | null;
  locationName: string | null;
  locationStatus: 'loading' | 'active' | 'denied' | 'error';
  currentTheme?: ThemeType;
  isFullUI?: boolean;
}

export default function AIAssistant({ language, energy, weather, location, locationName, locationStatus, currentTheme = 'normal', isFullUI = false }: AIAssistantProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Speech Synthesis (Output only)
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };
    
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    handleVoicesChanged(); // Initial check

    return () => window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
  }, []);

  const speak = useCallback((text: string) => {
    if (!isVoiceEnabled && !isLiveMode) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = language === 'bangla' ? 'bn-BD' : 'en-US';
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (v.lang.startsWith(language === 'bangla' ? 'bn' : 'en')) &&
      (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Mark') || v.name.includes('Google'))
    ) || voices.find(v => v.lang.startsWith(language === 'bangla' ? 'bn' : 'en')) || voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      if (isLiveMode && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch (e) {
            console.warn('Recognition restart failed');
          }
        }, 500);
      }
    };

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 150);
  }, [isVoiceEnabled, language, isLiveMode]);

  // Update dependencies for handleSend to include speak
  // Handle sending message
  const handleSend = useCallback(async (textOverride?: string) => {
    const userMessage = (typeof textOverride === 'string' ? textOverride : null) || input.trim();
    if (!userMessage || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    if (typeof textOverride !== 'string') setInput('');
    setIsLoading(true);

    try {
      const apiKey = (process as any).env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key missing');
      }

      const ai = new GoogleGenAI({ apiKey });
      const newApiHistory = [...history, { role: 'user', parts: [{ text: userMessage }] }];
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: newApiHistory,
        config: {
          systemInstruction: SYSTEM_PROMPT(language, currentTheme, { energy, weather, location, locationName, locationStatus }) + 
            (isLiveMode ? "\nIMPORTANT: You are in LIVE VOICE MODE. Keep your responses VERY concise (under 2 sentences) for a natural conversation flow." : ""),
          tools: [{ googleSearch: {} }]
        }
      });

      const botText = response.text || (language === 'english' ? "I'm sorry, I couldn't process that." : "আমি দুঃখিত, আমি এটি প্রক্রিয়া করতে পারিনি।");
      const finalMessages: ChatMessage[] = [...newMessages, { role: 'bot', text: botText }];
      const finalApiHistory = [...newApiHistory, { role: 'model', parts: [{ text: botText }] }];
      
      setMessages(finalMessages);
      setHistory(finalApiHistory);
      
      // Update session title if it's new
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          const title = s.messages.length <= 2 ? userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : '') : s.title;
          return { ...s, messages: finalMessages, apiHistory: finalApiHistory, title };
        }
        return s;
      }));

      speak(botText);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: language === 'english' ? 'Oops! I am having some technical issues.' : 'ওহ! আমি কিছু প্রযুক্তিগত সমস্যার সম্মুখীন হচ্ছি।' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, language, history, messages, energy, weather, location, locationName, activeSessionId, isLiveMode, speak]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'bangla' ? 'bn-BD' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert(language === 'english' 
            ? 'Microphone access is not allowed. Please check your browser permissions.' 
            : 'মাইক্রোফোন অ্যাক্সেস করার অনুমতি নেই। আপনার ব্রাউজার পারমিশন চেক করুন।');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(language === 'english' ? 'Speech recognition is not supported in your browser.' : 'আপনার ব্রাউজারে স্পিচ রিকগনিশন সমর্থিত নয়।');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (isLiveMode) setIsLiveMode(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const toggleLiveMode = () => {
    if (!recognitionRef.current) {
      alert(language === 'english' ? 'Speech recognition is not supported in your browser.' : 'আপনার ব্রাউজারে স্পিচ রিকগনিশন সমর্থিত নয়।');
      return;
    }

    const newLiveState = !isLiveMode;
    setIsLiveMode(newLiveState);
    if (newLiveState) {
      setIsVoiceEnabled(true);
      if (!isListening) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch(e) {}
      }
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Load chats from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessions(parsed);
        if (parsed.length > 0) {
          setActiveSessionId(parsed[0].id);
          setMessages(parsed[0].messages);
          setHistory(parsed[0].apiHistory);
        }
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  // Update greeting when language and location status changes
  useEffect(() => {
    // Auto-create first session if none exists
    if (sessions.length === 0 && !activeSessionId) {
      const id = Date.now().toString();
      const session: ChatSession = {
        id,
        title: language === 'english' ? 'New Chat' : 'নতুন চ্যাট',
        timestamp: Date.now(),
        messages: [],
        apiHistory: []
      };
      setSessions([session]);
      setActiveSessionId(id);
      setMessages([]);
      setHistory([]);
    }
  }, [language, activeSessionId, sessions.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const createNewChat = () => {
    const id = Date.now().toString();
    
    const session: ChatSession = {
      id,
      title: language === 'english' ? 'New Chat' : 'নতুন চ্যাট',
      timestamp: Date.now(),
      messages: [],
      apiHistory: []
    };
    
    setSessions(prev => [session, ...prev]);
    setActiveSessionId(id);
    setMessages([]);
    setHistory([]);
    setShowHistory(false);
  };

  const switchSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setActiveSessionId(id);
      setMessages(session.messages);
      setHistory(session.apiHistory);
      setShowHistory(false);
    }
  };

  const deleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updatedSessions = sessions.filter(s => s.id !== id);
    setSessions(updatedSessions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
    
    if (activeSessionId === id) {
      if (updatedSessions.length > 0) {
        switchSession(updatedSessions[0].id);
      } else {
        createNewChat();
      }
    }
  };

  const getThemeStyles = () => {
    switch(currentTheme) {
      case 'got': return { primary: 'gold', secondary: 'blood', bg: 'bg-slate-950', border: 'border-gold/20', bubble: 'bg-slate-900 border-gold/20', text: 'text-gold' };
      case 'harry_potter': return { primary: 'yellow-500', secondary: 'yellow-600', bg: 'bg-[#1a0f00]', border: 'border-[#5c4033]', bubble: 'bg-[#2a1b0a] border-yellow-500/20', text: 'text-[#e0c9a6]' };
      case 'solo_leveling': return { 
        primary: '[#00e5ff]', 
        secondary: '[#006064]', 
        bg: 'bg-[#03060a]', 
        border: 'border-[#00e5ff]/40 shadow-[0_0_20px_rgba(0,229,255,0.2)]', 
        bubble: 'bg-[#03060a] border-[#00e5ff]/30 shadow-[0_0_10px_rgba(0,229,255,0.1)]', 
        text: 'text-[#00e5ff] font-mono' 
      };
      case 'fc_mobile': return { 
        primary: '[#00ff85]', 
        secondary: '[#004a25]', 
        bg: 'bg-white dark:bg-[#002d16]', 
        border: 'border-slate-200 dark:border-white/10', 
        bubble: 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/20', 
        text: 'text-slate-900 dark:text-white' 
      };
      case 'blue_lock': return { 
        primary: '[#00f2ff]', 
        secondary: 'blue-600', 
        bg: 'bg-[#000814]', 
        border: 'border-[#00f2ff]/30', 
        bubble: 'bg-[#001d3d] border-[#00f2ff]/20 shadow-[0_0_10px_rgba(0,242,255,0.1)]', 
        text: 'text-white' 
      };
      case 'immortal_king': return { 
        primary: '[#8b0000]', 
        secondary: '[#ffd700]', 
        bg: 'bg-[#fffaf0] dark:bg-[#2d0a0a]', 
        border: 'border-[#8b0000] dark:border-[#ffd700]', 
        bubble: 'bg-white dark:bg-[#1a0505] border-[#8b0000] dark:border-[#ffd700] shadow-sm', 
        text: 'text-[#8b0000] dark:text-[#ffd700]' 
      };
      default: return { primary: 'brand-blue', secondary: 'brand-blue-dark', bg: 'bg-white dark:bg-slate-950', border: 'border-slate-100 dark:border-slate-800', bubble: 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800', text: 'text-slate-900 dark:text-slate-100' };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div className={`flex flex-col ${isFullUI ? 'h-full' : 'h-[500px]'} w-full max-w-4xl mx-auto vibrant-card !p-0 overflow-hidden shadow-2xl relative transition-all duration-500 ${themeStyles.bg} ${themeStyles.border}`}>
      {/* History Sidebar Overlay */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className={`absolute inset-y-0 left-0 w-64 z-50 shadow-2xl border-r p-4 flex flex-col ${currentTheme === 'got' ? 'bg-slate-900 border-gold/20' : 'bg-slate-800 border-slate-700'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold flex items-center gap-2">
                <HistoryIcon size={18} className={`text-${themeStyles.primary}`} />
                {language === 'english' ? 'Chat History' : 'চ্যাট ইতিহাস'}
              </h4>
              <button onClick={() => setShowHistory(false)} className="p-1 hover:opacity-50 rounded">
                <X size={18} />
              </button>
            </div>

            <button
              onClick={createNewChat}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md mb-4 ${
                currentTheme === 'got' ? 'bg-gold text-slate-950' : 'bg-blue-600 text-white'
              }`}
            >
              <Plus size={16} />
              {language === 'english' ? 'New Session' : 'নতুন সেশন'}
            </button>

            <div className="flex-1 overflow-y-auto space-y-2">
              {sessions.map(s => (
                <div
                  key={s.id}
                  onClick={() => switchSession(s.id)}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all border ${
                    activeSessionId === s.id 
                      ? `bg-${themeStyles.primary}/10 border-${themeStyles.primary}/50` 
                      : `bg-slate-900/50 border-transparent hover:border-${themeStyles.primary}/30`
                  }`}
                >
                  <div className="flex items-center gap-2 pr-6 text-xs">
                    <MessageSquare size={14} className="shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`p-4 flex items-center justify-between relative z-10 border-b ${themeStyles.border}`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHistory(true)}
            className={`p-2 rounded-none border hover:opacity-80 transition-all mr-1 ${themeStyles.border}`}
          >
            <HistoryIcon size={20} className={`text-${themeStyles.primary}`} />
          </button>
          <div className={`p-2 rounded-full border ${themeStyles.border}`}>
            {currentTheme === 'solo_leveling' ? <Skull size={24} className={`text-${themeStyles.primary}`} /> : <Bot size={24} className={`text-${themeStyles.primary}`} />}
          </div>
          <div>
            <h3 className={`font-display font-black text-sm md:text-base uppercase tracking-widest leading-none text-${themeStyles.primary}`}>
              {currentTheme === 'got' ? 'Iron Assistant' : currentTheme === 'harry_potter' ? 'Magical Lens' : currentTheme === 'solo_leveling' ? 'Shadow Monarch System' : 'Smart Assistant'}
            </h3>
            <p className="text-[10px] md:text-xs opacity-60 font-display italic">
              {currentTheme === 'solo_leveling' ? 'AUTHENTICATED: SUNG JIN-WOO' : (language === 'english' ? 'Ready to help you' : 'আপনার সহায়তায়')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLiveMode}
            className={`p-2 rounded-lg transition-all ${isLiveMode ? 'bg-red-500 ring-2 ring-white animate-pulse' : 'bg-white/10 hover:bg-white/20'}`}
          >
            <Mic size={20} />
          </button>
          <button 
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`p-2 rounded-lg transition-all ${isVoiceEnabled ? 'bg-white/20' : 'bg-white/10'}`}
          >
            {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 relative">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] sm:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`p-2 h-fit flex-shrink-0 ${
                  msg.role === 'user' 
                    ? `bg-${themeStyles.primary} text-slate-900 shadow-lg` 
                    : `${themeStyles.bubble} ${themeStyles.text}`
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`p-3 md:p-4 text-sm font-display shadow-lg ${
                    msg.role === 'user' 
                      ? `bg-${themeStyles.primary} text-slate-950 font-black` 
                      : `${themeStyles.bubble} italic`
                  }`}
                  style={{ clipPath: msg.role === 'user' ? 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 85%)' }}
                >
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
             <Loader2 className={`animate-spin text-${themeStyles.primary}`} size={20} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`p-4 border-t flex gap-2 z-10 relative ${themeStyles.border}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="..."
          className={`flex-1 px-4 py-2 border rounded-none focus:outline-none text-sm transition-all font-display bg-transparent ${themeStyles.border} text-${themeStyles.primary}`}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading}
          className={`px-4 py-2 rounded-none transition-all disabled:opacity-50 font-black ${
            currentTheme === 'got' ? 'bg-gold text-slate-950 hover:bg-gold/80' : 'bg-blue-600 text-white'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

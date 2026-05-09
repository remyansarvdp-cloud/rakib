import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Waves, 
  CloudLightning, 
  Flame, 
  MapPin, 
  PhoneCall, 
  Volume2, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  Radio,
  Backpack,
  Zap,
  Activity,
  History
} from 'lucide-react';
import { Language } from '../types';
import { fetchLiveEarthquakes, Earthquake } from '../services/earthquakeService';

interface DisasterSafetyProps {
  language: Language;
  location: { lat: number; lon: number } | null;
  liveQuakes: any[];
}

interface SafetyProtocol {
  id: string;
  title: string;
  titleBn: string;
  icon: React.ReactNode;
  color: string;
  steps: { en: string; bn: string }[];
  emergencyContact?: string;
}

const PROTOCOLS: SafetyProtocol[] = [
  {
    id: 'flood',
    title: 'Flood Safety',
    titleBn: 'বন্যা সুরক্ষা',
    icon: <Waves className="text-blue-500" />,
    color: 'blue',
    steps: [
      { en: 'Move to a higher ground or upper floor immediately.', bn: 'অবিলম্বে উঁচু স্থান বা উপরের তলায় চলে যান।' },
      { en: 'Do not walk or drive through flowing water.', bn: 'প্রবাহিত পানির মধ্য দিয়ে হাঁটবেন না বা গাড়ি চালাবেন না।' },
      { en: 'Switch off all electrical components to avoid shocks.', bn: 'বৈদ্যুতিক শক এড়াতে সমস্ত বৈদ্যুতিক সংযোগ বন্ধ করুন।' },
      { en: 'Keep dry food and clean water stored in high places.', bn: 'শুকনো খাবার এবং বিশুদ্ধ পানি উঁচু স্থানে সংরক্ষণ করুন।' }
    ],
    emergencyContact: '999'
  },
  {
    id: 'earthquake',
    title: 'Earthquake',
    titleBn: 'ভূমিকম্প',
    icon: <Zap className="text-amber-500" />,
    color: 'amber',
    steps: [
      { en: 'DROP, COVER, and HOLD ON under a sturdy table.', bn: 'শক্ত টেবিলের নিচে মাথা নিচু করে বসে কাভার নিন এবং ধরে রাখুন।' },
      { en: 'Stay away from glass windows and heavy furniture.', bn: 'কাঁচের জানালা এবং ভারী আসবাবপত্র থেকে দূরে থাকুন।' },
      { en: 'If outdoors, move to an open area away from buildings.', bn: 'বাইরে থাকলে দালান থেকে দূরে খোলা জায়গায় চলে যান।' },
      { en: 'Do not use elevators during or after the shocks.', bn: 'ভূমিকম্পের সময় বা পরে লিফট ব্যবহার করবেন না।' }
    ],
    emergencyContact: '999'
  },
  {
    id: 'cyclone',
    title: 'Cyclone & Storm',
    titleBn: 'ঘূর্ণিঝড় ও ঝড়',
    icon: <CloudLightning className="text-slate-500" />,
    color: 'slate',
    steps: [
      { en: 'Seek shelter in a reinforced building or storm cellar.', bn: 'মজবুত দালান বা ঝড়ের আশ্রয়কেন্দ্রে আশ্রয় নিন।' },
      { en: 'Stay away from power lines and loose structures.', bn: 'বিদ্যুতের লাইন এবং নড়বড়ে কাঠামো থেকে দূরে থাকুন।' },
      { en: 'Listen to radio for emergency weather updates.', bn: 'জরুরী আবহাওয়া আপডেটের জন্য রেডিও শুনুন।' },
      { en: 'Keep an emergency kit with a flashlight and batteries.', bn: 'টর্চলাইট এবং ব্যাটারি সহ একটি জরুরী কিট সাথে রাখুন।' }
    ],
    emergencyContact: '109'
  },
  {
    id: 'fire',
    title: 'Fire Safety',
    titleBn: 'অগ্নি নিরাপত্তা',
    icon: <Flame className="text-red-500" />,
    color: 'red',
    steps: [
      { en: 'Stop, Drop, and Roll if your clothing catches fire.', bn: 'কাপড়ে আগুন লাগলে থেমে যান, মাটিতে শুয়ে গড়াগড়ি দিন।' },
      { en: 'Stay low under the smoke while escaping.', bn: 'বেরিয়ে আসার সময় ধোঁয়ার নিচে নিচু হয়ে থাকুন।' },
      { en: 'Never use water on electrical or grease fires.', bn: 'বৈদ্যুতিক বা গ্রীসের আগুনে কখনো পানি ব্যবহার করবেন না।' },
      { en: 'Check door temperature with back of hand before opening.', bn: 'খোলার আগে হাতের উল্টো পিঠ দিয়ে দরজার তাপমাত্রা পরীক্ষা করুন।' }
    ],
    emergencyContact: '16163'
  }
];

const EMERGENCY_KIT = [
  { en: 'Clean Water (3 days supply)', bn: 'বিশুদ্ধ পানি (৩ দিনের সরবরাহ)', icon: <Waves size={16} /> },
  { en: 'First Aid Kit & Medicines', bn: 'প্রাথমিক চিকিৎসা সরঞ্জাম ও ওষুধ', icon: <Stethoscope size={16} /> },
  { en: 'Flashlight & Spare Batteries', bn: 'টর্চলাইট ও অতিরিক্ত ব্যাটারি', icon: <Zap size={16} /> },
  { en: 'Portable Radio', bn: 'পোর্টেবল রেডিও', icon: <Radio size={16} /> },
  { en: 'Non-perishable Food', bn: 'শুকনো ও পচনশীল নয় এমন খাবার', icon: <Backpack size={16} /> },
];

export default function DisasterSafety({ language, location, liveQuakes }: DisasterSafetyProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const isEnglish = language === 'english';

  useEffect(() => {
    // Trigger real alert if a significant quake (mag > 4) is within 500km
    const dangerousQuake = liveQuakes.find(q => q.mag >= 4.0 && (q.distance || Infinity) <= 500);
    if (dangerousQuake) {
      triggerEarthquakeAlert(dangerousQuake);
    }
  }, [liveQuakes]);

  const triggerEarthquakeAlert = (quake?: Earthquake) => {
    const alertEl = document.getElementById('earthquake-alert');
    if (alertEl) {
      alertEl.classList.remove('hidden');
      document.body.classList.add('animate-shake');
      
      // Play siren if requested
      if (!audioRef.current) {
        audioRef.current = new Audio('https://www.myinstants.com/media/sounds/emergency-alarm.mp3');
        audioRef.current.loop = true;
        audioRef.current.onerror = (e) => console.error('Audio error:', e);
      }
      
      // Attempt to play; if blocked, the sound won't play automatically
      audioRef.current.play().catch((e) => {
        console.warn('Audio playback STRICTLY blocked (requires user interaction). Adding click listener to enable:', e);
        const enableSound = () => {
          if (audioRef.current) {
            audioRef.current.play();
            alertEl.removeEventListener('click', enableSound);
          }
        };
        alertEl.addEventListener('click', enableSound);
      });

      setTimeout(() => {
        alertEl.classList.add('hidden');
        document.body.classList.remove('animate-shake');
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 10000); // Alert for 10 seconds
    }
  };

  const triggerEarthquakeTest = () => {
    triggerEarthquakeAlert();
  };

  const activeProtocol = PROTOCOLS.find(p => p.id === selectedProtocol);

  return (
    <div className="vibrant-card !p-0 overflow-hidden shadow-2xl border-brand-blue/20">
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldAlert size={120} />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold flex items-center gap-3">
              <ShieldAlert className="animate-pulse" />
              {isEnglish ? 'Disaster Safety Hub' : 'বিপর্যয় সুরক্ষা হাব'}
            </h2>
            <p className="text-white/80 text-sm mt-1 font-medium">
              {isEnglish 
                ? 'Saving lives through preparedness and AI assistance.' 
                : 'প্রস্তুতি এবং এআই সহায়তার মাধ্যমে জীবন বাঁচানো।'}
            </p>
          </div>
          <button 
            onClick={() => setIsPulseActive(!isPulseActive)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg ${
              isPulseActive 
                ? 'bg-white text-red-600 animate-bounce' 
                : 'bg-red-500/30 text-white border border-white/20 hover:bg-red-500/50'
            }`}
          >
            {isPulseActive && <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />}
            {isPulseActive 
              ? (isEnglish ? 'SOS PULSE ACTIVE' : 'এসওএস পালস সচল') 
              : (isEnglish ? 'ACTIVATE SOS PULSE' : 'এসওএস পালস চালু করুন')}
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* New: Status Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold border border-green-200 dark:border-green-800">
            <Radio size={12} /> {isEnglish ? 'SENSORS: ONLINE' : 'সেন্সর: অনলাইন'}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
            <Zap size={12} /> {isEnglish ? 'POWER: STABLE' : 'বিদ্যুৎ: স্বাভাবিক'}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold border border-amber-200 dark:border-amber-800">
            <MapPin size={12} /> {isEnglish ? 'ZONE: MONITORING' : 'জোন: পর্যবেক্ষণাধীন'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {PROTOCOLS.map((p) => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProtocol(p.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                selectedProtocol === p.id 
                ? 'border-brand-blue bg-brand-blue/5 shadow-inner' 
                : 'border-slate-100 dark:border-slate-800 hover:border-brand-blue/30'
              }`}
            >
              <div className="mb-2 p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm">
                {p.icon}
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isEnglish ? p.title : p.titleBn}
              </span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedProtocol ? (
            <motion.div
              key={selectedProtocol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <span className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                    {activeProtocol?.icon}
                  </span>
                  {isEnglish ? `${activeProtocol?.title} Protocol` : `${activeProtocol?.titleBn} নির্দেশিকা`}
                </h3>
                {activeProtocol?.emergencyContact && (
                  <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full font-bold text-sm">
                    <PhoneCall size={16} />
                    {activeProtocol.emergencyContact}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {activeProtocol?.steps.map((step, idx) => (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                      {isEnglish ? step.en : step.bn}
                    </p>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedProtocol(null)}
                className="mt-6 w-full py-3 bg-slate-200 dark:bg-slate-800 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-300 transition-colors"
              >
                {isEnglish ? 'Close Protocol' : 'বন্ধ করুন'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-brand-blue/5 dark:bg-brand-blue/10 rounded-3xl p-6 border border-brand-blue/10 dark:border-brand-blue/20">
                <h4 className="font-bold text-brand-blue dark:text-blue-400 flex items-center gap-2 mb-4">
                  <Backpack size={18} />
                  {isEnglish ? 'Emergency Survival Kit' : 'জরুরী বেঁচে থাকার সরঞ্জাম'}
                </h4>
                <div className="space-y-3">
                  {EMERGENCY_KIT.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/50 p-3 rounded-xl shadow-sm">
                      <span className="text-brand-blue dark:text-blue-400">{item.icon}</span>
                      {isEnglish ? item.en : item.bn}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-3xl border border-green-100 dark:border-green-900/40 relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isFetching ? 'bg-blue-500 animate-spin' : 'bg-green-500 animate-pulse'}`} />
                    <span className="text-[8px] font-black opacity-40 uppercase tracking-tighter">
                      {isFetching ? 'SYCING...' : 'LIVE'}
                    </span>
                  </div>
                  <h4 className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-2">
                    <Activity size={18} className={isFetching ? 'animate-bounce' : ''} />
                    {isEnglish ? 'Live Seismic Data' : 'সরাসরি সিসমিক তথ্য'}
                  </h4>
                  <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                    {liveQuakes.length > 0 ? (
                      liveQuakes.slice(0, 8).map(quake => {
                        const isVeryRecent = Date.now() - quake.time < 3600000; // Last hour
                        return (
                          <div key={quake.id} className={`flex justify-between items-center p-2 rounded-lg text-[10px] border ${
                            isVeryRecent 
                              ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' 
                              : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
                          }`}>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <span className="font-black text-slate-800 dark:text-white">M {quake.mag.toFixed(1)}</span>
                                {isVeryRecent && (
                                  <span className="bg-red-500 text-white text-[7px] px-1 rounded animate-pulse">NEW</span>
                                )}
                              </div>
                              <span className="opacity-60 truncate w-32">{quake.place}</span>
                            </div>
                            <div className="text-right">
                              <span className="block font-bold text-brand-blue">{Math.round(quake.distance || 0)}km away</span>
                              <span className="opacity-40">{new Date(quake.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 flex flex-col items-center justify-center opacity-40">
                        <Activity size={24} className="animate-pulse mb-2" />
                        <p className="text-[10px] italic text-center">
                          {isEnglish ? 'Searching for seismic activity...' : 'সিসমিক কার্যকলাপ অনুসন্ধান করা হচ্ছে...'}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-[9px] mt-3 opacity-40 font-mono text-center flex items-center justify-center gap-2">
                    <span>SOURCE: USGS REAL-TIME FEED</span>
                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                    <span>UPDATED: {lastCheck.toLocaleTimeString()}</span>
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/40">
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2 mb-2">
                    <AlertCircle size={18} />
                    {isEnglish ? 'Panic Tips' : 'প্যানিক টিপস'}
                  </h4>
                  <p className="text-xs text-amber-600 dark:text-amber-300/80 leading-relaxed mb-4">
                    {isEnglish 
                      ? 'Stay calm. Panic is your worst enemy. Follow the planned protocols and help children and the elderly first.'
                      : 'শান্ত থাকুন। আতঙ্ক আপনার সবচেয়ে বড় শত্রু। পরিকল্পিত নির্দেশিকা অনুসরণ করুন এবং প্রথমে শিশু ও বৃদ্ধদের সাহায্য করুন।'}
                  </p>
                  <button 
                    onClick={triggerEarthquakeTest}
                    className="w-full py-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-700 dark:text-amber-400 border border-amber-600/40 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
                  >
                    {isEnglish ? 'Start Safety Drill' : 'নিরাপত্তা মহড়া শুরু করুন'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Radio size={14} className="text-slate-400" />
          {isEnglish ? 'Live Alert System Monitoring' : 'সরাসরি সতর্কতা সিস্টেম মনিটরিং'}
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-green-600">ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

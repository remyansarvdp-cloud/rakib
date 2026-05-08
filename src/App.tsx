import { motion, AnimatePresence } from 'motion/react';
import { 
  Footprints, 
  Battery, 
  Zap, 
  Home, 
  Play, 
  Image as ImageIcon, 
  CheckCircle2, 
  ShieldAlert, 
  Shield,
  User, 
  Users,
  Menu,
  X,
  Target,
  Bot,
  Ghost,
  Skull,
  Languages,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  Sword,
  Flame,
  Snowflake,
  Trophy,
  Map as MapIcon,
  Layout,
  Star,
  Activity,
  Flower
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Language, ThemeType } from './types';
import ProjectSection from './components/ProjectSection';
import AIAssistant from './components/AIAssistant';
import ElectricityCounter from './components/ElectricityCounter';
import SmartHouse3D from './components/SmartHouse3D';
import Dashboard from './components/Dashboard';
import DisasterSafety from './components/DisasterSafety';
import Dragon from './components/Dragon';

const AboutProjectContent = ({ currentTheme, language }: { currentTheme: ThemeType, language: Language }) => (
  <div className="space-y-6">
    <h2 className={`text-2xl font-display font-black uppercase tracking-[0.2em] border-b pb-4 ${
      currentTheme === 'got' ? 'text-gold border-gold/10' :
      currentTheme === 'harry_potter' ? 'text-yellow-500 border-yellow-500/10' :
      currentTheme === 'solo_leveling' ? 'text-[#00e5ff] border-[#00e5ff]/20' :
      'text-brand-blue border-slate-100'
    }`}>
      {language === 'english' ? 'About Project' : 'প্রজেক্ট সম্পর্কে'}
    </h2>
    <div className={`prose prose-sm max-w-none ${currentTheme === 'normal' ? 'dark:prose-invert' : 'text-slate-300'}`}>
      <p className="text-lg leading-relaxed italic">
        {language === 'english' 
          ? "The Smart Energy Saving AI House is an innovative vision for sustainable living, designed and developed by the dedicated students of Govt. Jubilee High School for the Science Fest 2026."
          : "স্মার্ট এনার্জি সেভিং এআই হাউস টেকসই জীবনযাপনের জন্য একটি উদ্ভাবনী দৃষ্টিভঙ্গি, যা সায়েন্স ফেস্ট ২০২৬-এর জন্য গভঃ জুবিলী হাই স্কুলের একদল নিবেদিতপ্রাণ ছাত্রদের দ্বারা ডিজাইন ও তৈরি করা হয়েছে।"}
      </p>
      <div className={`p-6 rounded-2xl my-8 ${
        currentTheme === 'got' ? 'bg-slate-900 border border-gold/20' :
        currentTheme === 'solo_leveling' ? 'bg-[#00e5ff]/5 border border-[#00e5ff]/20' :
        'bg-slate-50 dark:bg-slate-800'
      }`}>
        <h3 className="font-bold mb-4 uppercase tracking-widest text-sm">
          {language === 'english' ? 'Core Philosophy' : 'মূল দর্শন'}
        </h3>
        <p>
          {language === 'english'
            ? "Our project centers around the principle of 'Kinetic Recovery'—harvesting power from the very vibrations of life. Every step taken on our specialized floor tiles is captured as clean, electrical energy."
            : "আমাদের প্রজেক্টটি 'কাইনেটিক রিকভারি' বা জীবনযাত্রার স্পন্দন থেকে শক্তি সংগ্রহের নীতির ওপর ভিত্তি করে গড়ে উঠেছে। আমাদের বিশেষ ফ্লোর টাইলসে প্রতিটি পদক্ষেপ থেকে পরিষ্কার বৈদ্যুতিক শক্তি উৎপন্ন হয়।"}
        </p>
      </div>
      <p>
        {language === 'english'
          ? "Beyond pure energy generation, the house is integrated with a sophisticated AI system that monitors consumption, manages energy distribution, and provides real-time disaster alerts, ensuring that the home is not just smart, but also a safe fortress for its inhabitants."
          : "কেবল শক্তি উৎপাদনই নয়, এই বাড়িতে রয়েছে একটি উন্নত এআই ব্যবস্থা যা শক্তির ব্যবহার পর্যবেক্ষণ করে, বণ্টন পরিচালনা করে এবং রিয়েল-টাইম দুর্যোগ সতর্কতা প্রদান করে, যা নিশ্চিত করে যে এই বাড়িটি কেবল স্মার্টই নয়, তার বাসিন্দাদের জন্য একটি নিরাপদ দুর্গও বটে।"}
      </p>
    </div>
  </div>
);

const HowItWorksContent = ({ currentTheme, language }: { currentTheme: ThemeType, language: Language }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { 
          title: language === 'english' ? 'Harvest' : 'সংগ্রহ',
          desc: language === 'english' ? 'Kinetic tiles convert foot pressure into electrical sparks.' : 'কাইনেটিক টাইলস পায়ের চাপকে বৈদ্যুতিক স্ফুলিঙ্গে রূপান্তরিত করে।',
          icon: <Zap size={32} />
        },
        { 
          title: language === 'english' ? 'Optimize' : 'অপ্টিমাইজ',
          desc: language === 'english' ? 'The AI analyzes usage patterns to cut unnecessary waste.' : 'এআই অপ্রয়োজনীয় অপচয় কমাতে ব্যবহারের ধরণ বিশ্লেষণ করে।',
          icon: <Activity size={32} />
        },
        { 
          title: language === 'english' ? 'Protect' : 'সুরক্ষা',
          desc: language === 'english' ? 'Sensors monitor for seismic and environmental threats 24/7.' : 'সেন্সরগুলি ২৪/৭ সিসমিক এবং পরিবেশগত হুমকি পর্যবেক্ষণ করে।',
          icon: <Shield size={32} />
        }
      ].map((feature, i) => (
        <div key={i} className={`p-8 rounded-3xl border flex flex-col items-center text-center gap-4 ${
          currentTheme === 'got' ? 'bg-slate-900 border-gold/10 text-gold' :
          currentTheme === 'solo_leveling' ? 'bg-[#03060a] border-[#00e5ff]/20 text-[#00e5ff]' :
          'bg-slate-50 border-slate-100 text-brand-blue'
        }`}>
          <div className="mb-4">{feature.icon}</div>
          <h3 className="font-display font-black uppercase tracking-widest text-lg">{feature.title}</h3>
          <p className="text-sm opacity-70 italic">{feature.desc}</p>
        </div>
      ))}
    </div>

    <div className={`p-8 rounded-3xl ${
       currentTheme === 'got' ? 'bg-gold/5' : 
       currentTheme === 'solo_leveling' ? 'bg-[#00e5ff]/5' : 
       'bg-slate-50'
    }`}>
      <h3 className="font-display font-black uppercase tracking-widest mb-6 border-b pb-2">
        {language === 'english' ? 'The Technical Soul' : 'প্রযুক্তিগত ভিত্তি'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
        <p>
          {language === 'english'
            ? "When a person walks, the weight of their step compresses specialized piezo-electric or electromagnetic generators beneath the tiles. This mechanical energy is immediately converted to alternating current, which the AI-managed battery hub rectifies and stores as stable power for lights and appliances."
            : "যখন একজন ব্যক্তি হাঁটেন, তখন তার পদক্ষেপের ওজন টাইলসের নিচের পাইজো-ইলেকট্রিক বা তড়িৎচৌম্বকীয় জেনারেটরগুলোকে সংকুচিত করে। এই যান্ত্রিক শক্তি তাৎক্ষণিকভাবে অল্টারনেটিং কারেন্টে রূপান্তরিত হয়, যা এআই-পরিচালিত ব্যাটারি হাব সংশোধন করে এবং আলো ও সরঞ্জামের জন্য স্থিতিশীল শক্তি হিসেবে সঞ্চয় করে।"}
        </p>
        <p>
          {language === 'english'
            ? "The 'Iron Heart' of the project is its AI logic. It doesn't just store energy—it thinks about how to use it. If energy levels are low and no one is in a room, the AI will automatically dim the lights and put systems into hibernation, prioritizing essential security functions during emergencies."
            : "প্রজেক্টের মূল হৃদয় হলো এর এআই লজিক। এটি কেবল শক্তি সঞ্চয়ই করে না—বরং কীভাবে এটি ব্যবহার করা হবে তা নিয়ে চিন্তা করে। যদি শক্তির স্তর কম থাকে এবং রুমে কেউ না থাকে, তবে এআই স্বয়ংক্রিয়ভাবে আলো কমিয়ে দেবে এবং সিস্টেমকে হাইবারনেশনে রাখবে, যা জরুরি অবস্থার সময় প্রয়োজনীয় সুরক্ষা ফাংশনগুলোকে অগ্রাধিকার দেয়।"}
        </p>
      </div>
    </div>
  </div>
);

const TeamContent = ({ currentTheme, language }: { currentTheme: ThemeType, language: Language }) => (
  <div className="space-y-8">
     <div className="text-center mb-12">
        <h2 className={`text-3xl font-display font-black uppercase tracking-[0.4em] mb-4 ${
          currentTheme === 'got' ? 'text-gold' :
          currentTheme === 'solo_leveling' ? 'text-[#00e5ff]' :
          'text-brand-blue'
        }`}>
          {language === 'english' ? 'The Visionaries' : 'স্বপ্নদ্রষ্টা দল'}
        </h2>
        <p className="opacity-60 italic">Govt. Jubilee High School • Science Fest 2026</p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {['Swapnodeep Talukdar', 'Shahriyer Tahmid Jihad', 'Ibtehazul Hoque Jareef', 'Ahnaf Siddique Rafi', 'Md. Abdur Rakib'].map((name, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 border-l-4 flex items-center justify-between group transition-all duration-300 ${
              currentTheme === 'got' ? 'bg-slate-900 border-gold/40 text-gold hover:bg-gold/10' :
              currentTheme === 'solo_leveling' ? 'bg-[#00e5ff]/5 border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10' :
              'bg-slate-50 border-brand-blue text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="font-display font-black uppercase tracking-widest text-sm">{name}</span>
          </motion.div>
        ))}
     </div>

     <div className="mt-16 text-center max-w-2xl mx-auto">
        <div className={`inline-block p-2 rounded-full mb-6 ${currentTheme === 'got' ? 'bg-gold/10' : 'bg-brand-blue/10'}`}>
          <Star size={24} className={currentTheme === 'got' ? 'text-gold' : 'text-brand-blue'} />
        </div>
        <p className={`text-lg italic leading-relaxed opacity-80 ${currentTheme === 'got' ? 'text-slate-300' : 'text-slate-600'}`}>
          {language === 'english' 
            ? "Unified by scientific curiosity and a shared dream of a greener future, we present this project as a testament to the potential of young Jubileans."
            : "বৈজ্ঞানিক কৌতূহল এবং একটি সবুজ ভবিষ্যতের স্বপ্নে ঐক্যবদ্ধ হয়ে, আমরা এই প্রজেক্টটিকে তরুণ জুবিলিয়ানদের সম্ভাবনার প্রমাণ হিসাবে উপস্থাপন করছি।"}
        </p>
     </div>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [energy, setEnergy] = useState(0.42);
  const [language, setLanguage] = useState<Language>('english');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('got');
  const [showArise, setShowArise] = useState(false);
  const [activePortal, setActivePortal] = useState<string | null>(null);

  useEffect(() => {
    if (activePortal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePortal]);

  useEffect(() => {
    if (currentTheme === 'solo_leveling') {
      setShowArise(true);
      const timer = setTimeout(() => setShowArise(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentTheme]);

  const isEpicTheme = currentTheme === 'got';
  const [weather, setWeather] = useState<{ temp: number; condition: string; windSpeed: number } | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'active' | 'denied' | 'error'>('loading');

  const fetchLocationName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.suburb || data.address.village || data.address.county || data.display_name.split(',')[0];
      if (city) {
        setLocationName(city);
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
    }
  };

  useEffect(() => {
    // Remove all theme classes first
    const themeClasses = ['epic-theme', 'theme-harry_potter', 'theme-solo_leveling', 'theme-fc_mobile', 'theme-rpg'];
    document.body.classList.remove(...themeClasses);
    
    // Add current theme class
    if (currentTheme === 'got') document.body.classList.add('epic-theme');
    else if (currentTheme !== 'normal') document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  const initLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setLocationStatus('error');
      setLocation({ lat: 25.07, lon: 91.40 });
      setLocationName(language === 'english' ? 'Sunamganj' : 'সুনামগঞ্জ');
      return;
    }

    setLocationStatus('loading');
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setLocation(prev => {
          if (prev?.lat === lat && prev?.lon === lon) return prev;
          return { lat, lon };
        });
        setLocationStatus('active');
        fetchLocationName(lat, lon);
      },
      (error) => {
        console.error('Geolocation error:', error);
        if (error.code === 1) {
          setLocationStatus('denied');
        } else {
          setLocationStatus('error');
        }
        // Fallback
        setLocation({ lat: 25.07, lon: 91.40 });
        setLocationName(language === 'english' ? 'Sunamganj' : 'সুনামগঞ্জ');
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [language]);

  useEffect(() => {
    const unsub = initLocation();
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, [initLocation]);

  useEffect(() => {
    // Battery API
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
      });
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat.toFixed(4)}&longitude=${location.lon.toFixed(4)}&current=temperature_2m,weather_code,wind_speed_10m`);
        if (!response.ok) throw new Error(`Response not OK: ${response.status}`);
        const data = await response.json();
        if (data && data.current) {
          const code = data.current.weather_code;
          let condition = 'Clear';
          if (code > 0 && code < 4) condition = 'Cloudy';
          if (code >= 51 && code <= 67) condition = 'Rainy';
          if (code >= 71 && code <= 86) condition = 'Snowy';
          if (code >= 95) condition = 'Thunderstorm';
          
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            condition,
            windSpeed: data.current.wind_speed_10m
          });
        }
      } catch (error: any) {
        console.warn('Weather fetch failed, using default values:', error);
        // Set a default weather if fetch fails to prevent UI gaps
        setWeather({ temp: 24, condition: 'Clear', windSpeed: 5 });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); 
    return () => clearInterval(interval);
  }, [location]);

  const [energyHistory, setEnergyHistory] = useState(() => {
    // Initialize with some mock history for the last 6 points
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const time = new Date(now.getTime() - (5 - i) * 60000);
      return {
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        generation: 0.1 + Math.random() * 0.2,
        consumption: 0.05 + Math.random() * 0.1
      };
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setEnergyHistory(prev => {
        const next = [...prev, {
          time: timeStr,
          generation: energy, // Current live energy from footstep simulation
          consumption: 0.1 + Math.random() * 0.1 // Simulated fluctuating house consumption
        }];
        // Keep last 12 points (12 minutes if it updates every minute)
        return next.slice(-12);
      });
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [energy]);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const handleStep = () => {
    setEnergy(prev => prev + 0.05);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const disasters = language === 'english' ? [
    { 
      title: "Flood", 
      desc: "Water level alerts",
      todo: "Move to higher ground. Avoid floodwater. Turn off electricity.",
      details: [
        "Move to Higher Ground: Immediately move to the top floor or a high-elevation area. Avoid the basement.",
        "Cut the Power: Use the AI to remotely switch off the main electricity supply to prevent electrocution as water enters the house.",
        "Prepare a \"Go-Bag\": Ensure you have clean drinking water, dry food, and a first-aid kit ready.",
        "Avoid Moving Water: Never try to walk or drive through flowing water; even 6 inches of moving water can knock you off your feet.",
        "Seal Entrances: If possible, use sandbags or barriers at doors to slow down water entry.",
        "Stay Informed: Keep your AI-connected radio or phone on for official government weather updates.",
        "Watch for Animals: Be careful of snakes or other animals that might enter the house seeking dry land."
      ]
    },
    { 
      title: "Cyclone", 
      desc: "Wind warnings",
      todo: "Secure windows. Stay in a safe room. Have emergency kits ready.",
      details: [
        "Secure the Perimeter: Close and board up all windows. Tape can help prevent glass from shattering inward.",
        "Clear the Yard: Bring inside any loose objects (like bicycles or garden tools) that could fly and break windows.",
        "Find a \"Safe Room\": Stay in the center of the house, away from glass windows and doors.",
        "Charge Devices: Use your footstep-generated energy to fully charge phones and emergency lights before the storm hits its peak.",
        "Do Not Go Outside: Even if it becomes calm, you might be in the \"eye\" of the cyclone; the winds will return shortly from the opposite direction.",
        "Stay Low: If the building starts to fail, get under a sturdy table or cover yourself with a mattress.",
        "Emergency Communication: Send your location to emergency contacts before the signal weakens."
      ]
    },
    { 
      title: "Storm", 
      desc: "Weather updates",
      todo: "Stay indoors. Stay away from windows. Unplug electronics.",
      details: [
        "Unplug Electronics: Disconnect computers and appliances to protect them from power surges caused by lightning.",
        "Avoid Water Pipes: Do not shower or wash dishes during a storm, as lightning can travel through plumbing.",
        "Stay Indoors: If you are outside, seek shelter in a sturdy building or a hard-topped metal vehicle immediately.",
        "Avoid Tall Objects: If stuck outside, stay away from isolated trees, towers, or fences. Do not be the tallest object in an open field.",
        "The 30/30 Rule: If you hear thunder within 30 seconds of a flash, go inside. Wait 30 minutes after the last clap of thunder before going back out.",
        "Don’t Lean on Concrete: Lightning can travel through the metal wires or bars in concrete walls and floors.",
        "Keep Windows Closed: Strong gusts during a storm can cause sudden pressure changes or blow in debris."
      ]
    },
    { 
      title: "Earthquake", 
      desc: "Seismic alerts",
      todo: "Drop, Cover, and Hold on. Stay under sturdy furniture.",
      details: [
        "Drop, Cover, and Hold On: Drop to your hands and knees, cover your head and neck under a sturdy table, and hold on until the shaking stops.",
        "Stay Away from Glass and Furniture: Move away from windows, mirrors, hanging objects, and tall bookshelves that could fall.",
        "Automatic Gas & Power Cut: Your Smart House AI should immediately shut off the main gas line and electrical circuit to prevent fires caused by broken pipes or wires.",
        "Do Not Run Outside: Most injuries happen when people try to leave buildings during the shaking. Stay inside until it is safe to move.",
        "Stay Clear of Elevators: If your smart house is in an apartment, the AI should disable elevators and instruct residents to use the stairs once the shaking stops.",
        "If Outside, Find an Open Space: Move away from buildings, streetlights, and utility wires. The greatest danger is directly outside buildings from collapsing walls.",
        "Prepare for Aftershocks: The AI should warn users that smaller earthquakes (aftershocks) often follow the main one and can still cause damage"
      ]
    }
  ] : [
    { 
      title: "বন্যা", 
      desc: "পানির স্তর সতর্কতা",
      todo: "উঁচুতে যান। বন্যা থেকে দূরে থাকুন। বিদ্যুৎ বন্ধ করুন।",
      details: [
        "উঁচুতে যান: তাৎক্ষণিকভাবে উপরের তলায় বা উঁচু স্থানে চলে যান। বেসমেন্ট পরিহার করুন।",
        "বিদ্যুৎ বন্ধ করুন: বাড়িতে পানি ঢোকার সময় বিদ্যুৎস্পৃষ্ট হওয়া রোধ করতে এআই ব্যবহার করে মেইন বিদ্যুৎ সরবরাহ বন্ধ করুন।",
        "জরুরি ব্যাগ প্রস্তুত করুন: আপনার সাথে বিশুদ্ধ খাবার পানি, শুকনো খাবার এবং একটি প্রাথমিক চিকিৎসা কিট আছে তা নিশ্চিত করুন।",
        "প্রবাহিত পানি পরিহার করুন: কখনোই প্রবাহিত পানির মধ্য দিয়ে হাঁটার বা গাড়ি চালানোর চেষ্টা করবেন না; মাত্র ৬ ইঞ্চি প্রবাহিত পানি আপনাকে ফেলে দিতে পারে।",
        "প্রবেশপথ বন্ধ করুন: সম্ভব হলে দরজায় বালির ব্যাগ বা বাধা ব্যবহার করে পানি ঢোকার গতি কমিয়ে দিন।",
        "সচেতন থাকুন: সরকারি আবহাওয়া আপডেটের জন্য আপনার এআই-সংযুক্ত রেডিও বা ফোন সচল রাখুন।",
        "প্রাণীদের বিষয়ে সতর্ক থাকুন: শুকনো জায়গার খোঁজে বাড়িতে সাপ বা অন্যান্য প্রাণী প্রবেশ করতে পারে সে বিষয়ে সতর্ক থাকুন।"
      ]
    },
    { 
      title: "সাইক্লোন", 
      desc: "বাতাসের সতর্কতা",
      todo: "জানালা সুরক্ষিত করুন। নিরাপদ রুমে থাকুন। জরুরি কিট প্রস্তুত রাখুন।",
      details: [
        "চারপাশ সুরক্ষিত করুন: সব জানালা বন্ধ এবং সুরক্ষিত করুন। কাঁচ ভাঙা রোধ করতে টেপ ব্যবহার করতে পারেন।",
        "আঙিনা পরিষ্কার করুন: বাইরের আলগা বস্তু যেমন সাইকেল বা বাগানের সরঞ্জাম ভেতরে নিয়ে আসুন যা বাতাসে উড়ে গিয়ে ক্ষতি করতে পারে।",
        "নিরাপদ কক্ষ খুঁজুন: বাড়ির মাঝখানের কক্ষে থাকুন, কাঁচের জানালা এবং দরজা থেকে দূরে থাকুন।",
        "ডিভাইস চার্জ দিন: আপনার ফুটস্টেপ-জেনারেটেড এনার্জি ব্যবহার করে ঝড় প্রবল হওয়ার আগেই ফোন এবং জরুরি লাইট পুরোপুরি চার্জ করে নিন।",
        "বাইরে যাবেন না: বাইরে শান্ত মনে হলেও এটি সাইক্লোনের 'চোখ' হতে পারে; কিছুক্ষণ পরেই বিপরীত দিক থেকে প্রবল বাতাস আসতে পারে।",
        "নিচু হয়ে থাকুন: ভবন ভেঙে যাওয়ার উপক্রম হলে মজবুত টেবিলের নিচে আশ্রয় নিন বা তোশক দিয়ে নিজেকে ঢেকে রাখুন।",
        "জরুরি যোগাযোগ: সিগন্যাল দুর্বল হওয়ার আগেই আপনার অবস্থান জরুরি কন্টাক্ট নাম্বারে পাঠিয়ে দিন।"
      ]
    },
    { 
      title: "ঝড়", 
      desc: "আবহাওয়া আপডেট",
      todo: "ঘরের ভেতরে থাকুন। জানালা থেকে দূরে থাকুন। ইলেকট্রনিক্স আনপ্লাগ করুন।",
      details: [
        "ইলেকট্রনিক্স আনপ্লাগ করুন: বজ্রপাতের কারণে পাওয়ার সার্জ থেকে রক্ষা করতে কম্পিউটার এবং অন্যান্য সরঞ্জাম ডিসকানেক্ট করুন।",
        "পানির পাইপ থেকে দূরে থাকুন: ঝড়ের সময় গোসল করবেন না বা থালা-বাসন ধোবেন না, কারণ প্লাম্বিংয়ের মাধ্যমে বজ্রপাত হতে পারে।",
        "ভেতরে থাকুন: আপনি যদি বাইরে থাকেন, তবে অবিলম্বে একটি মজবুত ভবন বা শক্ত টপযুক্ত ধাতব গাড়িতে আশ্রয় নিন।",
        "উঁচু বস্তু এড়িয়ে চলুন: বাইরে আটকা পড়লে একা গাছ, টাওয়ার বা বেড়া থেকে দূরে থাকুন। খোলা মাঠে নিজেকে সবচেয়ে উঁচু বস্তু বানাবেন না।",
        "৩০/৩০ নিয়ম: বজ্রপাতের ৩০ সেকেন্ডের মধ্যে মেঘের ডাক শুনলে ভেতরে যান। শেষ ডাকের পর অন্তত ৩০ মিনিট অপেক্ষা করুন।",
        "কংক্রিটে হেলান দেবেন না: কংক্রিট দেওয়াল বা মেঝের ভেতরে থাকা ধাতব তারের মাধ্যমে বজ্রপাত প্রবাহিত হতে পারে।",
        "জানালা বন্ধ রাখুন: ঝড়ের সময় বাতাসের প্রবল চাপে জানালা ভেঙে যেতে পারে বা ধ্বংসাবশেষ ভেতরে আসতে পারে।"
      ]
    },
    { 
      title: "ভূমিকম্প", 
      desc: "সিসমিক সতর্কতা",
      todo: "ড্রপ, কভার এবং হোল্ড অন। মজবুত আসবাবপত্রের নিচে থাকুন।",
      details: [
        "ড্রপ, কভার এবং হোল্ড অন: হাত এবং হাঁটুর ওপর ভর দিয়ে নিচে বসে পড়ুন, মজবুত টেবিলের নিচে মাথা ও ঘাড় ঢেকে নিন এবং কম্পন না থামা পর্যন্ত শক্ত করে ধরে থাকুন।",
        "কাঁচ এবং আসবাবপত্র থেকে দূরে থাকুন: জানালা, আয়না, ঝোলানো বস্তু এবং লম্বা বইয়ের শেলফ থেকে দূরে সরে যান যা পড়ে যেতে পারে।",
        "স্বয়ংক্রিয় গ্যাস ও বিদ্যুৎ বিচ্ছিন্ন: লাইনের ছিদ্র বা তার ছিঁড়ে আগুন লাগা রোধ করতে আপনার স্মার্ট হাউস এআই স্বয়ংক্রিয়ভাবে মেইন গ্যাস এবং বিদ্যুৎ সংযোগ বন্ধ করে দেবে।",
        "বাইরে দৌড়াবেন না: বেশির ভাগ আঘাত লাগে যখন মানুষ কম্পনের সময় ভবন থেকে বের হওয়ার চেষ্টা করে। নিরাপদ না হওয়া পর্যন্ত ভেতরেই থাকুন।",
        "লিফট থেকে দূরে থাকুন: কম্পন থামা না পর্যন্ত লিফট ব্যবহার করবেন না এবং পরবর্তীতে সিঁড়ি ব্যবহার করুন।",
        "বাইরে থাকলে খোলা জায়গা খুঁজুন: ভবন, স্ট্রিটলাইট এবং ইউটিলিটি তার থেকে দূরে সরে যান। সবচেয়ে বড় বিপদ আসে ভবনের দেয়াল ধসে যাওয়ার কারণে।",
        "আফটারশকের জন্য প্রস্তুত থাকুন: এআই আপনাকে সতর্ক করবে যে মূল ভূমিকম্পের পরে ছোট ছোট কম্পন (আফটারশক) আসতে পারে যা আরও ক্ষতি করতে পারে।"
      ]
    }
  ];

  const navItems = language === 'english' ? [
    { name: 'Home', href: '#home', icon: <Home size={14} /> },
    { name: 'About Project', href: '#about', icon: <CheckCircle2 size={14} /> },
    { name: 'Dashboard', href: '#dashboard', icon: <Layout size={14} /> },
    { name: 'How It Works', href: '#how-it-works', icon: <Zap size={14} /> },
    { name: 'Smart House', href: '#smart-house', icon: <Shield size={14} /> },
    { name: 'Disaster Safety', href: '#disaster-safety', icon: <ShieldAlert size={14} /> },
    { name: 'AI Assistant', href: '#ai-hub', icon: <Bot size={14} /> },
    { name: 'Our Team', href: '#team', icon: <Users size={14} /> },
  ] : [
    { name: 'হোম', href: '#home', icon: <Home size={14} /> },
    { name: 'প্রজেক্ট সম্পর্কে', href: '#about', icon: <CheckCircle2 size={14} /> },
    { name: 'ড্যাশবোর্ড', href: '#dashboard', icon: <Layout size={14} /> },
    { name: 'এটি কীভাবে কাজ করে', href: '#how-it-works', icon: <Zap size={14} /> },
    { name: 'স্মার্ট হাউস', href: '#smart-house', icon: <Shield size={14} /> },
    { name: 'দুর্যোগ নিরাপত্তা', href: '#disaster-safety', icon: <ShieldAlert size={14} /> },
    { name: 'এআই সহকারী', href: '#ai-hub', icon: <Bot size={14} /> },
    { name: 'আমাদের টিম', href: '#team', icon: <Users size={14} /> },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-gold/30 overflow-x-hidden transition-colors duration-300 ${
      currentTheme === 'got' 
        ? 'bg-bg-dark text-slate-100' 
        : currentTheme === 'harry_potter'
          ? 'bg-[#1a0f00] text-[#e0c9a6]'
          : currentTheme === 'solo_leveling'
            ? 'bg-[#03060a] text-[#00e5ff]'
            : currentTheme === 'fc_mobile'
              ? (isDarkMode ? 'bg-[#001a0d] text-white' : 'bg-[#f0f2f5] text-slate-900')
              : currentTheme === 'blue_lock'
                ? 'bg-[#000814] text-[#00f2ff]'
                : currentTheme === 'immortal_king'
                  ? (isDarkMode ? 'bg-[#1a0505] text-[#ffd700]' : 'bg-[#fffaf0] text-[#8b0000]')
                  : currentTheme === 'rpg'
                  ? 'bg-[#3d2b1f] text-[#f4e4bc]'
                  : isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-bg-main text-slate-900'
    } ${isDarkMode ? 'dark' : ''}`}>
      {/* Dynamic Background Elements */}
      {currentTheme === 'got' && (
        <>
          <Dragon name="Drogon" color="#8b0000" delay={0} />
          <Dragon name="Balerion" color="#1a1a1a" delay={5} />
        </>
      )}

      {currentTheme === 'blue_lock' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Hexagonal Background Pattern */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45v-30z' fill-rule='evenodd' fill='%2300f2ff' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '30px'
          }} />
          
          {/* Floating Puzzle Fragments */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#00f2ff]/20 border border-[#00f2ff]/40"
              style={{
                width: 20 + Math.random() * 40,
                height: 20 + Math.random() * 40,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 70% 70%, 70% 100%, 0% 100%)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--tw-translate-x': `${(Math.random() - 0.5) * 400}px`,
                '--tw-translate-y': `${(Math.random() - 0.5) * 400}px`,
                '--tw-rotate': `${(Math.random() - 0.5) * 360}deg`
              } as any}
              animate={{
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                rotate: [0, (Math.random() - 0.5) * 45],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Random Glitch Scanners */}
          <motion.div 
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-20"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {currentTheme === 'solo_leveling' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Shadow Monarch Aura Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03060a] via-transparent to-[#03060a] opacity-60" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(138,43,226,0.2)]" />

          {/* Arise Animation Overlay */}
          <AnimatePresence>
            {showArise && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, letterSpacing: '0px' }}
                animate={{ opacity: 1, scale: 1, letterSpacing: '20px' }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center z-50"
              >
                <h1 className="text-8xl md:text-[12rem] font-black italic text-transparent bg-clip-text bg-gradient-to-b from-[#00e5ff] to-purple-600 drop-shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                  ARISE
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shadow Soldiers */}
          {[
            { id: 'igris', icon: <Sword size={40} />, x: '15%', y: '60%', name: 'IGRIS', color: '#ff0000' },
            { id: 'beru', icon: <Skull size={50} />, x: '80%', y: '40%', name: 'BERU', color: '#00e5ff' },
            { id: 'tusk', icon: <Flame size={45} />, x: '10%', y: '20%', name: 'TUSK', color: '#8a2be2' },
            { id: 'iron', icon: <Shield size={55} />, x: '85%', y: '70%', name: 'IRON', color: '#ffffff' },
            { id: 'shadow1', icon: <Ghost size={30} />, x: '30%', y: '15%', name: 'SHADOW', color: '#4b0082' },
            { id: 'shadow2', icon: <Ghost size={30} />, x: '70%', y: '80%', name: 'SHADOW', color: '#4b0082' },
          ].map((soldier, i) => (
            <motion.div
              key={soldier.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.4, 0.2], 
                y: [50, 0], 
                scale: 1,
                filter: ['blur(10px)', 'blur(2px)', 'blur(5px)']
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5 + (i * 0.2),
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 5
              }}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: soldier.x, top: soldier.y, color: soldier.color }}
            >
              <div className="relative group">
                {soldier.icon}
                {/* Shadow Glow */}
                <div className="absolute inset-0 blur-xl opacity-50 scale-150 rounded-full bg-current" />
              </div>
            </motion.div>
          ))}

          {/* Digital Grid with Perspective */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'top'
          }} />

          {/* Floating System Windows Patterns */}
          <motion.div 
            className="absolute top-1/4 right-[10%] w-64 h-40 border border-[#00e5ff]/20 bg-[#00e5ff]/5 backdrop-blur-sm overflow-hidden"
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="p-2 border-b border-[#00e5ff]/20 text-[8px] font-mono text-[#00e5ff] flex justify-between">
              <span>SYSTEM_SCAN.exe</span>
              <span className="animate-pulse">● LIVE</span>
            </div>
            <div className="p-3 font-mono text-[6px] text-[#00e5ff]/60 space-y-1">
              <div>{">"} INVENTORY: 8/100</div>
              <div>{">"} MANA: 14,200/15,000</div>
              <div>{">"} STATUS: S-RANK</div>
              <div className="w-full bg-[#00e5ff]/20 h-1 mt-2">
                <motion.div 
                  className="bg-[#00e5ff] h-full"
                  animate={{ width: ['0%', '80%', '40%', '90%'] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute top-[15%] left-[10%] w-32 h-32 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="text-[#00e5ff]">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="20,10" />
            </svg>
          </motion.div>

          <motion.div 
            className="absolute bottom-1/4 left-[5%] w-48 h-32 border border-[#00e5ff]/10 bg-[#00e5ff]/5"
            animate={{ y: [0, 15, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />

          {/* Rising Mana Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`mana-${i}`}
              className="absolute w-1 h-1 bg-[#00e5ff] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-20px',
              }}
              animate={{
                y: [0, -1000],
                opacity: [0, 1, 0],
                x: (Math.random() - 0.5) * 200
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
            />
          ))}

          {/* Scanning Line */}
          <motion.div 
            className="absolute left-0 w-full h-[2px] bg-[#00e5ff] opacity-20 shadow-[0_0_15px_#00e5ff]"
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {currentTheme === 'immortal_king' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Ancient Array Patterns */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
             <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
               <circle cx="50" cy="50" r="45" />
               <circle cx="50" cy="50" r="35" />
               <path d="M50 5 L50 95 M5 50 L95 50" />
               <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
             </svg>
          </motion.div>

          {/* Drifting Ink/Petals */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[40px] font-serif"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: isDarkMode ? '#ffd700' : '#8b0000',
                opacity: 0.05
              }}
              animate={{
                y: [0, -100],
                x: [0, 50],
                opacity: [0, 0.05, 0],
                rotate: [0, 20]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2
              }}
            >
              {['仙', '劍', '心', '道'][i % 4]}
            </motion.div>
          ))}
        </div>
      )}
      
      {currentTheme === 'harry_potter' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[1px]"
              animate={{
                opacity: [0, 0.8, 0],
                y: [Math.random() * 1000, 0],
                x: [Math.random() * 1000, Math.random() * 1000 + 50],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 border-b px-6 py-4 flex justify-between items-center transition-all shadow-2xl ${
        currentTheme === 'fc_mobile' ? 'backdrop-blur-none' : 'backdrop-blur-md'
      } ${
        currentTheme === 'got' ? 'bg-slate-900/95 border-gold/20' :
        currentTheme === 'harry_potter' ? 'bg-[#2a1b0a]/95 border-[#5c4033] text-[#e0c9a6]' :
        currentTheme === 'solo_leveling' ? 'bg-[#0b0e14]/95 border-[#00e5ff]/20 text-[#00e5ff]' :
        currentTheme === 'fc_mobile' ? 'bg-[#004a25]/95 border-white/20 text-white' :
        currentTheme === 'blue_lock' ? 'bg-[#001d3d]/95 border-[#00f2ff]/30 text-[#00f2ff]' :
        currentTheme === 'rpg' ? 'bg-[#5a4033]/95 border-[#2d1b0d] text-[#f4e4bc]' :
        'bg-white/80 border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <span className={`font-display font-black text-xl tracking-widest uppercase ${isEpicTheme ? 'text-gold' : 'text-brand-blue'}`}>Govt. Jubilee High School</span>
        </div>

        {/* Consolidated Navigation Dropdown */}
        <div className="flex items-center gap-4">
          <div className={`hidden sm:block border px-3 py-1 rounded-sm font-display text-xs tracking-widest shadow-xl transition-all ${
            currentTheme === 'got' ? 'bg-slate-950 text-gold border-gold/30 shadow-gold/10' :
            currentTheme === 'harry_potter' ? 'bg-[#1a0f00] text-yellow-500 border-[#5c4033] shadow-black/50' :
            currentTheme === 'solo_leveling' ? 'bg-[#03060a] text-[#00e5ff] border-[#00e5ff]/40 shadow-[#00e5ff]/10' :
            currentTheme === 'fc_mobile' ? 'bg-white text-[#004a25] border-transparent font-black skew-x-[-10deg]' :
            currentTheme === 'rpg' ? 'bg-[#3d2b1f] text-orange-400 border-[#2d1b0d] shadow-md' :
            'bg-slate-50 text-brand-blue border-slate-200'
          }`}>
            {energy.toFixed(2).padStart(6, '0')} {language === 'english' ? 'kW PRODUCED' : 'কিলোওয়াট উৎপাদিত'}
          </div>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className={`p-2 rounded-lg transition-all border flex items-center gap-2 ${
                currentTheme === 'got' ? 'bg-slate-900 border-gold/40 text-gold shadow-[0_0_15px_gold/20]' :
                currentTheme === 'harry_potter' ? 'bg-[#2a1b0a] border-[#5c4033] text-yellow-500' :
                currentTheme === 'solo_leveling' ? 'bg-[#0b0e14] border-[#00e5ff]/30 text-[#00e5ff] shadow-[0_0_15px_#00e5ff33]' :
                currentTheme === 'fc_mobile' ? 'bg-white border-transparent text-[#004a25] shadow-lg' :
                currentTheme === 'blue_lock' ? 'bg-[#003566] border-[#00f2ff]/50 text-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.3)]' :
                currentTheme === 'immortal_king' ? 'bg-white dark:bg-[#2d0a0a] border-[#8b0000] dark:border-[#ffd700] text-[#8b0000] dark:text-[#ffd700] shadow-md' :
                currentTheme === 'rpg' ? 'bg-[#5a4033] border-[#1a1510] text-orange-400 shadow-md' :
                'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title="Select Theme"
            >
              {currentTheme === 'got' && <Sword size={16} />}
              {currentTheme === 'harry_potter' && <Zap size={16} />}
              {currentTheme === 'solo_leveling' && <Activity size={16} />}
              {currentTheme === 'fc_mobile' && <Trophy size={16} />}
              {currentTheme === 'blue_lock' && <Target size={16} className="animate-pulse" />}
              {currentTheme === 'immortal_king' && <Flower size={16} />}
              {currentTheme === 'rpg' && <MapIcon size={16} />}
              {currentTheme === 'normal' && <Layout size={16} />}
              <span className="hidden md:block text-[10px] font-display font-bold uppercase tracking-widest">
                {currentTheme.replace('_', ' ')}
              </span>
            </button>

            <AnimatePresence>
              {isThemeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border overflow-y-auto max-h-[80vh] py-1 z-[70] ${
                    isEpicTheme || currentTheme !== 'normal' ? 'bg-slate-900 border-gold/20' : 'bg-white border-slate-200'
                  }`}
                >
                  {[
                    { id: 'normal', name: 'Normal UI', icon: <Layout size={14} /> },
                    { id: 'got', name: 'Game of Thrones', icon: <Sword size={14} /> },
                    { id: 'harry_potter', name: 'Harry Potter', icon: <Zap size={14} /> },
                    { id: 'solo_leveling', name: 'Solo Leveling', icon: <Activity size={14} /> },
                    { id: 'fc_mobile', name: 'FC Mobile UI', icon: <Trophy size={14} /> },
                    { id: 'blue_lock', name: 'Blue Lock UI', icon: <Target size={14} /> },
                    { id: 'immortal_king', name: 'Immortal King UI', icon: <Flower size={14} /> },
                    { id: 'rpg', name: 'RPG UI', icon: <MapIcon size={14} /> },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setCurrentTheme(theme.id as ThemeType);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-[10px] font-display font-bold uppercase tracking-widest flex items-center gap-3 transition-colors ${
                        currentTheme === theme.id 
                          ? 'bg-gold/10 text-gold font-black' 
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {theme.icon}
                      {theme.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-all border ${isEpicTheme ? 'bg-slate-900 text-gold border-gold/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Global Language Selector */}
        <div className="relative z-[60]">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-bold border ${
              currentTheme === 'got' ? 'bg-slate-900 border-gold/40 text-gold' :
              currentTheme === 'harry_potter' ? 'bg-[#2a1b0a] border-[#5c4033] text-yellow-500' :
              currentTheme === 'solo_leveling' ? 'bg-[#0b0e14] border-[#00e5ff]/30 text-[#00e5ff]' :
              currentTheme === 'fc_mobile' ? 'bg-white border-transparent text-[#004a25]' :
              currentTheme === 'blue_lock' ? 'bg-[#001d3d] border-[#00f2ff]/30 text-[#00f2ff]' :
              currentTheme === 'rpg' ? 'bg-[#5a4033] border-[#1a1510] text-orange-400' :
              'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Languages size={14} className={currentTheme === 'normal' ? 'text-brand-blue' : ''} />
            <span className="capitalize">{language}</span>
            <ChevronDown size={14} className={`transition-transform text-slate-400 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute right-0 mt-2 w-36 rounded-xl shadow-2xl border overflow-hidden py-1 ${
                  currentTheme === 'normal' ? 'bg-white border-slate-100' : 'bg-slate-900 border-white/10'
                }`}
              >
                <button 
                  onClick={() => { setLanguage('english'); setIsLangMenuOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left text-xs font-bold transition-colors ${
                    language === 'english' 
                      ? (currentTheme === 'normal' ? 'text-brand-blue bg-blue-50' : 'text-gold bg-white/5')
                      : 'text-slate-500 hover:bg-white/10'
                  }`}
                >
                  English
                </button>
                <button 
                  onClick={() => { setLanguage('bangla'); setIsLangMenuOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left text-xs font-bold transition-colors ${
                    language === 'bangla' 
                      ? (currentTheme === 'normal' ? 'text-brand-blue bg-blue-50' : 'text-gold bg-white/5')
                      : 'text-slate-500 hover:bg-white/10'
                  }`}
                >
                  বাংলা
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Menu Toggle */}
        <div className="relative">
          <button 
            className={`p-2 rounded-lg transition-all border ${
              currentTheme === 'got' ? 'bg-slate-900 border-gold/40 text-gold shadow-[0_0_10px_gold/20]' :
              currentTheme === 'harry_potter' ? 'bg-[#2a1b0a] border-[#5c4033] text-yellow-500' :
              currentTheme === 'solo_leveling' ? 'bg-[#0b0e14] border-[#00e5ff]/30 text-[#00e5ff] shadow-[0_0_10px_#00e5ff33]' :
              currentTheme === 'fc_mobile' ? 'bg-white border-transparent text-[#004a25]' :
              currentTheme === 'blue_lock' ? 'bg-[#001d3d] border-[#00f2ff]/30 text-[#00f2ff]' :
              currentTheme === 'rpg' ? 'bg-[#5a4033] border-[#1a1510] text-orange-400' :
              'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className={`absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl border overflow-y-auto max-h-[calc(100vh-100px)] z-[80] p-2 ${
                  currentTheme === 'normal' 
                    ? 'bg-white border-slate-100' 
                    : 'bg-slate-900/95 backdrop-blur-md border-white/10'
                }`}
              >
                <div className="grid grid-cols-1 gap-1">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.href === '#home') {
                          setActivePortal(null);
                        } else {
                          setActivePortal(item.href.replace('#', ''));
                        }
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all group font-display font-black uppercase tracking-[0.2em] text-[10px] ${
                        currentTheme === 'got' ? 'text-slate-400 hover:bg-gold/10 hover:text-gold border border-transparent hover:border-gold/20' :
                        currentTheme === 'harry_potter' ? 'text-[#e0c9a6]/60 hover:bg-yellow-500/10 hover:text-yellow-500' :
                        currentTheme === 'solo_leveling' ? 'text-blue-400/60 hover:bg-[#00e5ff]/10 hover:text-[#00e5ff] border border-transparent hover:border-[#00e5ff]/30 shadow-inner' :
                        currentTheme === 'fc_mobile' ? 'text-white/60 hover:bg-[#00ff85]/10 hover:text-[#00ff85] italic' :
                        currentTheme === 'blue_lock' ? 'text-blue-400/60 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff] skew-x-[-5deg]' :
                        currentTheme === 'immortal_king' ? 'text-red-800/60 dark:text-gold/60 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-gold' :
                        currentTheme === 'rpg' ? 'text-[#f4e4bc]/60 hover:bg-orange-400/10 hover:text-orange-400 border border-transparent hover:border-orange-400/20' :
                        'text-slate-500 hover:bg-blue-50 hover:text-brand-blue'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-all group-hover:scale-110 group-hover:rotate-6 ${
                        currentTheme === 'got' ? 'bg-slate-800 text-gold/50 group-hover:text-gold' :
                        currentTheme === 'harry_potter' ? 'bg-[#2a1b0a] text-yellow-500/50 group-hover:text-yellow-500' :
                        currentTheme === 'solo_leveling' ? 'bg-[#0b0e14] text-[#00e5ff]/50 group-hover:text-[#00e5ff] group-hover:shadow-[0_0_10px_#00e5ff33]' :
                        currentTheme === 'fc_mobile' ? 'bg-slate-800 text-[#00ff85]/50 group-hover:text-[#00ff85]' :
                        currentTheme === 'blue_lock' ? 'bg-[#001d3d] text-[#00f2ff]/50 group-hover:text-[#00f2ff]' :
                        'bg-slate-100 text-slate-400 group-hover:bg-brand-blue/10 group-hover:text-brand-blue'
                      }`}>
                        {item.icon}
                      </div>
                      <span className="flex-1">{item.name}</span>
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Portal Overlay System */}
      <AnimatePresence>
        {activePortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-6xl h-full max-h-[85vh] rounded-3xl border overflow-hidden flex flex-col shadow-2xl relative ${
                currentTheme === 'got' ? 'bg-slate-900 border-gold/30' :
                currentTheme === 'harry_potter' ? 'bg-[#1a0f00] border-yellow-500/30' :
                currentTheme === 'solo_leveling' ? 'bg-[#03060a] border-[#00e5ff]/30' :
                currentTheme === 'fc_mobile' ? 'bg-[#002d16] border-[#00ff85]/30' :
                currentTheme === 'blue_lock' ? 'bg-[#000814] border-[#00f2ff]/30' :
                'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className={`p-6 border-b flex justify-between items-center ${
                currentTheme === 'got' ? 'border-gold/10' :
                currentTheme === 'harry_potter' ? 'border-yellow-500/10' :
                currentTheme === 'solo_leveling' ? 'border-[#00e5ff]/10' :
                'border-slate-100 dark:border-slate-800'
              }`}>
                <h2 className={`font-display font-black uppercase tracking-[0.3em] text-sm ${
                  currentTheme === 'got' ? 'text-gold' :
                  currentTheme === 'harry_potter' ? 'text-yellow-500' :
                  currentTheme === 'solo_leveling' ? 'text-[#00e5ff]' :
                  'text-brand-blue'
                }`}>
                  {navItems.find(item => item.href.replace('#', '') === activePortal)?.name}
                </h2>
                <button 
                  onClick={() => setActivePortal(null)}
                  className={`p-2 rounded-full transition-all ${
                    currentTheme === 'got' ? 'bg-gold/10 text-gold hover:bg-gold/20' :
                    currentTheme === 'harry_potter' ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' :
                    currentTheme === 'solo_leveling' ? 'bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff]/20' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-8">
                {activePortal === 'about' && (
                   <div className="max-w-3xl mx-auto py-8">
                     <AboutProjectContent currentTheme={currentTheme} language={language} />
                   </div>
                )}
                {activePortal === 'dashboard' && (
                  <Dashboard 
                    energy={energy} 
                    language={language} 
                    history={energyHistory} 
                    weather={weather}
                    batteryLevel={batteryLevel}
                    hasLocation={!!location}
                    locationName={locationName}
                    locationStatus={locationStatus}
                    onRelocate={initLocation}
                    currentTheme={currentTheme}
                  />
                )}
                {activePortal === 'how-it-works' && (
                  <HowItWorksContent currentTheme={currentTheme} language={language} />
                )}
                {activePortal === 'smart-house' && (
                  <div className="h-full min-h-[500px]">
                    <SmartHouse3D language={language} weather={weather} currentTheme={currentTheme} />
                  </div>
                )}
                {activePortal === 'disaster-safety' && (
                  <DisasterSafety language={language} />
                )}
                {activePortal === 'ai-hub' && (
                   <div className="max-w-3xl mx-auto h-full">
                     <AIAssistant 
                      language={language} 
                      energy={energy} 
                      weather={weather} 
                      location={location} 
                      locationName={locationName} 
                      locationStatus={locationStatus} 
                      currentTheme={currentTheme}
                      isFullUI={true}
                    />
                   </div>
                )}
                {activePortal === 'team' && (
                  <TeamContent currentTheme={currentTheme} language={language} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`vibrant-card !p-0 overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[300px] relative transition-all duration-500 ${
              currentTheme === 'got' ? 'bg-slate-950 border-gold/30 shadow-gold/20 text-white min-h-[450px]' :
              currentTheme === 'harry_potter' ? 'bg-[#1a0f00] border-yellow-500/30 text-white min-h-[450px]' :
              currentTheme === 'solo_leveling' ? 'bg-gradient-to-br from-[#03060a] to-[#0b0e14] border-[#00e5ff]/50 text-white min-h-[450px] shadow-[0_0_40px_rgba(0,229,255,0.15)] relative overflow-hidden' :
              currentTheme === 'fc_mobile' ? 'bg-[#002d16] border-[#00ff85]/50 text-white min-h-[400px]' :
              currentTheme === 'blue_lock' ? 'bg-gradient-to-br from-[#000814] to-[#001d3d] border-[#00f2ff]/50 text-white min-h-[450px] shadow-[0_0_50px_rgba(0,242,255,0.1)]' :
              currentTheme === 'immortal_king' ? 'bg-[#fffaf0] dark:bg-[#1a0505] border-[#8b0000] dark:border-[#ffd700] text-[#8b0000] dark:text-white min-h-[450px] shadow-xl' :
              currentTheme === 'rpg' ? 'bg-[#3d2b1f] border-orange-500 text-white min-h-[400px]' :
              'bg-gradient-to-br from-brand-blue to-brand-green text-white shadow-xl'
            }`}
          >
            {/* Iron Throne style background textures */}
            {currentTheme === 'got' && (
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blood/30 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 blur-[100px]" />
              </div>
            )}

            <div className={`p-10 md:p-12 space-y-6 max-w-2xl relative z-10 ${currentTheme !== 'normal' ? 'md:p-20' : ''}`}>
              {currentTheme === 'got' ? (
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-4 overflow-hidden">
                    <div className="w-12 h-12 rounded-full border-2 border-gold bg-slate-900 flex items-center justify-center text-2xl shadow-xl z-30" title="Daenerys">👸🏼</div>
                    <div className="w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-2xl shadow-xl z-20" title="Jon Snow">🐺</div>
                    <div className="w-12 h-12 rounded-full border-2 border-blue-400 bg-slate-950 flex items-center justify-center text-2xl shadow-xl z-10" title="Night King">💀</div>
                  </div>
                  <div className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] font-display font-black tracking-[0.2em] uppercase">
                    The Pact of Ice and Fire
                  </div>
                </div>
              ) : currentTheme === 'harry_potter' ? (
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-yellow-500 bg-slate-900 flex items-center justify-center text-2xl shadow-xl z-30">⚡</div>
                  <div className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-display font-black tracking-[0.2em] uppercase">
                    The School of Witchcraft and Wizardry
                  </div>
                </div>
              ) : currentTheme === 'solo_leveling' ? (
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500 bg-slate-900 flex items-center justify-center text-2xl shadow-xl z-30">🗡️</div>
                  <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-500 text-[10px] font-display font-black tracking-[0.2em] uppercase">
                    Solo Leveling System Interface
                  </div>
                </div>
              ) : currentTheme === 'fc_mobile' ? (
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-slate-900 flex items-center justify-center text-2xl shadow-xl z-30">⚽</div>
                   <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-500 text-[10px] font-display font-black tracking-[0.2em] uppercase">
                    FC Mobile 24 Ultimate Team
                  </div>
                </div>
              ) : currentTheme === 'blue_lock' ? (
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-full border-2 border-[#00f2ff] bg-slate-900 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(0,242,255,0.5)] z-30">🧩</div>
                   <div className="inline-block px-3 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] text-[10px] font-display font-black tracking-[0.2em] uppercase">
                    Project: Blue Lock - Egoist System
                  </div>
                </div>
              ) : currentTheme === 'immortal_king' ? (
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-full border-2 border-[#8b0000] dark:border-[#ffd700] bg-white dark:bg-[#1a0505] flex items-center justify-center text-2xl shadow-xl z-30">🌸</div>
                   <div className="inline-block px-3 py-1 bg-[#8b0000]/10 dark:bg-[#ffd700]/10 border border-[#8b0000]/30 dark:border-[#ffd700]/30 text-[#8b0000] dark:text-[#ffd700] text-[10px] font-display font-black tracking-[0.2em] uppercase">
                    Realm: Immortal King - Cultivation Core
                  </div>
                </div>
              ) : currentTheme === 'rpg' ? (
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-full border-2 border-orange-500 bg-slate-900 flex items-center justify-center text-2xl shadow-xl z-30">📜</div>
                   <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[10px] font-display font-black tracking-[0.2em] uppercase">
                    World of Jubilee: RPG Edition
                  </div>
                </div>
              ) : (
                <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase mb-4 rounded-full">
                  Smart Science Fair Project
                </div>
              )}
              
              <h1 className={`font-display font-black leading-none tracking-tighter uppercase ${
                currentTheme !== 'normal' 
                  ? 'text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-500' 
                  : 'text-4xl md:text-5xl text-white'
              } ${currentTheme === 'blue_lock' ? 'animate-glitch hover:animation-play-state-running' : ''}`}>
                {currentTheme === 'got' ? (
                  language === 'english' ? (
                    <>The Iron<br /><span className="text-gold">Energy</span> House</>
                  ) : (
                    <>আয়রন<br /><span className="text-gold">এনার্জি</span> হাউস</>
                  )
                ) : currentTheme === 'harry_potter' ? (
                   language === 'english' ? (
                    <><span className="text-yellow-500">Magic</span> Saving<br />Castle</>
                  ) : (
                    <><span className="text-yellow-500">ম্যাজিক</span> সেভিং<br />ক্যাসেল</>
                  )
                ) : currentTheme === 'solo_leveling' ? (
                   language === 'english' ? (
                    <><span className="text-blue-400">Level Up</span><br />Energy Power</>
                  ) : (
                    <><span className="text-blue-400">লেভেল আপ</span><br />এনার্জি পাওয়ার</>
                  )
                ) : currentTheme === 'blue_lock' ? (
                  language === 'english' ? (
                   <><span className="text-[#00f2ff]">Egoist</span> Energy<br />Evolution</>
                 ) : (
                   <><span className="text-[#00f2ff]">ইগোইস্ট</span> এনার্জি<br />ইভোলিউশন</>
                 )
                ) : currentTheme === 'immortal_king' ? (
                   language === 'english' ? (
                    <><span className="text-red-500 dark:text-gold">Immortal</span> Energy<br />Ascension</>
                  ) : (
                    <><span className="text-red-500 dark:text-gold">অমর</span> শক্তি<br />উত্থান</>
                  )
                ) : (
                  language === 'english' ? (
                    <>Smart Energy Saving<br />AI House</>
                  ) : (
                    <>স্মার্ট এনার্জি সেভিং<br />এআই হাউস</>
                  )
                )}
              </h1>

              <p className={`text-lg opacity-80 font-display italic tracking-wide max-w-md ${currentTheme !== 'normal' ? 'text-slate-300' : 'text-white/90'}`}>
                {currentTheme === 'got' ? (
                  language === 'english' ? '"A house guarded by dragons, shielded by ice, and powered by the steps of heroes."' : '"ড্রাগন দ্বারা সুরক্ষিত, বরফ দ্বারা বেষ্টিত এবং বীরদের পদক্ষেপে চালিত একটি ঘর।"'
                ) : currentTheme === 'harry_potter' ? (
                  language === 'english' ? '"Your footsteps are the magic that lights up the Great Hall."' : '"আপনার পদক্ষেপগুলিই সেই জাদু যা গ্রেট হলকে আলোকিত করে।"'
                ) : currentTheme === 'solo_leveling' ? (
                  language === 'english' ? '"Daily Quest: Maintain energy flow to prove your strength to the System."' : '"ডেইলি কোয়েস্ট: সিস্টেমের কাছে আপনার শক্তি প্রমাণ করতে শক্তির প্রবাহ বজায় রাখুন।"'
                ) : currentTheme === 'blue_lock' ? (
                  language === 'english' ? '"Unleash your ego. Devour the heat to become the world\'s best energy savior."' : '"আপনার ইগো প্রকাশ করুন। বিশ্বের সেরা শক্তি সাশ্রয়কারী হতে উত্তাপকে গ্রাস করুন।"'
                ) : currentTheme === 'immortal_king' ? (
                  language === 'english' ? '"Harness the Qi of your steps to cultivate a brighter, sustainable realm."' : '"আরও উজ্জ্বল ও টেকসই ক্ষেত্র গড়ে তুলতে আপনার পদক্ষেপের শক্তিকে কাজে লাগান।"'
                ) : (
                  language === 'english' ? 'Generating Power from Steps, Saving Energy with Intelligence' : 'পা থেকে শক্তি উৎপাদন, বুদ্ধিমত্তার সাথে শক্তি সাশ্রয়'
                )}
              </p>
              
              <div className="pt-6 flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('dashboard')}
                  className={`px-8 py-4 font-display font-black text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center gap-2 ${
                    currentTheme === 'got' ? 'bg-gold text-slate-950 hover:bg-gold/80 shadow-gold/20' :
                    currentTheme === 'harry_potter' ? 'bg-[#5c4033] text-yellow-500 hover:bg-[#4a332a] border border-yellow-500/30' :
                    currentTheme === 'solo_leveling' ? 'bg-transparent text-[#00e5ff] border border-[#00e5ff] hover:bg-[#00e5ff]/10 shadow-[0_0_20px_#00e5ff44]' :
                    currentTheme === 'fc_mobile' ? 'bg-[#00ff85] text-[#002d16] hover:bg-[#00e676] skew-x-[-10deg]' :
                    currentTheme === 'blue_lock' ? 'bg-[#00f2ff] text-[#000814] hover:bg-white hover:shadow-[0_0_30px_#00f2ff] shadow-[#00f2ff]/20 animate-glitch' :
                    currentTheme === 'immortal_king' ? 'bg-red-600 dark:bg-gold text-white dark:text-red-950 hover:opacity-90 shadow-md transform hover:scale-105 transition-all' :
                    currentTheme === 'rpg' ? 'bg-orange-500 text-white border-2 border-[#1a1510] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#1a1510]' :
                    'bg-white text-brand-blue hover:bg-brand-blue-light'
                  }`}
                >
                  {currentTheme === 'got' && <Sword size={16} />}
                  {currentTheme === 'harry_potter' && <Zap size={16} />}
                  {currentTheme === 'solo_leveling' && <Activity size={16} />}
                  {currentTheme === 'fc_mobile' && <Trophy size={16} className="skew-x-[10deg]" />}
                  {currentTheme === 'blue_lock' && <Target size={16} className="animate-spin-slow" />}
                  {currentTheme === 'immortal_king' && <Flower size={16} />}
                  {currentTheme === 'rpg' && <MapIcon size={16} />}
                  {language === 'english' 
                    ? (currentTheme === 'got' ? 'Claim the Throne' : 
                       currentTheme === 'harry_potter' ? 'Enter the Great Hall' :
                       currentTheme === 'solo_leveling' ? 'Initialize System' :
                       currentTheme === 'fc_mobile' ? 'Kick Off' :
                       currentTheme === 'blue_lock' ? 'Devour Target' :
                       currentTheme === 'immortal_king' ? 'Enter Sect' :
                       currentTheme === 'rpg' ? 'Start Quest' : 'Enter Dashboard') 
                    : (currentTheme === 'got' ? 'সিংহাসন দাবি করুন' : 
                       currentTheme === 'harry_potter' ? 'গ্রেট হলে প্রবেশ করুন' :
                       currentTheme === 'solo_leveling' ? 'সিস্টেম শুরু করুন' :
                       currentTheme === 'fc_mobile' ? 'খেলা শুরু করুন' :
                       currentTheme === 'blue_lock' ? 'लक्ष্য পূরণ করুন' :
                       currentTheme === 'immortal_king' ? 'মাঠে প্রবেশ করুন' :
                       currentTheme === 'rpg' ? 'অভিযান শুরু করুন' : 'ড্যাশবোর্ডে প্রবেশ করুন')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid Content Area */}
      <motion.main 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="max-w-7xl mx-auto px-6 pb-20 space-y-6"
      >
        <motion.div variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 }
        }}>
          <ProjectSection id="dashboard" title={language === 'english' ? 'System Dashboard' : 'সিস্টেম ড্যাশবোর্ড'} currentTheme={currentTheme}>
            <Dashboard 
              energy={energy} 
              language={language} 
              history={energyHistory} 
              weather={weather}
              batteryLevel={batteryLevel}
              hasLocation={!!location}
              locationName={locationName}
              locationStatus={locationStatus}
              onRelocate={initLocation}
              currentTheme={currentTheme}
            />
          </ProjectSection>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 }
            }}
            className="lg:col-span-4 space-y-6"
          >
            <div id="about" className={`vibrant-card transition-all duration-500`}>
              <h2 className={`text-xs font-display font-black uppercase tracking-[0.2em] mb-6 border-b pb-2 ${
                currentTheme === 'got' ? 'text-gold border-gold/10' :
                currentTheme === 'harry_potter' ? 'text-yellow-500 border-yellow-500/10' :
                currentTheme === 'solo_leveling' ? 'text-[#00e5ff] border-[#00e5ff]/20' :
                currentTheme === 'fc_mobile' ? 'text-[#004a25] dark:text-[#00ff85] border-[#00ff85]/20' :
                currentTheme === 'rpg' ? 'text-orange-400 border-[#1a1510]/20' :
                'text-brand-blue dark:text-blue-400 border-slate-100 dark:border-slate-800'
              }`}>
                {(currentTheme === 'got' || currentTheme === 'harry_potter') && <div className={`w-2 h-2 inline-block mr-2 ${currentTheme === 'got' ? 'bg-gold/50' : 'bg-yellow-500/50'}`} />} 
                {language === 'english' ? (
                  currentTheme === 'got' ? 'The Great Design' : 
                  currentTheme === 'harry_potter' ? 'The Ancient Scrolls' : 
                  currentTheme === 'solo_leveling' ? 'System Overview' :
                  'About Project'
                ) : 'প্রজেক্ট সম্পর্কে'}
              </h2>
              <p className={`text-[10px] font-display italic leading-relaxed mb-6 ${
                currentTheme === 'got' ? 'text-slate-400' :
                currentTheme === 'harry_potter' ? 'text-[#e0c9a6]/80' :
                currentTheme === 'solo_leveling' ? 'text-blue-400/80 font-mono' :
                currentTheme === 'fc_mobile' ? 'text-slate-600 dark:text-white/80' :
                'text-slate-600 dark:text-slate-300'
              }`}>
                {language === 'english' 
                  ? (currentTheme === 'got' ? 'Our work employs enchanted floor tiles that harvest the spirit of movement, converting every step into iron-clad power.' : 
                     currentTheme === 'harry_potter' ? 'Special floor tiles woven with ancient charms to harvest the magic of footsteps.' :
                     currentTheme === 'solo_leveling' ? 'A high-rank energy harvesting system utilizing kinetic impact tiles.' :
                     'Smart energy saving AI house project built by students of Govt. Jubilee High School.')
                  : 'গভর্নমেন্ট জুবিলী হাই স্কুলের ছাত্রদের দ্বারা নির্মিত একটি স্মার্ট এনার্জি সেভিং এআই হাউস প্রজেক্ট।'}
              </p>
            </div>
          </motion.div>

          {/* Main Info Columns */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 20 },
              show: { opacity: 1, x: 0 }
            }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                id="how-it-works" 
                className={`vibrant-card transition-all duration-500`}
              >
                <h2 className={`text-xs font-display font-black uppercase tracking-[0.2em] mb-6 border-b pb-2 ${
                  currentTheme === 'got' ? 'text-gold border-gold/10' :
                  currentTheme === 'harry_potter' ? 'text-yellow-500 border-yellow-500/10' :
                  currentTheme === 'solo_leveling' ? 'text-[#00e5ff] border-[#00e5ff]/20' :
                  'text-brand-blue dark:text-blue-400 border-slate-100 dark:border-slate-800'
                }`}>
                  {language === 'english' ? (
                    currentTheme === 'got' ? 'Alchemy & Intelligence' : 
                    currentTheme === 'harry_potter' ? 'Wands & Wisdom' : 
                    currentTheme === 'solo_leveling' ? 'Logic & Mana' :
                    'How It Works'
                  ) : 'এটি কীভাবে কাজ করে'}
                </h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h3 className={`text-[10px] font-display font-black uppercase mb-2 tracking-widest ${
                      currentTheme === 'got' ? 'text-gold' :
                      currentTheme === 'harry_potter' ? 'text-yellow-500' :
                      currentTheme === 'solo_leveling' ? 'text-[#00e5ff]' :
                      'text-brand-blue dark:text-blue-400'
                    }`}>{language === 'english' ? (currentTheme === 'got' ? 'Iron Assistant' : 'Magic Mirror') : 'এআই সহকারী'}</h3>
                    <p className={`text-[10px] font-display italic leading-tight ${currentTheme === 'normal' ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 opacity-60'}`}>
                      {language === 'english' ? 'Reminds you to save and guards the home.' : 'মনে করিয়ে দেয় এবং ঘর রক্ষা করে।'}
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <h3 className={`text-[10px] font-display font-black uppercase mb-2 tracking-widest ${
                      currentTheme === 'got' ? 'text-blood' :
                      currentTheme === 'harry_potter' ? 'text-yellow-500' :
                      currentTheme === 'solo_leveling' ? 'text-[#00e5ff]' :
                      'text-brand-blue dark:text-blue-400'
                    }`}>{language === 'english' ? 'Sensors' : 'সেন্সর'}</h3>
                    <p className={`text-[10px] font-display italic leading-tight ${currentTheme === 'normal' ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 opacity-60'}`}>
                      {language === 'english' ? 'Detects movement to save power.' : 'চলাচল শনাক্ত করে শক্তি বাঁচায়।'}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                id="team" 
                className={`vibrant-card flex flex-col h-full transition-all duration-500`}
              >
                <div className="flex-1">
                  <h2 className={`text-xs font-display font-black uppercase tracking-[0.2em] mb-6 border-b pb-2 ${
                    currentTheme === 'got' ? 'text-gold border-gold/10' :
                    currentTheme === 'harry_potter' ? 'text-yellow-500 border-yellow-500/10' :
                    currentTheme === 'solo_leveling' ? 'text-[#00e5ff] border-[#00e5ff]/20' :
                    currentTheme === 'fc_mobile' ? 'text-[#004a25] border-[#00ff85]/20' :
                    currentTheme === 'rpg' ? 'text-orange-400 border-[#1a1510]/20' :
                    'text-brand-blue border-slate-100'
                  }`}>
                    {language === 'english' ? (
                      currentTheme === 'got' ? 'The High Council' : 
                      currentTheme === 'harry_potter' ? 'The Order of Jubilee' : 
                      currentTheme === 'solo_leveling' ? 'S-Rank Hunters' :
                      currentTheme === 'fc_mobile' ? 'Ultimate XI Team' :
                      currentTheme === 'rpg' ? 'Party Members' : 'Our Team'
                    ) : 'আমাদের টিম'}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {['Swapnodeep Talukdar', 'Shahriyer Tahmid Jihad', 'Ibtehazul Hoque Jareef', 'Ahnaf Siddique Rafi', 'Md. Abdur Rakib'].map((name, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        key={i} 
                        className={`px-4 py-3 border-l-2 text-[10px] font-display font-black tracking-widest uppercase transition-colors ${
                        currentTheme === 'got' ? 'bg-slate-900 border-gold/40 text-slate-100 hover:bg-gold/5' :
                        currentTheme === 'harry_potter' ? 'bg-[#5c4033]/30 border-yellow-500 text-[#e0c9a6] hover:bg-yellow-500/10' :
                        currentTheme === 'solo_leveling' ? 'bg-[#00e5ff]/5 border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 font-mono' :
                        currentTheme === 'fc_mobile' ? 'bg-white dark:bg-[#004a25]/40 border-[#00ff85] text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#004a25]/60 italic font-black' :
                        currentTheme === 'rpg' ? 'bg-[#1a1510]/50 border-orange-500 text-[#f4e4bc] hover:bg-orange-500/10' :
                        'bg-slate-50 border-brand-blue text-slate-700 hover:bg-slate-100'
                      }`}>
                        {name}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className={`mt-8 pt-6 border-t ${currentTheme === 'got' ? 'border-gold/10' : currentTheme === 'fc_mobile' ? 'border-white/10' : 'border-slate-100'}`}>
                  <h2 className={`text-xs font-display font-black uppercase tracking-[0.2em] mb-3 ${
                    currentTheme === 'got' ? 'text-gold/60' :
                    currentTheme === 'harry_potter' ? 'text-yellow-500/60' :
                    currentTheme === 'fc_mobile' ? 'text-[#00ff85]/60' :
                    'text-slate-500 dark:text-slate-400'
                  }`}>{language === 'english' ? (currentTheme === 'got' ? 'Our Vows' : currentTheme === 'harry_potter' ? 'Wizarding Oath' : 'Our Mission') : 'আমাদের অঙ্গীকার'}</h2>
                  <p className={`text-[10px] leading-relaxed font-display italic ${currentTheme === 'fc_mobile' ? 'text-white' : 'text-slate-600 dark:text-slate-300'} opacity-70`}>
                    {language === 'english' 
                      ? 'Building a sustainable future for Govt. Jubilee High School.'
                      : 'গভর্নমেন্ট জুবিলী হাই স্কুলের জন্য একটি টেকসই ভবিষ্যৎ গড়ে তোলা।'}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Existing Components - Still visible but styled */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0 }
          }}
          className="pt-12 space-y-12"
        >
          <ProjectSection id="smart-house" title={language === 'english' ? 'House Interior & AI Hub' : 'বাড়ির অভ্যন্তর ও এআই হাব'} currentTheme={currentTheme}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-8"
              >
                <SmartHouse3D language={language} weather={weather} currentTheme={currentTheme} />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-4 space-y-6"
              >
                <AIAssistant 
                  language={language} 
                  energy={energy} 
                  weather={weather} 
                  location={location} 
                  locationName={locationName} 
                  locationStatus={locationStatus} 
                  currentTheme={currentTheme}
                />
                <ElectricityCounter energyOverride={energy} onStep={handleStep} language={language} currentTheme={currentTheme} />
              </motion.div>
            </div>
          </ProjectSection>
          
          <ProjectSection id="disaster-safety" title={language === 'english' ? 'Emergency & Disaster Response' : 'জরুরী ও বিপর্যয় মোকাবিলা'} dark>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <DisasterSafety language={language} />
            </motion.div>
          </ProjectSection>
        </motion.div>

      {/* Global Earthquake Alert Overlay */}
        <div id="earthquake-alert" className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-red-950/80 hidden ${currentTheme === 'fc_mobile' ? '' : 'backdrop-blur-sm'}`}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="vibrant-card max-w-lg w-full text-center border-4 border-red-600 bg-slate-900"
          >
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-ping">
              <ShieldAlert size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-black text-red-500 mb-4 animate-bounce">
              {language === 'english' ? 'EARTHQUAKE ALERT!' : 'ভূমিকম্প সতর্কতা!'}
            </h2>
            <p className="text-xl text-white font-bold mb-8">
              {language === 'english' 
                ? <>Seismic activity detected. <br />DROP, COVER, AND HOLD ON NOW!</>
                : <>সিসমিক কার্যকলাপ শনাক্ত করা হয়েছে। <br />এখনই ড্রপ, কভার এবং হোল্ড অন করুন!</>}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {(language === 'english' ? ['Drop', 'Cover', 'Hold On'] : ['ড্রপ', 'কভার', 'হোল্ড অন']).map((step, i) => (
                <div key={i} className="bg-red-600 text-white p-3 rounded-lg font-black uppercase text-xs">
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`border-t py-10 px-6 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest transition-all duration-500 ${
        currentTheme === 'got' ? 'bg-slate-950 border-gold/20 text-slate-500 font-display' :
        currentTheme === 'harry_potter' ? 'bg-[#1a0f00] border-[#5c4033] text-[#e0c9a6]/50' :
        currentTheme === 'solo_leveling' ? 'bg-[#03060a] border-[#00e5ff]/20 text-[#00e5ff]/50 font-mono' :
        currentTheme === 'fc_mobile' ? 'bg-[#002d16] border-white/10 text-white/50' :
        currentTheme === 'rpg' ? 'bg-[#1a1510] border-[#2d1b0d] text-[#f4e4bc]/50' :
        'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800'
      }`}>
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className={`w-2 h-2 animate-pulse ${
            currentTheme === 'got' ? 'bg-gold' :
            currentTheme === 'harry_potter' ? 'bg-yellow-500' :
            currentTheme === 'solo_leveling' ? 'bg-[#00e5ff]' :
            currentTheme === 'fc_mobile' ? 'bg-[#00ff85]' :
            'bg-brand-blue'
          }`} />
          <span className="tracking-[0.2em]">
            {currentTheme === 'got' ? 'The Citadel of Jubilee' :
             currentTheme === 'harry_potter' ? 'The Ministry of Jubilee' :
             currentTheme === 'solo_leveling' ? 'District of Jubilee' :
             currentTheme === 'fc_mobile' ? 'Jubilee Arena' :
             'Science Fest 2026'}
          </span>
        </div>
        <div className="text-center opacity-60 leading-relaxed max-w-sm">
          {currentTheme === 'got' ? (
            <>The scrolls of JS-2026-ENG-42 are preserved for all eternity.<br />Winter came, and the Jubileans were ready.</>
          ) : currentTheme === 'harry_potter' ? (
            <>Mischief Managed. JS-2026-ENG-42.<br />Expecto Patronum!</>
          ) : (
            <>Thank you for visiting our project website.<br />Project ID: JS-2026-ENG-42</>
          )}
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
           {currentTheme === 'got' ? (
             <>
               <span className="text-gold/40">Fire and Blood</span>
               <span className="text-blue-400/40">Winter is Coming</span>
             </>
           ) : currentTheme === 'harry_potter' ? (
             <>
               <span className="text-yellow-500/40">Gryffindor Spirit</span>
               <span className="text-yellow-500/40">Hufflepuff Heart</span>
             </>
           ) : (
             <span>Built by Team Jubileans</span>
           )}
        </div>
      </motion.footer>
    </div>
  );
}


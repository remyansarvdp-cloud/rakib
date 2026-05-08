import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Zap, 
  Battery, 
  Lightbulb, 
  Thermometer, 
  Wind, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  RefreshCw,
  Trophy,
  Star,
  Flame,
  Snowflake,
  Shield,
  Sword,
  Target,
  Flower
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, ThemeType } from '../types';

interface DashboardProps {
  energy: number;
  language: Language;
  history: Array<{ time: string; generation: number; consumption: number }>;
  weather: { temp: number; condition: string; windSpeed: number } | null;
  batteryLevel: number | null;
  hasLocation: boolean;
  locationName: string | null;
  locationStatus: 'loading' | 'active' | 'denied' | 'error';
  onRelocate: () => void;
  currentTheme?: ThemeType;
}

export default function Dashboard({ 
  energy, 
  language, 
  history, 
  weather, 
  batteryLevel, 
  hasLocation, 
  locationName,
  locationStatus,
  onRelocate,
  currentTheme = 'normal'
}: DashboardProps) {
  const isEnglish = language === 'english';
  
  const getThemeColors = () => {
    switch(currentTheme) {
      case 'got': return { primary: '#b8860b', secondary: '#8b0000', accent: '#2d3436', text: '#f8fafc', bg: '#0f172a' };
      case 'harry_potter': return { primary: '#eab308', secondary: '#78350f', accent: '#451a03', text: '#fef3c7', bg: '#1c1917' };
      case 'solo_leveling': return { primary: '#00e5ff', secondary: '#006064', accent: '#03060a', text: '#e0f7fa', bg: '#03060a' };
      case 'fc_mobile': return { primary: '#00ff85', secondary: '#004a25', accent: '#ffffff', text: '#ffffff', bg: '#002d16' };
      case 'rpg': return { primary: '#f97316', secondary: '#7c2d12', accent: '#1a1510', text: '#fde68a', bg: '#1a1510' };
      default: return { primary: '#3b82f6', secondary: '#1e3a8a', accent: '#f8fafc', text: '#1e293b', bg: '#ffffff' };
    }
  };

  const colors = getThemeColors();

  const getAlertMessage = () => {
    if (!weather) return isEnglish ? 'System diagnostics running. All sensors active.' : 'সিস্টেম ডায়াগনস্টিক চলছে। সব সেন্সর সক্রিয়।';
    
    if (weather.windSpeed > 30) {
      return isEnglish 
        ? (currentTheme === 'got' ? `High wind alert (${weather.windSpeed} km/h). Lord Commander Jon Snow has secured the wall.` : `High wind alert detected. Aero-turbines are in safety mode.`)
        : `প্রবল বাতাস সতর্কতা (${weather.windSpeed} কিমি/ঘন্টা)।`;
    }
    
    if (weather.condition === 'Thunderstorm') {
      return isEnglish
        ? (currentTheme === 'harry_potter' ? 'A magical storm approaches from the Forbidden Forest. Wards are fully activated.' : 'Extreme weather detected. Lightning redirection systems active.')
        : 'প্রবল ঝড় আসছে! সিস্টেম সুরক্ষা সক্রিয়।';
    }
    
    if (weather.condition === 'Snowy' || weather.temp < 5) {
      return isEnglish
        ? (currentTheme === 'got' ? 'Winter is here! The Night King approaches. Heat diverted to the hearth.' : 'Low temperature warning. Heating systems optimized for energy saving.')
        : 'তীব্র শীতের সতর্কতা। হিটিং সিস্টেম অপ্টিমাইজ করা হয়েছে।';
    }

    return isEnglish
      ? (currentTheme === 'got' ? `The sun shines on the Iron Throne. Weather is ${weather.condition}. Dracarys!` : `Operational efficiency is at peak. Local climate is ${weather.condition}.`)
      : `সিস্টেম দক্ষতা চরমে। আপনার স্থানীয় আবহাওয়া ${weather.condition === 'Clear' ? 'পরিষ্কার' : 'স্বাভাবিক'}।`;
  };

  const deviceData = [
    { name: isEnglish ? 'Lights' : 'লাইট', value: 30, color: colors.primary },
    { name: isEnglish ? 'Fans' : 'ফ্যান', value: 45, color: colors.secondary },
    { name: isEnglish ? 'AI Ops' : 'এআই কাজ', value: 15, color: colors.accent },
    { name: isEnglish ? 'Misc' : 'অন্যান্য', value: 10, color: '#64748b' },
  ];

  const stats = [
    { 
      label: isEnglish ? (currentTheme === 'got' ? 'Iron Power' : currentTheme === 'harry_potter' ? 'Magic Potency' : currentTheme === 'solo_leveling' ? 'Mana Reserves' : 'Total Energy') : 'মোট শক্তি', 
      value: `${energy.toFixed(2)} kW`, 
      icon: <Zap style={{ color: colors.primary }} />,
      sub: isEnglish ? '+12% efficiency' : 'দক্ষতা +১২%'
    },
    { 
      label: isEnglish ? (currentTheme === 'got' ? 'Vault Level' : currentTheme === 'harry_potter' ? 'Gringotts Storage' : 'Storage Level') : 'স্টোরেজ লেভেল', 
      value: batteryLevel !== null ? `${batteryLevel}%` : '84%', 
      icon: <Battery style={{ color: colors.primary }} />,
      sub: isEnglish ? 'Optimal health' : 'সঠিক অবস্থা'
    },
    { 
      label: isEnglish ? (currentTheme === 'got' ? 'Castle Safety' : currentTheme === 'harry_potter' ? 'Castle Wards' : 'House Safety') : 'বাড়ির নিরাপত্তা', 
      value: isEnglish ? 'Secure' : 'নিরাপদ', 
      icon: <CheckCircle2 style={{ color: colors.primary }} />,
      sub: isEnglish ? 'All wards active' : 'সব সেন্সর সচল'
    },
    { 
      label: locationName || (isEnglish ? 'Location Climate' : 'আবহাওয়া'), 
      value: weather ? `${weather.temp}°C` : '...', 
      icon: (
        <div className="relative">
          <Thermometer style={{ color: currentTheme === 'got' ? '#8b0000' : colors.primary }} />
          <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white ${
            locationStatus === 'active' ? 'bg-green-500' : 
            locationStatus === 'loading' ? 'bg-blue-500 animate-ping' : 'bg-gray-400'
          }`} />
        </div>
      ),
      sub: (
        <button onClick={onRelocate} className="hover:underline text-[9px] uppercase font-bold tracking-tighter opacity-70">
          {isEnglish ? 'Update Position' : 'অবস্থান পরিবর্তন'}
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 transition-all group ${
              currentTheme === 'got' ? 'bg-slate-900 border border-gold/20 rounded-none hover:border-gold/50' :
              currentTheme === 'harry_potter' ? 'bg-[#5c4033]/20 border border-yellow-500/20 rounded-lg' :
              currentTheme === 'solo_leveling' ? 'bg-transparent border border-[#00e5ff]/20 rounded-none border-l-4' :
              currentTheme === 'fc_mobile' ? 'bg-white dark:bg-[#002d16] border-2 border-[#00ff85] italic font-bold shadow-lg' :
              currentTheme === 'blue_lock' ? 'bg-[#001d3d] border border-[#00f2ff]/30 shadow-[0_0_15px_rgba(0,242,255,0.1)] hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:-translate-y-1' :
              currentTheme === 'immortal_king' ? 'vibrant-card border-2 border-[#8b0000] dark:border-[#ffd700] hover:shadow-[10px_10px_0px_#8b0000]' :
              currentTheme === 'rpg' ? 'bg-[#3d2b1f] border border-[#1a1510] shadow-xl' :
              'bg-white border border-slate-100 rounded-xl'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 opacity-80">{stat.icon}</div>
              <span className={`text-[10px] uppercase font-black tracking-widest ${
                currentTheme === 'fc_mobile' ? 'text-slate-500 dark:text-[#00ff85]/60' : 
                currentTheme === 'blue_lock' ? 'text-[#00f2ff]/60' : 
                currentTheme === 'solo_leveling' ? 'text-[#00e5ff] font-mono shadow-[0_0_5px_#00e5ff33]' :
                currentTheme === 'immortal_king' ? 'text-red-900/60 dark:text-[#ffd700]/60' : 'opacity-80'}`}>
                {currentTheme === 'solo_leveling' 
                  ? (stat.label.includes('Energy') || stat.label.includes('শক্তির') ? 'STRENGTH' : stat.label.includes('Steps') || stat.label.includes('পদক্ষেপ') ? 'AGILITY' : 'PERCEPTION')
                  : stat.label}
              </span>
            </div>
            <div className={`text-xl font-black ${
              currentTheme === 'fc_mobile' ? 'text-[#004a25] dark:text-white' :
              currentTheme === 'blue_lock' ? 'text-white' :
              currentTheme === 'immortal_king' ? 'text-red-900 dark:text-gold' :
              currentTheme === 'normal' ? 'text-slate-800 dark:text-slate-100' : 'text-white'
            }`}>{stat.value}</div>
            <div className={`text-[11px] mt-1.5 font-medium ${
              currentTheme === 'fc_mobile' ? 'text-slate-500 dark:text-[#00ff85]/60' :
              currentTheme === 'blue_lock' ? 'text-[#00f2ff]/60' :
              currentTheme === 'immortal_king' ? 'text-red-900/60 dark:text-[#ffd700]/60' :
              currentTheme === 'normal' ? 'text-slate-700 dark:text-slate-300' : 'opacity-70'
            }`}>{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-8 p-6 transition-all ${
          currentTheme === 'got' ? 'bg-slate-900 border border-gold/20 rounded-none' :
          currentTheme === 'harry_potter' ? 'bg-[#2a1b0a] border border-yellow-500/30 rounded-xl' :
          currentTheme === 'solo_leveling' ? 'bg-[#03060a]/90 border border-[#00e5ff]/30' :
          currentTheme === 'fc_mobile' ? 'bg-[#002d16] border-4 border-[#00ff85] skew-x-[-1deg]' :
          currentTheme === 'blue_lock' ? 'bg-[#000814] border-2 border-[#00f2ff]/40 shadow-2xl relative overflow-hidden' :
          currentTheme === 'immortal_king' ? 'bg-[#fffaf0] dark:bg-[#1a0505] border-[4px] border-[#8b0000] dark:border-[#ffd700] p-8' :
          'bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl'
        }`}>
          {currentTheme === 'blue_lock' && (
            <>
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f2ff] blur-[50px] -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600 blur-[50px] -ml-16 -mb-16" />
              </div>
              <div className="scanline" />
            </>
          )}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className={`font-black text-sm flex items-center gap-3 uppercase tracking-[0.2em] ${currentTheme === 'normal' ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              {currentTheme === 'solo_leveling' ? <Shield size={16} className="text-[#00e5ff]" /> : <Activity size={16} />}
              {isEnglish 
                ? (currentTheme === 'got' ? 'Citadel Energy Flow' : 
                   currentTheme === 'blue_lock' ? 'Egoist Evolution Pulse' : 
                   currentTheme === 'immortal_king' ? 'Celestial Qi Flow' : 
                   currentTheme === 'solo_leveling' ? '[ DAILY QUEST: PREPARATION TO BECOME POWERFUL ]' :
                   'Core Activity') 
                : 'সিস্টেম কার্যক্রম'}
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 opacity-60">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                <span className="text-[9px] font-black uppercase tracking-widest">{isEnglish ? 'Input' : 'উৎপাদন'}</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondary }} />
                <span className="text-[9px] font-black uppercase tracking-widest">{isEnglish ? 'Drain' : 'ব্যবহার'}</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.secondary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.primary} opacity={0.1} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: colors.primary, opacity: 0.7 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: colors.primary, opacity: 0.7 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.bg, 
                    border: `1px solid ${colors.primary}40`, 
                    borderRadius: currentTheme === 'normal' ? '12px' : '0px',
                    fontFamily: 'inherit'
                  }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="generation" stroke={colors.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
                <Area type="monotone" dataKey="consumption" stroke={colors.secondary} strokeWidth={2} fillOpacity={1} fill="url(#colorCons)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 transition-all ${
            currentTheme === 'got' ? 'bg-slate-900 border border-gold/20 rounded-none' :
            currentTheme === 'harry_potter' ? 'bg-[#5c4033]/20 border border-yellow-500/30 rounded-xl' :
            currentTheme === 'solo_leveling' ? 'bg-[#03060a]/90 border border-[#00e5ff]/30' :
            currentTheme === 'blue_lock' ? 'bg-[#001d3d] border border-[#00f2ff]/40 shadow-inner' :
            currentTheme === 'immortal_king' ? 'bg-white dark:bg-[#2d0a0a] border-2 border-[#8b0000] dark:border-[#ffd700]' :
            'bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md'
          }`}>
            <h3 className={`font-black text-sm mb-4 uppercase tracking-widest ${currentTheme === 'normal' ? 'text-slate-900 dark:text-slate-100' : 'text-white'}`}>
              {isEnglish ? 'Resource Usage' : 'সম্পদ বন্টন'}
            </h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {deviceData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-black uppercase tracking-tighter opacity-80">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`p-5 relative overflow-hidden ${
              currentTheme === 'got' ? 'bg-blood/10 border border-blood/30 rounded-none' :
              currentTheme === 'harry_potter' ? 'bg-yellow-500/10 border border-yellow-500/30 rounded-xl font-serif' :
              currentTheme === 'solo_leveling' ? 'bg-[#00e5ff]/5 border border-[#00e5ff]/30 rounded-none italic' :
              currentTheme === 'blue_lock' ? 'bg-[#00f2ff]/5 border border-[#00f2ff]/30 rounded-none font-bold' :
              currentTheme === 'immortal_king' ? 'bg-white dark:bg-[#1a0505] border-2 border-[#8b0000] dark:border-[#ffd700] font-serif italic' :
              'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl'
            }`}
          >
            <div className={`flex items-center gap-2 mb-2 relative z-10 ${currentTheme === 'got' ? 'text-blood' : currentTheme === 'normal' ? 'text-blue-600 dark:text-blue-400' : currentTheme === 'blue_lock' ? 'text-[#00f2ff]' : currentTheme === 'immortal_king' ? 'text-red-700 dark:text-gold' : 'text-white'}`}>
              {currentTheme === 'solo_leveling' || currentTheme === 'blue_lock' ? <Target size={14} /> : currentTheme === 'immortal_king' ? <Flower size={14} /> : <AlertTriangle size={14} />}
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {isEnglish ? (currentTheme === 'got' ? 'Citadel Raven' : currentTheme === 'harry_potter' ? 'Owl Message' : currentTheme === 'solo_leveling' ? 'System Notification' : currentTheme === 'blue_lock' ? 'Egoist Message' : currentTheme === 'immortal_king' ? 'Scroll Message' : 'Assistant Feed') : 'সিস্টেম ফিড'}
              </span>
            </div>
            <p className={`text-[10px] leading-relaxed relative z-10 transition-colors opacity-80 italic ${currentTheme === 'normal' ? 'text-slate-700 dark:text-slate-200' : ''}`}>
              {getAlertMessage()}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

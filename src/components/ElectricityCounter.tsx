import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Footprints, Zap, Sword, Target, Trophy, Star, Flower, Skull } from 'lucide-react';
import { Language, ThemeType } from '../types';

interface ElectricityCounterProps {
  energyOverride?: number;
  onStep?: () => void;
  language?: Language;
  currentTheme?: ThemeType;
}

export default function ElectricityCounter({ energyOverride, onStep, language = 'english', currentTheme = 'normal' }: ElectricityCounterProps) {
  const [localEnergy, setLocalEnergy] = useState(0);
  const [isStepping, setIsStepping] = useState(false);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const controls = useAnimation();

  const energy = energyOverride !== undefined ? energyOverride : localEnergy;

  const handleStep = () => {
    setIsStepping(true);
    setStepCount(prev => prev + 1);

    if (onStep) {
      onStep();
    } else {
      setLocalEnergy(prev => prev + 0.5);
    }

    if ((stepCount + 1) % 20 === 0 && currentTheme === 'solo_leveling') {
      setIsLevelUp(true);
      setTimeout(() => setIsLevelUp(false), 2000);
    }
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.2 }
    });
    setTimeout(() => setIsStepping(false), 200);
  };

  const getThemeStyles = () => {
    switch(currentTheme) {
      case 'got': return { primary: 'gold', secondary: 'slate-900', bg: 'bg-slate-950', border: 'border-gold/30', icon: Sword };
      case 'harry_potter': return { primary: 'yellow-500', secondary: '[#5c4033]', bg: 'bg-[#1a0f00]', border: 'border-yellow-500/30', icon: Zap };
      case 'solo_leveling': return { primary: '[#00e5ff]', secondary: 'slate-900', bg: 'bg-[#03060a]', border: 'border-[#00e5ff]/30', icon: Skull };
      case 'fc_mobile': return { primary: '[#00ff85]', secondary: 'white', bg: 'bg-[#002d16]', border: 'border-white/20', icon: Trophy };
      case 'blue_lock': return { primary: '[#00f2ff]', secondary: 'slate-900', bg: 'bg-[#000814]', border: 'border-[#00f2ff]/30', icon: Target };
      case 'immortal_king': return { primary: '[#8b0000]', secondary: 'dark:text-[#ffd700]', bg: 'bg-[#fffaf0]', border: 'border-[#8b0000]/30', icon: Flower };
      default: return { primary: 'brand-blue', secondary: 'slate-100', bg: 'bg-white', border: 'border-slate-200', icon: Footprints };
    }
  };

  const themeStyles = getThemeStyles();
  const Icon = themeStyles.icon;

  return (
    <div className={`flex flex-col items-center gap-6 vibrant-card w-full max-w-md mx-auto border transition-all duration-500 ${themeStyles.bg} ${themeStyles.border}`}>
      {currentTheme === 'solo_leveling' && isLevelUp && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0.8, 1.2, 1.1, 1],
            y: [0, -100, -120, -150]
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute z-50 flex flex-col items-center"
        >
          <div className="bg-[#03060a]/90 border-2 border-[#00e5ff] px-8 py-3 shadow-[0_0_50px_rgba(0,229,255,0.5)] relative">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#00e5ff]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00e5ff]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00e5ff]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00e5ff]" />
            
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-[#00e5ff] font-display font-black tracking-[0.3em] text-3xl italic uppercase italic"
            >
              Level Up!
            </motion.div>
            <div className="text-[#00e5ff]/60 text-[10px] text-center font-mono uppercase mt-1 tracking-tighter">
              RANK UPGRADE: PLAYER ASCENDING
            </div>
          </div>
          <motion.div 
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: 200, opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-[2px] bg-[#00e5ff] shadow-[0_0_20px_#00e5ff]"
          />
        </motion.div>
      )}
      <div className="text-center">
        <h3 className={`font-display font-black text-xl mb-2 uppercase tracking-widest text-${themeStyles.primary}`}>
          {language === 'english' ? (currentTheme === 'got' ? 'Forge the Power!' : currentTheme === 'harry_potter' ? 'Channel Magic!' : currentTheme === 'blue_lock' ? 'Awaken the Ego!' : currentTheme === 'immortal_king' ? 'Cultivate Qi!' : currentTheme === 'solo_leveling' ? '[ DAILY QUEST: RECOVER MANA ]' : 'Generate Energy!') : 'শক্তি সঞ্চয় করুন!'}
        </h3>
        <p className={`text-xs italic font-display opacity-80 ${currentTheme === 'normal' ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
          {language === 'english' ? (currentTheme === 'solo_leveling' ? 'Expend stamina to recover your daily mana pool' : 'Strike the ground to produce more power') : 'বিদ্যুৎ উৎপাদন করতে টাইলে আঘাত করুন'}
        </p>
      </div>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStep}
          className={`w-40 h-40 rounded-none flex flex-col items-center justify-center gap-4 transition-all relative overflow-hidden ${
            isStepping ? `bg-${themeStyles.primary} shadow-xl shadow-${themeStyles.primary}/20` : `bg-slate-900 border ${themeStyles.border} hover:opacity-80`
          }`}
          style={{ clipPath: currentTheme === 'fc_mobile' ? 'none' : 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)' }}
        >
          <Icon size={48} className={isStepping ? 'text-slate-950' : `text-${themeStyles.primary}/40`} />
          <span className={`font-display font-black uppercase tracking-[0.2em] text-[10px] ${isStepping ? 'text-slate-950' : (currentTheme === 'normal' ? 'text-slate-400' : `text-${themeStyles.primary}/60`)}`}>
            {isStepping ? (language === 'english' ? 'EXTRACTING' : 'চলছে!') : (language === 'english' ? 'ARISE' : 'এখানে চাপ দিন')}
          </span>
        </motion.button>

        {isStepping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.2, y: -80 }}
            transition={{ duration: 0.5 }}
            className={`absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 font-display font-black pointer-events-none z-20 text-${themeStyles.primary}`}
          >
            <Zap size={24} fill="currentColor" className="animate-pulse" />
            {currentTheme === 'solo_leveling' ? '+0.5 MP' : '+0.5W'}
          </motion.div>
        )}
      </div>

      <div className={`w-full p-5 rounded-none border flex items-center justify-between shadow-inner ${themeStyles.border} bg-slate-900/50 dark:bg-slate-950/50`}>
        <span className={`font-display font-bold uppercase tracking-widest text-[10px] ${currentTheme === 'normal' ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'}`}>
          {language === 'english' ? (currentTheme === 'solo_leveling' ? 'Mana Stored:' : 'Stored Energy:') : 'সঞ্চিত শক্তি:'}
        </span>
        <div className="flex items-baseline gap-2">
          <motion.span 
            animate={controls}
            className={`text-4xl font-display font-black text-${themeStyles.primary}`}
          >
            {energy.toFixed(1)}
          </motion.span>
          <span className={`opacity-60 font-display font-bold text-[10px] uppercase tracking-widest text-${themeStyles.primary}`}>
            {language === 'english' ? 'Watts' : 'ওয়াট'}
          </span>
        </div>
      </div>
    </div>
  );
}


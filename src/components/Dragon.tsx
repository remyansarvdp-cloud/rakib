import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DragonProps {
  name: 'Drogon' | 'Balerion';
  color: string;
  delay?: number;
}

export default function Dragon({ name, color, delay = 0 }: DragonProps) {
  const [isBreathingFire, setIsBreathingFire] = useState(false);
  const [position, setPosition] = useState({ x: -300, y: 150 });
  const [target, setTarget] = useState({ x: 300, y: 150 });
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const moveDragon = () => {
      const newX = Math.random() * window.innerWidth;
      const newY = Math.random() * (window.innerHeight * 0.6) + 50;
      
      setTarget({ x: newX, y: newY });
      setFlip(newX < position.x);
      
      // Update current position for next calculation
      setTimeout(() => setPosition({ x: newX, y: newY }), 8000);

      // Random fire breathing while flying
      if (Math.random() > 0.6) {
        setTimeout(() => {
          setIsBreathingFire(true);
          setTimeout(() => setIsBreathingFire(false), 2500);
        }, Math.random() * 4000 + 2000);
      }
    };

    moveDragon();
    const interval = setInterval(moveDragon, 9000);
    return () => clearInterval(interval);
  }, [position.x]);

  return (
    <motion.div
      initial={{ x: -400, y: 200, opacity: 0 }}
      animate={{ 
        x: target.x, 
        y: target.y,
        opacity: 1,
        scale: isBreathingFire ? 1.1 : 0.8 + Math.random() * 0.3
      }}
      transition={{ 
        duration: 9, 
        ease: "easeInOut",
        delay 
      }}
      className="fixed pointer-events-none z-[100] overflow-visible"
    >
      <motion.div 
        animate={{ 
          rotateY: flip ? 180 : 0,
          rotateZ: isBreathingFire ? 0 : (target.y - position.y) / 20
        }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full transition-colors duration-1000 ${isBreathingFire ? 'bg-orange-600 scale-150' : 'bg-slate-800'}`} />
        
        <div className="relative">
          {/* Dragon Body SVG */}
          <motion.svg 
            width="180" 
            height="120" 
            viewBox="0 0 120 80"
            className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          >
            {/* Back Wing */}
            <motion.path
              d="M60 40 L20 5 L65 30 Z"
              fill={color}
              opacity="0.6"
              animate={{ 
                d: ["M60 40 L20 5 L65 30 Z", "M60 40 L20 45 L65 30 Z"],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
            
            {/* Front Wing */}
            <motion.path
              d="M60 40 L10 10 L60 35 L110 10 Z"
              fill={color}
              opacity="0.9"
              animate={{ 
                d: ["M60 40 L10 10 L60 35 L110 10 Z", "M60 40 L10 65 L60 35 L110 65 Z"] 
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Body */}
            <path d="M40 40 Q60 30 80 40 T110 45" stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" />
            <path d="M75 40 Q85 38 95 45" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
            
            {/* Head & Neck */}
            <motion.g animate={{ rotate: isBreathingFire ? -15 : 0 }} transition={{ duration: 0.3 }}>
              <path d="M40 40 Q30 35 23 20" stroke={color} strokeWidth="8" fill="none" />
              <path d="M20 20 L32 15 L30 28 Z" fill={color} /> {/* Head */}
              <circle cx="24" cy="21" r="1.5" fill={isBreathingFire ? "#ffeb3b" : "#ff5252"} className="animate-pulse" /> {/* Eye */}
              
              {/* Jaw */}
              <motion.path 
                d="M20 20 L28 25" 
                stroke={color} 
                strokeWidth="3"
                animate={{ rotate: isBreathingFire ? 45 : 5 }}
              />
            </motion.g>
          </motion.svg>

          {/* Epic Fire Breath */}
          <AnimatePresence>
            {isBreathingFire && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="absolute top-4 -left-32 origin-right"
              >
                {/* Main Fire Cone - Multi-layered */}
                <div className="relative">
                  {/* Outer Flame Glow */}
                  <motion.div 
                    animate={{ 
                      scaleX: [1, 1.3, 1],
                      scaleY: [1, 1.1, 1.2, 1],
                      skewY: [0, 4, -4, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 0.25 }}
                    className="w-56 h-28 bg-gradient-to-r from-orange-400 via-red-600 to-transparent blur-2xl rounded-full opacity-40" 
                  />
                  
                  {/* Inner Intense Flame */}
                  <motion.div 
                    animate={{ 
                      scaleX: [1, 1.2, 1],
                      skewY: [0, -2, 2, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 0.15 }}
                    className="absolute top-2 left-6 w-40 h-20 bg-gradient-to-r from-yellow-400 via-orange-600 to-transparent blur-xl rounded-full opacity-70" 
                  />
                  
                  {/* Core Heat */}
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 0.1 }}
                    className="absolute top-6 left-12 w-28 h-10 bg-gradient-to-r from-white via-yellow-200 to-transparent blur-md rounded-full" 
                  />
                </div>

                {/* Smoke Particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`smoke-${i}`}
                    initial={{ x: 20, y: 15, opacity: 0, scale: 0.5 }}
                    animate={{ 
                      x: -180 - Math.random() * 150, 
                      y: (Math.random() - 0.5) * 120 - 40,
                      opacity: [0, 0.4, 0.2, 0],
                      scale: [0.5, 2, 3, 4],
                      rotate: [0, 90, 180]
                    }}
                    transition={{ 
                      duration: 1.5 + Math.random() * 1, 
                      repeat: Infinity, 
                      delay: i * 0.15 
                    }}
                    className="absolute w-6 h-6 bg-slate-800/40 rounded-full blur-xl"
                  />
                ))}
                
                {/* Dynamic Embers */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`ember-${i}`}
                    initial={{ x: 30, y: 15, opacity: 1, scale: 1 }}
                    animate={{ 
                      x: -200 - Math.random() * 200, 
                      y: (Math.random() - 0.5) * 100,
                      opacity: [1, 1, 0],
                      scale: [1, 1.5, 0],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 0.6 + Math.random() * 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.05 
                    }}
                    className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-yellow-200 shadow-[0_0_5px_#fff]' : i % 3 === 1 ? 'bg-orange-400' : 'bg-red-500'} blur-[0.5px]`}
                  />
                ))}

                {/* Heat Distortion Pulse */}
                <motion.div 
                  className="absolute inset-0 w-64 h-32 -left-16 top-0 bg-white/5 blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

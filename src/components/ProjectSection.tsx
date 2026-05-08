import React from 'react';
import { motion } from 'motion/react';
import { ThemeType } from '../types';

interface ProjectSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
  currentTheme?: ThemeType;
}

export default function ProjectSection({ id, title, children, dark, currentTheme }: ProjectSectionProps) {
  const isSpecial = currentTheme && currentTheme !== 'normal';
  
  return (
    <section 
      id={id} 
      className={`relative transition-colors duration-500 ${
        isSpecial 
          ? 'bg-transparent' 
          : dark 
            ? 'bg-slate-950 text-white' 
            : 'bg-slate-900/60 text-slate-100 border-y border-gold/10'
      }`}
    >
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <h2 className={`text-xl font-display font-black uppercase tracking-[0.3em] flex items-center justify-center gap-6 ${
              currentTheme === 'got' ? 'text-gold' :
              currentTheme === 'harry_potter' ? 'text-yellow-500' :
              currentTheme === 'solo_leveling' ? 'text-[#00e5ff]' :
              currentTheme === 'fc_mobile' ? 'text-[#002d16]' :
              currentTheme === 'rpg' ? 'text-orange-400' :
              'text-blue-400'
            }`}>
              <span className={`h-px w-12 hidden md:block ${
                 currentTheme === 'got' ? 'bg-gold/30' :
                 currentTheme === 'harry_potter' ? 'bg-yellow-500/30' :
                 'bg-slate-300 dark:bg-slate-700'
              }`} />
              {title}
              <span className={`h-px w-12 hidden md:block ${
                 currentTheme === 'got' ? 'bg-gold/30' :
                 currentTheme === 'harry_potter' ? 'bg-yellow-500/30' :
                 'bg-slate-300 dark:bg-slate-700'
              }`} />
            </h2>
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 ${
              currentTheme === 'got' ? 'bg-blood/40' :
              currentTheme === 'harry_potter' ? 'bg-yellow-500/40' :
              'bg-brand-blue/30'
            }`} />
          </div>
        </motion.div>
        
        {children}
      </div>
      
      {/* Decorative background elements */}
      {!isSpecial && !dark && (
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-gold/5 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4" />
      )}
    </section>
  );
}

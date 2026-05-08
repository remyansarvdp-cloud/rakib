import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Lightbulb, LightbulbOff, Radiation as MotionIcon } from 'lucide-react';

export default function SmartHouseAnimation() {
  const [lightsOn, setLightsOn] = useState(true);
  const [isPersonInRoom, setIsPersonInRoom] = useState(true);

  const togglePerson = () => {
    const newState = !isPersonInRoom;
    setIsPersonInRoom(newState);
    if (!newState) {
      // Automatic light switching logic
      setTimeout(() => setLightsOn(false), 1000);
    } else {
      setLightsOn(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 vibrant-card w-full max-w-md mx-auto h-full">
      <div className="text-center">
        <h3 className="font-display font-bold text-slate-800 text-xl mb-2 text-brand-green">Auto-Energy Saver</h3>
        <p className="text-slate-500 text-sm">Lights turn off automatically when you leave</p>
      </div>

      <div className="relative w-full aspect-square max-w-[250px] bg-slate-100 rounded-3xl border-4 border-white shadow-inner flex items-center justify-center overflow-hidden">
        {/* Glow Effect */}
        <AnimatePresence>
          {lightsOn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-yellow-200/50 blur-3xl rounded-full"
            />
          )}
        </AnimatePresence>

        <Home size={120} className="text-slate-300 relative z-10" />

        <AnimatePresence>
          {isPersonInRoom && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute z-20"
            >
              <div className="w-8 h-12 bg-brand-blue rounded-full relative shadow-md">
                <div className="w-4 h-4 bg-blue-300 rounded-full absolute top-1 left-2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-4 right-4 z-20">
          {lightsOn ? (
            <Lightbulb size={32} className="text-yellow-500 fill-yellow-500" />
          ) : (
            <LightbulbOff size={32} className="text-slate-400" />
          )}
        </div>

        <div className="absolute top-4 left-4 z-20">
           <div className={`p-1 rounded-full ${lightsOn ? 'bg-brand-green/20' : 'bg-slate-200'}`}>
             <MotionIcon size={20} className={lightsOn ? 'text-brand-green animate-pulse' : 'text-slate-400'} />
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={togglePerson}
          className={`py-3 px-6 rounded-xl font-bold transition-all shadow-md ${
            isPersonInRoom 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-brand-blue text-white hover:bg-brand-blue-dark'
          }`}
        >
          {isPersonInRoom ? 'Walk Out of Room' : 'Walk Into Room'}
        </button>

        <div className="space-y-2 mt-4 text-xs">
          <div className="flex items-center justify-between text-slate-500">
             <span>Motion Sensor:</span>
             <span className={isPersonInRoom ? 'text-brand-green font-bold' : 'text-red-500 font-bold'}>
               {isPersonInRoom ? 'DETECTED' : 'NOT DETECTED'}
             </span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
             <span>Saving Status:</span>
             <span className={!lightsOn ? 'text-brand-green font-bold' : 'text-slate-400 font-bold'}>
               {!lightsOn ? 'SAVING ENERGY ✓' : 'ACTIVE POWER'}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}

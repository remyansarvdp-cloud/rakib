import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  ContactShadows, 
  Text, 
  Html,
  RoundedBox,
  Box,
  Cylinder,
  Sphere,
  Points,
  PointMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Thermometer, User, UserMinus, Shield, Sword, Target, Trophy, Sparkles, Flower, Zap } from 'lucide-react';
import { Language, ThemeType } from '../types';

function WeatherSystems({ condition }: { condition: string }) {
  const rainCount = 800;
  const snowCount = 400;
  
  const rainPositions = React.useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const snowPositions = React.useMemo(() => {
    const pos = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const rainRef = useRef<THREE.Points>(null);
  const snowRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= delta * 20;
        if (positions[i * 3 + 1] < -2) positions[i * 3 + 1] = 20;
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        positions[i * 3 + 1] -= delta * 3;
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.02;
        if (positions[i * 3 + 1] < -2) positions[i * 3 + 1] = 20;
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const isRainy = condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle');
  const isSnowy = condition.toLowerCase().includes('snow');

  return (
    <group>
      {isRainy && (
        <points ref={rainRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={rainPositions.length / 3}
              array={rainPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color="#60a5fa" size={0.08} transparent opacity={0.6} sizeAttenuation />
        </points>
      )}
      {isSnowy && (
        <points ref={snowRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={snowPositions.length / 3}
              array={snowPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color="white" size={0.12} transparent opacity={0.9} sizeAttenuation />
        </points>
      )}
    </group>
  );
}

interface RoomProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roomName: string;
  hasPerson: boolean;
  isPowerOn: boolean;
  language: Language;
  currentTheme?: ThemeType;
  onClick?: () => void;
}

function Door({ position, rotation, isOpen }: { position: [number, number, number]; rotation: [number, number, number]; isOpen: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetRotation = isOpen ? -Math.PI / 1.8 : 0;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation, 0.1);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Door Frame */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 2.1, 0.1]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* The Door itself */}
      <group ref={meshRef} position={[-0.45, 0, 0]}>
        <mesh position={[0.45, 1, 0]}>
          <boxGeometry args={[0.9, 2, 0.05]} />
          <meshStandardMaterial color="#92400e" roughness={0.3} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.8, 1, 0.04]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={1} />
        </mesh>
      </group>
    </group>
  );
}

function Room({ position, size, color, roomName, hasPerson, isPowerOn, language, currentTheme = 'normal', onClick }: RoomProps) {
  const [lightsActive, setLightsActive] = useState(false);
  const fanRef = useRef<THREE.Group>(null);

  const isActive = hasPerson && isPowerOn;

  useEffect(() => {
    if (isActive) {
      setLightsActive(true);
    } else {
      const timer = setTimeout(() => setLightsActive(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const getLightColor = () => {
    switch(currentTheme) {
      case 'got': return "#fcd34d";
      case 'harry_potter': return "#60a5fa";
      case 'solo_leveling': return "#00e5ff";
      case 'fc_mobile': return "#00ff85";
      default: return "#fcd34d";
    }
  };

  useFrame((state, delta) => {
    if (fanRef.current && isActive) {
      fanRef.current.rotation.y += delta * 15;
    }
  });

  return (
    <group position={position}>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -size[1]/2, 0]} 
        receiveShadow 
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <planeGeometry args={[size[0], size[2]]} />
        <meshStandardMaterial 
          color={currentTheme === 'got' ? '#1a1110' : currentTheme === 'harry_potter' ? '#2a1a0a' : roomName.includes("Kitchen") ? "#e2e8f0" : "#94a3b8"} 
          roughness={0.6} 
          emissive={isPowerOn ? (currentTheme === 'got' ? '#fcd34d' : currentTheme === 'solo_leveling' ? '#00e5ff' : '#3b82f6') : '#000000'}
          emissiveIntensity={isPowerOn ? (hasPerson ? 0.3 : 0.1) : 0}
        />
      </mesh>

      {/* Occupancy Indicator Ring */}
      {hasPerson && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -size[1]/2 + 0.01, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshStandardMaterial 
            color={currentTheme === 'got' ? '#fcd34d' : currentTheme === 'solo_leveling' ? '#00e5ff' : '#3b82f6'} 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      )}

      {/* Main Walls (Back) */}
      <mesh position={[0, 0, -size[2] / 2 - 0.001]} receiveShadow>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial 
          color={currentTheme === 'got' ? '#0f0a0a' : currentTheme === 'harry_potter' ? '#1a1005' : "#ffffff"} 
          roughness={0.9} 
        />
      </mesh>

      {/* Ceiling Sensor Unit */}
      <group position={[0, size[1] / 2 - 0.15, 0]}>
        <Sphere args={[0.08, 16, 16]} position={[0, -0.05, 0]}>
          <meshStandardMaterial 
            color={hasPerson ? (currentTheme === 'got' ? '#ff0000' : '#ef4444') : '#22c55e'} 
            emissive={hasPerson ? '#ef4444' : '#22c55e'} 
            emissiveIntensity={hasPerson ? 3 : 1} 
          />
        </Sphere>
      </group>

      {/* Intelligent Lighting */}
      {lightsActive && (
        <group position={[0, size[1] / 2 - 0.2, 0]}>
          <pointLight
            intensity={hasPerson ? 12 : 3}
            distance={15}
            color={getLightColor()}
            castShadow
          />
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color={getLightColor()} 
              emissive={getLightColor()} 
              emissiveIntensity={4} 
            />
          </mesh>
        </group>
      )}

      {/* Fan */}
      <group position={[0, size[1] / 2 - 0.3, 0.5]} ref={fanRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0.1, (i * Math.PI * 2) / 4, 0]} position={[0, -0.05, 0]}>
            <boxGeometry args={[1.4, 0.02, 0.25]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        ))}
      </group>

      {/* Room Title */}
      <Html position={[0, -size[1]/2 - 1, size[2]/2 + 0.5]} center>
        <motion.div 
          className={`px-4 py-1.5 rounded-none border shadow-2xl ${
            currentTheme === 'got' ? 'bg-slate-950/80 border-gold/40 text-gold' : 
            currentTheme === 'harry_potter' ? 'bg-[#1a0f00]/80 border-yellow-500/40 text-yellow-500' :
            'bg-white/80 border-slate-200 text-slate-800'
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {roomName}
          </span>
        </motion.div>
      </Html>
    </group>
  );
}

function Person({ targetRoom, currentTheme = 'normal' }: { targetRoom: number; currentTheme?: ThemeType }) {
  const meshRef = useRef<THREE.Group>(null);
  
  const positions = [
    [-2, -0.8, 1], // Living Room
    [2.5, -0.8, 1.5],  // Bedroom
    [0.5, -0.8, 8]   // Outside
  ];

  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetPos = positions[targetRoom];
      meshRef.current.position.lerp(new THREE.Vector3(...targetPos), 0.04);
      meshRef.current.position.y = -0.8 + Math.sin(state.clock.elapsedTime * 6) * 0.08;
      const targetRotation = targetRoom !== 2 ? Math.PI : 0;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation, 0.05);
    }
  });

  const getPersonColor = () => {
    switch(currentTheme) {
      case 'got': return { top: '#fcd34d', bottom: '#1e40af' };
      case 'harry_potter': return { top: '#4a0404', bottom: '#2d3748' };
      case 'solo_leveling': return { top: '#03060a', bottom: '#00e5ff' };
      case 'fc_mobile': return { top: '#ffffff', bottom: '#00ff85' };
      case 'blue_lock': return { top: '#000814', bottom: '#00f2ff' };
      case 'immortal_king': return { top: '#fffaf0', bottom: '#8b0000' };
      default: return { top: '#fcd34d', bottom: '#1e40af' };
    }
  };

  const colors = getPersonColor();

  const isEnglish = currentTheme === 'fc_mobile' || currentTheme === 'blue_lock' || currentTheme === 'normal'; // Approximation since Person doesn't have language prop

  return (
    <group ref={meshRef}>
      <Html position={[0, 2, 0]} center>
         <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase whitespace-nowrap shadow-xl border ${
             currentTheme === 'got' ? 'bg-slate-900 border-gold text-gold' : 
             currentTheme === 'solo_leveling' ? 'bg-slate-950 border-[#00e5ff] text-[#00e5ff]' :
             'bg-white border-slate-200 text-slate-800'
           }`}
         >
           {targetRoom === 2 ? 'Out' : 'In Room'}
         </motion.div>
      </Html>
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={colors.top} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.2, 1, 16]} />
        <meshStandardMaterial color={colors.bottom} />
      </mesh>
    </group>
  );
}

interface AIHubProps {
  weather: { temp: number; condition: string } | null;
}

function AIHub({ weather, currentTheme = 'normal' }: AIHubProps & { currentTheme?: ThemeType }) {
  const [graphData, setGraphData] = useState(() => Array.from({ length: 10 }, () => Math.random() * 0.5 + 0.2));

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(prev => [...prev.slice(1), Math.random() * 0.5 + 0.2]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getThemeColors = () => {
    switch(currentTheme) {
      case 'got': return { bg: 'bg-slate-950/90', border: 'border-gold/50', text: 'text-gold', accent: 'bg-gold/50', accentBorder: 'border-gold' };
      case 'harry_potter': return { bg: 'bg-[#1a0f00]/90', border: 'border-yellow-500/50', text: 'text-yellow-500', accent: 'bg-yellow-500/50', accentBorder: 'border-yellow-500' };
      case 'solo_leveling': return { bg: 'bg-slate-950/90', border: 'border-[#00e5ff]/50', text: 'text-[#00e5ff]', accent: 'bg-[#00e5ff]/50', accentBorder: 'border-[#00e5ff]' };
      case 'fc_mobile': return { bg: 'bg-[#002d16]/90', border: 'border-[#00ff85]/50', text: 'text-[#00ff85]', accent: 'bg-[#00ff85]/50', accentBorder: 'border-[#00ff85]' };
      case 'blue_lock': return { bg: 'bg-[#000814]/90', border: 'border-[#00f2ff]/50', text: 'text-[#00f2ff]', accent: 'bg-[#00f2ff]/50', accentBorder: 'border-[#00f2ff]' };
      case 'immortal_king': return { bg: 'bg-[#fffaf0]/90', border: 'border-[#8b0000]/50', text: 'text-[#8b0000]', accent: 'bg-[#8b0000]/50', accentBorder: 'border-[#8b0000]' };
      default: return { bg: 'bg-blue-900/40', border: 'border-blue-400/50', text: 'text-blue-100', accent: 'bg-cyan-500/50', accentBorder: 'border-cyan-400' };
    }
  };

  const colors = getThemeColors();

  return (
    <group position={[-3.5, -0.5, -2]}>
      {/* Hub Body */}
      <Box args={[1.2, 0.8, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={currentTheme === 'got' ? '#1a1110' : '#1e293b'} metalness={0.8} roughness={0.2} />
      </Box>

      {/* Screen */}
      <Html position={[0, 0, 0.06]} transform center distanceFactor={1}>
        <div className={`w-56 h-36 rounded border p-2 flex flex-col overflow-hidden select-none pointer-events-none ${currentTheme === 'fc_mobile' ? 'bg-[#002d16] border-[#00ff85]/30' : currentTheme === 'blue_lock' ? 'bg-[#000814] border-[#00f2ff]/30' : 'backdrop-blur-md'} ${colors.bg} ${colors.border}`}>
          <div className="flex justify-between items-center mb-1">
             <div className="flex items-center gap-1">
               <Bot size={10} className={colors.text} />
               <span className={`text-[8px] font-bold italic uppercase ${colors.text}`}>
                 {currentTheme === 'got' ? 'Citadel Link' : currentTheme === 'harry_potter' ? 'Magical Orbs' : 'System AI'}
               </span>
             </div>
             <span className={`text-[10px] font-mono ${colors.text}`}>
               {weather ? `${weather.temp}°C` : '24.5°C'}
             </span>
          </div>
          
          <div className="flex-1 flex flex-col justify-end gap-0.5">
             <div className="flex items-end gap-1 h-12">
                {graphData.map((v, i) => (
                  <div key={i} className={`flex-1 ${colors.accent} border-t ${colors.accentBorder}`} style={{ height: `${v * 100}%` }} />
                ))}
             </div>
             <div className={`text-[6px] uppercase tracking-tighter ${colors.text}`}>Live Data Stream</div>
          </div>

          <div className={`mt-2 text-[7px] border-t pt-1 ${colors.text} opacity-50`}>
             ⚡ STATUS: OPTIMAL | SCANNING...
          </div>
        </div>
      </Html>
    </group>
  );
}

function EnergyCore({ energy, currentTheme = 'normal' }: { energy: number; currentTheme?: ThemeType }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 0.8 + energy * 1.5 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.z += 0.01;
    }
    if (glowRef.current) {
      const glowScale = 1.2 + energy * 2 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
    }
  });

  const getColor = () => {
    switch(currentTheme) {
      case 'got': return "#fcd34d";
      case 'harry_potter': return "#eab308";
      case 'solo_leveling': return "#00e5ff";
      case 'fc_mobile': return "#00ff85";
      case 'blue_lock': return "#00f2ff";
      case 'immortal_king': return "#ffd700";
      default: return "#3b82f6";
    }
  };

  const color = getColor();

  return (
    <group position={[0, 4, 0]}>
      {/* Core Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2 + energy * 5} 
          wireframe
        />
      </mesh>
      
      {/* Outer Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={1 + energy * 3} 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Light Source */}
      <pointLight 
        intensity={5 + energy * 20} 
        distance={10} 
        color={color} 
      />
      
      {/* Label */}
      <Html position={[0, 1, 0]} center>
        <div className={`px-2 py-1 rounded border text-[8px] font-black whitespace-nowrap uppercase tracking-widest flex items-center gap-2 ${
          currentTheme === 'got' ? 'bg-slate-950 border-gold text-gold' : 
          currentTheme === 'solo_leveling' ? 'bg-slate-950 border-[#00e5ff] text-[#00e5ff]' :
          'bg-white border-slate-200 text-slate-800'
        }`}>
          <Zap size={8} fill="currentColor" />
          {Math.round(energy * 100)}% GENERATION
        </div>
      </Html>
    </group>
  );
}

export default function SmartHouse3D({ language, weather, energy, currentTheme = 'normal' }: { language: Language; weather: { temp: number; condition: string } | null; energy: number; currentTheme?: ThemeType }) {
  const [currentRoom, setCurrentRoom] = useState(2); // 0: Living, 1: Bedroom, 2: Outside
  const [livingRoomPower, setLivingRoomPower] = useState(false);
  const [bedroomPower, setBedroomPower] = useState(false);
  const isEnglish = language === 'english';

  useEffect(() => {
    // Auto-OFF logic: When person is not in a room, or leaves the house, turn off lights & fans
    if (currentRoom === 1 || currentRoom === 2) {
      setLivingRoomPower(false);
    }
    if (currentRoom === 0 || currentRoom === 2) {
      setBedroomPower(false);
    }
  }, [currentRoom]);

  const getThemeColors = () => {
    switch(currentTheme) {
      case 'got': return { primary: 'gold', secondary: 'blood', bg: 'bg-slate-950', border: 'border-gold/20' };
      case 'harry_potter': return { primary: 'yellow-500', secondary: 'yellow-600', bg: 'bg-[#1a0f00]', border: 'border-yellow-500/20' };
      case 'solo_leveling': return { primary: '[#00e5ff]', secondary: '[#006064]', bg: 'bg-[#03060a]', border: 'border-[#00e5ff]/20' };
      case 'fc_mobile': return { primary: '[#00ff85]', secondary: '[#004a25]', bg: 'bg-[#002d16]', border: 'border-[#00ff85]/20' };
      case 'blue_lock': return { primary: '[#00f2ff]', secondary: 'blue-600', bg: 'bg-[#000814]', border: 'border-[#00f2ff]/20' };
      case 'immortal_king': return { primary: '[#8b0000]', secondary: 'red-900', bg: 'bg-[#fffaf0]', border: 'border-[#8b0000]/20' };
      default: return { primary: 'blue-600', secondary: 'blue-700', bg: 'bg-white', border: 'border-slate-200' };
    }
  };

  const themeStyles = getThemeColors();

  return (
    <div className={`w-full h-[600px] rounded-3xl overflow-hidden relative border shadow-2xl transition-all duration-500 ${themeStyles.bg} ${themeStyles.border}`}>
      {/* UI Controls Overlay */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
        <div className={`p-4 rounded-none border shadow-lg ${currentTheme === 'fc_mobile' ? 'bg-[#002d16] border-[#00ff85]' : currentTheme === 'blue_lock' ? 'bg-[#000814] border-[#00f2ff]' : 'backdrop-blur-md'} ${themeStyles.bg} ${themeStyles.border}`}>
          <h3 className={`text-sm font-bold mb-2 flex items-center gap-2 text-${themeStyles.primary}`}>
            {currentTheme === 'got' ? <Sword size={16} /> : currentTheme === 'fc_mobile' ? <Trophy size={16} /> : currentTheme === 'blue_lock' ? <Target size={16} /> : currentTheme === 'immortal_king' ? <Flower size={16} /> : <Bot size={16} />}
            {isEnglish ? (currentTheme === 'got' ? 'The Iron Keep' : currentTheme === 'blue_lock' ? 'The Egoist Pod' : currentTheme === 'immortal_king' ? 'The Immortal Grotto' : 'Smart House Interior') : 'বাড়ির অভ্যন্তর'}
          </h3>
          <p className={`text-[10px] opacity-70 max-w-[200px] ${currentTheme === 'fc_mobile' ? 'text-white' : ''}`}>
            {isEnglish 
              ? 'Automation stand guard. All lights will extinguish when the realm is empty.' 
              : 'বেরিয়ে গেলে অটোমেটিকভাবে সব বন্ধ হবে।'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {/* Room Selection */}
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-[9px] font-black uppercase opacity-40 ml-1">{isEnglish ? 'Actions' : 'কাজ'}</span>
            <button 
              onClick={() => setCurrentRoom(0)}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all flex items-center gap-2 shadow-sm border ${currentRoom === 0 ? `bg-${themeStyles.primary} text-slate-950` : `bg-slate-900 text-${themeStyles.primary} ${themeStyles.border}`}`}
            >
              <User size={14} /> {isEnglish ? 'To Living Room' : 'লিভিং রুমে যান'}
            </button>
            <button 
              onClick={() => setCurrentRoom(1)}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all flex items-center gap-2 shadow-sm border ${currentRoom === 1 ? `bg-${themeStyles.primary} text-slate-950` : `bg-slate-900 text-${themeStyles.primary} ${themeStyles.border}`}`}
            >
              <User size={14} /> {isEnglish ? 'To Bedroom' : 'বেডরুমে যান'}
            </button>
            <button 
              onClick={() => setCurrentRoom(2)}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all flex items-center gap-2 shadow-sm border ${currentRoom === 2 ? 'bg-red-600 text-white' : `bg-slate-900 text-red-500 ${themeStyles.border}`}`}
            >
              <UserMinus size={14} /> {isEnglish ? 'Leave' : 'বেরিয়ে যান'}
            </button>
          </div>

          {/* Manual Switches */}
          <div className="flex flex-col gap-1">
             <span className={`text-[9px] font-black uppercase ml-1 ${currentTheme === 'normal' ? 'text-slate-400' : `text-${themeStyles.primary} opacity-40`}`}>
               {isEnglish ? 'Manual Switches' : 'ম্যানুয়াল সুইচ'}
             </span>
             <button 
              disabled={currentRoom !== 0}
              onClick={() => setLivingRoomPower(!livingRoomPower)}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all flex items-center justify-between gap-4 shadow-sm border ${
                currentRoom === 0 
                  ? (livingRoomPower ? `bg-${themeStyles.primary} text-slate-900 border-${themeStyles.primary}` : `bg-slate-900 text-${themeStyles.primary} ${themeStyles.border}`) 
                  : `bg-slate-900/50 text-slate-600 border-transparent opacity-50 cursor-not-allowed`
              }`}
            >
              <span>{isEnglish ? 'Living Room' : 'লিভিং রুম'}</span>
              {livingRoomPower ? <div className={`w-2 h-2 rounded-full animate-pulse bg-current`} /> : <div className="w-2 h-2 bg-slate-700 rounded-full" />}
            </button>
            <button 
              disabled={currentRoom !== 1}
              onClick={() => setBedroomPower(!bedroomPower)}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all flex items-center justify-between gap-4 shadow-sm border ${
                currentRoom === 1 
                  ? (bedroomPower ? `bg-${themeStyles.primary} text-slate-900 border-${themeStyles.primary}` : `bg-slate-900 text-${themeStyles.primary} ${themeStyles.border}`) 
                  : `bg-slate-900/50 text-slate-600 border-transparent opacity-50 cursor-not-allowed`
              }`}
            >
              <span>{isEnglish ? 'Main Bedroom' : 'বেডরুম'}</span>
              {bedroomPower ? <div className={`w-2 h-2 rounded-full animate-pulse bg-current`} /> : <div className="w-2 h-2 bg-slate-700 rounded-full" />}
            </button>
          </div>
        </div>
      </div>

      {/* Status Alert Overlay */}
      <div className="absolute bottom-6 right-6 z-10 w-[280px]">
        <AnimatePresence mode="wait">
          {currentRoom !== 2 ? (
            <motion.div 
              key="detected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`p-3 rounded-none border shadow-2xl flex flex-col gap-2 transition-all duration-500 ${currentTheme === 'fc_mobile' || currentTheme === 'blue_lock' ? '' : 'backdrop-blur-md'} ${themeStyles.bg} ${themeStyles.border}`}
            >
              <div className={`flex items-center gap-2 text-${themeStyles.primary}`}>
                <div className={`w-2 h-2 rounded-full animate-ping bg-${themeStyles.primary}`} />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {isEnglish ? 'Presence Detected' : 'উপস্থিতি শনাক্ত'}
                </span>
              </div>
              <p className={`text-[11px] font-medium opacity-70 ${currentTheme === 'normal' ? 'text-slate-900 dark:text-slate-100' : 'text-white'}`}>
                {(currentRoom === 0 && livingRoomPower) || (currentRoom === 1 && bedroomPower)
                  ? (isEnglish ? 'Systems active in the sector.' : 'সিস্টেম সক্রিয় আছে।')
                  : (isEnglish ? 'Awaiting manual system activation.' : 'ম্যানুয়াল সুইচের জন্য অপেক্ষা করা হচ্ছে।')}
              </p>
            </motion.div>
          ) : (
             <motion.div 
              key="not-detected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`p-3 rounded-none border shadow-2xl flex flex-col gap-2 transition-all duration-500 ${currentTheme === 'fc_mobile' || currentTheme === 'blue_lock' ? '' : 'backdrop-blur-md'} ${currentTheme === 'normal' ? 'bg-red-50/90 dark:bg-red-950/20 border-red-500/30' : 'bg-red-500/10 border-red-500/30'}`}
            >
              <div className="flex items-center gap-2 text-red-500">
                <span className="text-[10px] font-black uppercase tracking-wider">
                  {isEnglish ? 'Sector Empty' : 'পুরো এলাকা ফাঁকা'}
                </span>
              </div>
              <p className={`text-[11px] font-medium ${currentTheme === 'normal' ? 'text-red-700 dark:text-red-400' : 'text-red-600 dark:text-red-400'}`}>
                {isEnglish ? 'Protocols Enforced: Darkened realm to preserve energy.' : 'অটোমেটিক শাটডাউন: শক্তি বাঁচাতে সব বন্ধ।'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={35} />
        <OrbitControls 
          enablePan={false} 
          minDistance={10} 
          maxDistance={30} 
          maxPolarAngle={Math.PI / 2.1}
          makeDefault
        />

        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            {/* Ground / Grass Base */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.06, 0]} receiveShadow>
              <planeGeometry args={[25, 25]} />
              <meshStandardMaterial color="#064e3b" opacity={0.4} transparent />
            </mesh>

            {/* Main Base Plate */}
            <RoundedBox args={[12.5, 0.3, 12.5]} position={[0, -1.1, 0]} radius={0.1} smoothness={4}>
               <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
            </RoundedBox>
            
            {/* Front Patio */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.99, 5]} receiveShadow>
              <planeGeometry args={[10, 4]} />
              <meshStandardMaterial color="#475569" roughness={0.8} />
            </mesh>
            
            {/* Patio Bench */}
            <group position={[4, -0.85, 4.5]}>
              <Box args={[2, 0.1, 0.6]}><meshStandardMaterial color="#92400e" /></Box>
              <Box args={[0.05, 0.3, 0.05]} position={[0.9, -0.15, 0.25]}><meshStandardMaterial color="#334155" /></Box>
              <Box args={[0.05, 0.3, 0.05]} position={[-0.9, -0.15, 0.25]}><meshStandardMaterial color="#334155" /></Box>
              <Box args={[0.05, 0.3, 0.05]} position={[0.9, -0.15, -0.25]}><meshStandardMaterial color="#334155" /></Box>
              <Box args={[0.05, 0.3, 0.05]} position={[-0.9, -0.15, -0.25]}><meshStandardMaterial color="#334155" /></Box>
            </group>

            {/* House Group */}
            <group>
              {/* Room 1: Kitchen */}
              <Room 
                position={[-3, 0, -2.5]} 
                size={[4, 3, 3.5]} 
                color="#f8fafc" 
                roomName={isEnglish ? 'Kitchen' : 'রান্নাঘর'}
                hasPerson={false}
                isPowerOn={false}
                language={language}
                currentTheme={currentTheme}
                onClick={() => setCurrentRoom(0)}
              />
              {/* Kitchen Table */}
              <group position={[-3, -0.75, -2.5]}>
                <Box args={[1.2, 0.05, 0.8]}>
                  <meshStandardMaterial color="#92400e" />
                </Box>
                {/* Legs */}
                <Box args={[0.05, 0.4, 0.05]} position={[0.5, -0.2, 0.3]}><meshStandardMaterial color="#475569" /></Box>
                <Box args={[0.05, 0.4, 0.05]} position={[-0.5, -0.2, 0.3]}><meshStandardMaterial color="#475569" /></Box>
                <Box args={[0.05, 0.4, 0.05]} position={[0.5, -0.2, -0.3]}><meshStandardMaterial color="#475569" /></Box>
                <Box args={[0.05, 0.4, 0.05]} position={[-0.5, -0.2, -0.3]}><meshStandardMaterial color="#475569" /></Box>
              </group>

              {/* Room 2: Living Room */}
              <Room 
                position={[-3, 0, 2]} 
                size={[5, 4.5, 4]} 
                color="#f1f5f9" 
                roomName={isEnglish ? 'Living Room' : 'লিভিং রুম'}
                hasPerson={currentRoom === 0}
                isPowerOn={livingRoomPower}
                language={language}
                currentTheme={currentTheme}
                onClick={() => setCurrentRoom(0)}
              />
              {/* Modern Sofa */}
              <group position={[-4, -0.7, 3]} rotation={[0, Math.PI / 2, 0]}>
                <RoundedBox args={[2.5, 0.4, 0.8]} position={[0, 0, 0]} radius={0.1}>
                  <meshStandardMaterial color="#3b82f6" />
                </RoundedBox>
                <RoundedBox args={[2.5, 0.5, 0.2]} position={[0, 0.3, -0.4]} radius={0.1}>
                  <meshStandardMaterial color="#2563eb" />
                </RoundedBox>
              </group>

              {/* Room 3: Bedroom */}
              <Room 
                position={[2.5, 0, 2]} 
                size={[5, 4.5, 4]} 
                color="#f1f5f9" 
                roomName={isEnglish ? 'Main Bedroom' : 'বেডরুম'}
                hasPerson={currentRoom === 1}
                isPowerOn={bedroomPower}
                language={language}
                currentTheme={currentTheme}
                onClick={() => setCurrentRoom(1)}
              />
              {/* Bed Details */}
              <group position={[3, -0.7, 1.5]}>
                <Box args={[2.8, 0.3, 3]} position={[0, 0, 0]}>
                  <meshStandardMaterial color="#1e293b" />
                </Box>
                {/* Mattress */}
                <Box args={[2.6, 0.2, 2.8]} position={[0, 0.2, 0]}>
                  <meshStandardMaterial color="#f8fafc" />
                </Box>
                {/* Pillow */}
                <Box args={[0.8, 0.1, 0.4]} position={[0.6, 0.3, -1]}>
                  <meshStandardMaterial color="#cbd5e1" />
                </Box>
                <Box args={[0.8, 0.1, 0.4]} position={[-0.6, 0.3, -1]}>
                  <meshStandardMaterial color="#cbd5e1" />
                </Box>
              </group>

              {/* Architectural Glass Partitions */}
              <mesh position={[-0.5, 0.5, 2]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[4, 4.5]} />
                <meshStandardMaterial color="#bae6fd" opacity={0.1} transparent roughness={0} metalness={1} />
              </mesh>
              
              {/* Doors */}
              <Door 
                position={[-0.5, -1, 4]} 
                rotation={[0, 0, 0]} 
                isOpen={currentRoom === 0} 
              />
              
              <Door 
                position={[0, -1, 2.5]} 
                rotation={[0, -Math.PI / 2, 0]} 
                isOpen={currentRoom === 1} 
              />

              <Door 
                position={[-3, -1, 0]} 
                rotation={[0, 0, 0]} 
                isOpen={currentRoom === 0} 
              />
              
              <EnergyCore energy={energy} currentTheme={currentTheme} />
              <AIHub weather={weather} currentTheme={currentTheme} />
              {weather && <WeatherSystems condition={weather.condition} />}
            </group>

            <Person targetRoom={currentRoom} currentTheme={currentTheme} />
          </group>

          {weather && weather.condition.toLowerCase().includes('cloud') && (
            <fog attach="fog" args={['#94a3b8', 10, 35]} />
          )}

          <ContactShadows 
            position={[0, -2.1, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-6 pointer-events-none">
        <div className={`flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full ${currentTheme === 'fc_mobile' ? '' : 'backdrop-blur-sm'}`}>
           <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-pulse" />
           {isEnglish ? 'MOUSE: ROTATE & ZOOM' : 'মাউস: ঘুরিয়ে দেখুন'}
        </div>
      </div>
    </div>
  );
}

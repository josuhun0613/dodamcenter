'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TRUST_INDICATORS } from '@/lib/constants';

function Counter({ value, suffix, duration = 1.8 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutExpo for fast start, smooth finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * value;

      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));

      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration, isDecimal]);

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

// Simplified dotted world map paths (lat/lng to x/y projection)
const LOCATIONS = [
  { x: 540, y: 190, label: 'Dodam Korea', primary: true },
  { x: 220, y: 220, label: 'Dodam USA', primary: false },
  { x: 580, y: 320, label: 'Dodam Indonesia', primary: false },
];

function DotWorldMap() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill="url(#mapGlow)" />

      {/* Dot grid representing world continents */}
      <g fill="white" opacity="0.15">
        {/* North America */}
        {generateDots([
          [140,80],[150,80],[160,80],[170,80],[180,80],
          [130,90],[140,90],[150,90],[160,90],[170,90],[180,90],[190,90],
          [120,100],[130,100],[140,100],[150,100],[160,100],[170,100],[180,100],[190,100],[200,100],
          [120,110],[130,110],[140,110],[150,110],[160,110],[170,110],[180,110],[190,110],[200,110],[210,110],
          [130,120],[140,120],[150,120],[160,120],[170,120],[180,120],[190,120],[200,120],[210,120],[220,120],
          [140,130],[150,130],[160,130],[170,130],[180,130],[190,130],[200,130],[210,130],[220,130],
          [150,140],[160,140],[170,140],[180,140],[190,140],[200,140],[210,140],[220,140],[230,140],
          [160,150],[170,150],[180,150],[190,150],[200,150],[210,150],[220,150],[230,150],
          [170,160],[180,160],[190,160],[200,160],[210,160],[220,160],[230,160],[240,160],
          [180,170],[190,170],[200,170],[210,170],[220,170],[230,170],[240,170],
          [190,180],[200,180],[210,180],[220,180],[230,180],[240,180],
          [200,190],[210,190],[220,190],[230,190],[240,190],
          [210,200],[220,200],[230,200],[240,200],
          [220,210],[230,210],[240,210],
          [230,220],[240,220],
        ])}
        {/* Central America */}
        {generateDots([
          [230,230],[240,230],[250,230],
          [240,240],[250,240],[260,240],
          [250,250],[260,250],
        ])}
        {/* South America */}
        {generateDots([
          [270,260],[280,260],[290,260],[300,260],
          [260,270],[270,270],[280,270],[290,270],[300,270],[310,270],
          [260,280],[270,280],[280,280],[290,280],[300,280],[310,280],
          [260,290],[270,290],[280,290],[290,290],[300,290],[310,290],[320,290],
          [260,300],[270,300],[280,300],[290,300],[300,300],[310,300],[320,300],
          [270,310],[280,310],[290,310],[300,310],[310,310],[320,310],
          [280,320],[290,320],[300,320],[310,320],
          [290,330],[300,330],[310,330],
          [290,340],[300,340],
          [300,350],
        ])}
        {/* Europe */}
        {generateDots([
          [400,80],[410,80],[420,80],[430,80],[440,80],
          [390,90],[400,90],[410,90],[420,90],[430,90],[440,90],[450,90],
          [380,100],[390,100],[400,100],[410,100],[420,100],[430,100],[440,100],[450,100],[460,100],
          [380,110],[390,110],[400,110],[410,110],[420,110],[430,110],[440,110],[450,110],[460,110],
          [390,120],[400,120],[410,120],[420,120],[430,120],[440,120],[450,120],[460,120],
          [400,130],[410,130],[420,130],[430,130],[440,130],[450,130],
          [400,140],[410,140],[420,140],[430,140],[440,140],
          [410,150],[420,150],[430,150],
        ])}
        {/* Africa */}
        {generateDots([
          [410,170],[420,170],[430,170],[440,170],[450,170],[460,170],
          [400,180],[410,180],[420,180],[430,180],[440,180],[450,180],[460,180],[470,180],
          [400,190],[410,190],[420,190],[430,190],[440,190],[450,190],[460,190],[470,190],
          [400,200],[410,200],[420,200],[430,200],[440,200],[450,200],[460,200],[470,200],
          [410,210],[420,210],[430,210],[440,210],[450,210],[460,210],[470,210],
          [410,220],[420,220],[430,220],[440,220],[450,220],[460,220],[470,220],
          [420,230],[430,230],[440,230],[450,230],[460,230],
          [420,240],[430,240],[440,240],[450,240],[460,240],
          [430,250],[440,250],[450,250],
          [430,260],[440,260],[450,260],
          [440,270],[450,270],
          [440,280],[450,280],
          [440,290],
        ])}
        {/* Asia / Russia */}
        {generateDots([
          [470,80],[480,80],[490,80],[500,80],[510,80],[520,80],[530,80],[540,80],[550,80],[560,80],[570,80],[580,80],[590,80],[600,80],[610,80],[620,80],
          [470,90],[480,90],[490,90],[500,90],[510,90],[520,90],[530,90],[540,90],[550,90],[560,90],[570,90],[580,90],[590,90],[600,90],[610,90],[620,90],[630,90],
          [470,100],[480,100],[490,100],[500,100],[510,100],[520,100],[530,100],[540,100],[550,100],[560,100],[570,100],[580,100],[590,100],[600,100],[610,100],[620,100],[630,100],[640,100],
          [470,110],[480,110],[490,110],[500,110],[510,110],[520,110],[530,110],[540,110],[550,110],[560,110],[570,110],[580,110],[590,110],[600,110],[610,110],[620,110],[630,110],
          [480,120],[490,120],[500,120],[510,120],[520,120],[530,120],[540,120],[550,120],[560,120],[570,120],[580,120],[590,120],[600,120],[610,120],
          [490,130],[500,130],[510,130],[520,130],[530,130],[540,130],[550,130],[560,130],[570,130],[580,130],[590,130],[600,130],
          [500,140],[510,140],[520,140],[530,140],[540,140],[550,140],[560,140],[570,140],[580,140],
          [510,150],[520,150],[530,150],[540,150],[550,150],[560,150],[570,150],
          [480,160],[490,160],[500,160],[510,160],[520,160],[530,160],[540,160],[550,160],
          [480,170],[490,170],[500,170],[510,170],[520,170],[530,170],[540,170],
          [480,180],[490,180],[500,180],[510,180],[520,180],[530,180],
          [490,190],[500,190],[510,190],[520,190],[530,190],
          [500,200],[510,200],[520,200],[530,200],
        ])}
        {/* Korea / Japan */}
        {generateDots([
          [590,140],[600,140],
          [580,150],[590,150],[600,150],
          [570,160],[580,160],[590,160],
          [570,170],[580,170],[590,170],
          [580,180],[590,180],
          [600,160],[610,170],[610,180],
        ])}
        {/* Southeast Asia */}
        {generateDots([
          [540,200],[550,200],[560,200],[570,200],[580,200],
          [550,210],[560,210],[570,210],[580,210],
          [540,220],[550,220],[560,220],[570,220],
          [560,230],[570,230],[580,230],
          [550,240],[560,240],[570,240],[580,240],[590,240],
          [570,250],[580,250],[590,250],[600,250],
          [580,260],[590,260],[600,260],[610,260],
          [590,270],[600,270],[610,270],
          [600,280],[610,280],
        ])}
        {/* Australia */}
        {generateDots([
          [600,300],[610,300],[620,300],[630,300],[640,300],[650,300],
          [590,310],[600,310],[610,310],[620,310],[630,310],[640,310],[650,310],[660,310],
          [590,320],[600,320],[610,320],[620,320],[630,320],[640,320],[650,320],[660,320],
          [600,330],[610,330],[620,330],[630,330],[640,330],[650,330],[660,330],
          [610,340],[620,340],[630,340],[640,340],[650,340],
          [620,350],[630,350],[640,350],
        ])}
      </g>

      {/* Location markers */}
      {LOCATIONS.map((loc, i) => (
        <g key={i}>
          {/* Pulse ring for primary */}
          {loc.primary && (
            <circle cx={loc.x} cy={loc.y} r="12" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.4">
              <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          {/* Dot */}
          <circle cx={loc.x} cy={loc.y} r={loc.primary ? 6 : 4} fill="#8B7355" />
          <circle cx={loc.x} cy={loc.y} r={loc.primary ? 3 : 2} fill="white" />
          {/* Label */}
          <text
            x={loc.x}
            y={loc.y - (loc.primary ? 14 : 10)}
            textAnchor="middle"
            fill="white"
            fontSize={loc.primary ? 11 : 9}
            fontWeight={loc.primary ? 700 : 500}
            opacity={loc.primary ? 0.9 : 0.7}
          >
            {loc.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function generateDots(coords: number[][]) {
  return coords.map(([x, y], i) => (
    <circle key={`${x}-${y}-${i}`} cx={x} cy={y} r={1.5} />
  ));
}

export default function TrustIndicators() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative h-auto py-20 md:h-screen md:py-0 flex items-center overflow-hidden bg-dark" data-header-theme="dark">
      {/* Dotted World Map Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 flex items-center justify-center opacity-60">
        <div className="w-full max-w-5xl mx-auto px-4">
          <DotWorldMap />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[11px] tracking-[0.4em] text-white/55 uppercase">Trust</span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            숫자로 보는 도담상담센터
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-16">
          {TRUST_INDICATORS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3">
                <Counter value={item.value} suffix={item.suffix} />
              </div>
              <div className="w-8 h-px bg-accent mb-3" />
              <p className="text-sm text-white/70">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

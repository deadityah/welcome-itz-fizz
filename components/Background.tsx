import React from "react";

/**
 * Deterministic star distribution across the upper night sky.
 * Using a fixed array prevents React SSR hydration mismatches.
 */
interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  hasSparkle?: boolean;
  delay?: number;
  color?: string;
  glowColor?: string;
}

const STARS: Star[] = [
  // Distant subtle background stars
  { x: 60, y: 70, r: 0.8, opacity: 0.45, delay: 0.4, color: "#9db3d4" },
  { x: 110, y: 140, r: 0.7, opacity: 0.4, delay: 1.2, color: "#8ca4c8" },
  { x: 190, y: 80, r: 0.9, opacity: 0.5, delay: 2.1, color: "#b0c4de" },
  { x: 280, y: 160, r: 0.7, opacity: 0.35, delay: 0.8, color: "#8ca4c8" },
  { x: 340, y: 65, r: 0.8, opacity: 0.5, delay: 1.7, color: "#a2b8d8" },
  { x: 420, y: 130, r: 0.7, opacity: 0.4, delay: 2.4, color: "#8ca4c8" },
  { x: 490, y: 85, r: 0.9, opacity: 0.45, delay: 0.9, color: "#b0c4de" },
  { x: 580, y: 170, r: 0.8, opacity: 0.4, delay: 1.5, color: "#9db3d4" },
  { x: 640, y: 60, r: 0.7, opacity: 0.35, delay: 2.7, color: "#8ca4c8" },
  { x: 720, y: 110, r: 0.9, opacity: 0.5, delay: 0.3, color: "#a2b8d8" },
  { x: 800, y: 55, r: 0.8, opacity: 0.45, delay: 1.9, color: "#b0c4de" },
  { x: 890, y: 145, r: 0.7, opacity: 0.4, delay: 2.2, color: "#8ca4c8" },
  { x: 960, y: 75, r: 0.8, opacity: 0.5, delay: 0.6, color: "#9db3d4" },
  { x: 1240, y: 80, r: 0.8, opacity: 0.45, delay: 1.4, color: "#a2b8d8" },
  { x: 1320, y: 140, r: 0.7, opacity: 0.4, delay: 2.6, color: "#8ca4c8" },
  { x: 1390, y: 60, r: 0.9, opacity: 0.5, delay: 0.7, color: "#b0c4de" },
  { x: 1470, y: 125, r: 0.8, opacity: 0.45, delay: 1.8, color: "#9db3d4" },
  { x: 1540, y: 70, r: 0.7, opacity: 0.4, delay: 2.3, color: "#8ca4c8" },
  { x: 1630, y: 150, r: 0.9, opacity: 0.5, delay: 0.5, color: "#b0c4de" },
  { x: 1700, y: 85, r: 0.8, opacity: 0.45, delay: 1.6, color: "#a2b8d8" },
  { x: 1780, y: 130, r: 0.7, opacity: 0.4, delay: 2.5, color: "#8ca4c8" },
  { x: 1860, y: 75, r: 0.8, opacity: 0.5, delay: 1.1, color: "#9db3d4" },

  // Mid-sky luminous stars
  { x: 80, y: 220, r: 1.2, opacity: 0.7, delay: 0.5, color: "#dbe8fa", glowColor: "#7e9bc4" },
  { x: 150, y: 180, r: 1.8, opacity: 0.9, hasSparkle: true, delay: 1.3, color: "#ffffff", glowColor: "#8da8d6" },
  { x: 230, y: 250, r: 1.3, opacity: 0.75, delay: 2.2, color: "#e8f1fd", glowColor: "#7e9bc4" },
  { x: 310, y: 190, r: 1.1, opacity: 0.65, delay: 0.9, color: "#dbe8fa", glowColor: "#6c88b2" },
  { x: 380, y: 90, r: 2.0, opacity: 0.95, hasSparkle: true, delay: 2.8, color: "#ffffff", glowColor: "#9dbbe8" },
  { x: 460, y: 240, r: 1.2, opacity: 0.7, delay: 0.4, color: "#e8f1fd", glowColor: "#7e9bc4" },
  { x: 530, y: 170, r: 1.4, opacity: 0.8, delay: 1.6, color: "#ffffff", glowColor: "#8da8d6" },
  { x: 610, y: 260, r: 1.1, opacity: 0.65, delay: 2.4, color: "#dbe8fa", glowColor: "#6c88b2" },
  { x: 690, y: 195, r: 1.5, opacity: 0.85, delay: 0.8, color: "#e8f1fd", glowColor: "#7e9bc4" },
  { x: 770, y: 130, r: 2.2, opacity: 0.95, hasSparkle: true, delay: 2.5, color: "#ffffff", glowColor: "#9dbbe8" },
  { x: 850, y: 240, r: 1.2, opacity: 0.7, delay: 0.3, color: "#dbe8fa", glowColor: "#7e9bc4" },
  { x: 920, y: 185, r: 1.4, opacity: 0.8, delay: 1.7, color: "#ffffff", glowColor: "#8da8d6" },
  { x: 1000, y: 250, r: 1.1, opacity: 0.65, delay: 2.7, color: "#dbe8fa", glowColor: "#6c88b2" },
  { x: 1270, y: 190, r: 1.9, opacity: 0.9, hasSparkle: true, delay: 1.0, color: "#ffffff", glowColor: "#9dbbe8" },
  { x: 1350, y: 260, r: 1.2, opacity: 0.7, delay: 2.1, color: "#e8f1fd", glowColor: "#7e9bc4" },
  { x: 1430, y: 180, r: 1.5, opacity: 0.85, delay: 0.6, color: "#ffffff", glowColor: "#8da8d6" },
  { x: 1510, y: 240, r: 1.1, opacity: 0.65, delay: 1.9, color: "#dbe8fa", glowColor: "#6c88b2" },
  { x: 1580, y: 120, r: 2.1, opacity: 0.95, hasSparkle: true, delay: 2.9, color: "#ffffff", glowColor: "#9dbbe8" },
  { x: 1660, y: 220, r: 1.3, opacity: 0.75, delay: 0.7, color: "#e8f1fd", glowColor: "#7e9bc4" },
  { x: 1740, y: 165, r: 1.6, opacity: 0.85, delay: 1.5, color: "#ffffff", glowColor: "#8da8d6" },
  { x: 1820, y: 240, r: 1.2, opacity: 0.7, delay: 2.3, color: "#dbe8fa", glowColor: "#7e9bc4" },
  { x: 1890, y: 180, r: 1.8, opacity: 0.9, hasSparkle: true, delay: 0.2, color: "#ffffff", glowColor: "#9dbbe8" },
];

export default function Background() {
  return (
    <div
      data-scenic-background
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full pointer-events-none select-none"
      >
        <defs>
          {/* 1. SKY GRADIENT: Deep celestial atmosphere */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#04060a" />
            <stop offset="28%" stopColor="#080c16" />
            <stop offset="55%" stopColor="#0e1526" />
            <stop offset="82%" stopColor="#141c30" />
            <stop offset="100%" stopColor="#0b101c" />
          </linearGradient>

          {/* 2. EXACTLY ONE MOON GLOW */}
          <radialGradient id="moonAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8f2ff" stopOpacity="0.32" />
            <stop offset="35%" stopColor="#a3c4f3" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#5d88c2" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#5d88c2" stopOpacity="0" />
          </radialGradient>

          {/* MOON SURFACE: Luminous spherical gradient */}
          <radialGradient id="moonSurfGrad" cx="38%" cy="36%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#edf4fc" />
            <stop offset="65%" stopColor="#ccdff6" />
            <stop offset="90%" stopColor="#9cbcdb" />
            <stop offset="100%" stopColor="#7698bd" />
          </radialGradient>

          {/* Single moon clip path */}
          <clipPath id="singleMoonClip">
            <circle cx="1140" cy="155" r="32" />
          </clipPath>

          {/* Exact boundary clip of the distant mountain range so no snow can ever spill outside */}
          <clipPath id="mountainRangeClip">
            <polygon points="0,420 240,310 460,450 620,260 840,430 1040,290 1280,440 1480,250 1740,420 1860,330 1920,380 1920,600 0,600" />
          </clipPath>

          {/* 3. MOUNTAIN GRADIENTS */}
          <linearGradient id="distPeakLit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#415982" />
            <stop offset="45%" stopColor="#253552" />
            <stop offset="100%" stopColor="#121b2c" />
          </linearGradient>

          <linearGradient id="distPeakShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#182336" />
            <stop offset="60%" stopColor="#0f1624" />
            <stop offset="100%" stopColor="#080c14" />
          </linearGradient>

          <linearGradient id="midRidgeLit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e4266" />
            <stop offset="50%" stopColor="#1b273d" />
            <stop offset="100%" stopColor="#0e1524" />
          </linearGradient>

          <linearGradient id="midRidgeShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#141c2d" />
            <stop offset="65%" stopColor="#0c111c" />
            <stop offset="100%" stopColor="#070a10" />
          </linearGradient>

          {/* Atmospheric valley mist between mountain layers */}
          <linearGradient id="valleyMist" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4f6e9c" stopOpacity="0" />
            <stop offset="50%" stopColor="#5475a6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#304463" stopOpacity="0" />
          </linearGradient>

          {/* 4. VALLEY RIVER GRADIENTS */}
          <linearGradient id="riverSurface" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#060b13" />
            <stop offset="25%" stopColor="#0c1626" />
            <stop offset="55%" stopColor="#15243c" />
            <stop offset="75%" stopColor="#0e1a2c" />
            <stop offset="100%" stopColor="#060b13" />
          </linearGradient>


          <linearGradient id="riverMistGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8db5e6" stopOpacity="0" />
            <stop offset="30%" stopColor="#8db5e6" stopOpacity="0.14" />
            <stop offset="70%" stopColor="#abcaf0" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8db5e6" stopOpacity="0" />
          </linearGradient>

          {/* ========================================================================= */}
          {/* 5. MULTIPLE DISTINCT TREE SPECIES (PREVENTS REPETITION & UNIFORMITY) */}
          {/* ========================================================================= */}
          
          {/* SPECIES 1: Tall Alpine Fir (Slender, towering spire with multi-tier needles) */}
          <symbol id="tree-alpine-fir" viewBox="0 0 24 72">
            {/* Trunk */}
            <rect x="10.5" y="54" width="3" height="18" rx="1" fill="#080c14" />
            <rect x="11.5" y="54" width="1.5" height="18" fill="#141c28" opacity="0.6" />
            {/* Tier 4 (Bottom) */}
            <polygon points="12,34 2,54 22,54" fill="#0c1320" />
            <polygon points="12,34 12,54 22,54" fill="#172338" />
            <polygon points="12,34 15,42 20,54 12,52" fill="#243652" opacity="0.6" />
            {/* Tier 3 */}
            <polygon points="12,22 4,40 20,40" fill="#0f1624" />
            <polygon points="12,22 12,40 20,40" fill="#1b2840" />
            <polygon points="12,22 15,30 18,40 12,38" fill="#2a3d5e" opacity="0.65" />
            {/* Tier 2 */}
            <polygon points="12,11 6,26 18,26" fill="#121b2b" />
            <polygon points="12,11 12,26 18,26" fill="#21304a" />
            {/* Tier 1 (Spire Top) */}
            <polygon points="12,0 8,14 16,14" fill="#152134" />
            <polygon points="12,0 12,14 16,14" fill="#293c5c" />
            {/* Frost/moonlit needle tip */}
            <polygon points="12,0 13,4 11,4" fill="#8da8d6" opacity="0.85" />
          </symbol>

          {/* SPECIES 2: Mature Broad Pine (Spreading, asymmetric, rich foliage boughs) */}
          <symbol id="tree-broad-pine" viewBox="0 0 38 64">
            {/* Sturdy Trunk */}
            <rect x="17" y="48" width="4" height="16" rx="1.5" fill="#070a12" />
            <rect x="18" y="48" width="2" height="16" fill="#121926" opacity="0.5" />
            {/* Lower broad canopy */}
            <path
              d="M 19 28 L 2 48 L 13 48 L 9 52 L 29 52 L 25 48 L 36 48 Z"
              fill="#0d1422"
            />
            <path
              d="M 19 28 L 19 52 L 29 52 L 25 48 L 36 48 Z"
              fill="#19263c"
            />
            {/* Mid boughs with moonlit facets */}
            <path
              d="M 19 16 L 6 32 L 14 32 L 11 36 L 27 36 L 24 32 L 32 32 Z"
              fill="#101828"
            />
            <path
              d="M 19 16 L 19 36 L 27 36 L 24 32 L 32 32 Z"
              fill="#1e2d46"
            />
            <path d="M 19 16 L 23 22 L 30 32 L 19 30 Z" fill="#2d4264" opacity="0.6" />
            {/* Upper crown */}
            <polygon points="19,0 10,18 28,18" fill="#141f32" />
            <polygon points="19,0 19,18 28,18" fill="#243654" />
            <polygon points="19,0 22,8 26,18 19,16" fill="#364e76" opacity="0.7" />
          </symbol>

          {/* SPECIES 3: Mountain Pine (Medium, compact pyramid evergreen) */}
          <symbol id="tree-mountain-pine" viewBox="0 0 28 54">
            {/* Trunk */}
            <rect x="12.5" y="40" width="3" height="14" rx="1" fill="#080c14" />
            {/* Bottom tier */}
            <polygon points="14,24 3,42 25,42" fill="#0e1524" />
            <polygon points="14,24 14,42 25,42" fill="#19253c" />
            {/* Middle tier */}
            <polygon points="14,12 6,28 22,28" fill="#121b2c" />
            <polygon points="14,12 14,28 22,28" fill="#20304c" />
            {/* Top tier */}
            <polygon points="14,0 8,16 20,16" fill="#152136" />
            <polygon points="14,0 14,16 20,16" fill="#273a5a" />
            <polygon points="14,0 16,6 19,16 14,14" fill="#3a5278" opacity="0.65" />
          </symbol>

          {/* SPECIES 4: Deciduous Mountain Birch / Oak (Rounded leafy canopy, dark branching) */}
          <symbol id="tree-deciduous" viewBox="0 0 42 60">
            {/* Curved organic trunk & branches */}
            <path
              d="M 21 60 
                 C 20 46, 17 38, 14 30 
                 C 13 28, 11 25, 8 22 
                 L 11 20 
                 C 14 24, 16 28, 18 34 
                 C 19 32, 23 26, 27 20 
                 L 29 22 
                 C 25 28, 22 34, 21 42 
                 L 23 60 Z"
              fill="#080b12"
            />
            {/* Overlapping rounded canopy foliage lobes */}
            <circle cx="14" cy="22" r="11" fill="#0c121e" />
            <circle cx="28" cy="20" r="12" fill="#141f32" />
            <circle cx="21" cy="12" r="12" fill="#19263c" />
            <circle cx="16" cy="18" r="9" fill="#111928" />
            <circle cx="26" cy="16" r="10" fill="#21314c" />
            {/* Moonlit upper-right foliage highlights */}
            <path
              d="M 18 6 C 24 3, 31 7, 32 14 C 36 15, 39 19, 38 24 C 33 22, 27 18, 24 12 Z"
              fill="#2e4266"
              opacity="0.8"
            />
            <path
              d="M 24 8 C 28 6, 32 9, 33 13 C 30 11, 26 10, 24 8 Z"
              fill="#425d8a"
              opacity="0.7"
            />
          </symbol>

          {/* Lush Bush Symbol */}
          <symbol id="lush-bush" viewBox="0 0 46 26">
            <path
              d="M 2 26 C 2 14, 12 7, 21 9 C 25 4, 37 4, 42 12 C 46 16, 46 21, 46 26 Z"
              fill="#080c14"
            />
            <path
              d="M 6 26 C 6 16, 14 10, 22 12 C 26 7, 36 7, 40 14 C 44 18, 43 23, 43 26 Z"
              fill="#121b2b"
            />
            <path
              d="M 16 11 C 20 6, 28 6, 32 10 C 36 11, 40 14, 39 19 C 33 16, 25 15, 16 17 Z"
              fill="#1d2a40"
            />
            <path
              d="M 23 8 C 26 5, 31 5, 34 8 C 36 9, 37 11, 35 13 C 32 11, 27 10, 23 11 Z"
              fill="#2e4264"
              opacity="0.75"
            />
          </symbol>
        </defs>

        {/* ========================================================================= */}
        {/* 1. SKY BASE */}
        {/* ========================================================================= */}
        <rect width="1920" height="1080" fill="url(#skyGrad)" />

        {/* ========================================================================= */}
        {/* 2. STARS WITH MULTI-DEPTH GLOW & SHIMMER */}
        {/* ========================================================================= */}
        <g id="bg-stars">
          {STARS.map((star, idx) => (
            <g
              key={`star-${idx}`}
              className="star-shimmer"
              style={{ animationDelay: `${star.delay ?? 0}s` }}
            >
              {star.glowColor && (
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={star.r * 2.8}
                  fill={star.glowColor}
                  opacity={star.opacity * 0.4}
                />
              )}
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill={star.color ?? "#ffffff"}
                opacity={star.opacity}
              />
              {star.hasSparkle && (
                <path
                  d={`M ${star.x} ${star.y - star.r * 3.6} 
                      Q ${star.x} ${star.y} ${star.x + star.r * 3.6} ${star.y} 
                      Q ${star.x} ${star.y} ${star.x} ${star.y + star.r * 3.6} 
                      Q ${star.x} ${star.y} ${star.x - star.r * 3.6} ${star.y} Z`}
                  fill="#ffffff"
                  opacity={0.85}
                />
              )}
            </g>
          ))}
        </g>

        {/* ========================================================================= */}
        {/* 3. EXACTLY ONE SINGLE GLOWING MOON */}
        {/* ========================================================================= */}
        <g id="bg-single-moon">
          <circle
            cx={1140}
            cy={155}
            r={76}
            fill="url(#moonAuraGrad)"
            className="moon-glow-pulse"
          />
          <circle cx={1140} cy={155} r={32} fill="url(#moonSurfGrad)" />

          <g clipPath="url(#singleMoonClip)" opacity={0.65}>
            <path
              d="M 1125 138 C 1130 134, 1142 135, 1146 142 C 1149 147, 1145 154, 1138 155 C 1130 156, 1123 148, 1125 138 Z"
              fill="#6b88b0"
            />
            <path
              d="M 1145 150 C 1152 147, 1162 150, 1165 158 C 1167 165, 1158 171, 1150 169 C 1142 167, 1140 156, 1145 150 Z"
              fill="#6481a8"
            />
            <path
              d="M 1132 162 C 1138 159, 1146 162, 1147 168 C 1148 173, 1141 178, 1134 177 C 1128 176, 1127 168, 1132 162 Z"
              fill="#5d799e"
            />
            <circle cx={1135} cy={145} r={3.2} fill="#546f91" opacity={0.45} />
            <circle cx={1154} cy={162} r={2.6} fill="#546f91" opacity={0.4} />
            <circle cx={1142} cy={172} r={1.8} fill="#546f91" opacity={0.35} />
            <path
              d="M 1110 155 A 32 32 0 0 0 1172 155 A 32 32 0 0 1 1110 155 Z"
              fill="#3a5273"
              opacity={0.3}
            />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 4. DISTANT MOUNTAIN RANGE (LAYER 1) */}
        {/* ========================================================================= */}
        <g id="bg-distant-mountains">
          {/* Base Mountain Peaks (Rock body) */}
          {/* Peak 1 (Left) */}
          <polygon points="0,520 0,420 240,310 240,560 0,560" fill="url(#distPeakShade)" />
          <polygon points="240,310 460,450 460,560 240,560" fill="url(#distPeakLit)" />

          {/* Peak 2 (Mid-Left) */}
          <polygon points="460,450 620,260 620,570 460,570" fill="url(#distPeakShade)" />
          <polygon points="620,260 840,430 840,570 620,570" fill="url(#distPeakLit)" />

          {/* Peak 3 (Center) */}
          <polygon points="840,430 1040,290 1040,580 840,580" fill="url(#distPeakShade)" />
          <polygon points="1040,290 1280,440 1280,580 1040,580" fill="url(#distPeakLit)" />

          {/* Peak 4 (Mid-Right - Under Moon) */}
          <polygon points="1280,440 1480,250 1480,580 1280,580" fill="url(#distPeakShade)" />
          <polygon points="1480,250 1740,420 1740,580 1480,580" fill="url(#distPeakLit)" />

          {/* Peak 5 (Far Right) */}
          <polygon points="1740,420 1860,330 1860,580 1740,580" fill="url(#distPeakShade)" />
          <polygon points="1860,330 1920,380 1920,580 1860,580" fill="url(#distPeakLit)" />

          {/* 
            SNOWCAPS: Completely covering the summit and upper slopes with zero gaps.
            Clipped by mountainRangeClip so it is physically impossible for any ice to spill outside.
          */}
          <g id="mountain-snowcaps" clipPath="url(#mountainRangeClip)">
            {/* --- PEAK 1 SNOWCAP (Apex: 240, 310) --- */}
            <path
              d="M 120 365 L 240 310 L 240 405 C 230 400, 215 372, 195 378 C 175 382, 150 358, 120 365 Z"
              fill="#7d9bc4"
            />
            <path
              d="M 240 310 L 350 380 C 320 375, 295 388, 275 382 C 260 378, 250 400, 240 405 L 240 310 Z"
              fill="#eaf4fe"
            />
            <path
              d="M 120 365 L 240 310 L 350 380"
              stroke="#ffffff"
              strokeWidth={1.5}
              opacity={0.92}
              fill="none"
            />

            {/* --- PEAK 2 SNOWCAP (Apex: 620, 260) --- */}
            <path
              d="M 540 355 L 620 260 L 620 405 C 605 398, 590 365, 570 372 C 555 378, 548 350, 540 355 Z"
              fill="#7d9bc4"
            />
            <path
              d="M 620 260 L 760 368 C 725 360, 695 380, 675 372 C 655 365, 640 395, 620 405 L 620 260 Z"
              fill="#ecf5ff"
            />
            <path
              d="M 540 355 L 620 260 L 760 368"
              stroke="#ffffff"
              strokeWidth={1.5}
              opacity={0.94}
              fill="none"
            />

            {/* --- PEAK 3 SNOWCAP (Apex: 1040, 290) --- */}
            <path
              d="M 920 374 L 1040 290 L 1040 412 C 1025 405, 1005 375, 980 382 C 955 390, 935 368, 920 374 Z"
              fill="#7d9bc4"
            />
            <path
              d="M 1040 290 L 1180 378 C 1145 370, 1115 390, 1095 380 C 1075 372, 1060 405, 1040 412 L 1040 290 Z"
              fill="#ecf5ff"
            />
            <path
              d="M 920 374 L 1040 290 L 1180 378"
              stroke="#ffffff"
              strokeWidth={1.5}
              opacity={0.94}
              fill="none"
            />

            {/* --- PEAK 4 SNOWCAP (Apex: 1480, 250 - Directly under Moon) --- */}
            <path
              d="M 1370 355 L 1480 250 L 1480 415 C 1465 408, 1445 370, 1420 378 C 1395 385, 1380 350, 1370 355 Z"
              fill="#89a5cb"
            />
            <path
              d="M 1480 250 L 1660 368 C 1615 360, 1575 385, 1545 375 C 1520 365, 1500 405, 1480 415 L 1480 250 Z"
              fill="#f5faff"
            />
            <path
              d="M 1370 355 L 1480 250 L 1660 368"
              stroke="#ffffff"
              strokeWidth={1.8}
              opacity={0.98}
              fill="none"
            />

            {/* --- PEAK 5 SNOWCAP (Apex: 1860, 330) --- */}
            <path
              d="M 1790 382 L 1860 330 L 1860 402 C 1854 398, 1845 376, 1830 382 C 1812 388, 1800 378, 1790 382 Z"
              fill="#7d9bc4"
            />
            <path
              d="M 1860 330 L 1910 372 C 1895 370, 1880 388, 1870 380 C 1862 374, 1858 398, 1860 402 L 1860 330 Z"
              fill="#ecf5ff"
            />
            <path
              d="M 1790 382 L 1860 330 L 1910 372"
              stroke="#ffffff"
              strokeWidth={1.5}
              opacity={0.92}
              fill="none"
            />
          </g>
        </g>

        {/* Atmospheric mist */}
        <rect x="0" y="400" width="1920" height="150" fill="url(#valleyMist)" />

        {/* ========================================================================= */}
        {/* 5. MID-RANGE MOUNTAIN RIDGES (LAYER 2) */}
        {/* ========================================================================= */}
        <g id="bg-mid-mountains">
          <polygon points="0,520 160,410 160,560 0,560" fill="url(#midRidgeShade)" />
          <polygon points="160,410 360,500 360,560 160,560" fill="url(#midRidgeLit)" />

          <polygon points="360,500 510,380 510,560 360,560" fill="url(#midRidgeShade)" />
          <polygon points="510,380 750,490 750,560 510,560" fill="url(#midRidgeLit)" />

          <polygon points="750,490 920,420 920,560 750,560" fill="url(#midRidgeShade)" />
          <polygon points="920,420 1120,500 1120,560 920,560" fill="url(#midRidgeLit)" />

          <polygon points="1120,500 1260,370 1260,560 1120,560" fill="url(#midRidgeShade)" />
          <polygon points="1260,370 1490,480 1490,560 1260,560" fill="url(#midRidgeLit)" />

          <polygon points="1490,480 1690,360 1690,560 1490,560" fill="url(#midRidgeShade)" />
          <polygon points="1690,360 1920,470 1920,560 1690,560" fill="url(#midRidgeLit)" />
        </g>

        {/* ========================================================================= */}
        {/* 6. UPPER FOOTHILL FOREST RIDGE (BEHIND THE TRACK CORRIDOR) */}
        {/* Organic, scattered trees across slopes with diverse species and clearings */}
        {/* ========================================================================= */}
        <g id="bg-upper-forest-ridge">
          {/* Continuous terrain slope */}
          <path
            d="M 0 495 
               Q 180 480, 360 495 
               T 720 485 
               T 1100 480 
               T 1480 490 
               Q 1700 480, 1920 495 
               L 1920 560 
               L 0 560 Z"
            fill="#090f1a"
          />
          <path
            d="M 0 495 
               Q 180 480, 360 495 
               T 720 485 
               T 1100 480 
               T 1480 490 
               Q 1700 480, 1920 495 
               L 1920 515 
               Q 1700 500, 1480 510 
               T 1100 500 
               T 720 505 
               T 360 515 
               Q 180 500, 0 515 Z"
            fill="#162236"
            opacity={0.6}
          />

          {/* SCATTERED DIVERSE TREES ON UPPER RIDGE */}
          {/* Left Grove: Broad pine + tall fir + mountain pine + deciduous birch */}
          <use href="#tree-broad-pine" x={45} y={445} width={34} height={56} />
          <use href="#tree-alpine-fir" x={82} y={434} width={22} height={66} />
          <use href="#tree-mountain-pine" x={115} y={455} width={24} height={46} />
          <use href="#tree-deciduous" x={148} y={442} width={36} height={52} />

          {/* Mid-Left Stand (Past an open meadow gap at x = 180..280) */}
          <use href="#tree-alpine-fir" x={305} y={432} width={24} height={68} />
          <use href="#tree-broad-pine" x={340} y={444} width={32} height={54} />
          <use href="#tree-mountain-pine" x={385} y={450} width={22} height={46} />

          {/* Central Grove (Past broad open vista at x = 415..620) */}
          <use href="#tree-deciduous" x={635} y={444} width={36} height={52} />
          <use href="#tree-alpine-fir" x={680} y={430} width={24} height={70} />
          <use href="#tree-broad-pine" x={725} y={440} width={34} height={56} />

          {/* Moonlit Ridge Stand */}
          <use href="#tree-mountain-pine" x={1035} y={448} width={24} height={48} />
          <use href="#tree-alpine-fir" x={1075} y={426} width={26} height={74} />
          <use href="#tree-broad-pine" x={1120} y={438} width={34} height={58} />

          {/* Right Hillside Copse */}
          <use href="#tree-deciduous" x={1370} y={442} width={38} height={54} />
          <use href="#tree-alpine-fir" x={1415} y={430} width={24} height={70} />
          <use href="#tree-mountain-pine" x={1460} y={450} width={22} height={46} />
          <use href="#tree-broad-pine" x={1498} y={438} width={32} height={56} />

          {/* Far Right Promontory Stand */}
          <use href="#tree-alpine-fir" x={1695} y={432} width={24} height={68} />
          <use href="#tree-broad-pine" x={1738} y={440} width={32} height={56} />
          <use href="#tree-deciduous" x={1780} y={445} width={34} height={50} />
          <use href="#tree-mountain-pine" x={1825} y={452} width={22} height={44} />

          {/* Ground bushes nestling the tree roots */}
          <use href="#lush-bush" x={35} y={485} width={36} height={20} />
          <use href="#lush-bush" x={105} y={488} width={40} height={22} />
          <use href="#lush-bush" x={325} y={486} width={38} height={21} />
          <use href="#lush-bush" x={670} y={484} width={40} height={22} />
          <use href="#lush-bush" x={1060} y={482} width={42} height={23} />
          <use href="#lush-bush" x={1405} y={485} width={38} height={21} />
          <use href="#lush-bush" x={1725} y={483} width={44} height={24} />
        </g>

        {/* ========================================================================= */}
        {/* 7. THE MOONLIT VALLEY RIVER & WATER SHIMMER (BELOW THE TRACK) */}
        {/* Serene alpine river winding through the valley with water shimmers & mist */}
        {/* Note: The fake viaduct deck line was removed so the real track line in Hero */}
        {/* is the sole, authoritative railway line. */}
        {/* ========================================================================= */}
        <g id="bg-valley-river">
          {/* Far riverbank slope */}
          <path
            d="M 0 615 
               Q 320 600, 640 615 
               T 1280 610 
               Q 1600 600, 1920 615 
               L 1920 680 
               L 0 680 Z"
            fill="#090e18"
          />

          {/* Winding Alpine River Water Surface */}
          <path
            d="M 0 628 
               C 320 615, 620 632, 940 635 
               C 1260 638, 1580 622, 1920 630 
               L 1920 735 
               C 1600 745, 1240 725, 920 730 
               C 600 735, 280 750, 0 740 Z"
            fill="url(#riverSurface)"
          />

          {/* Moon Reflection Shimmer Ripples on the Water (Aligned beneath moon x = 1140) */}
          <g opacity={0.85}>
            {[
              [1140, 642, 60],
              [1125, 648, 85],
              [1155, 655, 110],
              [1135, 663, 140],
              [1150, 672, 165],
              [1130, 681, 150],
              [1160, 690, 130],
              [1140, 700, 105],
              [1125, 710, 75],
              [1145, 718, 50],
            ].map(([rx, ry, rw], idx) => (
              <path
                key={`ripple-${idx}`}
                d={`M ${rx - rw / 2} ${ry} 
                    Q ${rx - rw / 4} ${ry - 1.2}, ${rx} ${ry} 
                    T ${rx + rw / 2} ${ry}`}
                stroke="#c2daf8"
                strokeWidth={idx % 2 === 0 ? 1.6 : 1.1}
                strokeLinecap="round"
                fill="none"
                opacity={0.55 + (idx % 3) * 0.15}
              />
            ))}
          </g>

          {/* Ethereal river mist ribbons drifting over the water */}
          <path
            d="M 120 645 
               Q 450 635, 820 650 
               T 1550 642 
               Q 1750 655, 1920 645 
               L 1920 665 
               Q 1650 675, 1280 660 
               T 550 670 
               Q 280 658, 120 665 Z"
            fill="url(#riverMistGrad)"
          />
          <path
            d="M 0 690 
               Q 350 678, 720 695 
               T 1440 688 
               Q 1720 705, 1920 692 
               L 1920 710 
               Q 1620 722, 1220 708 
               T 520 715 
               Q 220 702, 0 710 Z"
            fill="url(#riverMistGrad)"
            opacity={0.8}
          />
        </g>

        {/* ========================================================================= */}
        {/* 8. RIVERBANK FORESTS & MIDGROUND HILLS (SCATTERED & DIVERSE) */}
        {/* ========================================================================= */}
        <g id="bg-riverbank-hills">
          {/* Near riverbank solid contour */}
          <path
            d="M 0 725 
               C 340 735, 680 715, 1020 722 
               C 1360 728, 1680 710, 1920 720 
               L 1920 830 
               L 0 830 Z"
            fill="#0b101a"
          />
          <path
            d="M 0 725 
               C 340 735, 680 715, 1020 722 
               C 1360 728, 1680 710, 1920 720 
               L 1920 736 
               C 1680 726, 1360 744, 1020 738 
               C 680 731, 340 751, 0 741 Z"
            fill="#1b263b"
            opacity={0.7}
          />

          {/* FIRMLY GROUNDED, SCATTERED DIVERSE RIVERBANK TREES */}
          {/* Left riverbank stand */}
          <use href="#tree-broad-pine" x={75} y={660} width={38} height={66} />
          <use href="#tree-mountain-pine" x={120} y={674} width={26} height={52} />
          <use href="#tree-alpine-fir" x={160} y={650} width={26} height={76} />
          <use href="#tree-deciduous" x={200} y={665} width={38} height={56} />

          {/* Riverbend grove (Past open sandy/grassy bank at x = 240..460) */}
          <use href="#tree-broad-pine" x={485} y={662} width={36} height={64} />
          <use href="#tree-alpine-fir" x={530} y={648} width={26} height={78} />

          {/* Central reflection shoreline grove */}
          <use href="#tree-deciduous" x={875} y={660} width={40} height={58} />
          <use href="#tree-mountain-pine" x={925} y={668} width={26} height={52} />

          {/* Right riverbank forests */}
          <use href="#tree-broad-pine" x={1310} y={658} width={38} height={68} />
          <use href="#tree-alpine-fir" x={1355} y={645} width={26} height={80} />
          <use href="#tree-mountain-pine" x={1405} y={665} width={26} height={54} />

          <use href="#tree-deciduous" x={1635} y={655} width={40} height={60} />
          <use href="#tree-alpine-fir" x={1685} y={640} width={28} height={84} />
          <use href="#tree-broad-pine" x={1738} y={652} width={38} height={70} />
          <use href="#tree-mountain-pine" x={1790} y={668} width={24} height={50} />

          {/* Bushes rooted firmly at tree bases */}
          <use href="#lush-bush" x={55} y={715} width={42} height={23} />
          <use href="#lush-bush" x={125} y={718} width={46} height={25} />
          <use href="#lush-bush" x={490} y={714} width={44} height={24} />
          <use href="#lush-bush" x={890} y={712} width={46} height={25} />
          <use href="#lush-bush" x={1335} y={714} width={44} height={24} />
          <use href="#lush-bush" x={1670} y={710} width={48} height={26} />
          <use href="#lush-bush" x={1750} y={714} width={44} height={24} />
        </g>

        {/* ========================================================================= */}
        {/* 9. FOREGROUND ROLLING KNOLLS & SILHOUETTES (BOTTOM SCREEN, RICH & DEEP) */}
        {/* ========================================================================= */}
        <g id="bg-foreground-knolls">
          {/* Main rolling foreground terrain polygon */}
          <path
            d="M 0 790 
               Q 280 815, 580 795 
               T 1180 805 
               T 1680 785 
               Q 1820 800, 1920 790 
               L 1920 1080 
               L 0 1080 Z"
            fill="#070a12"
          />

          {/* Moonlit rim lighting on the rolling crest */}
          <path
            d="M 0 790 
               Q 280 815, 580 795 
               T 1180 805 
               T 1680 785 
               Q 1820 800, 1920 790 
               L 1920 808 
               Q 1820 818, 1680 803 
               T 1180 823 
               T 580 813 
               Q 280 833, 0 808 Z"
            fill="#162032"
            opacity={0.8}
          />

          {/* Secondary close foreground slope */}
          <path
            d="M 0 860 
               C 380 885, 780 855, 1180 870 
               C 1580 885, 1780 855, 1920 865 
               L 1920 1080 
               L 0 1080 Z"
            fill="#05070c"
          />

          {/* TALL DIVERSE FOREGROUND TREES FRAMING THE CORNERS */}
          {/* Left foreground silhouette grove (Diverse heights & species) */}
          <use href="#tree-broad-pine" x={20} y={710} width={54} height={118} />
          <use href="#tree-alpine-fir" x={75} y={692} width={38} height={136} />
          <use href="#tree-deciduous" x={135} y={725} width={62} height={102} />
          <use href="#tree-mountain-pine" x={198} y={740} width={42} height={88} />

          {/* Right foreground silhouette grove */}
          <use href="#tree-deciduous" x={1660} y={718} width={64} height={108} />
          <use href="#tree-broad-pine" x={1725} y={700} width={56} height={128} />
          <use href="#tree-alpine-fir" x={1795} y={688} width={40} height={140} />
          <use href="#tree-mountain-pine" x={1855} y={730} width={44} height={94} />

          {/* Lush foreground bush clusters along the slope contours */}
          <use href="#lush-bush" x={5} y={805} width={56} height={30} />
          <use href="#lush-bush" x={85} y={810} width={62} height={32} />
          <use href="#lush-bush" x={175} y={808} width={54} height={28} />
          <use href="#lush-bush" x={340} y={820} width={50} height={26} />
          <use href="#lush-bush" x={420} y={815} width={58} height={30} />
          <use href="#lush-bush" x={760} y={825} width={52} height={27} />
          <use href="#lush-bush" x={840} y={820} width={60} height={31} />
          <use href="#lush-bush" x={1120} y={830} width={54} height={28} />
          <use href="#lush-bush" x={1200} y={825} width={62} height={32} />
          <use href="#lush-bush" x={1480} y={815} width={52} height={27} />
          <use href="#lush-bush" x={1560} y={810} width={58} height={30} />
          <use href="#lush-bush" x={1685} y={805} width={60} height={32} />
          <use href="#lush-bush" x={1780} y={802} width={64} height={34} />
          <use href="#lush-bush" x={1865} y={808} width={52} height={28} />

          {/* Foreground Wild Grass / Reed Silhouettes */}
          {[
            [40, 875], [95, 870], [150, 880], [280, 890], [360, 885], 
            [540, 895], [680, 890], [820, 900], [980, 895], [1140, 905], 
            [1320, 895], [1460, 890], [1620, 885], [1740, 880], [1840, 875]
          ].map(([gx, gy], gidx) => (
            <path
              key={`grass-${gidx}`}
              d={`M ${gx} ${gy} 
                  Q ${gx - 4} ${gy - 18}, ${gx - 8} ${gy - 24} 
                  M ${gx + 3} ${gy} 
                  Q ${gx + 4} ${gy - 22}, ${gx + 8} ${gy - 28} 
                  M ${gx + 7} ${gy} 
                  Q ${gx + 12} ${gy - 16}, ${gx + 16} ${gy - 20}`}
              stroke="#131b2a"
              strokeWidth={1.2}
              strokeLinecap="round"
              fill="none"
              opacity={0.7}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

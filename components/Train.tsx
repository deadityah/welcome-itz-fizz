import React from "react";

interface TrainProps {
  className?: string;
}

// Fixed dimensions & train structure constants
const CAR_W = 430;
const GAP = 22;
const PASSENGER_CARS = 2;
const TOTAL_CARS = PASSENGER_CARS + 2; // 4 cars total: 0 = tail car, 1..2 = passenger cars, 3 = head car
const TOTAL_W = (TOTAL_CARS - 1) * (CAR_W + GAP) + CAR_W; // 3 * 452 + 430 = 1786
const TRAIN_H = 120;

export default function Train({ className = "" }: TrainProps) {
  return (
    <div
      data-train
      className={`relative flex-shrink-0 pointer-events-none select-none will-change-transform ${className}`}
      style={{
        width: `calc(${TOTAL_W}px * var(--train-scale, 0.7))`,
      }}
      aria-label="High-speed 4-car bullet train with night lighting"
    >
      <svg
        viewBox={`0 0 ${TOTAL_W} ${TRAIN_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible pointer-events-none select-none"
        style={{
          width: `calc(${TOTAL_W}px * var(--train-scale, 0.7))`,
          height: `calc(${TRAIN_H}px * var(--train-scale, 0.7))`,
        }}
      >
        <defs>
          {/* Metallic train body gradient */}
          <linearGradient id="trainBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222736" />
            <stop offset="25%" stopColor="#1a1e29" />
            <stop offset="70%" stopColor="#131620" />
            <stop offset="100%" stopColor="#0c0e14" />
          </linearGradient>

          {/* Roof metallic highlight */}
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d4458" />
            <stop offset="75%" stopColor="#555f7c" />
            <stop offset="100%" stopColor="#3d4458" />
          </linearGradient>

          {/* Window exterior glass base */}
          <linearGradient id="windowSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a3040" />
            <stop offset="50%" stopColor="#151922" />
            <stop offset="100%" stopColor="#0a0c10" />
          </linearGradient>

          {/* Warm low-opacity glow inside every window */}
          <linearGradient id="windowWarmGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#ffd88a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#d48a28" stopOpacity="0.10" />
          </linearGradient>

          {/* Faint light spill under each car onto the track */}
          <linearGradient id="underCarSpillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd88a" stopOpacity="0.13" />
            <stop offset="60%" stopColor="#ffb84d" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ff9900" stopOpacity="0" />
          </linearGradient>

          {/* Faint glow on the nose panel */}
          <linearGradient id="nosePanelGlow" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.26" />
            <stop offset="50%" stopColor="#ffe6b8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffe6b8" stopOpacity="0" />
          </linearGradient>

          {/* Headlamp beam gradient: 55% opacity at lamp to 0 at tip */}
          <linearGradient id="headlightBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.55" />
            <stop offset="20%" stopColor="#fff3d6" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#ffe9be" stopOpacity="0.14" />
            <stop offset="85%" stopColor="#ffd99e" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffd99e" stopOpacity="0" />
          </linearGradient>

          {/* Soft ground light radial gradient ellipse on the track line ahead of train */}
          <radialGradient id="groundLightGrad" cx="30%" cy="50%" r="50%" fx="25%" fy="50%">
            <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.36" />
            <stop offset="35%" stopColor="#ffe6b8" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#ffd48a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffc860" stopOpacity="0" />
          </radialGradient>

          {/* Soft headlamp corona glow */}
          <radialGradient id="lampCoronaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.50" />
            <stop offset="40%" stopColor="#fff3d6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#fff3d6" stopOpacity="0" />
          </radialGradient>

          {/* 
            REUSABLE PASSENGER CAR SYMBOL
            Length: 430, Height: 120, 5 warm-glowing windows, continuous stripe, under-car spill
          */}
          <symbol id="passenger-car" viewBox={`0 0 ${CAR_W} ${TRAIN_H}`}>
            {/* Very faint light spill under car onto track */}
            <rect
              x="20"
              y="112"
              width={CAR_W - 40}
              height="8"
              rx="4"
              fill="url(#underCarSpillGrad)"
            />

            {/* Undercarriage Bogies & Wheels */}
            <g>
              <circle cx="60" cy="116" r="4" fill="#2d3345" stroke="#161820" strokeWidth="2" />
              <circle cx="100" cy="116" r="4" fill="#2d3345" stroke="#161820" strokeWidth="2" />
              <rect x="50" y="110" width="60" height="4" rx="2" fill="#1b1f2b" />

              <circle cx="330" cy="116" r="4" fill="#2d3345" stroke="#161820" strokeWidth="2" />
              <circle cx="370" cy="116" r="4" fill="#2d3345" stroke="#161820" strokeWidth="2" />
              <rect x="320" y="110" width="60" height="4" rx="2" fill="#1b1f2b" />
            </g>

            {/* Car Body */}
            <rect
              x="0"
              y="28"
              width={CAR_W}
              height="84"
              rx="2"
              fill="url(#trainBodyGrad)"
              stroke="#2f3647"
              strokeWidth="1.5"
            />

            {/* Roof Fairing Highlight */}
            <line
              x1="0"
              y1="29"
              x2={CAR_W}
              y2="29"
              stroke="url(#roofGrad)"
              strokeWidth="2.5"
            />

            {/* Continuous Orange Stripe */}
            <rect
              x="0"
              y="84"
              width={CAR_W}
              height="5"
              fill="var(--train-stripe)"
            />

            {/* Row of 5 Windows with warm low-opacity glow inside */}
            {[35, 115, 195, 275, 355].map((wx) => (
              <g key={wx}>
                <rect
                  x={wx}
                  y={46}
                  width={44}
                  height={20}
                  rx={4}
                  fill="url(#windowSheen)"
                  stroke="#2b3142"
                  strokeWidth="1.2"
                />
                <rect
                  x={wx + 2}
                  y={48}
                  width={40}
                  height={16}
                  rx={2}
                  fill="url(#windowWarmGlow)"
                />
                <line
                  x1={wx + 4}
                  y1={50}
                  x2={wx + 40}
                  y2={50}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Bottom Skirt Line */}
            <line
              x1="0"
              y1="112"
              x2={CAR_W}
              y2="112"
              stroke="#10121a"
              strokeWidth="2"
            />
          </symbol>
        </defs>

        {/* 
          1. COUPLERS
          Small dark mechanical pieces, max 12% of car height (8px), lower third only (y=104..112),
          drawn ONLY inside the GAP between adjacent cars.
        */}
        <g id="train-couplers">
          {Array.from({ length: TOTAL_CARS - 1 }, (_, i) => {
            const gapX = i * (CAR_W + GAP) + CAR_W;
            return (
              <rect
                key={`coupler-${i}`}
                x={gapX}
                y={104}
                width={GAP}
                height={8}
                rx={1.5}
                fill="#12151e"
                stroke="#0a0c10"
                strokeWidth={0.8}
              />
            );
          })}
        </g>

        {/* 
          2. CARS (ORDER LEFT TO RIGHT: TAIL CAR, 6 PASSENGER CARS, HEAD CAR LAST)
          Calculated strictly in loop: x = index * (CAR_W + GAP)
        */}
        <g id="train-cars">
          {Array.from({ length: TOTAL_CARS }, (_, index) => {
            const x = index * (CAR_W + GAP);

            // Index 0: Tail Car with tapered, rounded rear
            if (index === 0) {
              return (
                <g key="tail-car" id="tail-car">
                  {/* Under-car light spill onto track */}
                  <rect
                    x={x + 60}
                    y={112}
                    width={CAR_W - 70}
                    height="8"
                    rx="4"
                    fill="url(#underCarSpillGrad)"
                  />

                  {/* Undercarriage wheels */}
                  <circle cx={x + 110} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <circle cx={x + 150} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <rect x={x + 100} y={110} width={60} height={4} rx={2} fill="#1b1f2b" />

                  <circle cx={x + 310} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <circle cx={x + 350} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <rect x={x + 300} y={110} width={60} height={4} rx={2} fill="#1b1f2b" />

                  {/* Tail Car Body: tapered, rounded aerodynamic rear */}
                  <path
                    d={`M ${x + CAR_W} 28 
                        L ${x + 120} 28 
                        C ${x + 60} 28, ${x} 54, ${x} 88 
                        C ${x} 98, ${x + 25} 110, ${x + 60} 112 
                        L ${x + CAR_W} 112 
                        Z`}
                    fill="url(#trainBodyGrad)"
                    stroke="#2f3647"
                    strokeWidth="1.5"
                  />

                  {/* Aerodynamic roof highlight */}
                  <path
                    d={`M ${x + CAR_W} 29 
                        L ${x + 120} 29 
                        C ${x + 62} 29, ${x + 6} 54, ${x + 1} 86`}
                    stroke="url(#roofGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Continuous orange stripe tapering into rounded rear */}
                  <path
                    d={`M ${x + CAR_W} 84 
                        L ${x + 80} 84 
                        C ${x + 40} 84, ${x + 12} 88, ${x + 3} 92 
                        L ${x + 4} 97 
                        C ${x + 14} 93, ${x + 38} 89, ${x + 80} 89 
                        L ${x + CAR_W} 89 
                        Z`}
                    fill="var(--train-stripe)"
                  />

                  {/* Row of 5 Passenger Windows with warm interior glow */}
                  {[140, 200, 260, 320, 380].map((offset) => (
                    <g key={offset}>
                      <rect
                        x={x + offset}
                        y={46}
                        width={38}
                        height={20}
                        rx={4}
                        fill="url(#windowSheen)"
                        stroke="#2b3142"
                        strokeWidth="1.2"
                      />
                      <rect
                        x={x + offset + 2}
                        y={48}
                        width={34}
                        height={16}
                        rx={2}
                        fill="url(#windowWarmGlow)"
                      />
                      <line
                        x1={x + offset + 4}
                        y1={50}
                        x2={x + offset + 34}
                        y2={50}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                      />
                    </g>
                  ))}

                  {/* Rear LED marker taillight */}
                  <ellipse cx={x + 14} cy={94} rx={3.5} ry={2.2} fill="#ff2200" />
                  <ellipse cx={x + 14} cy={94} rx={1.5} ry={1.0} fill="#ffffff" />

                  {/* Bottom skirt */}
                  <line x1={x + 60} y1={112} x2={x + CAR_W} y2={112} stroke="#10121a" strokeWidth="2" />
                </g>
              );
            }

            // Index 7 (LAST): Head Car with headlamps, nose glow, and beam
            if (index === TOTAL_CARS - 1) {
              return (
                <g key="head-car" id="head-car">
                  {/* Ground light: soft radial gradient ellipse on track line ahead of train */}
                  <ellipse
                    cx={x + 424 + 180}
                    cy={118}
                    rx={180}
                    ry={10}
                    fill="url(#groundLightGrad)"
                  />

                  {/* 
                    SINGLE HEADLIGHT BEAM
                    ~22vw long (~520 units), max tip height 110 (<= 1.4 * 120 = 168),
                    aimed slightly down at track row (stays in track row band).
                  */}
                  <path
                    data-beam
                    d={`M ${x + 424} 94 
                        L ${x + 424 + 520} 45 
                        C ${x + 424 + 540} 85, ${x + 424 + 540} 118, ${x + 424 + 520} 155 
                        L ${x + 421} 104 
                        Z`}
                    fill="url(#headlightBeamGrad)"
                  />

                  {/* Under-car light spill onto track */}
                  <rect
                    x={x + 16}
                    y={112}
                    width={CAR_W - 40}
                    height="8"
                    rx="4"
                    fill="url(#underCarSpillGrad)"
                  />

                  {/* Undercarriage wheels */}
                  <circle cx={x + 55} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <circle cx={x + 95} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <rect x={x + 45} y={110} width={60} height={4} rx={2} fill="#1b1f2b" />

                  <circle cx={x + 285} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <circle cx={x + 325} cy={116} r={4} fill="#2d3345" stroke="#161820" strokeWidth="2" />
                  <rect x={x + 275} y={110} width={60} height={4} rx={2} fill="#1b1f2b" />

                  {/* Head Car Body: nose tip is the far-right edge (x + CAR_W = 3594) */}
                  <path
                    d={`M ${x} 28 
                        L ${x + 216} 28 
                        C ${x + 286} 28, ${x + 376} 52, ${x + 421} 90 
                        C ${x + 430} 96, ${x + 430} 103, ${x + 418} 107 
                        L ${x + 396} 112 
                        L ${x} 112 
                        Z`}
                    fill="url(#trainBodyGrad)"
                    stroke="#2f3647"
                    strokeWidth="1.5"
                  />

                  {/* Warm glow on nose panel */}
                  <path
                    d={`M ${x + 316} 62 
                        C ${x + 371} 76, ${x + 411} 88, ${x + 424} 94 
                        C ${x + 430} 98, ${x + 426} 104, ${x + 416} 107 
                        L ${x + 391} 112 
                        L ${x + 316} 112 
                        Z`}
                    fill="url(#nosePanelGlow)"
                  />

                  {/* Roof aerodynamic highlight */}
                  <path
                    d={`M ${x} 29 
                        L ${x + 216} 29 
                        C ${x + 281} 29, ${x + 366} 50, ${x + 411} 88`}
                    stroke="url(#roofGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Continuous orange stripe tapering into nose */}
                  <path
                    d={`M ${x} 84 
                        L ${x + 246} 84 
                        C ${x + 316} 84, ${x + 376} 92, ${x + 421} 101 
                        L ${x + 416} 106 
                        C ${x + 371} 97, ${x + 311} 89, ${x + 241} 89 
                        L ${x} 89 
                        Z`}
                    fill="var(--train-stripe)"
                  />

                  {/* Passenger windows with warm interior glow */}
                  {[31, 91, 151].map((offset) => (
                    <g key={offset}>
                      <rect
                        x={x + offset}
                        y={46}
                        width={40}
                        height={20}
                        rx={4}
                        fill="url(#windowSheen)"
                        stroke="#2b3142"
                        strokeWidth="1.2"
                      />
                      <rect
                        x={x + offset + 2}
                        y={48}
                        width={36}
                        height={16}
                        rx={2}
                        fill="url(#windowWarmGlow)"
                      />
                      <line
                        x1={x + offset + 4}
                        y1={50}
                        x2={x + offset + 36}
                        y2={50}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                      />
                    </g>
                  ))}

                  {/* Angled aerodynamic cockpit visor windshield with warm glow */}
                  <path
                    d={`M ${x + 206} 46 
                        L ${x + 286} 57 
                        C ${x + 311} 61, ${x + 328} 70, ${x + 338} 78 
                        L ${x + 311} 80 
                        C ${x + 301} 74, ${x + 281} 67, ${x + 206} 66 
                        Z`}
                    fill="url(#windowSheen)"
                    stroke="#363e54"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`M ${x + 211} 48 
                        L ${x + 281} 58 
                        C ${x + 304} 62, ${x + 318} 70, ${x + 328} 76 
                        L ${x + 308} 78 
                        C ${x + 298} 73, ${x + 278} 66, ${x + 211} 65 
                        Z`}
                    fill="url(#windowWarmGlow)"
                  />

                  {/* 
                    SINGLE PAIR OF HEADLAMPS ON THE NOSE
                    1. Bright main lamp
                    2. Smaller lamp below it
                    Tagged with data-headlamp
                  */}
                  <g data-headlamp id="headlamps">
                    {/* Headlamp corona glow */}
                    <circle cx={x + 424} cy={98} r={12} fill="url(#lampCoronaGrad)" />

                    {/* Main Headlamp (Upper) */}
                    <ellipse
                      cx={x + 424}
                      cy={95}
                      rx={3.5}
                      ry={2.6}
                      fill="#fff3d6"
                      stroke="#ffe8b0"
                      strokeWidth={0.6}
                    />
                    <ellipse cx={x + 424} cy={95} rx={1.8} ry={1.3} fill="#ffffff" />

                    {/* Smaller Headlamp (Lower) */}
                    <ellipse
                      cx={x + 421}
                      cy={102}
                      rx={2.5}
                      ry={1.9}
                      fill="#fff3d6"
                      stroke="#ffe8b0"
                      strokeWidth={0.5}
                    />
                    <ellipse cx={x + 421} cy={102} rx={1.2} ry={0.9} fill="#ffffff" />
                  </g>

                  {/* Bottom skirt */}
                  <line x1={x} y1={112} x2={x + 396} y2={112} stroke="#10121a" strokeWidth="2" />
                </g>
              );
            }

            // Indices 1..6: Reusable passenger cars
            return (
              <use
                key={index}
                href="#passenger-car"
                x={x}
                y={0}
                width={CAR_W}
                height={TRAIN_H}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

import React from "react";

export interface ConnectorsProps {
  className?: string;
  svgRef?: React.Ref<SVGSVGElement>;
}

/**
 * Connectors Overlay Component
 * - Single <svg> overlay inside Hero: position absolute, inset 0, pointer-events none
 * - Positioned above track (z-10) and below cards (z-30) at z-20
 * - Technical HUD callout reference in off-white (from \photo\Screenshot 2026-09-29 222632):
 *   1. Outer concentric ring (stroke only, off-white)
 *   2. Inner center dot (solid off-white)
 *   3. Continuous leader line from card edge toward train with 80% visible / 20% fade
 *   4. Does NOT intersect with train; train path is kept 100% clear
 * - Hidden below 640px (mobile)
 */
export default function Connectors({ className = "", svgRef }: ConnectorsProps) {
  return (
    <svg
      ref={svgRef}
      id="connectors-overlay"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-20 overflow-visible hidden sm:block ${className}`}
      aria-hidden="true"
    >
      <defs>
        {[0, 1, 2, 3].map((idx) => (
          <linearGradient
            key={`grad-${idx}`}
            id={`connector-grad-${idx}`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
          >
            {/* 80% of the line is visible, the rest 20% fades until not visible */}
            <stop offset="0%" stopColor="#f0f3f8" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#f0f3f8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f0f3f8" stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {[0, 1, 2, 3].map((idx) => (
        <g key={idx} data-connector-group={idx}>

          {/* 3. Leader line from card toward train: 80% visible, 20% fades until not visible */}
          <path
            data-connector-path
            d="M 0 0"
            fill="none"
            stroke={`url(#connector-grad-${idx})`}
            strokeWidth={1.2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </g>
      ))}
    </svg>
  );
}

"use client";

import React, { useRef } from "react";
import Train from "./Train";
import Connectors from "./Connectors";
import Background from "./Background";
import { UpperStats, LowerStats, StatsFootnote } from "./Stats";
import { useIntroAnimation } from "@/hooks/useIntroAnimation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const trackLineRef = useRef<HTMLDivElement>(null);
  const trainUnitRef = useRef<HTMLDivElement>(null);

  // Initial intro animation on load
  useIntroAnimation({
    scope: containerRef,
    headlineRef,
    trackLineRef,
    trainUnitRef,
  });

  // Scroll-driven multi-car train animation via ScrollTrigger
  useScrollAnimation({
    heroRef: containerRef,
    trainUnitRef,
    trackLineRef,
  });

  return (
    <section
      ref={containerRef}
      className="hero-grid relative w-full h-[100svh] max-h-[100svh] overflow-x-hidden overflow-y-hidden bg-[var(--bg-color)] select-none"
      style={{
        display: "grid",
        gridTemplateRows:
          "auto minmax(0, 1fr) clamp(110px, 19svh, 190px) minmax(0, 1fr) auto",
      }}
    >
      {/* Scenic Vector Background (z-0, below track z-10, connectors z-20, cards z-30) */}
      <Background />

      {/* Animated Connector Lines overlay (z-20, above track z-10, below cards z-30) */}
      <Connectors />

      {/* 1. ROW 1: Headline (grid row 1, full-width, background #000, border-bottom) */}
      <header
        className="w-full relative z-[5] bg-[#000] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-center select-none pointer-events-none px-4"
        style={{
          paddingBlock: "clamp(16px, 3svh, 32px)",
        }}
      >
        <h1
          ref={headlineRef}
          className="font-[family-name:var(--font-syncopate)] font-bold text-center uppercase text-[var(--text-headline)] text-[clamp(0.68rem,2.2vw,2.2rem)] tracking-[0.14em] sm:tracking-[0.28em] md:tracking-[0.4em] lg:tracking-[0.55em] leading-tight max-w-full"
        >
          W E L C O M E &nbsp; I T Z F I Z Z
        </h1>
      </header>

      {/* 2. ROW 2: Upper stats 1 and 2 (minmax(0, 1fr)) with padding-block: 16px */}
      <UpperStats />

      {/* 3. ROW 3: Track row (clamp(110px, 19svh, 190px)) - train and beam ONLY, centered */}
      <div className="relative w-full h-full overflow-visible pointer-events-none select-none z-10 flex items-center">
        {/* Track Line: Proper high-speed steel railway track with steel running rail, baseplate, and concrete sleepers */}
        <div
          ref={trackLineRef}
          data-track-line
          className="absolute top-1/2 left-0 w-full z-10 pointer-events-none flex flex-col items-center"
        >
          {/* 1. Polished Running Rail (crisp metallic steel-platinum head with 20% opacity) */}
          <div
            className="w-full h-[2px] opacity-20 bg-gradient-to-r from-[#1c2434] via-[#e2edf8] to-[#1c2434] shadow-[0_0_10px_rgba(200,225,255,0.35),0_1px_2px_rgba(0,0,0,0.8)]"
            style={{ opacity: 0.2 }}
          />

          {/* 2. Steel Rail Web & Base Flange (dark metallic profile) */}
          <div className="w-full h-[1.5px] bg-[#121824]" />

          {/* 3. Slab Track Bed & Concrete Sleepers (repeating high-speed ties) */}
          <div
            className="w-full h-[5px] opacity-70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #0e131d 0px, #182232 9px, #25334a 10px, #131b28 11px, transparent 11px, transparent 22px)",
            }}
          />

          {/* 4. Substructure Ballast Shadow */}
          <div className="w-full h-[2px] bg-gradient-to-b from-[#080b12]/80 to-transparent" />
        </div>

        {/* Multi-car Train: Resting directly on top of the polished steel rail */}
        <div
          ref={trainUnitRef}
          id="train-track-unit"
          className="absolute left-0 bottom-1/2 pointer-events-none select-none z-10 will-change-transform flex items-end"
        >
          <Train />
        </div>

        {/* Clean edge: Static overlay div at left of track row, z-index above train */}
        <div
          className="absolute left-0 top-0 h-full pointer-events-none z-20"
          style={{
            width: "8vw",
            background: "linear-gradient(to right, var(--bg, var(--bg-color)), transparent)",
          }}
        />
      </div>

      {/* 4. ROW 4: Lower stats 3 and 4 (minmax(0, 1fr)) with padding-block: 16px */}
      <LowerStats />

      {/* 5. ROW 5: Footnote (auto) - bottom right */}
      <StatsFootnote />
    </section>
  );
}

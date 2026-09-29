"use client";

import React, { useRef } from "react";
import { stats, statsFootnote, Stat } from "@/lib/stats";
import { useTypewriter } from "@/hooks/useTypewriter";

export interface StatCardProps {
  stat: Stat;
  className?: string;
  index?: number;
}

/**
 * Three-layer Card Architecture:
 * 1. OUTER wrapper: Positioned by grid. GSAP intro stagger animates this via [data-stat-card].
 * 2. INNER article (tabIndex 0): CSS hover lift, scale, border, and focus-visible live here.
 * 3. Glow: ::before pseudo-element on the INNER article with isolation: isolate.
 */
export function StatCard({ stat, className = "", index }: StatCardProps) {
  const typedRef = useRef<HTMLSpanElement>(null);

  const { isExpanded, handlers } = useTypewriter({
    text: stat.detail,
    typedRef,
  });

  // Extract number and unit to style the "%" at 0.55em within the same gradient
  const hasPercent = stat.value.includes("%");
  const numberPart = stat.value.replace("%", "");

  return (
    <div
      data-stat-card
      data-stat-index={index}
      className={`pointer-events-none select-none ${className}`}
    >
      {/* MIDDLE: Scroll reveal layer (opacity 0 -> 1) */}
      <div
        data-stat-middle
        className="w-full h-full"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <article
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
          aria-label={`${stat.value} ${stat.label}: ${stat.detail}`}
          className="stat-card-inner group flex flex-col justify-start p-3.5 sm:p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#10131c] cursor-pointer select-none"
          {...handlers}
        >
        {/* 1. Big Value: Always visible in idle */}
        <span
          data-stat-value
          className="stat-card-value font-black tracking-tight leading-none inline-block select-none text-2xl sm:text-3xl lg:text-4xl"
          style={{
            backgroundImage: "linear-gradient(180deg, #ffb066, #ff5a1f)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          <span>{numberPart}</span>
          {hasPercent && (
            <span
              style={{ fontSize: "0.55em" }}
              className="font-bold inline-block"
            >
              %
            </span>
          )}
        </span>

        {/* 2. Label: Always visible in idle */}
        <span
          data-stat-label
          className="font-[family-name:var(--font-jetbrains-mono)] uppercase text-[11px] sm:text-[12px] tracking-[0.12em] text-[#9db0d6] font-medium mt-1 select-none"
        >
          {stat.label}
        </span>

        {/* 3. Expandable Body: 0fr -> 1fr on hover / focus-visible / tap (aria-expanded) */}
        <div className="stat-card-expand">
          <div className="stat-card-expand-inner">
            <div className="pt-2 sm:pt-2.5 flex flex-col gap-1.5">
              {/* Typed detail: JetBrains Mono, 13px, #ffe7c2 */}
              <div className="relative w-full pointer-events-none">
                {/* Hidden sizer copy of full detail text so height never shifts */}
                <span
                  aria-hidden="true"
                  className="invisible block font-[family-name:var(--font-jetbrains-mono)] text-[12px] sm:text-[13px] font-normal leading-relaxed select-none"
                >
                  {stat.detail}
                </span>

                {/* Absolutely positioned typed span on top */}
                <span
                  ref={typedRef}
                  aria-hidden="true"
                  className="absolute inset-0 block font-[family-name:var(--font-jetbrains-mono)] text-[12px] sm:text-[13px] font-normal leading-relaxed text-[#ffe7c2] select-none"
                />

                {/* Screen-reader accessible copy */}
                <span className="sr-only">{stat.detail}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
      </div>
    </div>
  );
}

/**
 * Upper Stats Row: Row 2 of Hero Grid
 * - Contains Stat 1 and Stat 2
 * - padding-block: 16px so hover lift never touches the train
 * - Growth goes AWAY from train: align-self end (grows upward)
 * - Stat 1: justify-self start, margin-left 8vw, margin-bottom 12px
 * - Stat 2: justify-self end, margin-right 8vw, margin-bottom 56px
 */
export function UpperStats({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-full relative z-30 pointer-events-none grid grid-cols-2 ${className}`}
      style={{ paddingBlock: "16px" }}
    >
      {/* Stat 1: 47% Faster delivery times (align-self end, mb-12px) */}
      <StatCard
        stat={stats[0]}
        index={0}
        className="w-[46vw] sm:w-[clamp(240px,26vw,340px)] justify-self-start self-end ml-[2vw] sm:ml-[8vw] mb-[12px]"
      />

      {/* Stat 2: 31% Fewer missed deliveries (align-self end, mb-56px) */}
      <StatCard
        stat={stats[1]}
        index={1}
        className="w-[46vw] sm:w-[clamp(240px,26vw,340px)] justify-self-end self-end mr-[2vw] sm:mr-[8vw] mb-[56px]"
      />
    </div>
  );
}

/**
 * Lower Stats Row: Row 4 of Hero Grid
 * - Contains Stat 3 and Stat 4
 * - padding-block: 16px so hover lift never touches the train
 * - Growth goes AWAY from train: align-self start (grows downward)
 * - Stat 3: justify-self start, margin-left 20vw, margin-top 12px
 * - Stat 4: justify-self end, margin-right 6vw, margin-top 56px
 */
export function LowerStats({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-full relative z-30 pointer-events-none grid grid-cols-2 ${className}`}
      style={{ paddingBlock: "16px" }}
    >
      {/* Stat 3: 62% More on-time arrivals (align-self start, mt-12px) */}
      <StatCard
        stat={stats[2]}
        index={2}
        className="w-[46vw] sm:w-[clamp(240px,26vw,340px)] justify-self-start self-start ml-[2vw] sm:ml-[20vw] mt-[12px]"
      />

      {/* Stat 4: 26% Lower shipping costs (align-self start, mt-56px) */}
      <StatCard
        stat={stats[3]}
        index={3}
        className="w-[46vw] sm:w-[clamp(240px,26vw,340px)] justify-self-end self-start mr-[2vw] sm:mr-[6vw] mt-[56px]"
      />
    </div>
  );
}

/**
 * Footnote Row: Row 5 of Hero Grid
 * - Moved to bottom-right
 */
export function StatsFootnote({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`w-full flex items-center justify-end px-4 sm:px-8 py-2 select-none z-30 pointer-events-auto ${className}`}
    >
      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] sm:text-xs text-[var(--text-dim)] font-mono tracking-wider">
        {statsFootnote}
      </p>
    </footer>
  );
}

/**
 * Default export
 */
export default function Stats({
  containerRef,
  className = "",
}: {
  containerRef?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div ref={containerRef} className={`contents ${className}`}>
      <UpperStats />
      <LowerStats />
      <StatsFootnote />
    </div>
  );
}

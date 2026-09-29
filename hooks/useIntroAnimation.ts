"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface UseIntroAnimationOptions {
  scope?: React.RefObject<HTMLElement | null>;
  headlineRef?: React.RefObject<HTMLElement | null>;
  trackLineRef?: React.RefObject<HTMLElement | null>;
  trainUnitRef?: React.RefObject<HTMLElement | null>;
  statsContainerRef?: React.RefObject<HTMLElement | null>;
}

export function useIntroAnimation(options?: UseIntroAnimationOptions) {
  const fallbackScopeRef = useRef<HTMLElement | null>(null);
  const fallbackHeadlineRef = useRef<HTMLElement | null>(null);
  const fallbackTrackLineRef = useRef<HTMLElement | null>(null);
  const fallbackTrainUnitRef = useRef<HTMLElement | null>(null);
  const fallbackStatsContainerRef = useRef<HTMLElement | null>(null);

  const scope = options?.scope ?? fallbackScopeRef;
  const headline = options?.headlineRef ?? fallbackHeadlineRef;
  const trackLine = options?.trackLineRef ?? fallbackTrackLineRef;
  const trainUnit = options?.trainUnitRef ?? fallbackTrainUnitRef;
  const statsContainer = options?.statsContainerRef ?? fallbackStatsContainerRef;

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const headlineEl = headline.current;
      const trackEl = trackLine.current;
      const trainEl =
        trainUnit.current ||
        (scope.current?.querySelector("#train-track-unit") as HTMLElement | null);

      // Find stat elements strictly through scoped refs (order 1, 2, 3, 4)
      let statElements: HTMLElement[] = [];
      if (statsContainer.current) {
        statElements = Array.from(
          statsContainer.current.querySelectorAll<HTMLElement>("[data-stat-card]")
        );
        if (statElements.length === 0) {
          statElements = Array.from(statsContainer.current.children) as HTMLElement[];
        }
      } else if (scope.current) {
        statElements = Array.from(
          scope.current.querySelectorAll<HTMLElement>("[data-stat-card]")
        );
      }

      // If user prefers reduced motion, skip animations and apply final states immediately
      if (prefersReducedMotion) {
        const instantTl = gsap.timeline();
        if (headlineEl) instantTl.set(headlineEl, { opacity: 1, y: 0 });
        if (trackEl) instantTl.set(trackEl, { scaleX: 1, transformOrigin: "center center" });
        if (trainEl) instantTl.set(trainEl, { opacity: 1 });
        if (statElements.length > 0) instantTl.set(statElements, { opacity: 1, y: 0 });
        timelineRef.current = instantTl;
        return;
      }

      // One single master intro timeline on load
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // 1. Headline: fade + y 40 -> 0, power3.out, 1s
      if (headlineEl) {
        tl.fromTo(
          headlineEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      }

      // 2. Track line: scaleX 0 -> 1 from the center
      if (trackEl) {
        tl.fromTo(
          trackEl,
          { scaleX: 0, transformOrigin: "center center" },
          {
            scaleX: 1,
            transformOrigin: "center center",
            duration: 0.8,
            ease: "power2.out",
          },
          0.2
        );
      }

      // 3. Train: a short fade-in (under 0.8s: 0.6s). Must end fully visible (opacity 1)
      if (trainEl) {
        tl.fromTo(
          trainEl,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          0.4
        );
      }

      // 4. Stats: resting layout coordinates (y: 0, opacity: 1 on outer wrapper)
      // Visual visibility is kept clean (middle layer opacity: 0) and revealed as the train advances on scroll
      if (statElements.length > 0) {
        gsap.set(statElements, { opacity: 1, y: 0 });
      }
    },
    { scope }
  );

  return {
    scopeRef: scope,
    headlineRef: headline,
    trackLineRef: trackLine,
    trainUnitRef: trainUnit,
    statsContainerRef: statsContainer,
    timeline: timelineRef,
  };
}

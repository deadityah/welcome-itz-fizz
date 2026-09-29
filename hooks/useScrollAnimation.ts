"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface UseScrollAnimationOptions {
  heroRef?: React.RefObject<HTMLElement | null>;
  trainUnitRef?: React.RefObject<HTMLElement | null>;
  trackLineRef?: React.RefObject<HTMLElement | null>;
  statsContainerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Calculates the offset (left, top) of an element relative to an ancestor container (heroEl)
 * by walking offsetParents. This strictly ignores CSS transforms so layout coordinates remain pure.
 */
function getOffsetRelativeToHero(element: HTMLElement, heroEl: HTMLElement) {
  let left = 0;
  let top = 0;
  let el: HTMLElement | null = element;
  while (el && el !== heroEl) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }
  return { left, top };
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function useScrollAnimation(options?: UseScrollAnimationOptions) {
  const fallbackHeroRef = useRef<HTMLElement | null>(null);
  const fallbackTrainUnitRef = useRef<HTMLElement | null>(null);
  const fallbackTrackLineRef = useRef<HTMLElement | null>(null);

  const hero = options?.heroRef ?? fallbackHeroRef;
  const trainUnit = options?.trainUnitRef ?? fallbackTrainUnitRef;
  const trackLine = options?.trackLineRef ?? fallbackTrackLineRef;

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const heroEl = hero.current;
      const trainUnitEl = trainUnit.current;
      if (!heroEl || !trainUnitEl) return;

      const validHeroEl: HTMLElement = heroEl;
      const validTrainUnitEl: HTMLElement = trainUnitEl;

      const trackLineEl =
        trackLine.current || validHeroEl.querySelector<HTMLElement>("[data-track-line]");

      const cards = Array.from(
        validHeroEl.querySelectorAll<HTMLElement>("[data-stat-card]")
      ).sort((a, b) => {
        const idxA = parseInt(a.getAttribute("data-stat-index") ?? "0", 10);
        const idxB = parseInt(b.getAttribute("data-stat-index") ?? "0", 10);
        return idxA - idxB;
      });

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // --- PREFERS REDUCED MOTION ---
      if (prefersReducedMotion) {
        // 1. Train placement
        gsap.set(validTrainUnitEl, {
          x: 0.2 * validHeroEl.offsetWidth - validTrainUnitEl.offsetWidth,
        });

        // 2. Measure geometry and display all connectors drawn and cards at opacity 1
        const trackOffset = trackLineEl
          ? getOffsetRelativeToHero(trackLineEl, validHeroEl)
          : { left: 0, top: validHeroEl.offsetHeight / 2 };
        const trackY = Math.round(trackOffset.top);
        const H = 28;

        cards.forEach((cardEl, i) => {
          const cardOffset = getOffsetRelativeToHero(cardEl, validHeroEl);
          const midY = Math.round(cardOffset.top + cardEl.offsetHeight / 2);
          const dy = Math.abs(trackY - midY);
          const isRightEdgeAttach = i === 0 || i === 2; // Cards 1 and 3 attach on right edge

          let edgeX = 0;
          let Qx = 0;

          if (isRightEdgeAttach) {
            edgeX = Math.round(cardOffset.left + cardEl.offsetWidth);
            Qx = Math.round(edgeX + H);
          } else {
            edgeX = Math.round(cardOffset.left);
            Qx = Math.round(edgeX - H);
          }

          // Train clearance: lines stop well outside the train corridor (never intersect)
          let endX = 0;
          let endY = 0;
          if (midY < trackY) {
            // Upper cards: stop at least 65px above trackY
            endY = Math.min(midY + dy, trackY - 65);
            const slantDistance = endY - midY;
            endX = isRightEdgeAttach ? Qx + slantDistance : Qx - slantDistance;
          } else {
            // Lower cards: stop at least 55px below trackY
            endY = Math.max(midY - dy, trackY + 55);
            const slantDistance = midY - endY;
            endX = isRightEdgeAttach ? Qx + slantDistance : Qx - slantDistance;
          }

          const groupEl = validHeroEl.querySelector(`[data-connector-group="${i}"]`);
          const pathEl = groupEl?.querySelector<SVGElement>("[data-connector-path]");
          const gradEl = validHeroEl.querySelector<SVGLinearGradientElement>(`#connector-grad-${i}`);
          const middleEl = cardEl.querySelector<HTMLElement>("[data-stat-middle]");

          if (gradEl) {
            gradEl.setAttribute("x1", String(edgeX));
            gradEl.setAttribute("y1", String(midY));
            gradEl.setAttribute("x2", String(endX));
            gradEl.setAttribute("y2", String(endY));
          }

          if (pathEl) {
            pathEl.setAttribute("d", `M ${edgeX} ${midY} L ${Qx} ${midY} L ${endX} ${endY}`);
            gsap.set(pathEl, { strokeDashoffset: 0 });
          }

          if (middleEl) {
            gsap.set(middleEl, { opacity: 1, pointerEvents: "auto" });
          }
          gsap.set(cardEl, { pointerEvents: "auto" });
        });

        // No scroll animation
        return;
      }

      // --- INITIAL STATE AT SCROLL 0% ---
      // Train nose at 20vw using gsap.set (cars behind run off left edge)
      const initialStartX = 0.2 * validHeroEl.offsetWidth - validTrainUnitEl.offsetWidth;
      gsap.set(validTrainUnitEl, { x: initialStartX });

      // Initial state: path strokeDashoffset 1,
      // cards kept clean in the background (opacity 0, pointer-events none)
      cards.forEach((cardEl, i) => {
        const groupEl = validHeroEl.querySelector(`[data-connector-group="${i}"]`);
        const pathEl = groupEl?.querySelector<SVGElement>("[data-connector-path]");
        const middleEl = cardEl.querySelector<HTMLElement>("[data-stat-middle]");

        if (pathEl) gsap.set(pathEl, { strokeDashoffset: 1 });
        if (middleEl) gsap.set(middleEl, { opacity: 0, pointerEvents: "none" });
        gsap.set(cardEl, { pointerEvents: "none" });
      });

      // --- SCROLL TIMELINE CREATION ---
      // Punchy 150vh scroll distance: all stats revealed by ~75%, then train moves forward before ending
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: validHeroEl,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.5}`, // Compact 150vh scroll distance
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      timelineRef.current = tl;

      /**
       * Reconstructs tweens on initial setup and upon ScrollTrigger refresh.
       * Layout measurements only occur inside this refresh lifecycle, never during scroll callbacks.
       */
      function buildTimeline(container: HTMLElement, trainEl: HTMLElement) {
        tl.clear();

        const isMobile = window.innerWidth < 640;

        // 1. Train travel endpoints:
        // Starts with nose at 20vw; ends with nose a bit forward past the last card (+100px past right edge)
        const noseStartX = 0.2 * container.offsetWidth;
        const noseEndX = container.offsetWidth + 100;
        const startX = noseStartX - trainEl.offsetWidth;
        const finalTrainX = noseEndX - trainEl.offsetWidth;
        const D = noseEndX - noseStartX; // Active forward travel distance

        tl.fromTo(
          trainEl,
          { x: startX },
          { x: finalTrainX, ease: "none", duration: 1 },
          0
        );

        if (isMobile) {
          // Mobile (<640px): No connectors. Reveal stats cleanly at fixed progress, then train moves forward
          const mobileProgress = [0.15, 0.35, 0.55, 0.72];
          cards.forEach((cardEl, idx) => {
            const middleEl = cardEl.querySelector<HTMLElement>("[data-stat-middle]");
            if (middleEl) {
              const p = mobileProgress[idx] ?? 0.15 + idx * 0.18;
              gsap.set(middleEl, { opacity: 0, pointerEvents: "none" });
              gsap.set(cardEl, { pointerEvents: "none" });
              tl.fromTo(
                middleEl,
                { opacity: 0 },
                { opacity: 1, duration: 0.06, ease: "power1.out" },
                p
              );
              // Hover ONLY after 100% visible:
              tl.set([cardEl, middleEl], { pointerEvents: "auto" }, p + 0.06);
            }
          });
          return;
        }

        // Desktop (>= 640px):
        // Geometry calculation (once per refresh, never during scroll)
        const trackOffset = trackLineEl
          ? getOffsetRelativeToHero(trackLineEl, container)
          : { left: 0, top: container.offsetHeight / 2 };
        const trackY = Math.round(trackOffset.top);

        const beamEl = container.querySelector("[data-beam]");
        const beamLen = beamEl ? beamEl.getBoundingClientRect().width : 0;
        const H = 28;

        interface StatItemConfig {
          index: number;
          px: number;
          pi: number;
          cardEl: HTMLElement;
          pathEl: SVGElement | null;
          middleEl: HTMLElement | null;
        }

        const configs: StatItemConfig[] = [];

        cards.forEach((cardEl, i) => {
          const cardOffset = getOffsetRelativeToHero(cardEl, container);
          const midY = Math.round(cardOffset.top + cardEl.offsetHeight / 2);
          const dy = Math.abs(trackY - midY);
          const isRightEdgeAttach = i === 0 || i === 2; // Left-half cards attach at RIGHT edge

          let edgeX = 0;
          let Qx = 0;

          if (isRightEdgeAttach) {
            edgeX = Math.round(cardOffset.left + cardEl.offsetWidth);
            Qx = Math.round(edgeX + H);
          } else {
            edgeX = Math.round(cardOffset.left);
            Qx = Math.round(edgeX - H);
          }

          // Train clearance: line extends toward the train but stops outside the train corridor
          let endX = 0;
          let endY = 0;
          if (midY < trackY) {
            // Upper cards: stop at least 65px above trackY so train path stays 100% clear
            endY = Math.min(midY + dy, trackY - 65);
            const slantDistance = endY - midY;
            endX = isRightEdgeAttach ? Qx + slantDistance : Qx - slantDistance;
          } else {
            // Lower cards: stop at least 55px below trackY
            endY = Math.max(midY - dy, trackY + 55);
            const slantDistance = midY - endY;
            endX = isRightEdgeAttach ? Qx + slantDistance : Qx - slantDistance;
          }

          // Calculate exact scroll progress when train nose reaches the section's track position (endX)
          const rawP = (endX - noseStartX) / D;
          const pReach = clamp(rawP, 0.08, 0.85);

          const groupEl = container.querySelector(`[data-connector-group="${i}"]`);
          const pathEl = groupEl?.querySelector<SVGElement>("[data-connector-path]") ?? null;
          const gradEl = container.querySelector<SVGLinearGradientElement>(`#connector-grad-${i}`);
          const middleEl = cardEl.querySelector<HTMLElement>("[data-stat-middle]");

          // Configure gradient vector: 80% visible, last 20% fading to 0 opacity approaching the train
          if (gradEl) {
            gradEl.setAttribute("x1", String(edgeX));
            gradEl.setAttribute("y1", String(midY));
            gradEl.setAttribute("x2", String(endX));
            gradEl.setAttribute("y2", String(endY));
          }

          // Set continuous path from card edge to clearance point outside the train
          if (pathEl) {
            pathEl.setAttribute("d", `M ${edgeX} ${midY} L ${Qx} ${midY} L ${endX} ${endY}`);
            gsap.set(pathEl, { strokeDashoffset: 1 });
          }

          if (middleEl) {
            gsap.set(middleEl, { opacity: 0, pointerEvents: "none" });
          }
          gsap.set(cardEl, { pointerEvents: "none" });

          configs.push({
            index: i,
            px: endX,
            pi: pReach,
            cardEl,
            pathEl,
            middleEl,
          });
        });

        // Order of reveal: follows the train (by px ascending), not stat number
        configs.sort((a, b) => a.px - b.px);

        // Sequence per stat: appears 100% ONLY when the train reaches that section's point (at pi)
        configs.forEach((item) => {
          const animDuration = 0.05;
          const animStart = Math.max(0, item.pi - animDuration);

          // 1. Leader line draws from card toward the track, finishing at item.pi
          if (item.pathEl) {
            tl.fromTo(
              item.pathEl,
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: animDuration,
                ease: "power1.inOut",
              },
              animStart
            );
          }

          // 2. Stat card appears cleanly: reaches 100% opacity EXACTLY when train arrives (at item.pi)
          if (item.middleEl) {
            tl.fromTo(
              item.middleEl,
              { opacity: 0 },
              {
                opacity: 1,
                duration: animDuration,
                ease: "power1.out",
              },
              animStart
            );
          }

          // 3. Hover allowed ONLY after 100% visible (at item.pi when train reaches the point)
          tl.set([item.cardEl, item.middleEl], { pointerEvents: "auto" }, item.pi);
        });
      }

      // Initial build of timeline
      buildTimeline(validHeroEl, validTrainUnitEl);

      // Recalculate geometry and reconstruct timeline upon ScrollTrigger refresh
      const onRefreshInit = () => {
        buildTimeline(validHeroEl, validTrainUnitEl);
      };

      ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      };
    },
    { scope: hero }
  );

  // Call ScrollTrigger.refresh() after fonts load
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, []);

  return {
    heroRef: hero,
    trainUnitRef: trainUnit,
    timeline: timelineRef,
  };
}

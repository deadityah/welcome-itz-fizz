"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";

export interface UseTypewriterOptions {
  text: string;
  typedRef: React.RefObject<HTMLSpanElement | null>;
  descRef?: React.RefObject<HTMLElement | null>;
}

export function useTypewriter({ text, typedRef }: UseTypewriterOptions) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isTypingRef = useRef(false);

  const start = useCallback(() => {
    if (isTypingRef.current) return;
    isTypingRef.current = true;
    setIsExpanded(true);

    const typedEl = typedRef.current;
    if (!typedEl) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // prefers-reduced-motion: show the full detail at once. No typing.
    if (prefersReducedMotion) {
      typedEl.textContent = text;
      typedEl.classList.remove("typing-caret");
      return;
    }

    // Kill any existing tween before starting a new one
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    // Add blinking caret with CSS ::after until typing ends
    typedEl.classList.add("typing-caret");

    // GSAP tween on a proxy { i: 0 } from 0 to text.length
    // duration: text.length * 0.02 seconds, ease: "none", slight delay so panel opens and description fades in
    const proxy = { i: 0 };
    const duration = text.length * 0.02;

    tweenRef.current = gsap.to(proxy, {
      i: text.length,
      duration,
      delay: 0.12,
      ease: "none",
      onUpdate: () => {
        // Direct DOM update - strictly avoids React state during typing updates
        if (typedRef.current) {
          typedRef.current.textContent = text.slice(0, Math.round(proxy.i));
        }
      },
      onComplete: () => {
        if (typedRef.current) {
          typedRef.current.textContent = text;
          typedRef.current.classList.remove("typing-caret");
        }
      },
    });
  }, [text, typedRef]);

  const stop = useCallback(() => {
    isTypingRef.current = false;
    setIsExpanded(false);

    // Kill active tween
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    const typedEl = typedRef.current;

    // Clear typed text and remove caret
    if (typedEl) {
      typedEl.textContent = "";
      typedEl.classList.remove("typing-caret");
    }
  }, [typedRef]);

  // Clean up tween on unmount
  useEffect(() => {
    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, []);

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) => {
      // Ignore simulated pointer events on touch devices
      if (e.pointerType !== "touch") {
        start();
      }
    },
    [start]
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== "touch") {
        stop();
      }
    },
    [stop]
  );

  const handleFocus = useCallback(() => {
    start();
  }, [start]);

  const handleBlur = useCallback(() => {
    stop();
  }, [stop]);

  const handleClick = useCallback(() => {
    // Touch devices: a tap toggles it
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);

    if (isTouch) {
      if (isTypingRef.current) {
        stop();
      } else {
        start();
      }
    }
  }, [start, stop]);

  return {
    isExpanded,
    start,
    stop,
    handlers: {
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClick: handleClick,
    },
  };
}

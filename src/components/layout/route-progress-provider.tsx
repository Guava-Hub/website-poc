"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { RouteProgress } from "@/components/ui/route-progress";

/**
 * RouteProgressProvider
 * Monitors route changes and displays a creative progress bar
 * Integrates with Next.js App Router navigation
 */
export function RouteProgressProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const completeTimeout = useRef<NodeJS.Timeout | null>(null);
  const isNavigating = useRef(false);

  // Custom progress tracking
  const startProgress = useCallback(() => {
    // Clear any existing intervals
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (completeTimeout.current) {
      clearTimeout(completeTimeout.current);
    }

    setIsAnimating(true);
    setProgress(0);
    
    // Simulate smooth progress
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          return 90;
        }
        // Exponential slowdown for smooth feel
        const increment = (90 - prev) * 0.15;
        return prev + Math.max(increment, 0.5);
      });
    }, 80);
  }, []);

  const completeProgress = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    
    setProgress(100);
    completeTimeout.current = setTimeout(() => {
      setIsAnimating(false);
      setProgress(0);
      isNavigating.current = false;
    }, 400);
  }, []);

  // Track link clicks to start progress immediately
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor?.href && !anchor.target && !anchor.hasAttribute("download")) {
        try {
          const url = new URL(anchor.href);
          const currentUrl = new URL(window.location.href);
          
          // Only track internal navigation to different pages
          if (
            url.origin === currentUrl.origin && 
            (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search)
          ) {
            isNavigating.current = true;
            startProgress();
          }
        } catch (e) {
          // Invalid URL, ignore
        }
      }
    };

    const handleBeforeUnload = () => {
      if (isNavigating.current) {
        startProgress();
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [startProgress]);

  // Complete progress when pathname or search params change
  useEffect(() => {
    if (isNavigating.current) {
      completeProgress();
    }
  }, [pathname, searchParams, completeProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (completeTimeout.current) {
        clearTimeout(completeTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <RouteProgress isAnimating={isAnimating} progress={progress} />
      {children}
    </>
  );
}

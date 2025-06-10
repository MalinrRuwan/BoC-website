"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useIsMobile } from "./use-mobile";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
  // New performance options
  debounceMs?: number;
  enableOnVisible?: boolean;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "-10% 0px -10% 0px",
  triggerOnce = false,
  disabled = false,
  debounceMs = 0,
  enableOnVisible = false,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  // Debounced intersection handler for better performance
  const debouncedSetIntersecting = useCallback((value: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (debounceMs > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsIntersecting(value);
      }, debounceMs);
    } else {
      setIsIntersecting(value);
    }
  }, [debounceMs]);

  // Optimize settings for mobile devices
  const optimizedOptions = useMemo(() => {
    if (disabled) return null;

    // More aggressive mobile optimizations
    const mobileThreshold = isMobile ? 
      (Array.isArray(threshold) ? Math.max(...threshold, 0.25) : Math.max(threshold, 0.25)) : 
      threshold;

    return {
      threshold: mobileThreshold,
      rootMargin: isMobile ? "0px" : rootMargin,
      // Add root optimization for better performance
      root: null, // Use viewport as root
    };
  }, [threshold, rootMargin, isMobile, disabled]);
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !optimizedOptions || (hasTriggered && triggerOnce)) {
      return;
    }

    // Enhanced observer with better performance
    const observer = new IntersectionObserver(
      (entries) => {
        // Process only the first entry for performance
        const entry = entries[0];
        if (!entry) return;

        const isCurrentlyIntersecting = entry.isIntersecting;
        
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          debouncedSetIntersecting(isCurrentlyIntersecting);
          
          if (isCurrentlyIntersecting && triggerOnce) {
            setHasTriggered(true);
          }
        });
      },
      optimizedOptions
    );

    // Store observer reference for cleanup
    observerRef.current = observer;
    observer.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(element);
        // Don't disconnect here as it might be shared across multiple elements
      }
    };
  }, [optimizedOptions, triggerOnce, hasTriggered, debouncedSetIntersecting]);

  // Enhanced cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear any pending debounced calls
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Disconnect observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return {
    ref: elementRef,
    isIntersecting: disabled ? true : isIntersecting,
    hasTriggered,
  };
}

// Performance-optimized hook for light animations (scrolling effects)
export function useAnimationVisibility<T extends Element = HTMLDivElement>(
  options?: UseIntersectionObserverOptions
) {
  const isMobile = useIsMobile();
  
  // On mobile, use higher threshold and no margin for better performance
  const mobileOptimizedOptions = useMemo(() => ({
    threshold: isMobile ? 0.4 : 0.15, // Higher mobile threshold for later trigger
    rootMargin: isMobile ? "0px" : "-5% 0px -5% 0px", // Reduced margins
    debounceMs: isMobile ? 50 : 0, // Add debouncing on mobile
    ...options,
  }), [isMobile, options]);

  return useIntersectionObserver<T>(mobileOptimizedOptions);
}

// Specialized hook for heavy animations (floating effects, complex transforms)
export function useHeavyAnimationVisibility<T extends Element = HTMLDivElement>(
  options?: UseIntersectionObserverOptions
) {
  const isMobile = useIsMobile();
  
  // More aggressive optimization for heavy animations
  const heavyAnimationOptions = useMemo(() => ({
    threshold: isMobile ? 0.6 : 0.25, // Much higher threshold for mobile
    rootMargin: isMobile ? "-25% 0px -25% 0px" : "-10% 0px -10% 0px", // More aggressive margins
    debounceMs: isMobile ? 100 : 25, // Higher debouncing for heavy animations
    triggerOnce: false, // Allow re-triggering to stop animations when out of view
    ...options,
  }), [isMobile, options]);

  return useIntersectionObserver<T>(heavyAnimationOptions);
}

// Specialized hook for ultra-light animations (minimal performance impact)
export function useLightAnimationVisibility<T extends Element = HTMLDivElement>(
  options?: UseIntersectionObserverOptions
) {
  const isMobile = useIsMobile();
  
  const lightAnimationOptions = useMemo(() => ({
    threshold: isMobile ? 0.2 : 0.1,
    rootMargin: isMobile ? "10% 0px 10% 0px" : "0px", // Early trigger on mobile
    debounceMs: 0, // No debouncing for light animations
    ...options,
  }), [isMobile, options]);

  return useIntersectionObserver<T>(lightAnimationOptions);
}

// Hook for scroll-triggered animations that should only happen once
export function useScrollTrigger<T extends Element = HTMLDivElement>(
  options?: UseIntersectionObserverOptions
) {
  const isMobile = useIsMobile();
  
  const scrollTriggerOptions = useMemo(() => ({
    threshold: isMobile ? 0.3 : 0.1,
    rootMargin: isMobile ? "0px" : "-5% 0px -5% 0px",
    triggerOnce: true, // Fire only once for scroll animations
    debounceMs: isMobile ? 25 : 0,
    ...options,
  }), [isMobile, options]);

  return useIntersectionObserver<T>(scrollTriggerOptions);
}

// Specialized hook for infinite animations (like logo sliders)
export function useInfiniteAnimationVisibility<T extends Element = HTMLDivElement>(
  options?: UseIntersectionObserverOptions
) {
  const isMobile = useIsMobile();
  
  const infiniteAnimationOptions = useMemo(() => ({
    threshold: isMobile ? 0.5 : 0.2, // Start later on mobile
    rootMargin: isMobile ? "-10% 0px -10% 0px" : "0px", // Conservative margins
    debounceMs: isMobile ? 150 : 50, // Heavy debouncing for infinite animations
    triggerOnce: false, // Allow start/stop behavior
    ...options,
  }), [isMobile, options]);

  return useIntersectionObserver<T>(infiniteAnimationOptions);
}

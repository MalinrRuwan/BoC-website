"use client";

import { useEffect, useRef, useState, useMemo } from "react";

// Global observer manager to reduce the number of IntersectionObserver instances
class ObserverManager {
  private static instance: ObserverManager;
  private observers: Map<string, IntersectionObserver> = new Map();
  private callbacks: Map<Element, Set<(isIntersecting: boolean) => void>> = new Map();

  static getInstance(): ObserverManager {
    if (!ObserverManager.instance) {
      ObserverManager.instance = new ObserverManager();
    }
    return ObserverManager.instance;
  }

  private getObserverKey(options: IntersectionObserverInit): string {
    return JSON.stringify({
      threshold: options.threshold,
      rootMargin: options.rootMargin,
      root: options.root,
    });
  }

  observe(
    element: Element,
    callback: (isIntersecting: boolean) => void,
    options: IntersectionObserverInit
  ) {
    const key = this.getObserverKey(options);
    
    // Get or create observer
    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const callbacks = this.callbacks.get(entry.target);
          if (callbacks) {
            callbacks.forEach((cb) => {
              // Use requestAnimationFrame for better performance
              requestAnimationFrame(() => cb(entry.isIntersecting));
            });
          }
        });
      }, options);
      
      this.observers.set(key, observer);
    }

    const observer = this.observers.get(key)!;
    
    // Add callback
    if (!this.callbacks.has(element)) {
      this.callbacks.set(element, new Set());
    }
    this.callbacks.get(element)!.add(callback);
    
    // Start observing
    observer.observe(element);
  }

  unobserve(element: Element, callback: (isIntersecting: boolean) => void) {
    const callbacks = this.callbacks.get(element);
    if (callbacks) {
      callbacks.delete(callback);
      
      // If no more callbacks, stop observing
      if (callbacks.size === 0) {
        this.callbacks.delete(element);
        
        // Find the observer and unobserve the element
        for (const observer of this.observers.values()) {
          observer.unobserve(element);
        }
      }
    }
  }

  // Cleanup unused observers
  cleanup() {
    for (const [key, observer] of this.observers.entries()) {
      if (this.callbacks.size === 0) {
        observer.disconnect();
        this.observers.delete(key);
      }
    }
  }
}

// Hook that uses the global observer manager
export function useManagedIntersectionObserver<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = {},
  callback?: (isIntersecting: boolean) => void
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  const callbackRef = useRef(callback);
  
  // Update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const manager = useMemo(() => ObserverManager.getInstance(), []);
  
  const internalCallback = useMemo(
    () => (intersecting: boolean) => {
      setIsIntersecting(intersecting);
      callbackRef.current?.(intersecting);
    },
    []
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    manager.observe(element, internalCallback, options);

    return () => {
      manager.unobserve(element, internalCallback);
    };
  }, [manager, internalCallback, options]);

  return {
    ref: elementRef,
    isIntersecting,
  };
}

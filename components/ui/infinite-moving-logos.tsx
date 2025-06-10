"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

interface Logo {
  id: number;
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

export const InfiniteMovingLogos = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: Logo[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [start, setStart] = useState(false);
  // Memoized values for better performance - Significantly reduce complexity on mobile
  const mobileMultiplier = useMemo(() => isMobile ? 2.5 : 1, [isMobile]);
  const animationSpeed = useMemo(() => {
    const baseSpeed = {
      fast: isMobile ? 40 : 25,      // Slower on mobile
      normal: isMobile ? 60 : 45,    // Much slower on mobile
      slow: isMobile ? 90 : 70       // Very slow on mobile
    };
    return baseSpeed[speed] * mobileMultiplier;
  }, [speed, mobileMultiplier, isMobile]);
  // Optimized animation setup with reduced DOM manipulations
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current && !start) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Use document fragment for better performance
      const fragment = document.createDocumentFragment();
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        fragment.appendChild(duplicatedItem);
      });
      
      scrollerRef.current.appendChild(fragment);
      
      // Set CSS properties in batch
      const container = containerRef.current;
      container.style.setProperty("--animation-duration", `${animationSpeed}s`);
      container.style.setProperty(
        "--animation-direction", 
        direction === "left" ? "forwards" : "reverse"
      );
      
      // Additional mobile optimizations
      if (isMobile) {
        container.style.setProperty("--animation-timing-function", "linear");
        container.style.setProperty("--animation-fill-mode", "forwards");
      }
      
      setStart(true);
    }
  }, [start, animationSpeed, direction, isMobile]);

  useEffect(() => {
    // Use requestAnimationFrame for smoother initialization
    const initAnimation = () => {
      requestAnimationFrame(addAnimation);
    };
    
    initAnimation();
  }, [addAnimation]);  return (
    <div
      ref={containerRef}
      className={cn(
        "logo-scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >      <div
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 md:gap-8 lg:gap-12 py-4",
          start && "animate-scroll-logos",
          // Only enable hover pause on desktop for better mobile performance
          pauseOnHover && !isMobile && "hover:[animation-play-state:paused]"
        )}
        style={{
          // Hardware acceleration for better performance - simplified for mobile
          willChange: start && !isMobile ? "transform" : "auto",
          transform: "translate3d(0, 0, 0)", // Force hardware acceleration
          // Reduce sub-pixel rendering on mobile for better performance
          ...(isMobile && {
            backfaceVisibility: "hidden",
            perspective: "1000px",
          }),
        }}
      >
        {items.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={cn(
              "relative flex-shrink-0 flex flex-col items-center justify-center group",
              // Responsive width adjustments
              "min-w-[180px] md:min-w-[220px]"
            )}
          >            <div 
              className={cn(
                "relative p-4 rounded-xl",
                // No hover effects - clean and simple
              )}
            >
              <Image
                src={item.logo || "/placeholder.svg"}
                alt={item.name}
                width={item.width || 100}
                height={item.height || 100}
                className={cn(
                  "mx-auto object-contain",
                  // Simple opacity without hover effects
                  "opacity-90"
                )}
                style={{
                  maxWidth: isMobile ? "90px" : "100px",
                  maxHeight: isMobile ? "90px" : "100px",
                }}
                loading="lazy"
                decoding="async"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <span 
              className={cn(
                "mt-3 text-center font-medium text-sm",
                // Simple white text without color changes
                "text-white/80",
                // Responsive text size
                "leading-tight max-w-[150px]"
              )}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

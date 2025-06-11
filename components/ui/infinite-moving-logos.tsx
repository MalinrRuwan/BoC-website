"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Logo[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "10s"); // Changed from 20s
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "logo-scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 md:gap-12 py-4",
          start && "animate-scroll-logos",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="relative flex-shrink-0 flex flex-col items-center justify-center min-w-[180px] md:min-w-[220px] group"
          >
            {" "}
            <div className="relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-110">
              <Image
                src={item.logo || "/placeholder.svg"}
                alt={item.name}
                width={item.width || 100}
                height={item.height || 100}
                className="mx-auto object-contain transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:drop-shadow-lg"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                }}
              />
            </div>
            <span className="mt-3 text-white/70 group-hover:text-white/90 text-center font-medium text-sm transition-colors duration-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

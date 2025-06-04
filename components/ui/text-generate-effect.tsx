"use client";
import { useLayoutEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  startAnimation = true,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  startAnimation?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useLayoutEffect(() => {
    if (startAnimation && scope.current) {
      // Add a small delay to ensure smooth transition after loading screen
      const timer = setTimeout(() => {
        // Double check that scope and spans exist before animating
        if (scope.current) {
          const spans = scope.current.querySelectorAll("span");
          if (spans.length > 0) {
            try {
              animate(
                "span",
                {
                  opacity: 1,
                  filter: filter ? "blur(0px)" : "none",
                },
                {
                  duration: duration ? duration : 1,
                  delay: stagger(0.15), // Slightly faster stagger for better UX
                }
              );
            } catch (error) {
              // Silently handle animation errors
              console.warn("Animation failed:", error);
            }
          }
        }
      }, 300); // 300ms delay to ensure loading screen has fully disappeared

      return () => clearTimeout(timer);
    }
  }, [startAnimation, animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-white"
              style={{
                opacity: 0, // Always start transparent
                filter: filter ? "blur(10px)" : "none",
                willChange: "opacity, filter", // Optimize for animations
              }}
            >
              {word}
              {idx < wordsArray.length - 1 && " "} {/* Add space except for last word */}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-white text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

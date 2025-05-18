"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10 mt-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {!isMobile
          ? /* Desktop Version */
            data.map((item, index) => (
              <div className="sm:flex sm:flex-col" key={index}>
                <div className="h-10 w-10 relative top-[130px] rounded-full bg-white dark:bg-black flex items-center justify-center md:left-[48.5%] z-30">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <div
                  className={cn(
                    "mb-10 relative z-20",
                    index % 2 === 0
                      ? "md:mr-auto md:ml-[5%] md:w-[45%]"
                      : "md:ml-auto md:mr-[5%] md:w-[45%]"
                  )}
                >
                  <div
                    className={cn(
                      "relative flex flex-col items-center",
                      index % 2 === 0
                        ? "md:items-start md:mr-10"
                        : "md:items-end md:ml-10"
                    )}
                  >
                    <motion.h3
                      initial={{
                        color: "rgb(156, 163, 175)",
                        fontSize: "1.25rem",
                      }}
                      whileInView={{
                        color: "#ffffff",
                      }}
                      transition={{ duration: 0.5 }}
                      viewport={{ margin: "-45% 0px -45% 0px" }}
                      className={cn(
                        "font-bold mb-4 px-1",
                        index % 2 === 0 ? "md:text-left" : "md:text-right",
                        "text-center md:text-left"
                      )}
                    >
                      {item.title}
                    </motion.h3>

                    <Card
                      className={cn(
                        "w-full bg-black/20 backdrop-blur-sm border-neutral-800",
                        index % 2 === 0 ? "md:text-left" : "md:text-right"
                      )}
                    >
                      <CardContent className="py-4">{item.content}</CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))
          : /* Mobile Version */
            data.map((item, index) => (
              <div
                key={index}
                className="flex justify-start pt-10 md:pt-40 md:gap-10"
              >
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                  </div>
                  <motion.h3
                    initial={{
                      color: "rgb(156, 163, 175)",
                      className: "text-xl",
                    }}
                    whileInView={{
                      color: "#ffffff",
                      fontSize: "50px",
                      animationDelay: "0.3",
                    }}
                    transition={{ duration: 0.3 }}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold"
                  >
                    {item.title}
                  </motion.h3>
                </div>

                <div className="relative pl-20 pr-4 md:pl-4 w-full">
                  <motion.h3
                    initial={{
                      color: "rgb(156, 163, 175)",
                      className: "text-sm",
                    }}
                    whileInView={{
                      color: "#ffffff",
                      fontSize: "20px",
                      animationDelay: "0.3",
                    }}
                    transition={{ duration: 0.3 }}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    className="md:hidden text-sm font-bold mb-5"
                  >
                    {item.title}
                  </motion.h3>
                  <Card className="w-full bg-black/20 backdrop-blur-sm border-neutral-800">
                    <CardContent className="py-4">{item.content}</CardContent>
                  </Card>
                </div>
              </div>
            ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-[50%] left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-700 via-blue-900 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

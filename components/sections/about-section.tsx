"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import { motion } from "framer-motion";


export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto z-10">
        <ScrollAnimation>
          <p></p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollAnimation direction="left">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer glow effect with drop shadow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/about-boc.png"
                      alt="AWS Cloud glow"
                      width={276}
                      height={276}
                      className="filter blur-md opacity-60 animate-pulse"
                      style={{
                        filter: "blur(12px) brightness(1.2)",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Actual image on top */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <Image
                    src="/about-boc.png"
                    alt="AWS Cloud image"
                    width={256}
                    height={256}
                  />
                </motion.div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={0.2} className="order-first sm:order-none">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-16">
                <span className="aurora-gradient">
                  About <span className="">Beauty of</span>{" "}
                  <span className="block mt-2 ">Cloud</span>
                </span>
              </h2>
              <div className="text-white md:pr-20 lg:pr-20">
                <p className="mb-6">
                  <span className="text-blue-400">"Beauty of Cloud"</span> is an
                  exciting ideathon that deepens participants' understanding of
                  cloud technologies.
                </p>
                <p>
                  It empowers tech enthusiasts to explore cloud platforms,
                  tackle real-world challenges, and innovate with cutting-edge
                  tools. Developers, students, and professionals will come
                  together to learn, collaborate, and build impactful
                  cloud-based solutions.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

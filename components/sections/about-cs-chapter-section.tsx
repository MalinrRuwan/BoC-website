"use client";

import React from 'react';
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutCsChapter = () => {
  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">          <ScrollAnimation direction="left">
            <div className="space-y-6 order-2 md:order-1 md:pl-16 lg:pl-24 xl:pl-32">
              <h2 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-16">
                <span className="aurora-gradient">
                  About CS chapter <span className="block mt-2">of USJ</span>
                </span>
              </h2>
              <div className="text-white md:pr-16 lg:pr-20">
                <p className="mb-6">
                  The IEEE Computer Society Chapter at the University of Sri Jayewardenepura fosters innovation and technical growth through workshops, hackathons, and collaborative projects.
                </p>
                <p>
                  We bridge the gap between academics and industry to empower future tech leaders.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={0.2}>
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
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
                  <Image                    src="/about-ieee-cs-chapter.png"
                    alt="IEEE CS Chapter"
                    width={300}
                    height={300}
                    className="rounded-3xl shadow-2xl"
                    style={{
                      objectFit: "cover"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

export default AboutCsChapter
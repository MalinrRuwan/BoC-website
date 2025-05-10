"use client";

import { motion } from "framer-motion";
import { ParallaxScroll } from "@/components/ui/scroll-animation";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#0ea5e9"
        />
      </div>

      <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 font-ibm-plex-mono">
            Beauty Of <span className="text-blue-400">Cloud</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Sri Lanka's first Student-led cloud hackathon
          </p>
          <Link href="#about">
            <motion.button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>

        <ParallaxScroll speed={-0.2} className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64">
            <Image 
            src="/hero-logo.png"
            alt="Cloud computing"
            height={256}
            width={256}
            className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-xl animate-pulse"></Image>
            <motion.div
              className="relative z-10"
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
                src="/hero-logo.png"
                alt="Cloud Computing"
                width={256}
                height={256}
              />
            </motion.div>
          </div>
        </ParallaxScroll>
      </div>
    </section>
  );
}

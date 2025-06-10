"use client";

import { motion } from "framer-motion";
import { ParallaxScroll } from "@/components/ui/scroll-animation";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";
import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import ShinyText from "../ui/shiny-text";
import StarBorder from "../ui/star-border";
import { useIsMobile } from "@/hooks/use-mobile";
import { useHeavyAnimationVisibility } from "@/hooks/use-intersection-observer";

interface HeroSectionProps {
  onContentLoaded: () => void;
  isLoading?: boolean;
}

export function HeroSection({ onContentLoaded, isLoading = false }: HeroSectionProps) {
  const { ref: sectionRef, isIntersecting: isInView } = useHeavyAnimationVisibility<HTMLElement>();
  const isMobile = useIsMobile();

  // Mobile-optimized animation settings
  const floatingAnimation = isMobile 
    ? {
        y: [0, -5, 0], // Smaller movement
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 6, // Slower animation
          ease: "easeInOut",
        }
      }
    : {
        y: [0, -10, 0],
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 4,
          ease: "easeInOut",        }
      };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen  flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={isMobile ? 30 : 70} // Reduce particles on mobile
          className="w-full h-full"
          particleColor="#0ea5e9"
        />
      </div>

      <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-12 lg:px-24">
        <motion.div
          className="md:w-1/2 w-full text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 font-ibm-plex-mono tracking-tight">
            Beauty Of{" "}
            <span className="text-blue-400 tracking-tight">Cloud</span>
          </h1>{" "}
          <div className="text-xl text-blue-100 mb-8">
            <TextGenerateEffect
              words="Sri Lanka's first Student-led cloud Ideathon"
              className="font-normal"
              startAnimation={!isLoading}
              duration={0.8}
            />
          </div>
          <div className="flex flex-row gap-3 justify-center sm:gap-3 sm:justify-normal items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="https://forms.gle/cKpctvU4uudL7T4J6">
                <StarBorder speed="3s" className="rounded-3xl" as="button">
                  <div className=" text-white over:bg-blue-700 transition-all mx-5">
                    <ShinyText
                      text="Get Registered"
                      speed={1.5}
                      className="text-xl"
                    />
                  </div>
                </StarBorder>
              </Link>
            </motion.div>
            <Link href="#about">
              <motion.button className="px-6 py-3 bg-transparent text-gray-400 hover:text-gray-200 rounded-3xl  transition-all">
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>        <ParallaxScroll speed={-0.2} className="md:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Shadow beneath the image */}
            <div className="absolute bottom-0 w-48 h-10 bg-black/80 rounded-full blur-xl z-0"></div>
              {/* Outer glow effect */}
            {isInView && !isMobile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={floatingAnimation}>
                  <Image
                    src="/hero-3dcloud.png"
                    alt="Cloud Computing"
                    width={330}
                    height={330}
                    className="filter blur-md opacity-60 animate-pulse"
                    style={{
                      filter: "blur(15px) brightness(1.3)",
                    }}
                  />
                </motion.div>
              </div>
            )}            {/* Actual image on top */}
            <motion.div
              animate={isInView && !isLoading ? floatingAnimation : {}}
              className="relative z-10"
              style={{ 
                visibility: (isInView || isLoading) ? 'visible' : 'hidden',
                opacity: (isInView || isLoading) ? 1 : 0
              }}
            >
              <Image
                priority={true}
                src="/hero-3dcloud.png"
                alt="Cloud Computing"
                width={320}
                height={320}
                onLoad={onContentLoaded}
              />
            </motion.div>
          </div>
        </ParallaxScroll>
      </div>
    </section>
  );
}

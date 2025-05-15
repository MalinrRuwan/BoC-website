"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Image from "next/image";
import { motion } from "framer-motion";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface AboutSectionProps {
  partners: Partner[];
}

export function AboutSection({ partners }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
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

          <ScrollAnimation direction="right" delay={0.2}>
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

        <div className="mt-36">
          <ScrollAnimation>
            <h3 className="text-2xl font-bold text-white mb-8">
              Official Knowledge Partners
            </h3>
          </ScrollAnimation>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <HoverBorderGradient
                  containerClassName="p-4 rounded-xl"
                  className="p-4 rounded-xl bg-black/20 backdrop-blur-sm"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </HoverBorderGradient>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

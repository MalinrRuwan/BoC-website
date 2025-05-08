"use client"

import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import Image from "next/image"
import { motion } from "framer-motion"

interface Partner {
  id: number
  name: string
  logo: string
}

interface AboutSectionProps {
  partners: Partner[]
}

export function AboutSection({ partners }: AboutSectionProps) {
  return (
    <section id="about" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto z-10">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            About <span className="text-blue-400">Beauty of Cloud</span>
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation direction="left">
            <GlowingStarsBackgroundCard>
              <div className="p-8">
                <p className="text-white/80 leading-relaxed">
                  Beauty of Cloud is an exciting hackathon that fosters participants' understanding of cloud
                  technologies. It provides a platform for enthusiasts to explore cloud computing solutions through
                  hands-on experience.
                  <br />
                  <br />
                  The hackathon aims to encourage innovation, creativity, and collaboration while building beautiful
                  cloud-based solutions.
                </p>
              </div>
            </GlowingStarsBackgroundCard>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={0.2}>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-xl animate-pulse"></div>
                <div className="relative z-10">
                  <Image
                    src="/placeholder.svg?key=674nv"
                    alt="AWS Cloud"
                    width={256}
                    height={256}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="mt-20">
          <ScrollAnimation>
            <h3 className="text-2xl font-bold text-white mb-8">Official Knowledge Partners</h3>
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
  )
}

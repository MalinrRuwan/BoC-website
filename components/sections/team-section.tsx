"use client"

import { useState, useRef } from "react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { motion } from "framer-motion"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

interface TeamMember {
  id: number
  name: string
  designation: string
  image: string
}

interface TeamSectionProps {
  teamMembers: TeamMember[]
}

export function TeamSection({ teamMembers }: TeamSectionProps) {
  const [showMoreTeams, setShowMoreTeams] = useState(false)
  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto z-10">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Our <span className="text-blue-400">Team</span>
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member) => (
            <div key={member.id} className="min-h-[18rem]">
              <div className="relative h-full rounded-2xl border border-blue-500/30 p-2">
                <GlowingEffect spread={60} glow={true} proximity={80} />
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500/50">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300">{member.designation}</p>
                  </div>
                  <div className="mt-4 flex justify-center space-x-3">
                    <a
                      href="#"
                      className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: "Design and Marketing",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              ),
            },
            {
              title: "Programming and Implementation",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              ),
            },
            {
              title: "Logistics and Coordination",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              ),
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-500/20"
            >
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <motion.div
                className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {item.icon}
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.button
            onClick={() => setShowMoreTeams(!showMoreTeams)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showMoreTeams ? "Hide Teams" : "View More Teams"}
          </motion.button>
        </div>

        {showMoreTeams && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              Additional <span className="text-blue-400">Teams</span>
            </h3>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[autoplayRef.current]}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {[
                  {
                    title: "Design and Marketing",
                    description: "Crafting the visual identity and promoting the event",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    ),
                  },
                  {
                    title: "Logistics",
                    description: "Managing event operations and coordination",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    ),
                  },
                  {
                    title: "Programming and Web Development",
                    description: "Building digital solutions and platforms",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    ),
                  },
                  {
                    title: "Industry Relations",
                    description: "Building partnerships with industry leaders",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    ),
                  },
                ].map((team, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <motion.div
                          className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {team.icon}
                          </svg>
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-2">{team.title}</h3>
                        <p className="text-blue-200 text-center">{team.description}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative mr-2 bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30" />
                <CarouselNext className="relative ml-2 bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30" />
              </div>
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  )
}

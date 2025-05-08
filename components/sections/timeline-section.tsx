"use client"

import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { motion } from "framer-motion"

interface TimelineEvent {
  id: number
  date: string
  title: string
  description?: string
}

interface TimelineSectionProps {
  events: TimelineEvent[]
}

export function TimelineSection({ events }: TimelineSectionProps) {
  return (
    <section id="timeline" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto z-10 relative">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Event <span className="text-blue-400">Timeline</span>
          </h2>
        </ScrollAnimation>

        <div className="max-w-3xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 pb-16 last:pb-0"
            >
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-blue-300/20" />

              {/* Dot */}
              <div className="absolute left-0 top-1 w-5 h-5 -translate-x-1/2 rounded-full border-2 border-blue-500 bg-black">
                <div className="absolute inset-0.5 rounded-full bg-blue-400 animate-pulse" />
              </div>

              {/* Content */}
              <div className="group">
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm rounded-lg border border-blue-500/20 p-6 transition-all duration-300 hover:shadow-[0_0_15px_2px_rgba(59,130,246,0.3)] hover:-translate-y-1">
                  <div className="text-blue-300 text-sm mb-1">{event.date}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {event.title}
                  </h3>
                  {event.description && <p className="text-blue-100/80">{event.description}</p>}
                </div>

                {/* Connecting line to next item */}
                {index < events.length - 1 && (
                  <div className="absolute left-0 top-6 bottom-0 w-px">
                    <div className="h-full w-full bg-gradient-to-b from-blue-500/50 to-blue-300/10" />
                    <div
                      className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-transparent to-blue-400/50"
                      style={{
                        animation: "moveDown 2s infinite",
                        opacity: 0.6,
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <style jsx>{`
          @keyframes moveDown {
            0% { transform: translateY(0%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  )
}

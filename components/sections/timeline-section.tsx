"use client"

import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { Timeline } from "@/components/ui/timeline"
import React from "react"

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
          <h2 className="text-4xl font-bold text-center text-white">
            Event <span className="text-blue-400">Timeline</span>
          </h2>
        </ScrollAnimation>

        <Timeline 
          data={events.map(event => ({
            title: event.date,
            content: (
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors ">
                  {event.title}
                </h3>
                {event.description && <p>{event.description}</p>}
              </div>
            )
          }))}
        />
      </div>
    </section>
  )
}

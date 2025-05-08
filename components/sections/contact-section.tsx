"use client"

import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ContactSection as ContactForm } from "@/components/ui/contact-section"

interface TeamMember {
  id: number
  name: string
  designation: string
  image: string
}

interface ContactSectionProps {
  teamMembers: TeamMember[]
}

export function ContactSectionWrapper({ teamMembers }: ContactSectionProps) {
  return (
    <section id="contact" className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto z-10">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Contact <span className="text-blue-400">Us</span>
          </h2>
        </ScrollAnimation>

        <ContactForm teamMembers={teamMembers} />
      </div>
    </section>
  )
}

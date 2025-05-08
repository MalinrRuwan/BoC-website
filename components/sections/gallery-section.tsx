"use client"

import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "@/components/ui/text-reveal-card"
import Image from "next/image"
import { motion } from "framer-motion"

interface GalleryImage {
  id: number
  title: string
  image: string
}

interface GallerySectionProps {
  images: GalleryImage[]
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto z-10">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center text-white mb-16">Gallery</h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TextRevealCard text={image.title} revealText={image.title}>
                <TextRevealCardTitle>{image.title}</TextRevealCardTitle>
                <TextRevealCardDescription>Cloud computing workshop and hands-on session</TextRevealCardDescription>
                <Image
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover rounded-lg mt-4"
                />
              </TextRevealCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

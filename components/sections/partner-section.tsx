import Image from "next/image";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { useEffect, useRef, useState } from "react";
import { InfiniteMovingLogos } from "../ui/infinite-moving-logos";

interface Partner {
  id: number;
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

interface PartnerSectionProps {
  partners: Partner[];
}

export default function PartnerSection({ partners }: PartnerSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="mt-36">
      <ScrollAnimation>
        <h2 className="text-4xl font-extrabold md:text-6xl text-center mb-16">
          Our <span className="text-blue-400">Partners</span>
        </h2>
      </ScrollAnimation>

      {isInView ? (
        <InfiniteMovingLogos
          items={partners}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className="py-8"
        />
      ) : (
        <div className="flex gap-12 md:gap-16 justify-center w-full py-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center min-w-[180px] md:min-w-[220px] flex-shrink-0"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={partner.width || 100}
                height={partner.height || 100}
                className="mx-auto object-contain"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                }}
              />
              <span className="mt-3 text-white/70 text-center font-medium text-sm">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

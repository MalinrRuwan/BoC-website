import Image from "next/image";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { InfiniteMovingLogos } from "../ui/infinite-moving-logos";
import { useInfiniteAnimationVisibility } from "@/hooks/use-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { ref: sectionRef, isIntersecting: isInView } = useInfiniteAnimationVisibility<HTMLDivElement>();
  const isMobile = useIsMobile();

  return (
    <div ref={sectionRef} className="mt-36">
      <ScrollAnimation>
        <h2 className="text-4xl font-extrabold md:text-6xl text-center mb-16">
          Our <span className="text-blue-400">Partners</span>
        </h2>
      </ScrollAnimation>      {isInView ? (
        <InfiniteMovingLogos
          items={partners}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className="py-8"
        />
      ) : (
        <div className="flex gap-12 md:gap-16 justify-center w-full py-8 overflow-x-auto scrollbar-hide">
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
                  maxWidth: isMobile ? "80px" : "100px",
                  maxHeight: isMobile ? "80px" : "100px",
                }}
                loading="lazy"
                decoding="async"
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

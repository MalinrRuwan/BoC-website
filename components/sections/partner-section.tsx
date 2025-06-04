import Image from "next/image";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

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
  return (
    <div className="mt-36">
      <ScrollAnimation>
        <h2 className="text-4xl font-extrabold md:text-6xl text-center mb-16">
          Our <span className="text-blue-400">Partners</span>
        </h2>
      </ScrollAnimation>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mt-10 mx-4 ml-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            className="flex flex-col items-center text-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <Image
              src={partner.logo || "/placeholder.svg"}
              alt={partner.name}
              width={partner.width || undefined}
              height={partner.height || undefined}
              className="mx-auto"
            />
            <span className="mt-4 text-foreground">{partner.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

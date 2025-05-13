import Image from "next/image";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/scroll-animation";


interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface PartnerSectionProps {
  partners: Partner[];
}
  

export default function PartnerSection({partners}:PartnerSectionProps){
    return (
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
    );
}
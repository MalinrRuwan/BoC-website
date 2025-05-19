"use client";

import LogoAnimate from "@/components/ui/logo-animate";
import { AnimatePresence, motion } from "framer-motion";

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center w-screen h-screen bg-[#020817]"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <LogoAnimate className="w-[200px] h-[200px]" />
      </motion.div>
    </AnimatePresence>
  );
};
export default Loading;

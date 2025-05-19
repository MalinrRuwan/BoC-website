"use client";

import LogoAnimate from "@/components/ui/logo-animate";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <motion.div
            key="loading"
            className="fixed inset-0 z-[9999] flex items-center justify-center w-screen h-screen bg-[#020817]"
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.5,
                    ease: "easeOut",
                },
            }}
        >
            <LogoAnimate className="w-[200px] h-[200px]" />
        </motion.div>
    );
};
export default Loading;

"use client";
import { motion, AnimatePresence } from "motion/react";
import { HTMLProps } from "react";

interface LogoAnimateProps {
  className?: HTMLProps<HTMLElement>["className"];
}
const LogoAnimate = ({className}:LogoAnimateProps) => {
  return (
    <AnimatePresence>
      <svg
        viewBox="0 0 643 464"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* outer cloud */}
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M416.625 425.625H151.5C151.5 425.625 37.1743 413.903 37.875 312C38.2727 254.506 88.779 201.841 151.5 198.375C151.5 119.936 201.684 46.875 284.062 46.875C349.075 46.875 392.442 86.5676 407.876 141.827C501.712 137.737 565.171 211.972 568.125 274.125C572.102 357.696 484.819 425.625 416.625 425.625ZM436.832 104.218C409.031 47.879 351.158 9 284.062 9C194.128 9 120.632 78.7273 114.25 167.033C48.1395 185.876 0 243.636 0 312C0 392.674 67.0387 458.406 151.5 463.064C151.5 463.064 413.425 463.5 416.625 463.5C515.99 463.5 606 382.959 606 283.594C606 187.846 531.178 109.805 436.832 104.218Z"
          stroke="#0099FF"
          strokeWidth="3"
          strokeLinecap={"round"}
          initial={{ pathLength: 0, fill: "rgba(0, 153, 255, 0)" }}
          animate={{ pathLength: 1, fill: "#0099FF" }}
          transition={{
            pathLength: { duration: 10, type: "spring", ease: "easeInOut" },
            fill: { duration: 1, delay: 1.1, ease: "easeInOut" },
            repeat: Infinity,
            repeatDelay:1,
          }}
        />
        {/* inner cloud */}
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M453.625 416.625H188.5C188.5 416.625 74.1743 404.903 74.875 303C75.2727 245.506 125.779 192.841 188.5 189.375C188.5 110.936 238.684 37.875 321.062 37.875C386.075 37.875 429.442 77.5676 444.876 132.827C538.712 128.737 602.171 202.972 605.125 265.125C609.102 348.696 521.819 416.625 453.625 416.625ZM473.832 95.218C446.031 38.879 388.158 0 321.062 0C231.128 0 157.632 69.7273 151.25 158.033C85.1395 176.876 37 234.636 37 303C37 383.674 104.039 449.406 188.5 454.064C188.5 454.064 450.425 454.5 453.625 454.5C552.99 454.5 643 373.959 643 274.594C643 178.846 568.178 100.805 473.832 95.218Z"
          stroke="#0A0B2B"
          strokeWidth="0.00064"
          initial={{ pathLength: 0, fill: "rgba(0,0,0,0)" }}
          animate={{ pathLength: 1, fill: "#0A0B2B" }}
          transition={{
            pathLength: { duration: 3, type: "spring", ease: "easeInOut" },
            fill: { duration: 1, delay: 0.1, ease: "easeInOut" },
            repeat: Infinity,
            repeatDelay:1,
          }}
        />
        {/* inner circle */}
        <motion.circle
          cx="302.49"
          cy="256.76"
          r="117.255"
          fill="white"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
        <motion.path
          d="M303 152.25C275.417 152.25 248.965 163.207 229.461 182.711C209.957 202.215 199 228.667 199 256.25C199 283.832 209.957 310.285 229.461 329.789C248.965 349.293 275.417 360.25 303 360.25C330.582 360.25 357.035 349.293 376.539 329.789C396.043 310.285 407 283.832 407 256.25C407 228.667 396.043 202.215 376.539 182.711C357.035 163.207 330.582 152.25 303 152.25ZM318.607 204.25L331.421 210.242L327.324 218.74L379.747 251.104V263.072L338.767 288.496L331.319 277.155L365.342 257.096L321.332 231.35L284.245 308.25L271.329 302.359L275.527 293.642L226.253 263.072V251.206L267.335 225.68L274.681 237.122L240.539 257.096L281.52 281.15L318.607 204.25Z"
          fill="#0077FF"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      </svg>
    </AnimatePresence>
  );
};
export default LogoAnimate;

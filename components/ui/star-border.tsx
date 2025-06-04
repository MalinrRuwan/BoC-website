import React from "react";

type StarBorderProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  buttonColor?: string;
  speed?: React.CSSProperties["animationDuration"];
} & React.ComponentPropsWithoutRef<T>;

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "#fff", // Updated to a lighter blue color for better visibility
  buttonColor = "bg-blue-600", // Light blue for the button
  speed = "3s",
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
  <Component
    className={`relative inline-block py-[2px] overflow-hidden rounded-[20px] ${className}`}
    {...rest as any}
  >
    <div
    className="absolute w-[300%] h-[50%] opacity-100 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
    style={{
      background: `radial-gradient(circle, ${color}, transparent 15%)`,
      animationDuration: speed,
    }}
    ></div>
    <div
    className="absolute w-[300%] h-[50%] opacity-100 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
    style={{
      background: `radial-gradient(circle, ${color}, transparent 15%)`,
      animationDuration: speed,
    }}
    ></div>
    <div className={`relative z-1 ${buttonColor} text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]`}>
    {children}
    </div>
  </Component>
  );
};

export default StarBorder;

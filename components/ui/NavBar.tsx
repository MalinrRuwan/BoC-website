"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-4 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "70%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 60,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-1 lg:flex dark:bg-transparent",
        visible && "border border-slate-800 dark:bg-slate-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        WebkitBackdropFilter: visible ? "blur(20px)" : "none", // Adding for Safari support
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "2rem" : "1.5rem",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4rem" : "4rem",
        y: visible ? 20 : 0,
        backgroundColor: "transparent", // Remove background color, keep only blur effect
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-30 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "border border-slate-800/20", // Add subtle border instead of background
        className
      )}
      style={{
        backdropFilter: visible ? "blur(20px)" : "none",
        WebkitBackdropFilter: visible ? "blur(20px)" : "none",
      }}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between MobileNavHeader", // Added MobileNavHeader class
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [togglePortalElement, setTogglePortalElement] =
    useState<HTMLElement | null>(null);

  // Create portal elements
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Main menu portal
      let menuElement = document.getElementById("mobile-nav-portal");
      if (!menuElement) {
        menuElement = document.createElement("div");
        menuElement.id = "mobile-nav-portal";
        document.body.appendChild(menuElement);
      }
      setPortalElement(menuElement);

      // Toggle button portal (always stays on top)
      let toggleElement = document.getElementById("mobile-nav-toggle-portal");
      if (!toggleElement) {
        toggleElement = document.createElement("div");
        toggleElement.id = "mobile-nav-toggle-portal";
        document.body.appendChild(toggleElement);
      }
      setTogglePortalElement(toggleElement);
    }
  }, []);

  // Animation variants
  const childrenVariant = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.08,
        delayChildren: 0.4,
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const childVariant = {
    initial: { x: 50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: 50,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
  };

  // The menu content to render in portal
  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            backgroundColor: "rgba(10, 10, 10, 0.85)",
            overflowY: "auto",
          }}
          className={cn(
            "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
            className
          )}
        >
          <motion.div
            className="w-full max-w-2xl flex flex-col items-center justify-center space-y-8 px-6 py-12"
            variants={childrenVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {React.Children.map(children, (child, idx) => (
              <motion.div
                key={`mobile-nav-item-${idx}`}
                variants={childVariant}
                className="w-full p-4 text-center text-bold text-2xl"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // The toggle button to render in a separate portal
  const toggleContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: "fixed",
            top: "1.75rem",
            right: "2rem",
            zIndex: 20000,
          }}
          className="lg:hidden"
        >
          <MobileNavToggle isOpen={true} onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {portalElement && ReactDOM.createPortal(menuContent, portalElement)}
      {togglePortalElement &&
        ReactDOM.createPortal(toggleContent, togglePortalElement)}
    </>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX
      className="text-white cursor-pointer"
      onClick={onClick}
      style={{
        zIndex: 10000, // Ensure it's above the menu
        position: "relative",
      }}
    />
  ) : (
    <IconMenu2
      className="text-black dark:text-white cursor-pointer"
      onClick={onClick}
      style={{
        zIndex: 10000, // Ensure it's above the menu
        position: "relative",
      }}
    />
  );
};
export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img src="/logo.png" alt="logo" width={100} height={100} />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

// export const NavbarButton = ({
//   href,
//   as: Tag = "a",
//   children,
//   className,
//   variant = "primary",
//   ...props
// }: {
//   href?: string;
//   as?: React.ElementType;
//   children: React.ReactNode;
//   className?: string;
//   variant?: "primary" | "secondary" | "dark" | "gradient";
// } & (
//   | React.ComponentPropsWithoutRef<"a">
//   | React.ComponentPropsWithoutRef<"button">
// )) => {
//   const baseStyles =
//     "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

//   const variantStyles = {
//     primary:
//       "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
//     secondary: "bg-transparent shadow-none dark:text-white",
//     dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
//     gradient:
//       "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_0px_rgba(255,255,255,0.3)_inset]",
//   };

//   return (
//     <Tag
//       href={href || undefined}
//       className={cn(baseStyles, variantStyles[variant], className)}
//       {...props}
//     >
//         {children}

//     </Tag>
//   );
// };

"use client";

import { cn } from "@/lib/utils";
import { HTMLProps } from "react";
import Image from "next/image";

interface EventCoChairCardProps {
  name: string;
  designation: string;
  image: string;
  className?: HTMLProps<HTMLElement>["className"];
  cardClassName?: HTMLProps<HTMLElement>["className"];
}

export function EventCoChairCard({
  name,
  designation,
  image,
  className,
  cardClassName
}: EventCoChairCardProps) {
  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "group bg-black/20 rounded-2xl p-6 shadow-lg border border-blue-500/20 backdrop-blur-sm transition-all duration-300 flex flex-col items-center text-center min-h-[400px] justify-center",
        cardClassName
      )}>
        <div className="flex flex-col items-center space-y-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-blue-500/20">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                sizes="128px"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              {name}
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-lg font-semibold text-blue-300 uppercase tracking-wider">
                {designation}
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <div className="w-3 h-3 border-2 border-blue-400 rotate-45"></div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

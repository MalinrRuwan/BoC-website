"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: number;
  title: string;
  image: string;
  description?: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

export function GallerySection({
  images: externalImages,
}: GallerySectionProps) {
  // Define gallery images directly in the component
  const galleryImagesData = [
    {
      id: 1,
      title: "Workshop 1",
      image: "/gallery-workshop-01.jpg",
      description: " first Cloud computing workshop with AWS experts",
    },
    {
      id: 2,
      title: "Workshop 1",
      image: "/gallery-workshop-02.jpg",
      description: "Hands on practice with AWS experts",
    },
    {
      id: 3,
      title: "Workshop 1",
      image: "/gallery-workshop-03.jpg",
      description: "Lab facilities and resources",
    },
    {
      id: 4,
      title: "Workshop 2",
      image: "/gallery-workshop-04.jpg",
      description: "participants engagement",
    },
    {
      id: 5,
      title: "Workshop 2",
      image: "/gallery-workshop-05.jpg",
      description: "participants engagement",
    },
    {
      id: 6,
      title: "Workshop 2",
      image: "/gallery-workshop-06.jpg",
      description: "participants engagement",
    },
    {
      id: 7,
      title: "Workshop 2",
      image: "/gallery-workshop-07.jpg",
      description: "Lakindu from AWS user group as a speaker",
    },
    

  ];
  // Store original images before duplication
  const originalImages = externalImages?.length
    ? externalImages
    : galleryImagesData;

  // Expanding the images array for a better carousel experience, but keeping track of original count
  const [images] = useState(() => {
    const initialImages = originalImages;

    if (initialImages.length < 5) {
      // If less than 5 images, duplicate them for a better carousel experience
      return [
        ...initialImages,
        ...initialImages.map((img) => ({ ...img, id: img.id + 100 })), // Adding 100 to avoid key conflicts
        ...initialImages.map((img) => ({ ...img, id: img.id + 200 })), // Adding 200 to avoid key conflicts
      ];
    }
    return initialImages;
  });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [dragging, setDragging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const handleSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      setCurrent(currentIndex);
    };

    api.on("select", handleSelect);

    // Initial selection
    handleSelect();

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Auto-advance carousel
  useEffect(() => {
    const startAutoplay = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!dragging && api) {
          api.scrollNext();
        }
        startAutoplay();
      }, 5000);
    };

    startAutoplay();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [api, dragging]);

  // Handle mobile touch events
  const handleDragStart = () => setDragging(true);
  const handleDragEnd = () => {
    setDragging(false);
    // Pause briefly before restarting autoplay to prevent immediate slide change
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      // Restart autoplay after a slight delay
    }, 1000);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {" "}
      <div className="container mx-auto z-10 max-w-7xl">
        <ScrollAnimation>
          <h2 className="text-4xl font-extrabold md:text-6xl text-center mb-16">
            Our <span className="text-blue-400">Memories</span>
          </h2>
        </ScrollAnimation>

        <div className="relative">
          {/* Main Carousel */}{" "}
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              containScroll: "trimSnaps",
            }}
          >
            {" "}
            <CarouselContent
              className="-ml-2 md:-ml-4 pt-4"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchEnd={handleDragEnd}
            >
              {images.map((image, index) => (
                <CarouselItem
                  key={image.id}
                  className="pl-2 md:pl-4 sm:basis-3/4 md:basis-1/2 lg:basis-1/3 pb-4 mb-4 pt-2"
                >
                  <motion.div
                    initial={{ opacity: 0.6, scale: 0.95 }}
                    animate={{
                      opacity: current === index % images.length ? 1 : 0.8,
                      scale: current === index % images.length ? 1 : 0.95,
                      y: current === index % images.length ? 0 : 5,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-2xl border border-blue-500/20 shadow-xl shadow-blue-900/20 m-1"
                    whileHover={{
                      scale: 1.03,
                      transformOrigin: "center",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Image with shadow overlay */}
                    <div className="relative overflow-hidden">
                      {" "}
                      <Image
                        src={image.image || "/gallery-quizz-winners.jpg"}
                        alt={image.title}
                        width={375}
                        height={375}
                        className="w-full aspect-square object-cover transition-transform duration-500"
                        priority={index < 3}
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = "/gallery-quizz-winners.jpg";
                          console.log(
                            "Image load error, using fallback image",
                            image.image
                          );
                        }}
                      />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}{" "}
            </CarouselContent>
            {/* Navigation arrows removed as requested */}
          </Carousel>
          {/* Navigation Dots - Google Style */}
          <div className="flex justify-center mt-8 gap-1.5">
            {Array.from({ length: originalImages.length }).map((_, index) => {
              // Calculate the appropriate index mapping for the duplicated array
              // This ensures we highlight the correct dot based on which image is currently showing
              const originalIndex = current % originalImages.length;

              return (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className="group focus:outline-none"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <motion.div
                    animate={{
                      width: originalIndex === index ? "24px" : "8px",
                      opacity: originalIndex === index ? 1 : 0.5,
                    }}
                    className={cn(
                      "h-2 min-w-2 rounded-full bg-blue-500",
                      "transition-all duration-300 ease-in-out group-hover:opacity-100"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

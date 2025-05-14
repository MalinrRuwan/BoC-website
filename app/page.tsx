"use client";

import { useEffect, useState } from "react";
import { PageBackground } from "@/components/background/page-background";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { CompetitionSection } from "@/components/sections/competition-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSectionWrapper } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import { NavbarComponent } from "@/components/sections/nav-bar";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  const teamMembers = [
    {
      id: 1,
      name: "Kasun Perera",
      designation: "President",
      image: "/placeholder.svg?key=vsg3u",
    },
    {
      id: 2,
      name: "Menaka Wickramasinghe",
      designation: "Vice President",
      image: "/placeholder.svg?key=ka4h5",
    },
    {
      id: 3,
      name: "Tharanga Fernando",
      designation: "Secretary",
      image: "/placeholder.svg?key=66kk3",
    },
    {
      id: 4,
      name: "Dilhara Thisarani",
      designation: "Treasurer",
      image: "/placeholder.svg?key=hhcs1",
    },
  ];

  const timelineEvents = [
    {
      id: 1,
      date: "10 January 2024",
      title: "Registration Opens",
      description: "Begin your journey to cloud innovation",
    },
    {
      id: 2,
      date: "15 February 2024",
      title: "Orientation",
      description: "Get familiar with the competition format and rules",
    },
    {
      id: 3,
      date: "22 February 2024",
      title: "Workshop",
      description: "Learn essential cloud technologies from experts",
    },
    {
      id: 4,
      date: "1 March 2024",
      title: "Round 1",
      description: "Ideation and solution design phase begins",
    },
    {
      id: 5,
      date: "15 March 2024",
      title: "Final Round",
      description: "Present your solution to the judging panel",
    },
  ];  // Gallery images are now defined directly in the GallerySection component

  const partners = [
    {
      id: 1,
      name: "AWS",
      logo: "/placeholder.svg?key=dfz7h",
    },
    {
      id: 2,
      name: "Google Cloud",
      logo: "/placeholder.svg?key=priyy",
    },
    {
      id: 3,
      name: "Microsoft Azure",
      logo: "/placeholder.svg?key=gjmmk",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 200 &&
          window.scrollY < sectionTop + sectionHeight - 200
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <PageBackground />
      <main
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Background */}
        <div className="relative" style={{ zIndex: 50 }}>
          <NavbarComponent />
        </div>

        {/* Content wrapper with higher z-index */}
        <div className="relative" style={{ zIndex: 30 }}>
          <HeroSection />
          <AboutSection partners={partners} />
          <TimelineSection events={timelineEvents} />
          <GallerySection images={[]} />
          <CompetitionSection />
          <TeamSection teamMembers={teamMembers} />
          <ContactSectionWrapper teamMembers={teamMembers} />
          <FooterSection />
        </div>
      </main>
    </>
  );
}

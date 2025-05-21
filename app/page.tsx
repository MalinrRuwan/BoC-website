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
import PartnerSection from "@/components/sections/partner-section";
import LogoAnimate from "@/components/ui/logo-animate";
import Loading from "./loading";
import AboutCsChapter from "@/components/sections/about-cs-chapter-section";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [heroContentLoaded, setHeroContentLoaded] = useState<boolean>(false); // New state for hero image
  const [minDelayPassed, setMinDelayPassed] = useState<boolean>(false); // New state for 3s delay

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroContentLoaded = () => {
    setHeroContentLoaded(true);
  };

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
      date: "24 May 2024",
      title: "AWS Workshop 2",
      description:
        "Level up your cloud skills! Following our successful first session, join us for a focused dive into key AWS services and practical applications relevant to Sri Lanka. Expect expert talks, insightful discussions, and valuable networking opportunities within our growing local AWS community. Don't miss this chance to learn and connect!",
    },
    {
      id: 2,
      date: "25 May 2024",
      title: "Registration for Ideathon",
      description:
        "Get ready to unleash your innovative ideas and compete for exciting opportunities. Stay tuned for the launch of registration and prepare to secure your spot in the Ideathon. Your chance to make an impact is coming!",
    },
    {
      id: 3,
      date: "28 May 2024",
      title: "CoDeKu Workshop 2",
      description:
        "Join our hands-on workshop to gain essential web development skills. Learn from experienced instructors and build practical projects. Perfect for beginners and those looking to expand their knowledge. Start your coding journey with CoDeKu today!",
    },
    {
      id: 4,
      date: "21 June 2024",
      title: "AWS Workshop 3",
      description:
        "Join our next AWS workshop for an in-depth look at advanced cloud topics and practical applications. Expect expert-led sessions and hands-on labs. Expand your AWS expertise with the Sri Lanka community!",
    },
    {
      id: 5,
      date: "25 June 2024",
      title: "CoDeKu Workshop 3",
      description:
        "Join our upcoming workshop to deepen your programming skills and explore new technologies. Expect hands-on learning and expert guidance. Take your coding journey to the next level with CoDeKu!",
    },
  ]; // Gallery images are now defined directly in the GallerySection component

  const partners = [
    {
      id: 1,
      name: "AWS",
      logo: "/aws_logo.png",
      height:200,
      width:200,
      
    },
    {
      id: 2,
      name: "CoDeKu",
      logo: "/codeku_logo.png",
      height:300,
      width:300,

    },
    {
      id: 3,
      name: "HackHub",
      logo: "/hackhub_logo.png",
      height:100,
      width:100,
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

  const contentLoaded = minDelayPassed && heroContentLoaded;
  const showLoadingScreen = !contentLoaded;

  const contentStyle = {
    visibility: showLoadingScreen
      ? "hidden"
      : ("visible" as "hidden" | "visible"), // Added type assertion for clarity
    opacity: showLoadingScreen ? 0 : 1,
    // Optional: Add a transition for smoother appearance if desired
    // transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
  };

  return (
    <>
      <AnimatePresence>{showLoadingScreen && <Loading />}</AnimatePresence>
      <PageBackground />
      <main
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Background */}
        <div className="relative p-10 sm:p-10" style={{ zIndex: 50 }}>
          <NavbarComponent />
        </div>

        {/* Content wrapper with higher z-index */}
        <div className="relative" style={{ zIndex: 30 }}>
          {/* Loading component removed from here */}
          <div style={contentStyle}>
            <HeroSection onContentLoaded={handleHeroContentLoaded} />
            <AboutSection />
            <TimelineSection events={timelineEvents} />
            <GallerySection images={[]} />
            <CompetitionSection />
            <TeamSection teamMembers={teamMembers} />
            <PartnerSection partners={partners}/>
            <ContactSectionWrapper teamMembers={teamMembers} />
            <FooterSection />
          </div>
        </div>
      </main>
    </>
  );
}

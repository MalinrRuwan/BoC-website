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
      date: "24 May 2025",
      title: "AWS Workshop 2",
      description:
        "Level up your cloud skills! Following our successful first session,A session providing detailed exploration into key services of AWS, including expert talks, insightful discussions on practical applications relevant to Sri Lanka. Also experience valuable networking opportunities within our growing local AWS community. Don't miss this initiative to learn and connect!",
    },
    {
      id: 2,
      date: "25 May 2025",
      title: "Registration for Ideathon",
      description:
        "Get ready to unleash your innovative ideas and compete for exciting opportunities. Stay tuned for the launch of registration and prepare to secure your spot in the Ideathon. Your chance to make an impact is coming!",
    },
    {
      id: 3,
      date: "7 June 2025",
      title: "CoDeKu Workshop 2",
      description:
        "A perfect start up for beginners and curious minds to expand their knowledge in coding.Join our workshop to gain hands-on experience and essential web development skills. Learn from experienced instructors and build practical projects.",
    },
    {
      id: 4,
      date: "June 2025",
      title: "AWS Workshop 3",
      description:
        "An in-depth discussion on advanced cloud topics and practical applications. Including expert-led sessions and hands-on labs.Expand your AWS expertise with the Sri Lanka tech community!",
    },
    {
      id: 5,
      date: "8 June 2025",
      title: "CoDeKu Workshop 3",
      description:
        "Join our upcoming workshop to  deepen your programming skills  and explore new technologies under expert guidance. Take your coding journey to the next level with CoDeku!",
    },
    {
      id: 6,
      date: "28 May 2025",
      title: "Ideathon: Prototype Phase Registration Opens",
      description:
        "The Ideathon will advance to the Prototype Phase as registration opens. Teams will have the opportunity to sign up and prepare to transform their innovative concepts into working prototypes.",
    },
    {
      id: 7,
      date: "25 June 2025",
      title: "Ideathon: Prototype Submissions Open",
      description:
        "The submission period for the Prototype Phase will commence. Participating teams can begin to submit their completed prototypes for evaluation, showcasing their hard work and innovation.",
    },
    {
      id: 8,
      date: "4 July 2025",
      title: "Ideathon: Prototype Registration Closes",
      description:
        "Registration for the Ideathon's Prototype Phase will officially close, marking the final opportunity for new teams to enter this stage of the competition.",
    },
    {
      id: 9,
      date: "5 July 2025",
      title: "Ideathon: Judging Criteria Release",
      description:
        "The official judging criteria for the Ideathon will be released. This will provide all teams with clear guidelines on the metrics for success, helping them to refine their prototypes accordingly.",
    },
    {
      id: 10,
      date: "23 July 2025",
      title: "Ideathon: Prototype Submissions Close",
      description:
        "The submission window for the Prototype Phase will close. All prototypes will then enter the evaluation stage, where they will be reviewed by our panel of judges.",
    },
    {
      id: 11,
      date: "30 July 2025",
      title: "Ideathon: Finalists Announced",
      description:
        "The teams selected to advance to the Grand Finale will be announced. These finalists will have the chance to compete in the final Builderthon and Pitch-a-thon.",
    },
    {
      id: 12,
      date: "8-9 Aug 2025",
      title: "Builderthon & Pitch-a-thon",
      description:
        "The competition will conclude with the Grand Finale, a two day event featuring a Builderthon and Pitch-a-thon. Finalist teams will build and present their final products to claim the championship title.",
    },
  ]; // Gallery images are now defined directly in the GallerySection component

  const partners = [
    {
      id: 1,
      name: "CoDeKu DevOps Academy",
      logo: "/codeku-logo.png",
      height:300,
      width:300,
      
    },
    {
      id: 2,
      name: "AWS User Group Colombo",
      logo: "/aws_logo.png",
      height:300,
      width:300,

    },
    {
      id: 3,
      name: "Hack SL ",
      logo: "/hackhub_logo.png",
      height:100,
      width:100,
    },
    {
      id: 4,
      name: "Pepiliyana Timber Dealers",
      logo: "/pepiliyana-timber-dealers.png",
      height:100,
      width:100,
    },
    {
      id: 5,
      name: "Global Ceylon",
      logo: "/global-ceylon.png",
      height:100,
      width:100,
    },
    {
      id: 6,
      name: "DR Eco friendly bag",
      logo: "/DR-Eco-friendly-bag.png",
      height:100,
      width:100,
    },
    {
      id: 7,
      name: "Pearl Bay",
      logo: "/pearl-bay.png",
      height:100,
      width:100,
    },
    {
      id: 8,
      name: "VIUKON",
      logo: "/viukon.png",
      height:100,
      width:100,
    },
    {
      id: 9,
      name: "Global Ceylon",
      logo: "/global-ceylon.png",
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
          {/* Loading component removed from here */}          <div style={contentStyle}>
            <HeroSection onContentLoaded={handleHeroContentLoaded} isLoading={showLoadingScreen} />
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

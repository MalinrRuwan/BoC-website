"use client";

import { useRef } from "react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { EventCoChairCard } from "../ui/event-cochair-card";
import Autoplay from "embla-carousel-autoplay";

// Define team structure interfaces
interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  role?: string;
}

interface TeamData {
  name: string;
  head: TeamMember | TeamMember[];
  members: TeamMember[];
  icon: React.ReactNode;
  description: string;
  image: string;
}

interface TeamSectionProps {
  teamMembers?: TeamMember[];
}

export function TeamSection({ teamMembers = [] }: TeamSectionProps) {
  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
    // Define co-chairs at the top of the hierarchy
  const coChairs = [
    {
      id: 1,
      name: "Rusira Sandul",
      designation: "Event Co-Chair",
      image: "/rusira sandul-event co chair.png",
    },
    {
      id: 2,
      name: "Manuja Wimalarathne",
      designation: "Event Co-Chair",
      image: "/manuja wimalarathne-event co chair.png",
    }
  ];
  
  // Define teams data
  const teamsData: TeamData[] = [
    {
      name: "Programming & Web Development",
      head: {
        id: 3,
        name: "Sarasi Perera",
        designation: "Head",
        image: "/Sarasi Perera-programming.png",
      },
      members: [
        { id: 4, name: "Dinil Hansara", designation: "Member", image: "/Dinil Hansara-programming.png" },
        { id: 5, name: "Arshath Moulana", designation: "Member", image: "/Arshath Moulana-programming.png" },
        { id: 6, name: "Ahinsa Wickramarathna", designation: "Member", image: "/Ruchini Ahinsa-programming.jpg" },
        { id: 7, name: "Ganindu Deshapriya", designation: "Member", image: "/Ganindu Deshapriya-programming.jpg" },
        { id: 8, name: "Isum Perera", designation: "Member", image: "/Isum Perera-programming.jpg" },
        { id: 9, name: "Malin Dhamsara", designation: "Member", image: "/malin dhamsara-programming.jpeg" },
        { id: 10, name: "Kemitha Krishmanthi", designation: "Member", image: "/Kemitha Krishmanthi-programming.png" },
        { id: 11, name: "Sara Zarook", designation: "Member", image: "/Sara Zarook-design.png" },
        { id: 12, name: "Thilina Dilshan", designation: "Member", image: "/Thilina Dilshan-programming.png" },
        { id: 13, name: "Waruna Udara", designation: "Member", image: "/Waruna Udara-programming.png" },
      ],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      ),
      description: "Building digital solutions and innovative applications",
      image: "/program-web-dev-team.jpg",
    },
    {
      name: "Design & Marketing",
      head: {
        id: 14,
        name: "Shenal Gunasekara",
        designation: "Head",
        image: "/Shenal Gunasekara-design.png",
      },
      members: [
        { id: 15, name: "Amandi Thathsarani", designation: "Member", image: "/Amandi Thathsarani-design.png" },
        { id: 16, name: "Dinil Hansara", designation: "Member", image: "/Dinil Hansara-design.png" },
        { id: 17, name: "Dumith Heshan", designation: "Member", image: "/Dumith Heshan-design.jpg" },
        { id: 18, name: "Udani Wickramanayaka", designation: "Member", image: "/Udani Wickramanayaka-design.png" },
        { id: 19, name: "Charindu Ruhansa", designation: "Member", image: "/Charindu Ruhansa-design.jpg" },
        { id: 20, name: "Malin Dhamsara", designation: "Member", image: "/malin dhamsara-programming.jpeg" },
        { id: 21, name: "Sara Zarook", designation: "Member", image: "/Sara Zarook-design.png" },
        { id: 22, name: "Pratheesh Dhanaseelan", designation: "Member", image: "/Pratheesh Dhanaseelan-design.png" },
        { id: 23, name: "Nishadi Wickramarachchi", designation: "Member", image: "/Nishadi Wickkramarachchi-design.png" },
        { id: 24, name: "Imalka Pabodini", designation: "Member", image: "/Imalka Pabodini-desing.jpg" },
        { id: 25, name: "Tharindu Thilakarathna", designation: "Member", image: "/Tharindu Thilakarathna-design.png" },
        { id: 26, name: "Serini Puwakgolla", designation: "Member", image: "/Serini Puwakgolla-design.jpg" },
      ],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      ),
      description: "Crafting visual identity and promoting the event",
      image: "/design-marketing-team.jpg",
    },
    {
      name: "Logistics & Coordination",
      head: [
        {
          id: 27,
          name: "Shaveen Udayanga",
          designation: "Co-Head",
          image: "/Shveen Udayanga-logistics.jpg",
        },
        {
          id: 28,
          name: "Chethana Perera",
          designation: "Co-Head",
          image: "/Chethana Perera-logistics.jpg",
        }
      ],
      members: [
        { id: 29, name: "Dewni Anuradi", designation: "Member", image: "/Dewni Andradi - FOC-logistics.png" },
        { id: 30, name: "Ishani Ranthanayake", designation: "Member", image: "/Ishani Ranthnayake-logistics.jpeg" },
        { id: 31, name: "Hansaka Hirushan", designation: "Member", image: "/Hansaka Hirushan-logistics.png" },
        { id: 32, name: "Hansani Katugampala", designation: "Member", image: "/Hansani Katugampala-logistics.png" },
        { id: 33, name: "Heshan Hansana", designation: "Member", image: "/Heshan Hansana-logistics.png" },
        { id: 34, name: "Niluni Sandumika", designation: "Member", image: "/Niluni Sandunika-logistics.jpg" },
        { id: 35, name: "Lasen Liyeth", designation: "Member", image: "/Lasen Loneth-logistics.png" },
        { id: 36, name: "Nimangee Nethumila", designation: "Member", image: "/Nimangee Nethumila-logistics.png" },
        { id: 37, name: "Hiruna Hansaka", designation: "Member", image: "/Hiruna Hansaka fot -logistics.jpg" },
        { id: 38, name: "Isuri Kavya", designation: "Member", image: "/Isuri Kawya-logistics.png" },
        { id: 39, name: "Sara Zarook", designation: "Member", image: "/Sara Zarook-design.png" },
        { id: 40, name: "Salini Nehara", designation: "Member", image: "/Salini-Nehara-logistics.png" },
        { id: 41, name: "Adithya Deshanjaya", designation: "Member", image: "/Adithya Deshanjaya-logistics.png" },
      ],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      ),
      description: "Managing event operations and coordination",
      image: "/logistics-coordinating-team.jpg",
    },
    {
      name: "Industry Relations",
      head: {
        id: 42,
        name: "Dedunu Thakshila",
        designation: "Head",
        image: "/Dedunu Thakshila-ir.png",
      },
      members: [
        { id: 43, name: "Chamathka Dilshani", designation: "Member", image: "/Chamathka Dilshani-ir.png" },
        { id: 44, name: "Imalsha Sathsarani", designation: "Member", image: "/Imalsha Sathsarani-ir.png" },
        { id: 45, name: "Kavishka Rashani", designation: "Member", image: "/Kavishka Rashani-ir.png" },
        { id: 46, name: "Nethmi Tharushika", designation: "Member", image: "/Nethmi Tharushika-ir.png" },
        { id: 47, name: "Praveen Tharuka", designation: "Member", image: "/Praveen Tharuka-ir.png" },
        { id: 48, name: "Sandali Ranaweera", designation: "Member", image: "/Sandali Ranaweera-ir.png" },
        { id: 49, name: "Thamalee Shakeela", designation: "Member", image: "/Thamalee Shakeela-ir.jpg" },
        { id: 50, name: "Tharuka Gunarathne", designation: "Member", image: "/Tharuka Gunarathne-ir.png" },
        { id: 51, name: "Vinal De Silva", designation: "Member", image: "/Vinal De Silva-ir.png" },
      ],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
      description: "Building partnerships with industry leaders",
      image: "/industry-relation-team.jpg",
    }
  ];

  return (
    <section id="team" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-visible">
      <div className="container mx-auto z-10 overflow-visible">        <ScrollAnimation>
          <h2 className="text-4xl sm:text-6xl font-bold text-center text-white mb-16">
            Our <span className="text-blue-400">Team</span>
          </h2>
        </ScrollAnimation>
        
        {/* Event Co-Chairs Section */}
        <div className="mb-20">
          
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
            {coChairs.map((coChair, index) => (
              <div key={coChair.id} className="w-full md:w-80">
                <EventCoChairCard
                  name={coChair.name}
                  designation={coChair.designation}
                  image={coChair.image}
                  className="transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Teams Grid - Simple layout matching wireframe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-visible">          {teamsData.map((team, index) => (
            <div key={team.name} className="relative group overflow-visible h-full">
              <div className="bg-black/20 rounded-2xl p-6 shadow-lg border border-blue-500/20 backdrop-blur-sm  transition-all duration-300 flex flex-col items-center overflow-visible h-full md:min-h-[500px] lg:min-h-[450px]">
                <h3 className="text-center text-white text-xl font-bold mb-6">{team.name}</h3>
                <div className="flex flex-col items-center w-full gap-y-4 overflow-visible h-full">
                  {/* Team Head(s) - Fixed height with consistent positioning */}
                  <div className="flex justify-center gap-2 mb-8 h-16 mt-2">
                    {Array.isArray(team.head) ? (
                      <AnimatedTooltip 
                        items={team.head.map(head => ({ 
                          id: head.id, 
                          name: head.name, 
                          designation: head.designation,
                          image: head.image 
                        }))}
                        className="flex justify-center"
                      />
                    ) : (
                      <AnimatedTooltip 
                        items={[{ 
                          id: team.head.id, 
                          name: team.head.name, 
                          designation: team.head.designation,
                          image: team.head.image 
                        }]}
                        className="flex justify-center"
                      />
                    )}
                  </div>
                  
                  {/* Team Members Container */}
                  <div className="flex flex-col items-center justify-start gap-y-6 overflow-visible flex-1">
                    {/* First row of members */}
                    <div className="flex flex-wrap justify-center gap-2 overflow-visible">
                      <AnimatedTooltip 
                        items={team.members.slice(0, 5).map(member => ({
                          id: member.id,
                          name: member.name,
                          designation: member.designation,
                          image: member.image
                        }))}
                        className="flex justify-center"
                      />
                    </div>
                    
                    {/* Second row of members */}
                    {team.members.length > 5 && (
                      <div className="flex flex-wrap justify-center gap-2 overflow-visible">
                        <AnimatedTooltip 
                          items={team.members.slice(5, 10).map(member => ({
                            id: member.id,
                            name: member.name,
                            designation: member.designation,
                            image: member.image
                          }))}
                          className="flex justify-center"
                        />
                      </div>
                    )}
                    
                    {/* Additional members (if any) */}
                    {team.members.length > 10 && (
                      <div className="flex flex-wrap justify-center gap-2 overflow-visible">
                        <AnimatedTooltip 
                          items={team.members.slice(10).map(member => ({
                            id: member.id,
                            name: member.name,
                            designation: member.designation,
                            image: member.image
                          }))}
                          className="flex justify-center"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

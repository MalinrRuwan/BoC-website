"use client";

import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { GlowingStarsBackgroundCard } from "@/components/ui/glowing-stars";
import { PrizeCard } from "@/components/ui/prize-card";
import SpotlightCard from "../ui/spotlight-card";
import { BackgroundGradient } from "../ui/background-gradient";
import { Card } from "../ui/card";
import { GlowingEffect } from "../ui/glowing-effect";

export function CompetitionSection() {
  return (
    <section
      id="competition"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto z-10">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Event <span className="text-blue-400">Plan</span>
          </h2>
        </ScrollAnimation>

        <div className="max-w-3xl mx-auto">
          <ScrollAnimation>
            <p className="text-white/80 text-center mb-12">
              Our hackathon will feature two competitive rounds, providing
              participants with an opportunity to showcase their technical and
              problem-solving skills in cloud-based solutions.
            </p>
          </ScrollAnimation>

          <div className="space-y-12">
            <ScrollAnimation direction="left">
              <Card className=" backdrop-blur-[2px] bg-transparent rounded-[22px]  border-blue-900">
                <GlowingEffect
                  spread={64}
                  glow={true}
                  disabled={false}
                  proximity={512}
                  inactiveZone={0.01}
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Round 1: Ideation & Solution Design
                  </h3>
                  <p className="text-white/80">
                    Participants will be given a real-world business scenario
                    and asked to design a cloud-based solution. They will need
                    to create a high-level architecture diagram that showcases
                    their solution, all embedded in creativity, scalability,
                    security, and cost-effectiveness.
                  </p>
                </div>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.2}>
              <Card className=" backdrop-blur-[2px] bg-transparent rounded-[22px]  border-blue-900">
                <GlowingEffect
                  spread={64}
                  glow={true}
                  disabled={false}
                  proximity={512}
                  inactiveZone={0.01}
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Round 2: Final Presentation & Pitch
                  </h3>
                  <p className="text-white/80">
                    Qualified teams will present their solutions to the final
                    judging panel. They will need to demonstrate how their
                    solution addresses the business needs, technical
                    implementation details, and potential impact. The best
                    solutions will be recognized and awarded.
                  </p>
                </div>
              </Card>
            </ScrollAnimation>
          </div>
        </div>

        <div className="mt-20">
          <ScrollAnimation>
            <h2 className="text-4xl font-bold text-center text-white mb-28">
              Prize <span className="text-blue-400">Pool</span>
            </h2>
          </ScrollAnimation>

          <div className="flex flex-wrap justify-center gap-4 ">
            <PrizeCard
              position={2}
              amount="Rs. 30,000"
              color="#C0C0C0"
              className="border-neutral-400"
            />
            <PrizeCard
              position={1}
              amount="Rs. 50,000"
              color="#FFD700"
              className=" border-yellow-400 sm:bottom-8 order-first sm:order-none"
            />
            <PrizeCard
              position={3}
              amount="Rs. 15,000"
              color="#CD7F32"
              className="border-orange-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

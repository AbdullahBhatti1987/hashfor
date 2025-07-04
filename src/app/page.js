import HeroSection from "@/components/HeroSection/page";
import MembershipPage from "@/components/membership/page";
import { OurFleetPage } from "@/components/ourFleet/page";
import FlagComponent from "@/components/FlagComponents/FlagComponent";
import { TextParallaxContentExample } from "@/components/heroSectionanim/scrollAnim";
import Upcoming from "@/components/upcoming/page";
import SourceOfIncome from "@/components/SourceOfIncome/SourceOfIncome";
import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="min-h-screen w-full snap-start">
        <HeroSection />
      </section>

      {/* Main Content with Gradient Background */}
      <div
        className="bg-gold-gradient"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Membership Section */}
        <section className="min-h-screen w-full snap-start">
          <MembershipPage />
        </section>

        {/* Flag Component Section */}
        <section className="min-h-screen w-full snap-start">
          <FlagComponent />
        </section>

        {/* Our Fleet Section */}
        <section className="min-h-screen w-full snap-start">
          <OurFleetPage />
        </section>

        {/* Source of Income Section */}
        <section className="min-h-screen w-full snap-start">
          <SourceOfIncome />
        </section>

        <section className="min-h-screen w-full snap-start">
          <Upcoming />
        </section>

        {/* Footer Section */}
        <section className="w-full snap-start">
          <Footer />
        </section>
      </div>
    </main>
  );
}

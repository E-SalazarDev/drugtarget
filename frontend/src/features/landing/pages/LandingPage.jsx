// src/features/landing/pages/LandingPage.jsx
import "../styles/landing.css";
import LandingNavbar from "../components/LandingNavbar";
import HeroContent from "../components/HeroContent";
import HeroVisual from "../components/HeroVisual";
import ProblemSection from "../components/ProblemSection";
import HowItWorks from "../components/HowItWorks";
import LandingFooter from "../components/LandingFooter";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#02040C] text-white">

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#02040C]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* HERO */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-1">
          <HeroVisual />
        </div>

        <div className="relative z-20 w-full">
          <LandingNavbar />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
          <section className="relative flex flex-1 flex-col justify-center pb-20 pt-8 lg:max-w-[52%] lg:pb-24 lg:pt-6">
            <HeroContent />
          </section>
        </div>
      </div>

      {/* RESTO DE LA PÁGINA */}
      <div className="relative z-10">
        <ProblemSection />
        <HowItWorks />
        {/* <LandingFooter /> */}
      </div>
    </main>
  );
}
import LandingNavbar from "../components/LandingNavbar";
import HeroContent from "../components/HeroContent";
import HeroVisual from "../components/HeroVisual";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030a09] text-white">
 
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <HeroVisual />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
        <LandingNavbar />

        <section className="relative flex flex-1 flex-col justify-center pb-20 pt-8 lg:max-w-[52%] lg:pb-24 lg:pt-6">
          <HeroContent />
        </section>
      </div>
    </main>
  );
}
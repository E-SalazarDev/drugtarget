// src/features/landing/components/LandingFooter.jsx
export default function LandingFooter() {
  return (
    <footer className="relative w-full px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[#A48BFF] to-[#6D4AF2]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[#F6F6FB]">
              DrugTarget
            </span>
          </div>

          <p className="text-[12.5px] text-[#C4C3D8]">
            Priorizá candidatos a fármaco con Machine Learning
          </p>

          <p className="font-data text-[10.5px] uppercase tracking-[0.18em] text-[#C4C3D8]/70">
            © 2026 DrugTarget
          </p>
        </div>
      </div>
    </footer>
  );
}
// src/features/landing/components/LandingFooter.jsx
export default function LandingFooter() {
  return (
    <footer className="relative w-full px-5 py-12 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#2F6BFF]/20 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#2F6BFF]/30 to-[#0E2A86]">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#29D9FF]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
              </svg>
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[#EAF0FF]">
              DrugTarget
            </span>
          </div>

          <p className="text-[12.5px] text-[#9DB0E0]">
            Priorizá candidatos a fármaco con Machine Learning
          </p>

          <p className="font-data text-[10.5px] uppercase tracking-[0.18em] text-[#9DB0E0]/60">
            © 2026 DrugTarget
          </p>
        </div>
      </div>
    </footer>
  );
}
import { HexMark } from "./LandingUI";

export default function LandingFooter() {
  return (
    <footer className="relative border-t border-teal-200/[0.1] px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-200/20 bg-teal-300/[0.08]">
            <HexMark className="h-4 w-4 text-teal-200" />
          </div>
          <span className="font-display text-[14px] font-semibold text-white/85">
            Drug<span className="font-normal text-teal-200/80">Target</span>
          </span>
        </div>

        <p className="text-[13px] text-[#8fb0aa]">
          Priorizá candidatos a fármaco con Machine Learning
        </p>

        <p className="font-data text-[11px] uppercase tracking-[0.18em] text-teal-100/35">
          © {new Date().getFullYear()} DrugTarget
        </p>
      </div>
    </footer>
  );
}
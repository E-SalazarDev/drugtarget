import { ArrowRight } from "lucide-react";

export default function LandingActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="/app"
        className="group inline-flex items-center gap-2 rounded-full bg-teal-300 px-6 py-3 text-[14px] font-semibold text-[#052e2a] transition-colors hover:bg-teal-200"
      >
        Explorar plataforma
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>

      <a
        href="#como-funciona"
        className="inline-flex items-center gap-2 rounded-full border border-teal-200/25 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:border-teal-200/50 hover:bg-teal-200/[0.06]"
      >
        Cómo funciona
      </a>
    </div>
  );
}
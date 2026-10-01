import { AlertTriangle } from "lucide-react";

export default function ProblemSection() {
  return (
    <section id="plataforma" className="relative px-5 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3.5 py-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
          <span className="text-[12.5px] font-medium text-amber-200/90">El problema</span>
        </div>

        <h2 className="mb-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Sintetizar y testear es caro y lento
        </h2>

        <p className="text-[15.5px] leading-relaxed text-white/55 sm:text-base">
          Sintetizar y testear un compuesto candidato en laboratorio es costoso
          y lleva mucho tiempo.{" "}
          <span className="text-white/80">
            DrugTarget te dice, antes de gastar en eso, qué moléculas tienen
            mayor probabilidad de unirse fuertemente a tu proteína objetivo.
          </span>
        </p>
      </div>
    </section>
  );
}
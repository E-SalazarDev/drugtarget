import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function LandingActions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-4">
      
      <button
        onClick={() => navigate("/app")}
        className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-[14px] font-semibold text-[#0a0f1c] shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
      >
        Explorar plataforma
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <button
        onClick={() => {
          const el = document.getElementById("how-it-works");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-transparent px-6 py-3 text-[14px] font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/4 hover:text-white"
      >
        Cómo funciona
      </button>
    </div>
  );
}
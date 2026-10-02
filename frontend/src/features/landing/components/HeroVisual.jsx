// src/features/landing/components/HeroVisual.jsx
import { useEffect, useRef, useState } from "react";
import helixVideo from "../../../assets/hero-helix-3.mp4";

export default function HeroVisual() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    v.playbackRate = 0.6;
    const play = () => {
      v.playbackRate = 0.6;
      v.play().catch(() => {});
      requestAnimationFrame(() => setReady(true));
    };
    if (v.readyState >= 3) play();
    v.addEventListener("canplay", play);
    return () => v.removeEventListener("canplay", play);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let w = 0;
    let h = 0;

    const particles = Array.from({ length: 170 }, () => {
      return {
        x: Math.random(),
        y: Math.random(),
        r: 0.3 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.00025,
        vy: (Math.random() - 0.5) * 0.00025,
        a: 0.1 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let t = 0;
    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const x = p.x * w;
        const y = p.y * h;
        const tw = 0.85 + Math.sin(t * 2 + p.phase) * 0.15;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5);
        grad.addColorStop(0, `rgba(255,255,255, ${p.a * tw})`);
        grad.addColorStop(1, `rgba(255,255,255, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={helixVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "62% 45%",
            filter: "brightness(0.95) contrast(1.1) saturate(0.9)",
            opacity: ready ? 1 : 0,
            transition: "opacity 1600ms ease-out",
          }}
        />

        {/* Scrim lateral izquierdo */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1800ms ease-out",
            background: `
              linear-gradient(to right,
                rgba(2,4,12,1) 0%,
                rgba(2,4,12,0.98) 18%,
                rgba(2,4,12,0.92) 32%,
                rgba(2,4,12,0.7) 48%,
                rgba(2,4,12,0.25) 65%,
                transparent 80%
              )
            `,
          }}
        />

        {/* Scrim radial zona media-izquierda */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1800ms ease-out",
            background: `
              radial-gradient(ellipse 55% 100% at 22% 55%, rgba(2,4,12,0.9) 0%, rgba(2,4,12,0.55) 45%, transparent 75%)
            `,
          }}
        />

        {/* Viñeta lateral derecha */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1800ms ease-out",
            background:
              "radial-gradient(ellipse 20% 50% at 96% 55%, rgba(2,4,12,0.85) 0%, rgba(2,4,12,0.4) 40%, transparent 70%)",
          }}
        />

        {/* Halos difusos: cobalto, violeta y azul profundo */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.11 : 0,
            transition: "opacity 2400ms ease-out",
            background:
              "radial-gradient(ellipse 42% 52% at 14% 28%, rgba(47,107,255,0.75) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.1 : 0,
            transition: "opacity 2400ms ease-out 200ms",
            background:
              "radial-gradient(ellipse 38% 48% at 78% 42%, rgba(138,124,255,0.5) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.09 : 0,
            transition: "opacity 2400ms ease-out 400ms",
            background:
              "radial-gradient(ellipse 32% 42% at 92% 78%, rgba(47,107,255,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.08 : 0,
            transition: "opacity 2400ms ease-out 600ms",
            background:
              "radial-gradient(ellipse 30% 38% at 88% 18%, rgba(138,124,255,0.55) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.06 : 0,
            transition: "opacity 2400ms ease-out 800ms",
            background:
              "radial-gradient(ellipse 26% 34% at 62% 88%, rgba(47,107,255,0.4) 0%, transparent 75%)",
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-2"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 2400ms ease-out",
          maskImage:
            "linear-gradient(to right, transparent 0%, transparent 35%, black 55%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, transparent 35%, black 55%, black 100%)",
        }}
        aria-hidden
      />

      <MetricsPanel ready={ready} />
    </div>
  );
}

function MetricsPanel({ ready }) {
  const metrics = [
    { label: "Predicción", value: "pKd 7.2", note: "afinidad" },
    { label: "Dataset", value: "68 × 378", note: "moléculas · dianas" },
    { label: "Modelo", value: "CI 0.85", note: "concordance" },
  ];

  return (
    <div
      className="pointer-events-none absolute right-6 z-3 hidden w-47.5 flex-col lg:flex xl:right-10"
      style={{
        top: "55%",
        opacity: ready ? 1 : 0,
        transform: `translateY(-50%) translateX(${ready ? 0 : 12}px)`,
        transition:
          "opacity 1800ms ease-out 700ms, transform 1800ms ease-out 700ms",
      }}
    >
      <div
        className="rounded-xl border border-[#101A48] p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(2,4,12,0.75) 0%, rgba(2,4,12,0.55) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="space-y-6">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#29D9FF]">
                {m.label}
              </span>
              <span className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#EAF0FF] tabular-nums">
                {m.value}
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[#DCE6FF]">
                {m.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
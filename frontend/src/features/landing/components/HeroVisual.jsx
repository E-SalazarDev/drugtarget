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

    const tints = [
      { r: 220, g: 235, b: 245, w: 0.6 },
      { r: 130, g: 200, b: 220, w: 0.25 },
      { r: 120, g: 180, b: 200, w: 0.15 },
    ];
    const pickTint = () => {
      const r = Math.random();
      let acc = 0;
      for (const t of tints) {
        acc += t.w;
        if (r <= acc) return t;
      }
      return tints[0];
    };

    const particles = Array.from({ length: 35 }, () => {
      const tint = pickTint();
      return {
        x: Math.random(),
        y: Math.random(),
        r: 0.25 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.00015,
        vy: (Math.random() - 0.5) * 0.00015,
        a: 0.05 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
        tint,
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
      t += 0.004;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const x = p.x * w;
        const y = p.y * h;
        const tw = 0.85 + Math.sin(t * 2 + p.phase) * 0.15;
        const { r, g, b } = p.tint;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.r * 6);
        grad.addColorStop(0, `rgba(${r},${g},${b}, ${p.a * tw})`);
        grad.addColorStop(1, `rgba(${r},${g},${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 6, 0, Math.PI * 2);
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
            filter: "brightness(0.98) contrast(1.08) saturate(0.95)",
            opacity: ready ? 1 : 0,
            transition: "opacity 1600ms ease-out",
          }}
        />

        {/* 🔥 SCRIM LATERAL FUERTE — zona izquierda completamente oscura para el texto */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1800ms ease-out",
            background: `
              linear-gradient(to right,
                rgba(4,10,16,1) 0%,
                rgba(4,10,16,0.98) 18%,
                rgba(4,10,16,0.92) 32%,
                rgba(4,10,16,0.7) 48%,
                rgba(4,10,16,0.25) 65%,
                transparent 80%
              )
            `,
          }}
        />

        {/* Scrim radial extra en la zona media-izquierda (más oscuridad) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1800ms ease-out",
            background: `
              radial-gradient(ellipse 55% 100% at 22% 55%, rgba(3,8,14,0.9) 0%, rgba(3,8,14,0.55) 45%, transparent 75%)
            `,
          }}
        />

        {/* Viñeta lateral derecha para el panel de métricas */}
        <div
          className="absolute inset-0"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1800ms ease-out",
            background:
              "radial-gradient(ellipse 26% 60% at 94% 60%, rgba(3,8,14,0.9) 0%, rgba(3,8,14,0.55) 40%, transparent 72%)",
          }}
        />

        {/* Halos ocean (encima del video) */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.28 : 0,
            transition: "opacity 2400ms ease-out",
            background:
              "radial-gradient(ellipse 45% 60% at 15% 35%, rgba(34,211,238,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.22 : 0,
            transition: "opacity 2400ms ease-out 200ms",
            background:
              "radial-gradient(ellipse 50% 65% at 85% 60%, rgba(20,184,166,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.3 : 0,
            transition: "opacity 2400ms ease-out 400ms",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 95%, rgba(14,116,144,0.55) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: ready ? 0.12 : 0,
            transition: "opacity 2400ms ease-out 600ms",
            background:
              "radial-gradient(ellipse 35% 45% at 92% 15%, rgba(139,92,246,0.4) 0%, transparent 75%)",
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[2]"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 2400ms ease-out",
        }}
        aria-hidden
      />

      <MetricsPanel ready={ready} />
    </div>
  );
}

function MetricsPanel({ ready }) {
  const metrics = [
    { label: "Predicción", value: "pKd 7.2", note: "afinidad estimada", accent: "emerald" },
    { label: "Dataset", value: "68 × 378", note: "moléculas · dianas", accent: "cyan" },
    { label: "Modelo", value: "CI 0.85", note: "concordance index", accent: "violet" },
  ];

  const accentColors = {
    emerald: { line: "rgba(52,211,153,0.9)", label: "rgba(167,243,208,1)" },
    cyan: { line: "rgba(34,211,238,0.9)", label: "rgba(165,243,252,1)" },
    violet: { line: "rgba(167,139,250,0.9)", label: "rgba(221,214,254,1)" },
  };

  return (
    <div
      className="pointer-events-none absolute right-10 z-[3] hidden w-[230px] flex-col lg:flex xl:right-16"
      style={{
        top: "60%",
        opacity: ready ? 1 : 0,
        transform: `translateY(-50%) translateX(${ready ? 0 : 12}px)`,
        transition:
          "opacity 1800ms ease-out 700ms, transform 1800ms ease-out 700ms",
      }}
    >
      <div
        className="rounded-2xl border border-white/[0.08] p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,14,22,0.85) 0%, rgba(6,14,22,0.7) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {metrics.map((m, i) => {
          const colors = accentColors[m.accent];
          return (
            <div
              key={m.label}
              className="flex flex-col gap-1.5 py-4"
              style={{
                borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-px w-4"
                  style={{ background: colors.line }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.28em]"
                  style={{ color: colors.label }}
                >
                  {m.label}
                </span>
              </div>
              <span className="text-[26px] font-bold leading-none tracking-[-0.02em] text-white tabular-nums">
                {m.value}
              </span>
              <span className="text-[11.5px] font-medium tracking-wide text-white/75">
                {m.note}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
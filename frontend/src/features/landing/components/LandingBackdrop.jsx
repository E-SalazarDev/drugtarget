// export default function LandingBackdrop() {
//   return (
//     <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
//       {/* Base: verde profundo desaturado, distribuido */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 120% 100% at 50% 40%, #08201c 0%, #051412 55%, #030a09 100%)",
//         }}
//       />

//       {/* Halo esmeralda IZQUIERDA — baja intensidad */}
//       <div
//         className="absolute -left-[20%] top-[10%] h-[65%] w-[60%] rounded-full opacity-45 blur-[150px]"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.06) 45%, transparent 75%)",
//         }}
//       />

//       {/* Halo esmeralda DERECHA — misma intensidad, mismo tamaño */}
//       <div
//         className="absolute -right-[20%] top-[5%] h-[65%] w-[60%] rounded-full opacity-45 blur-[150px]"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.06) 45%, transparent 75%)",
//         }}
//       />

//       {/* Halo teal centro-inferior — suaviza el centro */}
//       <div
//         className="absolute bottom-[-20%] left-[20%] h-[55%] w-[60%] rounded-full opacity-30 blur-[140px]"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)",
//         }}
//       />

//       {/* Grid técnica verde MUY tenue */}
//       <div
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(110,231,183,0.6) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(110,231,183,0.6) 1px, transparent 1px)
//           `,
//           backgroundSize: "90px 90px",
//           maskImage:
//             "radial-gradient(ellipse 100% 80% at 50% 40%, black 20%, transparent 75%)",
//           WebkitMaskImage:
//             "radial-gradient(ellipse 100% 80% at 50% 40%, black 20%, transparent 75%)",
//         }}
//       />
//     </div>
//   );
// }
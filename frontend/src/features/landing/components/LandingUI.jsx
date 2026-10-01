// Piezas visuales compartidas: esquinas de instrumento, etiqueta de sección y logo.

export function CornerTicks({ className = "", color = "border-teal-200/35", size = "h-2.5 w-2.5" }) {
  const base = `pointer-events-none absolute ${size} ${color} ${className}`;
  return (
    <>
      <span className={`${base} -left-px -top-px border-l border-t`} />
      <span className={`${base} -right-px -top-px border-r border-t`} />
      <span className={`${base} -bottom-px -left-px border-b border-l`} />
      <span className={`${base} -bottom-px -right-px border-b border-r`} />
    </>
  );
}

export function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 font-data text-[11px] font-medium uppercase tracking-[0.22em] text-teal-200/75">
      <span className="text-teal-200/45">{index}</span>
      <span className="h-px w-8 bg-teal-200/30" />
      <span>{children}</span>
    </div>
  );
}

// Marca: anillo hexagonal (como una molécula de benceno) con un núcleo
export function HexMark({ className = "h-[18px] w-[18px] text-teal-200" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2.5 20.2 7.25v9.5L12 21.5l-8.2-4.75v-9.5L12 2.5Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5V9M20.2 16.75 14.6 13.5M3.8 16.75l5.6-3.25" />
    </svg>
  );
}
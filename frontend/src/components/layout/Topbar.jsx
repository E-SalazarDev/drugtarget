import { Bell, CircleHelp } from 'lucide-react'

function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-19 items-center justify-between border-b border-[#202833] bg-[#080B10]/90 px-8 backdrop-blur-xl">
      <div>
        <p className="text-xs text-slate-600">
          Plataforma de investigación
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Ayuda"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/4 hover:text-slate-300"
        >
          <CircleHelp className="h-4.5 w-4.5" strokeWidth={1.7} />
        </button>

        <button
          type="button"
          aria-label="Notificaciones"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/4 hover:text-slate-300"
        >
          <Bell className="h-4.5 w-4.5" strokeWidth={1.7} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
        </button>

        <div className="ml-2 h-7 w-px bg-[#202833]" />

        <div className="ml-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-cyan-400/20 to-violet-400/20 text-xs font-medium text-cyan-200">
            E
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-medium text-slate-300">
              Eduardo
            </p>
            <p className="text-[10px] text-slate-600">
              Investigador
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
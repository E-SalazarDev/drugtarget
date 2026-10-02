import {
  Activity,
  Atom,
  Beaker,
  BrainCircuit,
  Database,
  Dna,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  {
    label: 'Resumen',
    path: '/app',
    icon: LayoutDashboard,
  },
  {
    label: 'Moléculas',
    path: '/app/molecules',
    icon: Atom,
  },
  {
    label: 'Proteínas',
    path: '/app/proteins',
    icon: Dna,
  },
  {
    label: 'Predicciones',
    path: '/app/predictions',
    icon: BrainCircuit,
  },
]

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-65 flex-col border-r border-[#202833] bg-[#0A0E14]">
      {/* Logo */}
      <div className="flex h-19 items-center border-b border-[#202833] px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <Beaker className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <p className="text-[15px] font-semibold tracking-wide text-white">
              DRUGTARGET
            </p>

            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Descubrimiento computacional
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-7">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Espacio de trabajo
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200',
                    isActive
                      ? 'bg-cyan-400/10 text-cyan-300'
                      : 'text-slate-400 hover:bg-white/[0.035] hover:text-slate-200',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={[
                        'h-4.5 w-4.5 transition-colors',
                        isActive
                          ? 'text-cyan-300'
                          : 'text-slate-500 group-hover:text-slate-300',
                      ].join(' ')}
                      strokeWidth={1.7}
                    />

                    <span>{item.label}</span>

                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </div>

        <div className="my-7 border-t border-[#202833]" />

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Sistema
        </p>

        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-white/[0.035] hover:text-slate-300"
        >
          <Settings
            className="h-4.5 w-4.5 text-slate-600 group-hover:text-slate-400"
            strokeWidth={1.7}
          />

          <span>Configuración</span>
        </button>
      </nav>

      {/* API status */}
      <div className="border-t border-[#202833] p-4">
        <div className="rounded-xl border border-[#202833] bg-[#0F141C] p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-xs font-medium text-slate-300">
              API conectada
            </span>
          </div>

          <p className="mt-1 pl-4 text-[10px] text-slate-600">
            FastAPI · localhost:8000
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
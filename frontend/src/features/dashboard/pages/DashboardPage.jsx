import {
  ArrowRight,
  Atom,
  BrainCircuit,
  Dna,
  FlaskConical,
  Plus,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  {
    label: 'Moléculas registradas',
    value: '68',
    description: 'Compuestos disponibles',
    icon: Atom,
  },
  {
    label: 'Proteínas registradas',
    value: '378',
    description: 'Dianas disponibles',
    icon: Dna,
  },
  {
    label: 'Predicciones',
    value: '—',
    description: 'Modelo en construcción',
    icon: BrainCircuit,
  },
]

const actions = [
  {
    title: 'Registrar molécula',
    description: 'Añade un compuesto mediante su representación SMILES.',
    path: '/molecules/new',
    icon: Atom,
  },
  {
    title: 'Registrar proteína',
    description: 'Añade una nueva diana mediante su secuencia.',
    path: '/proteins/new',
    icon: Dna,
  },
  {
    title: 'Explorar predicciones',
    description: 'Consulta candidatos priorizados para una proteína.',
    path: '/predictions',
    icon: BrainCircuit,
  },
]

function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[#202833] bg-[#0D1219] px-8 py-10">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/[0.07] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-violet-500/[0.05] blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1.5">
            <FlaskConical className="h-3.5 w-3.5 text-cyan-300" />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-300">
              Descubrimiento de fármacos
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prioriza candidatos antes de
            <span className="text-cyan-300"> sintetizarlos.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            DrugTarget combina información molecular y biológica para
            estudiar la afinidad de unión entre compuestos y proteínas
            objetivo.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/predictions"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-xs font-semibold text-[#071014] transition hover:bg-cyan-200"
            >
              Explorar predicciones
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/molecules/new"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2A3542] bg-[#111821] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:border-[#3A4858] hover:text-white"
            >
              <Plus className="h-4 w-4" />
              Registrar molécula
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#202833] bg-[#0F141C] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-600">
                    {stat.description}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#26313D] bg-[#151C26]">
                  <Icon
                    className="h-[17px] w-[17px] text-cyan-300"
                    strokeWidth={1.6}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Actions */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-white">
            Acciones rápidas
          </h2>

          <p className="mt-1 text-xs text-slate-600">
            Accede directamente a las operaciones principales.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.title}
                to={action.path}
                className="group rounded-2xl border border-[#202833] bg-[#0F141C] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#334150] hover:bg-[#111821]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#27333F] bg-[#151C26]">
                    <Icon
                      className="h-[18px] w-[18px] text-slate-300 transition group-hover:text-cyan-300"
                      strokeWidth={1.6}
                    />
                  </div>

                  <ArrowRight
                    className="h-4 w-4 text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-300"
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className="mt-5 text-sm font-medium text-slate-200">
                  {action.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {action.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
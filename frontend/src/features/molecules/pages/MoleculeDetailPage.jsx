import { useParams } from 'react-router-dom'

function MoleculeDetailPage() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Detalle de molécula
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Molécula: {id}
      </p>
    </div>
  )
}

export default MoleculeDetailPage
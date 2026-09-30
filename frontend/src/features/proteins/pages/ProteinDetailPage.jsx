import { useParams } from 'react-router-dom'

function ProteinDetailPage() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Detalle de proteína
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Proteína: {id}
      </p>
    </div>
  )
}

export default ProteinDetailPage
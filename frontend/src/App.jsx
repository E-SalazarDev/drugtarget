import { Navigate, Route, Routes } from 'react-router-dom'

import AppShell from './components/layout/AppShell'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import MoleculesPage from './features/molecules/pages/MoleculesPage'
import NewMoleculePage from './features/molecules/pages/NewMoleculePage'
import MoleculeDetailPage from './features/molecules/pages/MoleculeDetailPage'
import ProteinsPage from './features/proteins/pages/ProteinsPage'
import NewProteinPage from './features/proteins/pages/NewProteinPage'
import ProteinDetailPage from './features/proteins/pages/ProteinDetailPage'
import PredictionsPage from './features/predictions/pages/PredictionsPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />

        <Route path="molecules">
          <Route index element={<MoleculesPage />} />
          <Route path="new" element={<NewMoleculePage />} />
          <Route path=":id" element={<MoleculeDetailPage />} />
        </Route>

        <Route path="proteins">
          <Route index element={<ProteinsPage />} />
          <Route path="new" element={<NewProteinPage />} />
          <Route path=":id" element={<ProteinDetailPage />} />
        </Route>

        <Route path="predictions" element={<PredictionsPage />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  )
}

export default App
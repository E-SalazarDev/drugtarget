import { Navigate, Route, Routes } from "react-router-dom";

import AppShell from "./components/layout/AppShell";
import LandingPage from "./features/landing/pages/LandingPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";

import MoleculesPage from "./features/molecules/pages/MoleculesPage";
import NewMoleculePage from "./features/molecules/pages/NewMoleculePage";
import MoleculeDetailPage from "./features/molecules/pages/MoleculeDetailPage";

import ProteinsPage from "./features/proteins/pages/ProteinsPage";
import NewProteinPage from "./features/proteins/pages/NewProteinPage";
import ProteinDetailPage from "./features/proteins/pages/ProteinDetailPage";

import PredictionsPage from "./features/predictions/pages/PredictionsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/app" element={<AppShell />}>
        <Route index element={<DashboardPage />} />

        {/* MOLÉCULAS — rutas planas, sin anidar */}
        <Route path="molecules" element={<MoleculesPage />} />
        <Route path="molecules/new" element={<NewMoleculePage />} />
        <Route path="molecules/:id" element={<MoleculeDetailPage />} />

        {/* PROTEÍNAS — rutas planas */}
        <Route path="proteins" element={<ProteinsPage />} />
        <Route path="proteins/new" element={<NewProteinPage />} />
        <Route path="proteins/:id" element={<ProteinDetailPage />} />

        {/* PREDICCIONES */}
        <Route path="predictions" element={<PredictionsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
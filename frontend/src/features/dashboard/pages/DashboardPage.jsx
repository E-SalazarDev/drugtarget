import HeroCard from "../components/HeroCard";
import DatasetExplorer from "../components/DatasetExplorer";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <HeroCard />
      <DatasetExplorer />
    </div>
  );
}
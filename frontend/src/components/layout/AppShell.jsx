import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

function AppShell() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--bg-page-gradient)",
        color: "var(--text-primary)",
      }}
    >
      <Topbar />

      <main className="px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
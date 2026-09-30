import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

function AppShell() {
  return (
    <div className="min-h-screen bg-[#080B10] text-slate-100">
      <Sidebar />

      <div className="min-h-screen pl-65">
        <Topbar />

        <main className="px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppShell
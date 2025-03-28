import { Outlet } from 'react-router'
import TopBar from './components/nav-bar/TopBar'
import BottomBar from './components/nav-bar/BottomBar'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopBar />
      <main className="flex-grow pt-20 pb-16 px-4">
        <Outlet />
      </main>
      <BottomBar />
    </div>
  )
}

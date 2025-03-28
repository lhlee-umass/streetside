import { Link, useRouter } from 'react-router'
import { FiHome, FiMail, FiUser, FiSettings } from 'react-icons/fi'

export default function TopBar() {
  const router = useRouter()

  // Check active route by comparing paths
  const isActive = (path: string) => {
    return router.state.location.pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-green-700 text-white p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold flex items-center hover:text-green-200"
        >
          <span className="mr-2">🌱</span>
          EcoSwap
        </Link>
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`flex flex-col items-center ${isActive('/') ? 'text-green-300' : 'hover:text-green-200'}`}
          >
            <FiHome className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/messages"
            className={`flex flex-col items-center ${isActive('/messages') ? 'text-green-300' : 'hover:text-green-200'}`}
          >
            <FiMail className="w-6 h-6" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center ${isActive('/profile') ? 'text-green-300' : 'hover:text-green-200'}`}
          >
            <FiUser className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link
            to="/settings"
            className={`flex flex-col items-center ${isActive('/settings') ? 'text-green-300' : 'hover:text-green-200'}`}
          >
            <FiSettings className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

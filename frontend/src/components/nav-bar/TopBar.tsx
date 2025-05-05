// Import Link from react-router for navigation between pages
import { Link } from 'react-router'

// Import icon components from react-icons for UI elements
import { FiHome, FiMail, FiUser, FiSettings } from 'react-icons/fi'

// Define and export the TopBar component
export default function TopBar() {
  return (
    // Navigation bar fixed at the top with styling
    <nav className="fixed top-0 left-0 right-0 bg-green-700 text-white p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Link to the homepage with a logo/icon and name */}
        <Link
          to="/"
          className="text-xl font-bold flex items-center hover:text-green-200"
        >
          <span className="mr-2">♻️👜</span>  {/* Emoji logo */}
          streetside                              {/* Application name */}
        </Link>
        
        {/* Navigation icons grouped in a flex container with space between them */}
        <div className="flex space-x-6">
          
          {/* Link to the homepage */}
          <Link
            to="/"
            className="flex flex-col items-center hover:text-green-200"
          >
            <FiHome className="w-6 h-6" />          {/* Home icon */}
            <span className="text-xs mt-1">Home</span>  {/* Label */}
          </Link>
          
          {/* Link to the messages page */}
          <Link
            to="/messages"
            className="flex flex-col items-center hover:text-green-200"
          >
            <FiMail className="w-6 h-6" />           {/* Mail icon */}
            <span className="text-xs mt-1">Messages</span> {/* Label */}
          </Link>
          
          {/* Link to the user profile page */}
          <Link
            to="/profile"
            className="flex flex-col items-center hover:text-green-200"
          >
            <FiUser className="w-6 h-6" />           {/* User profile icon */}
            <span className="text-xs mt-1">Profile</span>  {/* Label */}
          </Link>
          
          {/* Link to the settings page */}
          <Link
            to="/settings"
            className="flex flex-col items-center hover:text-green-200"
          >
            <FiSettings className="w-6 h-6" />      {/* Settings icon */}
            <span className="text-xs mt-1">Settings</span> {/* Label */}
          </Link>
          
        </div>
      </div>
    </nav>
  )
}

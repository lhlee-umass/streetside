// Import Link from react-router to enable client-side navigation
import { Link } from 'react-router'

// Import icons from react-icons library
import { FiFilter, FiShoppingCart, FiMap, FiUsers } from 'react-icons/fi'

// Define and export the BottomBar component
export default function BottomBar() {
  return (
    // Fixed navigation bar at the bottom of the screen with styling
    <nav className="fixed bottom-0 left-0 right-0 bg-green-700 text-white p-3 shadow-lg z-10">
      <div className="container mx-auto flex justify-around items-center">
        
        {/* Link to the filter page with icon and label */}
        <Link
          to="/filter"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiFilter className="w-6 h-6" />                {/* Filter icon */}
          <span className="text-xs mt-1">Filter</span>     {/* Label */}
        </Link>

        {/* Link to the shopping cart page */}
        <Link
          to="/cart"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiShoppingCart className="w-6 h-6" />           {/* Cart icon */}
          <span className="text-xs mt-1">Shopping Cart</span>
        </Link>

        {/* Link to the local map or listings page */}
        <Link
          to="/map"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiMap className="w-6 h-6" />                    {/* Map icon */}
          <span className="text-xs mt-1">Local</span>      {/* Label */}
        </Link>

        {/* Link to the community page */}
        <Link
          to="/community"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiUsers className="w-6 h-6" />                  {/* Users/community icon */}
          <span className="text-xs mt-1">Community</span>
        </Link>
        
      </div>
    </nav>
  )
}

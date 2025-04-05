import { Link } from 'react-router'
import { FiFilter, FiShoppingCart, FiMap, FiUsers } from 'react-icons/fi'

export default function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-green-700 text-white p-3 shadow-lg z-10">
      <div className="container mx-auto flex justify-around items-center">
        <Link
          to="/filter"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiFilter className="w-6 h-6" />
          <span className="text-xs mt-1">Filter</span>
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiShoppingCart className="w-6 h-6" />
          <span className="text-xs mt-1">Shopping Cart</span>
        </Link>
        <Link
          to="/map"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiMap className="w-6 h-6" />
          <span className="text-xs mt-1">Local</span>
        </Link>
        <Link
          to="/community"
          className="flex flex-col items-center hover:text-green-200"
        >
          <FiUsers className="w-6 h-6" />
          <span className="text-xs mt-1">Community</span>
        </Link>
      </div>
    </nav>
  )
}

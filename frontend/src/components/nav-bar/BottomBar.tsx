import React from 'react'
import { Link } from 'react-router'
import { useLocation } from 'react-router'
import {
  FaFilter as FilterIcon,
  FaShoppingCart as CartIcon,
  FaMapMarkerAlt as MapIcon,
  FaUsers as CommunityIcon,
} from 'react-icons/fa'
import { useCart } from '../../hooks/useCart'

const BottomBar: React.FC = () => {
  const location = useLocation()
  const { cartCount } = useCart()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-green-700 text-white p-3 shadow-lg z-10">
      <div className="container mx-auto flex justify-around items-center">
        <Link
          to="/filter"
          className={`flex flex-col items-center ${isActive('/filter') ? 'text-green-300' : 'hover:text-green-200'}`}
        >
          <FilterIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Filter</span>
        </Link>
        <Link
          to="/cart"
          className={`flex flex-col items-center relative ${isActive('/cart') ? 'text-green-300' : 'hover:text-green-200'}`}
        >
          <div className="relative">
            <CartIcon className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">Cart</span>
        </Link>
        <Link
          to="/map"
          className={`flex flex-col items-center ${isActive('/map') ? 'text-green-300' : 'hover:text-green-200'}`}
        >
          <MapIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Local</span>
        </Link>
        <Link
          to="/community"
          className={`flex flex-col items-center ${isActive('/community') ? 'text-green-300' : 'hover:text-green-200'}`}
        >
          <CommunityIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Community</span>
        </Link>
      </div>
    </nav>
  )
}

export default BottomBar

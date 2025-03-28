import { useState, useEffect } from 'react'

export function useCart() {
  const [cartCount, setCartCount] = useState<number>(0)

  // Load cart count from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        setCartCount(cartItems.length)
      } catch (error) {
        console.error('Failed to parse cart data', error)
      }
    }
  }, [])

  // Function to update cart count (you can call this when adding/removing items)
  const updateCartCount = (count: number) => {
    setCartCount(count)
  }

  return {
    cartCount,
    updateCartCount,
  }
}

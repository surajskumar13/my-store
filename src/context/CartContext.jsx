import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  function addToCart(product) {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function decreaseQty(id) {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  function removeFromCart(id) {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      decreaseQty,
      removeFromCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
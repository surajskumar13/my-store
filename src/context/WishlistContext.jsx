import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([])

  function addToWishlist(product) {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  function removeFromWishlist(id) {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  function isWishlisted(id) {
    return wishlistItems.some(item => item.id === id)
  }

  const totalWishlist = wishlistItems.length

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isWishlisted,
      totalWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
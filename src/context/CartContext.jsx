import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'katys-korner-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

  function getCartItemId(product, selectedSize, selectedColor) {
    const size = selectedSize || ''
    const color = selectedColor || ''
    return `${product.id}|${size}|${color}`
  }

  function addToCart(product, selectedSize, selectedColor, qty = 1) {
    const cartItemId = getCartItemId(product, selectedSize, selectedColor)
    setItems((prev) => {
      const found = prev.find((i) => i.cartItemId === cartItemId)
      if (found) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedSize: selectedSize || null,
          selectedColor: selectedColor || null,
          qty,
        },
      ]
    })
  }

  function updateQty(cartItemId, qty) {
    if (qty < 1) return removeItem(cartItemId)
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, qty } : i))
    )
  }

  function removeItem(cartItemId) {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId))
  }

  function clearCart() {
    setItems([])
  }

  const value = {
    items,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

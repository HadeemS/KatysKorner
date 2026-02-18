import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'

export default function Cart() {
  const { items, updateQty, removeItem } = useCart()
  const [removing, setRemoving] = useState(null)

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.qty, 0)

  function handleRemove(cartItemId) {
    setRemoving(cartItemId)
    setTimeout(() => {
      removeItem(cartItemId)
      setRemoving(null)
    }, 250)
  }

  const categories = [...new Set(items.map((i) => i.product.category))]
  const youMayLike = productsData
    .filter((p) => !items.some((i) => i.product.id === p.id) && categories.some((c) => c === p.category))
    .slice(0, 4)

  if (items.length === 0) {
    return (
      <main className="cart page">
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </main>
    )
  }

  return (
    <main className="cart page">
      <h1>Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          <ul className="cart-list">
            {items.map((item) => (
              <li
                key={item.cartItemId}
                className={`cart-item ${removing === item.cartItemId ? 'cart-item-removing' : ''}`}
              >
                <div className="cart-item-image">
                  {item.product.image ? (
                    <img src={item.product.image} alt={item.product.name} />
                  ) : (
                    <div className="product-card-placeholder" aria-hidden="true" />
                  )}
                </div>
                <div className="cart-item-details">
                  <h2>{item.product.name}</h2>
                  {(item.selectedSize || item.selectedColor) && (
                    <p className="cart-item-variant">
                      {[item.selectedSize, item.selectedColor].filter(Boolean).join(' / ')}
                    </p>
                  )}
                  <p className="cart-item-price">{formatCurrency(item.product.price * item.qty)}</p>
                  <div className="cart-item-actions">
                    <div className="qty-stepper">
                      <button
                        type="button"
                        onClick={() => updateQty(item.cartItemId, Math.max(1, item.qty - 1))}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateQty(item.cartItemId, Math.max(1, parseInt(e.target.value, 10) || 1))}
                        aria-label={`Quantity for ${item.product.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-small"
                      onClick={() => handleRemove(item.cartItemId)}
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      Remove
                    </button>
                    <a
                      href={item.product.checkoutUrl}
                      className="btn btn-primary"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <p className="cart-note">Each item has its own checkout link. Complete one checkout per item.</p>
        </aside>
      </div>

      {youMayLike.length > 0 && (
        <section className="you-may-like">
          <h2 className="section-title">You may also like</h2>
          <div className="you-may-like-grid">
            {youMayLike.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

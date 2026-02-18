import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'

export default function Cart() {
  const { items, updateQty, removeItem } = useCart()

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
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.cartItemId} className="cart-item">
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
                <label htmlFor={`qty-${item.cartItemId}`} className="sr-only">Quantity for {item.product.name}</label>
                <input
                  id={`qty-${item.cartItemId}`}
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item.cartItemId, Math.max(1, parseInt(e.target.value, 10) || 1))}
                  aria-label={`Quantity for ${item.product.name}`}
                />
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={() => removeItem(item.cartItemId)}
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
      <p className="cart-note">Each item has its own checkout link. Complete one checkout per item.</p>
    </main>
  )
}

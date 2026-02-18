import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import productsData from '../data/products.json'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [qty, setQty] = useState(1)

  const product = productsData.find((p) => p.id === id)
  if (!product) {
    return (
      <main className="page">
        <p>Product not found.</p>
        <button type="button" className="btn" onClick={() => navigate('/shop')}>Back to Shop</button>
      </main>
    )
  }

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0
  const hasColors = Array.isArray(product.colors) && product.colors.length > 0

  function handleAddToCart() {
    if (hasSizes && !selectedSize) return
    if (hasColors && !selectedColor) return
    addToCart(product, hasSizes ? selectedSize : null, hasColors ? selectedColor : null, qty)
    navigate('/cart')
  }

  function handleBuyNow() {
    if (product.checkoutUrl) window.location.href = product.checkoutUrl
  }

  return (
    <main className="product-detail page">
      <div className="product-detail-grid">
        <div className="product-detail-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="product-card-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-price">{formatCurrency(product.price)}</p>
          <p className="product-detail-desc">{product.description}</p>
          {hasSizes && (
            <div>
              <label htmlFor="product-size">Size</label>
              <select
                id="product-size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                required={hasSizes}
                aria-required={hasSizes}
              >
                <option value="">Select size</option>
                {product.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
          {hasColors && (
            <div>
              <label htmlFor="product-color">Color</label>
              <select
                id="product-color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                required={hasColors}
                aria-required={hasColors}
              >
                <option value="">Select color</option>
                {product.colors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
          <div className="product-detail-actions">
            <label htmlFor="product-qty">Quantity</label>
            <input
              id="product-qty"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
              aria-label="Quantity"
            />
            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import productsData from '../data/products.json'

const COLOR_HEX = {
  'Forest Green': '#2d5a3d',
  'Cream': '#f5f5dc',
  'Black': '#1a1a1a',
  'Olive': '#6b8e23',
  'White': '#ffffff',
  'Navy': '#000080',
  'Grey': '#808080',
  'Gray': '#808080',
  'Green': '#2d5a3d',
}

function getColorHex(name) {
  return COLOR_HEX[name] || '#c5cec8'
}

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
        <button type="button" className="btn btn-primary" onClick={() => navigate('/shop')}>Back to Shop</button>
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
              <label>Size</label>
              <div className="size-pills">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-pill ${selectedSize === s ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(s)}
                    aria-pressed={selectedSize === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasColors && (
            <div style={{ marginTop: '1rem' }}>
              <label>Color</label>
              <div className="color-swatches">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`color-swatch ${selectedColor === c ? 'selected' : ''}`}
                    style={{ backgroundColor: getColorHex(c) }}
                    onClick={() => setSelectedColor(c)}
                    aria-pressed={selectedColor === c}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="product-detail-actions">
            <label style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem' }}>Quantity</label>
            <div className="qty-stepper">
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
                aria-label="Quantity"
              />
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          <div className="details-accordion">
            <details>
              <summary>Material</summary>
              <div className="accordion-body">
                Premium cotton blend. Soft, durable, and built to last.
              </div>
            </details>
            <details>
              <summary>Care</summary>
              <div className="accordion-body">
                Machine wash cold. Tumble dry low. Do not bleach.
              </div>
            </details>
            <details>
              <summary>Shipping</summary>
              <div className="accordion-body">
                Ships within 3–5 business days. Free shipping on orders over $50.
              </div>
            </details>
          </div>
        </div>
      </div>
    </main>
  )
}

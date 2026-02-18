import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'

const CATEGORIES = ['All', 'Hoodies', 'Joggers', 'Shirts', 'Mugs', 'Cups', 'Accessories']

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [qty, setQty] = useState(1)

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0
  const hasColors = Array.isArray(product.colors) && product.colors.length > 0

  const handleAdd = useCallback(() => {
    if (hasSizes && !selectedSize) return
    if (hasColors && !selectedColor) return
    onAddToCart(product, hasSizes ? selectedSize : null, hasColors ? selectedColor : null, qty)
    onClose()
  }, [product, selectedSize, selectedColor, qty, hasSizes, hasColors, onAddToCart, onClose])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const base = import.meta.env.BASE_URL || '/'

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Quick view">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-image-wrap">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="product-card-placeholder" style={{ width: '100%', height: '100%' }} />
          )}
        </div>
        <div className="modal-body">
          <h3 style={{ margin: '0 0 0.25rem' }}>{product.name}</h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--brand2)' }}>
            {formatCurrency(product.price)}
          </p>
          {hasSizes && (
            <div style={{ marginTop: '1rem' }}>
              <label htmlFor="qv-size">Size</label>
              <select
                id="qv-size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', borderRadius: 'var(--radius)' }}
              >
                <option value="">Select size</option>
                {product.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
          {hasColors && (
            <div style={{ marginTop: '0.75rem' }}>
              <label htmlFor="qv-color">Color</label>
              <select
                id="qv-color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', borderRadius: 'var(--radius)' }}
              >
                <option value="">Select color</option>
                {product.colors.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
              style={{ width: '4rem', padding: '0.5rem', textAlign: 'center' }}
              aria-label="Quantity"
            />
            <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleAdd}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-body">
            <div className="skeleton-line" style={{ width: '90%' }} />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat') || ''
  const [category, setCategory] = useState(catParam && CATEGORIES.includes(catParam) ? catParam : 'All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [loading, setLoading] = useState(true)
  const [quickView, setQuickView] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    if (catParam && CATEGORIES.includes(catParam)) setCategory(catParam)
  }, [catParam])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    let list = productsData.filter((p) => {
      const matchCategory = category === 'All' || p.category === category
      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [category, search, sort])

  return (
    <main className="shop page">
      <div className="shop-header">
        <h1>Shop</h1>
        <div className="shop-toolbar">
          <label htmlFor="shop-search" className="sr-only">Search products</label>
          <input
            id="shop-search"
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="shop-search"
            aria-label="Search products"
          />
          <label htmlFor="shop-sort" className="sr-only">Sort by</label>
          <select
            id="shop-sort"
            className="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-chips" role="group" aria-label="Category filter">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickView}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 && !loading && (
        <p className="shop-empty">No products match your search.</p>
      )}

      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onAddToCart={addToCart}
        />
      )}
    </main>
  )
}

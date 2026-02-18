import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'

const CATEGORIES = ['All', 'Hoodies', 'Joggers', 'Shirts', 'Mugs', 'Cups', 'Accessories']

export default function Shop() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return productsData.filter((p) => {
      const matchCategory = category === 'All' || p.category === category
      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [category, search])

  return (
    <main className="shop page">
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
        <div className="shop-filters" role="group" aria-label="Category filter">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`filter-btn ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="shop-empty">No products match your search.</p>
      )}
    </main>
  )
}

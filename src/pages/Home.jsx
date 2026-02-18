import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'

const base = import.meta.env.BASE_URL || '/'

const TRUST_ITEMS = [
  { icon: '🚚', label: 'Fast Shipping' },
  { icon: '✨', label: 'Quality Materials' },
  { icon: '🔒', label: 'Secure Checkout' },
  { icon: '🆕', label: 'New Drops' },
]

const COLLECTIONS = [
  { name: 'Hoodies', slug: 'Hoodies', bg: 'linear-gradient(135deg, #2d5a3d 0%, #1e3d2a 100%)' },
  { name: 'Joggers', slug: 'Joggers', bg: 'linear-gradient(135deg, #4a7c59 0%, #2d5a3d 100%)' },
  { name: 'Shirts', slug: 'Shirts', bg: 'linear-gradient(135deg, #5a8c69 0%, #3d6b4d 100%)' },
  { name: 'Accessories', slug: 'Accessories', bg: 'linear-gradient(135deg, #1e3d2a 0%, #152a1d 100%)' },
]

export default function Home() {
  const featured = productsData.slice(0, 6)

  return (
    <main className="home">
      <div className="home-bg-blob" aria-hidden="true" />
      <div className="home-bg-blob home-bg-blob-2" aria-hidden="true" />

      <section className="hero" aria-labelledby="hero-title">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${base}assets/EtsyBanner.png)` }}
          role="img"
          aria-label=""
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 id="hero-title">Katy&apos;s Korner</h1>
          <p className="hero-sub">Premium streetwear for everyday comfort.</p>
          <div className="hero-ctas">
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <Link to="/shop" className="btn btn-secondary">View Collections</Link>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className="trust-item">
            <span className="trust-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <h2 className="section-title">Featured Drops</h2>
        <div className="featured-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Shop by Collection</h2>
        <div className="collection-grid">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?cat=${encodeURIComponent(c.slug)}`}
              className="collection-card"
            >
              <div className="collection-card-inner" style={{ background: c.bg }} />
              <span className="collection-card-label">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="coming-soon" aria-labelledby="coming-soon-title">
        <h2 id="coming-soon-title">Stay Tuned / Coming Soon</h2>
        <img src={`${base}assets/InstaReel.png`} alt="Coming soon teaser" />
      </section>
    </main>
  )
}

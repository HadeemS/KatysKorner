import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

export default function ProductCard({ product, featured, onQuickView }) {
  const imgContent = product.image ? (
    <img src={product.image} alt={product.name} />
  ) : (
    <div className="product-card-placeholder" aria-hidden="true" />
  )

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        <Link to={`/product/${product.id}`} className="product-card-image">
          {imgContent}
        </Link>
        <div className="product-card-overlay" aria-hidden="true" />
        <span className="product-card-badge">{product.category}</span>
        {onQuickView && (
          <button
            type="button"
            className="btn btn-primary btn-small product-card-quick-view"
            onClick={(e) => {
              e.preventDefault()
              onQuickView(product)
            }}
          >
            Quick View
          </button>
        )}
      </div>
      <div className="product-card-body">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card-name">{product.name}</h3>
        </Link>
        {featured && product.description && (
          <p className="product-card-desc">{product.description}</p>
        )}
        <p className="product-card-price">{formatCurrency(product.price)}</p>
      </div>
    </article>
  )
}

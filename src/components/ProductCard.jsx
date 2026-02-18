import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="product-card-placeholder" aria-hidden="true" />
          )}
        </div>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{formatCurrency(product.price)}</p>
      </Link>
    </article>
  )
}

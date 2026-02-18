import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const base = import.meta.env.BASE_URL || '/'

export default function Navbar() {
  const { items } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const cartCount = items.reduce((acc, i) => acc + i.qty, 0)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <Link to="/" className="navbar-logo">
        <img src={`${base}assets/LogoFORInsta.png`} alt="Katy's Korner logo" />
      </Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/shop">Shop</NavLink></li>
        <li>
          <NavLink to="/cart" className="navbar-cart-wrap" aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}>
            Cart
            {cartCount > 0 && <span className="cart-badge-dot">{cartCount}</span>}
          </NavLink>
        </li>
        <li><NavLink to="/policies">Policies</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </nav>
  )
}

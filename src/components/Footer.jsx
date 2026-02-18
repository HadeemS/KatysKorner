import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/shop">Shop</Link>
        <Link to="/policies">Policies</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} Katy&apos;s Korner</p>
    </footer>
  )
}

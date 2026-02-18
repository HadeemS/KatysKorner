import { Link } from 'react-router-dom'

const base = import.meta.env.BASE_URL || '/'

export default function Home() {
  return (
    <main className="home">
      <section className="hero" aria-labelledby="hero-title">
        <img src={`${base}assets/EtsyBanner.png`} alt="Katy's Korner banner" />
        <h1 id="hero-title" className="sr-only">Welcome to Katy&apos;s Korner</h1>
      </section>
      <section className="home-cta">
        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
      </section>
      <section className="coming-soon" aria-labelledby="coming-soon-title">
        <h2 id="coming-soon-title">Stay Tuned / Coming Soon</h2>
        <img src={`${base}assets/InstaReel.png`} alt="Coming soon teaser" />
      </section>
    </main>
  )
}

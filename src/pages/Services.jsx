import { Link } from 'react-router-dom'
import './Page.css'

export default function Services() {
  return (
    <div className="page page-services">
      <header className="page-header">
        <Link to="/" className="page-back">← Home</Link>
      </header>
      <section className="page-hero">
        <h1 className="page-title">Services</h1>
        <p className="page-tagline">Brand, packaging, digital, and creative services.</p>
      </section>
      <section className="page-body">
        <p>This is the dedicated Services page — explore what we offer.</p>
      </section>
    </div>
  )
}

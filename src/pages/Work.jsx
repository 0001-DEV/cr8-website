import { Link } from 'react-router-dom'
import './Page.css'

export default function Work() {
  const handleBackClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page page-work">
      <header className="page-header">
        <Link to="/" onClick={handleBackClick} className="page-back">← Home</Link>
      </header>
      <section className="page-hero">
        <h1 className="page-title">Work</h1>
        <p className="page-tagline">Selected projects and creative outputs from Xtreme Cr8tivity.</p>
      </section>
      <section className="page-body">
        <p>This is the dedicated Work page — a full listing of all our projects.</p>
      </section>
    </div>
  )
}

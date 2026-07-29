import { Link, useNavigate } from 'react-router-dom'
import './Page.css'

export default function Work() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
    // Scroll to top to skip intro animation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  return (
    <div className="page page-work">
      <header className="page-header">
        <button onClick={handleBackClick} className="page-back">← Back</button>
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

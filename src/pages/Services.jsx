import { useNavigate } from 'react-router-dom'
import './Page.css'

export default function Services() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  return (
    <div className="page page-services">
      <header className="page-header">
        <button onClick={handleBackClick} className="page-back">← Back</button>
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

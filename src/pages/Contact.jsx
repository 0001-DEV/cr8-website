import { useNavigate } from 'react-router-dom'
import './Page.css'

export default function Contact() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  return (
    <div className="page page-contact">
      <header className="page-header">
        <button onClick={handleBackClick} className="page-back">← Back</button>
      </header>
      <section className="page-hero">
        <h1 className="page-title">Contact</h1>
        <p className="page-tagline">Let's Create Awesomeness Together — reach out today.</p>
      </section>
      <section className="page-body">
        <p>This is the dedicated Contact page — get in touch with us.</p>
      </section>
    </div>
  )
}

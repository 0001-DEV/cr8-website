import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import './Page.css'

export default function Services() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    navigate('/', { replace: true })
  }

  return (
    <div className="page page-services">
      <Header />
      <header className="page-header" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
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

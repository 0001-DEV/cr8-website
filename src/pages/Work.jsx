import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import './Page.css'

export default function Work() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    navigate('/', { replace: true })
  }

  return (
    <div className="page page-work">
      <Header />
      <header className="page-header" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
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

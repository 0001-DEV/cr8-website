import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import './Page.css'

export default function Methodology() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    navigate('/', { replace: true })
  }

  return (
    <div className="page page-methodology">
      <Header />
      <header className="page-header" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <button onClick={handleBackClick} className="page-back">← Back</button>
      </header>
      <section className="page-hero">
        <h1 className="page-title">Our Methodology</h1>
        <p className="page-tagline">How we approach design, storytelling, and brand transformation.</p>
      </section>
      <section className="page-body">
        <p>This is the dedicated Methodology page — our strategic process.</p>
      </section>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import './Page.css'

export default function Methodology() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  return (
    <div className="page page-methodology">
      <header className="page-header">
        <button onClick={handleBackClick} className="page-back">← Back</button>
      </header>
      <section className="page-hero">
        <h1 className="page-title">Our Methodology</h1>
        <p className="page-tagline">How we think outside the box — permanently.</p>
      </section>
      <section className="page-body">
        <p>This is the dedicated Methodology page — our process in detail.</p>
      </section>
    </div>
  )
}

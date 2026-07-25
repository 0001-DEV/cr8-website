import { Link } from 'react-router-dom'
import './Page.css'

export default function Methodology() {
  return (
    <div className="page page-methodology">
      <header className="page-header">
        <Link to="/" className="page-back">← Home</Link>
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

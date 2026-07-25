import { Link } from 'react-router-dom'
import './Page.css'

export default function About() {
  return (
    <div className="page page-about">
      <header className="page-header">
        <Link to="/" className="page-back">← Home</Link>
      </header>
      <section className="page-hero">
        <h1 className="page-title">About</h1>
        <p className="page-tagline">Meet Xtreme Cr8tivity and the team behind every project.</p>
      </section>
      <section className="page-body">
        <p>This is the dedicated About page — learn more about us.</p>
      </section>
    </div>
  )
}

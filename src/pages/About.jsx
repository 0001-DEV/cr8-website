import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './About.css'

export default function About() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    const prevPage = sessionStorage.getItem('previousPage')
    if (prevPage) {
      navigate(prevPage)
    } else {
      navigate(-1)
    }
  }

  const row1Members = [
    { name: 'Paul Omotosho', role: 'Head of Human Resources' },
    { name: 'Joshua Itorobong', role: 'Creative Director' },
    { name: 'Adegbotemi Ayodeji', role: 'Managing Director' },
  ]

  const row2Members = [
    { name: 'Nathaniel Aremu', role: 'Animation Director' },
    { name: 'Amayido Zino', role: 'Head of Production' },
    { name: 'Joy Aposa', role: 'Brand Communications' },
  ]

  const row3Members = [
    { name: 'Joshua Oladele', role: 'Senior Brand Designer' },
    { name: 'Titilope Barakat', role: 'Motion Designer' },
    { name: 'Love Olaoye', role: 'Operations & IT' },
  ]

  const teamRows = [row1Members, row2Members, row3Members]

  return (
    <div className="about-page-container">
      <Header />
      <main className="about-main-content">
        <div className="about-back-nav">
          <button onClick={handleBackClick} className="about-back-btn">
            ← Back
          </button>
        </div>

        <section className="about-hero-section">
          <div className="about-hero-heading">
            <h1 className="about-title-main">
              <span className="about-title-line1" style={{ display: 'block' }}>
                We challenge
              </span>
              <span className="about-title-line2" style={{ display: 'block', whiteSpace: 'nowrap' }}>
                extraordinary thinking
              </span>
            </h1>
          </div>
        </section>

        <section className="about-intro-section">
          <p className="about-intro-paragraph">
            Xtreme Cr8tivity is a creative studio built on a simple belief: average thinking creates average brands.
          </p>
          <p className="about-intro-paragraph">
            We're living through a sameness epidemic. Products look the same, brands sound the same, and experiences are forgotten almost as quickly as they're created. Too often, businesses settle for what's familiar, follow what's trending, and mistake "good enough" for good.
          </p>
          <p className="about-intro-paragraph">
            We think there's a better way.
          </p>
        </section>

        <section className="about-minds-section">
          <div className="about-minds-heading">
            <h2 className="about-minds-title">
              <span className="about-minds-line1" style={{ display: 'block' }}>
                Excellent minds
              </span>
              <span className="about-minds-line2" style={{ display: 'block' }}>
                behind Excellent
              </span>
              <span className="about-minds-line3" style={{ display: 'block' }}>
                ideas.
              </span>
            </h2>
          </div>
        </section>

        <section className="about-team-section">
          {teamRows.map((row, rowIndex) => (
            <div key={rowIndex} className="about-team-images-row">
              {row.map((member, mIndex) => (
                <div key={mIndex} className="about-team-card-wrapper">
                  <div className="about-team-image-card" />
                  <div className="about-team-text-bar">
                    <span className="about-team-member-name">{member.name}</span>
                    <span className="about-team-member-role">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        <section className="about-belief-section">
          <p className="about-belief-paragraph">
            We believe great creative work starts long before the design. It starts with a better question, a sharper insight, and the courage to think differently.
          </p>
          <p className="about-belief-paragraph">
            That's why we work across brand strategy, identity, campaigns, digital experiences, motion, and product design—bringing strategy and creativity together to build ideas that are not only visually compelling, but meaningful, intentional, and built to last.
          </p>
        </section>

        <section className="about-banner-image-section">
          <div className="about-banner-image-card" />
        </section>
      </main>
      <Footer />
    </div>
  )
}

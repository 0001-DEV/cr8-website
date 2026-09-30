import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SegmentedCrossIcon from '../components/SegmentedCrossIcon'
import './About.css'

function TeamMemberCard({ member }) {
  return (
    <div className="about-team-card-wrapper">
      <div className="about-team-image-card">
        <img
          src={member.image}
          alt={member.name}
          className="about-team-photo"
          loading="lazy"
        />
        <div className="about-team-gradient-flow" />
        <div className="about-team-gradient-glow" />
      </div>
      <div className="about-team-text-bar">
        <span className="about-team-member-name">{member.name}</span>
        <span className="about-team-member-role">{member.role}</span>
      </div>
    </div>
  )
}

export default function About() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    const prevPage = sessionStorage.getItem('previousPage')
    if (prevPage) navigate(prevPage)
    else navigate(-1)
  }

  const teamMembers = [
    { id: 'joshua-itorobong', name: 'Joshua Itorobong', role: 'Creative Director',    image: '/assets/AA.webp' },
    { id: 'joshua-oladele',   name: 'Joshua Oladele',   role: 'Senior Brand Designer', image: '/assets/A (6).webp' },
    { id: 'zino-amayido',     name: 'Zino Amayido',     role: 'Head of Production',    image: '/assets/A (3).webp' },
    { id: 'barokah-olorunlogbon', name: 'Barokah Olorunlogbon', role: 'Motion Designer', image: '/assets/A (4).webp' },
    { id: 'nathaniel-aremu',  name: 'Nathaniel Aremu',  role: 'Animation Direction',   image: '/assets/A (5).webp' },
  ]

  return (
    <div className="about-page-container">
      <Header />
      <main className="about-main-content">
        <div className="about-back-nav">
          <button onClick={handleBackClick} className="about-back-btn">← Back</button>
        </div>

        {/* ── Hero: Text left (heading + intro) + A(12) right image (w=1241 h=830) ── */}
        <section className="about-hero-section">
          <div className="about-hero-inner">
            <div className="about-hero-text-col">
              <h1 className="about-title-main">
                <span className="about-title-line1">We challenge</span>
                <span className="about-title-line2">ordinary thinking</span>
              </h1>
              <div className="about-intro-content">
                <p className="about-intro-paragraph">
                  Xtreme Cr8tivity is a creative studio built on a simple belief: average thinking creates average brands.
                </p>
                <p className="about-intro-paragraph">
                  We're living through a sameness epidemic. Products look the same, brands sound the same, and experiences are forgotten almost as quickly as they're created. Too often, businesses settle for what's familiar, follow what's trending, and mistake "good enough" for good.
                </p>
                <p className="about-intro-paragraph">
                  We think there's a better way.
                </p>
              </div>
            </div>
            <div className="about-hero-image-col">
              <img
                src="/assets/A (12).webp"
                alt="Studio atmosphere"
                className="about-hero-side-img"
                width="1241"
                height="830"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* ── Excellent Minds heading (centre-aligned, 2 lines) ── */}
        <section className="about-minds-section">
          <div className="about-minds-heading">
            <h2 className="about-minds-title">
              <span className="about-minds-line1">Excellent minds</span>
              <span className="about-minds-line2">behind Excellent ideas.</span>
            </h2>
          </div>
        </section>

        {/* ── Team cards with real photos ── */}
        <section className="about-team-section">
          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* ── Belief paragraphs + A(10) image under it (w=1870 h=930) ── */}
        <section className="about-belief-section">
          <div className="about-belief-text">
            <p className="about-belief-paragraph">
              We believe great creative work starts long before the design. It starts with a better question, a sharper insight, and the courage to think differently.
            </p>
            <p className="about-belief-paragraph">
              That's why we work across brand strategy, identity, campaigns, digital experiences, motion, and product design, bringing strategy and creativity together to build ideas that are not only visually compelling, but meaningful, intentional, and built to last.
            </p>
          </div>
          <div className="about-belief-image-col">
            <img
              src="/assets/A (10).webp"
              alt="Creative process"
              className="about-belief-img"
              width="1870"
              height="930"
              loading="lazy"
            />
          </div>
        </section>

        {/* ── Perfection in the Details heading ── */}
        <section className="about-perfection-section">
          <h2 className="about-perfection-title">
            <span className="about-perfection-line1">Perfection in the</span>
            <span className="about-perfection-line2">details.</span>
          </h2>
          <p className="about-perfection-body">
            We obsess over the details others overlook. We question conventions. We look for the unexpected connections, the overlooked opportunities, and the ideas that make people stop and think.
          </p>
        </section>

        {/* ── Asymmetric images: A(1) w=650 h=930 + A(11) w=1195 h=930 ── */}
        <section className="about-asym-images-section">
          <div className="about-asym-650-card">
            <img src="/assets/A (1).webp" alt="Studio detail" loading="lazy" />
          </div>
          <div className="about-asym-1195-card">
            <img src="/assets/A (11).webp" alt="Studio work" loading="lazy" />
          </div>
        </section>

        {/* ── Italic quote ── */}
        <section className="about-italic-quote-section">
          <p className="about-italic-quote">
            Because our goal isn't simply to build recognizable brands, but to create experiences that people actually love.
          </p>
        </section>

        {/* ── Centred tagline ── */}
        <section className="about-centre-tagline-section">
          <h2 className="about-centre-tagline">
            <span className="about-centre-tagline-line1">"Challenging ordinary</span>
            <span className="about-centre-tagline-line2">Creating extraordinary"</span>
          </h2>
        </section>

        {/* ── Methodology link section ── */}
        <section className="about-methodology-link-section">
          <Link to="/methodology" className="about-methodology-link">
            Our Methodology →
          </Link>
        </section>

      </main>
      <Footer />
    </div>
  )
}

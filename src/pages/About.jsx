import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './About.css'

function TeamMemberCard({ member }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

    const tiltX = (((y - 50) / 50) * -4).toFixed(2)
    const tiltY = (((x - 50) / 50) * 4).toFixed(2)

    card.style.setProperty('--mouse-x', `${x.toFixed(2)}%`)
    card.style.setProperty('--mouse-y', `${y.toFixed(2)}%`)
    card.style.setProperty('--tilt-x', `${tiltX}deg`)
    card.style.setProperty('--tilt-y', `${tiltY}deg`)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--mouse-x', '50%')
    card.style.setProperty('--mouse-y', '50%')
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  const handleTouchMove = (e) => {
    if (!e.touches[0] || !cardRef.current) return
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100))

    cardRef.current.style.setProperty('--mouse-x', `${x.toFixed(2)}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y.toFixed(2)}%`)
  }

  return (
    <div
      className="about-team-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
    >
      <div
        ref={cardRef}
        className={`about-team-image-card ${member.gradientClass} ${isHovered ? 'is-hovered' : ''}`}
        style={{
          '--card-bg': member.palette.bg,
          '--c1': member.palette.c1,
          '--c2': member.palette.c2,
          '--c3': member.palette.c3,
          '--c4': member.palette.c4,
        }}
      >
        <div className="aura-blob aura-blob-1" />
        <div className="aura-blob aura-blob-2" />
        <div className="aura-blob aura-blob-3" />
        <div className="aura-blob aura-blob-4" />
        <div className="aura-cursor-glow" />
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
    if (prevPage) {
      navigate(prevPage)
    } else {
      navigate(-1)
    }
  }

  // Exact 5 members with exact colors sampled from the reference screenshot
  const teamMembers = [
    {
      id: 'joshua-itorobong',
      name: 'Joshua Itorobong',
      role: 'Creative Director',
      gradientClass: 'gradient-itorobong',
      palette: {
        bg: '#fe8db9', // Rose Pink center
        c1: '#8699f7', // Periwinkle Blue-Lavender (Top-Left)
        c2: '#fe4612', // Fiery Flame Orange-Red (Bottom-Right)
        c3: '#ff521a', // Intense Sunset Red-Orange (Bottom)
        c4: '#ffcad4', // Pastel Blush Pink (Top-Right)
      },
    },
    {
      id: 'joshua-oladele',
      name: 'Joshua Oladele',
      role: 'Brand Identity Strategist',
      gradientClass: 'gradient-oladele',
      palette: {
        bg: '#98cafb', // Sky Blue mid-tone
        c1: '#2490fd', // Electric Azure Blue (Top Half)
        c2: '#feff42', // Vivid Sunny Lemon Yellow (Bottom Half)
        c3: '#2e94f9', // Royal Blue (Top-Left)
        c4: '#f5ff3e', // Neon Lime-Yellow (Bottom-Right)
      },
    },
    {
      id: 'zino-amayido',
      name: 'Zino Amayido',
      role: 'Brand Identity Designer',
      gradientClass: 'gradient-amayido',
      palette: {
        bg: '#e3fec7', // Mint-Lemon soft tone
        c1: '#fbfe4d', // Bright Lemon Sun Yellow (Top)
        c2: '#289afa', // Electric Blue (Bottom-Right)
        c3: '#4886ff', // Cobalt Splash (Mid-Left)
        c4: '#def7fe', // Ice Cyan (Bottom-Left)
      },
    },
    {
      id: 'barokah-olorunlogbon',
      name: 'Barokah Olorunlogbon',
      role: 'Motion Designer',
      gradientClass: 'gradient-barokah',
      palette: {
        bg: '#fe9498', // Coral Rose center
        c1: '#ff5a2c', // Fiery Red-Orange (Bottom-Left)
        c2: '#40a4f9', // Sky Blue (Top-Left)
        c3: '#fcff75', // Lemon Yellow (Top-Right)
        c4: '#ff8c1f', // Sunset Orange (Center-Right)
      },
    },
    {
      id: 'nathaniel-aremu',
      name: 'Nathaniel Aremu',
      role: '3D Artist',
      gradientClass: 'gradient-aremu',
      palette: {
        bg: '#fd984a', // Warm Flame Orange center
        c1: '#fe4952', // Radiant Crimson Pink-Red (Top-Right)
        c2: '#fbfe3f', // Bright Lemon Yellow (Bottom)
        c3: '#fdbf20', // Golden Amber (Bottom-Left)
        c4: '#ebfdfd', // Ice White (Top-Left)
      },
    },
  ]

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
          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
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

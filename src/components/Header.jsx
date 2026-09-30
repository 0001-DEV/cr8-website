import './Header.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function WrittenWord({ text, baseDelay = 0.1, charInterval = 0.038 }) {
  const chars = text.split('')
  const caretDelay = (baseDelay + (chars.length - 1) * charInterval).toFixed(3)

  return (
    <span className="written-word" aria-label={text}>
      <span className="written-letters" aria-hidden="true">
        {chars.map((char, i) => (
          <span
            key={i}
            className="written-char"
            style={{
              animationDelay: `${(baseDelay + i * charInterval).toFixed(3)}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        <span
          className="written-pen-caret"
          style={{
            animationDelay: `${caretDelay}s`,
          }}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuOpenCount, setMenuOpenCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => {
      if (!prev) {
        setMenuOpenCount((c) => c + 1)
      }
      return !prev
    })
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="/" className="logo-link">
            <img src="/assets/Asset 1.svg" alt="Xtreme Cr8tivity Logo" className="logo-img" />
          </a>
          <nav className="nav desktop-nav">
            <Link to="/work" className="nav-link nav-link-1">Work</Link>
            <Link to="/services" className="nav-link nav-link-2">Services</Link>
            <Link to="/methodology" className="nav-link nav-link-3">Our Methodology</Link>
            <Link to="/about" className="nav-link nav-link-4">About</Link>
            <a href="https://wa.me/2347046367754" target="_blank" rel="noopener noreferrer" className="nav-link">Contact</a>
          </nav>
          <button 
            className="menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <nav key={menuOpenCount} className="mobile-nav">
            <Link to="/work" onClick={closeMobileMenu} className="mobile-nav-link link-1">
              <WrittenWord text="Work" baseDelay={0.10} charInterval={0.038} />
            </Link>
            <Link to="/services" onClick={closeMobileMenu} className="mobile-nav-link link-2">
              <WrittenWord text="Services" baseDelay={0.26} charInterval={0.035} />
            </Link>
            <Link to="/methodology" onClick={closeMobileMenu} className="mobile-nav-link link-3">
              <WrittenWord text="Our Methodology" baseDelay={0.48} charInterval={0.028} />
            </Link>
            <Link to="/about" onClick={closeMobileMenu} className="mobile-nav-link link-4">
              <WrittenWord text="About" baseDelay={0.80} charInterval={0.038} />
            </Link>
            <a href="https://wa.me/2347046367754" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="mobile-nav-link link-5">
              <WrittenWord text="Contact" baseDelay={0.98} charInterval={0.035} />
            </a>
          </nav>
          <div className="mobile-menu-footer">
            <p className="mobile-brand">Xtreme Cr8tivity</p>
            <p className="mobile-tagline">Bringing excellence to everyday things of life.</p>
          </div>
        </div>
      </div>
    </>
  )
}

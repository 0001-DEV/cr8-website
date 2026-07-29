import './Header.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    setIsMobileMenuOpen(!isMobileMenuOpen)
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
            <Link to="/contact" className="nav-link">Contact</Link>
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
              <nav className="mobile-nav">
                <Link to="/work" onClick={closeMobileMenu} className="mobile-nav-link link-1">Work</Link>
                <Link to="/services" onClick={closeMobileMenu} className="mobile-nav-link link-2">Services</Link>
                <Link to="/methodology" onClick={closeMobileMenu} className="mobile-nav-link link-3">Our Methodology</Link>
                <Link to="/about" onClick={closeMobileMenu} className="mobile-nav-link link-4">About</Link>
                <Link to="/contact" onClick={closeMobileMenu} className="mobile-nav-link link-5">Contact</Link>
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


import './Header.css'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <img src="/assets/Asset 1.svg" alt="Xtreme Cr8tivity Logo" className="logo-img" />
        <nav className="nav">
          <a href="/work" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-1">Work</a>
          <a href="/services" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-2">Services</a>
          <a href="/methodology" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-3">Our Methodology</a>
          <a href="/about" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-4">About</a>
          <a href="/contact" target="_blank" rel="noopener noreferrer">Contact</a>
        </nav>
        <button className="menu-toggle">☰</button>
      </div>
    </header>
  )
}

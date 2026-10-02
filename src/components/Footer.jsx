import './Footer.css'
import './Hero.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-section-main">
            <h3 className="footer-intro-heading">Let's Create Something Extraordinary.</h3>
            <p className="footer-tagline footer-main-tagline">
              The world doesn't need more brands. It needs better ideas.
              At Xtreme Cr8tivity, we challenge ordinary thinking to create
              brands, products, and experiences that leave a lasting impression.
            </p>
          </div>

          <div className="footer-right-column">
            <p className="footer-email">Inquiries: xc@cr8.com.ng</p>
            <div className="footer-nav-columns">
              <div className="footer-section">
                <h4>Connect with us</h4>
                <ul className="social-links">
                  <li><a href="#">Instagram</a></li>
                  <li><a href="#">LinkedIn</a></li>
                  <li><a href="#">Behance</a></li>
                  <li><a href="#">Twitter (X)</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Useful links</h4>
                <ul className="footer-links">
                  <li><Link to="/work">Work</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/methodology">Our methodology</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><a href="https://wa.me/2347046367754" target="_blank" rel="noopener noreferrer">Contact</a></li>
                  <li><a href="#why-we-exist">Why we exist</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-brand-section">
          <div className="footer-brand-line">
            Xtreme Cr8tivity
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Xtreme Cr8tivity. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

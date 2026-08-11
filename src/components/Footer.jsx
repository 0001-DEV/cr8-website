import './Footer.css'
import './Hero.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-intro-heading">Let's Create Something Extraordinary.</h3>
            <p className="footer-tagline footer-main-tagline">
              The world doesn't need more brands. It needs better ideas.
              At Xtreme Cr8tivity, we challenge ordinary thinking to create
              brands, products, and experiences that leave a lasting impression.
            </p>
            <p className="footer-email">Inquiries: xc@cr8.com.ng</p>
          </div>

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
              <li><a href="#work">Work</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#methodology">Our methodology</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Why we exist</a></li>
            </ul>
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

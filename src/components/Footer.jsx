import './Footer.css'
import './Hero.css'

export default function Footer() {
  const brandText = ['Xtreme', 'Cr8tivity']

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="hero-brand-container" aria-label="Xtreme Cr8tivity">
              {brandText.map((line) => (
                <div key={line} className="brand-line">
                  {line}
                </div>
              ))}
            </div>
            <p className="footer-tagline">
              Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex consequat.
            </p>
          </div>

          <div className="footer-section footer-section-connect">
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

        <div className="footer-bottom">
          <p>&copy; 2026 Xtreme Cr8tivity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

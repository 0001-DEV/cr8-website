import './WhyWeExist.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function WhyWeExist() {
  const [hoveredPillar, setHoveredPillar] = useState(null)

  const clientLogos = [
    '/assets/Asset 24.webp',
    '/assets/Asset 25.webp',
    '/assets/Asset 26.webp',
    '/assets/Asset 27.webp',
    '/assets/Asset 28.webp',
    '/assets/Asset 29.webp',
    '/assets/Asset 30.webp'
  ]

  return (
    <section className="why-we-exist" id="about">
      <div className="section-container">
        <h2 className="section-title">Why we exist</h2>

        <p className="section-description">
          We exist to create solutions backed by excellent thinking<br />
          for brands seeking to stand out beyond<br />
          the overly crowded marketplace.
        </p>

        <div className="pillars">
          {/* Pillar 1: Brand Memorability */}
          <Link 
            to="/services"
            className="pillar"
            onMouseEnter={() => setHoveredPillar(0)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-bottom">
              <img src="/assets/Paper postal packages.webp" alt="Brand Memorability" className="pillar-image" />
              <div className="pillar-text-label">
                <h3 className="pillar-text">Brand Memorability</h3>
                <img src="/assets/Asset 35.svg" alt="Arrow" className="pillar-arrow pillar-arrow-label" />
              </div>
              <div className="pillar-text-overlay pillar-text-bottom">
                <h3 className="pillar-text">Brand Memorability</h3>
                <p className="pillar-text-description">
                  We build brands with clarity, character and distinction. From strategy and architecture to identity and creative direction.
                </p>
                <img src="/assets/Asset 35.svg" alt="Arrow" className="pillar-arrow pillar-arrow-overlay" />
              </div>
            </div>
          </Link>

          {/* Pillar 2: Tangible Thinking */}
          <Link 
            to="/services"
            className="pillar"
            onMouseEnter={() => setHoveredPillar(1)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-top">
              <div className="pillar-text-label pillar-text-label-top">
                <h3 className="pillar-text">Tangible Thinking</h3>
                <img src="/assets/Asset 35.svg" alt="Arrow" className="pillar-arrow pillar-arrow-label" />
              </div>
              <img src="/assets/Asset 1 (1).webp" alt="Tangible Thinking" className="pillar-image" />
              <div className="pillar-text-overlay-middle">
                <h3 className="pillar-text">Tangible Thinking</h3>
                <p className="pillar-text-description">
                  We transform opportunities and ideas into tangible products, concepts and experiences.
                </p>
                <img src="/assets/Asset 35.svg" alt="Arrow" className="pillar-arrow pillar-arrow-overlay" />
              </div>
            </div>
          </Link>

          {/* Pillar 3: Brand Signatures */}
          <Link 
            to="/services"
            className="pillar"
            onMouseEnter={() => setHoveredPillar(2)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-bottom">
              <img src="/assets/NIGERIAN_BREWERIES_COLLECTION_2.webp" alt="Brand Signatures" className="pillar-image" />
              <div className="pillar-text-label">
                <h3 className="pillar-text">Brand Signatures</h3>
                <img src="/assets/Asset 35.svg" alt="Arrow" className="pillar-arrow pillar-arrow-label" />
              </div>
              <div className="pillar-text-overlay pillar-text-bottom">
                <h3 className="pillar-text">Brand Signatures</h3>
                <p className="pillar-text-description">
                  We create distinctive physical expressions of brands from corporate gifts and merchandise to commemorative identities, objects and limited-edition pieces.
                </p>
                <img src="/assets/Asset 35.svg" alt="Arrow" className="pillar-arrow pillar-arrow-overlay" />
              </div>
            </div>
          </Link>
        </div>

        <div className="clientele">
          <h3>Our clientele and<br />trusted partners</h3>
          <div className="clients-container">
            <div className="clients-grid">
              {clientLogos.concat(clientLogos, clientLogos).map((logo, index) => (
                <img
                  key={`${logo}-${index}`}
                  src={logo}
                  alt={index < clientLogos.length ? 'Client' : ''}
                  aria-hidden={index >= clientLogos.length}
                  className="client-logo"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

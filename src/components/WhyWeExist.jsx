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
            to="/services#brand-memorability"
            className="pillar"
            onMouseEnter={() => setHoveredPillar(0)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-bottom">
              <img src="/assets/Paper postal packages.webp" alt="Brand Memorability" className="pillar-image" loading="lazy" decoding="async" />
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
            to="/services#tangible-thinking"
            className="pillar"
            onMouseEnter={() => setHoveredPillar(1)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-top">
              <div className="pillar-text-label pillar-text-label-top">
                <h3 className="pillar-text">Tangible Thinking</h3>
                <img src="/assets/Asset 35.svg" alt="Arrow" className="pillar-arrow pillar-arrow-label" />
              </div>
              <img src="/assets/Asset 1 (1).webp" alt="Tangible Thinking" className="pillar-image" loading="lazy" decoding="async" />
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
            to="/services#brand-signatures"
            className="pillar"
            onMouseEnter={() => setHoveredPillar(2)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-bottom">
              <img src="/assets/NIGERIAN_BREWERIES_COLLECTION_2.webp" alt="Brand Signatures" className="pillar-image" loading="lazy" decoding="async" />
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
          <div className="clients-marquee-wrapper">
            <div className="clients-marquee-track">
              {/* Set 1 */}
              <div className="clients-marquee-set" aria-hidden="false">
                {clientLogos.map((logo, index) => (
                  <img
                    key={`set1-${index}`}
                    src={logo}
                    alt="Client"
                    className="client-logo"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              {/* Set 2 — exact clone, visually seamless */}
              <div className="clients-marquee-set" aria-hidden="true">
                {clientLogos.map((logo, index) => (
                  <img
                    key={`set2-${index}`}
                    src={logo}
                    alt=""
                    className="client-logo"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

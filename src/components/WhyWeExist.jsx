import './WhyWeExist.css'
import { useState } from 'react'

export default function WhyWeExist() {
  const [hoveredPillar, setHoveredPillar] = useState(null)

  const description = "We exist to create solutions backed by excellent thinking for brands seeking to stand out beyond the overly crowded marketplace."
  const clientLogos = [
    '/assets/Asset 24.png',
    '/assets/Asset 25.png',
    '/assets/Asset 26.png',
    '/assets/Asset 27.png',
    '/assets/Asset 28.png',
    '/assets/Asset 29.png',
    '/assets/Asset 30.png'
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
          <div 
            className="pillar"
            onMouseEnter={() => setHoveredPillar(0)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-bottom">
              <img src="/assets/Paper postal packages.jpg" alt="Brand Memorability" className="pillar-image" />
              <div className="pillar-text-label">
                <h3 className="pillar-text">Brand Memorability</h3>
              </div>
              <div className="pillar-text-overlay pillar-text-bottom">
                <h3 className="pillar-text">Brand Memorability</h3>
                <p className="pillar-text-description">{description}</p>
              </div>
            </div>
          </div>
          <div 
            className="pillar"
            onMouseEnter={() => setHoveredPillar(1)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-top">
              <div className="pillar-text-label pillar-text-label-top">
                <h3 className="pillar-text">Brand Memorability</h3>
              </div>
              <img src="/assets/Asset 1 (1).png" alt="Brand Memorability" className="pillar-image" />
              <div className="pillar-text-overlay-middle">
                <h3 className="pillar-text">Brand Memorability</h3>
                <p className="pillar-text-description">{description}</p>
              </div>
            </div>
          </div>
          <div 
            className="pillar"
            onMouseEnter={() => setHoveredPillar(2)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            <div className="pillar-image-container pillar-image-bottom">
              <img src="/assets/NIGERIAN_BREWERIES_COLLECTION_3.jpg" alt="Brand Memorability" className="pillar-image" />
              <div className="pillar-text-label">
                <h3 className="pillar-text">Brand Memorability</h3>
              </div>
              <div className="pillar-text-overlay pillar-text-bottom">
                <h3 className="pillar-text">Brand Memorability</h3>
                <p className="pillar-text-description">{description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="clientele">
          <h3>Our clientele and<br />trusted partners</h3>
          <div className="clients-container">
            <div className="clients-grid">
              {clientLogos.concat(clientLogos).map((logo, index) => (
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

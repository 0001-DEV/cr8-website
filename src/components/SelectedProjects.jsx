import './SelectedProjects.css'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function SelectedProjects() {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const wrapperRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = [
    {
      id: 1,
      number: '01',
      name: 'Rainoil',
      category: 'Oil & Gas',
      subcategory: 'Commemorative Memorabilia Packaging',
      description: "Rainoil's operations are built on movement, storage, distribution, and reliability. Rather than applying branding onto generic merchandise, this collection draws directly from the visual language of the energy industry itself.",
      image: '/assets/RAINOIL_CUP_RENDER_9.jpg',
      tags: ['Brand Identity', 'Custom Packaging', 'Industrial Design'],

    },
    {
      id: 2,
      number: '02',
      name: 'Nigerian Breweries',
      category: 'Food & Beverage',
      subcategory: 'Commemorative Memorabilia Packaging',
      description: "Crafting bespoke commemorative packaging celebrating heritage and excellence for Nigeria's premier brewing company, combining traditional craftsmanship with modern luxury aesthetic.",
      image: '/assets/NIGERIAN_BREWERIES_COLLECTION_2.jpg',
      tags: ['Packaging Design', '3D Rendering', 'Luxury Packaging'],

    },
    {
      id: 3,
      number: '03',
      name: 'Renaissance',
      category: 'Oil & Gas',
      subcategory: 'Executive Gift Sets & Brand Assets',
      description: "Exclusive executive gift sets and custom brand assets designed for high-level corporate engagements, showcasing elegance, prestige, and meticulous craftsmanship.",
      image: '/assets/RENDER 28.jpg',
      tags: ['Corporate Gifting', 'Brand Strategy', 'Product Design'],

    }
  ]

  useEffect(() => {
    wrapperRefs.current = wrapperRefs.current.slice(0, projects.length)
    cardsRef.current = cardsRef.current.slice(0, projects.length)

    const container = containerRef.current
    const wrappers = wrapperRefs.current.filter(Boolean)
    const cards = cardsRef.current.filter(Boolean)
    if (!container || wrappers.length === 0) return

    let ctx = gsap.context(() => {
      // 1. Initial card positions: Card 0 at 0; Card 1 & 2 100% translated down
      wrappers.forEach((wrapper, i) => {
        if (i > 0) {
          gsap.set(wrapper, { yPercent: 100 })
        } else {
          gsap.set(wrapper, { yPercent: 0 })
        }
      })

      cards.forEach((card) => {
        gsap.set(card, { scale: 1, opacity: 1, filter: 'brightness(1)' })
      })

      const numTransitions = wrappers.length - 1

      // 2. GSAP Pinned timeline with snap-to-card step behavior
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'selected-projects-pin',
          trigger: container,
          start: 'top top',
          end: `+=${numTransitions * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          snap: {
            snapTo: 1 / numTransitions,
            duration: { min: 0.35, max: 0.65 },
            delay: 0.05,
            ease: 'power2.inOut'
          },
          onUpdate: (self) => {
            const p = self.progress
            if (numTransitions > 0) {
              const currentIdx = Math.min(
                Math.round(p * numTransitions),
                numTransitions
              )
              setActiveIndex(currentIdx)
            }
          }
        }
      })

      // 3. Chain discrete card transitions
      for (let i = 0; i < numTransitions; i++) {
        const nextWrapper = wrappers[i + 1]
        const currentCard = cards[i]

        // Slide next card UP over current card
        tl.to(
          nextWrapper,
          {
            yPercent: 0,
            duration: 1,
            ease: 'power1.inOut'
          },
          i
        )

        // Scale down and dim current card underneath
        tl.to(
          currentCard,
          {
            scale: 0.92,
            opacity: 0.6,
            filter: 'brightness(0.4)',
            duration: 1,
            ease: 'power1.inOut'
          },
          i
        )
      }
    }, containerRef)

    // Trigger ScrollTrigger refresh after initial mount & intro animation complete
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 300)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 2200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      ctx.revert()
    }
  }, [projects.length])

  const scrollToProject = (index) => {
    const st = ScrollTrigger.getById('selected-projects-pin')
    if (st) {
      const numTransitions = projects.length - 1
      const progress = index / numTransitions
      const targetScroll = st.start + progress * (st.end - st.start)
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Section Header - Outside container */}
      <div className="selected-projects-header">
        <h2 className="stacked-section-tag">Selected Works</h2>
      </div>

      <section className="selected-projects-section" id="work" ref={containerRef}>
        {/* Stage Container holding absolute stacked card wrappers */}
      <div className="cards-stack-stage">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="stacked-card-wrapper"
            style={{ zIndex: index + 1 }}
            ref={(el) => (wrapperRefs.current[index] = el)}
          >
            <div
              className={`stacked-card ${index === activeIndex ? 'is-active' : ''}`}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="card-inner">
                {/* Left Column: Project Metadata */}
                <div className="card-info">
                  <div className="card-meta">
                    <span className="card-number">{project.number}</span>
                    <span className="card-category-badge">{project.category}</span>
                    {project.year && <span className="card-year">{project.year}</span>}
                  </div>

                  <h3 className="card-title">{project.name}</h3>
                  <h4 className="card-subcategory">{project.subcategory}</h4>
                  <p className="card-description">{project.description}</p>

                  <div className="card-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <Link to="/work" className="card-btn">
                      <span>Explore Case Study</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Visual Image Render */}
                <div className="card-visual">
                  <div className="card-image-wrapper">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="card-image"
                      loading="eager"
                    />
                    <div className="card-image-overlay" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Controls at bottom */}
      <div className="stacked-controls-overlay">
        <div className="progress-dots">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`progress-dot-item ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToProject(idx)}
              style={{ cursor: 'pointer' }}
            >
              <span className="dot-line" />
              <span className="dot-label">{p.name}</span>
            </div>
          ))}
        </div>

        <div className="view-all-link-wrapper">
          <Link to="/work" className="view-all-stacked">
            View All Projects <span>→</span>
          </Link>
        </div>
      </div>
    </section>

    {/* Controls Footer - Outside section for mobile */}
    <div className="selected-projects-footer">
      <div className="progress-dots mobile-progress-dots">
        {projects.map((p, idx) => (
          <div
            key={p.id}
            className={`progress-dot-item ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToProject(idx)}
            style={{ cursor: 'pointer' }}
          >
            <span className="dot-line" />
            <span className="dot-label">{p.name}</span>
          </div>
        ))}
      </div>

      <div className="view-all-link-wrapper">
        <Link to="/work" className="view-all-stacked">
          View All Projects <span>→</span>
        </Link>
      </div>
    </div>
    </>
  )
}

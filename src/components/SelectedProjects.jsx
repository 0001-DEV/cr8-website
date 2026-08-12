import './SelectedProjects.css'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function SelectedProjects() {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const wrapperRefs = useRef([])
  const arrowRefs = useRef([])
  const btnRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  )
  const [isSmallMobile, setIsSmallMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  )

  const projects = [
    {
      id: 1,
      slug: 'rainoil',
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
      slug: 'nigerian-breweries',
      number: '02',
      name: 'Nigerian Breweries',
      category: 'Food & Beverage',
      subcategory: 'Commemorative Memorabilia Packaging',
      description: "Crafting bespoke commemorative packaging celebrating heritage and excellence for Nigeria's premier brewing company, combining traditional craftsmanship with modern luxury aesthetic.",
      image: '/assets/NIGERIAN_BREWERIES_COLLECTION_2.jpg',
      tags: ['Packaging Design', '3D Rendering', 'Luxury Packaging'],
      imageLeft: true,
    },
    {
      id: 3,
      slug: 'renaissance',
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
    if (typeof window === 'undefined') return

    const mqMobile = window.matchMedia('(max-width: 900px)')
    const mqSmallMobile = window.matchMedia('(max-width: 600px)')

    const handleMobileChange = (e) => setIsMobile(e.matches)
    const handleSmallMobileChange = (e) => setIsSmallMobile(e.matches)

    if (mqMobile.addEventListener) {
      mqMobile.addEventListener('change', handleMobileChange)
      mqSmallMobile.addEventListener('change', handleSmallMobileChange)
    } else {
      mqMobile.addListener(handleMobileChange)
      mqSmallMobile.addListener(handleSmallMobileChange)
    }

    return () => {
      if (mqMobile.removeEventListener) {
        mqMobile.removeEventListener('change', handleMobileChange)
        mqSmallMobile.removeEventListener('change', handleSmallMobileChange)
      } else {
        mqMobile.removeListener(handleMobileChange)
        mqSmallMobile.removeListener(handleSmallMobileChange)
      }
    }
  }, [])

  const handleProjectClick = (project) => {
    sessionStorage.setItem('returnedFromPage', 'false')
    sessionStorage.setItem('previousPage', '/')
    navigate(`/project/${project.slug || project.id}`)
  }

  useEffect(() => {
    const handlers = []
    const attach = (el, i) => {
      if (!el) return
      const handler = (e) => {
        e.stopImmediatePropagation()
        e.preventDefault()
        openCaseStudy(projects[i].id)
      }
      el.addEventListener('pointerdown', handler, { capture: true })
      handlers.push({ el, handler })
    }
    arrowRefs.current.forEach((el, i) => attach(el, i))
    btnRefs.current.forEach((el, i) => attach(el, i))
    return () => {
      handlers.forEach(({ el, handler }) => {
        el.removeEventListener('pointerdown', handler, { capture: true })
      })
    }
  }, [navigate])

  useEffect(() => {
    wrapperRefs.current = wrapperRefs.current.slice(0, projects.length)
    cardsRef.current = cardsRef.current.slice(0, projects.length)

    const container = containerRef.current
    const wrappers = wrapperRefs.current.filter(Boolean)
    const cards = cardsRef.current.filter(Boolean)
    if (!container || wrappers.length === 0) return

    let ctx = gsap.context(() => {
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

      const endMultiplier = isSmallMobile ? 150 : (isMobile ? 125 : 100)

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'selected-projects-pin',
          trigger: container,
          start: 'top top',
          end: `+=${numTransitions * endMultiplier}%`,
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.15 : 0.1,
          snap: {
            snapTo: 1 / numTransitions,
            duration: { min: isMobile ? 0.15 : 0.1, max: isMobile ? 0.3 : 0.2 },
            delay: 0,
            ease: 'power2.out'
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

      for (let i = 0; i < numTransitions; i++) {
        const nextWrapper = wrappers[i + 1]
        const currentCard = cards[i]

        tl.to(
          nextWrapper,
          {
            yPercent: 0,
            duration: isMobile ? 1.2 : 1,
            ease: 'power1.inOut'
          },
          i
        )

        tl.to(
          currentCard,
          {
            scale: isMobile ? 0.95 : 0.92,
            opacity: 0.6,
            filter: 'brightness(0.4)',
            duration: isMobile ? 1.2 : 1,
            ease: 'power1.inOut'
          },
          i
        )
      }
    }, containerRef)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 300)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 2200)
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 3500)

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', () => {
      setTimeout(() => ScrollTrigger.refresh(), 100)
      setTimeout(() => ScrollTrigger.refresh(), 500)
    })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener('resize', handleResize)
      ctx.revert()
    }
  }, [projects.length, isMobile, isSmallMobile])

  return (
    <>
      {/* Section Header - Outside container */}
      <div className="selected-projects-header">
        <h2 className="stacked-section-tag">Selected Works</h2>
      </div>

      <section className="selected-projects-section" id="work" ref={containerRef}>
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
                <div className={`card-inner${project.imageLeft ? ' image-left' : ''}`}>
                  <div className="card-info">
                    <div className="card-meta">
                      <span className="card-category-badge">{project.category}</span>
                      {project.year && <span className="card-year">{project.year}</span>}
                    </div>
                    <h3 className="card-title">{project.name}</h3>
                    <div className="card-body">
                      <h4 className="card-subcategory">{project.subcategory}</h4>
                      <p className="card-description">{project.description}</p>
                    </div>
                    <div className="card-tags">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="card-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="card-actions">
                      <button
                        className="card-btn"
                        ref={(el) => (btnRefs.current[index] = el)}
                      >
                        <span>Explore</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                    <a
                      href={`/project/${project.slug || project.id}`}
                      className={`card-corner-arrow card-corner-arrow--${project.slug || project.id}`}
                      aria-label={`View ${project.name}`}
                      ref={(el) => (arrowRefs.current[index] = el)}
                    >
                      <img src="/assets/Asset 35.svg" alt="Open project" />
                    </a>                  </div>
                  <div className="card-visual">
                    <div className="card-image-wrapper">
                      <img src={project.image} alt={project.name} className="card-image" loading="eager" />
                      <div className="card-image-overlay" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="stacked-controls-overlay">
          <div className="view-all-link-wrapper">
            <Link to="/work" className="view-all-stacked">
              View All Projects <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Controls Footer - Outside section for mobile */}
      <div className="selected-projects-footer">
        <div className="view-all-link-wrapper">
          <Link to="/work" className="view-all-stacked">
            View All Projects <span>→</span>
          </Link>
        </div>
      </div>
    </>
  )
}

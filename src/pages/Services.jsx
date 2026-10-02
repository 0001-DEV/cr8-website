import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Services.css'

export default function Services() {
  const navigate = useNavigate()
  const [activeService, setActiveService] = useState(0)
  const itemRefs = useRef([])

  // 3 service sections using specified images and custom content
  const servicesData = [
    {
      id: 1,
      slug: 'brand-memorability',
      image: '/assets/Paper postal packages.webp',
      title: 'Brand Memorability',
      subtitle: 'Make the brand impossible to overlook.',
      description:
        'We build brands with clarity, character and distinction. From strategy and architecture to identity and creative direction.',
      capabilities: [
        'Brand Strategy',
        'Brand Architecture',
        'Brand Identity',
        'Visual Systems',
        'Creative Direction',
      ],
    },
    {
      id: 2,
      slug: 'tangible-thinking',
      image: '/assets/Asset 1 (1).webp',
      title: 'Tangible Thinking',
      subtitle: 'Turn good ideas into things people can experience.',
      description:
        'We transform opportunities and ideas into tangible products, concepts and experiences.',
      capabilities: [
        'Concept Development',
        'Product Design',
        'Industrial Design',
        'Experience Design',
        'Prototyping',
      ],
    },
    {
      id: 3,
      slug: 'brand-signatures',
      image: '/assets/nigerian-breweries-23.webp',
      title: 'Brand Signatures',
      subtitle: 'Create the things people remember the brand by.',
      description:
        'We create distinctive physical expressions of brands from corporate gifts and merchandise to commemorative identities, objects and limited-edition pieces.',
      capabilities: [
        'Corporate Gifts',
        'Brand Memorabilia',
        'Commemorative Design',
        'Bespoke Objects',
        'Special Projects',
      ],
    },
  ]

  const scrollToService = (index) => {
    setActiveService(index)
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        const foundIndex = servicesData.findIndex((s) => s.slug === hash)
        if (foundIndex !== -1 && itemRefs.current[foundIndex]) {
          setActiveService(foundIndex)
          setTimeout(() => {
            itemRefs.current[foundIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 150)
          return true
        }
      }
      return false
    }

    if (!handleHash()) {
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    const prevPage = sessionStorage.getItem('previousPage')
    if (prevPage) {
      navigate(prevPage)
    } else {
      navigate(-1)
    }
  }

  // Track scroll position so the second image shows exactly when scrolling to the second text
  useEffect(() => {
    const handleScroll = () => {
      // Trigger when the text block content reaches the upper/middle reading zone
      const vh = window.innerHeight || document.documentElement.clientHeight
      const triggerPoint = vh * 0.45
      let currentActive = 0

      itemRefs.current.forEach((el, index) => {
        if (!el) return
        const target = el.querySelector('.services-item-inner') || el
        const rect = target.getBoundingClientRect()
        if (rect.top <= triggerPoint) {
          currentActive = index
        }
      })

      // If user has scrolled near the bottom of the page, ensure the last service is active
      const scrollPos = window.scrollY || window.pageYOffset
      const docHeight = document.documentElement.scrollHeight
      if (scrollPos + vh >= docHeight - 80 && itemRefs.current.length > 0) {
        currentActive = itemRefs.current.length - 1
      }

      setActiveService(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const [openAccordion, setOpenAccordion] = useState(null)

  const toggleAccordion = (index) => {
    setOpenAccordion((prev) => (prev === index ? null : index))
  }

  const thinkingItems = [
    {
      id: 'understand',
      title: 'Understand',
      content:
        "Every project starts with questions. We immerse ourselves in the brand, its audience, its market and the problem we're trying to solve. We listen, research and challenge assumptions before we put pen to paper.",
    },
    {
      id: 'define',
      title: 'Define',
      content:
        "We turn what we've learned into a clear direction. We identify the opportunity, establish the core idea and define what the solution needs to achieve, giving creativity a purpose beyond aesthetics.",
    },
    {
      id: 'develop',
      title: 'Develop',
      content:
        'This is where thinking becomes tangible. We explore, experiment and refine ideas across identity, products, concepts and experiences until we find the solution that feels both right and unmistakably yours.',
    },
    {
      id: 'deliver',
      title: 'Deliver',
      content:
        `A great idea means little if it doesn't work in the real world. We bring the solution to life with precision, consistency and attention to detail, creating work designed to be seen, experienced and remembered.`,
    },
  ]

  const clientLogos = [
    '/assets/Asset 24.webp',
    '/assets/Asset 25.webp',
    '/assets/Asset 26.webp',
    '/assets/Asset 27.webp',
    '/assets/Asset 28.webp',
    '/assets/Asset 29.webp',
    '/assets/Asset 30.webp',
  ]

  return (
    <div className="services-page-container">
      <Header />
      <main className="services-main-content">
        <div className="services-back-nav">
          <button onClick={handleBackClick} className="services-back-btn">
            ← Back
          </button>
        </div>

        {/* Hero Section */}
        <section className="services-hero-section">
          <div className="services-hero-content">
            <h1 className="services-hero-title">
              We don't just make things.<br />
              We make brands matter.
            </h1>
            <p className="services-hero-subtitle">
              In a crowded marketplace, being good isn't always enough. We create
              solutions backed by excellent thinking, helping ambitious brands
              stand out, connect and be remembered.
            </p>
          </div>
        </section>

        {/* Pinned Image on Left + Scrolling Text Content on Right */}
        <section className="services-showcase-section">
          {/* Left Column: Sticky Pinned Image */}
          <div className="services-sticky-col">
            <div className="services-sticky-card">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className={`services-image-layer ${
                    activeService === index ? 'is-active' : ''
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="services-showcase-img"
                   loading="lazy" decoding="async"/>
                  <div className="services-image-vignette" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Scrolling Service Text */}
          <div className="services-scroll-col">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                id={service.slug}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                onClick={() => scrollToService(index)}
                className={`services-item-block ${
                  activeService === index ? 'is-focused' : ''
                }`}
              >
                <div className="services-item-inner">
                  <h2 className="services-item-title">{service.title}</h2>
                  <p className="services-item-tagline">{service.subtitle}</p>
                  <p className="services-item-desc">{service.description}</p>

                  <div className="services-capabilities-list">
                    {service.capabilities.map((cap, capIndex) => (
                      <div key={capIndex} className="services-capability-row">
                        <span className="services-gray-dot" />
                        <span className="services-capability-text">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our clientele and trusted partners section */}
        <section className="services-clientele">
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
                   loading="lazy" decoding="async"/>
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
                   loading="lazy" decoding="async"/>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Good work starts with good thinking section */}
        <section className="services-thinking-section">
          <div className="services-thinking-header">
            <h2 className="services-thinking-title">
              Good work starts with good thinking.
            </h2>
            <p className="services-thinking-subtitle">
              We don't jump straight into making. We take the time to understand
              the problem, find the opportunity and build the right solution.
            </p>
          </div>

          <div className="services-accordion-list">
            {thinkingItems.map((item, index) => {
              const isOpen = openAccordion === index
              return (
                <div
                  key={item.id}
                  className={`services-accordion-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="services-accordion-trigger"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="services-accordion-name">{item.title}</span>
                    <span
                      className={`services-accordion-icon ${isOpen ? 'is-open' : ''}`}
                      aria-hidden="true"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="9"
                          y1="1"
                          x2="9"
                          y2="17"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <line
                          x1="1"
                          y1="9"
                          x2="17"
                          y2="9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`services-accordion-body ${isOpen ? 'is-open' : ''}`}
                  >
                    <div className="services-accordion-content">
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

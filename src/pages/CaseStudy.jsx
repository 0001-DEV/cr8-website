import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Page.css'

function RenaissanceCarousel({ images: customImages, carouselId = 'renaissance-carousel-1', autoPlayInterval = 1800, imageGap = 2 }) {
  const [rightIndex, setRightIndex] = useState(1)
  const [slideDirection, setSlideDirection] = useState('next')
  const [hasEntered, setHasEntered] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef(null)

  const defaultImages = [
    { id: 1, src: '/assets/RENDER 1.jpg', alt: 'Renaissance Render 1' },
    { id: 2, src: '/assets/RENDER 13 copy.jpg', alt: 'Renaissance Render 13' },
    { id: 3, src: '/assets/RENDER 12.jpg', alt: 'Renaissance Render 12' },
    { id: 4, src: '/assets/RENDER 11.jpg', alt: 'Renaissance Render 11' },
    { id: 5, src: '/assets/RENDER 7.jpg', alt: 'Renaissance Render 7' },
  ]

  const images = customImages || defaultImages

  const showNext = useCallback(() => {
    setSlideDirection('next')
    setRightIndex((prev) => (prev + 1 >= images.length ? 1 : prev + 1))
  }, [images.length])

  const showPrevious = () => {
    setSlideDirection('prev')
    setRightIndex((prev) => (prev <= 1 ? images.length - 1 : prev - 1))
  }

  // Intersection observer to track when carousel is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasEntered(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Auto-play sliding continuously once user scrolls to the carousel section
  useEffect(() => {
    if (!hasEntered || isHovered) return

    const timer = setInterval(() => {
      showNext()
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [hasEntered, isHovered, showNext, autoPlayInterval])

  const staticImage = images[0]
  const activeRightImage = images[rightIndex] || images[1]

  return (
    <section
      ref={sectionRef}
      className={`renaissance-carousel-nav-section ${hasEntered ? 'in-view' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`renaissance-carousel-images ${imageGap === 4 ? 'renaissance-carousel-images--gap-4' : ''} ${imageGap === 8 ? 'renaissance-carousel-images--gap-8' : ''}`}
      >
        {/* Left Image: Always Static (First Image) */}
        <div className="renaissance-carousel-image-card renaissance-carousel-image-card--static">
          <img
            src={staticImage.src}
            alt={staticImage.alt}
            loading="eager"
          />
        </div>

        {/* Right Image: Swipes in Next Image in sequence */}
        <div
          key={`${carouselId}-right-${rightIndex}-${slideDirection}`}
          className={`renaissance-carousel-image-card renaissance-carousel-image-card--animated renaissance-carousel-image-card--${slideDirection}`}
        >
          <img
            src={activeRightImage.src}
            alt={activeRightImage.alt}
            loading="eager"
          />
        </div>
      </div>

      <button
        type="button"
        className="renaissance-nav-arrow renaissance-nav-arrow--prev"
        onClick={showPrevious}
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        type="button"
        className="renaissance-nav-arrow renaissance-nav-arrow--next"
        onClick={showNext}
        aria-label="Next image"
      >
        →
      </button>
    </section>
  )
}

const slugToIdMap = {
  '1': '1',
  'rainoil': '1',
  'rain-oil': '1',
  '2': '2',
  'nigerian-breweries': '2',
  'nigerianbreweries': '2',
  '3': '3',
  'renaissance': '3',
  '4': '4',
  'guinness': '4',
}

const idToSlugMap = {
  '1': 'rainoil',
  '2': 'nigerian-breweries',
  '3': 'renaissance',
  '4': 'guinness',
}

export default function CaseStudy() {
  const navigate = useNavigate()
  const { id: rawParam } = useParams()
  const normalizedParam = rawParam ? rawParam.toLowerCase() : '1'
  const id = slugToIdMap[normalizedParam] || normalizedParam
  const currentSlug = idToSlugMap[id] || normalizedParam

  const handleNextProject = (targetKey) => {
    const targetSlug = idToSlugMap[targetKey] || targetKey
    sessionStorage.setItem('caseStudyReferrer', `/project/${currentSlug}`)
    navigate(`/project/${targetSlug}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    sessionStorage.removeItem('caseStudyReferrer')
    const prevPage = sessionStorage.getItem('previousPage')
    if (prevPage) {
      navigate(prevPage)
    } else {
      navigate(-1)
    }
  }

  // Store referrer when coming from another case study
  useEffect(() => {
    const currentPath = `/project/${currentSlug}`
    return () => {
      // Store current path as referrer when navigating away
      if (window.location.pathname.startsWith('/project/') || window.location.pathname.startsWith('/case-study/')) {
        sessionStorage.setItem('caseStudyReferrer', currentPath)
      }
    }
  }, [currentSlug])

  if (id !== '1') {
    return (
      <div className="rainoil-page-container">
        <Header />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1920px', margin: '0 auto', padding: '90px 2rem 0 2rem' }}>
          <button onClick={handleBackClick} className="page-back">← Back</button>
        </div>
        
        {/* Renaissance Case Study (id=3) */}
        {id === '3' && (
          <>
            {/* Section 1: Hero Section (w=1920, h=667) */}
            <section className="renaissance-hero-section">
              <h1 className="renaissance-hero-title">Renaissance</h1>
              <div className="renaissance-hero-paragraphs">
                <p>
                  Renaissance Africa Energy Company represents a new chapter for Africa's energy sector. As the brand set out to define its identity, it needed physical experiences that reflected the same ambition.
                </p>
                <p>
                  Rather than creating conventional corporate merchandise, we developed a collection of executive and commemorative items that transform everyday interactions into memorable brand moments. Every piece was designed to reinforce Renaissance's identity while making employees, partners, and stakeholders feel genuinely valued.
                </p>
              </div>
            </section>

            {/* Section 2: POST PROCESS 8 Image (w=1920, h=980) */}
            <section className="renaissance-image-section">
              <img
                src="/assets/POST PROCESS 8.jpg"
                alt="Renaissance Post Process 8"
              />
            </section>

            {/* Section 3: The Challenge & Making Vision Tangible */}
            <section className="rainoil-challenge-section">
              <div className="rainoil-challenge-content">
                <h2 className="rainoil-challenge-subheading">The Challenge</h2>
                <h1 className="rainoil-challenge-heading">Making Vision Tangible</h1>
                <div className="rainoil-challenge-body">
                  <p>
                    Energy powers industries and economies, but its impact is rarely something people can physically hold. Our challenge was to translate Renaissance's vision of transformation, African leadership, and industrial growth into tangible objects that people would use, remember, and associate with the brand.
                  </p>
                  <p>
                    The goal wasn't visibility alone, it was memorability.
                  </p>
                </div>
              </div>

              <div className="rainoil-sector-badge">
                <div className="rainoil-sector-text">
                  <span className="rainoil-sector-label">Sector:</span><br />
                  Oil & Gas
                </div>
              </div>
            </section>

            {/* Section 4: RENDER 34 Image (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/RENDER 34.jpg"
                alt="Renaissance Render 34"
              />
            </section>

            {/* Section 5: Navigable Carousel - 2 images at once, 930px each */}
            <RenaissanceCarousel />

            {/* Section 6: Our Strategy Section */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Embedding the Brand</h1>
              <div className="rainoil-strategy-body">
                <p>
                  We designed the collection as a connected brand experience rather than a series of standalone products.
                </p>
                <p>
                  The Africa silhouette became a bold symbol of ownership and leadership, while the warm gradient reflects the journey from potential to progress. Every material, finish, and detail was chosen to express confidence, longevity, and purpose.
                </p>
                <p>
                  Instead of simply placing a logo on products, we embedded the brand into every interaction.
                </p>
              </div>
            </section>

            {/* Section 6: RENDER 9 copy Image (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/RENDER 9 copy.jpg"
                alt="Renaissance Render 9 Copy"
              />
            </section>

            {/* Section 7: Second Navigable Carousel (8px gap) */}
            <RenaissanceCarousel
              carouselId="renaissance-carousel-2"
              imageGap={8}
              images={[
                { id: 1, src: '/assets/RENDER 14.jpg', alt: 'Renaissance Render 14' },
                { id: 2, src: '/assets/RENDER 15.jpg', alt: 'Renaissance Render 15' },
                { id: 3, src: '/assets/RENDER 6.jpg', alt: 'Renaissance Render 6' },
                { id: 4, src: '/assets/RENDER 16.jpg', alt: 'Renaissance Render 16' },
                { id: 5, src: '/assets/RENDER 3.jpg', alt: 'Renaissance Render 3' },
              ]}
            />

            {/* Section 8: The Solution Section */}
            <section className="rainoil-solution-section">
              <h2 className="rainoil-solution-subheading">The Solution</h2>
              <h1 className="rainoil-solution-heading">The Brand<br />Made Tangible</h1>
              <div className="rainoil-solution-body">
                <p>
                  From diaries, notepads, mugs, and flasks to calendars, clocks, umbrellas, and wristbands, every item shares a unified visual language.
                </p>
                <p>
                  Designed for both executive settings and everyday use, the collection extends Renaissance's identity beyond the workplace, ensuring every touchpoint feels intentional, cohesive, and unmistakably connected to the brand.
                </p>
              </div>
            </section>

            {/* Section 9: POST PROCESS 22 Image (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/POST PROCESS 22.jpg"
                alt="Renaissance Post Process 22"
              />
            </section>

            {/* Section 10: RENDER 23 + RENDER 26 (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 23.jpg"
                  alt="Renaissance Render 23"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 26.jpg"
                  alt="Renaissance Render 26"
                />
              </div>
            </section>

            {/* Section 11: The Impact Section */}
            <section className="rainoil-solution-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-solution-subheading">The Impact</h2>
              <h1 className="rainoil-solution-heading">Designed to Leave a Mark</h1>
              <div className="rainoil-solution-body">
                <p>
                  Brands become memorable through repeated, meaningful experiences.
                </p>
                <p>
                  By turning practical objects into purposeful touchpoints, Renaissance gains more than branded merchandise. It creates lasting reminders of its vision, strengthens relationships with the people who matter most, and reinforces its position as a company helping shape Africa's energy future.
                </p>
              </div>
            </section>

            {/* Section 12: RENDER 27 + RENDER 28 copy (w=922.5, h=800 each, 4px gap) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 27.jpg"
                  alt="Renaissance Render 27"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 28 copy.jpg"
                  alt="Renaissance Render 28 Copy"
                />
              </div>
            </section>

            {/* Section 13: RENDER 30 (w=650, h=930) + RENDER 29 (w=1195, h=930) (4px gap) */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img
                  src="/assets/RENDER 30.jpg"
                  alt="Renaissance Render 30"
                />
              </div>
              <div className="renaissance-asym-1195-card">
                <img
                  src="/assets/RENDER 29.jpg"
                  alt="Renaissance Render 29"
                />
              </div>
            </section>

            {/* Section 14: POST PROCESS 37 + POST PROCESS 36 (w=922.5, h=800 each, 4px gap) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/POST PROCESS 37.jpg"
                  alt="Renaissance Post Process 37"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/POST PROCESS 36.jpg"
                  alt="Renaissance Post Process 36"
                />
              </div>
            </section>

            {/* Section 15: Third Navigable Carousel (4px gap) */}
            <RenaissanceCarousel
              carouselId="renaissance-carousel-3"
              imageGap={4}
              images={[
                { id: 1, src: '/assets/RENDER 35.jpg', alt: 'Renaissance Render 35' },
                { id: 2, src: '/assets/Umbrella Mockup_2.jpg', alt: 'Umbrella Mockup 2' },
                { id: 3, src: '/assets/Umbrella Mockup.png', alt: 'Umbrella Mockup' },
                { id: 4, src: '/assets/RON 1.png', alt: 'RON 1' },
                { id: 5, src: '/assets/Umbrella Mockupblack.jpg', alt: 'Umbrella Mockup Black' },
              ]}
            />

            {/* Spacer 90px */}
            <div style={{ height: '90px' }} />

            {/* Section 16: Next Project - POST PROCESS 2 with text overlay */}
            <section className="rainoil-next-project-section" style={{ marginTop: 0 }}>
              <img
                src="/assets/POST PROCESS 2.jpg"
                alt="POST PROCESS 2 Next Project"
              />
              <div
                className="rainoil-next-project-text rainoil-next-project-text--black"
                style={{ cursor: 'pointer' }}
                onClick={() => handleNextProject('guinness')}
              >
                NEXT PROJECT
              </div>
            </section>
          </>
        )}
        
        {/* Guinness Case Study (id=4) */}
        {id === '4' && (
          <>
            <section className="rainoil-hero-section">
              <h1 className="rainoil-hero-title">Guinness</h1>
              <div className="rainoil-hero-paragraphs">
                <p>
                  For 75 years, Guinness Nigeria has been woven into the country's celebrations, culture, and history. To honour this milestone, Xtreme Cr8tivity developed a commemorative identity system inspired by the iconic Guinness harp, extending across a 75th anniversary logo, branded memorabilia, and campaign concepts. The goal was simple: celebrate a remarkable legacy while creating a visual language worthy of its future.
                </p>
              </div>
            </section>
            
            <section className="rainoil-image-section">
              <img
                src="/assets/RENDER 9 copy 2.jpg"
                alt="Guinness Render 9 Copy 2"
              />
            </section>

            {/* Repeat Challenge Section from Rain Oil */}
            <section className="rainoil-challenge-section">
              <div className="rainoil-challenge-content">
                <h2 className="rainoil-challenge-subheading">The Challenge</h2>
                <h1 className="rainoil-challenge-heading">The Missing Connection</h1>
                <div className="rainoil-challenge-body">
                  <p>
                    The old commemorative solutions are outdated, Rainoil needed something that reflected the scale, sophistication, or engineering excellence behind the brand. Like many forms of corporate merchandise, they served a functional purpose but did little to create a lasting emotional connection or reinforce what Rainoil truly represents.
                  </p>
                  <p>
                    The challenge wasn't simply to design better gifts. It was to create memorable brand experiences, objects that clients would value, keep, and associate with the Rainoil story long after receiving them.
                  </p>
                </div>
              </div>

              <div className="rainoil-sector-badge">
                <div className="rainoil-sector-text">
                  <span className="rainoil-sector-label">Sector:</span><br />
                  Food & Beverages
                </div>
              </div>
            </section>

            {/* Section 4: RENDER 8 Image (w=1870, h=1080) */}
            <section className="rainoil-cup7-section" style={{ height: 'auto', minHeight: 'auto' }}>
              <img
                src="/assets/RENDER 8.jpg"
                alt="Guinness Render 8"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </section>

            {/* Section 5: RENDER 4 + RENDER 5 (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 4.jpg"
                  alt="Guinness Render 4"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 5.jpg"
                  alt="Guinness Render 5"
                />
              </div>
            </section>

            {/* Section 6: Our Strategy Section (Replicated from Renaissance) */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Embedding the Brand</h1>
              <div className="rainoil-strategy-body">
                <p>
                  We designed the collection as a connected brand experience rather than a series of standalone products.
                </p>
                <p>
                  The Africa silhouette became a bold symbol of ownership and leadership, while the warm gradient reflects the journey from potential to progress. Every material, finish, and detail was chosen to express confidence, longevity, and purpose.
                </p>
                <p>
                  Instead of simply placing a logo on products, we embedded the brand into every interaction.
                </p>
              </div>
            </section>

            {/* Section 7: RENDER 6 GUINNESS + RENDER 7 copy (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 6 GUINNESS.png"
                  alt="Guinness Render 6"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 7 copy.jpg"
                  alt="Guinness Render 7 Copy"
                />
              </div>
            </section>

            {/* Section 8: LOOK DEV 3 Image (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/LOOK DEV 3.jpg"
                alt="Guinness Look Dev 3"
              />
            </section>

            {/* Section 9: The Solution Section (Replicated from Renaissance) */}
            <section className="rainoil-solution-section">
              <h2 className="rainoil-solution-subheading">The Solution</h2>
              <h1 className="rainoil-solution-heading">The Brand<br />Made Tangible</h1>
              <div className="rainoil-solution-body">
                <p>
                  From diaries, notepads, mugs, and flasks to calendars, clocks, umbrellas, and wristbands, every item shares a unified visual language.
                </p>
                <p>
                  Designed for both executive settings and everyday use, the collection extends Renaissance's identity beyond the workplace, ensuring every touchpoint feels intentional, cohesive, and unmistakably connected to the brand.
                </p>
              </div>
            </section>

            {/* Section 10: RENDER 12 copy (w=650, h=930) + RENDER 11 copy (w=1195, h=930) (4px gap) */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img
                  src="/assets/RENDER 12 copy.jpg"
                  alt="Guinness Render 12 Copy"
                />
              </div>
              <div className="renaissance-asym-1195-card">
                <img
                  src="/assets/RENDER 11 copy.jpg"
                  alt="Guinness Render 11 Copy"
                />
              </div>
            </section>

            {/* Section 11: LOOK DEV 4 + RENDER 10 (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/LOOK DEV 4.jpg"
                  alt="Guinness Look Dev 4"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 10.jpg"
                  alt="Guinness Render 10"
                />
              </div>
            </section>

            {/* Section 12: The Impact Section (Replicated from Renaissance) */}
            <section className="rainoil-solution-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-solution-subheading">The Impact</h2>
              <h1 className="rainoil-solution-heading">Designed to Leave a Mark</h1>
              <div className="rainoil-solution-body">
                <p>
                  Brands become memorable through repeated, meaningful experiences.
                </p>
                <p>
                  By turning practical objects into purposeful touchpoints, Renaissance gains more than branded merchandise. It creates lasting reminders of its vision, strengthens relationships with the people who matter most, and reinforces its position as a company helping shape Africa's energy future.
                </p>
              </div>
            </section>

            {/* Section 13: RENDER 17_EDIT_FULL + RENDER 18_EDIT_FULL (w=922.5, h=800 each, 4px gap) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 17_EDIT_FULL.png"
                  alt="Guinness Render 17 Edit Full"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 18_EDIT_FULL.png"
                  alt="Guinness Render 18 Edit Full"
                />
              </div>
            </section>

            {/* Section 14: RENDER 19 (w=650, h=930) + RENDER 20_EDIT_FULL (w=1195, h=930) (4px gap) */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img
                  src="/assets/RENDER 19.jpg"
                  alt="Guinness Render 19"
                />
              </div>
              <div className="renaissance-asym-1195-card">
                <img
                  src="/assets/RENDER 20_EDIT_FULL.png"
                  alt="Guinness Render 20 Edit Full"
                />
              </div>
            </section>

            {/* Section 15: RENDER 21_EDIT_FULL + RENDER 22_EDIT_FULL (w=922.5, h=800 each, 4px gap) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 21_EDIT_FULL.png"
                  alt="Guinness Render 21 Edit Full"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 22_EDIT_FULL.png"
                  alt="Guinness Render 22 Edit Full"
                />
              </div>
            </section>

            {/* Section 16: RENDER 15_EDIT_FULL + RENDER 16_EDIT_FULL (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 15_EDIT_FULL.png"
                  alt="Guinness Render 15 Edit Full"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 16_EDIT_FULL.png"
                  alt="Guinness Render 16 Edit Full"
                />
              </div>
            </section>

            {/* Spacer 110px */}
            <div style={{ height: '110px' }} />

            {/* Section 17: Next Project - POST PROCESS 2 with black text overlay */}
            <section className="rainoil-next-project-section" style={{ marginTop: 0 }}>
              <img
                src="/assets/POST PROCESS 2.jpg"
                alt="POST PROCESS 2 Next Project"
              />
              <div
                className="rainoil-next-project-text rainoil-next-project-text--black"
                style={{ cursor: 'pointer' }}
                onClick={() => handleNextProject('rainoil')}
              >
                NEXT PROJECT
              </div>
            </section>
          </>
        )}
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="rainoil-page-container">
      <Header />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1920px', margin: '0 auto', padding: '90px 2rem 0 2rem' }}>
        <button onClick={handleBackClick} className="page-back">← Back</button>
      </div>

      {/* Section 1: Hero Section (w=1156, h=448) */}
      <section className="rainoil-hero-section">
        <h1 className="rainoil-hero-title">Rain Oil</h1>
        <div className="rainoil-hero-paragraphs">
          <p>
            Rainoil is one of Nigeria's leading downstream oil and gas companies, built on the movement, storage, distribution, and reliable delivery of energy. Every part of its operation is engineered for efficiency, precision, and trust — qualities that have shaped the brand's reputation over the years.
          </p>
          <p>
            As the company continued to evolve, it became clear that the way clients experienced the brand needed to evolve alongside it.
          </p>
        </div>
      </section>

      {/* Section 2: RAINOIL_RENDER_POST_PROCESS_5.jpg (w=1920, h=804) */}
      <section className="rainoil-image-section">
        <img
          src="/assets/RAINOIL_RENDER_POST_PROCESS_5.jpg"
          alt="Rain Oil Render Post Process 5"
        />
      </section>

      {/* Section 3: The Challenge & The Missing Connection */}
      <section className="rainoil-challenge-section">
        <div className="rainoil-challenge-content">
          <h2 className="rainoil-challenge-subheading">The Challenge</h2>
          <h1 className="rainoil-challenge-heading">The Missing Connection</h1>
          <div className="rainoil-challenge-body">
            <p>
              The old commemorative solutions are outdated, Rainoil needed something that reflected the scale, sophistication, or engineering excellence behind the brand. Like many forms of corporate merchandise, they served a functional purpose but did little to create a lasting emotional connection or reinforce what Rainoil truly represents.
            </p>
            <p>
              The challenge wasn't simply to design better gifts. It was to create memorable brand experiences, objects that clients would value, keep, and associate with the Rainoil story long after receiving them.
            </p>
          </div>
        </div>

        <div className="rainoil-sector-badge">
          <div className="rainoil-sector-text">
            <span className="rainoil-sector-label">Sector:</span><br />
            Oil & Gas
          </div>
        </div>
      </section>

      {/* Section 4: Rainoil Compiled Render (w=1852, h=1080) */}
      <section className="rainoil-compiled-section">
        <img
          src="/assets/RAINOIL_COMPILED_RENDER_1.jpg"
          alt="Rainoil Compiled Render"
        />
      </section>

      {/* Section 5: Two Side-by-Side Flask Images (w=923, h=930 each) */}
      <section className="rainoil-flasks-section">
        <div className="rainoil-flask-card">
          <img
            src="/assets/RAINOIL_FLASK_RENDER_8.jpg"
            alt="Rainoil Flask Render 8"
          />
        </div>
        <div className="rainoil-flask-card">
          <img
            src="/assets/RAINOIL_FLASK_RENDER_6.jpg"
            alt="Rainoil Flask Render 6"
          />
        </div>
      </section>

      {/* Section 6: Our Strategy & Bridging the Experience (w=1920, h=1002) */}
      <section className="rainoil-strategy-section">
        <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
        <h1 className="rainoil-strategy-heading">Bridging the Experience</h1>
        <div className="rainoil-strategy-body">
          <p>
            Rather than applying Rainoil's identity to generic merchandise, we looked inward to the brand's own world for inspiration.
          </p>
          <p>
            We translated industrial characteristics into a collection of commemorative items inspired by the visual language of the energy industry itself. From petroleum storage tanks to structural containment systems, familiar engineering forms became the foundation for refined, functional objects that feel unmistakably connected to the brand.
          </p>
          <p>
            Every design decision was guided by a single objective: create memorabilia that doesn't just carry the Rainoil logo, but embodies the essence of the company behind it.
          </p>
        </div>
      </section>

      {/* Section 7: Flask 3 (w=650, h=930) + Post Process 5 (w=1195, h=930) */}
      <section className="rainoil-flask3-postprocess-section">
        <div className="rainoil-flask3-card">
          <img
            src="/assets/RAINOIL_FLASK_RENDER_3.jpg"
            alt="Rainoil Flask Render 3"
          />
        </div>
        <div className="rainoil-postprocess5-card">
          <img
            src="/assets/RAINOIL_RENDER_POST_PROCESS_5.jpg"
            alt="Rainoil Render Post Process 5"
          />
        </div>
      </section>

      {/* Section 8: Cup Render 7 (w=1870, h=1080) */}
      <section className="rainoil-cup7-section">
        <img
          src="/assets/RAINOIL_CUP_RENDER_7.jpg"
          alt="Rainoil Cup Render 7"
        />
      </section>

      {/* Section 9: Cup Render 10 (w=922.5, h=930) + Cup Render 9 (w=922.5, h=930) */}
      <section className="rainoil-cups-9-10-section">
        <div className="rainoil-cup-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_10.jpg"
            alt="Rainoil Cup Render 10"
          />
        </div>
        <div className="rainoil-cup-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_9.jpg"
            alt="Rainoil Cup Render 9"
          />
        </div>
      </section>

      {/* Section 10: Cup Render 6 (w=922.5, h=930) + Cup Render 3 (w=922.5, h=930) */}
      <section className="rainoil-cups-6-3-section">
        <div className="rainoil-cup63-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_6.jpg"
            alt="Rainoil Cup Render 6"
          />
        </div>
        <div className="rainoil-cup63-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_3.jpg"
            alt="Rainoil Cup Render 3"
          />
        </div>
      </section>

      {/* Section 11: The Solution & A Lasting Impression (w=1912, h=864) */}
      <section className="rainoil-solution-section">
        <h2 className="rainoil-solution-subheading">The Solution</h2>
        <h1 className="rainoil-solution-heading">A Lasting Impression</h1>
        <div className="rainoil-solution-body">
          <p>
            The result was a cohesive collection of commemorative pieces, including flasks, mugs, stainless steel cups, diaries, and calendars, designed to transform everyday interactions into meaningful brand touchpoints.
          </p>
          <p>
            More than promotional merchandise, each item was created to strengthen brand memorability, communicate appreciation, and give clients something worth keeping. By embedding Rainoil's operational DNA into every object, the collection becomes a physical extension of the brand itself — one that reinforces identity, celebrates relationships, and leaves a lasting impression long after the moment of exchange.
          </p>
        </div>
      </section>

      {/* Section 12: Rainoil Compiled Render 1 (w=1195, h=1020) + Cup Render 8 (w=650, h=1020) */}
      <section className="rainoil-compiled-cup8-section">
        <div className="rainoil-compiled-card">
          <img
            src="/assets/RAINOIL_COMPILED_RENDER_1.jpg"
            alt="Rainoil Compiled Render 1"
          />
        </div>
        <div className="rainoil-cup8-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_8.jpg"
            alt="Rainoil Cup Render 8"
          />
        </div>
      </section>

      {/* Section 13: Mug Render 1 (w=922.5, h=800) + Mug Render 2 (w=922.5, h=800) */}
      <section className="rainoil-mugs-1-2-section">
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_1.jpg"
            alt="Rainoil Mug Render 1"
          />
        </div>
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_2.jpg"
            alt="Rainoil Mug Render 2"
          />
        </div>
      </section>

      {/* Section 14: Mug Render 7 (w=650, h=930) + Mug Render 3 (w=1195, h=930) */}
      <section className="rainoil-mug1-mug3-section">
        <div className="rainoil-mug650-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_7.jpg"
            alt="Rainoil Mug Render 7"
          />
        </div>
        <div className="rainoil-mug1195-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_3.jpg"
            alt="Rainoil Mug Render 3"
          />
        </div>
      </section>

      {/* Section 15: Mug Render 4 (w=922.5, h=800) + Mug Render 6 (w=922.5, h=800) */}
      <section className="rainoil-mugs-4-6-section">
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_4.jpg"
            alt="Rainoil Mug Render 4"
          />
        </div>
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_6.jpg"
            alt="Rainoil Mug Render 6"
          />
        </div>
      </section>

      {/* Spacer 110px */}
      <div style={{ height: '110px' }} />

      {/* Section 16: Next Project - LOOK DEV 2 (w=1870, h=380) with text overlay */}
      <section className="rainoil-next-project-section" style={{ marginTop: 0 }}>
        <img
          src="/assets/LOOK DEV 2.png"
          alt="LOOK DEV 2 Next Project"
        />
        <div
          className="rainoil-next-project-text"
          style={{ cursor: 'pointer' }}
          onClick={() => handleNextProject('guinness')}
        >
          NEXT PROJECT
        </div>
      </section>
      <Footer />
    </div>
  )
}

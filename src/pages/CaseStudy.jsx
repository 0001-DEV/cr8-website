import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Page.css'

function RenaissanceCarousel({ images: customImages, carouselId = 'renaissance-carousel-1', autoPlayInterval = 1200, imageGap = 2, imageHeight = 930, className = '', style = {} }) {
  const [rightIndex, setRightIndex] = useState(1)
  const [prevRightIndex, setPrevRightIndex] = useState(1)
  const [slideDirection, setSlideDirection] = useState('next')
  const [hasEntered, setHasEntered] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef(null)

  const defaultImages = [
    { id: 1, src: '/assets/RENDER 1.webp', alt: 'Renaissance Render 1' },
    { id: 2, src: '/assets/RENDER 13 copy.webp', alt: 'Renaissance Render 13' },
    { id: 3, src: '/assets/RENDER 12.webp', alt: 'Renaissance Render 12' },
    { id: 4, src: '/assets/RENDER 11.webp', alt: 'Renaissance Render 11' },
    { id: 5, src: '/assets/RENDER 7.webp', alt: 'Renaissance Render 7' },
  ]

  const images = customImages || defaultImages

  const showNext = useCallback(() => {
    setSlideDirection('next')
    setRightIndex((prev) => {
      setPrevRightIndex(prev)
      return prev + 1 >= images.length ? 1 : prev + 1
    })
  }, [images.length])

  const showPrevious = () => {
    setSlideDirection('prev')
    setRightIndex((prev) => {
      setPrevRightIndex(prev)
      return prev <= 1 ? images.length - 1 : prev - 1
    })
  }

  // Intersection observer to track when carousel is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasEntered(entry.isIntersecting)
      },
      { threshold: 0.05 }
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

    // Trigger first slide immediately upon entering view
    const immediateTimeout = setTimeout(() => {
      showNext()
    }, 100)

    const timer = setInterval(() => {
      showNext()
    }, autoPlayInterval)

    return () => {
      clearTimeout(immediateTimeout)
      clearInterval(timer)
    }
  }, [hasEntered, isHovered, showNext, autoPlayInterval])

  const staticImage = images[0]
  const activeRightImage = images[rightIndex] || images[1]
  const backdropRightImage = images[prevRightIndex] || images[1]

  return (
    <section
      ref={sectionRef}
      className={`renaissance-carousel-nav-section ${className} ${hasEntered ? 'in-view' : ''}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`renaissance-carousel-images ${imageGap === 4 ? 'renaissance-carousel-images--gap-4' : ''} ${imageGap === 8 ? 'renaissance-carousel-images--gap-8' : ''}`}
      >
        {/* Left Image: Always Static (First Image) */}
        <div className="renaissance-carousel-image-card renaissance-carousel-image-card--static" style={{ aspectRatio: `922.5 / ${imageHeight}`, maxHeight: `${imageHeight}px` }}>
          <img
            src={staticImage.src}
            alt={staticImage.alt}
            loading="eager"
          />
        </div>

        {/* Right Image Slot: Backdrop + Smooth Top Slide Layer (Zero Flickering) */}
        <div className="renaissance-carousel-right-slot" style={{ aspectRatio: `922.5 / ${imageHeight}`, maxHeight: `${imageHeight}px` }}>
          <div className="renaissance-carousel-image-card renaissance-carousel-image-card--backdrop" style={{ aspectRatio: `922.5 / ${imageHeight}`, maxHeight: `${imageHeight}px` }}>
            <img
              src={backdropRightImage.src}
              alt={backdropRightImage.alt}
              loading="eager"
            />
          </div>

          <div
            key={`${carouselId}-right-${rightIndex}-${slideDirection}`}
            className={`renaissance-carousel-image-card renaissance-carousel-image-card--animated renaissance-carousel-image-card--${slideDirection}`}
            style={{ aspectRatio: `922.5 / ${imageHeight}`, maxHeight: `${imageHeight}px` }}
          >
            <img
              src={activeRightImage.src}
              alt={activeRightImage.alt}
              loading="eager"
            />
          </div>
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
  '5': '5',
  'adnoc': '5',
  '6': '6',
  'seplat': '6',
  'seplat-energy': '6',
  '7': '7',
  'mtn': '7',
  '8': '8',
  'stanbic': '8',
  'stanbic-ibtc': '8',
}

const idToSlugMap = {
  '1': 'rainoil',
  '2': 'nigerian-breweries',
  '3': 'renaissance',
  '4': 'guinness',
  '5': 'adnoc',
  '6': 'seplat',
  '7': 'mtn',
  '8': 'stanbic',
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
        
        {/* Nigerian Breweries Case Study (id=2) */}
        {id === '2' && (
          <>
            {/* Section 1: Hero */}
            <section className="renaissance-hero-section">
              <h1 className="renaissance-hero-title">Nigerian Breweries</h1>
              <div className="renaissance-hero-paragraphs">
                <p>
                  Nigerian Breweries has spent 80 years brewing moments that have become part of Nigeria's story. For its 80th anniversary, Xtreme Cr8tivity set out a goal to turn that legacy into a commemorative experience, one that felt as significant, thoughtful and enduring as the milestone itself.
                </p>
              </div>
            </section>

            {/* Section 2: Collection 3 hero (w=1920, h=980) */}
            <section className="mtn-hero-image-section">
              <img
                src="/assets/NIGERIAN_BREWERIES_COLLECTION_3.webp"
                alt="Nigerian Breweries Collection 3"
              />
            </section>

            {/* Section 3: The Challenge */}
            <section className="rainoil-challenge-section">
              <div className="rainoil-challenge-content">
                <h2 className="rainoil-challenge-subheading">The Challenge</h2>
                <h1 className="rainoil-challenge-heading">The Weight of a Milestone</h1>
                <div className="rainoil-challenge-body">
                  <p>
                    The challenge was to move beyond conventional anniversary merchandise. Eight decades deserved more than branded objects; it needed a collection that could communicate history, longevity and pride while giving people something meaningful to experience and keep.
                  </p>
                </div>
              </div>
              <div className="rainoil-sector-badge">
                <div className="rainoil-sector-text">
                  <span className="rainoil-sector-label">Sector:</span><br />
                  Food &amp; Beverages
                </div>
              </div>
            </section>

            {/* Section 4: Award Kit 5 (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/NIGERIAN_BREWERIES_AWARD_KIT_5.webp"
                alt="Nigerian Breweries Award Kit 5"
              />
            </section>

            {/* Section 5: Award Kit 2 + Award Kit 1 (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_AWARD_KIT_2.webp"
                  alt="Nigerian Breweries Award Kit 2"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_AWARD_KIT_1.webp"
                  alt="Nigerian Breweries Award Kit 1"
                />
              </div>
            </section>

            {/* Section 6: Our Strategy */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Turning Legacy into Objects</h1>
              <div className="rainoil-strategy-body">
                <p>
                  We developed a visual language around the number 80, using the anniversary identity as the foundation for an entire collection. Every object was designed to carry a piece of the story, while maintaining a sense of cohesion, distinction and collectability.
                </p>
              </div>
            </section>

            {/* Section 7: Award Kit 3 + Nigerian Breweries (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_AWARD_KIT_3.webp"
                  alt="Nigerian Breweries Award Kit 3"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/Nigerian Breweries.webp"
                  alt="Nigerian Breweries"
                />
              </div>
            </section>

            {/* Section 8: Gold Award Render 6 (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_6.webp"
                alt="Nigerian Breweries Gold Award Render 6"
              />
            </section>

            {/* Section 9: Gold Award Render 5 + Gold Award Render 3 (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_5.webp"
                  alt="Nigerian Breweries Gold Award Render 5"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_3.webp"
                  alt="Nigerian Breweries Gold Award Render 3"
                />
              </div>
            </section>

            {/* Section 10: Silver Award Render 3 + Silver Award Render 4 (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_SILVER_AWARD_RENDER_3.webp"
                  alt="Nigerian Breweries Silver Award Render 3"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_SILVER_AWARD_RENDER_4.webp"
                  alt="Nigerian Breweries Silver Award Render 4"
                />
              </div>
            </section>

            {/* Section 11: The Solution */}
            <section className="rainoil-solution-section">
              <h2 className="rainoil-solution-subheading">The Solution</h2>
              <h1 className="rainoil-solution-heading">Eight Decades<br />Beautifully Unveiled</h1>
              <div className="rainoil-solution-body">
                <p>
                  The result was an extensive commemorative collection: an anniversary logo, bespoke gold and silver awards representing the longevity of brands within Nigerian Breweries, a logo-inspired gold corkscrew, a bespoke pen and bottle opener, eight commemorative coins representing eight decades, and a memory and timeline notebook. The collection was housed in a bespoke box inspired by the anniversary logo. To complement the collection we created a one-of-a-kind custom crate and bespoke key holders, turning every item itself into part of the experience.
                </p>
              </div>
            </section>

            {/* Section 12: Silver Award Render 5 (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/NIGERIAN_BREWERIES_SILVER_AWARD_RENDER_5.webp"
                alt="Nigerian Breweries Silver Award Render 5"
              />
            </section>

            {/* Section 13: Gold Coin Front (w=1195, h=1020) + Gold Coin Front & Back (w=650, h=1020) */}
            <section className="nb-coin-asym-section">
              <div className="nb-coin-1195-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_GOLD_COIN_FRONT.webp"
                  alt="Nigerian Breweries Gold Coin Front"
                />
              </div>
              <div className="nb-coin-650-card">
                <img
                  src="/assets/NIGERIAN_BREWERIES_GOLD_COIN_FRONT_&_BACK.webp"
                  alt="Nigerian Breweries Gold Coin Front and Back"
                />
              </div>
            </section>

            {/* Section 14: Carousel 1 — pen, accessories, corkscrew, collection (w=922.5, h=800) */}
            <RenaissanceCarousel
              carouselId="nb-carousel-1"
              className="nb-carousel-1"
              imageGap={4}
              imageHeight={800}
              autoPlayInterval={1200}
              images={[
                { id: 1, src: '/assets/pen.webp', alt: 'Nigerian Breweries Pen' },
                { id: 2, src: '/assets/NIGERIAN_BREWERIES_ACCESSORIES_EDITED_1.webp', alt: 'Nigerian Breweries Accessories' },
                { id: 3, src: '/assets/NIGERIAN_BREWERIES_GOLD_CORKSCREW.webp', alt: 'Nigerian Breweries Gold Corkscrew' },
                { id: 4, src: '/assets/NIGERIAN_BREWERIES_COLLECTION_1.webp', alt: 'Nigerian Breweries Collection 1' },
              ]}
            />

            {/* Section 15: Carousel 2 — Special Edition Crates (w=922.5, h=800) */}
            <RenaissanceCarousel
              carouselId="nb-carousel-2"
              className="nb-carousel-2"
              imageGap={4}
              imageHeight={800}
              autoPlayInterval={1200}
              images={[
                { id: 1, src: '/assets/NIGERIAN_BREWERIES_SPECIAL_EDITION_CRATE_1.webp', alt: 'Nigerian Breweries Special Edition Crate 1' },
                { id: 2, src: '/assets/NIGERIAN_BREWERIES_SPECIAL_EDITION_CRATE_3.webp', alt: 'Nigerian Breweries Special Edition Crate 3' },
                { id: 3, src: '/assets/NIGERIAN_BREWERIES_SPECIAL_EDITION_CRATE_4.webp', alt: 'Nigerian Breweries Special Edition Crate 4' },
                { id: 4, src: '/assets/NIGERIAN_BREWERIES_SPECIAL_EDITION_CRATE_2.webp', alt: 'Nigerian Breweries Special Edition Crate 2' },
              ]}
            />

            {/* Spacer */}
            <div style={{ height: '90px' }} />

            {/* Section 16: Next Project — Rain Oil (RAINOIL_RENDER_POST_PROCESS_5) */}
            <section
              className="rainoil-next-project-section"
              style={{ marginTop: 0 }}
              onClick={() => handleNextProject('rainoil')}
            >
              <img
                src="/assets/RAINOIL_RENDER_POST_PROCESS_5.webp"
                alt="Rain Oil Next Project"
              />
              <div className="rainoil-next-project-text">
                NEXT PROJECT
              </div>
            </section>
          </>
        )}

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
                src="/assets/POST PROCESS 8.webp"
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
                src="/assets/RENDER 34.webp"
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
                src="/assets/RENDER 9 copy.webp"
                alt="Renaissance Render 9 Copy"
              />
            </section>

            {/* Section 7: Second Navigable Carousel (8px gap) */}
            <RenaissanceCarousel
              carouselId="renaissance-carousel-2"
              imageGap={8}
              images={[
                { id: 1, src: '/assets/RENDER 14.webp', alt: 'Renaissance Render 14' },
                { id: 2, src: '/assets/RENDER 15.webp', alt: 'Renaissance Render 15' },
                { id: 3, src: '/assets/RENDER 6.webp', alt: 'Renaissance Render 6' },
                { id: 4, src: '/assets/RENDER 16.webp', alt: 'Renaissance Render 16' },
                { id: 5, src: '/assets/RENDER 3.webp', alt: 'Renaissance Render 3' },
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
                src="/assets/POST PROCESS 22.webp"
                alt="Renaissance Post Process 22"
              />
            </section>

            {/* Section 10: RENDER 23 + RENDER 26 (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 23.webp"
                  alt="Renaissance Render 23"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 26.webp"
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
                  src="/assets/RENDER 27.webp"
                  alt="Renaissance Render 27"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 28 copy.webp"
                  alt="Renaissance Render 28 Copy"
                />
              </div>
            </section>

            {/* Section 13: RENDER 30 (w=650, h=930) + RENDER 29 (w=1195, h=930) (4px gap) */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img
                  src="/assets/RENDER 30.webp"
                  alt="Renaissance Render 30"
                />
              </div>
              <div className="renaissance-asym-1195-card">
                <img
                  src="/assets/RENDER 29.webp"
                  alt="Renaissance Render 29"
                />
              </div>
            </section>

            {/* Section 14: POST PROCESS 37 + POST PROCESS 36 (w=922.5, h=800 each, 4px gap) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/POST PROCESS 37.webp"
                  alt="Renaissance Post Process 37"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/POST PROCESS 36.webp"
                  alt="Renaissance Post Process 36"
                />
              </div>
            </section>

            {/* Section 15: Third Navigable Carousel (4px gap) */}
            <RenaissanceCarousel
              carouselId="renaissance-carousel-3"
              imageGap={4}
              images={[
                { id: 1, src: '/assets/RENDER 35.webp', alt: 'Renaissance Render 35' },
                { id: 2, src: '/assets/Umbrella Mockup_2.webp', alt: 'Umbrella Mockup 2' },
                { id: 3, src: '/assets/Umbrella Mockup.webp', alt: 'Umbrella Mockup' },
                { id: 4, src: '/assets/RON 1.webp', alt: 'RON 1' },
                { id: 5, src: '/assets/Umbrella Mockupblack.webp', alt: 'Umbrella Mockup Black' },
              ]}
            />

            {/* Spacer 90px */}
            <div style={{ height: '90px' }} />

            {/* Section 16: Next Project - Nigerian Breweries */}
            <section
              className="rainoil-next-project-section"
              style={{ marginTop: 0 }}
              onClick={() => handleNextProject('nigerian-breweries')}
            >
              <img
                src="/assets/NIGERIAN_BREWERIES_COLLECTION_3.webp"
                alt="Nigerian Breweries Next Project"
              />
              <div className="rainoil-next-project-text">
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
                src="/assets/RENDER 9 copy 2.webp"
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
            <section className="rainoil-cup7-section">
              <img
                src="/assets/RENDER 8.webp"
                alt="Guinness Render 8"
              />
            </section>

            {/* Section 5: RENDER 4 + RENDER 5 (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 4.webp"
                  alt="Guinness Render 4"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 5.webp"
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
                  src="/assets/RENDER 6 GUINNESS.webp"
                  alt="Guinness Render 6"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 7 copy.webp"
                  alt="Guinness Render 7 Copy"
                />
              </div>
            </section>

            {/* Section 8: LOOK DEV 3 Image (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/LOOK DEV 3.webp"
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
                  src="/assets/RENDER 12 copy.webp"
                  alt="Guinness Render 12 Copy"
                />
              </div>
              <div className="renaissance-asym-1195-card">
                <img
                  src="/assets/RENDER 11 copy.webp"
                  alt="Guinness Render 11 Copy"
                />
              </div>
            </section>

            {/* Section 11: LOOK DEV 4 + RENDER 10 (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/LOOK DEV 4.webp"
                  alt="Guinness Look Dev 4"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 10.webp"
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
                  src="/assets/RENDER 17_EDIT_FULL.webp"
                  alt="Guinness Render 17 Edit Full"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 18_EDIT_FULL.webp"
                  alt="Guinness Render 18 Edit Full"
                />
              </div>
            </section>

            {/* Section 14: RENDER 19 (w=650, h=930) + RENDER 20_EDIT_FULL (w=1195, h=930) (4px gap) */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img
                  src="/assets/RENDER 19.webp"
                  alt="Guinness Render 19"
                />
              </div>
              <div className="renaissance-asym-1195-card">
                <img
                  src="/assets/RENDER 20_EDIT_FULL.webp"
                  alt="Guinness Render 20 Edit Full"
                />
              </div>
            </section>

            {/* Section 15: RENDER 21_EDIT_FULL + RENDER 22_EDIT_FULL (w=922.5, h=800 each, 4px gap) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 21_EDIT_FULL.webp"
                  alt="Guinness Render 21 Edit Full"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/RENDER 22_EDIT_FULL.webp"
                  alt="Guinness Render 22 Edit Full"
                />
              </div>
            </section>

            {/* Section 16: RENDER 15_EDIT_FULL + RENDER 16_EDIT_FULL (w=922.5, h=930 each, 4px gap) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 15_EDIT_FULL.webp"
                  alt="Guinness Render 15 Edit Full"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/RENDER 16_EDIT_FULL.webp"
                  alt="Guinness Render 16 Edit Full"
                />
              </div>
            </section>

            {/* Spacer 110px */}
            <div style={{ height: '110px' }} />

            {/* Section 17: Next Project - Adnoc with text overlay */}
            <section
              className="rainoil-next-project-section"
              style={{ marginTop: 0 }}
              onClick={() => handleNextProject('adnoc')}
            >
              <img
                src="/assets/Adnoc.webp"
                alt="ADNOC Next Project"
              />
              <div className="rainoil-next-project-text">
                NEXT PROJECT
              </div>
            </section>
          </>
        )}

        {/* ADNOC Case Study (id=5) */}
        {id === '5' && (
          <>
            {/* Section 1: Hero Section */}
            <section className="renaissance-hero-section">
              <h1 className="renaissance-hero-title">ADNOC</h1>
              <div className="renaissance-hero-paragraphs">
                <p>
                  Beyond the products it delivers. For its end-of-year celebration, the opportunity was to create a gesture that could acknowledge the year, reflect the stature of the organisation, and leave people with something meaningful beyond the moment of celebration. We approached the project as an opportunity to turn a familiar corporate gift into a more considered expression of the ADNOC brand.
                </p>
              </div>
            </section>

            {/* Section 2: ADNOC hero image */}
            <section className="rainoil-image-section">
              <img
                src="/assets/Adnoc.webp"
                alt="ADNOC"
              />
            </section>

            {/* Section 3: The Challenge - Defining the Intent */}
            <section className="rainoil-challenge-section">
              <div className="rainoil-challenge-content">
                <h2 className="rainoil-challenge-subheading">The Challenge</h2>
                <h1 className="rainoil-challenge-heading">Defining the Intent</h1>
                <div className="rainoil-challenge-body">
                  <p>
                    The challenge was not simply to create something branded. It was to ensure the gesture felt intentional, premium, and unmistakably ADNOC, while still being useful enough to remain part of the recipient's everyday life. This required striking a careful balance between celebration and utility — designing something that could commemorate the occasion without feeling like a conventional promotional item.
                  </p>
                </div>
              </div>

              <div className="rainoil-sector-badge">
                <div className="rainoil-sector-text">
                  <span className="rainoil-sector-label">Sector:</span><br />
                  Oil &amp; Gas
                </div>
              </div>
            </section>

            {/* Section 4: POST 3 full-width image */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/POST 3.webp"
                alt="ADNOC Post 3"
              />
            </section>

            {/* Section 5: POST 4 + POST 2 side by side (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/POST 4.webp"
                  alt="ADNOC Post 4"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/POST 2.webp"
                  alt="ADNOC Post 2"
                />
              </div>
            </section>

            {/* Section 6: Our Strategy - Translating Identity into Experience */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Translating Identity into Experience</h1>
              <div className="rainoil-strategy-body">
                <p>
                  We focused on translating ADNOC's identity into a refined, tactile experience. Rather than relying on overt branding, we looked to the company's strongest visual cues — its rich blue palette, clean white space, bilingual Arabic and English typography, and the iconic falcon mark — as the foundation for the design system. This approach allowed the brand to be felt rather than simply seen, elevating the gesture into something more enduring and considered.
                </p>
              </div>
            </section>

            {/* Section 7: POST 8 + POST 12 side by side (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/POST 8.webp"
                  alt="ADNOC Post 8"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/POST 12.webp"
                  alt="ADNOC Post 12"
                />
              </div>
            </section>

            {/* Section 8: POST 11 + POST 14 side by side (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/POST 11.webp"
                  alt="ADNOC Post 11"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/POST 14.webp"
                  alt="ADNOC Post 14"
                />
              </div>
            </section>

            {/* Section 9: The Solution - Crafting the Final Expression */}
            <section className="rainoil-solution-section">
              <h2 className="rainoil-solution-subheading">The Solution</h2>
              <h1 className="rainoil-solution-heading">Crafting the<br />Final Expression</h1>
              <div className="rainoil-solution-body">
                <p>
                  The final outcome was a coordinated collection of two diaries and a notepad, each designed with precision and restraint to reflect ADNOC's sense of scale and professionalism. Together, they form a cohesive set that carries the same visual language while giving the end-of-year gesture a tangible, lasting presence. Rather than simply placing a logo on a gift, we created a branded object that could mark the end of one year while becoming part of the next.
                </p>
              </div>
            </section>

            {/* Section 10: POST 7 (w=784, h=980) + POST 9 (w=1205, h=980) asymmetric */}
            <section className="adnoc-asym-images-section">
              <div className="adnoc-asym-784-card">
                <img
                  src="/assets/POST 7.webp"
                  alt="ADNOC Post 7"
                />
              </div>
              <div className="adnoc-asym-1205-card">
                <img
                  src="/assets/POST 9.webp"
                  alt="ADNOC Post 9"
                />
              </div>
            </section>

            {/* Section 11: Adnoc1 (w=922.5, h=1153) + adnoc2 (w=972.5, h=1153) */}
            <section className="adnoc-tall-images-section">
              <div className="adnoc-tall-922-card">
                <img
                  src="/assets/Adnoc1.webp"
                  alt="ADNOC 1"
                />
              </div>
              <div className="adnoc-tall-972-card">
                <img
                  src="/assets/adnoc2.webp"
                  alt="ADNOC 2"
                />
              </div>
            </section>

            {/* Spacer 90px */}
            <div style={{ height: '90px' }} />

            {/* Section 12: Next Project - Seplat */}
            <section
              className="rainoil-next-project-section"
              style={{ marginTop: 0 }}
              onClick={() => handleNextProject('seplat')}
            >
              <img
                src="/assets/Seplat11.webp"
                alt="Seplat Next Project"
              />
              <div className="rainoil-next-project-text">
                NEXT PROJECT
              </div>
            </section>
          </>
        )}

        {/* Seplat Case Study (id=6) */}
        {id === '6' && (
          <>
            {/* Section 1: Hero */}
            <section className="renaissance-hero-section">
              <h1 className="renaissance-hero-title">Seplat Energy</h1>
              <div className="renaissance-hero-paragraphs">
                <p>
                  Seplat Energy operates at the intersection of national infrastructure and long-term energy development. Beyond production, it supports systems that power industries and everyday life. Because of this scale, the brand is shaped not only by major communications, but also by smaller, everyday touchpoints where it is quietly experienced. This project started from that idea: making sure Seplat's identity is felt consistently, even in routine interactions.
                </p>
              </div>
            </section>

            {/* Section 2: Seplat11 full-width hero image */}
            <section className="rainoil-image-section">
              <img src="/assets/Seplat11.webp" alt="Seplat Energy" />
            </section>

            {/* Section 3: Challenge */}
            <section className="rainoil-challenge-section">
              <div className="rainoil-challenge-content">
                <h2 className="rainoil-challenge-subheading">The Challenge</h2>
                <h1 className="rainoil-challenge-heading">Making the Small Things<br />Carry the Same Weight</h1>
                <div className="rainoil-challenge-body">
                  <p>
                    We began by defining how the brand should feel at its best: measured, reliable, structured, and forward-looking. From there, we built a restrained, consistent visual system that could work across different applications, with only subtle variation where necessary. The aim was simple: every touchpoint, no matter how small, should feel like it belongs to the same way of thinking.
                  </p>
                </div>
              </div>
              <div className="rainoil-sector-badge">
                <div className="rainoil-sector-text">
                  <span className="rainoil-sector-label">Sector:</span><br />
                  Oil &amp; Gas
                </div>
              </div>
            </section>

            {/* Section 4: Seplat2 full-width (w=1870 h=1080) */}
            <section className="rainoil-cup7-section">
              <img src="/assets/Seplat2.webp" alt="Seplat 2" />
            </section>

            {/* Section 5: Seplat1 + Seplat3 side by side (w=922.5 h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img src="/assets/Seplat1.webp" alt="Seplat 1" />
              </div>
              <div className="renaissance-two-image-card">
                <img src="/assets/Seplat3.webp" alt="Seplat 3" />
              </div>
            </section>

            {/* Section 6: Our Strategy */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Designing from<br />Behaviour, Not Objects</h1>
              <div className="rainoil-strategy-body">
                <p>
                  We began by defining how the brand should feel at its best: measured, reliable, structured, and forward-looking. From there, we built a restrained, consistent visual system that could work across different applications, with only subtle variation where necessary. The aim was simple: every touchpoint, no matter how small, should feel like it belongs to the same way of thinking.
                </p>
              </div>
            </section>

            {/* Section 7: Seplat4 (w=650 h=930) + Seplat5 (w=1195 h=930) asymmetric */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img src="/assets/Seplat4.webp" alt="Seplat 4" />
              </div>
              <div className="renaissance-asym-1195-card">
                <img src="/assets/Seplat5.webp" alt="Seplat 5" />
              </div>
            </section>

            {/* Section 8: Seplat7 full-width (w=1870 h=1080) */}
            <section className="rainoil-cup7-section">
              <img src="/assets/Seplat7.webp" alt="Seplat 7" />
            </section>

            {/* Section 9: Seplat6 + Seplat8 side by side (w=922.5 h=1153 each) */}
            <section className="adnoc-tall-images-section">
              <div className="adnoc-tall-922-card">
                <img src="/assets/Seplat6.webp" alt="Seplat 6" />
              </div>
              <div className="adnoc-tall-972-card">
                <img src="/assets/Seplat8.webp" alt="Seplat 8" />
              </div>
            </section>

            {/* Section 10: Solution */}
            <section className="rainoil-solution-section">
              <h2 className="rainoil-solution-subheading">The Solution</h2>
              <h1 className="rainoil-solution-heading">Quiet Consistency<br />Across Everyday Use</h1>
              <div className="rainoil-solution-body">
                <p>
                  The final system brings Seplat's identity into daily use in a calm, structured, and intentional way. Nothing is overworked, but everything feels deliberate. More importantly, it reinforces what Seplat already stands for — stability, clarity, and long-term thinking — by ensuring even its smallest touchpoints carry the same care as its largest operations.
                </p>
              </div>
            </section>

            {/* Section 11: Seplat9 + Seplat10 side by side (w=922.5 h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img src="/assets/Seplat9.webp" alt="Seplat 9" />
              </div>
              <div className="renaissance-two-image-card">
                <img src="/assets/Seplat10.webp" alt="Seplat 10" />
              </div>
            </section>

            {/* Section 12: Seplat11 full-width (w=1870 h=1200) */}
            <section className="seplat-full-section">
              <img src="/assets/Seplat11.webp" alt="Seplat 11" />
            </section>

            {/* Spacer */}
            <div style={{ height: '90px' }} />

            {/* Section 13: Next Project — MTN */}
            <section
              className="rainoil-next-project-section"
              style={{ marginTop: 0 }}
              onClick={() => handleNextProject('mtn')}
            >
              <img src="/assets/MTN26.webp" alt="MTN Next Project" />
              <div className="rainoil-next-project-text">
                NEXT PROJECT
              </div>
            </section>
          </>
        )}

        {/* MTN Case Study (id=7) */}
        {id === '7' && (
          <>
            {/* Section 1: Hero */}
            <section className="renaissance-hero-section">
              <h1 className="renaissance-hero-title">MTN</h1>
              <div className="renaissance-hero-paragraphs">
                <p>
                  MTN is a brand built around connection, communication, and the everyday technologies that keep people moving. For this project, the opportunity was to translate that energy into a physical brand experience, creating a corporate gift collection that felt contemporary, distinctive, and unmistakably MTN. The goal was to move beyond conventional branded merchandise and create objects that carried the character of the brand into the hands of its audience.
                </p>
              </div>
            </section>

            {/* Section 2: MTN26 full-width (w=1920 h=980) */}
            <section className="mtn-hero-image-section">
              <img src="/assets/MTN26.webp" alt="MTN" />
            </section>

            {/* Section 3: Challenge */}
            <section className="rainoil-challenge-section">
              <div className="rainoil-challenge-content">
                <h2 className="rainoil-challenge-subheading">The Challenge</h2>
                <h1 className="rainoil-challenge-heading">Breaking Away<br />from the Expected</h1>
                <div className="rainoil-challenge-body">
                  <p>
                    The challenge was to create something that felt as dynamic as the brand itself without relying on the usual language of corporate gifting. The experience needed to feel useful, personal, and technologically relevant, while still maintaining the polish and consistency expected of a major global brand. Every element had to feel intentional rather than simply branded.
                  </p>
                </div>
              </div>
              <div className="rainoil-sector-badge">
                <div className="rainoil-sector-text">
                  <span className="rainoil-sector-label">Sector:</span><br />
                  Telecommunications
                </div>
              </div>
            </section>

            {/* Section 4: MTN24 (w=650 h=930) + MTNA (w=1195 h=930) asymmetric */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img src="/assets/MTN24.webp" alt="MTN 24" />
              </div>
              <div className="renaissance-asym-1195-card">
                <img src="/assets/MTNA.webp" alt="MTN A" />
              </div>
            </section>

            {/* Section 5: MTN21 full-width (w=1870 h=1080) */}
            <section className="rainoil-cup7-section">
              <img src="/assets/MTN21.webp" alt="MTN 21" />
            </section>

            {/* Section 6: Our Strategy */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Turning Connection<br />into Form</h1>
              <div className="rainoil-strategy-body">
                <p>
                  We looked at the visual and cultural language surrounding MTN. Technology, communication, interfaces, security, and the idea of connection, and translated these themes into physical design cues. Instead of treating each item as an isolated piece, we developed a visual system where distinctive forms and interactions could make the brand experience feel more engaging and contemporary.
                </p>
              </div>
            </section>

            {/* Section 7: MTN20 + MTN15 side by side (w=922.5 h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img src="/assets/MTN20.webp" alt="MTN 20" />
              </div>
              <div className="renaissance-two-image-card">
                <img src="/assets/MTN15.webp" alt="MTN 15" />
              </div>
            </section>

            {/* Section 8: MTN14 full-width (w=1870 h=1080) */}
            <section className="rainoil-cup7-section">
              <img src="/assets/MTN14.webp" alt="MTN 14" />
            </section>

            {/* Section 9: Solution */}
            <section className="rainoil-solution-section">
              <h2 className="rainoil-solution-subheading">The Solution</h2>
              <h1 className="rainoil-solution-heading">A More Personal<br />Brand Experience</h1>
              <div className="rainoil-solution-body">
                <p>
                  The resulting collection brought together a series of considered touchpoints: expressive forms, tactile details, and moments of interaction that made each piece feel more than functional. Across the collection, familiar references to technology and digital interaction were reinterpreted into physical experiences, creating a balance between playfulness, utility, and premium craftsmanship. The result was a gift experience that felt distinctly MTN without needing to overstate the brand.
                </p>
              </div>
            </section>

            {/* Section 10: MTN18 full-width (w=1870 h=1080) */}
            <section className="rainoil-cup7-section">
              <img src="/assets/MTN18.webp" alt="MTN 18" />
            </section>

            {/* Section 11: MTN10 + MTN16 side by side (w=922.5 h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img src="/assets/MTN10.webp" alt="MTN 10" />
              </div>
              <div className="renaissance-two-image-card">
                <img src="/assets/MTN16.webp" alt="MTN 16" />
              </div>
            </section>

            {/* Section 12: Impact */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">The Impact</h2>
              <h1 className="rainoil-strategy-heading">A Brand You Can<br />Experience</h1>
              <div className="rainoil-strategy-body">
                <p>
                  The collection gave MTN a more memorable physical presence, transforming everyday objects into moments of brand interaction. By embedding the brand's personality into the experience rather than simply applying its identity to products, we created something that could feel useful in the everyday, distinctive in the hand, and memorable long after the initial exchange.
                </p>
              </div>
            </section>

            {/* Section 13: MTN17 + MTN8 side by side (w=922.5 h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img src="/assets/MTN17.webp" alt="MTN 17" />
              </div>
              <div className="renaissance-two-image-card">
                <img src="/assets/MTN8.webp" alt="MTN 8" />
              </div>
            </section>

            {/* Section 14: MTN19 (w=650 h=930) + MTN6 (w=1195 h=930) asymmetric */}
            <section className="renaissance-asym-images-gap4-section">
              <div className="renaissance-asym-650-card">
                <img src="/assets/MTN19.webp" alt="MTN 19" />
              </div>
              <div className="renaissance-asym-1195-card">
                <img src="/assets/MTN6.webp" alt="MTN 6" />
              </div>
            </section>

            {/* Section 15: MTN22 + MTN23 side by side (w=922.5 h=800 each) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img src="/assets/MTN22.webp" alt="MTN 22" />
              </div>
              <div className="renaissance-two-image-800-card">
                <img src="/assets/MTN23.webp" alt="MTN 23" />
              </div>
            </section>

            {/* Spacer */}
            <div style={{ height: '90px' }} />

            {/* Section 16: Next Project — Stanbic IBTC */}
            <section
              className="rainoil-next-project-section"
              style={{ marginTop: 0 }}
              onClick={() => handleNextProject('stanbic')}
            >
              <img src="/assets/stanbic.webp" alt="Stanbic IBTC Next Project" />
              <div className="rainoil-next-project-text">
                NEXT PROJECT
              </div>
            </section>
          </>
        )}

        {/* Stanbic IBTC Case Study (id=8) */}
        {id === '8' && (
          <>
            {/* Section 1: Hero */}
            <section className="renaissance-hero-section">
              <h1 className="renaissance-hero-title">Stanbic IBTC</h1>
              <div className="renaissance-hero-paragraphs">
                <p>
                  Stanbic IBTC is a financial institution focused on helping people and businesses move forward with confidence. With such a strong and recognisable identity, the opportunity was to extend it beyond traditional touchpoints into everyday experiences. Our brief was to design a set of corporate pieces that felt unmistakably Stanbic IBTC—cohesive, considered, and memorable, while strengthening the brand's physical presence throughout the year.
                </p>
              </div>
            </section>

            {/* Section 2: stanbic full-width (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img src="/assets/stanbic.webp" alt="Stanbic IBTC" />
            </section>

            {/* Section 3: The Challenge */}
            <section className="rainoil-challenge-section">
              <div className="rainoil-challenge-content">
                <h2 className="rainoil-challenge-subheading">The Challenge</h2>
                <h1 className="rainoil-challenge-heading">Moving Beyond<br />Corporate Design</h1>
                <div className="rainoil-challenge-body">
                  <p>
                    Corporate calendars and stationery often default to functional objects with a logo applied. For Stanbic IBTC, the goal was to go further—creating a unified experience where the brand is recognised through its design language even before the logo appears. The work needed to feel distinct, practical, and refined for everyday use.
                  </p>
                </div>
              </div>
              <div className="rainoil-sector-badge">
                <div className="rainoil-sector-text">
                  <span className="rainoil-sector-label">Sector:</span><br />
                  Banking &amp; Finance
                </div>
              </div>
            </section>

            {/* Section 4: STANBIC_IBTC_RENDER_19 (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/STANBIC_IBTC_RENDER_19.webp"
                alt="Stanbic IBTC Render 19"
              />
            </section>

            {/* Section 5: stanbic stairs + STANBIC_IBTC_RENDER_20 (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/stanbic stairs.webp"
                  alt="Stanbic Stairs"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_20.webp"
                  alt="Stanbic IBTC Render 20"
                />
              </div>
            </section>

            {/* Section 6: Our Strategy */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Building a System<br />From the Brand Identity</h1>
              <div className="rainoil-strategy-body">
                <p>
                  We started with the identity itself. Instead of treating the logo as a label, we explored its forms, geometry, rhythm, and structure as a design system. This became the foundation for a connected set of touchpoints that felt cohesive without being repetitive.
                </p>
              </div>
            </section>

            {/* Section 7: STANBIC_IBTC_RENDER_21 copy (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/STANBIC_IBTC_RENDER_21 copy.webp"
                alt="Stanbic IBTC Render 21"
              />
            </section>

            {/* Section 8: RENDER_29_EDIT + RENDER_30_EDIT (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_29_EDIT.webp"
                  alt="Stanbic IBTC Render 29 Edit"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_30_EDIT.webp"
                  alt="Stanbic IBTC Render 30 Edit"
                />
              </div>
            </section>

            {/* Section 9: RENDER_31 (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/STANBIC_IBTC_RENDER_31.webp"
                alt="Stanbic IBTC Render 31"
              />
            </section>

            {/* Section 10: The Solution */}
            <section className="rainoil-solution-section">
              <h2 className="rainoil-solution-subheading">The Solution</h2>
              <h1 className="rainoil-solution-heading">Turning Identity Into<br />Physical Touchpoints</h1>
              <div className="rainoil-solution-body">
                <p>
                  We created a suite of everyday brand assets built around a single visual idea. Elements drawn from the Stanbic IBTC identity were translated into patterns, structures, and compositions, giving each piece individuality while maintaining a clear family resemblance.
                </p>
                <p>
                  The result was a physical extension of the brand that could be experienced throughout the year.
                </p>
              </div>
            </section>

            {/* Section 11: RENDER_4 + RENDER_5 (w=922.5, h=930 each) */}
            <section className="renaissance-two-images-gap4-section">
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_4.webp"
                  alt="Stanbic IBTC Render 4"
                />
              </div>
              <div className="renaissance-two-image-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_5.webp"
                  alt="Stanbic IBTC Render 5"
                />
              </div>
            </section>

            {/* Section 12: RENDER_6 (w=1870, h=1080) */}
            <section className="rainoil-cup7-section">
              <img
                src="/assets/STANBIC_IBTC_RENDER_6.webp"
                alt="Stanbic IBTC Render 6"
              />
            </section>

            {/* Section 13: The Impact */}
            <section className="rainoil-strategy-section" style={{ marginTop: '60px' }}>
              <h2 className="rainoil-strategy-subheading">The Impact</h2>
              <h1 className="rainoil-strategy-heading">Reinforcing Recognition<br />Through Experience</h1>
              <div className="rainoil-strategy-body">
                <p>
                  Familiar corporate items became opportunities for stronger brand presence. Rather than relying on repeated logos, the identity was embedded in the visual experience itself, reinforcing cohesion and recognition at every interaction.
                </p>
                <p>
                  We helped Stanbic IBTC turn everyday objects into brand experiences that linger beyond first impressions.
                </p>
              </div>
            </section>

            {/* Section 11: RENDER_1 + RENDER_3 (w=922.5, h=1020 each) */}
            <section className="stanbic-two-images-1020-section">
              <div className="stanbic-two-image-1020-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_1.webp"
                  alt="Stanbic IBTC Render 1"
                />
              </div>
              <div className="stanbic-two-image-1020-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_3.webp"
                  alt="Stanbic IBTC Render 3"
                />
              </div>
            </section>

            {/* Section 12: RENDER_25 + RENDER_26 (w=922.5, h=800 each) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_25.webp"
                  alt="Stanbic IBTC Render 25"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_26.webp"
                  alt="Stanbic IBTC Render 26"
                />
              </div>
            </section>

            {/* Section 13: RENDER_27 + RENDER_28_EDIT (w=922.5, h=800 each) */}
            <section className="renaissance-two-images-800-gap4-section">
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_27.webp"
                  alt="Stanbic IBTC Render 27"
                />
              </div>
              <div className="renaissance-two-image-800-card">
                <img
                  src="/assets/STANBIC_IBTC_RENDER_28_EDIT.webp"
                  alt="Stanbic IBTC Render 28 Edit"
                />
              </div>
            </section>

            {/* Spacer */}
            <div style={{ height: '90px' }} />

            {/* Section 14: Next Project — Nigerian Breweries (NIGERIAN_BREWERIES_COLLECTION_3) */}
            <section
              className="rainoil-next-project-section"
              style={{ marginTop: 0 }}
              onClick={() => handleNextProject('nigerian-breweries')}
            >
              <img
                src="/assets/NIGERIAN_BREWERIES_COLLECTION_3.webp"
                alt="Nigerian Breweries Next Project"
              />
              <div className="rainoil-next-project-text">
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
          src="/assets/RAINOIL_RENDER_POST_PROCESS_5.webp"
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
          src="/assets/RAINOIL_COMPILED_RENDER_1.webp"
          alt="Rainoil Compiled Render"
        />
      </section>

      {/* Section 5: Two Side-by-Side Flask Images (w=923, h=930 each) */}
      <section className="rainoil-flasks-section">
        <div className="rainoil-flask-card">
          <img
            src="/assets/RAINOIL_FLASK_RENDER_8.webp"
            alt="Rainoil Flask Render 8"
          />
        </div>
        <div className="rainoil-flask-card">
          <img
            src="/assets/RAINOIL_FLASK_RENDER_6.webp"
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
            src="/assets/RAINOIL_FLASK_RENDER_3.webp"
            alt="Rainoil Flask Render 3"
          />
        </div>
        <div className="rainoil-postprocess5-card">
          <img
            src="/assets/RAINOIL_RENDER_POST_PROCESS_5.webp"
            alt="Rainoil Render Post Process 5"
          />
        </div>
      </section>

      {/* Section 8: Cup Render 7 (w=1870, h=1080) */}
      <section className="rainoil-cup7-section">
        <img
          src="/assets/RAINOIL_CUP_RENDER_7.webp"
          alt="Rainoil Cup Render 7"
        />
      </section>

      {/* Section 9: Cup Render 10 (w=922.5, h=930) + Cup Render 9 (w=922.5, h=930) */}
      <section className="rainoil-cups-9-10-section">
        <div className="rainoil-cup-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_10.webp"
            alt="Rainoil Cup Render 10"
          />
        </div>
        <div className="rainoil-cup-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_9.webp"
            alt="Rainoil Cup Render 9"
          />
        </div>
      </section>

      {/* Section 10: Cup Render 6 (w=922.5, h=930) + Cup Render 3 (w=922.5, h=930) */}
      <section className="rainoil-cups-6-3-section">
        <div className="rainoil-cup63-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_6.webp"
            alt="Rainoil Cup Render 6"
          />
        </div>
        <div className="rainoil-cup63-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_3.webp"
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
            src="/assets/RAINOIL_COMPILED_RENDER_1.webp"
            alt="Rainoil Compiled Render 1"
          />
        </div>
        <div className="rainoil-cup8-card">
          <img
            src="/assets/RAINOIL_CUP_RENDER_8.webp"
            alt="Rainoil Cup Render 8"
          />
        </div>
      </section>

      {/* Section 13: Mug Render 1 (w=922.5, h=800) + Mug Render 2 (w=922.5, h=800) */}
      <section className="rainoil-mugs-1-2-section">
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_1.webp"
            alt="Rainoil Mug Render 1"
          />
        </div>
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_2.webp"
            alt="Rainoil Mug Render 2"
          />
        </div>
      </section>

      {/* Section 14: Mug Render 7 (w=650, h=930) + Mug Render 3 (w=1195, h=930) */}
      <section className="rainoil-mug1-mug3-section">
        <div className="rainoil-mug650-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_7.webp"
            alt="Rainoil Mug Render 7"
          />
        </div>
        <div className="rainoil-mug1195-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_3.webp"
            alt="Rainoil Mug Render 3"
          />
        </div>
      </section>

      {/* Section 15: Mug Render 4 (w=922.5, h=800) + Mug Render 6 (w=922.5, h=800) */}
      <section className="rainoil-mugs-4-6-section">
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_4.webp"
            alt="Rainoil Mug Render 4"
          />
        </div>
        <div className="rainoil-mug800-card">
          <img
            src="/assets/RAINOIL_MUG_RENDER_6.webp"
            alt="Rainoil Mug Render 6"
          />
        </div>
      </section>

      {/* Spacer 110px */}
      <div style={{ height: '110px' }} />

      {/* Section 16: Next Project - LOOK DEV 2 (w=1870, h=380) with text overlay */}
      <section
        className="rainoil-next-project-section"
        style={{ marginTop: 0 }}
        onClick={() => handleNextProject('guinness')}
      >
        <img
          src="/assets/LOOK DEV 2.webp"
          alt="LOOK DEV 2 Next Project"
        />
        <div className="rainoil-next-project-text">
          NEXT PROJECT
        </div>
      </section>
      <Footer />
    </div>
  )
}

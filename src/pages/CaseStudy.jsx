import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Page.css'

function RenaissanceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState('next')

  const images = [
    { id: 1, src: '/assets/RENDER 1.jpg', alt: 'Renaissance Render 1' },
    { id: 2, src: '/assets/RENDER 13 copy.jpg', alt: 'Renaissance Render 13' },
    { id: 3, src: '/assets/RENDER 12.jpg', alt: 'Renaissance Render 12' },
    { id: 4, src: '/assets/RENDER 11.jpg', alt: 'Renaissance Render 11' },
    { id: 5, src: '/assets/RENDER 7.jpg', alt: 'Renaissance Render 7' },
  ]

  const imagesPerView = 2

  const getVisibleImages = () => {
    const result = []
    for (let i = 0; i < imagesPerView; i++) {
      const idx = (currentIndex + i) % images.length
      result.push(images[idx])
    }
    return result
  }

  const showPrevious = () => {
    setSlideDirection('prev')
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const showNext = () => {
    setSlideDirection('next')
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const visibleImages = getVisibleImages()

  return (
    <section className="renaissance-carousel-nav-section">
      <div
        key={`renaissance-carousel-${slideDirection}-${currentIndex}`}
        className={`renaissance-carousel-images renaissance-carousel-images--${slideDirection}`}
      >
        {visibleImages.map((image) => (
          <div key={image.id} className="renaissance-carousel-image-card">
            <img
              src={image.src}
              alt={image.alt}
              loading="eager"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="renaissance-nav-arrow renaissance-nav-arrow--prev"
        onClick={showPrevious}
        aria-label="Previous images"
      >
        ←
      </button>
      <button
        type="button"
        className="renaissance-nav-arrow renaissance-nav-arrow--next"
        onClick={showNext}
        aria-label="Next images"
      >
        →
      </button>
    </section>
  )
}

export default function CaseStudy() {
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const handleBackClick = () => {
    const referrer = sessionStorage.getItem('caseStudyReferrer')
    
    if (referrer) {
      // Navigate back to the referrer page
      sessionStorage.removeItem('caseStudyReferrer')
      navigate(referrer, { replace: true })
    } else if (window.history.length > 1) {
      window.history.back()
    } else {
      sessionStorage.setItem('returnedFromPage', 'true')
      navigate('/', { replace: true })
    }
  }

  // Store referrer when coming from another case study
  useEffect(() => {
    const currentPath = `/case-study/${id}`
    return () => {
      // Store current path as referrer when navigating away
      if (window.location.pathname.startsWith('/case-study/')) {
        sessionStorage.setItem('caseStudyReferrer', currentPath)
      }
    }
  }, [id])

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
            <section className="rainoil-strategy-section">
              <h2 className="rainoil-strategy-subheading">Our Strategy</h2>
              <h1 className="rainoil-strategy-heading">Bridging the Experience</h1>
              <div className="rainoil-strategy-body">
                <p>
                  Rather than applying Renaissance's identity to generic merchandise, we looked inward to the brand's own world for inspiration.
                </p>
                <p>
                  We translated industrial characteristics into a collection of commemorative items inspired by the visual language of the energy industry itself. From petroleum storage tanks to structural containment systems, familiar engineering forms became the foundation for refined, functional objects that feel unmistakably connected to the brand.
                </p>
                <p>
                  Every design decision was guided by a single objective: create memorabilia that doesn't just carry the Renaissance logo, but embodies the essence of the company behind it.
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
          </>
        )}
        
        {/* Guinness Case Study (id=4) */}
        {id === '4' && (
          <>
            <section className="rainoil-hero-section">
              <h1 className="rainoil-hero-title">Guinness Nigeria</h1>
              <div className="rainoil-hero-paragraphs">
                <p>
                  Guinness Nigeria is one of Nigeria's most iconic beverage brands with a rich heritage.
                </p>
                <p>
                  As the company evolved, it became essential to create experiences that resonate with modern audiences.
                </p>
              </div>
            </section>
            
            <section className="rainoil-image-section">
              <img
                src="/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_5.jpg"
                alt="Guinness Nigeria"
              />
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

      {/* Section 16: Next Project - LOOK DEV 2 (w=1870, h=380) with text overlay */}
      <section className="rainoil-next-project-section">
        <img
          src="/assets/LOOK DEV 2.png"
          alt="LOOK DEV 2 Next Project"
        />
        <div
          className="rainoil-next-project-text"
          onClick={() => {
            sessionStorage.setItem('caseStudyReferrer', '/case-study/1')
            navigate('/case-study/4')
          }}
        >
          Next Project
        </div>
      </section>
      <Footer />
    </div>
  )
}

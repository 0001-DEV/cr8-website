import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Work.css'

export default function Work() {
  const navigate = useNavigate()
  const [selectedSector, setSelectedSector] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    navigate('/', { replace: true })
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleSectorClick = (sectorName) => {
    if (selectedSector === sectorName) {
      setSelectedSector(null)
    } else {
      setSelectedSector(sectorName)
    }
    setIsDropdownOpen(false)
  }

  const projects = [
    {
      id: 1,
      title: 'Rainoil',
      sector: 'Oil & Gas',
      subtitle: 'Oil & Gas',
      image: '/assets/RAINOIL_CUP_RENDER_9.jpg',
      slug: 'rainoil',
    },
    {
      id: 2,
      title: 'Nigerian Breweries',
      sector: 'Food & Beverages',
      subtitle: 'Food & Beverages',
      image: '/assets/NIGERIAN_BREWERIES_COLLECTION_2.jpg',
      slug: 'nigerian-breweries',
    },
    {
      id: 3,
      title: 'Guinness',
      sector: 'Food & Beverages',
      subtitle: 'Food & Beverages',
      image: '/assets/RENDER 9 copy 2.jpg',
      slug: 'guinness',
    },
    {
      id: 4,
      title: 'Renaissance Energy',
      sector: 'Oil & Gas',
      subtitle: 'Oil & Gas',
      image: '/assets/RENDER 28.jpg',
      slug: 'renaissance',
    },
    {
      id: 5,
      title: 'Stanbic IBTC',
      sector: 'Banking & Finance',
      subtitle: 'Banking & Finance',
      image: '/assets/STANBIC_IBTC_RENDER_21.jpg',
      slug: 'renaissance',
    },
    {
      id: 6,
      title: 'Seplat Energy',
      sector: 'Oil & Gas',
      subtitle: 'Oil & Gas',
      image: '/assets/RENDER 3 copy.jpg',
      slug: 'rainoil',
    },
    {
      id: 7,
      title: 'ADNOC',
      sector: 'Oil & Gas',
      subtitle: 'Oil & Gas',
      image: '/assets/RENDER 9 copy 3.jpg',
      slug: 'rainoil',
    },
    {
      id: 8,
      title: 'MTN',
      sector: 'Telecommunication',
      subtitle: 'Telecommunication',
      image: '/assets/RENDER 12 copy 4.jpg',
      slug: 'renaissance',
    },
  ]

  const sectorCounts = projects.reduce((acc, p) => {
    acc[p.sector] = (acc[p.sector] || 0) + 1
    return acc
  }, {})

  const sectors = Object.keys(sectorCounts)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({
      name,
      count: sectorCounts[name],
    }))

  const filteredProjects = selectedSector
    ? projects.filter((p) => p.sector === selectedSector)
    : projects

  const rows = []
  for (let i = 0; i < filteredProjects.length; i += 2) {
    rows.push(filteredProjects.slice(i, i + 2))
  }

  return (
    <div className="work-page-container">
      <Header />
      <main className="work-main-content">
        <div className="work-back-nav">
          <button onClick={handleBackClick} className="work-back-btn">
            ← Back
          </button>
        </div>

        <section className="work-hero-section">
          <div className="work-hero-heading">
            <h1 className="work-title-main">
              <span className="work-title-line1" style={{ display: 'block' }}>
                Excellents ideas
              </span>
              <span className="work-title-line2" style={{ display: 'block' }}>
                for Excellent brands
              </span>
            </h1>
          </div>
        </section>

        <section className="work-filter-container">
          <button
            className={`work-filter-trigger ${isDropdownOpen || selectedSector ? 'active' : ''}`}
            onClick={toggleDropdown}
          >
            <span className="work-filter-label">{selectedSector ? selectedSector : 'Filter Projects by Sector'}</span>
            <span className={`work-filter-arrow ${isDropdownOpen ? 'open' : ''}`}>
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>

          {isDropdownOpen && (
            <div className="work-sector-dropdown">
              <div
                className="work-sector-close-line"
                onClick={() => {
                  setSelectedSector(null)
                  setIsDropdownOpen(false)
                }}
              >
                <button
                  type="button"
                  className="work-sector-close-btn"
                  aria-label="Clear filter and close"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {sectors.map((sec) => (
                <div
                  key={sec.name}
                  className={`work-sector-line ${selectedSector === sec.name ? 'active' : ''}`}
                  onClick={() => handleSectorClick(sec.name)}
                >
                  <span className="work-sector-name">{sec.name}</span>
                  <span className="work-sector-count">[{sec.count}]</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="work-two-images-container">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="work-two-images-row">
              {row.map((project) => {
                const sectorClass =
                  project.sector === 'Banking & Finance'
                    ? 'sector-banking'
                    : project.sector === 'Food & Beverages'
                    ? 'sector-food'
                    : project.sector === 'Oil & Gas'
                    ? 'sector-oil'
                    : project.sector === 'Telecommunication'
                    ? 'sector-telecom'
                    : ''

                return (
                  <Link
                    key={project.id}
                    to={`/project/${project.slug}`}
                    onClick={() => sessionStorage.setItem('previousPage', '/work')}
                    className={`work-two-image-card ${sectorClass}`}
                  >
                    <div className="work-two-image-box">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="work-two-image-text-bar">
                      <span className="work-two-image-left-text">
                        {project.title}
                      </span>
                      <span className="work-two-image-right-text">
                        {project.subtitle}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

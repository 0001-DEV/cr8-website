import './SelectedProjects.css'
import { useState, useEffect, useRef } from 'react'

export default function SelectedProjects() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const containerRef = useRef(null)
  const scrollTimeout = useRef(null)

  const projects = [
    {
      id: 1,
      name: 'Rainoil',
      category: 'Oil & Gas',
      subcategory: 'Commemorative Memorabilia Packaging',
      description: "Rainoil's operations are built on movement, storage, distribution, and reliability. Rather than applying branding onto generic merchandise, this collection draws directly from the visual language of the energy industry itself."
    },
    {
      id: 2,
      name: 'Nigerian Breweries',
      category: 'Food & Beverage',
      subcategory: 'Commemorative Memorabilia Packaging',
      description: "Rainoil's operations are built on movement, storage, distribution, and reliability. Rather than applying branding onto generic merchandise, this collection draws directly from the visual language of the energy industry itself."
    },
    {
      id: 3,
      name: 'Renaissance',
      category: 'Oil & Gas',
      subcategory: 'Commemorative Memorabilia Packaging',
      description: "Rainoil's operations are built on movement, storage, distribution, and reliability. Rather than applying branding onto generic merchandise, this collection draws directly from the visual language of the energy industry itself."
    }
  ]

  useEffect(() => {
    const handleWheel = (e) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const isInSection = rect.top <= 100 && rect.bottom >= window.innerHeight - 100
      
      if (isInSection) {
        e.preventDefault()
        
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }
        
        scrollTimeout.current = setTimeout(() => {
          if (e.deltaY > 0 && currentProject < projects.length - 1) {
            // Scroll down - next project
            setCurrentProject(prev => prev + 1)
          } else if (e.deltaY < 0 && currentProject > 0) {
            // Scroll up - previous project  
            setCurrentProject(prev => prev - 1)
          } else if (e.deltaY > 0 && currentProject === projects.length - 1) {
            // Last project - allow normal scrolling to continue
            setIsScrollLocked(false)
            window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' })
          } else if (e.deltaY < 0 && currentProject === 0) {
            // First project - allow scrolling up to previous section
            setIsScrollLocked(false)
            window.scrollBy({ top: -window.innerHeight * 0.5, behavior: 'smooth' })
          }
        }, 50)
      }
    }

    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const isEntering = rect.top <= 100 && rect.top > -100
      
      if (isEntering && !isScrollLocked) {
        setIsScrollLocked(true)
        setCurrentProject(0)
      } else if (rect.bottom < 100) {
        setIsScrollLocked(false)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [currentProject, projects.length, isScrollLocked])

  const getTransformOffset = (index) => {
    if (hoveredCard !== null) {
      // Original hover logic
      if (index === 0) return 0
      if (index === 1 && (hoveredCard === 1 || hoveredCard === 2)) {
        return hoveredCard === 1 ? -340 : -200
      }
      if (index === 2 && hoveredCard === 2) {
        return -650
      }
      if (index === 2 && hoveredCard === 1) {
        return -340
      }
    }
    return 0
  }

  return (
    <section className="selected-projects scroll-snap-section" id="work" ref={containerRef}>
      <div className="section-container">
        <div className="projects-header">
          <h2>Selected Projects</h2>
        </div>

        <div className="projects-display">
          {projects.map((project, index) => {
            let imageUrl = '';
            if (project.id === 1) imageUrl = '/assets/RAINOIL_CUP_RENDER_9.jpg';
            if (project.id === 2) imageUrl = '/assets/NIGERIAN_BREWERIES_COLLECTION_2.jpg';
            if (project.id === 3) imageUrl = '/assets/RENDER 28.jpg';

            return (
              <div 
                key={project.id} 
                className={`project-slide ${index === currentProject ? 'active' : ''} ${project.id === 2 ? 'project-reversed' : ''}`}
                style={{
                  transform: `translateY(${getTransformOffset(index)}px)`,
                  transition: 'transform 0.4s ease-out',
                  zIndex: hoveredCard === index ? 10 : (index + 1)
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img src={imageUrl} alt={project.name} className="project-image" />
                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-category">{project.subcategory}</span>
                    <span className="project-type">{project.category}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="scroll-progress">
          {projects.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === currentProject ? 'active' : ''}`}
            />
          ))}
        </div>
        
        <div className="view-all-container">
          <a href="#" className="view-all">View all projects →</a>
        </div>
      </div>
    </section>
  )
}


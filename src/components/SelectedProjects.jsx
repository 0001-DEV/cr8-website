import './SelectedProjects.css'
import { useState, useRef } from 'react'

export default function SelectedProjects() {
  const [activeCard, setActiveCard] = useState(null)
  const containerRef = useRef(null)

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

  const getTransformOffset = (index) => {
    if (index === 0) {
      return 0
    }
    
    if (activeCard === null) return 0
    
    if (index === 1 && (activeCard === 1 || activeCard === 2)) {
      return activeCard === 1 ? -340 : -200
    }
    
    if (index === 2 && activeCard === 2) {
      return -650
    }
    
    if (index === 2 && activeCard === 1) {
      return -340
    }
    
    return 0
  }

  const getViewAllMarginTop = () => {
    if (activeCard === 2) {
      return '-520px'
    }
    if (activeCard === 1) {
      return '-280px'
    }
    return '4rem'
  }

  return (
    <section className="selected-projects" id="work" ref={containerRef}>
      <div className="section-container">
        <div className="projects-header">
          <h2>Selected Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            let imageUrl = '';
            if (project.id === 1) imageUrl = '/assets/RAINOIL_CUP_RENDER_9.jpg';
            if (project.id === 2) imageUrl = '/assets/NIGERIAN_BREWERIES_COLLECTION_2.jpg';
            if (project.id === 3) imageUrl = '/assets/RENDER 28.jpg';

            return (
            <div 
              key={project.id} 
              className={`project-card ${project.id === 2 ? 'project-reversed' : ''}`}
              style={{
                transform: `translateY(${getTransformOffset(index)}px)`,
                transition: 'transform 0.08s ease-out',
                zIndex: activeCard === index ? 10 : (index + 1)
              }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
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
        
        <div className="view-all-container" style={{ marginTop: getViewAllMarginTop() }}>
          <a href="#" className="view-all">View all projects →</a>
        </div>
      </div>
    </section>
  )
}

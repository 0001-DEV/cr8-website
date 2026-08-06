import { Link, useNavigate, useParams } from 'react-router-dom'
import './Page.css'

const caseStudies = [
  {
    id: '1',
    number: '01',
    name: 'Rainoil',
    category: 'Oil & Gas',
    subcategory: 'Commemorative Memorabilia Packaging',
    description: "Rainoil's operations are built on movement, storage, distribution, and reliability. Rather than applying branding onto generic merchandise, this collection draws directly from the visual language of the energy industry itself.",
    image: '/assets/RAINOIL_CUP_RENDER_9.jpg',
    heroImage: '/assets/RAINOIL_RENDER_POST_PROCESS_5.jpg',
    tags: ['Brand Identity', 'Custom Packaging', 'Industrial Design'],
    accentColor: '#bced00',
    year: '2025',
    client: 'Rainoil Nigeria',
    services: ['Brand Strategy', 'Packaging Design', '3D Visualization', 'Production Oversight'],
    overview: "Tasked with creating a commemorative memorabilia collection that embodied Rainoil's 25-year legacy in the Nigerian energy sector, we approached the project by distilling the language of industrial infrastructure into refined, collectible objects. Every item in the collection was designed to reference specific touchpoints of Rainoil's operations — from storage tank geometries to pipeline flow patterns — rather than applying logos after the fact.",
    challenge: "The core challenge was avoiding the trap of generic corporate merchandise. Most commemorative collections use the same archetypes (branded pens, notebooks, mugs) with logos applied as an afterthought. We needed every piece to feel purpose-built, authentic, and uniquely tied to Rainoil's operational identity.",
    solution: "We developed a three-tier collection system anchored around the visual grammar of the energy industry: cylindrical forms echoing storage tanks, linear textures mimicking pipeline networks, and a material palette drawn from industrial grade finishes. Each item was fabricated using premium materials — matte black ceramics, brushed stainless steel, and precision laser-etched details.",
    results: [
      '12,500+ units distributed across 8 regional offices',
      '94% recipient satisfaction rate in post-event surveys',
      'Featured in Brand New magazine',
      '3x average social media engagement compared to industry benchmarks'
    ],
    gallery: [
      '/assets/RAINOIL_CUP_RENDER_9.jpg',
      '/assets/RAINOIL_RENDER_POST_PROCESS_5.jpg',
      '/assets/RENDER 28.jpg'
    ]
  },
  {
    id: '2',
    number: '02',
    name: 'Nigerian Breweries',
    category: 'Food & Beverage',
    subcategory: 'Commemorative Memorabilia Packaging',
    description: "Crafting bespoke commemorative packaging celebrating heritage and excellence for Nigeria's premier brewing company, combining traditional craftsmanship with modern luxury aesthetic.",
    image: '/assets/NIGERIAN_BREWERIES_COLLECTION_2.jpg',
    heroImage: '/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_5.jpg',
    tags: ['Packaging Design', '3D Rendering', 'Luxury Packaging'],
    accentColor: '#0036f3',
    year: '2025',
    client: 'Nigerian Breweries Plc',
    services: ['Luxury Packaging', 'Structural Design', 'Gold Foil Application', '3D Photoreal Rendering'],
    overview: "Nigerian Breweries approached XTREME CR8TIVITY to create a limited-edition commemorative package celebrating their 75th anniversary as Nigeria's pioneer brewing company. The deliverable needed to encapsulate decades of brewing heritage while feeling contemporary, premium, and worthy of shelf space alongside the world's most luxurious spirits packaging.",
    challenge: "Balancing heritage and modernity was the primary tension. The design needed to reference Nigerian Breweries' rich history — their first brewery in Iganmu, their flagship Star lager, generations of Nigerian consumers — while avoiding the visual clichés of anniversary packaging (ribbons, badges, gold as a default color).",
    solution: "We created a dual-hinged presentation box structured as a keepsake. The exterior uses deep navy bookbinders cloth with a debossed geometric pattern drawn from the concentric rings of a bottle cap. The interior holds two vessels: a 750ml commemorative bottle and a custom glass, both featuring dual-tone gold foil application and hand-applied decals.",
    results: [
      '5,000 limited edition units produced and sold out in 3 weeks',
      'Featured in World Packaging Organization awards',
      '46% increase in premium tier brand sentiment',
      'Collectible resale value reached 3.5x original price'
    ],
    gallery: [
      '/assets/NIGERIAN_BREWERIES_COLLECTION_2.jpg',
      '/assets/NIGERIAN_BREWERIES_COLLECTION_3.jpg',
      '/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_5.jpg'
    ]
  },
  {
    id: '3',
    number: '03',
    name: 'Renaissance',
    category: 'Oil & Gas',
    subcategory: 'Executive Gift Sets & Brand Assets',
    description: "Exclusive executive gift sets and custom brand assets designed for high-level corporate engagements, showcasing elegance, prestige, and meticulous craftsmanship.",
    image: '/assets/RENDER 28.jpg',
    heroImage: '/assets/RENDER 21.jpg',
    tags: ['Corporate Gifting', 'Brand Strategy', 'Product Design'],
    accentColor: '#ff38fd',
    year: '2024',
    client: 'Renaissance Group',
    services: ['Executive Gifting', 'Product Design', 'Brand Asset Creation', 'Quality Assurance'],
    overview: "Renaissance Group, a diversified African conglomerate, required a refresh of their executive gifting program and supporting brand assets for board-level engagements, investor meetings, and partnership signings. The scope covered the entire gifting ecosystem: the physical products, the presentation layers, and the digital asset library that accompanied every deliverable.",
    challenge: "Executive gifting programs often suffer from commoditization. Every company gives leather notebooks and pens. Renaissance needed a system that felt bespoke, communicated genuine thoughtfulness, and aligned with their position as a group that redefines industries — not just participates in them.",
    solution: "We developed a modular gifting architecture organized around three tiers: Foundation (desk accessories), Elevation (writing instruments + journals), and Signature (custom-curated art pieces). Each tier uses materials with provenance — Italian full-grain leather, Japanese paper stocks, German refill mechanisms — assembled in Lagos with quality control typically reserved for European ateliers.",
    results: [
      'Deployed across 42+ high-stakes corporate engagements',
      '100% positive feedback from Fortune 500 leadership recipients',
      'Created new internal brand asset library with 300+ deliverables',
      'Became the standard reference for executive gifting across 5 Renaissance subsidiaries'
    ],
    gallery: [
      '/assets/RENDER 28.jpg',
      '/assets/RENDER 21.jpg',
      '/assets/Paper postal packages.jpg'
    ]
  }
]

export default function CaseStudy() {
  const navigate = useNavigate()
  const { id } = useParams()
  const study = caseStudies.find(s => s.id === id) || caseStudies[0]

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    navigate('/', { replace: true })
  }

  return (
    <div className={`page page-case-study page-case-study-${study.id}`}>
      <header className="page-header">
        <button onClick={handleBackClick} className="page-back">← Back</button>
      </header>

      <section className="page-hero">
        <div className="cs-meta-row">
          <span className="cs-number-badge">{study.number}</span>
          <span className="cs-category">{study.category}</span>
          <span className="cs-year">{study.year}</span>
        </div>
        <h1 className="page-title cs-title">{study.name}</h1>
        <p className="page-tagline cs-tagline">{study.subcategory}</p>
        <div className="cs-tags">
          {study.tags.map((tag, i) => (
            <span key={i} className="cs-tag">{tag}</span>
          ))}
        </div>
      </section>

      <section className="cs-hero-image">
        <img src={study.heroImage} alt={`${study.name} hero`} />
      </section>

      <section className="page-body cs-body">
        <div className="cs-info-grid">
          <div className="cs-info-item">
            <span className="cs-info-label">Client</span>
            <span className="cs-info-value">{study.client}</span>
          </div>
          <div className="cs-info-item">
            <span className="cs-info-label">Year</span>
            <span className="cs-info-value">{study.year}</span>
          </div>
          <div className="cs-info-item cs-info-services">
            <span className="cs-info-label">Services</span>
            <div className="cs-info-value">
              {study.services.map((s, i) => (
                <span key={i} className="cs-service">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Overview</h2>
          <p className="cs-section-text">{study.overview}</p>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Challenge</h2>
          <p className="cs-section-text">{study.challenge}</p>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Solution</h2>
          <p className="cs-section-text">{study.solution}</p>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Results & Impact</h2>
          <ul className="cs-results">
            {study.results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="cs-section">
          <h2 className="cs-section-title">Project Gallery</h2>
          <div className="cs-gallery">
            {study.gallery.map((g, i) => (
              <div key={i} className="cs-gallery-item">
                <img src={g} alt={`${study.name} - ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="cs-cta">
          <Link to="/contact" className="cs-cta-link">
            Want a case study like this? Let's talk →
          </Link>
        </div>
      </section>
    </div>
  )
}

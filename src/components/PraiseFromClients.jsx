import { useState } from 'react'
import './PraiseFromClients.css'

export default function PraiseFromClients() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState('next')

  const testimonials = [
    {
      id: 1,
      text: 'CR8 helped us sharpen our campaign story and gave the launch a much stronger visual direction across every customer touchpoint.',
      author: 'Annie Wang',
      company: 'Rainoil'
    },
    {
      id: 2,
      text: 'The team moved fast, listened well, and delivered a brand experience that felt premium, clear, and consistent from start to finish.',
      author: 'Annie Wang',
      company: 'Sapetro'
    },
    {
      id: 3,
      text: 'Their creative direction made our product story easier to understand and much more compelling for both partners and new customers.',
      author: 'Annie Wang',
      company: 'Sterling'
    },
    {
      id: 4,
      text: 'We needed bold ideas and clean execution, and CR8 delivered both with a process that felt collaborative at every stage.',
      author: 'Annie Wang',
      company: 'MRS'
    },
    {
      id: 5,
      text: 'From concept to rollout, the final work gave our campaign more clarity, more confidence, and a stronger connection with the audience.',
      author: 'Annie Wang',
      company: 'Oando'
    },
    {
      id: 6,
      text: 'The refreshed presentation system elevated how we show up publicly and made our messaging feel far more polished and intentional.',
      author: 'Annie Wang',
      company: 'Total'
    }
  ]

  const cardsPerPage = 3
  const visibleTestimonials = Array.from({ length: cardsPerPage }, (_, offset) => {
    const testimonialIndex = (currentIndex + offset) % testimonials.length
    return testimonials[testimonialIndex]
  })

  const showPreviousPage = () => {
    setSlideDirection('prev')
    setCurrentIndex((index) => (index === 0 ? testimonials.length - 1 : index - 1))
  }

  const showNextPage = () => {
    setSlideDirection('next')
    setCurrentIndex((index) => (index + 1) % testimonials.length)
  }

  return (
    <section className="praise-from-clients">
      <div className="section-container">
        <h2>Praise from<br />clients</h2>

        <div
          key={`${slideDirection}-${currentIndex}`}
          className={`testimonials-grid testimonials-grid--${slideDirection}`}
        >
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-avatar">
                <div className="avatar-circle"></div>
              </div>
              <div className="testimonial-content">
                <h4 className="author-name">{testimonial.author}, {testimonial.company}</h4>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="navigation-arrows">
          <button type="button" className="nav-arrow nav-arrow-prev" onClick={showPreviousPage} aria-label="Show previous testimonials">
            <img src="/assets/Asset 35.svg" alt="Previous" className="nav-arrow-img nav-arrow-img-prev" />
          </button>
          <button type="button" className="nav-arrow nav-arrow-next" onClick={showNextPage} aria-label="Show next testimonials">
            <img src="/assets/Asset 35.svg" alt="Next" className="nav-arrow-img nav-arrow-img-next" />
          </button>
        </div>

        <div className="testimonial-quotes">
          <div className="quote-section">
            <p className="main-quote">"We don't just think<br />outside the box"</p>
            <p className="sub-quote">"Outside the box is our<br />permanent residence"</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import './Carousel.css'

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState('next')

  const images = [
    { id: 1, src: '/assets/RENDER 1.jpg', alt: 'Render 1' },
    { id: 2, src: '/assets/RENDER 13 copy.jpg', alt: 'Render 13' },
    { id: 3, src: '/assets/RENDER 12.jpg', alt: 'Render 12' },
    { id: 4, src: '/assets/RENDER 11.jpg', alt: 'Render 11' },
    { id: 5, src: '/assets/RENDER 7.jpg', alt: 'Render 7' },
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
    <section className="carousel-section">
      <div className="section-container">
        <h2 className="carousel-title">Our Work</h2>

        <div className="carousel-stage">
          <div
            key={`${slideDirection}-${currentIndex}`}
            className={`carousel-images carousel-images--${slideDirection}`}
          >
            {visibleImages.map((image) => (
              <div key={image.id} className="carousel-image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="carousel-image"
                  loading="eager"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow--prev"
            onClick={showPrevious}
            aria-label="Previous images"
          >
            ←
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow--next"
            onClick={showNext}
            aria-label="Next images"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

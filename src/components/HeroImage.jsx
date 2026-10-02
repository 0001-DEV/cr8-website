import './HeroImage.css'

export default function HeroImage() {
  return (
    <section className="hero-image-section">
      <img
        src="/assets/rainoil-1.webp"
        alt="Hero"
        className="hero-image-full"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
    </section>
  )
}

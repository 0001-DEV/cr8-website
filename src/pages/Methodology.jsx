import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SegmentedCrossIcon from '../components/SegmentedCrossIcon'
import './Methodology.css'

export default function Methodology() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBackClick = () => {
    sessionStorage.setItem('returnedFromPage', 'true')
    const prevPage = sessionStorage.getItem('previousPage')
    if (prevPage) navigate(prevPage)
    else navigate(-1)
  }

  return (
    <div className="meth-page-container">
      <Header />
      <main className="meth-main-content">
        <div className="meth-back-nav">
          <button onClick={handleBackClick} className="meth-back-btn">← Back</button>
        </div>

        {/* ── Section 1: Our philosophy is, / There is no formula / for extraordinary ── */}
        <section className="meth-philosophy-section">
          <h1 className="meth-philosophy-title">
            <span className="meth-philosophy-pre">Our philosophy is,</span>
            <span className="meth-philosophy-line1">There is no formula for</span>
            <span className="meth-philosophy-line2">extraordinary.</span>
          </h1>
          <p className="meth-philosophy-body">
            We believe the world has enough brands, products and ideas that look, sound and feel the same. So we don't start by asking what we should make, but rather, why it needs to exist. Everything we do is built on one belief: If it's been done a thousand times, it's not worth doing the same way again.
          </p>
        </section>

        {/* ── Section 2: The principle we live by ── */}
        <section className="meth-principle-section">
          <h2 className="meth-principle-title">The principle we live by:</h2>
          <p className="meth-principle-subtitle">
            Nothing memorable starts with "That's how it's usually done."
          </p>
          <div className="meth-principle-body">
            <p>We question before we create.</p>
            <p>We explore before we decide.</p>
            <p>We push past the obvious.</p>
            <p>We obsess over the details that turn work from good into unforgettable.</p>
          </div>
        </section>

        {/* ── Section 3: Turn thinking into direction ── */}
        <section className="meth-direction-section">
          <h2 className="meth-direction-title">
            <span className="meth-direction-line1">Turn thinking into</span>
            <span className="meth-direction-line2">direction,</span>
          </h2>
          <p className="meth-direction-body">
            We interrogate the brief, the problem, and the assumptions behind it to ensure we're solving the right thing. From there, we push beyond the obvious, testing ideas, making unexpected connections, and opening up new directions. We then bring the strongest idea to life in the form it naturally demands, letting the concept lead the execution. Finally, we refine until it holds weight, work that is not just seen, but remembered for what it changes, not just how it looks.
          </p>
        </section>

        {/* ── Section 4: Segmented Cross Icon (same as home page) ── */}
        <section className="meth-cross-section">
          <SegmentedCrossIcon />
        </section>

        {/* ── Section 5: How we behave while we build ── */}
        <section className="meth-behave-section">
          <h2 className="meth-behave-title">
            <span className="meth-behave-line1">How we behave</span>
            <span className="meth-behave-line2">while we build,</span>
          </h2>
          <div className="meth-behave-body">
            <p>We debate the idea, not the person.</p>
            <p>We'd rather be wrong than predictable.</p>
            <p>We don't design to impress ourselves.</p>
            <p>We obsess over the details.</p>
            <p>Everyone gets a voice. Nobody gets a free pass.</p>
            <p>We take the work seriously. Ourselves, not so much.</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

import './App.css'
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import IntroAnimation from './components/IntroAnimation'
import Header from './components/Header'
import HeroImage from './components/HeroImage'
import Hero from './components/Hero'
import SegmentedCrossIcon from './components/SegmentedCrossIcon'
import WhyWeExist from './components/WhyWeExist'
import SelectedProjects from './components/SelectedProjects'
import Carousel from './components/Carousel'
import NewsPress from './components/NewsPress'
import PraiseFromClients from './components/PraiseFromClients'
import Footer from './components/Footer'
import Work from './pages/Work'
import Services from './pages/Services'
import Methodology from './pages/Methodology'
import About from './pages/About'
import Contact from './pages/Contact'
import NewsArticle from './pages/NewsArticle'
import CaseStudy from './pages/CaseStudy'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

function HomePage() {
  const [introLanded, setIntroLanded] = useState(false)
  const [pageRevealed, setPageRevealed] = useState(false)
  const [skipIntro, setSkipIntro] = useState(false)
  const [heroBrandRect, setHeroBrandRect] = useState(null)
  const heroBrandRef = useRef(null)
  const pageContentRef = useRef(null)
  const location = useLocation()

  const introComplete = skipIntro || pageRevealed

  useEffect(() => {
    const hasReturnedFromPage = sessionStorage.getItem('returnedFromPage')
    if (hasReturnedFromPage) {
      setSkipIntro(true)
      setIntroLanded(true)
      setPageRevealed(true)
      window.scrollTo(0, 0)
      sessionStorage.removeItem('returnedFromPage')
    }
  }, [location])

  useEffect(() => {
    if (skipIntro) return
    window.scrollTo(0, 0)
  }, [skipIntro])

  useEffect(() => {
    const measureHeroBrand = () => {
      if (heroBrandRef.current) {
        const rect = heroBrandRef.current.getBoundingClientRect()
        setHeroBrandRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
      }
    }
    // Run ASAP then multiple times during load to catch layout changes
    requestAnimationFrame(measureHeroBrand)
    const t1 = setTimeout(measureHeroBrand, 16)
    const t2 = setTimeout(measureHeroBrand, 100)
    const t3 = setTimeout(measureHeroBrand, 300)
    const t4 = setTimeout(measureHeroBrand, 600)
    const t5 = setTimeout(measureHeroBrand, 1200)
    window.addEventListener('resize', measureHeroBrand)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
      window.removeEventListener('resize', measureHeroBrand)
    }
  }, [skipIntro])

  useEffect(() => {
    if (introComplete) {
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 1500)
    }
  }, [introComplete])

  const pageContentClass = skipIntro || pageRevealed
    ? 'page-content--shown'
    : introLanded
      ? 'page-content--handoff'
      : 'page-content--hidden-during-intro'

  return (
    <div className="app" ref={pageContentRef}>
      {!skipIntro && (
        <IntroAnimation
          targetRect={heroBrandRect}
          onLand={() => setIntroLanded(true)}
          onFinished={() => setPageRevealed(true)}
        />
      )}
      <div className={`page-content ${pageContentClass}`}>
        <Header />
        <HeroImage />
        <div>
          <Hero brandRef={heroBrandRef} showText={introComplete || skipIntro} />
        </div>
        <SegmentedCrossIcon />
        <WhyWeExist />
        <SelectedProjects />
        <NewsPress />
        <PraiseFromClients />
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/project/:id" element={<CaseStudy />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

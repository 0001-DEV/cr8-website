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
import NewsPress from './components/NewsPress'
import PraiseFromClients from './components/PraiseFromClients'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Work from './pages/Work'
import Services from './pages/Services'
import Methodology from './pages/Methodology'
import About from './pages/About'
import Contact from './pages/Contact'
import NewsArticle from './pages/NewsArticle'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

function HomePage() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [skipIntro, setSkipIntro] = useState(false)
  const heroRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    // Check if returning from a feature page
    const hasReturnedFromPage = sessionStorage.getItem('returnedFromPage')
    if (hasReturnedFromPage) {
      setSkipIntro(true)
      setIntroComplete(true)
      setShowHeader(true)
      sessionStorage.removeItem('returnedFromPage')
    }
  }, [location])

  useEffect(() => {
    if (introComplete) {
      setTimeout(() => {
        if (heroRef.current) {
          const heroTop = heroRef.current.getBoundingClientRect().top + window.scrollY
          const headerOffset = 90
          window.scrollTo({
            top: Math.max(0, heroTop - headerOffset),
            behavior: 'auto'
          })
        }
      }, 190)

      setTimeout(() => {
        setShowHeader(true)
      }, 200)

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 500)
      }, 2100)
    }
  }, [introComplete])

  return (
    <div className="app">
      {!skipIntro && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      <div
        className={`page-content ${showHeader ? 'page-content--shown' : ''}`}
        style={{ visibility: showHeader ? 'visible' : 'hidden' }}
      >
        <Header />
        <HeroImage />
        <div ref={heroRef}>
          <Hero />
        </div>
        <SegmentedCrossIcon />
        <WhyWeExist />
        <SelectedProjects />
        <NewsPress />
        <PraiseFromClients />
        <CTA />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App

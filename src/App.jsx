import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function HomePage() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    if (introComplete) {
      setTimeout(() => {
        setShowHeader(true)
      }, 1000)
    }
  }, [introComplete])

  return (
    <div className="app">
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <>
          {showHeader && <Header />}
          {showHeader && <HeroImage />}
          <Hero />
          <SegmentedCrossIcon />
          {showHeader && (
            <>
              <WhyWeExist />
              <SelectedProjects />
              <NewsPress />
              <PraiseFromClients />
              <CTA />
              <Footer />
            </>
          )}
        </>
      )}
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

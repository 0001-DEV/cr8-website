import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './IntroAnimation.css'

export default function IntroAnimation({ onLand, onFinished, targetRect }) {
  const [showIntro, setShowIntro] = useState(true)
  const [landed, setLanded] = useState(false)
  const [fadeOverlay, setFadeOverlay] = useState(false)
  const [targetPos, setTargetPos] = useState(() => {
    if (targetRect) {
      return {
        top: targetRect.top,
        left: targetRect.left,
        scale: 1,
        heroWidth: targetRect.width,
        heroHeight: targetRect.height,
      }
    }

    const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1200
    const heroTopPad = 60 + 30
    const heroLeftPad = viewportW > 1400 ? (viewportW - 1400) / 2 : 0
    const heroInnerLeft = heroLeftPad + Math.max(20, viewportW * 0.03)

    return {
      top: heroTopPad,
      left: heroInnerLeft,
      scale: 1,
      heroWidth: null,
      heroHeight: null,
    }
  })

  useEffect(() => {
    const calcTarget = () => {
      if (targetRect) {
        setTargetPos({
          top: targetRect.top,
          left: targetRect.left,
          scale: 1,
          heroWidth: targetRect.width,
          heroHeight: targetRect.height,
        })
        return
      }

      const viewportW = window.innerWidth

      const heroTopPad = 60 + 30
      const heroLeftPad = viewportW > 1400 ? (viewportW - 1400) / 2 : 0
      const heroInnerLeft = heroLeftPad + Math.max(20, viewportW * 0.03)

      setTargetPos({
        top: heroTopPad,
        left: heroInnerLeft,
        scale: 1,
        heroWidth: null,
        heroHeight: null,
      })
    }

    calcTarget()
    window.addEventListener('resize', calcTarget)
    return () => window.removeEventListener('resize', calcTarget)
  }, [targetRect])

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOverlay(true)
    }, 1200)

    const landTimer = setTimeout(() => {
      setLanded(true)
      onLand?.()
    }, 2200)

    const unmountTimer = setTimeout(() => {
      setShowIntro(false)
      onFinished?.()
    }, 2380)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(landTimer)
      clearTimeout(unmountTimer)
    }
  }, [onLand, onFinished])

  if (!showIntro || !targetPos) return null

  const brandText = [
    { text: "Xtreme", line: 1 },
    { text: "Cr8tivity", line: 2 }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.div
      className="intro-animation"
      initial={{ backgroundColor: '#000000' }}
      animate={{ backgroundColor: fadeOverlay ? 'rgba(10,10,10,0)' : '#000000' }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.35, 1] }}
    >
      <motion.div
        className="intro-brand-container"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ transformOrigin: 'top left' }}
      >
        <motion.div
          className={`intro-brand-inner${landed ? ' intro-brand-inner--landed' : ''}`}
          initial={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 1.35,
            gap: '0.5rem',
            opacity: 1,
          }}
          animate={
            targetPos
              ? {
                  top: `${targetPos.top}px`,
                  left: `${targetPos.left}px`,
                  x: '0%',
                  y: '0%',
                  scale: 1.0,
                  gap: '0.25rem',
                  transition: {
                    top:    { duration: 1.0, delay: 1.2, ease: [0.25, 1, 0.35, 1] },
                    left:   { duration: 1.0, delay: 1.2, ease: [0.25, 1, 0.35, 1] },
                    x:      { duration: 1.0, delay: 1.2, ease: [0.25, 1, 0.35, 1] },
                    y:      { duration: 1.0, delay: 1.2, ease: [0.25, 1, 0.35, 1] },
                    scale:  { duration: 1.0, delay: 1.2, ease: [0.25, 1, 0.35, 1] },
                    gap:    { duration: 1.0, delay: 1.2, ease: [0.25, 1, 0.35, 1] },
                  }
                }
              : {}
          }
        >
          {brandText.map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              className="intro-brand-line"
              initial={{
                color: '#959da5',
                fontWeight: 700,
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
              animate={
                targetPos
                  ? {
                      color: '#ffffff',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                      lineHeight: 1.05,
                      transition: { duration: 1.0, delay: 1.2, ease: [0.25, 1, 0.35, 1] }
                    }
                  : {}
              }
            >
              {line.text.split("").map((char, charIndex) => (
                <motion.span key={charIndex} variants={child}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

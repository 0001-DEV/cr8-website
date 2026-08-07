import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './IntroAnimation.css'

export default function IntroAnimation({ onComplete, targetRect }) {
  const [showIntro, setShowIntro] = useState(true)
  const [targetPos, setTargetPos] = useState(null)

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
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 1400)

    const unmountTimer = setTimeout(() => {
      setShowIntro(false)
    }, 2400)

    return () => {
      clearTimeout(completeTimer)
      clearTimeout(unmountTimer)
    }
  }, [onComplete])

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
      initial={{ backgroundColor: '#0a0a0a' }}
      animate={{
        backgroundColor: ['#0a0a0a', '#0a0a0a', 'rgba(10,10,10,0)'],
        transition: { duration: 2.4, times: [0, 0.5, 0.92], ease: 'easeInOut' }
      }}
    >
      <motion.div
        className="intro-brand-container"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ transformOrigin: 'top left' }}
      >
        <motion.div
          className="intro-brand-inner"
          initial={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            gap: '0.5rem',
            opacity: 1,
          }}
          animate={
            targetPos
              ? {
                  top: [`50%`, `${targetPos.top}px`],
                  left: [`50%`, `${targetPos.left}px`],
                  x: [`-50%`, '0%'],
                  y: [`-50%`, '0%'],
                  gap: ['0.5rem', '0.25rem'],
                  opacity: [1, 1, 1, 0],
                  transition: {
                    top:    { duration: 1.0, delay: 1.2, ease: [0.65, 0, 0.35, 1] },
                    left:   { duration: 1.0, delay: 1.2, ease: [0.65, 0, 0.35, 1] },
                    x:      { duration: 1.0, delay: 1.2, ease: [0.65, 0, 0.35, 1] },
                    y:      { duration: 1.0, delay: 1.2, ease: [0.65, 0, 0.35, 1] },
                    gap:    { duration: 1.0, delay: 1.2, ease: [0.65, 0, 0.35, 1] },
                    opacity:{ duration: 0.4, delay: 2.0, ease: 'easeOut' },
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
                      color: ['#959da5', '#ffffff'],
                      fontWeight: [700, 900],
                      letterSpacing: ['0.08em', '0.04em'],
                      lineHeight: [1, 1.05],
                      transition: { duration: 1.0, delay: 1.2, ease: [0.65, 0, 0.35, 1] }
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

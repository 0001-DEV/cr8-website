import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './IntroAnimation.css'

export default function IntroAnimation({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true)
  const [targetPos, setTargetPos] = useState({ top: 130, left: 32, scale: 0.82 })

  useEffect(() => {
    const calcTarget = () => {
      const viewportW = window.innerWidth
      const leftPad = viewportW > 1400 ? (viewportW - 1400) / 2 + 32 : 32
      const top = 60 + 40 + 6
      const scale = viewportW < 768 ? 0.52 : 0.82
      setTargetPos({ top, left: leftPad, scale })
    }
    calcTarget()
    window.addEventListener('resize', calcTarget)
    return () => window.removeEventListener('resize', calcTarget)
  }, [])

  useEffect(() => {
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 1100)

    const unmountTimer = setTimeout(() => {
      setShowIntro(false)
    }, 1800)

    return () => {
      clearTimeout(completeTimer)
      clearTimeout(unmountTimer)
    }
  }, [onComplete])

  if (!showIntro) return null

  const brandText = [
    { text: "XTREME", line: 1 },
    { text: "CR8TIVITY", line: 2 }
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
      initial={{ opacity: 1 }}
      animate={{
        opacity: [1, 1, 0],
        transition: { duration: 2.4, times: [0, 0.85, 1], ease: 'easeInOut' }
      }}
    >
      <motion.div
        className="intro-brand-container"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ transformOrigin: 'top left' }}
        custom={targetPos}
      >
        <motion.div
          className="intro-brand-inner"
          initial={{ scale: 1 }}
          animate={{
            top: ['50%', `${targetPos.top}px`],
            left: ['50%', `${targetPos.left}px`],
            x: ['-50%', '0%'],
            y: ['-50%', '0%'],
            scale: [1, targetPos.scale],
            transition: { duration: 0.9, delay: 1.2, ease: [0.65, 0, 0.35, 1] }
          }}
        >
          {brandText.map((line, lineIndex) => (
            <div key={lineIndex} className="intro-brand-line">
              {line.text.split("").map((char, charIndex) => (
                <motion.span key={charIndex} variants={child}>
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}


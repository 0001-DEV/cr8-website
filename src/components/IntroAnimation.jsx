import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './IntroAnimation.css'

export default function IntroAnimation({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
      onComplete()
    }, 1500)

    return () => clearTimeout(timer)
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
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{
        scale: 0.15,
        y: 300,
        opacity: 0,
        transition: { duration: 0.8, delay: 1.2, ease: 'easeInOut' }
      }}
    >
      {/* Text animation */}
      <motion.div 
        className="intro-brand-container"
        variants={container}
        initial="hidden"
        animate="visible"
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
  )
}

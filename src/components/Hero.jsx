import './Hero.css'
import SegmentedCrossIcon from './SegmentedCrossIcon'

export default function Hero({ brandRef }) {
  const brandText = [
    { text: "Xtreme", line: 1 },
    { text: "Cr8tivity", line: 2 }
  ]

  const getAnimationClass = (charIndex, lineIndex) => {
    const totalIndex = lineIndex * 10 + charIndex; // Create unique index for each character
    const animationTypes = [
      'morph-scale', 'morph-rotate', 'morph-flip', 'morph-bounce', 
      'morph-skew', 'morph-blur', 'morph-glow', 'morph-shake',
      'morph-spin', 'morph-wave', 'morph-pulse', 'morph-stretch'
    ];
    return animationTypes[totalIndex % animationTypes.length];
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-brand-container" ref={brandRef}>
          {brandText.map((line, lineIndex) => (
            <div key={lineIndex} className="brand-line">
              {line.text.split('').map((char, charIndex) => (
                <span 
                  key={charIndex} 
                  className={`animated-char ${getAnimationClass(charIndex, lineIndex)}`}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <p className="hero-visual-text">Bringing excellence to mundane everyday things of life.</p>
      </div>
    </section>
  )
}

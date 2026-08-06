import './NewsPress.css'
import { Link } from 'react-router-dom'

export default function NewsPress() {
  const items = [
    {
      id: 1,
      image: '/assets/Natura Ad Campaign_Mobile Wallpaper.jpg',
      title: "Travel and tourism shouldn't be that serious.",
      meta: '19 Jul, 2026 • 3 mins read',
      reverse: false,
      tall: false,
      wide: false,
      fixed: false
    },
    {
      id: 2,
      image: '/assets/Asset 1.png',
      title: 'Unblanding an archaic gym brand system.',
      meta: '07 Jul, 2026 • 2 mins read',
      reverse: true,
      tall: true,
      wide: false,
      fixed: false
    },
    {
      id: 3,
      image: '/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_5.jpg',
      title: 'How Xtreme Cr8tivity ended an era of boring, unintentional commemorative memorabilia.',
      meta: '08 Jun, 2026 • 3 mins read',
      reverse: false,
      tall: false,
      wide: false,
      fixed: true
    },
    {
      id: 4,
      image: '/assets/RENDER 21.jpg',
      title: 'The necessity of digitalization and not just aesthetics.',
      meta: '21 May, 2026 • 5 mins read',
      reverse: true,
      tall: true,
      wide: true,
      fixed: false,
      reverseWide: true
    },
    {
      id: 5,
      image: '/assets/Natura Ad Campaign_Mobile Wallpaper.jpg',
      title: "Travel and tourism shouldn't be that serious.",
      meta: '19 Jul, 2026 • 3 mins read',
      reverse: false,
      tall: false,
      wide: false,
      fixed: false
    },
    {
      id: 6,
      image: '/assets/Asset 1.png',
      title: 'Unblanding an archaic gym brand system.',
      meta: '07 Jul, 2026 • 2 mins read',
      reverse: true,
      tall: true,
      wide: false,
      fixed: false
    },
    {
      id: 7,
      image: '/assets/NIGERIAN_BREWERIES_GOLD_AWARD_RENDER_5.jpg',
      title: 'How Xtreme Cr8tivity ended an era of boring, unintentional commemorative memorabilia.',
      meta: '08 Jun, 2026 • 3 mins read',
      reverse: false,
      tall: false,
      wide: false,
      fixed: true
    },
    {
      id: 8,
      image: '/assets/RENDER 21.jpg',
      title: 'The necessity of digitalization and not just aesthetics.',
      meta: '21 May, 2026 • 5 mins read',
      reverse: true,
      tall: true,
      wide: true,
      fixed: false,
      reverseWide: true
    }
  ]

  return (
    <section className="news-press">
      <div className="section-container">
        <h2>News & Press</h2>

        <div className="news-images-container">
          <div className="news-images-scroll">
            {items.map((item) => (
              <div
                key={item.id}
                className={`news-item ${item.reverse ? 'news-item-reverse' : ''} ${item.fixed ? 'news-item-fixed' : ''} ${item.reverseWide ? 'news-item-reverse-wide' : ''}`}
              >
                {!item.reverse && (
                  <img
                    src={item.image}
                    alt="News"
                    className={`news-image ${item.tall ? 'news-image-tall' : ''} ${item.wide ? 'news-image-wide' : ''}`}
                  />
                )}
                <div className="news-text">
                  <p className="news-title">{item.title}</p>
                  <p className="news-meta">{item.meta}</p>
                  <Link
                    to="/news"
                    className="news-arrow-link"
                  >
                    <svg
                      className="news-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="5" x2="19" y2="19" />
                      <polyline points="12 19 19 19 19 12" />
                    </svg>
                  </Link>
                </div>
                {item.reverse && (
                  <img
                    src={item.image}
                    alt="News"
                    className={`news-image ${item.tall ? 'news-image-tall' : ''} ${item.wide ? 'news-image-wide' : ''}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

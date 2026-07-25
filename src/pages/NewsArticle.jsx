import { Link, useParams } from 'react-router-dom'
import './Page.css'

export default function NewsArticle() {
  const { id } = useParams()
  const titles = {
    '1': "Travel and tourism shouldn't be that serious.",
    '2': 'Unblanding an archaic gym brand system.',
    '3': 'How Xtreme Cr8tivity ended an era of boring, unintentional commemorative memorabilia.',
    '4': 'The necessity of digitalization and not just aesthetics.',
    '5': "Travel and tourism shouldn't be that serious.",
    '6': 'Unblanding an archaic gym brand system.',
    '7': 'How Xtreme Cr8tivity ended an era of boring, unintentional commemorative memorabilia.',
    '8': 'The necessity of digitalization and not just aesthetics.'
  }
  const title = titles[id] || 'News Article'

  return (
    <div className={`page page-news page-news-${id}`}>
      <header className="page-header">
        <Link to="/" className="page-back">← Home</Link>
      </header>
      <section className="page-hero">
        <h1 className="page-title">{title}</h1>
        <p className="page-tagline">Story #{id} — from News & Press.</p>
      </section>
      <section className="page-body">
        <p>This is the full dedicated article page for story #{id}. This page opened in a new tab from the News & Press card arrow.</p>
      </section>
    </div>
  )
}

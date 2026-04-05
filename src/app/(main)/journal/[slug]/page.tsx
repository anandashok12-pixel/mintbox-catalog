import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { blogs, getBlogBySlug } from '@/data/blogs'
import './blog.css'

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlogBySlug(slug)
  if (!blog) return {}
  return {
    title: `${blog.title} — MintBox Journal`,
    description: blog.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)
  if (!blog) notFound()

  return (
    <div className="blog-page">
      {/* NAV */}
      <nav className="blog-nav">
        <a href="/" className="blog-nav-logo">MintBox</a>
        <a href="/#journal" className="blog-nav-back">← Journal</a>
      </nav>

      <article className="blog-article">
        {/* HEADER */}
        <header className="blog-header">
          <span className={`blog-cat-pill ${blog.categoryClass}`}>{blog.category}</span>
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-meta">{blog.date} · {blog.readTime}</p>
        </header>

        {/* CONTENT */}
        <div className="blog-body">
          {blog.content.map((block, i) => {
            if (block.type === 'p') {
              return <p key={i} className="blog-p">{block.text}</p>
            }
            if (block.type === 'bold-p') {
              return <p key={i} className="blog-bold-p"><strong>{block.text}</strong></p>
            }
            if (block.type === 'h3') {
              return <h2 key={i} className="blog-h3">{block.text}</h2>
            }
            if (block.type === 'hr') {
              return <hr key={i} className="blog-hr" />
            }
            if (block.type === 'ul') {
              return (
                <ul key={i} className="blog-ul">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )
            }
            return null
          })}
        </div>

        {/* CTA */}
        <div className="blog-cta">
          <p className="blog-cta-text">Ready to rethink your corporate gifting?</p>
          <a href="/#contact" className="blog-cta-btn">Request a quote →</a>
        </div>
      </article>
    </div>
  )
}

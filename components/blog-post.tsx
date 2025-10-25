import Link from "next/link"

interface BlogPostProps {
  post: {
    slug: string
    title: string
    excerpt: string
    date: string
    readTime: string
  }
}

export function BlogPost({ post }: BlogPostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="group">
      <Link href={`/post/${post.slug}`} className="block">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance group-hover:text-muted-foreground transition-colors">
            {post.title}
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>

          <div className="pt-2">
            <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors inline-flex items-center gap-2">
              Read more
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

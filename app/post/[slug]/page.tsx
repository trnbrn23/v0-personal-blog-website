import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { listPostSlugs, getPost } from "@/lib/publicContent"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const slugs = await listPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const post = await getPost(params.slug)

    const formattedDate = post.date
      ? new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null

    return (
      <div className="min-h-screen">
        <header className="border-b border-border">
          <div className="max-w-3xl mx-auto px-6 py-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <article>
            <header className="mb-12">
              {formattedDate && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                  <time dateTime={post.date || undefined}>{formattedDate}</time>
                  {(post as any).readTime && (
                    <>
                      <span>·</span>
                      <span>{(post as any).readTime}</span>
                    </>
                  )}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">{post.title}</h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>
              )}
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {post.body ? (
                <ReactMarkdown>{post.body}</ReactMarkdown>
              ) : (
                <ReactMarkdown>{(post as any).content || ""}</ReactMarkdown>
              )}
            </div>
          </article>
        </main>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

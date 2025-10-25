import { BlogHeader } from "@/components/blog-header"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { getContent } from "@/lib/publicContent"

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const about = await getContent("content/about.md")

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8 text-balance">{about.title}</h1>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
            <ReactMarkdown>{about.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Email Me
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Twitter
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

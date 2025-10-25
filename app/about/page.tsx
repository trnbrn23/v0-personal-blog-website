import { BlogHeader } from "@/components/blog-header"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8 text-balance">About Me</h1>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm a designer and developer passionate about crafting accessible, pixel-perfect user interfaces that
              blend thoughtful design with robust engineering.
            </p>

            <p>
              My work focuses on the intersection of design and development, creating experiences that not only look
              great but are meticulously built for performance and usability.
            </p>

            <p>
              Currently, I'm exploring the boundaries of web design, experimenting with new technologies, and sharing
              what I learn along the way.
            </p>

            <p>
              When I'm not coding or designing, you'll find me reading about typography, exploring minimalist
              architecture, or enjoying a good cup of coffee.
            </p>
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

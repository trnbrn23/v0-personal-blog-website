import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Your Name
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
              Thoughts on design, code, and everything in between
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty mb-12">
              A personal space where I share insights about user experience, web development, and the craft of building
              beautiful digital products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/blog">
                  Read the blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                <Link href="/about">Learn more about me</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-sm text-muted-foreground">© 2025 Your Name. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="https://twitter.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

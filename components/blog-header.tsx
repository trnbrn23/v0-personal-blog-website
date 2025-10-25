import Link from "next/link"

export function BlogHeader() {
  return (
    <header className="border-b border-border">
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance group-hover:text-muted-foreground transition-colors">
              Your Name
            </h1>
          </Link>

          <nav className="flex items-center gap-6 md:gap-8">
            <Link
              href="/blog"
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

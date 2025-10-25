import Link from "next/link"
import { BlogHeader } from "@/components/blog-header"
import { BlogPost } from "@/components/blog-post"

const posts = [
  {
    id: "1",
    title: "The Art of Minimalist Design",
    excerpt: "Exploring how less can truly be more when it comes to creating meaningful digital experiences.",
    date: "2025-01-15",
    readTime: "5 min read",
    slug: "art-of-minimalist-design",
  },
  {
    id: "2",
    title: "Building Better User Experiences",
    excerpt: "A deep dive into the principles that make interfaces intuitive, accessible, and delightful to use.",
    date: "2025-01-08",
    readTime: "8 min read",
    slug: "building-better-ux",
  },
  {
    id: "3",
    title: "Typography in Web Design",
    excerpt: "Understanding the fundamentals of type hierarchy, spacing, and readability for the modern web.",
    date: "2024-12-20",
    readTime: "6 min read",
    slug: "typography-web-design",
  },
  {
    id: "4",
    title: "The Power of White Space",
    excerpt: "How strategic use of negative space can transform your designs from cluttered to elegant.",
    date: "2024-12-10",
    readTime: "4 min read",
    slug: "power-of-white-space",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-16">
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </main>

      <footer className="border-t border-border mt-24">
        <div className="max-w-3xl mx-auto px-6 py-12">
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

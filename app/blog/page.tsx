import Link from "next/link"
import { BlogHeader } from "@/components/blog-header"
import { BlogPost } from "@/components/blog-post"
import { listPostSlugs, getPost } from "@/lib/publicContent"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const slugs = await listPostSlugs()
  const posts = await Promise.all(slugs.map(getPost))

  return (
    <div className="min-h-screen">
      <BlogHeader />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-16">
          {posts.map((post) => (
            <BlogPost key={post.slug} post={post} />
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

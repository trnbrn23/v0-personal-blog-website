import matter from "gray-matter"
import { GH_OWNER, GH_REPO, GH_BRANCH, GH_DIR } from "./content.config"

export type Post = {
  slug: string
  title: string
  date: string | null
  excerpt?: string | null
  body?: string
  [k: string]: unknown
}

const CONTENTS_API = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_DIR}?ref=${encodeURIComponent(GH_BRANCH)}`
function rawURL(path: string) {
  return `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/${encodeURIComponent(GH_BRANCH)}/${path}`
}

export async function listPostSlugs(): Promise<string[]> {
  const res = await fetch(CONTENTS_API, { cache: "no-store" })
  if (!res.ok) throw new Error("Cannot list content directory")
  const items = (await res.json()) as Array<{ name: string; type: string }>
  return items
    .filter((i) => i.type === "file" && /\.(json|md|mdx)$/i.test(i.name))
    .map((i) => i.name.replace(/\.(json|md|mdx)$/i, ""))
}

export async function getPost(slug: string): Promise<Post> {
  const paths = [`${GH_DIR}/${slug}.json`, `${GH_DIR}/${slug}.md`, `${GH_DIR}/${slug}.mdx`]

  for (const p of paths) {
    const url = rawURL(p)
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) continue

    if (p.endsWith(".json")) {
      const obj = await res.json()
      return {
        slug,
        title: String(obj.title ?? slug.split("/").pop()),
        date: obj.date ? String(obj.date) : null,
        excerpt: obj.excerpt ?? null,
        ...obj,
      }
    } else {
      const raw = await res.text()
      const { data, content } = matter(raw)
      return {
        slug,
        title: String((data?.title as any) ?? slug.split("/").pop()),
        date: data?.date ? String(data.date) : null,
        excerpt: (data?.excerpt as any) ?? null,
        body: content,
        ...data,
      }
    }
  }
  throw new Error(`Not found: ${slug}`)
}

export async function getContent(path: string): Promise<any> {
  const url = rawURL(path)
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error(`Cannot fetch ${path}`)

  if (path.endsWith(".json")) {
    return await res.json()
  } else {
    const raw = await res.text()
    const { data } = matter(raw)
    return data
  }
}

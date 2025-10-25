export type Post = {
  slug: string;
  title: string;
  date: string | null;
  excerpt: string | null;
  body: string;
  // other frontmatter passthrough fields are allowed
  [k: string]: unknown;
};

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("/data/posts.json", { cache: "no-store" });
  if (!res.ok) throw new Error("posts.json not found");
  return (await res.json()) as Post[];
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}

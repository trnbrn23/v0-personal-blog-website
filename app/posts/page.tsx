import { getPosts } from "@/lib/getPosts";

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <main className="prose mx-auto p-6">
      <h1>Posts</h1>
      <ul>
        {posts.map(p => (
          <li key={p.slug}>
            <a href={`/posts/${p.slug}`}>{p.title}</a>
            {p.date ? <span> — {new Date(p.date).toLocaleDateString()}</span> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}

import ReactMarkdown from "react-markdown";
import { getPost } from "@/lib/getPosts";

type Params = { slug: string[] };

export default async function PostPage({ params }: { params: Params }) {
  const slug = params.slug.join("/");
  const post = await getPost(slug);
  if (!post) return <main className="prose mx-auto p-6"><p>Not found.</p></main>;
  return (
    <main className="prose mx-auto p-6">
      <h1>{post.title}</h1>
      {post.date ? <p><em>{new Date(post.date).toLocaleDateString()}</em></p> : null}
      <ReactMarkdown>{post.body}</ReactMarkdown>
    </main>
  );
}

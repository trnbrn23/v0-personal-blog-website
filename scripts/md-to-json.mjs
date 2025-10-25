import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const POSTS_GLOB = "content/posts/**/*.{md,mdx}";
const OUT_DIR = "public/data";
const OUT_FILE = path.join(OUT_DIR, "posts.json");

const toSlug = (p) =>
  p.replace(/^content[\\/]+posts[\\/]+/i, "")
   .replace(/\.(md|mdx)$/i, "")
   .replace(/\\/g, "/");

async function mdToRecord(file) {
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  const slug = toSlug(file);
  return {
    slug,
    title: data?.title ?? slug.split("/").at(-1),
    date: data?.date ?? null,
    excerpt: data?.excerpt ?? null,
    body: content,
    ...data
  };
}

async function run() {
  const files = await fg(POSTS_GLOB, { dot: false });
  const posts = await Promise.all(files.map(mdToRecord));
  posts.sort((a, b) => Date.parse(b.date || "0") - Date.parse(a.date || "0"));
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(posts, null, 2), "utf8");
  console.log(`Wrote ${posts.length} posts -> ${OUT_FILE}`);
}

run().catch((e) => { console.error(e); process.exit(1); });

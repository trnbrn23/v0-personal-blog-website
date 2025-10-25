import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content")

export function getHomeContent() {
  const fullPath = path.join(contentDirectory, "home.md")
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)
  return data
}

export function getNavigationContent() {
  const fullPath = path.join(contentDirectory, "navigation.md")
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)
  return data
}

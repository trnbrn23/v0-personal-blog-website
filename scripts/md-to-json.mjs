import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content: content }
  }
  
  const frontmatter = match[1]
  const body = match[2]
  
  const data = {}
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      data[key] = value
    }
  })
  
  return { data, content: body.trim() }
}

// Convert blog posts
function convertPosts() {
  const postsDir = path.join(__dirname, '../content/posts')
  const outputFile = path.join(__dirname, '../data/posts.json')
  
  if (!fs.existsSync(postsDir)) {
    console.log('No posts directory found')
    return
  }
  
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = []
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    const { data, content: body } = parseFrontmatter(content)
    
    posts.push({
      slug: data.slug || path.basename(file, '.md'),
      title: data.title || '',
      excerpt: data.excerpt || '',
      date: data.date || '',
      readTime: data.readTime || '',
      content: body
    })
  })
  
  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })
  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2))
  console.log(`✓ Converted ${posts.length} posts to JSON`)
}

// Convert single content file
function convertContentFile(filename, outputName) {
  const contentFile = path.join(__dirname, `../content/${filename}`)
  const outputFile = path.join(__dirname, `../data/${outputName}`)
  
  if (!fs.existsSync(contentFile)) {
    console.log(`No ${filename} found`)
    return
  }
  
  const content = fs.readFileSync(contentFile, 'utf-8')
  const { data, content: body } = parseFrontmatter(content)
  
  // Merge frontmatter data with content body if needed
  const output = { ...data }
  if (body) {
    output.content = body
  }
  
  fs.mkdirSync(path.dirname(outputFile), { recursive: true })
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2))
  console.log(`✓ Converted ${filename} to JSON`)
}

// Run conversions
console.log('Converting markdown to JSON...')
convertPosts()
convertContentFile('home.md', 'home.json')
convertContentFile('navigation.md', 'navigation.json')
convertContentFile('about.md', 'about.json')
console.log('Done!')

import { promises as fs } from "node:fs";
import path from "node:path";

async function walk(dir, exts, includeDot) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    if (!includeDot && entry.name.startsWith(".")) return [];
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath, exts, includeDot);
    }
    const ext = path.extname(entry.name).slice(1).toLowerCase();
    if (exts.size === 0 || exts.has(ext)) {
      return [fullPath];
    }
    return [];
  }));
  return files.flat();
}

function parseExts(pattern) {
  const braceMatch = pattern.match(/\.\{([^}]+)\}$/);
  if (braceMatch) {
    return new Set(braceMatch[1].split(",").map((ext) => ext.replace(/^[.]/, "").trim().toLowerCase()).filter(Boolean));
  }
  const singleMatch = pattern.match(/\.([a-z0-9]+)$/i);
  if (singleMatch) {
    return new Set([singleMatch[1].toLowerCase()]);
  }
  return new Set();
}

export default async function fg(patterns, options = {}) {
  const pats = Array.isArray(patterns) ? patterns : [patterns];
  const includeDot = options.dot ?? false;
  const results = await Promise.all(
    pats.map(async (pattern) => {
      const baseDir = pattern.split("**")[0].replace(/[\\/]*$/, "");
      const dir = baseDir || process.cwd();
      const exts = parseExts(pattern);
      const files = await walk(dir, exts, includeDot);
      return files.map((file) => path.normalize(file));
    })
  );
  return results.flat();
}

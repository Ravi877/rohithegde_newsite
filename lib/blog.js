// lib/blog.js
import matter from 'gray-matter';
import { format } from 'date-fns';

// A helper to dynamically import Node modules safely
function getNodeModules() {
  if (typeof window !== 'undefined') {
    // If running in browser, return null to avoid breaking build
    return null;
  }
  const fs = eval("require('fs')");
  const path = eval("require('path')");
  return { fs, path };
}

export function getAllPosts() {
  const node = getNodeModules();
  if (!node) return []; // no-op in client/browser

  const { fs, path } = node;
  const postsDirectory = path.join(process.cwd(), '_posts');

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const formattedDate = format(
      new Date(matterResult.data.date),
      'MMMM d, yyyy'
    );

    return { slug, formattedDate, ...matterResult.data };
  });

  return allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const node = getNodeModules();
  if (!node) return null;

  const { fs, path } = node;
  const postsDirectory = path.join(process.cwd(), '_posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const formattedDate = format(new Date(data.date), 'MMMM d, yyyy');
  return { slug, content, formattedDate, ...data };
}

export function getAllPostSlugs() {
  const node = getNodeModules();
  if (!node) return [];

  const { fs, path } = node;
  const postsDirectory = path.join(process.cwd(), '_posts');

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, '') },
  }));
}

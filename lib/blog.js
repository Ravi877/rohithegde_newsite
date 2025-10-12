// lib/blog.js
// We keep non-Node utility imports here
import matter from 'gray-matter';
import { format } from 'date-fns';

// Note: fs and path are now required INSIDE the functions 
// to ensure they are only executed in the Node.js build environment 
// and resolve the "Module not found: Can't resolve 'fs'" error.

export function getAllPosts() {
  const fs = require('fs');
  const path = require('path');
  const postsDirectory = path.join(process.cwd(), '_posts');
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const formattedDate = format(new Date(matterResult.data.date), 'MMMM d, yyyy');
    return { slug, formattedDate, ...matterResult.data };
  });
  return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getPostBySlug(slug) {
  const fs = require('fs');
  const path = require('path');
  const postsDirectory = path.join(process.cwd(), '_posts');
  
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const formattedDate = format(new Date(data.date), 'MMMM d, yyyy');
  return { slug, content, formattedDate, ...data };
}

export function getAllPostSlugs() {
  const fs = require('fs');
  const path = require('path');
  const postsDirectory = path.join(process.cwd(), '_posts');
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, '') },
  }));
}
// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { format } = require('date-fns');

const postsDirectory = path.join(process.cwd(), '_posts');
const BASE_URL = 'https://www.rohithegde.in';

function getAllPostsForSitemap() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    return { slug };
  });
  return allPostsData;
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
     </url>
     <url>
       <loc>${BASE_URL}/blog</loc>
     </url>
     
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${BASE_URL}/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

try {
  const posts = getAllPostsForSitemap();
  const sitemap = generateSiteMap(posts);

  // Write the sitemap to the public directory
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('sitemap.xml generated successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error);
}
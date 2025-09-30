// pages/sitemap.js
import { getAllPosts } from '../lib/blog';

// This is the crucial line for Cloudflare Pages. It tells Next.js to run this function
// on the "edge," which is compatible with Cloudflare's environment.
export const runtime = 'edge';

// Define the base URL of your website.
const BASE_URL = 'https://www.rohithegde.in';

// This function generates the XML for the sitemap.
function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
     </url>
     <url>
       <loc>${BASE_URL}/blog</loc>
     </url>
     
     {/* FUTURE USE: If you add more static pages like a gallery or contact page, 
       add them here following the same structure. For example:
       <url>
         <loc>${BASE_URL}/gallery</loc>
       </url>
     */}

     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${BASE_URL}/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
       
    {/*
      FUTURE USE: If you add another section with dynamic pages (e.g., /posts),
      you would fetch them similarly to how 'getAllPosts' is used and map over them here.
    */}
   </urlset>
 `;
}

// This is a Next.js Server Component that generates the sitemap.
function SiteMap() {
  // We don't need to render anything here because we are directly manipulating the server response.
}

export async function getServerSideProps({ res }) {
  // 1. Get all your posts
  const posts = getAllPosts();
  
  // 2. Generate the full sitemap XML
  const sitemap = generateSiteMap(posts);

  // 3. Set the response headers and send the sitemap
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
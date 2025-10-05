/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. This tells Next.js to output a static site (HTML/CSS/JS)
  output: 'export', 
  
  // 2. This enforces all generated paths to end with a slash, 
  // e.g., /blog/post-name/
  // This helps static hosts like Cloudflare Pages serve the /post-name/index.html
  // file directly, eliminating the unnecessary redirect.
  trailingSlash: true, 

  // For future Next.js versions, images.unoptimized is often required for static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
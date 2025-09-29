// pages/blog/index.js
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/blog';
import Link from 'next/link';

// --- Main Blog Page Component ---
export default function BlogIndex({ allPosts }) {
  // Your new list of categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'trending', name: 'Trending' },
    { id: 'health', name: 'Health' },
    { id: 'personal-finance', name: 'Personal Finance' },
    { id: 'tech-ai', name: 'Tech & AI' },
    { id: 'news-updates', name: 'News & updates' },
    { id: 'travel', name: 'Travel' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  // This logic now filters posts based on the `category` field in your markdown files
  const filteredPosts = activeCategory === 'all'
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <Layout title="Blog | Rohit Hegde" description="Read the latest articles on finance, technology, and creativity.">
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full opacity-30 blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

          {/* Header section inside the page */}
          <div className="flex items-center justify-between mb-8">
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
              <span className="text-white font-medium">Blog Categories</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <Link href="#" className="hover:text-cyan-400 transition-colors">Home</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">About</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Service</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Features</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Testimonial</Link>
            </div>
          </div>

          {/* Main category navigation */}
          <nav className="mb-4">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-lg font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'text-white border-b-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>
          <hr className="border-gray-700 mb-12" />

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <BlogCardModern key={post.slug} post={post} />
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}

// --- New Blog Card Component (to match the image) ---
function BlogCardModern({ post }) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300">
      <div className="flex gap-5 items-center">
        <div className="flex-shrink-0 w-24 h-24">
            <img src={post.image || `https://source.unsplash.com/random/150x150?sig=${post.slug}`} alt={post.title} className="w-full h-full object-cover rounded-md" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1 truncate">
            {post.title}
          </h3>
          <p className="text-xs text-gray-400 mb-2">
            {post.formattedDate || 'January 20, 2025'}
          </p>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {post.description || 'A brief summary of the article goes here, providing a glimpse into the content.'}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

// This function runs at build time to fetch all blog posts.
export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}
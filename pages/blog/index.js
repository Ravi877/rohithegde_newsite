// pages/blog/index.js - Blog listing page with categories
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/blog';

export default function BlogIndex({ allPosts }) {
  // Available blog categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'security', name: 'Security' },
    { id: 'trending', name: 'Trending' },
    { id: 'policy', name: 'Policy & Legal' },
    { id: 'speed', name: 'Speed & Reliability' },
    { id: 'life', name: 'Life at Company' },
    { id: 'partners', name: 'Partners' }
  ];

  // Sub-categories for filtering
  const subCategories = [
    { id: 'tech-ai', name: 'Tech AI News', parent: 'trending' },
    { id: 'trending', name: 'Trending', parent: 'trending' },
    { id: 'mobiles', name: 'Mobiles', parent: 'trending' },
    { id: 'cybersecurity', name: 'Cybersecurity', parent: 'security' },
    { id: 'cloud', name: 'Cloud Computing', parent: 'speed' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubCategory, setActiveSubCategory] = useState('');

  // Filter posts based on selected category
  const filteredPosts = activeCategory === 'all'
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <Layout title="Blog | Rohit Hegde" description="Read the latest articles on finance, technology, and creativity.">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-2xl animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-600">
              <span className="text-white font-medium">Blog Categories</span>
            </div>
          </div>

          {/* Category buttons */}
          <nav className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-70 backdrop-blur-sm border border-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Sub-categories */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center lg:justify-start">
            {subCategories
              .filter(sub => activeCategory === 'all' || sub.parent === activeCategory)
              .map((subCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => setActiveSubCategory(subCategory.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSubCategory === subCategory.id
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'bg-blue-900 bg-opacity-50 text-cyan-200 hover:bg-opacity-70 backdrop-blur-sm'
                  }`}
                >
                  {subCategory.name}
                </button>
              ))}
          </div>

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <BlogCardModern key={post.slug} post={post} />
            ))}
          </div>

          {/* Social media icons */}
          <div className="flex justify-center space-x-6 mt-12 pt-8 border-t border-white border-opacity-20">
            <SocialLink icon="📷" href="#" />
            <SocialLink icon="📘" href="#" />
            <SocialLink icon="💬" href="#" />
            <SocialLink icon="🐦" href="#" />
            <SocialLink icon="📺" href="#" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Blog Card Component
function BlogCardModern({ post }) {
  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
            {post.image ? (
              <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <span className="text-3xl">📱</span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {post.title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-3">
            {post.date || 'January 20, 2025'}
          </p>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {post.description || post.excerpt || 'Read this interesting article...'}
          </p>
          
          <a 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Read More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// Social Link Component
function SocialLink({ icon, href }) {
  return (
    <a 
      href={href}
      className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-opacity-30 transition-all"
    >
      {icon}
    </a>
  );
}

// Get all posts at build time
export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}
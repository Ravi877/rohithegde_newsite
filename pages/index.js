// pages/index.js - Homepage (should be your landing page, not blog listing)
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout 
      title="Rohit Hegde - Finance, Tech & Creativity" 
      description="Welcome to my personal website where I share insights on finance, technology, and creativity."
    >
      {/* Hero Section with gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in">
              Welcome to My World
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-cyan-200 mb-8 max-w-2xl mx-auto">
              Exploring the intersection of finance, technology, and creativity. 
              Join me on this journey of learning and sharing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/blog"
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Read My Blog
              </Link>
              
              <Link 
                href="/about"
                className="px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-bold rounded-lg transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30"
              >
                About Me
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <FeatureCard 
                icon="💰"
                title="Finance"
                description="Investment strategies and financial insights"
              />
              <FeatureCard 
                icon="💻"
                title="Technology"
                description="Latest in tech and development"
              />
              <FeatureCard 
                icon="🎨"
                title="Creativity"
                description="Design, art, and innovation"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-cyan-200 text-sm">{description}</p>
    </div>
  );
}

// No getStaticProps needed for homepage since it's static content
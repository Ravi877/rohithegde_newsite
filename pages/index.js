// pages/index.js - Homepage with Recent Posts
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../lib/blog';

export default function Home({ recentPosts }) {
  return (
    <Layout
      title="Rohit Hegde - Finance, Tech & Creativity"
      description="Welcome to my personal website where I share insights on finance, technology, and creativity."
    >
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl">
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

              <a
                href="https://info.rohithegde.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-bold rounded-lg transition-all duration-300 backdrop-blur-sm border border-white border-opacity-30"
              >
                About Me
              </a>
            </div>

            {/* Recent Posts Section */}
            <div className="mt-20 text-left">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Latest Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                    <ReadMoreCard />
                </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

// --- FINAL REVISED Component for Recent Post Tiles ---
function PostCard({ post }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block relative h-72 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
            {/* Background Image with effects */}
            <Image
                src={post.image || '/images/uploads/default-post-image.jpg'}
                alt={post.title}
                fill
                className="object-cover w-full h-full transition-all duration-500 brightness-75 blur-sm group-hover:brightness-100 group-hover:blur-0 group-hover:scale-110"
            />
            {/* Consistent semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
            
            {/* Centered Content with Text Shadow */}
            <div className="relative h-full flex flex-col justify-center items-center p-6 text-center text-white">
                <h3 className="text-2xl font-bold leading-tight [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
                    {post.title}
                </h3>
            </div>
        </Link>
    );
}


// --- Component for the "Read More" Tile ---
function ReadMoreCard() {
    return (
        <Link href="/blog" className="group flex flex-col items-center justify-center h-72 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:border-cyan-400 hover:bg-opacity-20 transition-all duration-300">
            <div className="text-center text-white">
                <h3 className="text-xl font-bold">Read More</h3>
                <p className="text-slate-300 text-sm mt-1">View All Posts</p>
                <div className="mt-4 text-4xl transform group-hover:translate-x-2 transition-transform duration-300">
                →
                </div>
            </div>
        </Link>
    );
}


// This function runs at build time to fetch the 3 most recent posts.
export async function getStaticProps() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  return {
    props: {
      recentPosts,
    },
  };
}
// pages/index.js
import Layout from '../components/Layout';
import Link from 'next/link';
import { getAllPosts } from '../lib/blog';
import BlogCard from '../components/BlogCard';

// The Home page component. It gets the latest posts to feature them.
export default function Home({ featuredPosts }) {
  return (
    <Layout>
      {/* --- Hero Section --- */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        {/* Background Blobs for visual effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-lighten filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-lighten filter blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Text Content */}
            <div className="text-center lg:text-left">
              <span className="text-bright-blue font-bold uppercase tracking-wider">Rohit Hegde</span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white my-4">
                Create. Inspire.
                <span className="block">Thrive. Now.</span>
              </h1>
              <p className="text-xl text-light-slate max-w-lg mx-auto lg:mx-0">
                Unleash your creativity and build a brand that truly reflects your passion and expertise. Start crafting today!
              </p>
              <div className="mt-8">
                <Link href="/blog" className="inline-block px-8 py-4 bg-bright-blue text-white font-bold rounded-lg hover:bg-opacity-80 transition-all shadow-lg">
                  Read Posts
                </Link>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent-red rounded-full opacity-80"></div>
                <img
                  src="\public\images\uploads\HomeProfile_image.jpeg"
                  alt="Creative professional"
                  className="relative w-80 h-80 rounded-full object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Featured Posts Section --- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Get the 3 most recent posts at build time to pass to the page component.
export async function getStaticProps() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 3);
  return {
    props: {
      featuredPosts,
    },
  };
}
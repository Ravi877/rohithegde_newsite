// pages/blog/index.js
import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/blog';
import BlogCard from '../../components/BlogCard';

// This is the main blog page that lists all posts.
export default function BlogIndex({ allPosts }) {
  return (
    <Layout title="Blog | Rohit Hegde" description="Read the latest articles on finance, technology, and creativity.">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white">All Articles</h1>
          <p className="mt-4 text-xl text-light-slate">
            Here you'll find all my thoughts on finance, tech, and everything in between.
          </p>
        </header>
        
        {/* A grid to display all the blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Fetches all posts at build time to be passed as props to the page.
export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}
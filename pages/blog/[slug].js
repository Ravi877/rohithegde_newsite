// pages/blog/[slug].js
import Layout from '../../components/Layout';
import { getAllPostSlugs, getPostBySlug } from '../../lib/blog';
import { markdownToHtml } from '../../lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

// This page displays a single blog post.
export default function BlogPost({ post, htmlContent, canonicalUrl }) {
  return (
    <Layout title={post.title} description={post.description} canonicalUrl={canonicalUrl}>
      <article className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4">{post.title}</h1>
          <div className="text-light-slate">
            <span>By {post.author}</span>
            <span className="mx-2">&bull;</span>
            <time dateTime={post.date}>{post.formattedDate}</time>
          </div>
        </header>

        {post.image && (
          <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* This div uses the Tailwind Typography plugin to style the post content */}
        <div
          className="prose prose-xl prose-invert max-w-none prose-headings:text-white prose-a:text-bright-blue hover:prose-a:text-opacity-80"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        
        <div className="text-center mt-16">
          <Link href="/blog" className="text-bright-blue font-bold hover:underline">
            ← Back to All Posts
          </Link>
        </div>
      </article>
    </Layout>
  );
}

// Generates all the possible paths for blog posts at build time.
export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return { paths, fallback: false };
}

// Fetches the data for a specific post based on the slug.
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const htmlContent = markdownToHtml(post.content);
  
  // Define Base URL (consistent with sitemap.xml) and ensure trailing slash
  const BASE_URL = 'https://rohithegde.in';
  const canonicalUrl = `${BASE_URL}/blog/${params.slug}/`;

  return {
    props: {
      post,
      htmlContent,
      canonicalUrl, // Pass the constructed URL to the component
    },
  };
}
// pages/blog/[slug].js
import Layout from '../../components/Layout';
import { getAllPostSlugs, getPostBySlug } from '../../lib/blog';
import { markdownToHtml } from '../../lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPost({ post, htmlContent, canonicalUrl }) {
  return (
    <Layout>
      <article className="prose mx-auto">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500">{post.formattedDate}</p>

        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-xl my-6"
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

        <div className="mt-8">
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </article>
    </Layout>
  );
}

// ✅ This is the missing part — it tells Next.js which blog pages to build.
export async function getStaticPaths() {
  const paths = getAllPostSlugs(); // returns [{ params: { slug: 'post-name' }}, ...]
  return {
    paths,
    fallback: false, // only build these paths; no runtime fetching
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const htmlContent = markdownToHtml(post.content);

  const BASE_URL = 'https://rohithegde.in';
  const canonicalUrl = `${BASE_URL}/blog/${params.slug}/`;

  return {
    props: {
      post,
      htmlContent,
      canonicalUrl,
    },
  };
}

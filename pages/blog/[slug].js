// pages/blog/[slug].js
import Layout from '../../components/Layout';
import { getAllPostSlugs, getPostBySlug } from '../../lib/blog';
import { markdownToHtml } from '../../lib/markdown';
import Image from 'next/image';
import Link from 'next/link';

// This page displays a single blog post.
export default function BlogPost({ post, htmlContent, canonicalUrl }) {
  // ... (component code remains the same)
}

// ... (getStaticPaths remains the same)

// Fetches the data for a specific post based on the slug.
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const htmlContent = markdownToHtml(post.content);
  
  // FIX: Updated BASE_URL to remove 'www.' for bare domain
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
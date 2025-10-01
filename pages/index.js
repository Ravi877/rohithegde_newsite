// pages/index.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../lib/blog';

export default function Home({ recentPosts }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      depth: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.stagger-animation');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 150}ms`;
      el.classList.add('animate-fade-in-up');
    });
  }, []);

  return (
    <Layout
      title="Rohit Hegde - Digital Mind"
      description="Exploring the intersection of finance, technology, and creativity through a digital lens."
    >
      <div className="min-h-screen bg-dark-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          {particles.map((p, i) => {
            const moveX = (mousePosition.x / (window.innerWidth || 1) - 0.5) * p.depth * 20;
            const moveY = (mousePosition.y / (window.innerHeight || 1) - 0.5) * p.depth * 20;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-bright-blue/30"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  transform: `translate(${moveX}px, ${moveY}px)`,
                  transition: 'transform 0.2s ease-out',
                }}
              />
            );
          })}
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[500px] h-[500px] bg-glow-blue rounded-full blur-[150px] animate-float" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-lightest-slate mb-4">
                <span className="stagger-animation">Digital</span>{' '}
                <span className="stagger-animation">Mind.</span>{' '}
                <span className="stagger-animation">Creative</span>{' '}
                <span className="stagger-animation">Insights.</span>
            </h1>

            <p className="text-lg md:text-xl text-light-slate mb-8 max-w-2xl mx-auto stagger-animation">
              I'm Rohit Hegde. I explore the intersection of{' '}
              <span className="font-bold text-bright-blue">Finance</span>,{' '}
              <span className="font-bold text-bright-blue">Technology</span>, and{' '}
              <span className="font-bold text-bright-blue">Creativity</span> to build a smarter future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center stagger-animation">
              <Link href="/blog" className="px-8 py-3 bg-bright-blue text-dark-navy font-bold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_#00bfff] shadow-lg">
                Enter the Blog
              </Link>
              <a href="https://info.rohithegde.in" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-md transition-all duration-300 backdrop-blur-sm border border-white/30">
                About Me
              </a>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-dark-navy/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">Latest from the Digital Mind</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post, i) => (
                        <PostCard key={post.slug} post={post} index={i} />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}

function PostCard({ post, index }) {
    return (
        <Link 
            href={`/blog/${post.slug}`} 
            className="stagger-animation group block bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/10 transition-all duration-300 card-glow"
        >
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={post.image || '/images/uploads/default-post-image.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="p-6">
                <p className="text-xs text-bright-blue mb-2 font-semibold uppercase tracking-wider">{post.category || 'Insight'}</p>
                <h3 className="text-lg font-bold text-lightest-slate mb-3 line-clamp-2 group-hover:text-bright-blue transition-colors">
                    {post.title}
                </h3>
                <p className="text-light-slate text-sm line-clamp-2">
                    {post.description}
                </p>
            </div>
        </Link>
    );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  return {
    props: {
      recentPosts,
    },
  };
}
// components/Layout.js
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

// This is the main layout component that wraps every page.
// It includes the Head for SEO, Header, main content, and Footer.
export default function Layout({ children, title, description }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title || 'Modern Blog'}</title>
        <meta name="description" content={description || 'A modern blog built with Next.js'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* The main content for each page is passed in as `children` */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
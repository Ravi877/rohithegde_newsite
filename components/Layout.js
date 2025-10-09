// components/Layout.js
import Head from 'next/head';
import Script from 'next/script'; // Import the Script component
import Header from './Header';
import Footer from './Footer';

// This is the main layout component that wraps every page.
export default function Layout({ children, title, description }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title || 'Rohit Hegde - Digital Mind'}</title>
        <meta name="description" content={description || 'Exploring the intersection of finance, technology, and creativity.'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* --- Add Google Analytics Scripts Here --- */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-J8SKFT90V5"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J8SKFT90V5');
          `,
        }}
      />
      {/* --- End Google Analytics Scripts --- */}

      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}

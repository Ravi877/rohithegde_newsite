// pages/scratch.js
import Layout from '../components/Layout';
import ScratchCard from '../components/ScratchCard';

export default function ScratchPage() {
  return (
    <Layout 
      title="The Scratch Card" 
      description="A fun scratch card page with a deduction amount."
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        
        {/* Set Wonderla background using the custom Tailwind class */}
        <div 
          className="fixed inset-0 bg-wonderla bg-cover bg-center bg-fixed" 
          aria-hidden="true" 
        />
        
        {/* Overlay and Content */}
        <div className="relative z-10 w-full flex items-center justify-center min-h-screen">
          <ScratchCard />
        </div>
      </div>
    </Layout>
  );
}
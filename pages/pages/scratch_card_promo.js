import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link'; // Link component for navigation
import Layout from '../components/Layout'; // Layout component का सही पथ (Correct path for Layout component)

// Wonderla, Bangalore के लिए फ़ॉलबैक इमेज URL (Fallback image URL for Wonderla, Bangalore)
// एक रंगीन थीम पार्क ग्राफ़िक जैसा दिखने वाला प्लेसहोल्डर इस्तेमाल किया जा रहा है
const WONDERLA_BG = "https://placehold.co/1200x800/6A5ACD/FFFFFF?text=Wonderla+Bangalore+Attraction"; 

// --- Component Start ---

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const scratchRadius = 25; // 'इरेज़र' का साइज़

  // Canvas को इनिशियलाइज़ करना और स्क्रैच लॉजिक सेट करना (Initializing Canvas and setting scratch logic)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Canvas का साइज़ सेट करें (responsive)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');

    // स्क्रैच ओवरले को ड्रा करें (ग्रे कलर) (Draw the scratch overlay (Gray color))
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // स्क्रैच टेक्स्ट ओवरले लागू करें
    ctx.font = '24px Arial, sans-serif';
    ctx.fillStyle = '#4A2C2A'; // ग्रे स्क्रैच लेयर पर डार्क ब्राउन टेक्स्ट
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH TO REVEAL YOUR PRIZE!', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;
    const totalArea = canvas.width * canvas.height;

    // स्क्रैच प्रतिशत की गणना करने का फ़ंक्शन (Function to calculate scratch percentage)
    const calculateScratchedArea = () => {
        // साधारण पिक्सेल-आधारित जाँच (Simple pixel-based check)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] === 0) { // अल्फा चैनल (पारदर्शी) की जाँच करें (Check alpha channel (transparent))
                transparentPixels++;
            }
        }

        const scratchPercentage = (transparentPixels / (totalArea)) * 100;
        
        if (scratchPercentage > 50 && !isScratched) { // 50% स्क्रैच होने पर रिवील करें
            setIsScratched(true);
        }
    };

    // एक गोलाकार साफ़ क्षेत्र (इरेज़र) ड्रा करें (Draw a circular clear area (eraser))
    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, scratchRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleInteractionStart = (clientX, clientY) => {
      if (isScratched) return;
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      const y = (clientY - rect.top) * (canvas.height / rect.height);
      scratch(x, y);
    }

    const handleInteractionMove = (clientX, clientY) => {
      if (!isDrawing || isScratched) return;
      const rect = canvas.getBoundingClientRect();
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      const y = (clientY - rect.top) * (canvas.height / rect.height);
      scratch(x, y);
    }

    const handleInteractionEnd = () => {
      if (!isDrawing) return;
      isDrawing = false;
      calculateScratchedArea();
    }
    
    // माउस इवेंट हैंडलर (Mouse event handlers)
    const handleMouseDown = (e) => handleInteractionStart(e.clientX, e.clientY);
    const handleMouseMove = (e) => handleInteractionMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleInteractionEnd();

    // टच इवेंट हैंडलर (Touch event handlers)
    const handleTouchStart = (e) => {
        e.preventDefault();
        handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchEnd = () => handleInteractionEnd();

    // इवेंट लिसनर्स जोड़ें (Add event listeners)
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp); // कर्सर छोड़ने पर ड्राइंग बंद करें
    
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);


    return () => {
      // इवेंट लिसनर्स हटाएँ (Remove event listeners)
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScratched]);


  return (
    <div className="scratch-card-wrapper">
      
      {/* छिपा हुआ संदेश / रिवील की गई सामग्री (Hidden Message / Revealed Content) */}
      <div className={`revealed-content ${isScratched ? 'active' : ''}`}>
        <h2 className="revealed-title">🎉 CONGRATULATIONS! 🎉</h2>
        <p className="revealed-prize">You've won a promotional amount of</p>
        <p className="revealed-amount">₹1400</p>
        
        <div className="deduction-note">
            <p className="note-text">
                <span className="warning-icon">🚨</span> Due to urgent finance needs, this amount has been pre-deducted as a **flat discount** on your order.
            </p>
            <p className="note-subtext">Enjoy the benefit instantly!</p>
        </div>
        
        <Link href="/products" className="btn-primary scratch-btn">
            Start Shopping Now!
        </Link>
      </div>

      {/* स्क्रैच करने योग्य कैनवास ओवरले (Scratchable Canvas Overlay) */}
      <canvas ref={canvasRef} className={`scratch-canvas ${isScratched ? 'hidden' : ''}`} />
      
      {/* मोबाइल संकेत (Mobile Hint) */}
      <p className="mobile-hint">Use your finger or mouse to scratch the screen!</p>
    </div>
  );
};


export default function ScratchCardPage() {
  // WONDERLA_BG वेरिएबल को const से हटा दिया गया है ताकि स्टाइल टैग के बाहर काम कर सके
  return (
    <Layout title="Scratch Card Win!">
        <div className="promo-background">
            <div className="promo-overlay">
                <div className="container promo-container">
                    <h1 className="promo-header">Mahadev's Bhakhri Special Draw!</h1>
                    <ScratchCard />
                </div>
            </div>
        </div>

        {/* --- In-File CSS for Scratch Card Page --- */}
        <style jsx global>{`
          /* Custom Background & Container */
          .promo-background {
            min-height: 100vh;
            padding-top: 80px; /* Space for Navbar */
            background-image: url('${WONDERLA_BG}');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            /* Ensures content fits even if taller than viewport */
            padding-bottom: 20px; 
          }

          .promo-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6); /* Dark overlay for readability */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }

          .promo-container {
            max-width: 900px;
            width: 100%;
            text-align: center;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 30px;
          }

          .promo-header {
            font-size: 3rem;
            color: var(--gold);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            margin-bottom: 20px;
          }
          
          /* Scratch Card Wrapper */
          .scratch-card-wrapper {
            position: relative;
            width: 100%;
            max-width: 500px;
            height: 300px;
            margin: 0 auto;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            touch-action: none; /* Helps prevent scrolling on scratch */
          }
          
          .scratch-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            touch-action: none; /* Prevents scrolling when scratching on mobile */
            transition: opacity 0.5s ease;
          }
          
          .scratch-canvas.hidden {
            opacity: 0;
            pointer-events: none;
          }

          /* Revealed Content (Underneath the canvas) */
          .revealed-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            color: var(--dark-brown);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            transition: opacity 0.5s ease;
            text-align: center;
            transform: scale(0.95);
          }

          .revealed-content.active {
            opacity: 1;
            transform: scale(1);
          }

          .revealed-title {
            font-size: 2.2rem;
            color: var(--primary-red);
            margin-bottom: 10px;
          }

          .revealed-prize {
            font-size: 1.1rem;
            font-weight: 500;
          }

          .revealed-amount {
            font-size: 3.5rem;
            font-weight: 900;
            color: var(--primary-orange);
            margin-bottom: 20px;
            line-height: 1;
          }

          .deduction-note {
            background: var(--light-orange);
            padding: 10px 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 1px solid var(--primary-orange);
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
          }

          .note-text {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--dark-brown);
            line-height: 1.4;
          }
          
          .warning-icon {
              margin-right: 5px;
              font-size: 1.1rem;
              color: var(--primary-red);
          }

          .note-subtext {
            font-size: 0.85rem;
            margin-top: 5px;
            color: #666;
          }
          
          .scratch-btn {
              padding: 10px 30px;
              font-size: 1rem;
          }
          
          .mobile-hint {
              color: white;
              font-size: 1rem;
              margin-top: 15px;
              text-shadow: 0 0 5px black;
          }
          
          /* Mobile Responsiveness */
          @media (max-width: 500px) {
            .promo-header {
              font-size: 2rem;
            }
            .revealed-title {
              font-size: 1.8rem;
            }
            .revealed-amount {
              font-size: 3rem;
            }
            .scratch-card-wrapper {
              height: 250px;
            }
            .revealed-prize {
                font-size: 1rem;
            }
            .deduction-note {
                padding: 8px 10px;
            }
            .note-text {
                font-size: 0.85rem;
            }
            .note-subtext {
                font-size: 0.75rem;
            }
          }
        `}</style>
    </Layout>
  );
}

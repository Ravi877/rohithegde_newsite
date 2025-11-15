// components/ScratchCard.js
import React, { useRef, useEffect, useState, useCallback } from 'react';

// Configuration
const REVEAL_PERCENTAGE = 0.60; // 60% reveal to trigger full reveal
const BRUSH_RADIUS = 30; // Size of the eraser brush

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  const cardWidth = 350;
  const cardHeight = 150;
  const rupeeSymbol = '₹'; // Indian Rupee Symbol

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = cardWidth;
    canvas.height = cardHeight;

    // Draw the gray scratchable layer
    ctx.fillStyle = '#a0aec0'; // light-slate color for the scratch layer
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Add overlay text to the scratchable layer
    ctx.fillStyle = '#0a192f'; // dark-navy text color
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to Reveal Deduction', cardWidth / 2, cardHeight / 2 + 5);

    // Configure the brush for scratching
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = BRUSH_RADIUS * 2;
  }, [cardWidth, cardHeight]);

  // Function to calculate the scratched area
  const checkScratchedArea = useCallback((ctx, canvas) => {
    // Get all pixel data from the canvas
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = pixels.data;
    let scratchedPixels = 0;
    const totalPixels = canvas.width * canvas.height;

    // Count non-transparent (unscratched) pixels
    // Since we're using 'destination-out', transparent pixels (alpha=0) are scratched.
    // The image data array is [R, G, B, A, R, G, B, A, ...], so we check the Alpha channel (index 3, 7, 11, etc.)
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        scratchedPixels++;
      }
    }

    if (scratchedPixels / totalPixels >= REVEAL_PERCENTAGE) {
      setIsRevealed(true);
      // Optional: Clear canvas immediately on full reveal
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const scratch = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');

    // Get mouse/touch position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (isScratching) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 0.1, y + 0.1); // Draw a dot
      ctx.stroke();
      setIsScratching(true);
    }

    // Check progress on end of stroke
    if (!isScratching) {
        checkScratchedArea(ctx, canvas);
    }
  }, [isScratching, isRevealed, checkScratchedArea]);
  
  const handlePointerDown = (e) => {
    e.preventDefault(); // Prevent touch scrolling
    setIsScratching(true);
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    
    // Start a new path for continuous line drawing
    ctx.beginPath();
    scratch(e);
  };

  const handlePointerUp = useCallback(() => {
    setIsScratching(false);
    // Final check for reveal logic when user lifts finger/mouse
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        checkScratchedArea(ctx, canvas);
    }
  }, [checkScratchedArea]);

  useEffect(() => {
    setupCanvas();

    // Cleanup function
    return () => {
      // Clean up event listeners if necessary, though React handles most of it
      // Ensure any global listeners or intervals are cleared here
    };
  }, [setupCanvas]);

  useEffect(() => {
    if (isRevealed) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Final clear when fully revealed
        ctx.clearRect(0, 0, cardWidth, cardHeight);
    }
  }, [isRevealed]);


  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900/90 rounded-2xl shadow-2xl border-4 border-bright-blue/50 max-w-lg w-full">
      <h1 className="text-3xl font-extrabold text-lightest-slate mb-6">
        The Deduction
      </h1>
      <div className={`relative w-[${cardWidth}px] h-[${cardHeight}px] rounded-lg overflow-hidden`}>
        
        {/* The Hidden Content */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-6xl font-black text-bright-blue font-mono mb-2">
                {rupeeSymbol}1400
            </p>
            <p className="text-xl text-light-slate italic text-center px-4">
                "i really need it so im deducting this amount."
            </p>
        </div>

        {/* The Scratchable Layer (Canvas) */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 cursor-crosshair transition-opacity duration-300 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
          style={{ touchAction: 'none' }} // Disable default touch actions
          // Mouse/Touch Events
          onMouseDown={handlePointerDown}
          onMouseMove={isScratching ? scratch : undefined}
          onMouseUp={handlePointerUp}
          onMouseOut={handlePointerUp} // End scratching if cursor leaves
          onTouchStart={handlePointerDown}
          onTouchMove={isScratching ? scratch : undefined}
          onTouchEnd={handlePointerUp}
        />
      </div>

      <p className="mt-8 text-light-slate text-center text-sm">
        {isRevealed ? 'Transaction Complete.' : 'Scratch the gray area with your mouse or finger.'}
      </p>
    </div>
  );
}
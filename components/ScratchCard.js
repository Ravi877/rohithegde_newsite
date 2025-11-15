// components/ScratchCard.js
import React, { useRef, useEffect, useState, useCallback } from 'react';

// Configuration
const REVEAL_PERCENTAGE = 0.60; // 60% reveal to trigger full reveal
const BRUSH_RADIUS = 30; // Size of the eraser brush

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  // Set fixed dimensions here
  const cardWidth = 350;
  const cardHeight = 150;
  const rupeeSymbol = '₹'; // Indian Rupee Symbol

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = cardWidth;
    canvas.height = cardHeight;
    
    // --- 1. Draw the Solid Scratchable Layer (Dark Navy) ---
    
    // Fill the whole canvas with the dark background color
    ctx.fillStyle = '#0a192f'; 
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // --- 2. Draw a repeating pattern over the dark layer ---
    
    // Set up text style for the pattern
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#00bfff'; // Bright blue text
    
    // Create a simple repeated diagonal pattern for the "find a way" visual cue
    for (let i = -100; i < cardWidth + 100; i += 100) {
      for (let j = 0; j < cardHeight + 50; j += 50) {
        ctx.save(); // Save the current state of the canvas
        ctx.translate(i, j);
        ctx.rotate(-20 * Math.PI / 180); // Rotate to make it diagonal
        ctx.fillText('SCRATCH', 0, 0);
        ctx.restore(); // Restore the canvas state (undo the translate/rotate)
      }
    }
    
    // --- 3. Configure the Eraser Brush ---
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = BRUSH_RADIUS * 2;
  }, [cardWidth, cardHeight]);

  // Function to calculate the scratched area
  const checkScratchedArea = useCallback((ctx, canvas) => {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = pixels.data;
    let scratchedPixels = 0;
    const totalPixels = canvas.width * canvas.height;

    // Count transparent pixels (scratched areas)
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) {
        scratchedPixels++;
      }
    }

    if (scratchedPixels / totalPixels >= REVEAL_PERCENTAGE) {
      setIsRevealed(true);
    }
  }, []);

  const scratch = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');

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
      ctx.lineTo(x + 0.1, y + 0.1); // Draw a dot to ensure the path starts
      ctx.stroke();
      setIsScratching(true);
    }

    if (!isScratching) {
        checkScratchedArea(ctx, canvas);
    }
  }, [isScratching, isRevealed, checkScratchedArea]);
  
  const handlePointerDown = (e) => {
    e.preventDefault(); 
    setIsScratching(true);
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    scratch(e);
  };

  const handlePointerUp = useCallback(() => {
    setIsScratching(false);
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        checkScratchedArea(ctx, canvas);
    }
  }, [checkScratchedArea]);

  useEffect(() => {
    setupCanvas();
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
      
      {/* Container with guaranteed dimensions */}
      <div 
        className={`relative rounded-lg overflow-hidden`}
        style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
      >
        
        {/* The Hidden Content (Reveals upon scratching) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-6xl font-black text-bright-blue font-mono mb-2">
                {rupeeSymbol}1400
            </p>
            <p className="text-xl text-light-slate italic text-center px-4">
                "Hello Rakesh i really need it so im deducting this amount."
            </p>
        </div>

        {/* The Scratchable Layer (Canvas) */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 cursor-crosshair transition-opacity duration-300 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
          style={{ touchAction: 'none' }} // Crucial for mobile scratching
          onMouseDown={handlePointerDown}
          onMouseMove={isScratching ? scratch : undefined}
          onMouseUp={handlePointerUp}
          onMouseOut={handlePointerUp} 
          onTouchStart={handlePointerDown}
          onTouchMove={isScratching ? scratch : undefined}
          onTouchEnd={handlePointerUp}
        />
      </div>

      <p className="mt-8 text-light-slate text-center text-sm">
        {isRevealed ? 'Transaction Complete.' : 'Scratch the pattern to reveal your deduction.'}
      </p>
    </div>
  );
}
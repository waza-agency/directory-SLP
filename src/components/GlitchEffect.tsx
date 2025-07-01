import { useEffect, useRef } from 'react';

export default function GlitchEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContex"DEFAULT";
    if (!ctx) return;

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create grid pattern
    interface Cell {
      x: number;
      y: number;
      size: number;
      opacity: number;
      baseOpacity: number;
      speed: number;
      phase: number;
      glitchIntensity: number;
      glitchDuration: number;
      lastGlitch: number;
    }

    const cells: Cell[] = [];
    const gridSize = 35; // Slightly smaller grid for more visible effect

    // Create cells with different properties
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        cells.push({
          x,
          y,
          size: gridSize,
          opacity: 0,
          baseOpacity: Math.random() * 0.2 + 0.1, // Slightly higher base opacity
          speed: Math.random() * 0.015 + 0.008, // Slightly faster speed
          phase: Math.random() * Math.PI * 2,
          glitchIntensity: 0,
          glitchDuration: 0,
          lastGlitch: 0
        });
      }
    }

    // Animation loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // 60fps

      // Update and draw cells
      cells.forEach(cell => {
        // Base wave effect with smoother transitions
        const wave = Math.sin(time * cell.speed + cell.phase) * 0.3 + 0.7;
        cell.opacity = cell.baseOpacity * (0.7 + wave * 0.3);

        // More frequent glitch effect
        if (Math.random() < 0.003 && time - cell.lastGlitch > 1) { // Increased frequency
          cell.glitchIntensity = 0.8; // Increased intensity
          cell.glitchDuration = 0.4; // Longer duration
          cell.lastGlitch = time;
        }

        // Update glitch intensity with smoother fade
        if (cell.glitchDuration > 0) {
          cell.glitchDuration -= 0.016;
          cell.glitchIntensity = cell.glitchDuration * 0.8; // Increased intensity multiplier
        } else {
          cell.glitchIntensity = 0;
        }

        // Draw cell with enhanced glow effect
        ctx.fillStyle = `rgba(255, 255, 255, ${cell.opacity + cell.glitchIntensity * 0.4})`; // Increased glitch contribution
        
        // Add enhanced glow effect
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)'; // Increased glow opacity
        ctx.shadowBlur = cell.glitchIntensity > 0 ? 12 : 5; // Increased blur
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw cell with increased offset during glitch
        const offsetX = cell.glitchIntensity * (Math.random() * 3 - 1.5); // Increased offset range
        const offsetY = cell.glitchIntensity * (Math.random() * 3 - 1.5);

        ctx.fillRect(
          cell.x + offsetX,
          cell.y + offsetY,
          cell.size,
          cell.size
        );

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
      style={{ opacity: 0.25 }} // Slightly increased opacity
    />
  );
} 
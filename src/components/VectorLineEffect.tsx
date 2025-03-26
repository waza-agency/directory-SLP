import { useEffect, useRef } from 'react';

export default function VectorLineEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Line properties
    interface Line {
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      thickness: number;
      opacity: number;
    }

    const lines: Line[] = [];
    const numLines = 3; // Number of lines to animate

    // Create lines with different properties
    for (let i = 0; i < numLines; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
        thickness: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    // Animation loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // 60fps

      // Update and draw lines
      lines.forEach(line => {
        // Update position with bouncing effect
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        // Bounce off edges
        if (line.x < 0 || line.x > canvas.width) {
          line.angle = Math.PI - line.angle;
        }
        if (line.y < 0 || line.y > canvas.height) {
          line.angle = -line.angle;
        }

        // Draw line with glow effect
        ctx.beginPath();
        ctx.moveTo(
          line.x - Math.cos(line.angle) * line.length / 2,
          line.y - Math.sin(line.angle) * line.length / 2
        );
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length / 2,
          line.y + Math.sin(line.angle) * line.length / 2
        );

        // Create gradient for glow effect
        const gradient = ctx.createLinearGradient(
          line.x - Math.cos(line.angle) * line.length / 2,
          line.y - Math.sin(line.angle) * line.length / 2,
          line.x + Math.cos(line.angle) * line.length / 2,
          line.y + Math.sin(line.angle) * line.length / 2
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${line.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${line.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${line.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.thickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Add glow effect
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.stroke();

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
      style={{ opacity: 0.3 }}
    />
  );
} 
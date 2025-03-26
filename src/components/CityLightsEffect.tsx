import { useEffect, useRef } from 'react';

export default function CityLightsEffect() {
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

    // Create city lights
    interface Light {
      x: number;
      y: number;
      size: number;
      baseIntensity: number;
      currentIntensity: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
      flashIntensity: number;
      flashDuration: number;
      lastFlash: number;
    }

    const lights: Light[] = [];
    const numLights = 300; // More lights for a denser city feel

    // Create lights with different colors and behaviors
    for (let i = 0; i < numLights; i++) {
      const isBuilding = Math.random() < 0.4; // 40% chance of being a building light
      const isStreet = Math.random() < 0.3; // 30% chance of being a street light
      
      let color;
      if (isBuilding) {
        color = `hsl(${Math.random() * 60 + 30}, 80%, 60%)`; // Warmer, brighter building lights
      } else if (isStreet) {
        color = `hsl(${Math.random() * 20 + 40}, 90%, 70%)`; // Brighter yellow street lights
      } else {
        color = `hsl(${Math.random() * 360}, 80%, 60%)`; // Brighter random colored lights
      }

      lights.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isBuilding ? Math.random() * 5 + 3 : Math.random() * 3 + 1.5, // Larger lights
        baseIntensity: Math.random() * 0.7 + 0.4, // Higher base intensity
        currentIntensity: 0,
        color,
        pulseSpeed: Math.random() * 0.03 + 0.01, // Slightly faster pulses
        pulsePhase: Math.random() * Math.PI * 2,
        flashIntensity: 0,
        flashDuration: 0,
        lastFlash: 0
      });
    }

    // Animation loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // 60fps

      // Update and draw lights
      lights.forEach(light => {
        // Base pulsing effect with more variation
        const pulse = Math.sin(time * light.pulseSpeed + light.pulsePhase) * 0.7 + 0.3;
        light.currentIntensity = light.baseIntensity * (0.3 + pulse * 0.7);

        // More frequent random flash effect
        if (Math.random() < 0.002 && time - light.lastFlash > 2) {
          light.flashIntensity = 1.5; // Stronger flash
          light.flashDuration = 0.8; // Longer flash duration
          light.lastFlash = time;
        }

        // Update flash intensity with smoother fade
        if (light.flashDuration > 0) {
          light.flashDuration -= 0.016;
          light.flashIntensity = light.flashDuration * 1.5;
        } else {
          light.flashIntensity = 0;
        }

        // Draw light with enhanced glow effect
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.size, 0, Math.PI * 2);
        
        // Create gradient for enhanced glow effect
        const gradient = ctx.createRadialGradient(
          light.x, light.y, 0,
          light.x, light.y, light.size * 4 // Larger glow radius
        );
        
        const totalIntensity = light.currentIntensity + light.flashIntensity;
        gradient.addColorStop(0, light.color.replace('60%', `${Math.min(100, totalIntensity * 100)}%`));
        gradient.addColorStop(0.5, light.color.replace('60%', `${Math.min(80, totalIntensity * 80)}%`));
        gradient.addColorStop(1, light.color.replace('60%', '0%'));
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Enhanced glow for flashes
        if (light.flashIntensity > 0) {
          ctx.shadowColor = light.color;
          ctx.shadowBlur = 30; // Increased blur for stronger glow
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        } else {
          ctx.shadowColor = light.color;
          ctx.shadowBlur = 15; // Increased base blur
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
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
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      style={{ opacity: 0.8 }} // Increased opacity
    />
  );
} 
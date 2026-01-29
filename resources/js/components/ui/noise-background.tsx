import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

// Helper component for gradient layers
function GradientLayer({
  springX,
  springY,
  gradientColor,
  opacity,
  multiplier,
}: {
  springX: MotionValue;
  springY: MotionValue;
  gradientColor: string;
  opacity: number;
  multiplier: number;
}) {
  const x = useTransform(springX, (val) => val * multiplier);
  const y = useTransform(springY, (val) => val * multiplier);
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 50%)`;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        background,
        opacity,
      }}
    />
  );
}

interface NoiseBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: string[];
  noiseIntensity?: number;
  speed?: number;
  backdropBlur?: boolean;
  animating?: boolean;
}

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = [
    "rgb(255, 100, 150)",
    "rgb(100, 150, 255)",
    "rgb(255, 200, 100)",
  ],
  noiseIntensity = 0.2,
  speed = 0.1,
  backdropBlur = false,
  animating = true,
}: NoiseBackgroundProps) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use spring animation for smooth movement
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Transform for top gradient strip
  const topGradientX = useTransform(springX, (val) => val * 0.1 - 50);
  const topGradientBackground = useMotionTemplate`linear-gradient(90deg, transparent, ${gradientColors[0]}, transparent)`;

  const velocityRef = useRef({ x: 0, y: 0 });
  const lastDirectionChangeRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize position to center
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(centerX);
    y.set(centerY);
  }, [x, y]);

  // Generate random velocity
  const generateRandomVelocityRef = useRef(() => {
    const angle = Math.random() * Math.PI * 2;
    const magnitude = speed * (0.5 + Math.random() * 0.5); // Random speed between 0.5x and 1x
    return {
      x: Math.cos(angle) * magnitude,
      y: Math.sin(angle) * magnitude,
    };
  });

  // Update generateRandomVelocity when speed changes
  useEffect(() => {
    generateRandomVelocityRef.current = () => {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      };
    };
    velocityRef.current = generateRandomVelocityRef.current();
  }, [speed]);

  // Animate using motion/react's useAnimationFrame
  useAnimationFrame((time) => {
    if (!animating || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width;
    const maxY = rect.height;

    // Change direction randomly every 1.5-3 seconds
    if (time - lastDirectionChangeRef.current > 1500 + Math.random() * 1500) {
      velocityRef.current = generateRandomVelocityRef.current();
      lastDirectionChangeRef.current = time;
    }

    // Update position based on velocity (deltaTime is ~16ms per frame at 60fps)
    const deltaTime = 16; // Approximate frame time
    const currentX = x.get();
    const currentY = y.get();

    let newX = currentX + velocityRef.current.x * deltaTime;
    let newY = currentY + velocityRef.current.y * deltaTime;

    // When hitting edges, generate a completely new random direction
    // This ensures truly random movement in all 360 degrees, not just horizontal/vertical
    const padding = 20; // Keep some distance from edges

    if (
      newX < padding ||
      newX > maxX - padding ||
      newY < padding ||
      newY > maxY - padding
    ) {
      // Generate completely random direction (full 360 degrees)
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      velocityRef.current = {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      };
      // Reset timer to allow immediate new direction
      lastDirectionChangeRef.current = time;
      // Clamp position to stay within bounds
      newX = Math.max(padding, Math.min(maxX - padding, newX));
      newY = Math.max(padding, Math.min(maxY - padding, newY));
    }

    x.set(newX);
    y.set(newY);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg",
        backdropBlur && "backdrop-blur-sm",
        !mounted && "opacity-0",
        containerClassName,
      )}
      style={!mounted ? { visibility: "hidden" } : undefined}
    >
      {/* Moving gradient layers */}
      {gradientColors.map((color, index) => (
        <GradientLayer
          key={index}
          springX={springX}
          springY={springY}
          gradientColor={color}
          opacity={0.3}
          multiplier={0.5 + index * 0.3}
        />
      ))}

      {/* Top gradient strip */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-20"
        style={{
          background: topGradientBackground,
          x: topGradientX,
        }}
      />

      {/* Static Noise Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[var(--noise-opacity)]"
        style={
          {
            "--noise-opacity": noiseIntensity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          } as React.CSSProperties
        }
      />

      {/* Content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

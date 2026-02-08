"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  if (typeof window === "undefined")
    return { x: 0, y: 0, angle: 45 };
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar: ShootingStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      setStar(newStar);

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();

    return () => {};
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    let raf = 0;
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const h = typeof window !== "undefined" ? window.innerHeight : 1080;

    const moveStar = () => {
      setStar((prevStar) => {
        if (!prevStar) return null;
        const rad = (prevStar.angle * Math.PI) / 180;
        const newX = prevStar.x + prevStar.speed * Math.cos(rad);
        const newY = prevStar.y + prevStar.speed * Math.sin(rad);
        const newDistance = prevStar.distance + prevStar.speed;
        const newScale = 1 + newDistance / 100;
        if (
          newX < -20 ||
          newX > w + 20 ||
          newY < -20 ||
          newY > h + 20
        ) {
          return null;
        }
        return {
          ...prevStar,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: newScale,
        };
      });
      raf = requestAnimationFrame(moveStar);
    };

    raf = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(raf);
  }, [star]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {star && (
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient
              id={`shooting-star-gradient-${star.id}`}
              gradientUnits="userSpaceOnUse"
              x1={star.x}
              y1={star.y}
              x2={
                star.x -
                80 * Math.cos((star.angle * Math.PI) / 180)
              }
              y2={
                star.y -
                80 * Math.sin((star.angle * Math.PI) / 180)
              }
            >
              <stop offset="0%" stopColor={starColor} stopOpacity={0} />
              <stop offset="50%" stopColor={trailColor} stopOpacity={0.5} />
              <stop offset="100%" stopColor={starColor} stopOpacity={1} />
            </linearGradient>
          </defs>
          <line
            x1={star.x}
            y1={star.y}
            x2={
              star.x - 80 * Math.cos((star.angle * Math.PI) / 180)
            }
            y2={
              star.y - 80 * Math.sin((star.angle * Math.PI) / 180)
            }
            stroke={`url(#shooting-star-gradient-${star.id})`}
            strokeWidth={starHeight * star.scale}
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};

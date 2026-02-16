'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface Star {
    angle: number;
    distance: number;
    speed: number;
    size: number;
    opacity: number;
}

interface WarpStarfieldProps {
    starCount?: number;
    minSpeed?: number;
    maxSpeed?: number;
    className?: string;
}

/**
 * Phaser.io-style starfield: stars move from center outward like flying through space.
 * Canvas-based for smooth animation with many particles.
 */
export function WarpStarfield({
    starCount = 400,
    minSpeed = 0.8,
    maxSpeed = 2.5,
    className,
}: WarpStarfieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const stars: Star[] = Array.from({ length: starCount }, () => ({
            angle: Math.random() * Math.PI * 2,
            distance: Math.random() * 800,
            speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
            size: 0.3 + Math.random() * 1.2,
            opacity: 0.4 + Math.random() * 0.6,
        }));

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const w = Math.floor(rect.width);
            const h = Math.floor(rect.height);
            if (w !== width || h !== height) {
                width = w;
                height = h;
                canvas.width = width;
                canvas.height = height;
            }
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        let raf: number;
        const render = () => {
            if (width <= 0 || height <= 0) {
                resize();
            }
            const cx = width / 2;
            const cy = height / 2;
            const maxRadius = Math.sqrt(width * width + height * height) / 2 + 100;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                s.distance += s.speed;

                if (s.distance > maxRadius) {
                    s.angle = Math.random() * Math.PI * 2;
                    s.distance = 0;
                    s.speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
                    s.size = 0.3 + Math.random() * 1.2;
                    s.opacity = 0.4 + Math.random() * 0.6;
                }

                const x = cx + Math.cos(s.angle) * s.distance;
                const y = cy + Math.sin(s.angle) * s.distance;
                const t = Math.min(1, s.distance / maxRadius);
                const size = s.size * (0.5 + t * 1.5);
                const opacity = s.opacity * (1 - t * 0.4);

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();
            }

            raf = requestAnimationFrame(render);
        };
        raf = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, [starCount, minSpeed, maxSpeed]);

    return (
        <canvas
            ref={canvasRef}
            className={cn('absolute inset-0 h-full w-full', className)}
            aria-hidden
        />
    );
}

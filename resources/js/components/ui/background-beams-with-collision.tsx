"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const beams = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: "h-20" },
    { initialX: 1000, translateX: 1000, duration: 4, repeatDelay: 2, className: "h-12" },
    { initialX: 1200, translateX: 1200, duration: 6, repeatDelay: 4, delay: 2, className: "h-6" },
  ];

  return (
    <div ref={parentRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
      {beams.map((beam, idx) => (
        <CollisionMechanism
          key={`beam-${idx}-${beam.initialX}`}
          containerRef={containerRef}
          parentRef={parentRef}
          beamOptions={beam}
        />
      ))}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

type BeamOptions = {
  initialX?: number;
  translateX?: number;
  initialY?: string;
  translateY?: string;
  rotate?: number;
  className?: string;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
};

const CollisionMechanism = ({
  containerRef,
  parentRef,
  beamOptions = {},
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
  beamOptions?: BeamOptions;
}) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({ detected: false, coordinates: null });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  const {
    initialX = 0,
    translateX = 0,
    initialY = "-200px",
    translateY = "1800px",
    rotate = 0,
    className,
    duration = 8,
    delay = 0,
    repeatDelay = 0,
  } = beamOptions;

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        // Trigger when beam hits the *bottom* of the container (not the top)
        if (beamRect.top >= containerRect.bottom) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = containerRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);
    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      const t1 = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);
      const t2 = setTimeout(() => setBeamKey((k) => k + 1), 2000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [collision.detected, collision.coordinates]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        className={cn(
          "absolute left-0 top-0 w-1 rounded-full bg-gradient-to-b from-white/45 to-purple-500/50",
          className ?? "h-10"
        )}
        style={{
          left: initialX,
          top: initialY,
        }}
        initial={{ y: 0 }}
        animate={{ y: "2000px" }}
        transition={{
          duration,
          repeat: Infinity,
          repeatDelay,
          delay,
          ease: "linear",
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            x={collision.coordinates.x}
            y={collision.coordinates.y}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Explosion = ({
  x,
  y,
  className,
}: {
  x: number;
  y: number;
  className?: string;
}) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div
      className={cn("absolute z-10 overflow-visible", className)}
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute h-2 w-2 rounded-full bg-purple-400/90"
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: p.directionX,
            y: p.directionY,
            opacity: 0,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Timeline = ({
  data,
  title = "Changelog from my journey",
  subtitle = "I've been working on this for a while. Here's a timeline.",
  className,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-clip", className)}
    >
      {/* Static header – visible by default, scrolls away with page (no overlap) */}
      <div className="mb-10 px-0">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm font-normal text-neutral-600 dark:text-neutral-400 md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {/* Two-column layout: left = line + sticky titles, right = content */}
      <div ref={ref} className="relative grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10">
        {/* Vertical line – scroll-driven height, site purple gradient (light purple → purple) */}
        <motion.div
          className="absolute left-[11px] top-0 w-px bg-gradient-to-b from-[rgb(233,213,255)] to-[rgb(168,85,247)] md:left-[15px]"
          style={{ height: heightTransform }}
        />

        {data.map((item, index) => (
          <React.Fragment key={index}>
            {/* Left column: dot + sticky section title */}
            <div className="relative flex flex-col pb-16 md:pb-20">
              <div className="sticky top-28 z-10 flex items-start gap-4 pt-0.5">
                <div className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-400 bg-white dark:border-neutral-500 dark:bg-neutral-900 md:h-7 md:w-7">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-500 dark:bg-neutral-400" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white md:text-lg">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Right column: same title as heading + content */}
            <div className="min-w-0 pb-16 md:pb-20">
              <h3 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white md:text-2xl">
                {item.title}
              </h3>
              <div className="text-neutral-800 dark:text-neutral-200">
                {item.content}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

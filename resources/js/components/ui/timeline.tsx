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
  prefix?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  /** When set, only this many entries show until the user expands. */
  initialVisibleCount?: number;
  variant?: 'light' | 'dark';
}

export const Timeline = ({
  data,
  prefix,
  title = "Changelog from my journey",
  subtitle = "I've been working on this for a while. Here's a timeline.",
  className,
  initialVisibleCount,
  variant = 'dark',
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const collapsedCount =
    initialVisibleCount !== undefined
      ? Math.min(initialVisibleCount, data.length)
      : data.length;
  const isCollapsible = collapsedCount < data.length;
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? data.length : collapsedCount;

  const visibleData = data.slice(0, visibleCount);
  const showToggle = isCollapsible;

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [visibleCount, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const isLight = variant === 'light';

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-clip", className)}
    >
      {/* Static header – visible by default, scrolls away with page (no overlap) */}
      <div className="mb-10 px-0 text-center">
        {prefix && (
          <p className="mb-2 text-sm font-semibold tracking-wide text-brand">
            {prefix}
          </p>
        )}
        <h2
          className={cn(
            'text-3xl font-bold md:text-4xl',
            isLight ? 'text-neutral-900' : 'text-neutral-900 dark:text-white',
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mx-auto mt-3 max-w-2xl text-sm font-normal md:text-base',
              isLight ? 'text-neutral-600' : 'text-neutral-600 dark:text-neutral-400',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Two-column layout: left = line + sticky titles, right = content */}
      <div ref={ref} className="relative grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10">
        {/* Vertical line – scroll-driven height, brand blue gradient */}
        <motion.div
          className="absolute left-[11px] top-0 w-px bg-gradient-to-b from-[rgb(var(--gradient-from))] to-[rgb(var(--gradient-to))] md:left-[15px]"
          style={{ height: heightTransform }}
        />

        {visibleData.map((item, index) => {
          const isLastVisible = index === visibleData.length - 1;
          const entryPb =
            isLastVisible && !expanded ? '' : 'pb-16 md:pb-20';

          return (
          <React.Fragment key={index}>
            {/* Left column: dot + sticky section title */}
            <div className={cn('relative flex flex-col', entryPb)}>
              <div className="sticky top-28 z-10 flex items-start gap-4 pt-0.5">
                <div
                  className={cn(
                    'relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 md:h-7 md:w-7',
                    isLight
                      ? 'border-neutral-300 bg-white'
                      : 'border-neutral-400 bg-white dark:border-neutral-500 dark:bg-neutral-900',
                  )}
                >
                  <div
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      isLight ? 'bg-neutral-400' : 'bg-neutral-500 dark:bg-neutral-400',
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    'text-base font-semibold md:text-lg',
                    isLight ? 'text-neutral-900' : 'text-neutral-900 dark:text-white',
                  )}
                >
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Right column: same title as heading + content */}
            <div className={cn('min-w-0', entryPb)}>
              <h3
                className={cn(
                  'mb-6 text-xl font-semibold md:text-2xl',
                  isLight ? 'text-neutral-900' : 'text-neutral-900 dark:text-white',
                )}
              >
                {item.title}
              </h3>
              <div className={isLight ? 'text-neutral-700' : 'text-neutral-800 dark:text-neutral-200'}>
                {item.content}
              </div>
            </div>
          </React.Fragment>
          );
        })}
      </div>

      {showToggle && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className={cn(
              'rounded-full border px-6 py-3 text-sm font-medium transition-colors',
              isLight
                ? 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50'
                : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800 hover:text-white',
            )}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
    </div>
  );
};

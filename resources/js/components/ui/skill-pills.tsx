'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface SkillPillItem {
    name: string;
    logo: React.ReactNode;
    /** When set, the pill is rendered as a link with expand-on-hover (e.g. for hero social links). */
    href?: string;
}

interface SkillPillsProps {
    items: SkillPillItem[];
    className?: string;
    /** Extra classes applied to each pill (e.g. grayscale hover:grayscale-0 for hero). */
    pillClassName?: string;
}

const PILL_SIZE = 28;

/**
 * Row of small circular logos that expand on hover to show the name (Aceternity minimal-portfolio style).
 * Uses Motion layout animations so the active pill expands and siblings slide smoothly.
 */
export function SkillPills({ items, className, pillClassName }: SkillPillsProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            layout
            className={cn('flex items-center gap-2', className)}
            transition={{ layout: { type: 'spring', stiffness: 400, damping: 35 } }}
        >
            {items.map((item, index) => {
                const isHovered = hoveredIndex === index;
                const pill = (
                    <motion.div
                        key={item.name}
                        layout
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            'flex h-7 shrink-0 items-center overflow-hidden rounded-full border border-neutral-700 bg-neutral-900',
                            item.href ? 'cursor-pointer' : 'cursor-default',
                            pillClassName,
                        )}
                        style={{
                            width: isHovered ? 'auto' : PILL_SIZE,
                            minWidth: PILL_SIZE,
                            paddingRight: isHovered ? 6 : 0,
                        }}
                        transition={{ layout: { type: 'spring', stiffness: 380, damping: 32 } }}
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4 [&>svg]:max-h-4 [&>svg]:max-w-4">
                            {item.logo}
                        </div>
                        {isHovered && (
                            <span className="whitespace-nowrap text-xs text-neutral-300">
                                {item.name}
                            </span>
                        )}
                    </motion.div>
                );
                if (item.href) {
                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block cursor-pointer"
                            aria-label={item.name}
                        >
                            {pill}
                        </a>
                    );
                }
                return pill;
            })}
        </motion.div>
    );
}

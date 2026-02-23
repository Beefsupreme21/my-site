'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface LogoCloudSkill {
    name: string;
    logo: React.ReactNode;
}

interface LogoCloudBlurProps {
    skills: LogoCloudSkill[];
    className?: string;
    /** Blur amount when out of view (px). Default 10. */
    blurAmount?: number;
    /** Stagger delay between items (seconds). Default 0.04. */
    staggerDelay?: number;
}

/**
 * Logo cloud with blur animation: each item is blurred until it scrolls into view,
 * then animates to sharp. No container box — logos and names only.
 */
export function LogoCloudBlur({
    skills,
    className,
    blurAmount = 10,
    staggerDelay = 0.04,
}: LogoCloudBlurProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-3',
                className,
            )}
        >
            {skills.map((skill, index) => (
                <LogoCloudItem
                    key={skill.name}
                    skill={skill}
                    blurAmount={blurAmount}
                    delay={index * staggerDelay}
                />
            ))}
        </div>
    );
}

function LogoCloudItem({
    skill,
    blurAmount,
    delay,
}: {
    skill: LogoCloudSkill;
    blurAmount: number;
    delay: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, margin: '-80px' });
    const isDarkLogo = skill.name === 'GitHub' || skill.name === 'SQL';

    return (
        <motion.div
            ref={ref}
            initial={{
                filter: `blur(${blurAmount}px)`,
                opacity: 0.35,
            }}
            animate={
                isInView
                    ? {
                          filter: 'blur(0px)',
                          opacity: 1,
                      }
                    : {
                          filter: `blur(${blurAmount}px)`,
                          opacity: 0.35,
                      }
            }
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-center justify-center gap-3"
        >
            <div
                className={cn(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center [&>svg]:h-6 [&>svg]:w-6 [&>svg]:object-contain',
                    isDarkLogo && 'text-white',
                )}
            >
                {skill.logo}
            </div>
            <span className="text-sm font-medium text-neutral-200">{skill.name}</span>
        </motion.div>
    );
}

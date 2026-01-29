import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    /**
     * Animation direction: 'up', 'down', 'left', 'right', or 'fade'
     * @default 'up'
     */
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
    /**
     * Distance to animate from (in pixels)
     * @default 50
     */
    distance?: number;
    /**
     * Animation duration in seconds
     * @default 0.6
     */
    duration?: number;
    /**
     * Delay before animation starts (in seconds)
     * @default 0
     */
    delay?: number;
    /**
     * Whether to animate only once or every time it enters view
     * @default true
     */
    once?: boolean;
}

export function ScrollReveal({
    children,
    className,
    direction = 'up',
    distance = 50,
    duration = 0.6,
    delay = 0,
    once = true,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-100px' });

    const getInitialPosition = () => {
        switch (direction) {
            case 'up':
                return { y: distance, x: 0 };
            case 'down':
                return { y: -distance, x: 0 };
            case 'left':
                return { y: 0, x: distance };
            case 'right':
                return { y: 0, x: -distance };
            case 'fade':
                return { y: 0, x: 0 };
            default:
                return { y: distance, x: 0 };
        }
    };

    const initial = getInitialPosition();

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: initial.x,
                y: initial.y,
            }}
            animate={
                isInView
                    ? {
                          opacity: 1,
                          x: 0,
                          y: 0,
                      }
                    : {
                          opacity: 0,
                          x: initial.x,
                          y: initial.y,
                      }
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

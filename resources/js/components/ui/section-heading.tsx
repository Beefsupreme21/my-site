import { cn } from '@/lib/utils';

interface SectionHeadingProps {
    prefix: string;
    title: string;
    subtitle?: string;
    className?: string;
    /** Light sections (#f8f8f6, #f2f2f0) vs dark (#0a0a0a). */
    variant?: 'light' | 'dark';
}

export function SectionHeading({
    prefix,
    title,
    subtitle,
    className,
    variant = 'light',
}: SectionHeadingProps) {
    const isLight = variant === 'light';

    return (
        <div className={cn('mb-12 text-center', className)}>
            <p className="mb-2 text-sm font-semibold tracking-wide text-brand">
                {prefix}
            </p>
            <h2
                className={cn(
                    'text-3xl font-bold lg:text-4xl',
                    isLight ? 'text-neutral-900' : 'text-white',
                )}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={cn(
                        'mx-auto mt-3 max-w-2xl text-sm md:text-base',
                        isLight ? 'text-neutral-600' : 'text-neutral-400',
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}

import { cn } from '@/lib/utils';

/**
 * Simple horizontal/vertical divider. shadcn-style, works alongside Aceternity UI.
 * Use between sections for clear visual separation.
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-neutral-800',
        orientation === 'horizontal' && 'h-px w-full',
        orientation === 'vertical' && 'h-full w-px',
        className
      )}
      {...props}
    />
  );
}

export { Separator };

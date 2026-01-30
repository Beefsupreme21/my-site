import { cn } from "@/lib/utils";

const roundedMap = {
  full: "rounded-full",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

/**
 * Reusable gradient border wrapper. Use on buttons, cards, or any block.
 * Gradient comes from CSS vars (--gradient-from, --gradient-to) in app.css.
 */
export function GradientBorder({
  children,
  className,
  innerClassName,
  /** Border thickness in pixels. Default 1. */
  width = 1,
  /** Corner rounding – use same on buttons, cards, etc. */
  rounded = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  width?: number;
  rounded?: keyof typeof roundedMap;
}) {
  const p = width;
  const roundedClass = roundedMap[rounded];
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-[rgb(var(--gradient-from))] to-[rgb(var(--gradient-to))]",
        roundedClass,
        className
      )}
      style={{ padding: p }}
    >
      <div
        className={cn(
          "h-full w-full bg-[#0a0a0a]",
          roundedClass,
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

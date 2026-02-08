import { cn } from "@/lib/utils";

type Variant = "dots" | "grid" | "grid-small" | "glow";

interface SectionBackgroundProps {
  variant?: Variant;
  /** Shadcn-style radial fade at edges (mask). */
  fade?: boolean;
  className?: string;
}

/**
 * Shadcn/Aceternity grid and dot backgrounds – uses the exact component markup.
 * @see https://ui.aceternity.com/components/grid-and-dot-backgrounds
 */
export function SectionBackground({
  variant = "dots",
  fade = true,
  className,
}: SectionBackgroundProps) {
  if (variant === "glow") {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 z-0", className)}
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 35%, rgba(168, 85, 247, 0.18) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 85%)",
        }}
      />
    );
  }

  const isGrid = variant === "grid" || variant === "grid-small";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      aria-hidden
    >
      {/* Shadcn grid: exact classes from GridBackgroundDemo (dark variant) */}
      {isGrid && (
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)]",
          )}
          style={variant === "grid-small" ? { backgroundSize: "20px 20px" } : undefined}
        />
      )}
      {/* DotBackgroundDemo: 20px grid, purple dots */}
      {variant === "dots" && (
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#a855f7_1px,transparent_1px)]",
          )}
        />
      )}
      {/* Radial gradient for the container to give a faded look – exact Shadcn markup */}
      {fade && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0a0a0a]"
          style={{
            maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
            WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
          }}
        />
      )}
    </div>
  );
}

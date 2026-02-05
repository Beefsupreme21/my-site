"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Lamp-style section header: soft gradient glow behind the content.
 * Use for section titles (e.g. "Kanban", "Build lamps the right way").
 */
export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-neutral-950 px-4 py-6 md:py-10",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[200px] w-[400px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10 w-full text-center">{children}</div>
    </div>
  );
};

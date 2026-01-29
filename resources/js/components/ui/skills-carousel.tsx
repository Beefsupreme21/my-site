import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  logo: React.ReactNode;
}

interface SkillsCarouselProps {
  skills: Skill[];
  className?: string;
}

export function SkillsCarousel({ skills, className }: SkillsCarouselProps) {
  // Duplicate skills multiple times for seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex animate-scroll-skills gap-8">
        {duplicatedSkills.map((skill, index) => {
          const isDarkLogo = skill.name === "GitHub" || skill.name === "SQL";
          return (
            <div
              key={`${skill.name}-${index}`}
              className={cn(
                "flex min-w-[140px] flex-shrink-0 flex-col items-center justify-center gap-2 rounded-lg border p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md",
                isDarkLogo
                  ? "border-neutral-700 bg-neutral-900 dark:border-neutral-700 dark:bg-neutral-900"
                  : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#161615]",
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain",
                  isDarkLogo && "text-white",
                )}
              >
                {skill.logo}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isDarkLogo
                    ? "text-white"
                    : "text-neutral-700 dark:text-neutral-300",
                )}
              >
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  logo: React.ReactNode;
}

interface SkillsListProps {
  skills: Skill[];
  className?: string;
}

/**
 * Two-column list of skills: logo + name per item.
 * Mobile: single column. sm+: two columns side by side.
 */
export function SkillsList({ skills, className }: SkillsListProps) {
  const mid = Math.ceil(skills.length / 2);
  const leftColumn = skills.slice(0, mid);
  const rightColumn = skills.slice(mid);

  const SkillItem = ({ skill }: { skill: Skill }) => {
    const isDarkLogo = skill.name === "GitHub" || skill.name === "SQL";
    return (
      <li className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3 transition-colors hover:border-neutral-700 hover:bg-neutral-800/50">
        <div
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-neutral-800 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:object-contain",
            isDarkLogo && "text-white",
          )}
        >
          {skill.logo}
        </div>
        <span className="text-sm font-medium text-neutral-200">
          {skill.name}
        </span>
      </li>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <ul className="flex flex-col gap-3" aria-label="Skills column 1">
          {leftColumn.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </ul>
        <ul className="flex flex-col gap-3" aria-label="Skills column 2">
          {rightColumn.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </ul>
      </div>
    </div>
  );
}

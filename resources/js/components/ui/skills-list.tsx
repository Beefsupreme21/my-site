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
 * List of skills: logo + name per item.
 * Styled to match the Projects card container; list rows use dividers, no hover.
 * Mobile: 1 column. sm+: 2 columns. lg+: 3 columns.
 */
export function SkillsList({ skills, className }: SkillsListProps) {
  const third = Math.ceil(skills.length / 3);
  const col1 = skills.slice(0, third);
  const col2 = skills.slice(third, third * 2);
  const col3 = skills.slice(third * 2);
  const columns = [col1, col2, col3];

  const SkillItem = ({ skill }: { skill: Skill }) => {
    const isDarkLogo = skill.name === "GitHub" || skill.name === "SQL";
    return (
      <li className="flex items-center gap-3 border-b border-neutral-800/60 py-3 last:border-b-0">
        <div
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800/80 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:object-contain",
            isDarkLogo && "text-white",
          )}
        >
          {skill.logo}
        </div>
        <span className="text-sm font-medium text-neutral-200">{skill.name}</span>
      </li>
    );
  };

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-neutral-800/80 bg-neutral-900/70 px-6 py-8 shadow-[0_0_60px_rgba(0,0,0,0.7)] backdrop-blur-sm md:px-10 md:py-10",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col, i) => (
          <ul key={i} className="flex flex-col" aria-label={`Skills column ${i + 1}`}>
            {col.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

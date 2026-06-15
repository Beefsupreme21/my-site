import { SkillPills, type SkillPillItem } from '@/components/ui/skill-pills';
import { GithubLogo, LinkedInLogo, EmailIcon } from '@/components/logos';

const CONTACT_LINKS: SkillPillItem[] = [
    {
        name: 'GitHub',
        logo: <GithubLogo />,
        href: 'https://github.com/Beefsupreme21',
    },
    {
        name: 'LinkedIn',
        logo: <LinkedInLogo />,
        href: 'https://www.linkedin.com/in/cory-sanda-74769924a/',
    },
    {
        name: 'Email',
        logo: <EmailIcon />,
        href: 'mailto:beefsupreme21@hotmail.com',
    },
];

export function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-[#0a0a0a]">
            <div className="hero-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="relative mx-auto max-w-4xl px-6 py-10 sm:py-12">
                <div className="flex flex-col items-center text-center">
                    <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Cory S.
                    </p>
                    <a
                        href="mailto:beefsupreme21@hotmail.com"
                        className="mt-1.5 text-sm text-brand transition-colors hover:text-brand-mid sm:text-base"
                    >
                        beefsupreme21@hotmail.com
                    </a>
                    <SkillPills
                        className="mt-4 justify-center"
                        pillClassName="text-neutral-400 hover:text-neutral-300 hover:scale-105"
                        items={CONTACT_LINKS}
                    />
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="text-center text-sm text-neutral-500">
                        &copy; {year}
                    </p>
                </div>
            </div>
        </footer>
    );
}

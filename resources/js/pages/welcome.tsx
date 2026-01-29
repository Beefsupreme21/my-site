import { Head, Link } from '@inertiajs/react';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { NoiseBackground } from '@/components/ui/noise-background';
import { BackgroundLines } from '@/components/ui/background-lines';
import { SkillsCarousel } from '@/components/ui/skills-carousel';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import {
  ReactLogo,
  LaravelLogo,
  AlpineLogo,
  TailwindLogo,
  VueLogo,
  LivewireLogo,
  CssLogo,
  SqlLogo,
  GithubLogo,
  LinkedInLogo,
} from '@/components/logos';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                {/* Hero Section */}
                <BackgroundLines 
                    className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-6 py-20 lg:py-32"
                    svgOptions={{
                        delayMultiplier: 0.1, // Reduced from 0.2 for quicker spawning
                        duration: 18, // Slightly faster animation
                    }}
                >
                    <div className="mx-auto w-full max-w-4xl text-center">
                        <div className="py-10 text-center lg:py-16">
                            <EncryptedText
                                text="Welcome to my site"
                                className="text-4xl font-bold lg:text-6xl xl:text-7xl"
                                encryptedClassName="text-neutral-500"
                                revealedClassName="dark:text-white text-black"
                                revealDelayMs={50}
                            />
                        </div>
                        <div className="flex justify-center">
                            <NoiseBackground
                                containerClassName="w-fit p-2 rounded-full mx-auto"
                                gradientColors={[
                                    "rgb(255, 100, 150)",
                                    "rgb(100, 150, 255)",
                                    "rgb(255, 200, 100)",
                                ]}
                            >
                                <button className="h-full w-full cursor-pointer rounded-full bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]">
                                    See Projects
                                </button>
                            </NoiseBackground>
                        </div>
                    </div>
                </BackgroundLines>

                {/* About Me Section (card) */}
                <section className="relative border-t border-neutral-900 bg-[#0a0a0a] px-6 py-20 dark:border-neutral-900 dark:bg-[#0a0a0a] lg:py-32">
                    {/* Laravel Reverb style gradient - radial gradients at top/bottom with subtle linear overlay */}
                    <div className="absolute inset-0 bg-gradient-section pointer-events-none" />
                    {/* Subtle top border gradient */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/60 to-transparent" />
                    <div className="relative mx-auto max-w-5xl z-10">
                        <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/70 px-6 py-10 shadow-[0_0_60px_rgba(0,0,0,0.7)] backdrop-blur-sm md:px-10 md:py-12">
                            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-8">
                                <ScrollReveal direction="right" delay={0.2}>
                                    <div className="flex-shrink-0">
                                        <div className="h-56 w-56 overflow-hidden rounded-full shadow-lg ring-4 ring-neutral-800 lg:h-64 lg:w-64">
                                            <img
                                                src="/profile.png"
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </ScrollReveal>
                                <ScrollReveal direction="left" delay={0.3}>
                                    <div className="flex-1 space-y-5 text-center text-lg leading-relaxed text-neutral-300 lg:text-left">
                                        <p className="text-xl font-semibold text-white">
                                            Hey, I&apos;m Cory.
                                        </p>
                                        <p>
                                            Welcome to my site! I&apos;m a Laravel developer who enjoys building things with the TALL stack:
                                            Tailwind, Alpine, Laravel, and Livewire.
                                        </p>
                                        <p>
                                            I use this site to share projects I've built for fun and learning. Feel free to try them out
                                            below!
                                        </p>
                                        <div className="flex items-center justify-center gap-4 lg:justify-start">
                                            <a
                                                href="https://github.com/yourusername"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800"
                                                aria-label="GitHub"
                                            >
                                                <GithubLogo />
                                            </a>
                                            <a
                                                href="https://linkedin.com/in/yourusername"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-[#0077b5] transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800"
                                                aria-label="LinkedIn"
                                            >
                                                <LinkedInLogo />
                                            </a>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills/Tools Section */}
                <section className="relative border-t border-neutral-900 bg-[#0a0a0a] px-6 py-20 dark:border-neutral-900 dark:bg-[#0a0a0a] lg:py-32">
                    {/* Laravel Reverb style gradient - radial gradients at top/bottom with subtle linear overlay */}
                    <div className="absolute inset-0 bg-gradient-section pointer-events-none" />
                    {/* Subtle top border gradient */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/60 to-transparent" />
                    <div className="relative mx-auto max-w-6xl z-10">
                        <ScrollReveal direction="up" delay={0.1}>
                            <h2 className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl">
                                Skills & Tools
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.2}>
                            <SkillsCarousel
                                skills={[
                                    { name: "React", logo: <ReactLogo /> },
                                    { name: "Laravel", logo: <LaravelLogo /> },
                                    { name: "Alpine.js", logo: <AlpineLogo /> },
                                    { name: "Tailwind CSS", logo: <TailwindLogo /> },
                                    { name: "Vue.js", logo: <VueLogo /> },
                                    { name: "Livewire", logo: <LivewireLogo /> },
                                    { name: "CSS", logo: <CssLogo /> },
                                    { name: "SQL", logo: <SqlLogo /> },
                                    { name: "GitHub", logo: <GithubLogo /> },
                                ]}
                            />
                        </ScrollReveal>
                    </div>
                </section>

                {/* Projects Section (card) */}
                <section className="relative border-t border-neutral-900 bg-[#0a0a0a] px-6 py-20 dark:border-neutral-900 dark:bg-[#0a0a0a] lg:py-32">
                    {/* Laravel Reverb style gradient - radial gradients at top/bottom with subtle linear overlay */}
                    <div className="absolute inset-0 bg-gradient-section pointer-events-none" />
                    {/* Subtle top border gradient */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800/60 to-transparent" />
                    <div className="relative mx-auto max-w-6xl z-10">
                        <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/70 px-6 py-10 shadow-[0_0_60px_rgba(0,0,0,0.7)] backdrop-blur-sm md:px-10 md:py-12">
                            <ScrollReveal direction="up" delay={0.1}>
                                <h2 className="mb-8 text-3xl font-bold text-white lg:mb-10 lg:text-4xl">
                                    Projects
                                </h2>
                            </ScrollReveal>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {[
                                    {
                                        id: 1,
                                        title: "Wordle",
                                        description:
                                            "A word guessing game built with React. Guess the word in 6 tries!",
                                    },
                                    {
                                        id: 2,
                                        title: "Racing Game",
                                        description:
                                            "An interactive 3D racing game built with Three.js and React Three Fiber.",
                                    },
                                    {
                                        id: 3,
                                        title: "Memory Game",
                                        description:
                                            "A card matching memory game. Test your memory by finding matching pairs!",
                                    },
                                ].map((project, index) => (
                                    <ScrollReveal
                                        key={project.id}
                                        direction="up"
                                        delay={0.2 + index * 0.1}
                                        className="h-full"
                                    >
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="group block h-full rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-lg transition-all hover:scale-[1.03] hover:border-neutral-700 hover:shadow-xl"
                                        >
                                            <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-neutral-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-neutral-400">
                                                {project.description}
                                            </p>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

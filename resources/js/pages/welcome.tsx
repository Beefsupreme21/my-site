import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { NoiseBackground } from '@/components/ui/noise-background';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Separator } from '@/components/ui/separator';
import { SkillsList } from '@/components/ui/skills-list';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Timeline } from '@/components/ui/timeline';
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
  EmailIcon,
} from '@/components/logos';

const PROJECTS = [
    {
        id: 1,
        title: 'Kanban',
        description:
            'A simple Kanban board. Add tasks and drag them between columns.',
        image: '/images/wordle.png',
    },
    {
        id: 2,
        title: 'Racing Game',
        description:
            'An interactive 3D racing game built with Three.js and React Three Fiber.',
        image: '/images/kanban.png',
    },
    {
        id: 3,
        title: 'Wordle',
        description:
            'Guess the 5-letter word in 6 tries. Green = right spot, yellow = wrong spot.',
        image: '/images/racing-game.png',
    },
    {
        id: 4,
        title: 'Snake',
        description:
            'Classic Snake. Use arrow keys to move, eat the yellow dots to grow. Don\'t hit the walls or yourself.',
        image: '/images/kanban.png',
    },
    {
        id: 5,
        title: 'Breakout',
        description:
            'Classic block breaker. Move the paddle with mouse or arrow keys, press Space to launch. Break all bricks to win.',
        image: '/images/wordle.png',
    },
    {
        id: 6,
        title: 'Project Six',
        description:
            'Another project demo. Replace with your own description and demo component.',
        image: '/images/racing-game.png',
    },
];

const INITIAL_PROJECTS_COUNT = 3;

export default function Welcome() {
    const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS_COUNT);
    const visibleProjects = PROJECTS.slice(0, visibleCount);
    const hasMore = visibleCount < PROJECTS.length;

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <main className="flex flex-col">
                {/* Hero Section – Background Beams */}
                <BackgroundBeamsWithCollision
                    className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-6 py-20 lg:py-32"
                >
                    <div className="mx-auto w-full max-w-4xl text-center">
                        {/* Profile, intro, and social links */}
                        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
                            <ScrollReveal direction="right" delay={0.2}>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-neutral-800 lg:h-56 lg:w-56">
                                        <img
                                            src="/profile.png"
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex items-center justify-center gap-3">
                                        <a
                                            href="https://github.com/Beefsupreme21"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 grayscale transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4"
                                            aria-label="GitHub"
                                        >
                                            <GithubLogo />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/cory-sanda-74769924a/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 grayscale transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4"
                                            aria-label="LinkedIn"
                                        >
                                            <LinkedInLogo />
                                        </a>
                                        <a
                                            href="mailto:beefsupreme21@hotmail.com"
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 grayscale transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4"
                                            aria-label="Email"
                                        >
                                            <EmailIcon />
                                        </a>
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="left" delay={0.3}>
                                <div className="max-w-xl space-y-4 text-center text-lg leading-relaxed text-neutral-300 lg:text-left">
                                    <p className="text-3xl font-bold lg:text-4xl">
                                        <EncryptedText
                                            text="Hey, I'm Cory."
                                            className="inline"
                                            encryptedClassName="text-neutral-500"
                                            revealedClassName="text-white dark:text-white"
                                            revealDelayMs={120}
                                            flipDelayMs={80}
                                        />
                                    </p>
                                    <p>
                                        Welcome to my site! I&apos;m a Laravel developer who enjoys building things with the TALL stack:
                                        Tailwind, Alpine, Laravel, and Livewire.
                                    </p>
                                    <p>
                                        I use this site to share projects I&apos;ve built for fun and learning. Feel free to try them out
                                        below!
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* CTA – Aceternity NoiseBackground (animated gradients + noise) with our light purple → purple palette */}
                        <div className="mt-12 flex justify-center">
                            <NoiseBackground
                                containerClassName="w-fit rounded-full p-[6px]"
                                gradientColors={[
                                    "rgb(233, 213, 255)", // purple-200
                                    "rgb(216, 180, 254)", // purple-300
                                    "rgb(168, 85, 247)",  // purple-500
                                ]}
                                noiseIntensity={0.25}
                                speed={0.12}
                            >
                                <Link
                                    href="#projects"
                                    className="block h-full w-full rounded-full bg-[#0a0a0a] px-6 py-3 text-center font-medium text-white transition-all duration-100 hover:bg-neutral-900/90 hover:text-purple-200 active:scale-[0.98]"
                                >
                                    See Projects
                                </Link>
                            </NoiseBackground>
                        </div>
                    </div>
                </BackgroundBeamsWithCollision>

                <Separator className="bg-neutral-800" />
                {/* Skills & Tools */}
                <section
                    id="skills"
                    className="relative bg-[#0a0a0a] px-6 py-16 lg:py-24"
                >
                    <div className="relative mx-auto max-w-6xl z-10">
                        <ScrollReveal direction="up" delay={0.1}>
                            <h2 className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl">
                                Skills & Tools
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.2}>
                            <SkillsList
                                skills={[
                                    { name: "React", logo: <ReactLogo /> },
                                    { name: "Vue", logo: <VueLogo /> },
                                    { name: "Laravel", logo: <LaravelLogo /> },
                                    { name: "Tailwind", logo: <TailwindLogo /> },
                                    { name: "CSS", logo: <CssLogo /> },
                                    { name: "Alpine.js", logo: <AlpineLogo /> },
                                    { name: "Livewire", logo: <LivewireLogo /> },
                                    { name: "SQL", logo: <SqlLogo /> },
                                    { name: "GitHub", logo: <GithubLogo /> },
                                ]}
                            />
                        </ScrollReveal>
                    </div>
                </section>

                <Separator className="bg-neutral-800" />
                {/* Projects */}
                <section id="projects" className="relative bg-[#0a0a0a] px-6 py-16 dark:bg-[#0a0a0a] lg:py-24">
                    <DottedGlowBackground
                        className="pointer-events-none z-0 mask-radial-to-90% mask-radial-at-center"
                        opacity={1}
                        gap={10}
                        radius={1.6}
                        color="rgba(168, 85, 247, 0.5)"
                        glowColor="rgba(168, 85, 247, 0.85)"
                        backgroundOpacity={0}
                        speedMin={0.3}
                        speedMax={1.6}
                        speedScale={1}
                    />
                    <div className="relative mx-auto max-w-6xl z-10">
                        <ScrollReveal direction="up" delay={0.1}>
                            <h2 className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl">
                                Projects
                            </h2>
                        </ScrollReveal>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {visibleProjects.map((project, index) => (
                                <ScrollReveal
                                    key={project.id}
                                    direction="up"
                                    delay={0.2 + index * 0.1}
                                    className="h-full"
                                >
                                    <div className="relative h-full rounded-2xl border border-neutral-800 p-2 transition-all hover:scale-[1.03] md:rounded-3xl md:p-3">
                                        <GlowingEffect
                                            spread={40}
                                            glow={false}
                                            disabled={false}
                                            proximity={64}
                                            inactiveZone={0.01}
                                            borderWidth={1}
                                        />
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="group relative block h-full overflow-hidden rounded-xl bg-neutral-900 shadow-lg transition-shadow hover:shadow-xl"
                                        >
                                            <div className="relative aspect-video w-full overflow-hidden bg-neutral-800">
                                                <img
                                                    src={project.image}
                                                    alt={`${project.title} screenshot`}
                                                    className="h-full w-full object-cover object-center"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                        const fallback = e.currentTarget.nextElementSibling;
                                                        if (fallback) fallback.classList.remove("hidden");
                                                    }}
                                                />
                                                <span className="absolute inset-0 hidden flex items-center justify-center text-sm text-neutral-500">
                                                    Image
                                                </span>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-neutral-300">
                                                    {project.title}
                                                </h3>
                                                <p className="text-neutral-400">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                        {hasMore && (
                            <ScrollReveal direction="up" delay={0.2}>
                                <div className="mt-10 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setVisibleCount((c) =>
                                                Math.min(c + 3, PROJECTS.length),
                                            )
                                        }
                                        className="rounded-full border border-neutral-700 bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:bg-neutral-800 hover:text-white"
                                    >
                                        See more
                                    </button>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </section>

                <Separator className="bg-neutral-800" />
                {/* More – placeholder for future content */}
                <section
                    id="more"
                    className="relative bg-[#0a0a0a] px-6 py-16 lg:py-24"
                >
                    <div className="relative mx-auto max-w-6xl z-10">
                        <ScrollReveal direction="up" delay={0.1}>
                            <h2 className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl">
                                More
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.2}>
                            <p className="text-center text-neutral-400">
                                Add content here — e.g. testimonials, blog links, or another feature block.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                <Separator className="bg-neutral-800" />
                {/* Timeline */}
                <section className="relative bg-[#0a0a0a] px-6 py-16 dark:bg-[#0a0a0a] lg:py-24">
                    <DottedGlowBackground
                        className="pointer-events-none z-0 mask-radial-to-90% mask-radial-at-center"
                        opacity={1}
                        gap={10}
                        radius={1.6}
                        color="rgba(168, 85, 247, 0.5)"
                        glowColor="rgba(168, 85, 247, 0.85)"
                        backgroundOpacity={0}
                        speedMin={0.3}
                        speedMax={1.6}
                        speedScale={1}
                    />
                    <div className="relative mx-auto max-w-3xl z-10">
                        <Timeline
                            title="Changelog from my journey"
                            subtitle="2022 – 2026. Here's a timeline of what I've been up to."
                            data={[
                                {
                                    title: '2026',
                                    content: (
                                        <div>
                                            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                                                Placeholder for 2026. Add your own copy and images here.
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex h-20 w-full items-center justify-center rounded-lg bg-neutral-800 text-xs text-neutral-500 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                                                    >
                                                        Image
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    title: '2025',
                                    content: (
                                        <div>
                                            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                                                Placeholder for 2025. Add your own copy and images here.
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex h-20 w-full items-center justify-center rounded-lg bg-neutral-800 text-xs text-neutral-500 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                                                    >
                                                        Image
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    title: '2024',
                                    content: (
                                        <div>
                                            <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                                                Deployed a few things this year. Placeholder checklist below.
                                            </p>
                                            <div className="mb-8">
                                                <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                                                    ✅ Item one
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                                                    ✅ Item two
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                                                    ✅ Item three
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                                                    ✅ Item four
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex h-20 w-full items-center justify-center rounded-lg bg-neutral-800 text-xs text-neutral-500 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                                                    >
                                                        Image
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    title: '2023',
                                    content: (
                                        <div>
                                            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                                                Placeholder for 2023. When you see content this big, you can add more paragraphs and a grid of images.
                                            </p>
                                            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                                                Replace this with your own milestones and project screenshots.
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex h-20 w-full items-center justify-center rounded-lg bg-neutral-800 text-xs text-neutral-500 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                                                    >
                                                        Image
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    title: '2022',
                                    content: (
                                        <div>
                                            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                                                Placeholder for 2022. Add your own copy and images here.
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex h-20 w-full items-center justify-center rounded-lg bg-neutral-800 text-xs text-neutral-500 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                                                    >
                                                        Image
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </section>
                </main>
            </div>
        </>
    );
}

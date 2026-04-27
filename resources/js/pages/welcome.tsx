import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { NoiseBackground } from '@/components/ui/noise-background';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Separator } from '@/components/ui/separator';
import { LogoCloudBlur } from '@/components/ui/logo-cloud-blur';
import { SkillPills } from '@/components/ui/skill-pills';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Timeline } from '@/components/ui/timeline';
import {
  ReactLogo,
  ThreeJsLogo,
  LaravelLogo,
  AlpineLogo,
  TailwindLogo,
  JsLogo,
  VueLogo,
  LivewireLogo,
  CssLogo,
  SqlLogo,
  GithubLogo,
  LinkedInLogo,
  EmailIcon,
  GlobeIcon,
} from '@/components/logos';

const PROJECTS = [
    {
        id: 2,
        title: 'Racing Game',
        description:
            'An interactive 3D racing game built with Three.js and React Three Fiber.',
        image: '/images/racing-game.png',
    },
    {
        id: 1,
        title: 'Kanban',
        description:
            'A simple Kanban board. Add tasks and drag them between columns.',
        image: '/images/kanban.png',
    },
    {
        id: 5,
        title: 'Multiplayer Game',
        description:
            'Realtime multiplayer game prototype powered by Laravel Reverb.',
        image: '/images/cube.png',
        link: '/projects/cube2/lobby',
    },
    {
        id: 3,
        title: 'Wordle',
        description:
            'Guess the 5-letter word in 6 tries. Green = right spot, yellow = wrong spot.',
        image: '/images/wordle.png',
    },
    {
        id: 4,
        title: 'Snake',
        description:
            'Classic Snake. Use arrow keys to move, eat the yellow dots to grow. Don\'t hit the walls or yourself.',
        image: '/images/snake.png',
    },
    {
        id: 6,
        title: 'BlackJack',
        description:
            'Classic Blackjack. Get as close to 21 as you can without going over. Beat the dealer.',
        image: '/images/poker.png',
    },
];

const INITIAL_PROJECTS_COUNT = 3;

const SHOW_TIMELINE = true;

type Lightbox = { src: string; alt: string; description: string } | null;

export default function Welcome() {
    const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS_COUNT);
    const [lightbox, setLightbox] = useState<Lightbox>(null);
    const visibleProjects = PROJECTS.slice(0, visibleCount);
    const hasMore = visibleCount < PROJECTS.length;

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox(null);
        };
        if (lightbox) {
            document.addEventListener('keydown', onKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [lightbox]);

    return (
        <>
            <Head title="Welcome" />
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image view"
                >
                    <div
                        className="relative max-h-[90vh] max-w-4xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setLightbox(null)}
                            className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <img
                            src={lightbox.src}
                            alt={lightbox.alt}
                            className="max-h-[85vh] w-auto rounded-lg object-contain"
                        />
                        {lightbox.description && (
                            <p className="mt-3 text-center text-sm text-neutral-300">
                                {lightbox.description}
                            </p>
                        )}
                    </div>
                </div>
            )}
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
                                    <SkillPills
                                        pillClassName="text-neutral-400 hover:text-neutral-300 hover:scale-105"
                                        items={[
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
                                        ]}
                                    />
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
                            <h2 className="mb-2 text-center text-3xl font-bold text-white lg:text-4xl">
                                Skills & Tools
                            </h2>
                            <p className="mb-12 text-center text-sm text-neutral-400 md:text-base">
                                Technologies I use to build things.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.2}>
                            <LogoCloudBlur
                                skills={[
                                    { name: 'React', logo: <ReactLogo /> },
                                    { name: 'Vue', logo: <VueLogo /> },
                                    { name: 'Laravel', logo: <LaravelLogo /> },
                                    { name: 'Tailwind', logo: <TailwindLogo /> },
                                    { name: 'CSS', logo: <CssLogo /> },
                                    { name: 'Alpine.js', logo: <AlpineLogo /> },
                                    { name: 'Livewire', logo: <LivewireLogo /> },
                                    { name: 'SQL', logo: <SqlLogo /> },
                                ]}
                                blurAmount={12}
                                staggerDelay={0.05}
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
                                            href={'link' in project && project.link ? project.link : `/projects/${project.id}`}
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
                                    <div className="relative rounded-full border border-neutral-800 p-2 transition-all hover:scale-[1.03]">
                                        <GlowingEffect
                                            spread={40}
                                            glow={false}
                                            disabled={false}
                                            proximity={64}
                                            inactiveZone={0.01}
                                            borderWidth={1}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setVisibleCount((c) =>
                                                    Math.min(c + 3, PROJECTS.length),
                                                )
                                            }
                                            className="relative rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                                        >
                                            See more
                                        </button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </section>

                {SHOW_TIMELINE && (
                    <>
                        <Separator className="bg-neutral-800" />
                        {/* Timeline */}
                        <section className="relative bg-[#0a0a0a] px-6 py-16 dark:bg-[#0a0a0a] lg:py-24">
                            <div className="relative mx-auto max-w-3xl z-10">
                                <Timeline
                            title="My Dev Journey"
                            subtitle="2022 – 2026. Here's a timeline of what I've been up to."
                            data={[
                                {
                                    title: '2026',
                                    content: (
                                        <div className="space-y-8">
                                            {[
                                                {
                                                    src: '/images/racing-game.png',
                                                    alt: 'Racing Game',
                                                    description:
                                                        'Racing Game. An interactive 3D racing game built with Three.js and React Three Fiber. React, Three.js.',
                                                    title: 'Racing Game',
                                                    sentence:
                                                        'An interactive 3D racing game built with Three.js and React Three Fiber.',
                                                    tools: [
                                                        { name: 'React', logo: <ReactLogo /> },
                                                        { name: 'Three.js', logo: <ThreeJsLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/hockey.png',
                                                    alt: 'Hockey',
                                                    description:
                                                        'Hockey. A custom built site for a hockey agency. Laravel, Tailwind.',
                                                    title: 'Hockey',
                                                    sentence:
                                                        'A custom built site for a hockey agency.',
                                                    tools: [
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                    ],
                                                },
                                            ].map((entry) => (
                                                <div
                                                    key={entry.src}
                                                    className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start md:gap-8"
                                                >
                                                    <div className="min-w-0 order-2 md:order-1">
                                                        {'title' in entry && entry.title && (
                                                            <h3 className="text-sm font-semibold text-white md:text-base">
                                                                {entry.title}
                                                            </h3>
                                                        )}
                                                        <p
                                                            className={cn(
                                                                'text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200',
                                                                'title' in entry && entry.title && 'mt-2',
                                                            )}
                                                        >
                                                            {entry.sentence}
                                                        </p>
                                                        <SkillPills
                                                            className="mt-2"
                                                            items={entry.tools}
                                                        />
                                                    </div>
                                                    <img
                                                        src={entry.src}
                                                        alt={entry.alt}
                                                        className="h-auto max-w-full cursor-pointer justify-self-end rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:opacity-95 md:max-h-80 md:w-72 order-1 md:order-2"
                                                        onClick={() =>
                                                            setLightbox({
                                                                src: entry.src,
                                                                alt: entry.alt,
                                                                description: entry.description,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    title: '2025',
                                    content: (
                                        <div className="space-y-8">
                                            {[
                                                {
                                                    src: '/images/bufferedindex.png',
                                                    alt: 'Buffered Index',
                                                    description:
                                                        'Buffered Index. A splash page landing page. Laravel, Tailwind.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Buffered Index{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'Visit site',
                                                                        logo: <GlobeIcon />,
                                                                        href: 'https://marketing.gradientfinancialgroup.com/buffered-index-portfolio-1',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'Just another splash page landing page.',
                                                    tools: [
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/gradientadvisors.png',
                                                    alt: 'Gradient Advisors',
                                                    description:
                                                        'Gradient Advisors. A marketing site for financial professionals. Laravel, Tailwind.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Gradient Advisors{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'Visit site',
                                                                        logo: <GlobeIcon />,
                                                                        href: 'https://gradientadvisors.com/',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'A marketing site for financial professionals built with Laravel and Tailwind.',
                                                    tools: [
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/gigrid.png',
                                                    alt: 'Gradient Investments',
                                                    description:
                                                        'Gradient Investments. A marketing tool for financial advisors. Vue, Tailwind.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Gradient Investments{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'Visit site',
                                                                        logo: <GlobeIcon />,
                                                                        href: 'https://gi-grid.konnexme.com/#/a-firm-focused-on-growth',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'A marketing tool for financial advisors built with Vue and Tailwind.',
                                                    tools: [
                                                        { name: 'Vue', logo: <VueLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                    ],
                                                },
                                            ].map((entry) => (
                                                <div
                                                    key={entry.src}
                                                    className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start md:gap-8"
                                                >
                                                    <div className="min-w-0 order-2 md:order-1">
                                                        {'title' in entry && entry.title && (
                                                            <h3 className="text-sm font-semibold text-white md:text-base">
                                                                {entry.title}
                                                            </h3>
                                                        )}
                                                        <p
                                                            className={cn(
                                                                'text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200',
                                                                'title' in entry && entry.title && 'mt-2',
                                                            )}
                                                        >
                                                            {entry.sentence}
                                                        </p>
                                                        <SkillPills
                                                            className="mt-2"
                                                            items={entry.tools}
                                                        />
                                                    </div>
                                                    <img
                                                        src={entry.src}
                                                        alt={entry.alt}
                                                        className="h-auto max-w-full cursor-pointer justify-self-end rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:opacity-95 md:max-h-80 md:w-72 order-1 md:order-2"
                                                        onClick={() =>
                                                            setLightbox({
                                                                src: entry.src,
                                                                alt: entry.alt,
                                                                description: entry.description,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    title: '2024',
                                    content: (
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:gap-8">
                                            <div>
                                                <h3 className="text-base font-semibold text-white md:text-lg">
                                                    <span className="inline-flex items-center gap-2">
                                                        Comra{' '}
                                                        <SkillPills
                                                            items={[
                                                                {
                                                                    name: 'Visit site',
                                                                    logo: <GlobeIcon />,
                                                                    href: 'https://thefinancialhq.com/comra',
                                                                },
                                                            ]}
                                                            className="inline-flex"
                                                        />
                                                    </span>
                                                </h3>
                                                <p className="mt-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                                                    The &quot;Color of Money Risk Analysis&quot; was another financial template. It
                                                    featured a 13-question dynamic survey with a calculated score at the end.
                                                </p>
                                                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                    Tools used
                                                </p>
                                                <SkillPills
                                                    className="mt-1.5"
                                                    items={[
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                        { name: 'Alpine.js', logo: <AlpineLogo /> },
                                                    ]}
                                                />
                                            </div>
                                            <div className="flex flex-col items-end gap-4">
                                                <img
                                                    src="/images/comra1.png"
                                                    alt="Comra 1"
                                                    className="h-auto max-w-full cursor-pointer rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:opacity-95 md:max-h-80 md:w-72"
                                                    onClick={() =>
                                                        setLightbox({
                                                            src: '/images/comra1.png',
                                                            alt: 'Comra 1',
                                                            description: 'Comra. Laravel, Tailwind, Alpine.js.',
                                                        })
                                                    }
                                                />
                                                <img
                                                    src="/images/comra2.png"
                                                    alt="Comra 2"
                                                    className="h-auto max-w-full cursor-pointer rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:opacity-95 md:max-h-80 md:w-72"
                                                    onClick={() =>
                                                        setLightbox({
                                                            src: '/images/comra2.png',
                                                            alt: 'Comra 2',
                                                            description: 'Comra. Laravel, Tailwind, Alpine.js.',
                                                        })
                                                    }
                                                />
                                                <img
                                                    src="/images/comra3.png"
                                                    alt="Comra 3"
                                                    className="h-auto max-w-full cursor-pointer rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:opacity-95 md:max-h-80 md:w-72"
                                                    onClick={() =>
                                                        setLightbox({
                                                            src: '/images/comra3.png',
                                                            alt: 'Comra 3',
                                                            description: 'Comra. Laravel, Tailwind, Alpine.js.',
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    title: '2023',
                                    content: (
                                        <div className="space-y-8">
                                            {[
                                                {
                                                    src: '/images/pagelab.png',
                                                    alt: 'PageLab',
                                                    description: 'A page builder where you piece together customizable heroes, content sections, and more to build a site quickly.',
                                                    title: 'PageLab',
                                                    sentence:
                                                        'A page builder where you piece together customizable hero blocks, content sections, and more to build a site quickly.',
                                                    tools: [
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                        { name: 'Alpine.js', logo: <AlpineLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/tech.png',
                                                    alt: 'Tech',
                                                    description: 'A financial advisor template with a working form.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Financial Advisor Template{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'Visit site',
                                                                        logo: <GlobeIcon />,
                                                                        href: 'https://thefinancialhq.com/gi3',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence: 'A financial advisor template with a working form.',
                                                    tools: [
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                        { name: 'Alpine.js', logo: <AlpineLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/retirement.png',
                                                    alt: 'Retirement',
                                                    description: 'Another financial advisor template geared towards retirement.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Retirement Template{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'Visit site',
                                                                        logo: <GlobeIcon />,
                                                                        href: 'https://thefinancialhq.com/giba',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'Another financial advisor template geared towards retirement.',
                                                    tools: [
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                        { name: 'Alpine.js', logo: <AlpineLogo /> },
                                                    ],
                                                },
                                            ].map((entry) => (
                                                <div
                                                    key={entry.src}
                                                    className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start md:gap-8"
                                                >
                                                    <div className="min-w-0 order-2 md:order-1">
                                                        {'title' in entry && entry.title && (
                                                            <h3 className="text-sm font-semibold text-white md:text-base">
                                                                {entry.title}
                                                            </h3>
                                                        )}
                                                        <p className={cn('text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200', 'title' in entry && entry.title && 'mt-2')}>
                                                            {entry.sentence}
                                                        </p>
                                                        <SkillPills
                                                            className="mt-2"
                                                            items={entry.tools}
                                                        />
                                                    </div>
                                                    <img
                                                        src={entry.src}
                                                        alt={entry.alt}
                                                        className="h-auto max-w-full cursor-pointer justify-self-end rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:opacity-95 md:max-h-80 md:w-72 order-1 md:order-2"
                                                        onClick={() =>
                                                            setLightbox({
                                                                src: entry.src,
                                                                alt: entry.alt,
                                                                description: entry.description,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ),
                                },
                                {
                                    title: '2022',
                                    content: (
                                        <div className="space-y-8">
                                            {[
                                                {
                                                    src: '/images/personalsite.png',
                                                    alt: 'Personal site',
                                                    description: 'Personal portfolio for showcasing projects.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Personal Portfolio{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'GitHub',
                                                                        logo: <GithubLogo />,
                                                                        href: 'https://github.com/Beefsupreme21/personal-cloud',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'Made a personal site to show my projects and got it live easily with Laravel Cloud.',
                                                    tools: [
                                                        { name: 'Alpine.js', logo: <AlpineLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/hangman2.png',
                                                    alt: 'Wheel of Fortune',
                                                    description: 'More Alpine and games practice. Ended up making hangman.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Wheel of Fortune{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'GitHub',
                                                                        logo: <GithubLogo />,
                                                                        href: 'https://github.com/Beefsupreme21/personal-cloud/blob/main/resources/views/games/wheel-of-fortune.blade.php',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'More Alpine / games practice. Tried to build Wheel of Fortune, realized I\'d never actually watched the show. So I made hangman instead.',
                                                    tools: [
                                                        { name: 'Alpine.js', logo: <AlpineLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/horseracing.png',
                                                    alt: 'Horse racing',
                                                    description: 'Horse racing game from my early experiments.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Horse Racing Game{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'GitHub',
                                                                        logo: <GithubLogo />,
                                                                        href: 'https://github.com/Beefsupreme21/personal-cloud/blob/main/resources/views/games/horse-racing.blade.php',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'Next I learned Alpine well and started making games — a horse racing game where you can bet on horses as they hobble-bobble across the screen.',
                                                    tools: [
                                                        { name: 'Alpine.js', logo: <AlpineLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                    ],
                                                },
                                                {
                                                    src: '/images/twitter.png',
                                                    alt: 'Twitter clone',
                                                    description: 'Twitter-style clone built while learning Laravel.',
                                                    title: (
                                                        <span className="inline-flex items-center gap-2">
                                                            Twitter Clone{' '}
                                                            <SkillPills
                                                                items={[
                                                                    {
                                                                        name: 'GitHub',
                                                                        logo: <GithubLogo />,
                                                                        href: 'https://github.com/Beefsupreme21/Twitter-Clone',
                                                                    },
                                                                ]}
                                                                className="inline-flex"
                                                            />
                                                        </span>
                                                    ),
                                                    sentence:
                                                        'Started learning with YouTube and Laracasts. Followed a Laracasts tutorial and then turned it into a Twitter clone to practice my CSS.',
                                                    tools: [
                                                        { name: 'Laravel', logo: <LaravelLogo /> },
                                                        { name: 'Tailwind', logo: <TailwindLogo /> },
                                                    ],
                                                },
                                            ].map((entry) => (
                                                <div
                                                    key={entry.src}
                                                    className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start md:gap-8"
                                                >
                                                    <div className="min-w-0 order-2 md:order-1">
                                                        {'title' in entry && entry.title && (
                                                            <h3 className="text-sm font-semibold text-white md:text-base">
                                                                {entry.title}
                                                            </h3>
                                                        )}
                                                        <p className={cn('text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200', 'title' in entry && entry.title && 'mt-2')}>
                                                            {entry.sentence}
                                                        </p>
                                                        <SkillPills
                                                            className="mt-2"
                                                            items={entry.tools}
                                                        />
                                                    </div>
                                                    <img
                                                        src={entry.src}
                                                        alt={entry.alt}
                                                        className="h-auto max-w-full cursor-pointer justify-self-end rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hover:opacity-95 md:max-h-80 md:w-72 order-1 md:order-2"
                                                        onClick={() =>
                                                            setLightbox({
                                                                src: entry.src,
                                                                alt: entry.alt,
                                                                description: entry.description,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ),
                                },
                            ]}
                                />
                            </div>
                        </section>
                    </>
                )}
                </main>
            </div>
        </>
    );
}

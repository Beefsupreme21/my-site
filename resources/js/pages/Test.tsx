import { Head, Link } from '@inertiajs/react';
import { WarpStarfield } from '@/components/ui/warp-starfield';
import { SkyWithClouds } from '@/components/ui/sky-with-clouds';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { NoiseBackground } from '@/components/ui/noise-background';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { GithubLogo, LinkedInLogo, EmailIcon } from '@/components/logos';
import { useTheme } from '@/hooks/use-theme';

export default function Test() {
    const { isDark } = useTheme();

    return (
        <>
            <Head title="Test" />
            <ThemeToggle />
            <div className="relative min-h-screen">
                {/* Day/night background: space (dark) or sky + clouds (light) */}
                <div className="fixed inset-0 -z-10">
                    {isDark ? (
                        <>
                            <div className="absolute inset-0 bg-[#0a0a0a]" />
                            <WarpStarfield
                                starCount={450}
                                minSpeed={0.6}
                                maxSpeed={2.2}
                                className="absolute inset-0"
                            />
                        </>
                    ) : (
                        <SkyWithClouds className="fixed inset-0" />
                    )}
                </div>

                {/* Hero – same content as home; contrast by theme */}
                <section className="relative flex min-h-screen items-center justify-center px-6 py-20">
                    <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
                        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10">
                            <div className="relative">
                                {/* Blue–purple tint behind the profile image (dark mode only) */}
                                {isDark && (
                                    <div
                                        className="pointer-events-none absolute -inset-16 z-0 md:-inset-24"
                                        style={{
                                            background:
                                                'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(59, 130, 246, 0.7), rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.35), transparent 65%)',
                                            filter: 'blur(32px)',
                                            transform: 'scale(1.1)',
                                        }}
                                    />
                                )}
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    <div
                                        className={
                                            isDark
                                                ? 'h-48 w-48 flex-shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-neutral-800 lg:h-56 lg:w-56'
                                                : 'h-48 w-48 flex-shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-neutral-300 lg:h-56 lg:w-56'
                                        }
                                    >
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
                                            className={
                                                isDark
                                                    ? 'flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 grayscale transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4'
                                                    : 'flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-600 transition-all hover:scale-110 hover:border-neutral-400 hover:bg-neutral-100 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4'
                                            }
                                            aria-label="GitHub"
                                        >
                                            <GithubLogo />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/cory-sanda-74769924a/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={
                                                isDark
                                                    ? 'flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 grayscale transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4'
                                                    : 'flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-600 transition-all hover:scale-110 hover:border-neutral-400 hover:bg-neutral-100 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4'
                                            }
                                            aria-label="LinkedIn"
                                        >
                                            <LinkedInLogo />
                                        </a>
                                        <a
                                            href="mailto:beefsupreme21@hotmail.com"
                                            className={
                                                isDark
                                                    ? 'flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 grayscale transition-all hover:scale-110 hover:border-neutral-700 hover:bg-neutral-800 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4'
                                                    : 'flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-600 transition-all hover:scale-110 hover:border-neutral-400 hover:bg-neutral-100 hover:grayscale-0 [&_svg]:h-4 [&_svg]:w-4'
                                            }
                                            aria-label="Email"
                                        >
                                            <EmailIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    isDark
                                        ? 'max-w-xl space-y-4 text-center text-lg leading-relaxed text-neutral-300 lg:text-left'
                                        : 'max-w-xl space-y-4 text-center text-lg leading-relaxed text-neutral-600 lg:text-left'
                                }
                            >
                                    <p className="text-3xl font-bold lg:text-4xl">
                                        <EncryptedText
                                            text="Hey, I'm Cory."
                                            className="inline"
                                            encryptedClassName={isDark ? 'text-neutral-500' : 'text-neutral-400'}
                                            revealedClassName={isDark ? 'text-white' : 'text-neutral-900'}
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
                        </div>
                        <div className="mt-12 flex justify-center">
                            <NoiseBackground
                                containerClassName="w-fit rounded-full p-[6px]"
                                gradientColors={[
                                    'rgb(233, 213, 255)',
                                    'rgb(216, 180, 254)',
                                    'rgb(168, 85, 247)',
                                ]}
                                noiseIntensity={0.25}
                                speed={0.12}
                            >
                                <Link
                                    href="/#projects"
                                    className={
                                        isDark
                                            ? 'block h-full w-full rounded-full bg-[#0a0a0a] px-6 py-3 text-center font-medium text-white transition-all duration-100 hover:bg-neutral-900/90 hover:text-purple-200 active:scale-[0.98]'
                                            : 'block h-full w-full rounded-full bg-white px-6 py-3 text-center font-medium text-neutral-900 transition-all duration-100 hover:bg-neutral-100 hover:text-purple-700 active:scale-[0.98]'
                                    }
                                >
                                    See Projects
                                </Link>
                            </NoiseBackground>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="px-6 py-24">
                    <ScrollReveal direction="up" delay={0.1}>
                        <div className="mx-auto max-w-4xl">
                            <h2
                            className={
                                isDark ? 'mb-8 text-3xl font-bold text-white' : 'mb-8 text-3xl font-bold text-neutral-900'
                            }
                        >
                            Content
                        </h2>
                        <p
                            className={
                                isDark ? 'text-neutral-400 leading-relaxed' : 'text-neutral-600 leading-relaxed'
                            }
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                        <p
                            className={
                                isDark ? 'mt-4 text-neutral-400 leading-relaxed' : 'mt-4 text-neutral-600 leading-relaxed'
                            }
                        >
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        </div>
                    </ScrollReveal>
                </section>

                {/* More Content */}
                <section className="px-6 pb-32">
                    <ScrollReveal direction="up" delay={0.1}>
                        <div className="mx-auto max-w-4xl">
                            <h2
                            className={
                                isDark ? 'mb-8 text-3xl font-bold text-white' : 'mb-8 text-3xl font-bold text-neutral-900'
                            }
                        >
                            More Content
                        </h2>
                        <p
                            className={
                                isDark ? 'text-neutral-400 leading-relaxed' : 'text-neutral-600 leading-relaxed'
                            }
                        >
                            Scrolling over static stars—they stay fixed in the viewport while the
                            content moves. Toggle the sun/moon for day or night.
                        </p>
                        </div>
                    </ScrollReveal>
                </section>
            </div>
        </>
    );
}

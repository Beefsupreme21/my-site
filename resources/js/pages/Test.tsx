import { Head } from '@inertiajs/react';
import { StarsBackground } from '@/components/ui/stars-background';

export default function Test() {
    return (
        <>
            <Head title="Test" />
            <div className="relative min-h-screen">
                {/* Fixed dark bg + stars (stays put while scrolling, like phaser.io) */}
                <div className="fixed inset-0 -z-10 bg-[#0a0a0a]">
                    <StarsBackground
                        starDensity={0.0002}
                        allStarsTwinkle={false}
                        twinkleProbability={0.3}
                        className="opacity-80"
                    />
                </div>

                {/* Hero */}
                <section className="flex min-h-screen items-center justify-center px-6 py-20">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl font-bold text-white md:text-6xl">
                            Hero
                        </h1>
                        <p className="mt-4 text-lg text-neutral-400">
                            Test page with a phaser.io-style dark background and fixed stars.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="px-6 py-24">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-8 text-3xl font-bold text-white">
                            Content
                        </h2>
                        <p className="text-neutral-400 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                        <p className="mt-4 text-neutral-400 leading-relaxed">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </section>

                {/* More Content */}
                <section className="px-6 pb-32">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-8 text-3xl font-bold text-white">
                            More Content
                        </h2>
                        <p className="text-neutral-400 leading-relaxed">
                            Scrolling over static stars—they stay fixed in the viewport while the
                            content moves. Dark background, minimal layout, ready for your experiments.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}

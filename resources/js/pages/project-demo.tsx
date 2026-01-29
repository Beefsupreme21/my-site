import { Head, Link } from '@inertiajs/react';
import { ThreeJSGameDemo } from '@/components/demos/threejs-game';
import { SimpleDemo } from '@/components/demos/simple-demo';

interface ProjectDemoProps {
    project: {
        id: number;
        title: string;
        description: string;
        demoComponent?: string;
    };
}

// Map component names to actual components
const demoComponents: Record<string, React.ComponentType> = {
    'threejs-game': ThreeJSGameDemo,
    'simple-demo': SimpleDemo,
};

export default function ProjectDemo({ project }: ProjectDemoProps) {
    const DemoComponent = project.demoComponent
        ? demoComponents[project.demoComponent]
        : null;

    return (
        <>
            <Head title={`${project.title} - Demo`} />
            <div className="relative min-h-screen bg-black text-white">
                <Link
                    href="/"
                    className="absolute left-6 top-6 z-40 inline-flex items-center text-sm text-neutral-400 transition-colors hover:text-neutral-100"
                >
                    ← Back to Home
                </Link>
                {DemoComponent ? <DemoComponent /> : null}
            </div>
        </>
    );
}

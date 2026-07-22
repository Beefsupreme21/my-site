export function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0a0a]">
            <div className="mx-auto max-w-4xl px-6 py-8 text-center">
                <p className="text-lg font-semibold text-white">Cory S.</p>

                <div className="mt-2 space-y-1 text-sm">
                    <a href="mailto:beefsupreme21@hotmail.com" className="block text-brand transition-colors hover:text-brand-mid">
                        beefsupreme21@hotmail.com
                    </a>
                    <p className="text-neutral-500">
                        <a
                            href="https://github.com/Beefsupreme21"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-neutral-300"
                        >
                            GitHub
                        </a>
                        <span className="mx-2 text-neutral-700">·</span>
                        <a
                            href="https://www.linkedin.com/in/cory-sanda-74769924a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-neutral-300"
                        >
                            LinkedIn
                        </a>
                    </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-sm text-neutral-500">&copy; {year}</p>
                </div>
            </div>
        </footer>
    );
}

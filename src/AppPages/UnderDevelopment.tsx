import React from 'react';

const UnderDevelopment: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center bg-black">
            <div className="max-w-2xl w-full p-6">
                <h1 className="text-2xl sm:text-3xl font-semibold text-white">We&rsquo;re building something awesome</h1>
                <p className="text-white/70 mt-3">This site is currently under development. For now, only the Jobs Listing page is accessible.</p>
                <div className="mt-6">
                    <a
                        href="/verse/jobs"
                        className="inline-block px-5 py-2 rounded bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)]/90 text-white"
                    >
                        Go to Jobs Listing
                    </a>
                </div>
            </div>
        </div>
    );
}

export default UnderDevelopment;



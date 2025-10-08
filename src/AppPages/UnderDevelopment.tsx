import React from 'react';

const UnderDevelopment: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-center bg-black">
            <div className="max-w-2xl w-full p-6">
                <h1 className="text-2xl sm:text-3xl font-semibold text-white">We&rsquo;re building something awesome</h1>
                <p className="text-white/70 mt-3">This site is currently under development. Join our waitlist to be the first to know when we launch.</p>
                <div className="mt-6">
                    <a
                        href="https://www.waitlist.mycreativityverse.com"
                        className="inline-block px-5 py-2 rounded bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)]/90 text-white"
                    >
                        Join Waitlist
                    </a>
                </div>
            </div>
        </div>
    );
}

export default UnderDevelopment;



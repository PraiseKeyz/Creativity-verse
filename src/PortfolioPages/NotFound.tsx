import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[var(--color-text-dark)] flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[var(--color-brand-orange)]/10 via-[var(--color-brand-orange)]/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            
            <div className='absolute left-[40%] top-[50%] lg:left-[60%] lg:left-[50%]opacity-20'>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[49vh] font-bold leading-none bg-gradient-to-b from-[var(--color-surface-light)]/30 to-[var(--color-brand-orange)]/30 bg-clip-text text-transparent blur-[2px] select-none"
                >
                    404
                </motion.h1>
            </div>

            {/* Content Container */}
            <div className="relative z-10 text-center">
                {/* 404 Large Number */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-[180px] font-bold leading-none bg-gradient-to-b from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent"
                >
                    404
                </motion.h1>

                {/* Error Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-surface-light)]">
                        Page Not Found
                    </h2>
                    <p className="text-[var(--color-surface-light)]/70 max-w-md mx-auto">
                        We're sorry, but the page you're looking for seems to have vanished into the digital void.
                    </p>
                </motion.div>

                {/* Back to Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8"
                >
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] text-[var(--color-surface-light)] rounded-full font-semibold hover:shadow-lg hover:shadow-[var(--color-brand-orange)]/20 transition-all duration-300"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
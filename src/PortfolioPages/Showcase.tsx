import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Praise from '../assets/praise.jpeg'
import Basirat from '../assets/basirat.jpeg'
import ajiboye from '../assets/ajiboye.jpg'
import Ghina from '../assets/ghina.jpg'
import blessing from '../assets/blessing.jpg'
import qudus from '../assets/qudus.png'
import john from '../assets/john.jpg'

interface ExpandedCardProps {
    creator: typeof topCreators[0];
    onClose: () => void;
}

// Top community creators data 
const topCreators = [
    {
        id: 1,
        name: "Praise Adebayo",
        bio: "A passionate software engineer with a love for crafting innovative solutions.",
        user: {
            profile: "https://praisekeyz6.vercel.app"
        },
        role: "Software Engineer",
        avatar: Praise, 
    },
    {
        id: 2,
        name: "Ajiboye Anuoluwapo",
        user: {
            profile: "/"
        },
        bio: "I’m a versatile and highly creative professional with a passion for helping brands and individuals thrive in the digital space. I specialize in virtual assistance, social media management, content creation and video editing,bringing a unique blend of creativity, organization, and strategy to everything I do. In the digital space, I have hands-on experience managing social media pages, creating engaging content, editing videos, and growing online communities. Whether it’s crafting compelling captions, producing eye-catching videos, or curating a content strategy, I know how to bring a brand’s voice to life.",
        role: "Virtual Assistant and Social Media Manager",
        avatar: ajiboye,
    },
    {
        id: 3,
        name: "Bashirat Abdulkadir",
        user: {
            profile: "/"
        },
        role: "Virtual assistance & Community Manager",
        bio: " I’m a passionate Virtual Assistant and Community Manager with experience in building engaging online communities and supporting business operations. I enjoy creating organized systems that help teams work smarter and grow faster.",
        avatar: Basirat, 
    },
    {
        id: 4,
        name: "Ghina Firyaliani Zalfa",
        user: {
            profile: "/"
        },
        role: "Social Media Manager",
        bio: "A passionate social media enthusiast with a strong focus on strategy and creativity. I love turning ideas into impactful content that connects with audiences. Always eager to grow, collaborate, and bring fresh perspectives to every project I work on.",
        avatar: Ghina,
    },
    {
        id: 5,
        name: "Olayemi Blessing Moses",
        user: {
            profile: "https://www.behance.net/theolayemimoses"
        },
        role: "Graphics designer",
        bio: "I am a Creative Graphic Designer. I am passionate about utilizing my skills as a creative to bridge the gap between brands and their audience through functional yet creative visuals.",
        avatar: blessing,
    },
    {
        id: 6,
        name: "Alli Qudus Gbolahan",
        user: {
            profile: "/"
        },
        role: "Graphics designer",
        bio: "I'm Alli Qudus, a Graphics Designer and the same time a student with a passion for Graphics Design. When I'm not Working/Studying, you can find me Drawing or Playing football.",
        avatar: qudus,
    },
    {
        id: 7,
        name: "Ededet John",
        user: {
            profile: "https://cyberohn-dev.vercel.app/"
        },
        role: "Web Developer",
        bio: "I'm a passionate Full Stack Web Developer with over 2+ years of experience. I have honed my skills in HTML, CSS, JAVASCRIPT, Node.Js, MongoDB including popular tools, frameworks and libraries such as Express.js, Next.js, React Js, Tailwind CSS, Gsap, Sass, and GIT/GITHUB",
        avatar: john,
    }
];

const Showcase = () => {
    const [expandedCreatorId, setExpandedCreatorId] = useState<number | null>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setExpandedCreatorId(null);
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        }
    }, []); 

    return (
        <div className="bg-[var(--color-text-dark)]">
            {/* Hero section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-[60vh] md:min-h-[30vh] lg:min-h-screen flex items-center py-8 md:py-12 lg:py-16 overflow-hidden"
            >
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute w-[150%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-bl from-[var(--color-brand-orange)]/10 via-[var(--color-brand-orange)]/5 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6"
                        >
                            🎭 Showcase
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-[var(--color-surface-light)]/80 mb-12"
                        >
                            Where Creativity Comes to Life. Explore the incredible projects, collaborations, and digital creations born inside Creativity Verse.
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0">
                    <div className="absolute w-[150%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-[var(--color-brand-orange)]/10 via-[var(--color-brand-orange)]/5 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-[var(--color-brand-orange)] mb-4"
                        >
                            👥 Top Community Creators
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-[var(--color-surface-light)]/80"
                        >
                            Meet some of the brightest minds shaping digital creativity in Creativity Verse.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {topCreators.map((creator) => (
                            <motion.div
                                key={creator.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl p-6 backdrop-blur-sm text-center flex flex-col items-center justify-between "
                            >
                                {/* Avatar */}
                                <div>
                                    <div className="w-24 h-24 mx-auto mb-4 relative group">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-brand-orange)]/20 to-[var(--color-brand-orange)]/10 animate-pulse"></div>
                                        <img
                                            src={creator.avatar}
                                            alt={creator.name}
                                            className="w-full h-full rounded-full object-cover relative z-10 border-2 border-[var(--color-brand-orange)]/30"
                                        />
                                    </div>
                                    {/* Creator Info */}
                                    <h3 className="text-xl font-bold text-[var(--color-surface-light)] mb-1">
                                        {creator.name}
                                    </h3>
                                    
                                    <p className="text-sm font-bold text-[var(--color-brand-orange)]">
                                        {creator.role}
                                    </p>
                                    <p className="text-[var(--color-surface-light)]/70 text-sm mb-4 line-clamp-4">{creator.bio}</p>
                                </div>
                                <button
                                    onClick={() => setExpandedCreatorId(creator.id)}
                                    className="text-[var(--color-brand-orange)] cursor-pointer text-sm hover:text-[var(--color-brand-orange)]/80 transition-colors bg-[var(--color-brand-orange)]/20 px-4 py-2 rounded-full"
                                >
                                    Read More
                                </button>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <AnimatePresence>
        {expandedCreatorId !== null && (
            <ExpandedCard
                creator={topCreators.find(c => c.id === expandedCreatorId)!}
                onClose={() => setExpandedCreatorId(null)}
            />
        )}
    </AnimatePresence> 
        </div>
    );
};

const ExpandedCard: React.FC<ExpandedCardProps> = ({ creator, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-black/60 to-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/20 rounded-2xl p-8 max-w-2xl w-full relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 cursor-pointer text-[var(--color-surface-light)]/60 hover:text-[var(--color-surface-light)] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col items-center">
                    {/* Larger Avatar */}
                    <div className="w-40 h-40 relative mb-6">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-brand-orange)]/20 to-[var(--color-brand-orange)]/10 animate-pulse"></div>
                        <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-full h-full rounded-full object-cover relative z-10 border-4 border-[var(--color-brand-orange)]/30"
                        />
                    </div>

                    {/* Creator Info */}
                    <h2 className="text-3xl font-bold text-[var(--color-surface-light)] mb-2">
                        {creator.name}
                    </h2>
                    <p className="text-sm font-bold text-[var(--color-brand-orange)] mb-4">
                        {creator.role}
                    </p>
                    <p className="text-[var(--color-surface-light)]/70 text-center leading-relaxed">
                        {creator.bio}
                    </p>
                    <a target="_" href={creator.user?.profile} className="text-[var(--color-brand-orange)] mb-2 text-sm bg-[var(--color-surface-light)] hover:bg-[var(--color-surface-light)]/80 px-4 py-2 rounded-full transition-colors">
                        Visit Porfolio
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Showcase;
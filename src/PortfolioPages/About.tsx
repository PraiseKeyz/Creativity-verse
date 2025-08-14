import { motion } from 'framer-motion';
import herosection from '../assets/herosection.jpg'
import backImage from '../assets/about-herosection.png'
import SkillsetSection from '../components/SkillSet';

const About = () => {
    return(
        <div className="bg-[var(--color-text-dark)] overflow-hidden">
            {/* Hero Section */}
            <section className="min-h-[100vh] md:min-h-[70vh] relative flex items-center py-8 md:py-24 lg:py-32">
                    {/* Background Image with Color Overlay */}
                    <div className="absolute inset-0 ">
                        <img 
                            src={backImage} 
                            alt="Background Pattern" 
                            className="w-70 h-70 object-cover opacity-50"
                        />
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-orange)]/30 to-[var(--color-brand-orange)]/10 mix-blend-color"></div> */}
                    </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="text-left">

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6"
                            >
                                Welcome to Creativity Verse
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-xl text-[var(--color-surface-light)]/80 mb-8 max-w-xl"
                            >
                                A universe of digital minds empowering each other to create, learn, and grow.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <a href='https://chat.whatsapp.com/JqNVGVdY5aLE5S92u5ZJ16' className="px-8 py-3 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] text-[var(--color-surface-light)] rounded-full font-semibold hover:shadow-lg hover:shadow-[var(--color-brand-orange)]/20 transition-all duration-300">
                                    Join Our Community
                                </a>
                                <button className="px-8 py-3 border border-[var(--color-brand-orange)]/30 text-[var(--color-surface-light)] rounded-full font-semibold hover:border-[var(--color-brand-orange)] transition-all duration-300 cursor-pointer">
                                    Watch Video →
                                </button>
                            </motion.div>
                        </div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 2, 0]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <img
                                        src={herosection}
                                        alt="About Creativity Verse"
                                        className="rounded-2xl shadow-xl shadow-[var(--color-brand-orange)]/10"
                                    />
                                </motion.div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[var(--color-brand-orange)]/20 to-transparent rounded-full blur-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-12 lg:py-16"
            >
                {/* Background accents */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-0 w-[40%] h-[60%] bg-gradient-to-r from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column - Visual Element */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Timeline Visual */}
                            <div className="relative">
                                {[
                                    { year: '2023', event: 'Founded with a Vision' },
                                    { year: '2024', event: 'First 1000 Creators' },
                                    { year: '2025', event: 'Global Launch' }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                        className="flex items-start gap-6 mb-12"
                                    >
                                        <div className="relative">
                                            <div className="w-4 h-4 rounded-full bg-[var(--color-brand-orange)]"></div>
                                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-[var(--color-brand-orange)]/30 to-transparent"></div>
                                        </div>
                                        <div>
                                            <div className="text-[var(--color-brand-orange)] font-bold mb-1">{item.year}</div>
                                            <div className="text-[var(--color-surface-light)]/80">{item.event}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Stats */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="grid grid-cols-3 gap-6 mt-12"
                            >
                                {[
                                    { number: '5K+', label: 'Creators' },
                                    { number: '250+', label: 'Projects' },
                                    { number: '25+', label: 'Countries' }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center p-4 rounded-xl bg-[var(--color-brand-orange)]/5 backdrop-blur-sm">
                                        <div className="text-2xl font-bold text-[var(--color-brand-orange)]">{stat.number}</div>
                                        <div className="text-sm text-[var(--color-surface-light)]/60">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Content */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-8"
                            >
                                <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] text-sm font-medium mb-4">
                                    Our Journey
                                </span>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
                                    The Story Behind Creativity Verse
                                </h2>
                            </motion.div>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-lg text-[var(--color-surface-light)]/80 leading-relaxed"
                            >
                                Creativity Verse started with a simple idea: bring digital creators together in a space where innovation thrives and collaboration fuels growth. In a world where creative work often feels isolated, we envisioned a vibrant community where skills, ideas, and imagination could flourish.
                            </motion.p>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-[var(--color-surface-light)]/80 leading-relaxed"
                            >
                                Today, we're a growing family of designers, developers, writers, artists, and builders shaping the future together. Our platform has become a melting pot of creativity, where diverse perspectives merge to create something extraordinary.
                            </motion.p>

                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-[var(--color-surface-light)]/80 leading-relaxed"
                            >
                            From humble social media roots to a growing digital ecosystem, our mission has always been clear: to empower, elevate, and equip creatives for the future of work, expression, and innovation..
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.section>

                        {/* Mission & Vision Section */}
                        <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-32 overflow-hidden"
            >
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 right-0 w-[60%] h-[80%] bg-gradient-to-bl from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Mission Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-orange)]/10 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
                            <div className="relative p-10 rounded-3xl border border-[var(--color-brand-orange)]/20 backdrop-blur-sm">
                                <div className="text-4xl mb-6">🎯</div>
                                <h3 className="text-3xl font-bold text-[var(--color-brand-orange)] mb-4">
                                    Our Mission
                                </h3>
                                <p className="text-xl text-[var(--color-surface-light)]/80 leading-relaxed">
                                    To empower digital creatives by building a collaborative community that inspires innovation, fosters growth, and celebrates originality.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-brand-orange)]/10 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
                            <div className="relative p-10 rounded-3xl border border-[var(--color-brand-orange)]/20 backdrop-blur-sm">
                                <div className="text-4xl mb-6">🚀</div>
                                <h3 className="text-3xl font-bold text-[var(--color-brand-orange)] mb-4">
                                    Our Vision
                                </h3>
                                <p className="text-xl text-[var(--color-surface-light)]/80 leading-relaxed">
                                    To become the go-to hub for global creatives a platform where ideas become reality and creativity has no limits.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Core Values Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-24"
            >
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 w-[40%] h-[60%] bg-gradient-to-tr from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 max-w-3xl"
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] text-sm font-medium mb-4">
                            Our Foundation
                        </span>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
                            Our Core Values
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column - Values List */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {[
                                { 
                                    title: 'Creativity First', 
                                    description: 'We believe ideas change the world.',
                                    icon: '💡'
                                },
                                { 
                                    title: 'Community Over Competition', 
                                    description: 'We rise by lifting others.',
                                    icon: '🤝'
                                },
                                { 
                                    title: 'Digital Empowerment', 
                                    description: 'Tech is our toolbox, not our replacement.',
                                    icon: '🛠️'
                                },
                                { 
                                    title: 'Visibility With Integrity', 
                                    description: 'Every spotlight is earned, not bought.',
                                    icon: '✨'
                                },
                                { 
                                    title: 'Growth Through Giving', 
                                    description: 'We share, we teach, we mentor.',
                                    icon: '🌱'
                                }
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-brand-orange)]/10 text-2xl">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--color-brand-orange)] mb-1">
                                            {value.title}
                                        </h3>
                                        <p className="text-[var(--color-surface-light)]/80">
                                            {value.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Right Column - SVG Illustration (hidden on mobile) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="hidden lg:block relative"
                        >
                            <svg 
                                viewBox="0 0 500 500" 
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-auto"
                            >
                                {/* Core Values Illustration */}
                                <circle cx="250" cy="250" r="200" fill="rgba(255, 126, 50, 0.05)" />
                                <circle cx="250" cy="250" r="150" fill="rgba(255, 126, 50, 0.08)" />
                                <circle cx="250" cy="250" r="100" fill="rgba(255, 126, 50, 0.12)" />
                                <circle cx="250" cy="250" r="50" fill="rgba(255, 126, 50, 0.2)" />
                                
                                {/* Creativity */}
                                <circle cx="250" cy="100" r="30" fill="rgba(255, 126, 50, 0.3)" />
                                <path d="M250 130 L250 200" stroke="rgba(255, 126, 50, 0.5)" strokeWidth="3" />
                                
                                {/* Community */}
                                <circle cx="130" cy="200" r="30" fill="rgba(255, 126, 50, 0.3)" />
                                <path d="M160 200 L200 250" stroke="rgba(255, 126, 50, 0.5)" strokeWidth="3" />
                                
                                {/* Digital Empowerment */}
                                <circle cx="130" cy="300" r="30" fill="rgba(255, 126, 50, 0.3)" />
                                <path d="M160 300 L200 250" stroke="rgba(255, 126, 50, 0.5)" strokeWidth="3" />
                                
                                {/* Visibility */}
                                <circle cx="250" cy="400" r="30" fill="rgba(255, 126, 50, 0.3)" />
                                <path d="M250 370 L250 300" stroke="rgba(255, 126, 50, 0.5)" strokeWidth="3" />
                                
                                {/* Growth */}
                                <circle cx="370" cy="300" r="30" fill="rgba(255, 126, 50, 0.3)" />
                                <path d="M340 300 L300 250" stroke="rgba(255, 126, 50, 0.5)" strokeWidth="3" />
                                
                                {/* Center */}
                                <circle cx="250" cy="250" r="40" fill="rgba(255, 126, 50, 0.4)" />
                                <text x="250" y="255" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">VALUES</text>
                            </svg>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[var(--color-brand-orange)]/20 to-transparent rounded-full blur-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
            <SkillsetSection />


                        {/* Who We Serve Section */}
                        <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-32"
            >
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6">
                            Who We Serve
                        </h2>
                        <p className="text-xl text-[var(--color-surface-light)]/80 max-w-2xl mx-auto">
                            Our community brings together creative minds from diverse digital disciplines
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "🎨", title: "Designers", desc: "UI/UX and graphic designers crafting beautiful experiences" },
                            { icon: "🧑‍💻", title: "Developers", desc: "Coding wizards building the digital future" },
                            { icon: "🖌️", title: "Digital Artists", desc: "Creative souls bringing imagination to life" },
                            { icon: "✍️", title: "Writers & Content Creators", desc: "Storytellers shaping narratives" },
                            { icon: "🎬", title: "Animators & Motion Designers", desc: "Artists who bring static designs to life" },
                            { icon: "📱", title: "App Builders", desc: "Innovators creating next-gen applications" },
                            { icon: "🧠", title: "Curious Learners", desc: "Knowledge seekers expanding their creative horizons" },
                            { icon: "🤝", title: "Collaborators", desc: "Team players who believe in collective growth" }
                        ].map((creator, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-transparent rounded-2xl transform group-hover:scale-105 transition-transform duration-300"></div>
                                <div className="relative p-6 rounded-2xl border border-[var(--color-brand-orange)]/20 backdrop-blur-sm">
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {creator.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-[var(--color-brand-orange)] mb-2">
                                        {creator.title}
                                    </h3>
                                    <p className="text-[var(--color-surface-light)]/70">
                                        {creator.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

                        {/* Meet the Team Section */}
                        <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-32"
            >
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 right-0 w-[50%] h-[60%] bg-gradient-to-bl from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-[var(--color-brand-orange)]/5 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6">
                            Meet the Visionaries
                        </h2>
                        <p className="text-xl text-[var(--color-surface-light)]/80 max-w-2xl mx-auto">
                            The creative minds shaping the future of digital collaboration
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative max-w-4xl mx-auto"
                    >
                        <div className="relative p-12 rounded-3xl border border-[var(--color-brand-orange)]/20 backdrop-blur-sm overflow-hidden group">
                            {/* Animated Background */}
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-orange)]/5 to-transparent"></div>
                                <motion.div
                                    animate={{
                                        backgroundPosition: ['0% 0%', '100% 100%'],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle at center, var(--color-brand-orange) 1px, transparent 1px)',
                                        backgroundSize: '24px 24px',
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative text-center space-y-8">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.02, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-6xl mb-8"
                                >
                                    👥
                                </motion.div>
                                <h3 className="text-3xl font-bold text-[var(--color-brand-orange)]">
                                    Team Reveal Coming Soon
                                </h3>
                                <p className="text-xl text-[var(--color-surface-light)]/80 max-w-2xl mx-auto">
                                    We're assembling a team of passionate creators, innovators, and dreamers. 
                                    Stay tuned to meet the faces behind Creativity Verse.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 mt-6 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] text-[var(--color-surface-light)] rounded-full font-semibold hover:shadow-lg hover:shadow-[var(--color-brand-orange)]/20 transition-all duration-300"
                                >
                                    Join Our Team →
                                </motion.button>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[var(--color-brand-orange)]/20 to-transparent rounded-full blur-2xl"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

                        {/* CTA Section */}
                        <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-32"
            >
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-orange)]/20 to-transparent"></div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.2, 0.3]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-orange)_0%,_transparent_50%)] opacity-30"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-8"
                        >
                            Ready to Shape the Future of Creativity?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-[var(--color-surface-light)]/80 mb-12"
                        >
                            Join our community of innovators, creators, and visionaries. Together, let's build something extraordinary.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-6 justify-center"
                        >
                            <motion.a
                                href='/services'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] text-[var(--color-surface-light)] rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[var(--color-brand-orange)]/20 transition-all duration-300"
                            >
                                Get Started Now
                            </motion.a>
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-[var(--color-brand-orange)] text-[var(--color-surface-light)] rounded-full font-semibold text-lg hover:bg-[var(--color-brand-orange)]/10 transition-all duration-300"
                            >
                                Schedule a Demo
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    )
}

export default About;
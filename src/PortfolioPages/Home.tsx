import { motion } from "framer-motion";
import herosection from '../assets/herosection.jpg'
import spiral from '../assets/spiralwave.png'
import praise from '../assets/praise.jpeg'
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="bg-[var(--color-text-dark)] overflow-hidden">
            {/* Hero Section */} 
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                className="flex items-center min-h-[80vh] md:min-h-[40vh] lg:min-h-screen relative overflow-hidden"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-full md:w-[70%] lg:w-[50%] h-full -left-[30%] md:-left-[20%] lg:-left-[10%] top-1/2 -translate-y-1/2">
                        <img 
                            src={spiral} 
                            alt="Spiral Wave" 
                            className="w-full h-auto object-cover opacity-30 md:opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-text-dark)]/50 to-[var(--color-text-dark)]"></div>
                    </div>
                </div>
                {/* Rest of hero content remains the same */}
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-left"
                    >
                        <motion.div
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-16 h-16 mb-6"
                        >
                            <svg 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                className="w-full h-full text-[var(--color-brand-orange)]"
                            >
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <motion.path
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    d="M9 16.17L9.59 16.93C10.25 17.72 11.4 17.72 12.06 16.93L12.65 16.17C13.81 14.78 14.5 13.08 14.5 11.25V11.14C14.5 8.83 12.71 7.04 10.4 7.04H10.1C7.79 7.04 6 8.83 6 11.14V11.25C6 13.08 6.69 14.78 7.85 16.17H9Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6">
                            Creativity Verse
                        </h1>
                        <p className="text-[var(--color-surface-light)]/80 text-xl md:text-2xl max-w-xl mb-8">
                            Empowering the next wave of creatives with everything they need to thrive in the fast evolving-digital world.
                        </p>
                        
                        {/* Community Stats */}
                        <div className="flex items-center gap-6 mb-10">
                            {[
                                { number: "5K+", label: "Creators" },
                                { number: "250+", label: "Projects" },
                                { number: "1", label: "Mission" }
                            ].map((stat, index) => (
                                <div key={index} className="relative">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex flex-col"
                                    >
                                        <span className="text-3xl font-bold text-[var(--color-brand-orange)]">
                                            {stat.number}
                                        </span>
                                        <span className="text-[var(--color-surface-light)]/70">
                                            {stat.label}
                                        </span>
                                    </motion.div>
                                    {index < 2 && (
                                        <div className="absolute right-[-1rem] top-1/2 -translate-y-1/2 w-[2px] h-8 bg-[var(--color-brand-orange)]/20" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Link to='/services' className="px-8 py-3 bg-[var(--color-brand-orange)] text-[var(--color-text-dark)] rounded-full font-semibold hover:bg-[var(--color-brand-orange)]/90 transition-all">
                                Get Started
                            </Link>
                            <Link to='/about' className="px-8 py-3 border border-[var(--color-brand-orange)]/30 text-[var(--color-surface-light)] rounded-full font-semibold hover:border-[var(--color-brand-orange)] transition-all">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right side - Image placeholder */}
                    <motion.div 
                        className="hidden md:block relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {/* Animated rings */}
                        <motion.div 
                            className="absolute inset-0 border-4 border-[var(--color-brand-orange)]/20 rounded-full"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div 
                            className="absolute inset-0 border-4 border-[var(--color-brand-orange)]/10 rounded-full"
                            animate={{
                                scale: [1.1, 1.2, 1.1],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                        
                        {/* Main image with floating animation */}
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
                            className="relative z-10"
                        >
                            <img 
                                src={herosection} 
                                alt="herosection" 
                                className="rounded-full border-4 border-[var(--color-brand-orange)]/30 shadow-lg shadow-[var(--color-brand-orange)]/20 backdrop-blur-sm" 
                            />
                            
                            
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--color-brand-orange)]/10 to-transparent"></div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

                        {/* About Section */}
                        <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-24 md:py-32"
            >
                {/* Orange gradient accent */}
                <div className="absolute inset-0">
                    <div className="absolute top-[10%] z-0 right-[-20%] w-[70%] h-[70%] bg-gradient-to-bl from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-1xl"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-8">
                        A Universe Built for Creators
                    </h2>
                    
                    <p className="text-[var(--color-surface-light)]/80 text-xl text-center max-w-3xl mx-auto mb-16">
                    Creativity Verse is a digital universe where creatives and brands thrive. A safe space for creators, learners, freelancers, digital enthusiasts, tech innovators, entrepreneurs and just anyone who is interested in growth & the digital space. Whether you're a freelancer, a tech enthusiast, or a startup, this is your space to create, connect, and conquer.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { 
                                icon: "🎨",
                                title: "Creative Collaboration",
                                desc: "Connect with others to co-create stunning digital projects."
                            },
                            {
                                icon: "🚀",
                                title: "Skill Growth",
                                desc: "Access workshops, resources, and mentorship to level up."
                            },
                            {
                                icon: "🌐",
                                title: "Global Community",
                                desc: "Join a diverse network of creatives from around the world."
                            },
                            {
                                icon: "💡",
                                title: "Project Showcases",
                                desc: "Share your work and get inspired by others."
                            }
                        ].map((feature, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-[var(--color-brand-orange)] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-[var(--color-surface-light)]/70">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-20"
            >
                {/* Orange gradient accent */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6">
                        Built for Creators, by Creators
                    </h2>
                    
                    <p className="text-[var(--color-surface-light)]/80 text-xl text-center max-w-3xl mx-auto mb-16">
                        At Creativity Verse, we equip the next generation of creatives, freelancers, and digital innovators with the tools, training, and community they need to thrive. Whether you're building your skills, growing your brand, or looking for your next big break, you're in the right place.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: "🛠️", 
                                title: "Creator Tools & Gadgets", 
                                desc: "Handpicked AI tools, creative software, and resources to level up your workflow." 
                            },
                            { 
                                icon: "💼", 
                                title: "Job Updates & Opportunities", 
                                desc: "Real-time curated gigs, freelance jobs, internships, and project openings." 
                            },
                            { 
                                icon: "📚", 
                                title: "Courses & Resources", 
                                desc: "Curated lessons, toolkits, and expert guides to fuel your growth." 
                            },
                            { 
                                icon: "🏅", 
                                title: "Certification & Talent Vetting", 
                                desc: "Earn trust and visibility with badges and verifications that showcase your skills." 
                            },
                            { 
                                icon: "🤝", 
                                title: "Collaboration & Matching", 
                                desc: "Get matched with like-minded creators, collaborators, or potential clients." 
                            },
                            { 
                                icon: "🎓", 
                                title: "Training & Workshops", 
                                desc: "Live and recorded sessions with pros, mentors, and industry leaders." 
                            }
                        ].map((feature, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="p-6 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20"
                            >
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold text-[var(--color-brand-orange)] mb-4">{feature.title}</h3>
                                <p className="text-[var(--color-surface-light)]/70">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <a target="_" href='https://chat.whatsapp.com/JqNVGVdY5aLE5S92u5ZJ16' className="px-8 py-4 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] text-[var(--color-surface-light)] rounded-full font-bold hover:shadow-lg hover:shadow-[var(--color-brand-orange)]/20 transition-all duration-300 group relative overflow-hidden">
                            <span className="relative z-10">🎯 Join Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#E65100] to-[var(--color-brand-orange)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </motion.div>
                </div>
            </motion.section>

                        {/* How It Works Section */}
                        <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative py-20"
            >
                {/* Orange gradient accent */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[70%] bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-16">
                        How Creativity Verse Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
                        {/* Steps List */}
                        <div className="space-y-12">
                            {[
                                {
                                    icon: "✨",
                                    title: "Join the Community",
                                    desc: "Sign up and create your profile in minutes it's free and easy."
                                },
                                {
                                    icon: "🎯",
                                    title: "Explore & Learn",
                                    desc: "Access creative resources, join events, and follow creators."
                                },
                                {
                                    icon: "🤝",
                                    title: "Collaborate & Create",
                                    desc: "Start projects, share ideas, and bring your digital visions to life."
                                },
                                {
                                    icon: "🌟",
                                    title: "Showcase & Shine",
                                    desc: "Publish your work, get feedback, and inspire the community."
                                }
                            ].map((step, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent backdrop-blur-sm border border-[var(--color-brand-orange)]/20 group-hover:border-[var(--color-brand-orange)]/40 transition-all">
                                        <span className="text-2xl">{step.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--color-brand-orange)] mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-[var(--color-surface-light)]/70">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive Visual */}
                        <div className="relative h-[500px] hidden md:block">
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-orange)]/5 to-transparent rounded-3xl border border-[var(--color-brand-orange)]/20 backdrop-blur-sm"
                                animate={{
                                    boxShadow: ["0 0 20px rgba(255,126,0,0.1)", "0 0 40px rgba(255,126,0,0.2)", "0 0 20px rgba(255,126,0,0.1)"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, 0]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="text-8xl mb-6"
                                    >
                                        🎨
                                    </motion.div>
                                    <p className="text-[var(--color-surface-light)] text-xl font-semibold">
                                        Your Creative Journey
                                    </p>
                                    <p className="text-[var(--color-surface-light)]/70 mt-2">
                                        Begins Here
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>

                        {/* Testimonials Section */}
                        <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative  py-20"
            >
                {/* Orange gradient accent */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 right-0 w-[60%] h-[80%] bg-gradient-to-bl from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-16">
                        Voices from the Verse
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                quote: "Creativity Verse helped me launch my first digital art project and connect with other amazing artists!",
                                author: "Ada M.",
                                role: "Visual Artist",
                                emoji: "🎨",
                                image: ""
                            },
                            {
                                quote: "The collab tools and community spirit here are unmatched. It's like a playground for creatives.",
                                author: "Daniel O.",
                                role: "UX Designer",
                                emoji: "✨",
                                image: "image"
                            },
                            {
                                quote: "I've learned more in one month here than a year of trying to figure it out alone.",
                                author: "Praise Adebayo",
                                role: "Software Engineer",
                                emoji: "💻",
                                image: praise
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative pt-16"
                            >
                                {/* Profile Image */}
                                <motion.div
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24"
                                    animate={{
                                        y: [0, -5, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.3
                                    }}
                                >
                                    <div className="w-full h-full rounded-full border-4 border-[var(--color-brand-orange)]/30 overflow-hidden bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent backdrop-blur-sm">
                                        <img 
                                            src={testimonial.image} 
                                            alt={testimonial.author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>

                                <div className="p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-[var(--color-brand-orange)]/5 to-transparent border border-[var(--color-brand-orange)]/20 h-full">
                                    {/* Rest of the card content */}
                                    <p className="text-[var(--color-surface-light)]/90 text-lg mb-6 italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-brand-orange)]/30 to-transparent flex items-center justify-center">
                                            <span className="text-sm">{testimonial.emoji}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[var(--color-brand-orange)]">
                                                {testimonial.author}
                                            </p>
                                            <p className="text-sm text-[var(--color-surface-light)]/70">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
                {/* Enhanced gradient background */}
                <div className="absolute inset-0">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[90%] bg-gradient-to-t from-[var(--color-brand-orange)]/30 via-[var(--color-brand-orange)]/10 to-transparent blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <span className="px-6 py-2 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] text-sm font-semibold border border-[var(--color-brand-orange)]/20">
                                ✨ Limited Time Offer
                            </span>
                        </motion.div>

                        <motion.h2 
                            className="text-5xl md:text-6xl font-bold text-[var(--color-surface-light)] mb-6"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Ready to Transform Your
                            <span className="block mt-2 bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
                                Creative Journey?
                            </span>
                        </motion.h2>

                        <motion.p 
                            className="text-xl text-[var(--color-surface-light)]/70 mb-12 max-w-2xl mx-auto"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Join thousands of creators who are already bringing their ideas to life. Start for free today!
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link to='/services' className="px-8 py-4 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] text-[var(--color-surface-light)] rounded-full font-bold hover:shadow-lg hover:shadow-[var(--color-brand-orange)]/20 transition-all duration-300 group relative overflow-hidden">
                                <span className="relative z-10">Get Started Free</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#E65100] to-[var(--color-brand-orange)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <Link to="/contact" className="px-8 py-4 border border-[var(--color-brand-orange)]/30 text-[var(--color-surface-light)] rounded-full font-bold hover:border-[var(--color-brand-orange)] transition-all duration-300">
                                Schedule Demo →
                            </Link>
                        </motion.div>

                        <motion.p
                            className="mt-8 text-sm text-[var(--color-surface-light)]/50"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            No credit card required • Free forever plan available
                        </motion.p>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

export default HomePage;
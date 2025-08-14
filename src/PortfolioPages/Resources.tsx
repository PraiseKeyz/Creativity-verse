import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

// Tool category type
type ToolCategory = "Content Creation" | "Design" | "Marketing" | "AI" | "Collaboration" | "Productivity";

interface BlogPost {
    _id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    readTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}




const Resources = () => {
    const [activeFilter, setActiveFilter] = useState<ToolCategory | "all">("all");
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faq = [
        {
            question: "What is Creativity Verse?",
            answer: "Creativity Verse is a digital ecosystem and community empowering freelancers, entrepreneurs, content creators, and tech enthusiasts through mentorship, services, opportunities, and collaboration. We’re building the future of creativity — one connection, one creation, one vision at a time.",
            cta: []
        },
        {
            question: "Who is Creativity Verse for?",
            answer: "Whether you're: A freelancer looking to showcase your skills, An entrepreneur needing digital support, A creative craving growth, or A brand searching for verified talent - Creativity Verse is your launchpad.",
            cta: []
        },
        {
            question: "What do I get by joining the community?",
            answer: "Members of Creativity Verse gain access to: A vibrant community of digital minds. Mentorship & growth-focused conversations. Weekly insights, opportunities, and challenges. Events, collaborations & showcases. A support system for your freelance or creative journey.",
            cta: []
        },
        {
            question: "What services does Creativity Verse offer?",
            answer: "We offer tailored services under Creativity Verse Pro, including: Brand Strategy & Identity. Social Media Management. Graphics & Motion Design / Video Ads. Website Development. Creative Strategy & Ideation. Whether you’re a brand or an individual creator, we’ve got tools to elevate your vision.",
            cta: [{text: 'See our service packages →', url: '/services'}]
        },
        {
            question: "What is Creativity Verse Pro?",
            answer: "Creativity Verse Pro is our premium offering for individuals and businesses who want to: Build a standout brand. Grow online presence. Access exclusive tools, mentorship & services. Partner with verified creative talent.",
            cta: [{text: 'Subscribe to CV Pro to unlock your next level →', url: '/services'}]
        },
        {
            question: "What kind of resources are available?",
            answer: "From curated toolkits to free eBooks, course recommendations, and creative templates, the Resources Hub is your knowledge base for leveling up in the digital world.",
            cta: [{text: 'Explore Resources →', url: '/resources'}]
        },
        {
            question: "How do I join the community?",
            answer: "You can: Join our WhatsApp Community for real-time engagement. Follow us on Instagram & LinkedIn. Sign up via the website to access our exclusive member updates.",
            cta: [{text: 'Join the Community →', url: 'https://chat.whatsapp.com/JqNVGVdY5aLE5S92u5ZJ16'}]
        },
        {
            question: "What is the 'Get Mentored' program?",
            answer: "Our mentorship track connects you with experienced professionals who can: Guide your career or creative journey. Offer industry insights. Help refine your skills and profile. Whether you're just starting or ready to scale, mentorship opens doors.",
            cta: [{text: 'Apply for Mentorship →', url: '/contact'}]
        },
        {
            question: "How do I request a service or make a partnership inquiry?",
            answer: "Easy. Just head to the Contact Page Or fill out our Project Request Form. We’ll connect with you shortly!",
            cta: [{text: 'Contact page', url: '/contact'}]
        },
        {
            question: "Can I contribute or collaborate with Creativity Verse?",
            answer: "Absolutely! We’re always open to: Guest articles or resource contributions. Speaking at our events. Strategic brand collaborations. Community-led initiatives. Pitch your idea to collaborate@creativityverse.com",
            cta: []
        },
        {
            question: "Are there any paid features?",
            answer: "Yes — while many features of Creativity Verse are free, CV Pro, mentorship, and select services are premium. Pricing is tailored to value and scale, both in USD and NGN. See our Pricing Page for full details.",
            cta: []
        },
        {
            question: "How do you verify talent on your platform?",
            answer: "We have a Talent Verification Process that assesses: Portfolio quality, Digital footprint, Consistency & originality, Brand alignment, This helps ensure trust and quality across collaborations.",
            cta: []
        },
        {
            question: "Still have questions?",
            answer: "We’re here to help — Reach Out to Our Team →",
            cta: [{text: 'Reach out to us', url: '/contact'}]
        },
    ]

    const APP_BASE_URL = import.meta.env.VITE_APP_API_URL;

    useEffect(() => {
      const fetchPosts = async () => { 
        try {
          setLoading(true);
          const response = await axios.get(`${APP_BASE_URL}/api/blogs`);
          setPosts(response.data); 
        } catch (error: any) { 
          console.error('Error fetching blog posts:', error.message);
          setError('Failed to load blog posts');
  
          if (error.response) { 
            console.error('Error response data:', error.response.data);  
            console.error('Error response status:', error.response.status); 
          }
        } finally {
          setLoading(false);
        }
      };
      fetchPosts()
  }, [])
  

    return (
        <div className="bg-[var(--color-text-dark)]">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-[80vh] md:min-h-[30vh] lg:min-h-[90vh] flex items-center py-3 md:py-12 lg:py-16 overflow-hidden"
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
                            Your Creative Toolkit, Unlocked
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-[var(--color-surface-light)]/80 mb-8"
                        >
                            From actionable blogs and breakthrough tools to exclusive guides and AI updates — this is where creativity meets clarity.
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            {/* Blog Section (conditionally rendered) */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-orange)] mb-4 text-center md:text-left">
                                The Verse Blog
                            </h2>
                            <p className="text-[var(--color-surface-light)]/80 text-center md:text-left">
                                Fresh, SEO-optimized content to keep you inspired and informed
                            </p>
                        </div>
                        <Link 
                            to="/resources/blogs"
                            className="whitespace-nowrap px-6 py-2 border border-[var(--color-brand-orange)] text-[var(--color-surface-light)] rounded-full hover:bg-[var(--color-brand-orange)]/10 transition-all duration-300 flex items-center gap-2"
                        >
                            View All Posts
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
                                <path d="M5 12h14"/>
                                <path d="m12 5 7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>

                    {/* Blog loading/error/content logic */}
                    {loading ? (
                        <div className="bg-[var(--color-text-dark)] py-16 flex items-center justify-center">
                            <div className="text-[var(--color-surface-light)] text-xl">Loading posts...</div>
                        </div>
                    ) : error ? (
                        <div className="bg-[var(--color-text-dark)] py-16 flex items-center justify-center">
                            <div className="text-[var(--color-brand-orange)] text-xl">{error}</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl overflow-hidden"
                                >
                                    <div className="aspect-video relative">
                                        <img 
                                            src={`data:image/jpeg;base64,${post.image}`} 
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-sm text-[var(--color-brand-orange)]">{post.category}</span>
                                            <span className="text-sm text-[var(--color-surface-light)]/60">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-[var(--color-surface-light)] mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-[var(--color-surface-light)]/70 mb-4">
                                            {post.content.slice(0, 100)}...
                                        </p>
                                        <Link 
                                            to={`/resources/blogs/${post._id}`}
                                            className="text-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)]/80 transition-colors"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-orange)] mb-4 text-center md:text-left">
                                FAQ
                            </h2>
                            <p className="text-[var(--color-surface-light)]/80 text-center md:text-left">
                                Here are some answers to questions you might have as you explore our platform.
                            </p>
                        </div>
                    </div>

                    <div className="faq-container flex flex-col gap-4">
                        {faq.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                className='faq-item bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl overflow-hidden px-6 py-4 cursor-pointer transition-all duration-300 group'
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <div className="faq-title flex items-center justify-between">
                                    <h4 className={`text-lg font-semibold text-[var(--color-brand-orange)] ${openFaq !== index ?'group-hover:text-white' : ''}`}>{item.question}</h4>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-[var(--color-brand-orange)] transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                                </div>
                                {openFaq === index && (
                                    <div>
                                        <p className="faq-desc text-[var(--color-surface-light)]/80 text-sm mt-3 mb-2">{item.answer}</p>
                                        {item.cta && item.cta.length > 0 && (
                                            <div className="mt-2">
                                                {item.cta.map((cta, cindex) => (
                                                    <a key={cindex} href={cta.url} className="text-[var(--color-brand-orange)] hover:underline text-sm inline-block mt-1">
                                                        {cta.text}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Directory Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-orange)] mb-4">
                            Creator Tools & Tech Directory
                        </h2>
                        <p className="text-[var(--color-surface-light)]/80 text-lg">
                            Handpicked software, platforms & AI tools for productivity, creativity, and scale.
                        </p>
                    </motion.div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        {[
                            { id: "all", label: "All" },
                            { id: "Content Creation", label: "Content Creation" },
                            { id: "Design", label: "Design" },
                            { id: "Marketing", label: "Marketing" },
                            { id: "AI", label: "AI" },
                            { id: "Collaboration", label: "Collaboration" },
                            { id: "Productivity", label: "Productivity" }
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id as ToolCategory | "all")}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                    activeFilter === filter.id
                                    ? 'bg-[var(--color-brand-orange)] text-[var(--color-text-dark)]'
                                    : 'bg-[var(--color-brand-orange)]/10 text-[var(--color-surface-light)] hover:bg-[var(--color-brand-orange)]/20'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Tool cards will be mapped here */}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Resources;
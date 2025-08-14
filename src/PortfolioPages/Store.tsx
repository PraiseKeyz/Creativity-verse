import { useState } from "react";
import { motion } from "framer-motion";
import freelancing from '../assets/freelancing.jpg';
import paysub from '../assets/paysub.jpeg'
import ebook2 from '../assets/ebook2.jpeg'

const featuredProjects = [
    {
        id: 1,
        name: "PaySub",
        category: "digital",
        description: "A special VTU Setup solution that allow anyone in Nigeria to run and offer VTU services",
        thumbnail: paysub,
        tags: ["Frontend", "Database", "Backend"],
        link: "https://pay-sub.vercel.app",
        featured: true
    },
    {
        id: 2,
        name: "Getting Started With Freelancing",
        category: "ebooks",
        description: "A Begginer's guide to Building skills finding clients, and creating freedoms",
        thumbnail: freelancing,
        tags: ["Writing", "Design", "Illustration"],
        link: "https://selar.com/489v15",
        featured: true
    },
    {
        id: 3,
        name: "Essential AI tools for entrepreneurs",
        category: "ebooks",
        description: "An ebook that explains and gives insight on the importance of AI to entrepreneurs",
        thumbnail: ebook2,
        tags: ["Writing", "Design", "Illustration"],
        link: "https://selar.com/ky6w0q",
        featured: true
    }
];

const getCTAByCategory = (category: string) => {
    switch(category) {
      case 'ebooks':
        return {
          text: "Grab Now",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          )
        };
      case 'courses':
        return {
          text: "Enroll Now",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 1 12 24c-2.796 0-5.487-.46-8-1.308"></path>
              <path d="M12 14l-6.16-3.422a12.083 12.083 0 0 0-.665 6.479A11.952 11.952 0 0 0 12 24c2.796 0 5.487-.46 8-1.308"></path>
            </svg>
          )
        };
      case 'digital':
        return {
          text: "Get Access",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
            </svg>
          )
        };
      case 'templates':
        return {
          text: "Download Now",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          )
        };
      default:
        return {
          text: "View Details",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          )
        };
    }
  };

const Store = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    return (
        <div className="bg-[var(--color-text-dark)]">
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-[70vh] md:min-h-[40vh] lg:min-h-[90vh] flex items-center py-8 md:py-12 lg:py-16 overflow-hidden"
            >
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute w-[150%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-bl from-[var(--color-brand-orange)]/10 via-[var(--color-brand-orange)]/5 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-block px-4 py-2 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] text-sm font-medium mb-6"
                        >
                            🛍️ Digital Creative Assets
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6"
                        >
                            Discover Premium Creative Resources
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-[var(--color-surface-light)]/80 mb-8"
                        >
                            Explore our curated collection of design assets, templates, and tools to supercharge your creative workflow.
                        </motion.p>

                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <button className="px-8 py-3 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] text-[var(--color-surface-light)] rounded-full font-semibold hover:shadow-lg hover:shadow-[var(--color-brand-orange)]/20 transition-all duration-300">
                                Browse Store
                            </button>
                            <button className="px-8 py-3 border border-[var(--color-brand-orange)]/30 text-[var(--color-surface-light)] rounded-full font-semibold hover:border-[var(--color-brand-orange)] transition-all duration-300">
                                View Categories
                            </button>
                        </motion.div> */}
                    </div>
                </div>
            </motion.section>

            <div className="container mx-auto px-4 py-7 mb-12">
                <div className="flex flex-wrap gap-4 justify-center">
                    {[
                        { id: "all", label: "All" },
                        { id: "ebooks", label: "Ebooks & Guides" },
                        { id: "courses", label: "Courses & Masterclasses" },
                        { id: "digital", label: "Digital Products" },
                        { id: "templates", label: "Templates & Toolkits" }
                    ].map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
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
            </div>

            {/* Featured Projects Section */}
            <section className="py-8 md:py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    {(() => {
                        const filteredProjects = featuredProjects.filter(project => 
                            activeFilter === "all" || project.category === activeFilter
                        );
                        
                        if (filteredProjects.length === 0) {
                            return (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16"
                                >
                                    <h3 className="text-2xl font-bold text-[var(--color-surface-light)] mb-4">
                                        No items found in {activeFilter} category
                                    </h3>
                                    <p className="text-[var(--color-surface-light)]/70 mb-6">
                                        Try selecting a different category or check back later for new additions
                                    </p>
                                    <button 
                                        onClick={() => setActiveFilter("all")}
                                        className="px-6 py-2 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] rounded-full hover:bg-[var(--color-brand-orange)]/20 transition-all"
                                    >
                                        View All Projects
                                    </button>
                                </motion.div>
                            );
                        }

                        return (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProjects.map((project) => {
                                  const { text, icon } = getCTAByCategory(project.category); // Get CTA here!
                                  return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/20 rounded-xl p-6 backdrop-blur-sm flex flex-col h-full"
                                    >
                                        {/* Project Thumbnail */}
                                        <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-[var(--color-brand-orange)]/10">
                                            <img
                                                src={project.thumbnail}
                                                alt={project.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Project Info */}
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold text-[var(--color-surface-light)] mb-2">
                                                {project.name}
                                            </h3>
                                            <p className="text-[var(--color-surface-light)]/70 mt-3 mb-4">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tags - Now positioned at the bottom before the button */}
                                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                                            {project.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] rounded-full text-sm"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* View Project Button */}
                                        
                                        <a 
                                            href={project.link}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-full px-4 cursor-pointer py-2 border border-[var(--color-brand-orange)] text-[var(--color-surface-light)] rounded-lg font-medium hover:bg-[var(--color-brand-orange)]/10 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            {text} {icon}
                                        </a>
                                    </motion.div>
                                  );
                                })}
                            </div>
                        );
                    })()}
                </div>
            </section>
        </div>
    );
};

export default Store;
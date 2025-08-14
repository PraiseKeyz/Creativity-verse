import { motion } from 'framer-motion';

const Features = () => {
  return (
    <div className="pt-32 bg-[var(--color-text-dark)]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[25vh] lg:min-h-[45vh] flex items-center"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-gradient-to-bl from-[var(--color-brand-orange)]/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6"
            >
              Unlock Your Creative Potential
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-[var(--color-surface-light)]/80 leading-relaxed"
            >
              At Creativity Verse, we don't just give you tools we give you a thriving space to create, connect, and grow. Whether you're a digital artist, developer, designer, or storyteller, our platform is packed with features that fuel your creative journey from idea to impact.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Real-Time Collaboration Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl">🎯</span>
                <h2 className="text-3xl font-bold text-[var(--color-brand-orange)]">
                  Real-Time Collaboration
                </h2>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-semibold text-[var(--color-surface-light)]"
              >
                Create Together, From Anywhere
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[var(--color-surface-light)]/80 leading-relaxed"
              >
                Build projects with others in real time no matter where you are. Collaborate on design files, coding projects, or multimedia workspaces with seamless sync and shared progress. Whether you're starting something new or joining an open collaboration, Creativity Verse makes teamwork easy and intuitive.
              </motion.p>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-auto text-[var(--color-brand-orange)]"
              >
                {/* Large collaboration icon - simplified example */}
                <circle cx="100" cy="100" r="80" className="fill-current opacity-10" />
                <circle cx="70" cy="100" r="20" className="fill-current" />
                <circle cx="130" cy="100" r="20" className="fill-current" />
                <path d="M70 120 L130 120" className="stroke-current stroke-2" fill="none" />
              </svg>
              
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-brand-orange)]/20 to-transparent rounded-3xl blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Learning Hub Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-5 relative bg-gradient-to-br from-[var(--color-brand-orange)]/5 to-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative z-10">
                <svg 
                  viewBox="0 0 240 240" 
                  className="w-full h-auto text-[var(--color-brand-orange)]"
                >
                  {/* Book shape */}
                  <path 
                    d="M40 60 L200 60 L200 180 L40 180 C30 180 20 170 20 160 L20 80 C20 70 30 60 40 60" 
                    className="fill-current opacity-10"
                  />
                  {/* Pages */}
                  <path 
                    d="M40 70 L180 70 L180 170 L40 170" 
                    className="fill-none stroke-current stroke-2"
                  />
                  {/* Sparkles */}
                  <circle cx="160" cy="90" r="5" className="fill-current"/>
                  <circle cx="140" cy="120" r="5" className="fill-current"/>
                  <circle cx="170" cy="140" r="5" className="fill-current"/>
                </svg>
              </div>
              
              {/* Animated gradient background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-orange)]/20 to-transparent rounded-3xl blur-2xl"
              />
            </motion.div>

            {/* Content - Right Side */}
            <div className="space-y-6 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl">📚</span>
                <h2 className="text-3xl font-bold text-[var(--color-brand-orange)]">
                  Learning Hub
                </h2>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-semibold text-[var(--color-surface-light)]"
              >
                Level Up Your Skills
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[var(--color-surface-light)]/80 leading-relaxed"
              >
                Access a growing library of tutorials, guided projects, and live workshops curated by experts in various fields. Whether you're brushing up your UI design, learning animation, or diving into app development, you'll find content tailored to your pace and style.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl font-medium text-[var(--color-brand-orange)]"
              >
                ✨ Learn by doing. Grow by sharing.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Creator Profiles Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl">🎨</span>
                <h2 className="text-3xl font-bold text-[var(--color-brand-orange)]">
                  Creator Profiles
                </h2>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-semibold text-[var(--color-surface-light)]"
              >
                Showcase Your Creative Identity
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[var(--color-surface-light)]/80 leading-relaxed"
              >
                Every creator gets a personalized space to shine. Build your profile, upload your portfolio, highlight your skills, and tell your story. Let other users discover your work, follow your journey, and connect with you on shared interests or projects.
              </motion.p>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-[var(--color-text-dark)]/50 p-8 rounded-2xl border border-[var(--color-brand-orange)]/20 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/50"></div>
                  <div>
                    <h4 className="text-xl font-semibold text-[var(--color-surface-light)]">Creative Soul</h4>
                    <p className="text-[var(--color-surface-light)]/60">Digital Artist & Developer</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-3/4 bg-[var(--color-brand-orange)]/20 rounded-full"></div>
                  <div className="h-3 w-full bg-[var(--color-brand-orange)]/20 rounded-full"></div>
                  <div className="h-3 w-2/3 bg-[var(--color-brand-orange)]/20 rounded-full"></div>
                </div>
                <div className="mt-6 flex gap-3">
                  <div className="w-20 h-20 rounded-lg bg-[var(--color-brand-orange)]/20"></div>
                  <div className="w-20 h-20 rounded-lg bg-[var(--color-brand-orange)]/20"></div>
                  <div className="w-20 h-20 rounded-lg bg-[var(--color-brand-orange)]/20"></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-orange)]/20 to-transparent rounded-3xl blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

            {/* Showcase & Recognition Section */}
            <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 relative bg-gradient-to-br from-[var(--color-brand-orange)]/5 to-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gradient-to-br from-[var(--color-brand-orange)]/30 to-[var(--color-brand-orange)]/10 rounded-xl backdrop-blur-sm border border-[var(--color-brand-orange)]/20"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-[var(--color-brand-orange)]/5 rounded-xl backdrop-blur-sm border border-[var(--color-brand-orange)]/20"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-[var(--color-brand-orange)]/5 rounded-xl backdrop-blur-sm border border-[var(--color-brand-orange)]/20"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gradient-to-br from-[var(--color-brand-orange)]/25 to-[var(--color-brand-orange)]/10 rounded-xl backdrop-blur-sm border border-[var(--color-brand-orange)]/20"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-orange)]/20 to-transparent rounded-3xl blur-xl -z-10"></div>
              </div>
            </motion.div>

            {/* Content - Right Side */}
            <div className="space-y-6 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl">📢</span>
                <h2 className="text-3xl font-bold text-[var(--color-brand-orange)]">
                  Showcase & Recognition
                </h2>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-semibold text-[var(--color-surface-light)]"
              >
                Shine in the Spotlight
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[var(--color-surface-light)]/80 leading-relaxed"
              >
                We love celebrating our creators. Submit your best work to be featured on our homepage, social channels, or monthly spotlight series. It's your time to shine and get discovered.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-orange)_0%,_transparent_70%)] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 left-10 w-32 h-32 bg-[var(--color-brand-orange)]/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-10 right-10 w-40 h-40 bg-[var(--color-brand-orange)]/10 rounded-full blur-xl"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] via-[var(--color-brand-orange)] to-[var(--color-surface-light)] bg-clip-text text-transparent">
                  Everything You Need — In One Space
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-[var(--color-surface-light)]/80 leading-relaxed"
              >
                No more bouncing between platforms or working in isolation. Creativity Verse brings all your creative needs into one empowering environment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.a
                  href='https://chat.whatsapp.com/JqNVGVdY5aLE5S92u5ZJ16'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-[var(--color-brand-orange)] rounded-xl font-semibold text-lg text-[var(--color-surface-light)] overflow-hidden"
                >
                  <span className="relative z-10">Join the Community</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-orange)] to-[#E65100] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </motion.a>

                <motion.a
                  href="/resources"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 border-2 border-[var(--color-brand-orange)] rounded-xl font-semibold text-lg text-[var(--color-surface-light)] overflow-hidden"
                >
                  <span className="relative z-10">Explore Projects</span>
                  <div className="absolute inset-0 bg-[var(--color-brand-orange)]/0 group-hover:bg-[var(--color-brand-orange)]/10 transition-colors duration-300"></div>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Features;
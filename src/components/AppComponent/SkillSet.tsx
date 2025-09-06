import { motion } from "framer-motion";

const skillItems = [
	{
		icon: "💡",
		title: "Brand Strategy & Identity",
		description: "Shaping bold brand stories that spark connection and growth.",
	},
	{
		icon: "💸",
		title: "Entrepreneurship & Monetization",
		description: "Empowering freelancers and startups to build real digital income streams.",
	},
	{
		icon: "👥",
		title: "Community & Collaboration Design",
		description: "Creating inclusive ecosystems that unlock opportunities for all.",
	},
	{
		icon: "✏️",
		title: "Creative Direction & Content",
		description: "Bringing ideas to life through stunning visuals and storytelling.",
	},
];

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			delayChildren: 0.2,
		},
	},
};

export default function SkillsetSection() {
	return (
		<section className="py-24 container mx-auto px-4 relative z-10 ">
			<h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-12">Our Skillset</h2>
			<motion.div
				variants={container}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto px-4"
			>
				{skillItems.map((skill, index) => (
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
								{skill.icon}
							</div>
							<h3 className="text-xl font-semibold text-[var(--color-brand-orange)] mb-2">
								{skill.title}
							</h3>
							<p className="text-[var(--color-surface-light)]/70">
								{skill.description}
							</p>
						</div>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}



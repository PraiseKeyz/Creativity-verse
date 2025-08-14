import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaBullhorn, FaUsers, FaUserCheck, FaStar, FaChalkboardTeacher, FaFileAlt } from "react-icons/fa";

const iconMap: { [key: string]: React.ReactNode } = {
  "Talent Matchmaking & Hiring": <FaUserTie className="text-3xl text-[var(--color-brand-orange)]" />,
  "Brand Promotion & Sponsorship": <FaBullhorn className="text-3xl text-[var(--color-brand-orange)]" />,
  "Creative Studio Services": <FaUsers className="text-3xl text-[var(--color-brand-orange)]" />,
  "Verified Talent Program": <FaUserCheck className="text-3xl text-[var(--color-brand-orange)]" />,
  "Creativity Verse Pro": <FaStar className="text-3xl text-[var(--color-brand-orange)]" />,
  "Direct Mentorship": <FaChalkboardTeacher className="text-3xl text-[var(--color-brand-orange)]" />,
  "Resume & Portfolio Services": <FaFileAlt className="text-3xl text-[var(--color-brand-orange)]" />,
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    fetch('/Data/services.json')
      .then((res) => res.json())
      .then((data) => {
        const found = (data.services || []).find((s: any) =>
          s.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') === id
        );
        setService(found);
      });
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-text-dark)]">
        <span className="text-[var(--color-brand-orange)] text-xl">Loading...</span>
      </div>
    );
  }

  // Card component (two-column, icon-left)
  const Card = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-black/60 border border-[var(--color-brand-orange)]/20 shadow-lg mb-10"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0.2 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="absolute -top-10 -right-10 w-40 h-40 md:w-56 md:h-56 rounded-full bg-[var(--color-brand-orange)]/20 blur-2xl z-0"
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-6 px-6 py-6">
        <motion.div
          initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10, duration: 0.8 }}
          whileHover={{ scale: 1.15, rotate: 8, filter: 'drop-shadow(0 0 16px var(--color-brand-orange))' }}
          className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent shadow-lg mb-4 md:mb-0"
        >
          {icon}
        </motion.div>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-[var(--color-brand-orange)] mb-2">{title}</h3>
          <div className="text-[var(--color-surface-light)]/90 text-base md:text-lg">{children}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col-reverse md:flex-row items-center min-h-[60vh] md:min-h-[40vh] lg:min-h-[60vh] mb-12 py-30 gap-8">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6"
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:text-xl text-[var(--color-surface-light)]/80 mb-2"
            >
              {service.overview}
            </motion.p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 10, duration: 0.8 }}
              whileHover={{ scale: 1.08, rotate: 8, filter: 'drop-shadow(0 0 24px var(--color-brand-orange))' }}
              className="w-40 h-40 md:w-56 md:h-56 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-orange)]/20 to-transparent shadow-lg"
            >
              {iconMap[service.title] || <FaStar className="text-[7rem] text-[var(--color-brand-orange)]" />}
            </motion.div>
          </div>
        </div>
        
        {/* Render other sections as cards if present */}
        <div className="grid md:grid-col-2">
        {service.whoItsFor && (
          <Card icon={<FaUsers className="text-2xl text-[var(--color-brand-orange)]" />} title="Who It's For">
            <ul className="list-disc ml-6">
              {service.whoItsFor.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.keyBenefits && (
          <Card icon={<FaStar className="text-2xl text-[var(--color-brand-orange)]" />} title="Key Benefits">
            <ul className="list-disc ml-6">
              {service.keyBenefits.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.howItWorks && (
          <Card icon={<FaChalkboardTeacher className="text-2xl text-[var(--color-brand-orange)]" />} title="How It Works">
            <ol className="list-decimal ml-6">
              {service.howItWorks.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ol>
          </Card>
        )}
        {service.features && (
          <Card icon={<FaBullhorn className="text-2xl text-[var(--color-brand-orange)]" />} title="Features">
            <ul className="list-disc ml-6">
              {service.features.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.services && (
          <Card icon={<FaUsers className="text-2xl text-[var(--color-brand-orange)]" />} title="Services">
            <ul className="list-disc ml-6">
              {service.services.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.whatYouGet && (
          <Card icon={<FaFileAlt className="text-2xl text-[var(--color-brand-orange)]" />} title="What You Get">
            <ul className="list-disc ml-6">
              {service.whatYouGet.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.optionalAddOns && (
          <Card icon={<FaStar className="text-2xl text-[var(--color-brand-orange)]" />} title="Optional Add-Ons">
            <ul className="list-disc ml-6">
              {service.optionalAddOns.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.engagementModels && (
          <Card icon={<FaUsers className="text-2xl text-[var(--color-brand-orange)]" />} title="Engagement Models">
            <ul className="list-disc ml-6">
              {service.engagementModels.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.pastWork && (
          <Card icon={<FaFileAlt className="text-2xl text-[var(--color-brand-orange)]" />} title="Past Work">
            <ul className="list-disc ml-6">
              {service.pastWork.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        {service.testimonials && (
          <Card icon={<FaStar className="text-2xl text-[var(--color-brand-orange)]" />} title="Testimonials">
            <ul className="list-disc ml-6">
              {service.testimonials.map((item: any, i: number) => <li key={i}><span className="italic">"{item.quote}"</span> <span className="block text-xs text-[var(--color-surface-light)]/60">— {item.author}</span></li>)}
            </ul>
          </Card>
        )}
        {service.faq && (
          <Card icon={<FaChalkboardTeacher className="text-2xl text-[var(--color-brand-orange)]" />} title="FAQ">
            <ul className="list-disc ml-6">
              {service.faq.map((item: any, i: number) => <li key={i}><span className="font-semibold">Q:</span> {item.q}<br /><span className="font-semibold">A:</span> {item.a}</li>)}
            </ul>
          </Card>
        )}
        {service.pricing && (
          <Card icon={<FaFileAlt className="text-2xl text-[var(--color-brand-orange)]" />} title="Pricing">
            <ul className="list-disc ml-6">
              {Object.entries(service.pricing).map(([k, v]) => <li key={k}><span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>: {String(v)}</li>)}
            </ul>
          </Card>
        )}
        {service.bundleAddOns && (
          <Card icon={<FaStar className="text-2xl text-[var(--color-brand-orange)]" />} title="Bundle Add-Ons">
            <ul className="list-disc ml-6">
              {service.bundleAddOns.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </Card>
        )}
        </div>
        {/* CTA Button */}
        <div className="flex justify-center mb-10">
          <Link
            to="/contact"
            className="px-8 py-4 bg-[var(--color-brand-orange)] text-[var(--color-text-dark)] rounded-lg font-semibold hover:bg-[var(--color-brand-orange)]/90 transition-colors shadow-lg text-lg"
          >
            {service.cta}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;


// Due to the services having different structure i had to structure the code like that so any service that doesn't have a specific section will not render that section, it will only render what it has.
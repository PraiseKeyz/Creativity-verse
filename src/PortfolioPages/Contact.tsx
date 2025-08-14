import { motion } from "framer-motion";
import { useState } from "react";
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/contactus`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            setFormData({
                email: "",
                name: "",
                message: "",
                subject: ""
            })
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-[var(--color-text-dark)] min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-[60vh] flex items-center py-8 md:py-12 lg:py-16 overflow-hidden"
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
                            Let's Create Together
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-[var(--color-surface-light)]/80 mb-8"
                        >
                            Have questions or ideas? We'd love to hear from you. Reach out and let's make something amazing.
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            {/* Contact Form Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start lg:justify-center">
                        <div className="w-full lg:w-1/2 max-w-2xl">
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                onSubmit={handleSubmit}
                                className="bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-xl relative overflow-hidden"
                            >
                                {/* Decorative elements */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-brand-orange)]/10 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--color-brand-orange)]/10 rounded-full blur-3xl"></div>
                                
                                <div className="relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-[var(--color-surface-light)] mb-2 font-medium">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-[var(--color-surface-light)] mb-2 font-medium">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="subject" className="block text-[var(--color-surface-light)] mb-2 font-medium">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div className="mb-8">
                                        <label htmlFor="message" className="block text-[var(--color-surface-light)] mb-2 font-medium">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300 resize-none"
                                            required
                                        ></textarea>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-8 py-4 bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/80 text-[var(--color-text-dark)] rounded-lg font-semibold hover:from-[var(--color-brand-orange)]/90 hover:to-[var(--color-brand-orange)]/70 transition-all duration-300 shadow-lg shadow-[var(--color-brand-orange)]/20 cursor-pointer"
                                    >
                                        Send Message
                                    </motion.button>
                                </div>
                            </motion.form>
                        </div>
                        
                        <motion.div 
                            className="w-full lg:w-1/2 max-w-2xl relative"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-orange)]/10 to-transparent rounded-2xl"></div>
                            <div className="relative z-10 ">
                                <h2 className=" text-2xl md:text-3xl font-semibold text-[var(--color-brand-orange)]">Find us</h2>
                                <div className="flex flex-col gap-6 pt-4 ">
                                    {/* <div className=" w-full p-5 rounded-2xl bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/30 flex items-center">
                                        <div>
                                            <h3 className="mb-1 text-base font-semibold text-[var(--color-brand-orange)]">Call Us</h3>
                                            <p className="text-xs text-[var(--color-surface-light)]/80"><a href="tel:+2348012323445">08012323445</a></p>
                                        </div>
                                    </div> // just incase we get to add a number later on */}
                                    <div className="p-5 rounded-2xl bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/30 flex items-center">
                                        <div>
                                            <h3 className="mb-1 text-base font-semibold text-[var(--color-brand-orange)]">Connect with Us</h3>
                                            <div className="flex gap-4 items-center">
                                                <a target="_blank" href="https://m.facebook.com/profile.php?id=61575915544608&name=xhp_nt_fbaction_open_user" className="transition-colors text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)]">
                                                    <FaFacebookF size={22} />
                                                </a>
                                                <a target="_blank" href="https://www.instagram.com/creativity_verse/igsh=ajEwcDdsMGFyMzF0" className="transition-colors text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)]">
                                                    <FaInstagram size={22} />
                                                </a>
                                                <a target="_blank" href="https://chat.whatsapp.com/JqNVGVdY5aLE5S92u5ZJ16" className="transition-colors text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)]">
                                                    <FaWhatsapp size={22} />
                                                </a>
                                                <a target="_blank" href="https://www.linkedin.com/company/creativity-verse/" className="transition-colors text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)]">
                                                    <FaLinkedinIn size={22} />
                                                </a>
                                                <a target="_blank" href="https://t.me/mycreativityverse/" className="transition-colors text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)]">
                                                    <FaTelegramPlane size={22} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/30 flex items-center">
                                        <div>
                                            <h3 className="mb-1 text-base font-semibold text-[var(--color-brand-orange)]">Email Now</h3>
                                            <p className="text-xs text-[var(--color-surface-light)]/80"><a href="mailto:info@creativityverse.com">info@creativityverse.com</a></p>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/30 flex items-center">
                                        <div>
                                            <h3 className="mb-1 text-base font-semibold text-[var(--color-brand-orange)]">Office Address</h3>
                                            <p className="text-xs text-[var(--color-surface-light)]/80">Km 45/46 Lekki-Epe Expressway<br />Ibeju-Lekki LGA<br />Lagos, Nigeria</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
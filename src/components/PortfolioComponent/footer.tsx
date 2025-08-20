import logo from '../../assets/logo2.png'
import fbIcon from "../../assets/icon-facebook.svg";
import IgIcon from "../../assets/icon-instagram.svg";
import WhatsappIcon from "../../assets/whatsapp.svg";
import LinkedinIcon from "../../assets/linkedin.svg";
import telegramIcon from "../../assets/telegram.svg";

const Footer = () => {
    return (
        <footer className="bg-[var(--color-text-dark)] border-t border-[var(--color-brand-orange)]/20">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 place-items-center md:place-items-start text-center md:text-left">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <img src={logo} alt="logo" className='w-25 h-25 mx-auto ' />
                        <p className="text-[var(--color-surface-light)]/70">Fueling the Future of Creativity, Innovation & Tech.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-[var(--color-brand-orange)] mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {[ { id: "1", page: "Home", link: "/" }, { page: "About", link: "/about" }, { page: "Features", link: "/features" }, { page: "Showcase", link: "/showcase" }, { page: "Services", link: "/services" }].map((item) => (
                                <li key={item.id}>
                                    <a href={item.link} className="text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)] transition-colors">
                                        {item.page}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold text-[var(--color-brand-orange)] mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {[{ id: "1", page: "Blogs", link: "/resources/blogs" },  { id: "2", page: "Support", link: "/contact" }].map((item) => (
                                <li key={item.id}>
                                    <a href={item.link} className="text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)] transition-colors">
                                        {item.page}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-[var(--color-brand-orange)] mb-4">Connect</h4>
                        <div className="flex gap-4 items-center">
                            <a target="_" href="https://m.facebook.com/profile.php?id=61575915544608&name=xhp_nt_fbaction_open_user"><img src={fbIcon} alt="" /></a>
                            <a target="_" href="https://www.instagram.com/creativity_verse/igsh=ajEwcDdsMGFyMzF0"><img src={IgIcon} alt="" /></a>
                            <a target="_" href="https://chat.whatsapp.com/JqNVGVdY5aLE5S92u5ZJ16"><img width={20} src={WhatsappIcon} alt="" /></a>
                            <a target="_" href="https://www.linkedin.com/company/creativity-verse/"><img width={20} src={LinkedinIcon} alt="" /></a>
                            <a target="_" href="https://t.me/mycreativityverse/"><img width={20} src={telegramIcon} alt="" /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[var(--color-brand-orange)]/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[var(--color-surface-light)]/70 text-sm">
                            © 2025 Creativity Verse. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)] text-sm">Privacy Policy</a>
                            <a href="#" className="text-[var(--color-surface-light)]/70 hover:text-[var(--color-brand-orange)] text-sm">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import logo from '../../assets/logo2.png'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPlatformOpen, setIsPlatformOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
    
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [isMenuOpen]);

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
            isScrolled 
            ? 'bg-gradient-to-r from-[var(--color-text-dark)]/80 via-black/70 to-[var(--color-text-dark)]/80 backdrop-blur-md shadow-lg border-b border-[var(--color-brand-orange)]/20' 
            : 'bg-transparent'
        }`}>
            <div className='container mx-auto px-4 py-3 flex items-center'>
                <Link to='/' className="flex-shrink-0 mr-4">
                    <img src={logo} alt="Logo" className={`w-16 md:w-[7rem] h-16 md:h-[4.5rem] object-cover transition-transform duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`} />
                </Link>

                {/* Desktop Navigation */}
                <nav className='hidden md:block flex-grow'>
                    <ul className='flex justify-center md:space-x-4 lg:space-x-8'>
                        <li><Link to="/" className='text-[var(--color-surface-light)] md:text-base lg:text-lg hover:text-[var(--color-brand-orange)] transition-colors'>Home</Link></li>
                        <li onClick={() => setIsDropDownOpen(!isDropDownOpen)} className="relative">
                            <div className="flex items-center md:text-base lg:text-lg gap-1 text-[var(--color-surface-light)] hover:text-[var(--color-brand-orange)] transition-colors cursor-pointer">
                                About
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="14" 
                                    height="14" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className={`transform group-hover:rotate-180 transition-transform duration-200 ${isDropDownOpen && 'rotate-180'}`}
                                >
                                    <path d="m6 9 6 6 6-6"/>
                                </svg>
                            </div>
                            
                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-0 mt-2 w-48 opacity-0 invisible ${isDropDownOpen && 'opacity-100 visible'} transition-all duration-200 bg-gradient-to-b from-[var(--color-text-dark)]/95 to-black/95 backdrop-blur-lg rounded-lg border border-[var(--color-brand-orange)]/20 shadow-lg shadow-black/50 overflow-hidden`}>
                                <Link to="/about" className='block px-4 py-2 text-lg text-[var(--color-surface-light)] hover:bg-[var(--color-brand-orange)]/10 hover:text-[var(--color-brand-orange)] transition-colors'>About Us</Link>
                                <Link to="/features" className='block px-4 py-2 text-lg text-[var(--color-surface-light)] hover:bg-[var(--color-brand-orange)]/10 hover:text-[var(--color-brand-orange)] transition-colors'>Features</Link>
                                <Link to="/services" className='block px-4 py-2 text-lg text-[var(--color-surface-light)] hover:bg-[var(--color-brand-orange)]/10 hover:text-[var(--color-brand-orange)] transition-colors'>Services</Link>
                            </div>
                        </li>
                        <li><Link to="/showcase" className='text-[var(--color-surface-light)] md:text-base lg:text-lg hover:text-[var(--color-brand-orange)] transition-colors'>Showcase</Link></li>
                        <li><Link to="/resources" className='text-[var(--color-surface-light)] md:text-base lg:text-lg hover:text-[var(--color-brand-orange)] transition-colors'>Resources</Link></li>
                        <li><Link to="/store" className='text-[var(--color-surface-light)] md:text-base lg:text-lg hover:text-[var(--color-brand-orange)] transition-colors'>Store</Link></li>
                        <li><Link to="/contact" className='text-[var(--color-surface-light)] md:text-base lg:text-lg hover:text-[var(--color-brand-orange)] transition-colors'>Contact</Link></li>
                    </ul>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0 ml-4">
                    <Link to='/signup' className={`px-3 py-1.5 md:text-sm lg:text-base rounded-md transition-all whitespace-nowrap bg-[var(--color-brand-orange)]`}>
                        Sign Up
                    </Link>
                    <Link to='/signin' className={`px-3 py-1.5 md:text-sm lg:text-base rounded-md transition-all whitespace-nowrap border border-[var(--color-brand-orange)]/30 text-[var(--color-surface-light)] hover:border-[var(--color-brand-orange)]`}>
                        Sign In
                    </Link>
                </div>

                <button
                    className="md:hidden text-[var(--color-brand-orange)] focus:outline-none z-50  cursor-pointer ml-auto"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen 
                                ? "M6 18L18 6M6 6l12 12"
                                : "M4 6h16M4 12h16m-7 6h7"
                            }
                        ></path>
                    </svg>
                </button>

                {/* Mobile Navigation */}
                    <div className={`md:hidden fixed inset-0 bg-[var(--color-text-dark)]/95 backdrop-blur-lg pt-32 h-screen transition-transform duration-300 ease-in-out overflow-hidden  ${
                        isMenuOpen ? 'translate-x-0'
                         : 'translate-x-[-100%]'
                    }`}>
                <nav className='container mx-auto px-4'>
                    <ul className='space-y-8 flex flex-col items-center'>
                        <li><Link onClick={() => setIsMenuOpen(false)} to="/" className='text-[var(--color-surface-light)] text-xl hover:text-[var(--color-brand-orange)] transition-colors'>Home</Link></li>
                        <li className="relative">
                            <div 
                                onClick={() => setIsPlatformOpen(!isPlatformOpen)} 
                                className="flex items-center text-xl gap-1 text-[var(--color-surface-light)] hover:text-[var(--color-brand-orange)] transition-colors cursor-pointer"
                            >
                                About Us
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className={`transform transition-transform duration-200 ${isPlatformOpen ? 'rotate-180' : ''}`}
                                >
                                    <path d="m6 9 6 6 6-6"/>
                                </svg>
                            </div>
                            
                            {/* Dropdown Menu */}
                            <div className={`absolute top-full left-0 mt-2 w-48 transition-all duration-200 bg-gradient-to-b from-[var(--color-text-dark)]/95 to-black/95 backdrop-blur-lg rounded-lg border border-[var(--color-brand-orange)]/20 shadow-lg shadow-black/50 overflow-hidden ${
                                isPlatformOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                            }`}>
                                <Link 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsPlatformOpen(false);
                                    }} 
                                    to="/about" 
                                    className='block px-4 py-2 text-xl text-[var(--color-surface-light)] hover:bg-[var(--color-brand-orange)]/10 hover:text-[var(--color-brand-orange)] transition-colors'
                                >
                                    About
                                </Link>
                                <Link 
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsPlatformOpen(false);
                                    }} 
                                    to="/features" 
                                    className='block px-4 py-2 text-xl text-[var(--color-surface-light)] hover:bg-[var(--color-brand-orange)]/10 hover:text-[var(--color-brand-orange)] transition-colors'
                                >
                                    Features
                                </Link>
                            </div>
                        </li>
                        <li><Link onClick={() => setIsMenuOpen(false)} to="/showcase" className='text-[var(--color-surface-light)] text-xl hover:text-[var(--color-brand-orange)] transition-colors'>Showcase</Link></li>
                        <li><Link onClick={() => setIsMenuOpen(false)} to="/services" className='text-[var(--color-surface-light)] text-xl hover:text-[var(--color-brand-orange)] transition-colors'>Services</Link></li>
                        <li><Link onClick={() => setIsMenuOpen(false)} to="/resources" className='text-[var(--color-surface-light)] text-xl hover:text-[var(--color-brand-orange)] transition-colors'>Resources</Link></li>
                        <li><Link onClick={() => setIsMenuOpen(false)} to="/store" className='text-[var(--color-surface-light)] text-xl hover:text-[var(--color-brand-orange)] transition-colors'>Store</Link></li>
                        <li><Link onClick={() => setIsMenuOpen(false)} to="/contact" className='text-[var(--color-surface-light)] text-xl hover:text-[var(--color-brand-orange)] transition-colors'>Contact</Link></li>
                    </ul>
                    <div className='mt-12 flex flex-col items-center gap-4'>
                                <button onClick={() => setIsMenuOpen(false)} className='px-8 py-3 text-lg text-[var(--color-surface-light)] hover:text-[var(--color-brand-orange)] transition-colors duration-300'>
                                    <Link  to='/signin'>Sign In</Link>
                                </button>
                                <button onClick={() => setIsMenuOpen(false)} className='px-8 py-3 text-lg bg-[var(--color-brand-orange)] text-[var(--color-text-dark)] rounded-full hover:bg-[var(--color-brand-orange)]/90 transition-all duration-300'>
                                    Sign <Link to='/signup'>Up</Link>
                                </button>
                     </div>
                </nav>
                    </div>
            </div>
        </header>
    );
}

export default Header;
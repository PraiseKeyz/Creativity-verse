import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

interface PopUpProps {
  show: boolean;
  onClose: () => void;
}

const PopUp = ({ show, onClose }: PopUpProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
});
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};


  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const response = await axios.post(`${API_BASE_URL}/api/posts`, formData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          console.log(response.data);
          setFormData({
              email: "",
              name: ""
          })
      } catch (error) {
          console.error("Error submitting form:", error);
      }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-black/60 to-[var(--color-brand-orange)]/10 border border-[var(--color-brand-orange)]/20 rounded-2xl p-8 max-w-md w-full relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 cursor-pointer text-[var(--color-surface-light)]/60 hover:text-[var(--color-surface-light)] transition-colors"
              aria-label="Close pop-up"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-brand-orange)]/30 to-[var(--color-brand-orange)]/10 animate-pulse">
                <span className="text-4xl">📧</span>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-brand-orange)] mb-2">Subscribe to Our Newsletter!</h2>
              <p className="text-[var(--color-surface-light)]/80 mb-6 text-base">
                Be the first to get updates, tools, and exclusive insider content.
                <br />
                Enter your email below to join our newsletter and unlock your creative potential!
              </p>
              <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-brand-orange)]/30 bg-[var(--color-text-dark)]/60 text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-brand-orange)]/30 bg-[var(--color-text-dark)]/60 text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:outline-none transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 cursor-pointer bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/80 text-[var(--color-text-dark)] rounded-lg font-semibold hover:from-[var(--color-brand-orange)]/90 hover:to-[var(--color-brand-orange)]/70 transition-all duration-300 shadow-lg shadow-[var(--color-brand-orange)]/20"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopUp;

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // simulate API call
      setSubmitted(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh*0.5)] bg-[var(--color-text-dark)] px-4">
      {!submitted ? (
        <div className="bg-[#131212] border border-[var(--color-brand-orange)]/30 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fadeIn">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent text-center">
            Forgot Password
          </h1>
          <p className="text-[var(--color-surface-light)]/70 text-sm text-center mt-2">
            Enter your email address to reset your password
          </p>

        
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-[var(--color-surface-light)]/80">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full mt-1 px-3 py-2 bg-[var(--color-text-dark)]/60 border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/80 text-[var(--color-text-dark)] py-2 rounded-lg font-semibold hover:from-[var(--color-brand-orange)]/90 hover:to-[var(--color-brand-orange)]/70 transition-all border border-[var(--color-brand-orange)]/30 shadow-lg active:scale-95 duration-100 cursor-pointer"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center gap-2 bg-[#131212] border border-[var(--color-brand-orange)]/30 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fadeIn">
          <FaCheckCircle className="text-green-400 text-4xl mb-2" />
          <p className="text-white text-center text-base font-semibold">
            Success! If the email exists, a reset link has been sent.
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
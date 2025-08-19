import  { useState } from "react";

const EmailVerification = () => {
  const [email, setEmail] = useState("hamza@app.com");
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };


  return (
    <main className="min-h-[calc(100vh*0.5)] bg-[#0d0d0d] flex items-center justify-center px-4 font-sans">
      <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 rounded-full border-4 border-[var(--color-brand-orange)] animate-spin"></div>
        </div>

        <h1 className="text-xl font-bold text-white mb-2">Please verify your email</h1>
        <p className="text-gray-400 text-sm">
          We just sent an email to <span className="text-white font-medium">{email}</span>. <br />
          Click the link in the email to verify your account.
        </p>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={handleResend}
              className="w-full bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/80 text-[var(--color-text-dark)] py-2 rounded-lg font-semibold hover:from-[var(--color-brand-orange)]/90 hover:to-[var(--color-brand-orange)]/70 transition-all border border-[var(--color-brand-orange)]/30 shadow-lg active:scale-95 duration-100 cursor-pointer"
            >
              {resent ? "Sent!" : "Resend email"}
            </button>
          </div>
      </div>
    </main>
  );
};

export default EmailVerification;

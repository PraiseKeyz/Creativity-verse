import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyTimer = setTimeout(() => setVerifying(false), 5000);
    let redirectTimer: ReturnType<typeof setTimeout>;
    if (!verifying) {
      redirectTimer = setTimeout(() => navigate("/verse/user-profile"), 2000);
    }
    return () => {
      clearTimeout(verifyTimer);
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [verifying, navigate]);

  return (
    <main className="min-h-[calc(100vh*0.5)] bg-[#0d0d0d] flex items-center justify-center px-4 font-sans">
      <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md w-full max-w-md text-center">
        {verifying ? (
          <>
            <div className="flex justify-center mb-4">
              <svg
                className="animate-spin h-10 w-10 text-[var(--color-brand-orange)] mx-auto"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white mb-2">
              Please wait, your email is being verified...
            </h1>
            <p className="text-gray-400 text-sm">This may take a few seconds.</p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4 text-green-400">
              <FaCheckCircle size={48} />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">
              Email Verified Successfully
            </h1>
            <p className="text-gray-400 text-sm">
              Your email has been successfully verified. Redirecting you to your
              dashboard...
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default EmailVerificationSuccess;
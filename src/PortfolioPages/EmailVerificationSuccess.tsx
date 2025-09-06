import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import LoadingSpin from "../components/PortfolioComponent/LoadingSpin";

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
            <LoadingSpin />
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
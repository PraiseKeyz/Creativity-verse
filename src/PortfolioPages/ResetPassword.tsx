import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// pls ensure to add a user specific code as a parameter to be able to reset password for the user, and the code would expire after sometime, if the code is not valid, the user should be redirected to the forgot password page
// and the user should be able to reset password only once with the same code, if the user tries to reset password again with the same code, the user should be redirected to the forgot password page


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd: string) => {
    // Allow more special characters
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && validatePassword(password)) {
      setSubmitted(true);
      setTimeout(() => navigate("/verse/user-profile"), 2000); // redirect after success
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 font-sans">
      <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center">Reset Password</h1>
        <p className="text-gray-400 text-sm text-center mt-2">
          Enter your new password below
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-400">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)]"
              />
              {!validatePassword(password) && password.length > 0 && (
                <p className="text-xs text-red-400 mt-1">
                  Password must be at least 8 characters and include letters, numbers, and a special character.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full mt-1 px-3 py-2 bg-[#262626] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-orange)]"
              />
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-brand-orange)] hover:bg-black hover:border hover:border-[var(--color-brand-orange)] text-white py-2 rounded-md transition-colors"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-green-400 text-sm font-medium">
              Your password has been successfully updated. Redirecting...
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;

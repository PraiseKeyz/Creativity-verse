import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/constants";
import { RegisterRequest } from "../store/types/apiTypes";
import { useAuthStore } from "../store/authStore";

const countryList = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United States",
  "United Kingdom",
  "Canada",
  "India",
  "Germany",
  "France",
  "Other",
];

const SignUp = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    email: "",
    password: "",
    agree_terms: false,
    referralCode: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuthStore();

  useEffect(() => {
    // Fetch country from IP
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        if (data && data.country_name) {
          setFormData((prev: RegisterRequest) => ({
            ...prev,
            country: data.country_name,
          }));
        }
      });
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email.trim()))
      newErrors.email = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }
    if (!agreed) newErrors.agreed = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: RegisterRequest = {
      ...formData,
      agree_terms: agreed,
    };

    console.log("Submitting", JSON.stringify(payload));
    try {
      const response = await register(payload);
      console.log(response); // response is ApiResponse<User>
      if (response.status === "success") {
        navigate("/verify-email");
      }
    } catch (error) {
      setErrors({ submit: "Failed to create account. Please try again." });
      console.error("Error Creating Account", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="bg-[var(--color-text-dark)] min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[20vh] flex items-center pt-8  overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent"
            >
              Start Your Creative Journey
            </motion.h1>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="">
            <div className="w-full lg:w-1/2 max-w-2xl mx-auto">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className=" bg-gradient-to-br from-black/40 to-[var(--color-brand-orange)]/5 border border-[var(--color-brand-orange)]/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-xl relative overflow-hidden "
              >
                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--color-brand-orange)]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--color-brand-orange)]/10 rounded-full blur-3xl"></div>

                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-6">
                  Create An Account.
                </h1>
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-[var(--color-surface-light)] mb-2 font-medium"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        placeholder="Doe"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                        required
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.last_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-[var(--color-surface-light)] mb-2 font-medium"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        placeholder="John"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                        required
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.first_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[var(--color-surface-light)] mb-2 font-medium"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        placeholder="08012345678"
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-[var(--color-surface-light)] mb-2 font-medium"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                        required
                      >
                        <option value="">Select Country</option>
                        {countryList.map(c => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[var(--color-surface-light)] mb-2 font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      placeholder="johndoe@mail.com"
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-[var(--color-surface-light)] mb-2 font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="********"
                      min={8}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="referralCode"
                      className="block text-[var(--color-surface-light)] mb-2 font-medium"
                    >
                      Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      id="referralCode"
                      name="referralCode"
                      placeholder="REF123456"
                      value={formData.referralCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--color-text-dark)]/60 backdrop-blur-sm border border-[var(--color-brand-orange)]/20 rounded-lg text-[var(--color-surface-light)] focus:border-[var(--color-brand-orange)] focus:ring-2 focus:ring-[var(--color-brand-orange)]/20 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                      className="accent-[var(--color-brand-orange)] w-5 h-5 mr-2"
                      required
                    />
                    <label
                      htmlFor="agree"
                      className="text-[var(--color-surface-light)] text-sm"
                    >
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        className="text-[var(--color-brand-orange)] underline"
                      >
                        Terms & Conditions
                      </a>
                    </label>
                  </div>
                  {errors.agreed && (
                    <p className="text-red-500 text-xs mb-2">{errors.agreed}</p>
                  )}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/80 text-[var(--color-text-dark)] rounded-lg font-semibold hover:from-[var(--color-brand-orange)]/90 hover:to-[var(--color-brand-orange)]/70 transition-all duration-300 shadow-lg shadow-[var(--color-brand-orange)]/20 cursor-pointer"
                    disabled={!agreed}
                  >
                    Sign Up
                  </motion.button>
                  {errors.submit && (
                    <p className="text-red-500 text-sm mb-2">{errors.submit}</p>
                  )}
                  <p className="text-white text-center my-4">
                    Already a creative?{" "}
                    <Link
                      className="text-[var(--color-brand-orange)]"
                      to="/signin"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;

// pick up where you left off

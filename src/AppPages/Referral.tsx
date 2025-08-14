import  { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCopy,
  FaCheck,
  FaTwitter,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";

type ReferralRow = {
  id: string;
  name: string;
  email: string;
  date: string;
  status: "Pending" | "Completed";
  reward: number;
};

const mockHistory: ReferralRow[] = [
  {
    id: "r1",
    name: "John Doe",
    email: "john@example.com",
    date: "2025-07-12",
    status: "Completed",
    reward: 25,
  },
  {
    id: "r2",
    name: "Ada Lovelace",
    email: "ada@example.com",
    date: "2025-07-10",
    status: "Pending",
    reward: 0,
  },
  {
    id: "r3",
    name: "Grace Hopper",
    email: "grace@example.com",
    date: "2025-07-05",
    status: "Completed",
    reward: 25,
  },
];

const Referral: React.FC = () => {
  const referralLink = "https://cverse.com/signup?ref=CVERSE";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(
    "Join this awesome platform and get rewards! "
  );
  const encodedLink = encodeURIComponent(referralLink);

  return (
    <div
      className="h-screen bg-[var(--color-text-dark)] relative overflow-y-scroll custom-scrollbar py-10 px-4"
      style={{ fontFamily: "var(--font-primary)" }}
    >
          <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
                Refer & Earn
              </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
            Invite friends, they sign up, you both earn rewards. Simple.
            </p>
          </div>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Top Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 * 0.1  }}
        className="border border-[var(--color-brand-orange)]/20 rounded-lg text-white shadow-lg p-6 md:p-8">

          {/* Link + copy */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3 text-gray-700 break-all">
              {referralLink}
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-[var(--color-brand-orange)] text-white hover:bg-black transition-colors"
            >
              {copied ? <FaCheck /> : <FaCopy />} {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {/* Share buttons */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-gray-500 text-sm">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedLink}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}${encodedLink}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90"
            >
              <FaFacebookF size={16} />
            </a>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 * 0.1  }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Invites" value="37" />
          <StatCard label="Total Earned" value="$225" accent />
          <StatCard label="Pending Rewards" value="$50" />
        </motion.section>

        {/* How it works */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 2 * 0.1  }}
        className="border border-[var(--color-brand-orange)]/20 rounded-lg text-white shadow-lg p-6 md:p-8">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-4">
            How it works
          </h2>
          <ol className="space-y-4">
            <Step
              index={1}
              title="Share your referral link"
              desc="Send it to friends, colleagues or your network."
            />
            <Step
              index={2}
              title="They sign up & use the platform"
              desc="Once they meet the requirement, your reward is unlocked."
            />
            <Step
              index={3}
              title="You both get rewarded"
              desc="Rewards are added to your balance instantly or after verification."
            />
          </ol>
        </motion.section>

        {/* Referral history */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 3 * 0.1  }}
        className="border border-[var(--color-brand-orange)]/20 rounded-lg text-white shadow-lg p-6 md:p-8 overflow-x-auto">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent  mb-4">
            Referral History
          </h2>
          <table className="w-full text-left min-w-[640px]">
            <thead className="text-sm text-gray-500">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-right">Reward</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockHistory.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3">{row.name}</td>
                  <td className="py-3 text-gray-500">{row.email}</td>
                  <td className="py-3 text-gray-500">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        row.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">
                    {row.reward > 0 ? `$${row.reward}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.section>

        {/* Tiny toast */}
        {copied && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md text-sm shadow">
            Link copied to clipboard
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; accent?: boolean }> = ({
  label,
  value,
  accent,
}) => (
  <div
    className={`rounded-2xl p-6 shadow-sm text-white ${
      accent
        ? "bg-[var(--color-brand-orange)]"
        : "border border-[var(--color-brand-orange)]/40"
    }`}
  >
    <p className="text-sm text-white">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

const Step: React.FC<{ index: number; title: string; desc: string }> = ({
  index,
  title,
  desc,
}) => (
  <li className="flex items-start gap-4">
    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-brand-orange)] text-white text-sm font-bold">
      {index}
    </span>
    <div>
      <h3 className="font-semibold text-gray-200">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </li>
);

export default Referral;

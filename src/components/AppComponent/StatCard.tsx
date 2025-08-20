

const StatCard: React.FC<{ icon: React.ReactElement; label: string; value: string; accent: boolean }> = ({ icon, label, value, accent }) => (
  <div className={` rounded-2xl px-6 py-4 shadow-sm text-white ${
      accent
        ? "bg-gradient-to-r from-[#ff9f43] to-[#ff6f00]"
        : "border border-[var(--color-brand-orange)]/40"
    }`}>
    <div className={`text-2xl mb-2 ${accent ? "text-white" : 'text-[var(--color-brand-orange)]'} `}>{icon}</div>
    <div>
      <p className="text-sm text-white">{label}</p>
      <h3 className="text-lg font-semibold text-gray-300">{value}</h3>
    </div>
  </div>
);

export default StatCard

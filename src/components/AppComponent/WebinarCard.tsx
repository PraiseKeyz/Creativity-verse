import { FiChevronRight } from "react-icons/fi";


const WebinarCard: React.FC<{ title: string; date: string; time: string }> = ({ title, date, time }) => (
  <div className="p-4 border border-[var(--color-brand-orange)]/20 rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
    <div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <p className="text-xs text-gray-500">{date} · {time}</p>
    </div>
    <button className="text-[var(--color-brand-orange)] text-xs flex items-center gap-1">
      Join <FiChevronRight />
    </button>
  </div>
);

export default WebinarCard

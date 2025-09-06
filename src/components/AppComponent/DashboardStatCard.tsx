import { FaArrowCircleUp } from "react-icons/fa";

const DashboardStatCard = ({ value, label, color, subLabel, textColor }: { value: number|string, label: string, color: string, subLabel: string, textColor?: string }) => (
  <div className={`relative p-3 rounded-2xl shadow-lg flex flex-col justify-between min-h-[120px] ${color} ${textColor ? textColor : ''}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-base font-semibold mt-1">{label}</p>
      </div>
      <span className="absolute top-4 right-4 rotate-45">
        <FaArrowCircleUp />
      </span>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <span className="text-xs rounded px-2 py-1 flex items-center gap-1 bg-white/10">
        {subLabel}
      </span>
    </div>
  </div>
);

export default DashboardStatCard;
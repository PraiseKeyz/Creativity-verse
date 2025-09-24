import { FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";

const Webinars: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl text-center">
        <div className="text-[var(--color-brand-orange)] mb-6 flex justify-center gap-4 text-5xl">
          <FaCalendarAlt />
          <FaChalkboardTeacher />
        </div>
        <h1 className="text-4xl font-bold mb-4">Webinars & Workshops</h1>
        <p className="text-gray-400 text-lg mb-8">
          🚀 We’re working on something exciting!  
          Soon you’ll be able to join interactive webinars and hands-on workshops hosted by top creatives.
        </p>
        <div className="bg-[#232323] border border-gray-700 rounded-xl p-6 mb-8">
          <p className="text-gray-300">
            From design sprints to coding bootcamps, stay tuned for expert-led sessions tailored to
            elevate your skills and career inside <span className="text-[var(--color-brand-orange)]">Creativity Verse</span>.
          </p>
        </div>
        <button className="px-8 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition">
          Notify Me
        </button>
      </div>
    </main>
  );
};

export default Webinars;

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const SellerDashboard: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  // Mock Data for analytics
  const productData = [
    { name: "Mon", sales: 12 },
    { name: "Tue", sales: 18 },
    { name: "Wed", sales: 10 },
    { name: "Thu", sales: 22 },
    { name: "Fri", sales: 16 },
  ];

  const jobData = [
    { name: "Jan", applications: 30 },
    { name: "Feb", applications: 45 },
    { name: "Mar", applications: 25 },
    { name: "Apr", applications: 60 },
  ];

  const adData = [
    { name: "Active", value: 6 },
    { name: "Expired", value: 3 },
    { name: "Pending", value: 2 },
  ];

  const COLORS = ["#FF6F00", "#8884d8", "#82ca9d"];

  // Mock overview data
  const productsOverview = [
    { id: 1, name: "UI Design Masterclass", impressions: 1200, clicks: 200, sales: 35 },
    { id: 2, name: "React Developer Guide", impressions: 950, clicks: 150, sales: 22 },
    { id: 3, name: "Brand Strategy Ebook", impressions: 600, clicks: 90, sales: 10 },
  ];

  const jobsOverview = [
    { id: 1, title: "Frontend Developer", impressions: 800, clicks: 120, applied: 30 },
    { id: 2, title: "UI/UX Designer", impressions: 600, clicks: 95, applied: 18 },
    { id: 3, title: "Product Manager", impressions: 400, clicks: 60, applied: 10 },
  ];

  const adsOverview = [
    { id: 1, title: "Summer Campaign", impressions: 1500, clicks: 250 },
    { id: 2, title: "Black Friday Ad", impressions: 2500, clicks: 420 },
    { id: 3, title: "New Year Promo", impressions: 1800, clicks: 310 },
  ];

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      {/* Header with title & dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>

        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="px-4 py-2 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold flex items-center gap-2 hover:opacity-90 transition"
          >
            New Listing <FaChevronDown className="text-sm" />
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-[#232323] border border-gray-700 rounded-lg shadow-lg z-10">
              <ul className="text-sm">
                <Link to="/verse/list-product">
                  <li className="px-4 py-2 hover:bg-[var(--color-brand-orange)]/30 cursor-pointer">
                    Create Product
                  </li>
                </Link>
                <Link to="/verse/create-job">
                  <li className="px-4 py-2 hover:bg-[var(--color-brand-orange)]/30 cursor-pointer">
                    Create Job
                  </li>
                </Link>
                <Link to="/verse/create-ad">
                  <li className="px-4 py-2 hover:bg-[var(--color-brand-orange)]/30 cursor-pointer">
                    Create Ad
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Products Line Chart */}
        <div className="bg-[#232323] p-4 rounded-xl shadow border border-gray-700">
          <h2 className="text-lg font-semibold mb-3">Product Report</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#FF6F00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Jobs Bar Chart */}
        <div className="bg-[#232323] p-4 rounded-xl shadow border border-gray-700">
          <h2 className="text-lg font-semibold mb-3">Job Applications Report</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={jobData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="applications" fill="#FF6F00" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ads Pie Chart */}
        <div className="bg-[#232323] p-4 rounded-xl shadow border border-gray-700 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Ads Report</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={adData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {adData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Overview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Products Overview */}
        <div className="bg-[#232323] p-4 rounded-xl shadow border border-gray-700">
          <h2 className="text-lg font-semibold mb-3">Products Overview</h2>
          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {productsOverview.map((p) => (
              <div key={p.id} className="p-3 bg-[#1a1a1a] rounded-lg flex justify-between">
                <span className="font-medium">{p.name}</span>
                <div className="text-xs text-gray-400 space-y-1 text-right">
                  <p>👁 {p.impressions} impressions</p>
                  <p>🖱 {p.clicks} clicks</p>
                  <p>🛒 {p.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
          <Link to='/verse/product-listings' className="block mx-auto text-center mt-5 w-full bg-[var(--color-brand-orange)]/80 text-white py-2 rounded-md transition-colors hover:bg-[var(--color-brand-orange)] active:scale-95 duration-100 cursor-pointer">
            See All
          </Link>
        </div>

        {/* Jobs Overview */}
        <div className="bg-[#232323] p-4 rounded-xl shadow border border-gray-700">
          <h2 className="text-lg font-semibold mb-3">Job Applications Overview</h2>
          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {jobsOverview.map((j) => (
              <div key={j.id} className="p-3 bg-[#1a1a1a] rounded-lg flex justify-between">
                <span className="font-medium">{j.title}</span>
                <div className="text-xs text-gray-400 space-y-1 text-right">
                  <p>👁 {j.impressions} impressions</p>
                  <p>🖱 {j.clicks} clicks</p>
                  <p>📩 {j.applied} applied</p>
                </div>
              </div>
            ))}
          </div>
          <Link to='/verse/job-listings' className="block mx-auto text-center mt-5 w-full bg-[var(--color-brand-orange)]/80 text-white p-2 rounded-md transition-colors hover:bg-[var(--color-brand-orange)] active:scale-95 duration-100 cursor-pointer">
            See All
          </Link>
        </div>

        {/* Ads Overview */}
        <div className="bg-[#232323] p-4 rounded-xl shadow border border-gray-700 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Ads Overview</h2>
          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {adsOverview.map((a) => (
              <div key={a.id} className="p-3 bg-[#1a1a1a] rounded-lg flex justify-between">
                <span className="font-medium">{a.title}</span>
                <div className="text-xs text-gray-400 space-y-1 text-right">
                  <p>👁 {a.impressions} impressions</p>
                  <p>🖱 {a.clicks} clicks</p>
                </div>
              </div>
            ))}
          </div>
          <Link to='/verse/ads-listings' className="block mx-auto text-center mt-5 w-full bg-[var(--color-brand-orange)]/80 text-white p-2 rounded-md transition-colors hover:bg-[var(--color-brand-orange)] active:scale-95 duration-100 cursor-pointer">
            See All
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SellerDashboard;
import React, { useState } from "react";

type Ad = {
  id: number;
  title: string;
  campaignType: string;
  impressions: number;
  clicks: number;
  status: "active" | "disabled";
};

const AdListings: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 1,
      title: "Summer Campaign",
      campaignType: "Display",
      impressions: 1500,
      clicks: 250,
      status: "active",
    },
    {
      id: 2,
      title: "Black Friday Promo",
      campaignType: "Search",
      impressions: 2500,
      clicks: 420,
      status: "active",
    },
    {
      id: 3,
      title: "New Year Blast",
      campaignType: "Social",
      impressions: 1800,
      clicks: 310,
      status: "disabled",
    },
  ]);

  const handleDelete = (id: number) => {
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setAds(
      ads.map((ad) =>
        ad.id === id
          ? { ...ad, status: ad.status === "active" ? "disabled" : "active" }
          : ad
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ad Listings</h1>
        <button className="px-6 py-2 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition">
          + Add Ad
        </button>
      </div>

      <div className="space-y-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="p-4 bg-[#232323] rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Ad Info */}
            <div>
              <h2 className="text-lg font-semibold">{ad.title}</h2>
              <p className="text-sm text-gray-400">{ad.campaignType} Campaign</p>
              <p
                className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                  ad.status === "active"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {ad.status.toUpperCase()}
              </p>
            </div>

            {/* Ad Stats */}
            <div className="flex gap-6 text-sm text-gray-400">
              <p>👁 {ad.impressions} impressions</p>
              <p>🖱 {ad.clicks} clicks</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30">
                Edit
              </button>
              <button
                onClick={() => handleDelete(ad.id)}
                className="px-3 py-1 rounded-md bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
              >
                Delete
              </button>
              <button
                onClick={() => handleToggleStatus(ad.id)}
                className="px-3 py-1 rounded-md bg-yellow-500/20 text-yellow-400 text-sm font-medium hover:bg-yellow-500/30"
              >
                {ad.status === "active" ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdListings;

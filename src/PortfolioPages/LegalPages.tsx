// LegalPage.tsx
import React from "react";
import { UserIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Handshake } from "lucide-react";

const LegalPage: React.FC = () => {
  return (
    <div className="bg-blue-100 min-h-screen px-6 py-12">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Talk Legal To Me</h1>
        <p className="text-gray-600 mb-4">
          There are a few legal documents that are central to life at HubSpot --
          to us, our customers, our prospects, our partners, and just plain old
          users of our website. To make it easy to find the information you’re
          looking for, we’ve assembled them all here under one roof and provided
          you with a quick rundown below of what you’ll find in each one.
        </p>
        <p className="text-gray-600">
          We might make versions of these legal documents available in languages
          other than English. If we do, the English version will govern our
          relationship -- the translated version is provided for convenience
          only and will not be interpreted to modify the English version.
        </p>
      </div>

      {/* Card Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* For Customers */}
        <div className="bg-white shadow-md rounded-lg p-8 pb-30">
          <div className=" items-center space-x-2 mb-4">
            {/* <span className="text-orange-500 text-2xl">👥</span> */}
            <div className="flex justify-center mb-4">
                <UserIcon className="h-15 w-15 text-orange-400" />
            </div>
            
            <h2 className="text-3xl font-semibold text-gray-800">For Customers</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Use our products or services? You’ll want to give these a read.
          </p> <hr className="text-gray-400 mb-4" />
          <ul className="space-y-4 text-blue-500 font-medium">
            <li><a href="#">Customer Terms of Service</a></li>
            <li><a href="#">Data Processing Agreement</a></li>
            <li><a href="#">Product Specific Terms</a></li>
            <li><a href="#">Regional Data Hosting Policy</a></li>
          </ul>
        </div>

        {/* For Partners */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="items-center space-x-2 mb-4">
            {/* <span className="text-orange-500 text-2xl">🤝</span> */}
            <div className="flex justify-center mb-4">
                <Handshake className="h-15 w-14 text-orange-400" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">For Partners</h2>
          </div>
          <p className="text-gray-600 mb-4">
            HubSpot partner or thinking of becoming one? Checkout the programs below.
          </p> <hr className="text-gray-400 mb-4" />
          <ul className="space-y-4 text-blue-500 font-medium">
            <li><a href="#">Solutions Partner Program Agreement</a></li>
            <li><a href="#">Affiliate Program Agreement</a></li>
            <li><a href="#">App Partner Program Agreement</a></li>
            <li><a href="#">HubSpot for Startups Partner Agreement</a></li>
            <li><a href="#">Education Partner Agreement</a></li>
          </ul>
        </div>

        {/* For Everyone */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className=" items-center space-x-2 mb-4">
            {/* <span className="text-orange-500 text-2xl">👥</span> */}
            <div className="flex justify-center mb-4">
                <UserGroupIcon className="h-15 w-15 text-orange-400" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800">For Everyone</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Visiting our website? We’ve got some terms for you too.
          </p> <hr className="text-gray-400 mb-4" />
          <ul className="space-y-4 text-blue-500 font-medium">
            <li><a href="#">Website Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Content Moderation @HubSpot</a></li>
            <li><a href="#">Our Trademarks</a></li>
            <li><a href="#">Acceptable Use Policy</a></li>
            <li><a href="#">Modern Slavery Statement</a></li>
            <li><a href="#">HubSpot United Kingdom (UK) Legal Tax Strategy</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;

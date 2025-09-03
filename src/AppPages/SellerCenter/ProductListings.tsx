import React, { useState } from "react";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  impressions: number;
  clicks: number;
  sales: number;
  status: "active" | "disabled";
  createdAt: string;
};

const mockProducts: Product[] = [
  {
    id: 1,
    title: "UI Design Masterclass",
    category: "Course",
    price: 49.99,
    impressions: 1200,
    clicks: 200,
    sales: 35,
    status: "active",
    createdAt: "2025-06-01T12:00:00Z",
  },
  {
    id: 2,
    title: "React Developer Guide",
    category: "Ebook",
    price: 29.99,
    impressions: 950,
    clicks: 150,
    sales: 22,
    status: "disabled",
    createdAt: "2025-05-20T09:30:00Z",
  },
  {
    id: 3,
    title: "Brand Strategy Ebook",
    category: "Ebook",
    price: 19.99,
    impressions: 600,
    clicks: 90,
    sales: 10,
    status: "active",
    createdAt: "2025-04-18T15:45:00Z",
  },
];

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "active" ? "disabled" : "active" } : p
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#181818] text-white p-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <button className="px-6 py-3 rounded-lg bg-[var(--color-brand-orange)] text-black font-semibold hover:opacity-90 active:scale-95 transition">
          + Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#232323] text-left">
              <th className="px-4 py-3 border-b border-gray-700">Title</th>
              <th className="px-4 py-3 border-b border-gray-700">Category</th>
              <th className="px-4 py-3 border-b border-gray-700">Price</th>
              <th className="px-4 py-3 border-b border-gray-700">Impressions</th>
              <th className="px-4 py-3 border-b border-gray-700">Clicks</th>
              <th className="px-4 py-3 border-b border-gray-700">Sales</th>
              <th className="px-4 py-3 border-b border-gray-700">Status</th>
              <th className="px-4 py-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-[#232323]/50 transition border-b border-gray-800"
              >
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3">{p.impressions}</td>
                <td className="px-4 py-3">{p.clicks}</td>
                <td className="px-4 py-3">{p.sales}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    p.status === "active" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {p.status}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 rounded hover:opacity-80 text-xs">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-600 rounded hover:opacity-80 text-xs"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggleStatus(p.id)}
                    className="px-3 py-1 bg-gray-700 rounded hover:opacity-80 text-xs"
                  >
                    {p.status === "active" ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ProductListing;

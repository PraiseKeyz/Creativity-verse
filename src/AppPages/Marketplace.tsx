import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  isFavorite?: boolean;
  category: string;
  description?: string;
  discountPrice?: number;
  reviewsCount?: number;
  stock?: number;
};

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80",
    price: 99.99,
    oldPrice: 149.99,
    rating: 4,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smartwatch",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    price: 199.99,
    rating: 5,
    category: "Electronics",
  },
  {
    id: "3",
    name: "Leather Backpack",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    price: 79.99,
    rating: 4,
    category: "Accessories",
  },
  {
    id: "4",
    name: "Casual Sneakers",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    price: 59.99,
    rating: 3,
    category: "Fashion",
  },
  {
    id: "5",
    name: "Gaming Mouse",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    price: 39.99,
    rating: 4,
    category: "Electronics",
  },
  {
    id: "6",
    name: "Sunglasses",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: 25.99,
    rating: 5,
    category: "Accessories",
  },
];

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sort, setSort] = useState<string>("default");
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const handleSort = (option: string) => {
    setSort(option);
    let sorted = [...products];
    if (option === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted = [...mockProducts];
    }
    setProducts(sorted);
  };

  const handleFilter = (category: string) => {
    setFilter(category);
    if (category === "All") {
      setProducts(mockProducts);
    } else {
      setProducts(mockProducts.filter((p) => p.category === category));
    }
  };

  return (
    <div
      className="bg-[var(--color-text-dark)] min-h-screen relative overflow-hidden"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[120%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-bl from-[var(--color-brand-orange)]/10 via-[var(--color-brand-orange)]/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 p-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent">
          Marketplace
        </h1>
      </div>
      <div className="flex gap-4 p-4">
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
            className="p-2 rounded-full border border-[var(--color-brand-orange)]/20 mb-6 shadow-lg text-sm text-[var(--color-surface-light)] focus:outline-none focus:border-[var(--color-brand-orange)]"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Fashion">Fashion</option>
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 rounded-full border border-[var(--color-brand-orange)]/20 mb-6 shadow-lg text-sm text-[var(--color-surface-light)] focus:outline-none focus:border-[var(--color-brand-orange)]"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-scroll custom-scrollbar h-screen p-4 pb-52">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => navigate(`/verse/product/${product.id}`, { state: { product } })}
            style={{ cursor: "pointer" }}
          >
            <ProductCard
              product={product}
              onAddToCart={(id) => console.log("Added to cart:", id)}
              onToggleFavorite={(id) => console.log("Toggled favorite:", id)}
            />
          </motion.div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Marketplace;

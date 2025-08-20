import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import LoadingSpin from "../components/LoadingSpin";

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

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<string>("default");
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();


  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      fetch("/Data/products.json")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        });
    }, 1000);
  }, []);

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
      sorted = [...products];
    }
    setProducts(sorted);
  };

  const handleFilter = (category: string) => {
    setFilter(category);
    if (category === "All") {
      setProducts(products);
    } else {
      setProducts(products.filter((p) => p.category === category));
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
        {loading ? (
        <div>
          <div className="text-center mt-20 text-lg text-white">Loading Products...</div>
          <LoadingSpin />
        </div>
        ):(products.map((product, index) => (
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
        )))}
      </div>
    </div>
  );
};

export default Marketplace;

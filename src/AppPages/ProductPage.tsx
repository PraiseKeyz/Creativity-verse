
import React, { useState } from "react";
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { mockProducts } from "./Marketplace";

const ProductPage: React.FC = () => {
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

  const { id } = useParams();
  const location = useLocation();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const product: Product | undefined = location.state?.product || mockProducts.find((p: Product) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#181818] text-white font-sans">
      <section className="w-full max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative flex flex-col items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-2xl w-full max-w-md h-[400px] object-cover shadow-lg border border-gray-800 bg-[#232323]"
            />
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-6 right-6 bg-[#232323] border border-gray-700 rounded-full p-3 shadow hover:bg-[var(--color-brand-orange)] hover:text-white transition-colors"
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {isWishlisted ? (
                <FaHeart size={22} className="text-[var(--color-brand-orange)]" />
              ) : (
                <FaRegHeart size={22} className="text-gray-400" />
              )}
            </button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-[var(--color-brand-orange)]">{product.name}</h1>
              <p className="text-base text-gray-400 mb-2">Category: <span className="font-semibold text-white">{product.category}</span></p>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) =>
                  i < product.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-700" />
                  )
                )}
                <span className="text-sm text-gray-400">
                  ({product.reviewsCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[var(--color-brand-orange)]">
                  ${product.discountPrice ?? product.price}
                </span>
                {product.discountPrice && (
                  <span className="text-lg line-through text-gray-500">
                    ${product.price}
                  </span>
                )}
              </div>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-lg font-semibold transition-all shadow ${
                  product.stock === 0
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white border border-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)]"
                }`}
              >
                <FaShoppingCart size={20} />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button className="w-full bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/80 text-[var(--color-text-dark)] py-2 rounded-lg font-semibold hover:from-[var(--color-brand-orange)]/90 hover:to-[var(--color-brand-orange)]/70 transition-all border border-[var(--color-brand-orange)]/30 shadow-lg active:scale-95 duration-100 cursor-pointer">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;

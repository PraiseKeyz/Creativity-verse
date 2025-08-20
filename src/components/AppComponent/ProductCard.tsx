import { FaStar, FaRegStar, FaShoppingCart, FaHeart } from "react-icons/fa";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number; // from 0 to 5
  isFavorite?: boolean;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
}) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-yellow-400" />
      ) : (
        <FaRegStar key={index} className="text-yellow-400" />
      )
    );
  };

  return (
    <div className="border border-[var(--color-brand-orange)]/20 rounded-lg p-4 mb-6 text-white shadow-lg">
      {/* Image Section */}
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
        />
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite && onToggleFavorite(product.id)}
          className="absolute top-3 right-3 bg-[var(--color-surface-light)]/80 p-2 rounded-full shadow hover:scale-110 transition-transform border border-[var(--color-brand-orange)]/30"
        >
          <FaHeart
            className={product.isFavorite ? "text-[var(--color-brand-orange)]" : "text-gray-400"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-[var(--color-surface-light)]">
        <h3 className="text-lg font-bold truncate bg-gradient-to-r from-[var(--color-surface-light)] to-[var(--color-brand-orange)] bg-clip-text text-transparent mb-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">{renderStars(product.rating)}</div>

        {/* Price Section */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-[var(--color-brand-orange)]">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm line-through text-[var(--color-surface-light)]/50">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => onAddToCart && onAddToCart(product.id)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-brand-orange)] to-[var(--color-brand-orange)]/80 text-[var(--color-text-dark)] py-2 rounded-full font-semibold hover:from-[var(--color-brand-orange)]/90 hover:to-[var(--color-brand-orange)]/70 transition-all border border-[var(--color-brand-orange)]/30 shadow-lg shadow-[var(--color-brand-orange)]/10"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

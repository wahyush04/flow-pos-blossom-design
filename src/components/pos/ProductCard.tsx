
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
  type?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { id, name, price, image, stock = 0 } = product;
  const outOfStock = stock <= 0;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm transition-shadow hover:shadow-md animate-fade-in">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className={cn(
              "h-full w-full object-cover transition-transform hover:scale-105",
              outOfStock && "opacity-50"
            )}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        
        {outOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-white font-medium px-2 py-1 bg-red-500 rounded text-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-1 truncate" title={name}>
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-pos-text-dark font-semibold">
            ${price.toFixed(2)}
          </span>
          {stock > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 hover:bg-primary hover:text-white"
              onClick={() => onAddToCart(product)}
            >
              Add
            </Button>
          )}
          {stock > 0 && (
            <span className="text-xs text-gray-500">Stock: {stock}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/pos/ProductGrid";
import { Product } from "@/components/pos/ProductCard";
import { CartItem } from "@/components/layout/Layout";
import { toast } from "sonner";
import { getProducts, updateProductStock } from "@/lib/productService";
import { saveTransaction } from "@/lib/transactionService";

const POS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.username) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/admin");
    }
    
    // Load products
    setProducts(getProducts());
  }, [navigate]);
  
  const addToCart = (product: Product) => {
    // Check if product has enough stock
    if ((product.stock || 0) <= 0) {
      toast.error(`${product.name} is out of stock!`);
      return;
    }
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Check if adding more would exceed available stock
        if (existingItem.quantity + 1 > (product.stock || 0)) {
          toast.error(`Not enough stock for ${product.name}!`);
          return prev;
        }
        
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }];
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    // Check if the requested quantity is available in stock
    const product = products.find(p => p.id === id);
    
    if (product && quantity > (product.stock || 0)) {
      toast.error(`Not enough stock for ${product.name}!`);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    
    // Update product stock
    const updatedProducts = products.map(product => {
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem) {
        return {
          ...product,
          stock: (product.stock || 0) - cartItem.quantity
        };
      }
      return product;
    });
    
    // Save updated products
    updateProductStock(updatedProducts);
    
    // Save transaction
    saveTransaction(cartItems);
    
    // Update local state
    setProducts(updatedProducts);
    
    toast.success("Transaction completed successfully!");
    setCartItems([]);
  };
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <Layout
      cartItemCount={cartItemCount}
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      onCheckout={handleCheckout}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">POS System</h1>
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-pos-neutral mb-4">Select items to add to your order</p>
          <ProductGrid products={products} onAddToCart={addToCart} />
        </div>
      </div>
    </Layout>
  );
};

export default POS;

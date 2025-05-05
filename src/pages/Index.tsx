
import { useState } from 'react';
import { toast } from "sonner";
import Layout, { CartItem } from '../components/layout/Layout';
import ProductGrid from '../components/pos/ProductGrid';
import { Product } from '../components/pos/ProductCard';

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Espresso Shot",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&q=75&fit=crop&w=200",
    category: "drinks"
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 3.75,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&q=75&fit=crop&w=200",
    category: "drinks"
  },
  {
    id: 3,
    name: "Avocado Toast",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&q=75&fit=crop&w=200",
    category: "food"
  },
  {
    id: 4,
    name: "Croissant",
    price: 3.25,
    category: "food"
  },
  {
    id: 5,
    name: "Fruit Smoothie",
    price: 4.50,
    category: "drinks"
  },
  {
    id: 6,
    name: "Chicken Sandwich",
    price: 7.95,
    category: "food"
  },
  {
    id: 7,
    name: "Caesar Salad",
    price: 6.95,
    category: "food"
  },
  {
    id: 8,
    name: "Latte",
    price: 4.25,
    category: "drinks"
  },
  {
    id: 9,
    name: "Chocolate Muffin",
    price: 3.50,
    category: "pastries"
  },
  {
    id: 10,
    name: "Green Tea",
    price: 2.95,
    category: "drinks"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
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
    toast.success(`Order placed successfully!`);
    setCartItems([]);
  };
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Layout
      cartItemCount={cartItemCount}
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      onCheckout={handleCheckout}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Products</h2>
          <p className="text-pos-neutral mb-4">Select items to add to your order</p>
          <ProductGrid products={sampleProducts} onAddToCart={addToCart} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

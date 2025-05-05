
import { Product } from "@/components/pos/ProductCard";

// Sample initial product data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Espresso Shot",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&q=75&fit=crop&w=200",
    category: "drinks",
    stock: 50
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 3.75,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&q=75&fit=crop&w=200",
    category: "drinks",
    stock: 30
  },
  {
    id: 3,
    name: "Avocado Toast",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&q=75&fit=crop&w=200",
    category: "food",
    stock: 15
  },
  {
    id: 4,
    name: "Croissant",
    price: 3.25,
    category: "food",
    stock: 25
  },
  {
    id: 5,
    name: "Fruit Smoothie",
    price: 4.50,
    category: "drinks",
    stock: 20
  }
];

export const getProducts = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    // Initialize with default products if not found
    saveProducts(initialProducts);
    return initialProducts;
  } catch (error) {
    console.error('Error getting products from localStorage', error);
    return initialProducts;
  }
};

export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to localStorage', error);
  }
};

export const updateProductStock = (products: Product[]): void => {
  try {
    const allProducts = getProducts();
    
    // Update only the stock of products that were in the cart
    const updatedProducts = allProducts.map(product => {
      const updatedProduct = products.find(p => p.id === product.id);
      if (updatedProduct) {
        return { ...product, stock: updatedProduct.stock };
      }
      return product;
    });
    
    saveProducts(updatedProducts);
  } catch (error) {
    console.error('Error updating product stock', error);
  }
};

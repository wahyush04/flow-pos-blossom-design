
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import CartSidebar from '../pos/CartSidebar';

interface LayoutProps {
  children: React.ReactNode;
  cartItemCount?: number;
  cartItems?: CartItem[];
  onCheckout?: () => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onRemoveItem?: (id: number) => void;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Layout = ({ 
  children,
  cartItemCount = 0,
  cartItems = [],
  onCheckout,
  onUpdateQuantity,
  onRemoveItem
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <div className="min-h-screen bg-pos-bg-light flex flex-col">
      <Navbar 
        onMenuToggle={toggleSidebar} 
        cartItemCount={cartItemCount} 
        onCartToggle={toggleCart}
      />
      
      <div className="flex-1 flex">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={cn(
          "flex-1 transition-all duration-200 ease-in-out",
          "md:ml-64"
        )}>
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>

        <CartSidebar 
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onCheckout={onCheckout}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      </div>
      
      {/* Overlay for mobile when sidebar or cart is open */}
      {(sidebarOpen || cartOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setCartOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Layout;

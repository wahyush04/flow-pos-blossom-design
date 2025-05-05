
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CartItem as CartItemType } from '../layout/Layout';
import CartItem from './CartItem';
import CheckoutSummary from './CheckoutSummary';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onCheckout?: () => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onRemoveItem?: (id: number) => void;
}

const CartSidebar = ({
  isOpen,
  onClose,
  items,
  onCheckout = () => {},
  onUpdateQuantity = () => {},
  onRemoveItem = () => {}
}: CartSidebarProps) => {
  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-20 w-full sm:w-96 flex flex-col bg-pos-bg-light border-l border-gray-200 transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-semibold">Cart</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-pos-bg-light">
        {items.length > 0 ? (
          <div className="space-y-1">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-pos-neutral">
            <span>Your cart is empty</span>
            <Button variant="link" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-100">
          <CheckoutSummary items={items} onCheckout={onCheckout} />
        </div>
      )}
    </div>
  );
};

export default CartSidebar;


import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '../layout/Layout';

interface CheckoutSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

const CheckoutSummary = ({ items, onCheckout }: CheckoutSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07; // Assuming 7% tax rate
  const total = subtotal + tax;
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-pos-neutral">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-pos-neutral">Tax (7%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-4"
        onClick={onCheckout}
        disabled={items.length === 0}
      >
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutSummary;

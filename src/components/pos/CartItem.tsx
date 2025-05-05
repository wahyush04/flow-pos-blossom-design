
import React from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '../layout/Layout';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  const { id, name, price, quantity, image } = item;
  
  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      onRemoveItem(id);
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100">
      <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No img
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-pos-text-dark truncate" title={name}>
          {name}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-semibold">
            ${price.toFixed(2)}
          </span>
          
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={handleDecrease}
            >
              <span className="sr-only">Decrease quantity</span>
              -
            </Button>
            
            <span className="mx-2 text-sm w-5 text-center">
              {quantity}
            </span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={handleIncrease}
            >
              <span className="sr-only">Increase quantity</span>
              +
            </Button>
          </div>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-pos-neutral"
        onClick={() => onRemoveItem(id)}
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
};

export default CartItem;

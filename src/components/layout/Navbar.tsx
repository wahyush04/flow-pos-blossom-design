
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  onMenuToggle: () => void;
  cartItemCount: number;
  onCartToggle: () => void;
}

const Navbar = ({ onMenuToggle, cartItemCount, onCartToggle }: NavbarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onMenuToggle}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          <h1 className="text-xl font-semibold text-pos-text-dark">MinPOS</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartToggle}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className={cn(
                "absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center bg-primary text-white",
                cartItemCount > 9 ? "text-[10px]" : ""
              )}>
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

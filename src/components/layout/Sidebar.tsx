
import { Home, ShoppingBag, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active = false }: NavItemProps) => (
  <li>
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active ? "bg-primary text-primary-foreground" : "text-pos-text-dark hover:bg-secondary"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  </li>
);

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Get user role from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user.role || null);
  }, []);
  
  if (!userRole) {
    return null; // Don't render sidebar if user isn't logged in
  }
  
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-pos-text-dark">MinPOS</h2>
        </div>
        <div className="flex flex-col gap-1 px-3 py-4">
          <nav className="grid gap-1">
            <ul className="grid gap-1">
              {userRole === "admin" && (
                <>
                  <NavItem 
                    icon={Home} 
                    label="Dashboard" 
                    to="/admin" 
                    active={location.pathname === "/admin"} 
                  />
                </>
              )}
              
              {userRole === "cashier" && (
                <>
                  <NavItem 
                    icon={ShoppingBag} 
                    label="POS" 
                    to="/pos" 
                    active={location.pathname === "/pos"} 
                  />
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-muted-foreground">
          Logged in as: <span className="font-semibold">{userRole}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

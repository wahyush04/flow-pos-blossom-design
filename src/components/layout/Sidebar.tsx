
import { Home, Receipt, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, active = false }: NavItemProps) => (
  <li>
    <a
      href="#"
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        active ? "bg-primary text-primary-foreground" : "text-pos-text-dark hover:bg-secondary"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </a>
  </li>
);

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1 px-3 py-4">
          <nav className="grid gap-1">
            <ul className="grid gap-1">
              <NavItem icon={Home} label="Dashboard" active />
              <NavItem icon={ShoppingBag} label="Products" />
              <NavItem icon={Receipt} label="Orders" />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

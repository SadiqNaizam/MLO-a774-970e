import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Example: if search is part of header

interface HeaderProps {
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  console.log("Rendering Header");

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          FoodApp
        </Link>

        {/* Optional: Search bar in header */}
        {/* <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-md w-1/3">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search restaurants or dishes..."
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
          />
        </div> */}

        <nav className="flex items-center space-x-4">
          {/* Example for a search icon that might open a search modal or page */}
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-6 w-6" />
          </Button>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-6 w-6" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
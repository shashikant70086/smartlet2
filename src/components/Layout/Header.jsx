import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';
import { ModeContext } from './ModeContext';
import { ShoppingCart, User, LogOut, Menu, X, MessageSquare } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, toggleCart } = useContext(CartContext);
  const { mode } = useContext(ModeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">Smartlet</span>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a 
                href="#" 
                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </a>
              <a 
                href="#" 
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Products
              </a>
              <a 
                href="#" 
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </a>
            </nav>
          </div>
          
          {/* Right side actions: cart, user, etc. */}
          <div className="flex items-center">
            {/* Mode indicator */}
            {mode && (
              <div className="mr-4 hidden sm:flex">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  mode === 'ai' 
                    ? 'bg-purple-100 text-purple-800' 
                    : mode === 'expert' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                </span>
              </div>
            )}
            
            {/* Cart button */}
            <button
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 relative"
              onClick={toggleCart}
            >
              <span className="sr-only">View cart</span>
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            
            {/* Chat button (mobile only) */}
            <button
              className="sm:hidden p-2 ml-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Open chat</span>
              <MessageSquare size={20} />
            </button>
            
            {/* User menu */}
            <div className="ml-3 relative">
              {user ? (
                <div className="flex items-center">
                  <button className="bg-gray-100 p-2 rounded-full text-gray-600">
                    <User size={20} />
                  </button>
                  <div className="ml-2 hidden sm:block">
                    <div className="text-sm font-medium text-gray-700">{user.name}</div>
                    <button 
                      onClick={logout}
                      className="text-xs text-gray-500 flex items-center hover:text-red-500"
                    >
                      <LogOut size={12} className="mr-1" />
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <a
                  href="#login"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Sign in
                </a>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="ml-2 flex items-center sm:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a 
              href="#" 
              className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Home
            </a>
            <a 
              href="#" 
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Products
            </a>
            <a 
              href="#" 
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              About
            </a>
          </div>
          
          {/* Mobile mode display */}
          {mode && (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">Current Mode</div>
                  <div className={`text-base font-medium ${
                    mode === 'ai' 
                      ? 'text-purple-800' 
                      : mode === 'expert' 
                        ? 'text-blue-800'
                        : 'text-green-800'
                  }`}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Mobile user info */}
          {user && (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User size={20} className="text-gray-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
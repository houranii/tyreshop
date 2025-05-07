import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import Button from '../common/Button';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import Badge from '../common/Badge';
import logo from './logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cartItems = useCartStore(state => state.items);
  const { isAuthenticated, isAdmin, user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center group">
            <div className="h-10 w-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img 
                src={logo}
                alt="TyreWarehouse Logo" 
                className="h-10 w-10 object-contain" 
              />
            </div>
            <div className="ml-2">
              <h1 className="text-xl font-bold text-primary-600 transition-colors duration-300">TyreWarehouse</h1>
              <p className="text-xs text-gray-500 -mt-1">Premium Tyres & Service</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-200 ${location.pathname === '/' ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-colors duration-200 ${location.pathname.includes('/products') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'}`}
            >
              Tyres
            </Link>
            <Link 
              to="/locations" 
              className={`font-medium transition-colors duration-200 ${location.pathname.includes('/locations') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'}`}
            >
              Locations
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`font-medium transition-colors duration-200 ${location.pathname.includes('/admin') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'}`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-primary-500 relative transition-colors duration-200">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge 
                  variant="secondary" 
                  size="sm" 
                  rounded 
                  className="absolute -top-2 -right-2 bg-secondary-500 text-white animate-pulse-once"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center text-gray-600 hover:text-primary-500 focus:outline-none transition-colors duration-200"
                >
                  <User size={20} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 animate-scale-up">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-600 hover:text-primary-500 focus:outline-none transition-colors duration-200" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pt-4 border-t border-gray-200 md:hidden animate-fade-in">
            <ul className="space-y-4 pb-4">
              <li>
                <Link 
                  to="/" 
                  className={`block font-medium transition-colors duration-200 ${location.pathname === '/' ? 'text-primary-600' : 'text-gray-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`block font-medium transition-colors duration-200 ${location.pathname.includes('/products') ? 'text-primary-600' : 'text-gray-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tires
                </Link>
              </li>
              <li>
                <Link 
                  to="/locations" 
                  className={`block font-medium transition-colors duration-200 ${location.pathname.includes('/locations') ? 'text-primary-600' : 'text-gray-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Locations
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link 
                    to="/admin" 
                    className={`block font-medium transition-colors duration-200 ${location.pathname.includes('/admin') ? 'text-primary-600' : 'text-gray-600'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
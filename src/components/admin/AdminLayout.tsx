import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Gauge, 
  ShoppingBag, 
  Package, 
  MapPin, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isActive = (path: string) => {
    return location.pathname === `/admin${path}` || 
           location.pathname.startsWith(`/admin${path}/`);
  };
  
  const navItems = [
    { path: '', icon: <Gauge size={20} />, label: 'Dashboard' },
    { path: '/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
    { path: '/locations', icon: <MapPin size={20} />, label: 'Locations' },
    { path: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-primary-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/admin" className="font-bold text-xl flex items-center group">
              <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center mr-2 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/img/logo.png" 
                  alt="TyreWarehouse Logo" 
                  className="h-8 w-8 object-contain" 
                />
              </div>
              <span className="transition-colors duration-300 hover:text-accent-300">TyreWarehouse Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Link to="/" className="text-white hover:text-accent-300 mr-4 transition-colors duration-200">
              View Store
            </Link>
            
            <button
              className="md:hidden text-white focus:outline-none hover:text-accent-300 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`
          ${isMobileMenuOpen ? 'block animate-slide-in' : 'hidden'} 
          md:block bg-white shadow-md w-64 fixed inset-y-0 mt-14 z-10 md:relative md:mt-0
        `}>
          <div className="py-4">
            <nav className="px-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={`/admin${item.path}`}
                  className={`
                    flex items-center px-4 py-3 rounded-md transition-all duration-200
                    ${isActive(item.path) 
                      ? 'bg-primary-50 text-primary-600 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100 hover:translate-x-1'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 rounded-md transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:translate-x-1 w-full text-left"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
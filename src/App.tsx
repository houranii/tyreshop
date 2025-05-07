import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Locations from './pages/Locations';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminLocations from './pages/admin/Locations';
import AdminCustomers from './pages/admin/Customers'; // Add this import
import NewProduct from './pages/admin/NewProduct';
import useAuthStore from './store/authStore';

const ProtectedRoute: React.FC<{ 
  element: React.ReactNode;
  isAllowed: boolean;
  redirectPath?: string;
}> = ({ element, isAllowed, redirectPath = '/login' }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{element}</>;
};

const App: React.FC = () => {
  const { checkAuth, isAuthenticated, isAdmin, isLoading } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute 
              element={<AdminLayout />} 
              isAllowed={isAuthenticated && isAdmin} 
              redirectPath="/login?redirect=admin"
            />
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="locations" element={<AdminLocations />} />
          <Route path="customers" element={<AdminCustomers />} /> {/* Add this route */}
        </Route>
        
        {/* Public Routes */}
        <Route 
          path="/*" 
          element={
            <>
              <Header />
              <div className="min-h-screen">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute 
                      element={<Checkout />}
                      isAllowed={isAuthenticated}
                      redirectPath="/login?redirect=checkout"
                    />
                  } />
                  <Route path="/locations" element={<Locations />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
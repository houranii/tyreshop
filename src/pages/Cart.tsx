import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import useCartStore from '../store/cartStore';

const Cart: React.FC = () => {
  const { items } = useCartStore();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
            <ShoppingCart size={80} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any tyres to your cart yet.
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              Browse Tyres
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Your Items</h2>
                <span className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.tire.id} item={item} />
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <Link to="/products">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
              
              <Button
                variant="danger"
                onClick={() => useCartStore.getState().clearCart()}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
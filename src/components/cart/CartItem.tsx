import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import useCartStore from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { tire, quantity } = item;
  
  const handleIncrease = () => {
    updateQuantity(tire.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(tire.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(tire.id);
  };
  
  const price = tire.salePrice || tire.price;
  const totalPrice = price * quantity;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={tire.image}
          alt={`${tire.brand} ${tire.model}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            {tire.brand} {tire.model}
          </h3>
          <p className="ml-4">${totalPrice.toFixed(2)}</p>
        </div>
        
        <p className="mt-1 text-sm text-gray-500">
          Size: {tire.size.width}/{tire.size.profile}R{tire.size.rimSize}
        </p>
        
        <p className="mt-1 text-sm text-gray-500">
          ${price.toFixed(2)} per tire
        </p>
        
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 min-w-[2rem] text-center">{quantity}</span>
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900"
              onClick={handleIncrease}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            type="button"
            className="font-medium text-red-600 hover:text-red-800 flex items-center"
            onClick={handleRemove}
          >
            <Trash size={16} className="mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
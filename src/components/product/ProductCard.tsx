import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Tire } from '../../types';
import useCartStore from '../../store/cartStore';

interface ProductCardProps {
  tire: Tire;
}

const ProductCard: React.FC<ProductCardProps> = ({ tire }) => {
  const addToCart = useCartStore(state => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const totalStock = Object.values(tire.stock).reduce((sum, count) => sum + count, 0);
  const stockStatus = totalStock > 10 ? 'In Stock' : totalStock > 0 ? 'Low Stock' : 'Out of Stock';
  const stockVariant = totalStock > 10 ? 'success' : totalStock > 0 ? 'warning' : 'danger';
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add the item to cart
    addToCart(tire, 4); // Default to set of 4 tires
    
    // Show success state
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset back to normal after 1.5 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }, 500);
  };
  
  const sizeString = `${tire.size.width}/${tire.size.profile}R${tire.size.rimSize}`;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col group">
      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={tire.image} 
          alt={`${tire.brand} ${tire.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {tire.salePrice && (
          <div className="absolute top-0 right-0 bg-secondary-500 text-white px-3 py-1 text-sm font-semibold animate-pulse-once">
            SALE
          </div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-600 transition-colors duration-200">{tire.brand} {tire.model}</h3>
            <Badge variant={stockVariant} size="sm">{stockStatus}</Badge>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">Size: {sizeString}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < Math.floor(tire.avgRating) ? 'text-accent-400 fill-accent-400' : 'text-gray-300'} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({tire.reviews.length})</span>
          </div>
          
          {/* Compatible with */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tire.vehicleTypes.map((type) => (
              <Badge key={type} variant="primary" size="sm">
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Price and action - always at the bottom */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            {tire.salePrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary-600">${tire.salePrice}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${tire.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary-600">${tire.price}</span>
            )}
            <p className="text-xs text-gray-500">per tyre</p>
          </div>
          
          <div className="flex space-x-2">
            <Link to={`/products/${tire.id}`}>
              <Button variant="outline" size="sm" className="hover:border-primary-500">
                Details
              </Button>
            </Link>
            <Button
              variant={isAdded ? "secondary" : "primary"}
              size="sm"
              leftIcon={isAdding ? undefined : isAdded ? <CheckCircle size={16} /> : <ShoppingCart size={16} />}
              onClick={handleAddToCart}
              disabled={totalStock === 0 || isAdding || isAdded}
              className={`${isAdding ? 'animate-spin-once' : isAdded ? 'animate-bounce-short' : ''}`}
            >
              {isAdded ? "Added" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
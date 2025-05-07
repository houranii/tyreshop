import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  CheckCircle, 
  Info,
  ChevronRight,
  MapPin
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { tires } from '../data/tires';
import { locations } from '../data/locations';
import useCartStore from '../store/cartStore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(4); // Default to a set of 4 tires
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const { addToCart } = useCartStore();
  
  const tire = tires.find(t => t.id === id);
  
  if (!tire) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The tire you are looking for does not exist or has been removed.</p>
        <Link to="/products">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </div>
    );
  }
  
  const totalStock = Object.values(tire.stock).reduce((sum, count) => sum + count, 0);
  const stockStatus = totalStock > 10 ? 'In Stock' : totalStock > 0 ? 'Low Stock' : 'Out of Stock';
  const stockVariant = totalStock > 10 ? 'success' : totalStock > 0 ? 'warning' : 'danger';
  
  const handleAddToCart = () => {
    addToCart(tire, quantity);
  };
  
  const sizeString = `${tire.size.width}/${tire.size.profile}R${tire.size.rimSize}`;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-900">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-blue-900">Tires</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800">{tire.brand} {tire.model}</span>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={tire.image} 
              alt={`${tire.brand} ${tire.model}`}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex flex-wrap items-center mb-2">
              {tire.salePrice && (
                <Badge variant="secondary" className="mr-2 bg-orange-500 text-white">
                  SALE
                </Badge>
              )}
              <Badge variant={stockVariant}>{stockStatus}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{tire.brand} {tire.model}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < Math.floor(tire.avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <span className="text-gray-600">{tire.avgRating} ({tire.reviews.length} reviews)</span>
            </div>
            
            <div className="mb-4">
              <p className="text-xl font-bold text-blue-900">
                {tire.salePrice ? (
                  <>
                    ${tire.salePrice} <span className="ml-2 text-base text-gray-500 line-through">${tire.price}</span>
                  </>
                ) : (
                  `$${tire.price}`
                )}
                <span className="text-sm text-gray-500 font-normal"> per tyre</span>
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-700 mb-2">Tyre Size</h2>
              <Badge variant="primary" size="lg">{sizeString}</Badge>
            </div>
            
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-700 mb-2">Compatible with</h2>
              <div className="flex flex-wrap gap-2">
                {tire.vehicleTypes.map((type) => (
                  <Badge key={type} variant="info" size="md">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-700 mb-2">Quantity (sets)</h2>
              <div className="flex items-center">
                <button
                  className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(2, quantity - 2))}
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b border-gray-300 text-center min-w-[3rem]">
                  {quantity}
                </span>
                <button
                  className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 2)}
                >
                  +
                </button>
                <span className="ml-2 text-gray-600">tyres</span>
              </div>
            </div>
            
            <div className="mb-6">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                leftIcon={<ShoppingCart size={20} />}
                onClick={handleAddToCart}
                disabled={totalStock === 0}
              >
                Add to Cart
              </Button>
            </div>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <Truck size={18} className="mr-2 text-blue-900" />
                <span>Professional fitting available at all locations</span>
              </div>
              <div className="flex items-center">
                <Shield size={18} className="mr-2 text-blue-900" />
                <span>Manufacturer warranty included</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-blue-900" />
                <span>Available at {Object.entries(tire.stock).filter(([_, count]) => count > 0).length} locations</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'description' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-500 hover:text-blue-900'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'specifications' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-500 hover:text-blue-900'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'reviews' 
                  ? 'text-blue-900 border-b-2 border-blue-900' 
                  : 'text-gray-500 hover:text-blue-900'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({tire.reviews.length})
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 mb-4">{tire.description}</p>
                <h3 className="font-semibold text-gray-800 mb-2">Key Features</h3>
                <ul className="list-none space-y-2">
                  {tire.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(tire.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-100 pb-2">
                    <span className="font-medium text-gray-700 w-1/2">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                {tire.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {tire.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-800">{review.userName}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No reviews yet for this product.</p>
                    <Button variant="outline" size="sm">Write a Review</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Availability by Location */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Availability by Location</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(tire.stock).map(([locationId, stock]) => {
              const location = locations.find(loc => loc.id === locationId);
              if (!location) return null;
              
              return (
                <div key={locationId} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{location.name}</h3>
                      <p className="text-sm text-gray-500">{location.city}, {location.state}</p>
                    </div>
                    <Badge 
                      variant={stock > 5 ? 'success' : stock > 0 ? 'warning' : 'danger'}
                      size="sm"
                    >
                      {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
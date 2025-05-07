import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Select from '../common/Select';
import useCartStore from '../../store/cartStore';
import { ServiceType, Location } from '../../types';
import { locations } from '../../data/locations';
import useAuthStore from '../../store/authStore';

const CartSummary: React.FC = () => {
  const { 
    items, 
    total, 
    serviceType, 
    selectedLocationId, 
    setServiceType, 
    setLocation 
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [fittingLocations, setFittingLocations] = useState<Location[]>([]);
  const [pickupLocations, setPickupLocations] = useState<Location[]>([]);
  
  // Separate fitting and pickup locations
  useEffect(() => {
    const fittingLocs = locations.filter(loc => loc.name.includes('Fitting'));
    const pickupLocs = locations.filter(loc => loc.name.includes('Pickup'));
    
    setFittingLocations(fittingLocs);
    setPickupLocations(pickupLocs);
  }, []);
  
  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceType(e.target.value as ServiceType);
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };
  
  if (items.length === 0) {
    return null;
  }
  
  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => {
    const price = item.tire.salePrice || item.tire.price;
    return sum + (price * item.quantity);
  }, 0);
  
  // Get the right locations based on service type
  const availableLocations = serviceType === ServiceType.FITTING
    ? fittingLocations
    : pickupLocations;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {/* Service Type Selection */}
        <Select
          id="serviceType"
          label="Service Type"
          value={serviceType}
          onChange={handleServiceTypeChange}
          options={[
            { value: '', label: 'Select Service Type' },
            { value: ServiceType.FITTING, label: 'Professional Fitting Service (Free)' },
            { value: ServiceType.PICKUP, label: 'Self-Pickup (Free)' }
          ]}
          fullWidth
        />
        
        {/* Location Selection - only shown after service type is selected */}
        {serviceType && (
          <Select
            id="location"
            label={serviceType === ServiceType.PICKUP ? "Pickup Location" : "Fitting Location"}
            value={selectedLocationId || ''}
            onChange={handleLocationChange}
            options={[
              { value: '', label: `Select a ${serviceType === ServiceType.PICKUP ? 'pickup' : 'fitting'} location` },
              ...availableLocations.map((loc: Location) => ({ 
                value: loc.id, 
                label: `${loc.name} - ${loc.city}` 
              }))
            ]}
            fullWidth
          />
        )}
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>{serviceType === ServiceType.FITTING ? 'Fitting Fee' : 'Pickup Fee'}</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        
        <div className="border-t border-gray-200 my-2 pt-2"></div>
        
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button
          variant="secondary"
          fullWidth
          size="lg"
          onClick={handleCheckout}
          disabled={!selectedLocationId || items.length === 0 || !serviceType}
        >
          {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
        </Button>
        
        <Link to="/products">
          <Button variant="outline" fullWidth className="mt-2">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Check, ChevronRight, ChevronsRight } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { locations } from '../data/locations';
import { ServiceType } from '../types';

type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';
type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, total, serviceType, selectedLocationId, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [formData, setFormData] = useState({
    fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: user?.phone || '',
    streetAddress: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">You have no items in your cart to checkout.</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when field is edited
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Only validate fields that are required for the current service type
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'credit_card') {
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiration date is required';
      if (!formData.cardCVV) newErrors.cardCVV = 'Security code is required';
      
      // Simple validation for card number format (16 digits)
      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
      
      // Simple validation for card expiry (MM/YY)
      if (formData.cardExpiry && !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Use format MM/YY';
      }
      
      // Simple validation for CVV (3-4 digits)
      if (formData.cardCVV && !/^\d{3,4}$/.test(formData.cardCVV)) {
        newErrors.cardCVV = 'Invalid security code';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 'shipping') {
      if (validateShippingForm()) {
        setCurrentStep('payment');
      }
    } else if (currentStep === 'payment') {
      if (validatePaymentForm()) {
        setCurrentStep('confirmation');
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('payment');
    }
  };

  const handlePlaceOrder = () => {
    // Here you would normally process the payment and create an order
    // For now we'll just show a success message and clear the cart
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className={`flex items-center ${currentStep === 'shipping' ? 'text-blue-900 font-medium' : 'text-gray-500'}`}>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'shipping' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'} mr-2`}>
              <Truck size={16} />
            </div>
            <span>Shipping</span>
          </div>
          
          <div className="mx-4 h-0.5 w-8 bg-gray-300"></div>
          
          <div className={`flex items-center ${currentStep === 'payment' ? 'text-blue-900 font-medium' : 'text-gray-500'}`}>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'payment' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'} mr-2`}>
              <CreditCard size={16} />
            </div>
            <span>Payment</span>
          </div>
          
          <div className="mx-4 h-0.5 w-8 bg-gray-300"></div>
          
          <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-blue-900 font-medium' : 'text-gray-500'}`}>
            <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'confirmation' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'} mr-2`}>
              <Check size={16} />
            </div>
            <span>Confirmation</span>
          </div>
        </div>
      </div>
    );
  };

  const renderShippingStep = () => {
    return (
      <div>
        <h2 className="text-lg font-bold mb-6">Contact Information</h2>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            fullWidth
            required
          />
          
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            fullWidth
            required
          />
          
          <Input
            id="phone"
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            fullWidth
            required
          />
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Selected Service</h3>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center">
              {serviceType === ServiceType.FITTING ? (
                <Truck className="h-5 w-5 text-blue-900 mr-2" />
              ) : (
                <CreditCard className="h-5 w-5 text-blue-900 mr-2" />
              )}
              <div>
                <p className="font-medium">{serviceType === ServiceType.FITTING ? 'Professional Fitting' : 'Self Pickup'}</p>
                <p className="text-sm text-gray-600">{selectedLocation?.name} - {selectedLocation?.address}, {selectedLocation?.city}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            variant="primary"
            onClick={handleNextStep}
            rightIcon={<ChevronRight size={16} />}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  };

  const renderPaymentStep = () => {
    return (
      <div>
        <h2 className="text-lg font-bold mb-6">Payment Method</h2>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'credit_card' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setPaymentMethod('credit_card')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-blue-900' : 'border-gray-300'}`}>
                {paymentMethod === 'credit_card' && <div className="w-3 h-3 rounded-full bg-blue-900"></div>}
              </div>
              <div className="flex-1">
                <p className="font-medium">Credit / Debit Card</p>
                <p className="text-sm text-gray-600">Pay using Visa, Mastercard or other cards</p>
              </div>
              <div className="flex space-x-1">
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'paypal' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-blue-900' : 'border-gray-300'}`}>
                {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-blue-900"></div>}
              </div>
              <div className="flex-1">
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-gray-600">Pay with your PayPal account</p>
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'apple_pay' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setPaymentMethod('apple_pay')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'apple_pay' ? 'border-blue-900' : 'border-gray-300'}`}>
                {paymentMethod === 'apple_pay' && <div className="w-3 h-3 rounded-full bg-blue-900"></div>}
              </div>
              <div className="flex-1">
                <p className="font-medium">Apple Pay</p>
                <p className="text-sm text-gray-600">Pay using Apple Pay</p>
              </div>
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'google_pay' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setPaymentMethod('google_pay')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'google_pay' ? 'border-blue-900' : 'border-gray-300'}`}>
                {paymentMethod === 'google_pay' && <div className="w-3 h-3 rounded-full bg-blue-900"></div>}
              </div>
              <div className="flex-1">
                <p className="font-medium">Google Pay</p>
                <p className="text-sm text-gray-600">Pay using Google Pay</p>
              </div>
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div 
            className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === 'bank_transfer' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'}`}
            onClick={() => setPaymentMethod('bank_transfer')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-blue-900' : 'border-gray-300'}`}>
                {paymentMethod === 'bank_transfer' && <div className="w-3 h-3 rounded-full bg-blue-900"></div>}
              </div>
              <div>
                <p className="font-medium">Bank Transfer</p>
                <p className="text-sm text-gray-600">Pay directly from your bank account</p>
              </div>
            </div>
          </div>
        </div>
        
        {paymentMethod === 'credit_card' && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="font-medium mb-4">Card Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="cardName"
                label="Name on Card"
                value={formData.cardName}
                onChange={handleInputChange}
                error={errors.cardName}
                fullWidth
                required
              />
              
              <Input
                id="cardNumber"
                label="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                error={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                fullWidth
                required
              />
              
              <Input
                id="cardExpiry"
                label="Expiration Date"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                error={errors.cardExpiry}
                placeholder="MM/YY"
                fullWidth
                required
              />
              
              <Input
                id="cardCVV"
                label="Security Code (CVV)"
                value={formData.cardCVV}
                onChange={handleInputChange}
                error={errors.cardCVV}
                type="password"
                maxLength={4}
                fullWidth
                required
              />
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
          >
            Back
          </Button>
          
          <Button 
            variant="primary"
            onClick={handleNextStep}
            rightIcon={<ChevronRight size={16} />}
          >
            Review Order
          </Button>
        </div>
      </div>
    );
  };

  const renderConfirmationStep = () => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.tire.salePrice || item.tire.price;
      return sum + (price * item.quantity);
    }, 0);
    
    return (
      <div>
        <h2 className="text-lg font-bold mb-6">Review Your Order</h2>
        
        <div className="mb-6 border-b border-gray-200 pb-6">
          <h3 className="font-medium mb-4">Items</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.tire.id} className="flex justify-between">
                <div className="flex">
                  <div className="h-16 w-16 bg-gray-100 rounded mr-3 overflow-hidden">
                    <img 
                      src={item.tire.image} 
                      alt={item.tire.model}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.tire.brand} {item.tire.model}</p>
                    <p className="text-sm text-gray-600">
                      {item.tire.size.width}/{item.tire.size.profile}R{item.tire.size.rimSize} - Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-medium">
                  ${((item.tire.salePrice || item.tire.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Contact Information</h3>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p>{formData.fullName}</p>
              <p>{formData.email}</p>
              <p>{formData.phone}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Service Details</h3>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p>{serviceType === ServiceType.FITTING ? 'Professional Fitting' : 'Self Pickup'}</p>
              <p>{selectedLocation?.name}</p>
              <p>{selectedLocation?.address}, {selectedLocation?.city}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Payment Method</h3>
            <div className="p-3 bg-gray-50 rounded-lg">
              {paymentMethod === 'credit_card' && (
                <>
                  <p>Credit/Debit Card</p>
                  <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                </>
              )}
              {paymentMethod === 'paypal' && <p>PayPal</p>}
              {paymentMethod === 'apple_pay' && <p>Apple Pay</p>}
              {paymentMethod === 'google_pay' && <p>Google Pay</p>}
              {paymentMethod === 'bank_transfer' && <p>Bank Transfer</p>}
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">
                {serviceType === ServiceType.FITTING ? 'Fitting Fee' : 'Pickup Fee'}
              </span>
              <span className="text-green-600">Free</span>
            </div>
            
            <div className="border-t border-gray-200 my-2 pt-2"></div>
            
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
          >
            Back
          </Button>
          
          <Button 
            variant="secondary"
            onClick={handlePlaceOrder}
            rightIcon={<ChevronsRight size={16} />}
          >
            Place Order
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
      
      {renderStepIndicator()}
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentStep === 'shipping' && renderShippingStep()}
            {currentStep === 'payment' && renderPaymentStep()}
            {currentStep === 'confirmation' && renderConfirmationStep()}
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-4 max-h-72 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.tire.id} className="flex items-center">
                  <div className="h-16 w-16 bg-gray-100 rounded mr-3 overflow-hidden">
                    <img 
                      src={item.tire.image} 
                      alt={item.tire.model}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.tire.brand} {item.tire.model}</p>
                    <p className="text-sm text-gray-600">
                      {item.tire.size.width}/{item.tire.size.profile}R{item.tire.size.rimSize}
                    </p>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Qty: {item.quantity}</span>
                      <span className="font-medium">
                        ${((item.tire.salePrice || item.tire.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">
                  {serviceType === ServiceType.FITTING ? 'Fitting Fee' : 'Pickup Fee'}
                </span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="border-t border-gray-200 my-2 pt-2"></div>
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
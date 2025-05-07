import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Customer } from '../../data/customers';
import { locations } from '../../data/locations';

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCustomer: Omit<Customer, 'id' | 'joinDate' | 'totalOrders' | 'totalSpent' | 'lastOrderDate'>) => void;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    preferredLocation: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
      setFormData(initialFormData);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Customer"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Address</h3>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={errors.state}
                  />
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <Input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700">Preferred Location</label>
                <Select
                  id="preferredLocation"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                >
                  <option value="">Select a location</option>
                  {locations.map(location => (
                    <option key={location.id} value={`${location.name}, ${location.city}`}>
                      {location.name}, {location.city}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-gray-700 mb-2">Additional Information</h3>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
          >
            Add Customer
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewCustomerModal;
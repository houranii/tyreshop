import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { Customer } from '../../types';
import { locations } from '../../data/locations';

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
  onSave: (customer: Customer) => void;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({ 
  isOpen, 
  onClose, 
  customer,
  onSave 
}) => {
  const [formData, setFormData] = useState<Customer>(customer);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Reset form data when customer changes
  useEffect(() => {
    if (customer && isOpen) {
      setFormData({ ...customer });
      setErrors({});
    }
  }, [customer, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Customer) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSave(formData);
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Customer: ${customer.firstName} ${customer.lastName}`}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => handleSubmit(new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent)}>Save Changes</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  fullWidth
                />
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-gray-700 mb-2">Address Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  id="address"
                  label="Street Address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  error={errors.address}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  id="city"
                  label="City"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  error={errors.city}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  id="state"
                  label="State/Province"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  error={errors.state}
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  id="zipCode"
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode || ''}
                  onChange={handleChange}
                  error={errors.zipCode}
                  fullWidth
                />
              </div>
              
              <div>
                <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-700">Preferred Location</label>
                <Select
                  id="preferredLocation"
                  name="preferredLocation"
                  value={formData.preferredLocation || ''}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Select a location' },
                    ...locations.map(location => ({
                      value: `${location.name}, ${location.city}`,
                      label: `${location.name}, ${location.city}`
                    }))
                  ]}
                />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200"
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditCustomerModal;
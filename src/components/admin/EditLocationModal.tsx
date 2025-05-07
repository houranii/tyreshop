import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { Location } from '../../types';

interface EditLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location | null;
  onSave: (location: Location) => void;
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({
  isOpen,
  onClose,
  location,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Location>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Days of the week for business hours
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  useEffect(() => {
    if (location) {
      setFormData({ ...location });
    } else {
      setFormData({
        businessHours: {
          Monday: '',
          Tuesday: '',
          Wednesday: '',
          Thursday: '',
          Friday: '',
          Saturday: '',
          Sunday: ''
        },
        coordinates: { lat: 0, lng: 0 }
      });
    }
    setErrors({});
  }, [location, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties like coordinates.lat or businessHours.Monday
      const [parent, child] = name.split('.');
      
      if (parent === 'coordinates') {
        setFormData(prev => ({
          ...prev,
          coordinates: {
            lat: child === 'lat' ? parseFloat(value) : prev.coordinates?.lat ?? 0,
            lng: child === 'lng' ? parseFloat(value) : prev.coordinates?.lng ?? 0
          }
        }));
      } else if (parent === 'businessHours') {
        setFormData(prev => ({
          ...prev,
          businessHours: {
            ...prev.businessHours,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear any error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP Code is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    // Validate email format
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSave(formData as Location);
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={location ? `Edit ${location.name}` : 'Add New Location'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="name"
            name="name"
            label="Location Name"
            value={formData.name || ''}
            onChange={handleChange}
            error={errors.name}
            fullWidth
            required
          />
          
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            error={errors.email}
            fullWidth
            required
          />
        </div>
        
        <div>
          <Input
            id="address"
            name="address"
            label="Street Address"
            value={formData.address || ''}
            onChange={handleChange}
            error={errors.address}
            fullWidth
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="city"
            name="city"
            label="City"
            value={formData.city || ''}
            onChange={handleChange}
            error={errors.city}
            fullWidth
            required
          />
          
          <Input
            id="state"
            name="state"
            label="State/Province"
            value={formData.state || ''}
            onChange={handleChange}
            error={errors.state}
            fullWidth
            required
          />
          
          <Input
            id="zipCode"
            name="zipCode"
            label="ZIP/Postal Code"
            value={formData.zipCode || ''}
            onChange={handleChange}
            error={errors.zipCode}
            fullWidth
            required
          />
        </div>
        
        <Input
          id="phone"
          name="phone"
          label="Phone"
          value={formData.phone || ''}
          onChange={handleChange}
          error={errors.phone}
          fullWidth
          required
        />
        
        <h3 className="font-medium text-gray-700 border-t pt-4">Business Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {daysOfWeek.map(day => (
            <Input
              key={day}
              id={`businessHours.${day}`}
              name={`businessHours.${day}`}
              label={day}
              value={formData.businessHours?.[day] || ''}
              onChange={handleChange}
              error={errors[`businessHours.${day}`]}
              placeholder="e.g. 8:00 AM - 7:00 PM or Closed"
              fullWidth
            />
          ))}
        </div>
        
        <h3 className="font-medium text-gray-700 border-t pt-4">Map Coordinates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="coordinates.lat"
            name="coordinates.lat"
            label="Latitude"
            type="number"
            step="0.000001"
            value={formData.coordinates?.lat?.toString() || ''}
            onChange={handleChange}
            error={errors['coordinates.lat']}
            fullWidth
          />
          
          <Input
            id="coordinates.lng"
            name="coordinates.lng"
            label="Longitude"
            type="number"
            step="0.000001"
            value={formData.coordinates?.lng?.toString() || ''}
            onChange={handleChange}
            error={errors['coordinates.lng']}
            fullWidth
          />
        </div>
        
        {location && (
          <Input
            id="id"
            name="id"
            label="Location ID"
            value={formData.id || ''}
            disabled
            fullWidth
          />
        )}
      </form>
    </Modal>
  );
};

export default EditLocationModal;
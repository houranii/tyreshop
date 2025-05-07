import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Tire, VehicleType } from '../../types';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  tire: Tire | null;
  onSave: (tire: Tire) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  tire,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Tire>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (tire) {
      setFormData({ ...tire });
    } else {
      setFormData({});
    }
    setErrors({});
  }, [tire, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties like size.width
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((typeof prev[parent as keyof Tire] === 'object' && prev[parent as keyof Tire] !== null) ? prev[parent as keyof Tire] : {}),
          [child]: parent === 'size' ? parseInt(value) : value
        }
      }));
    } else if (name === 'price' || name === 'salePrice') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? undefined : parseFloat(value)
      }));
    } else if (name === 'vehicleTypes') {
      const selectedTypes = Array.from(
        (e.target as HTMLSelectElement).selectedOptions, 
        option => option.value as VehicleType
      );
      setFormData(prev => ({
        ...prev,
        vehicleTypes: selectedTypes
      }));
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
  
  const handleStockChange = (location: string, value: string) => {
    const stockValue = value === '' ? 0 : parseInt(value);
    setFormData(prev => ({
      ...prev,
      stock: {
        ...prev.stock,
        [location]: stockValue
      }
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    
    if (!formData.size?.width) newErrors['size.width'] = 'Width is required';
    if (!formData.size?.profile) newErrors['size.profile'] = 'Profile is required';
    if (!formData.size?.rimSize) newErrors['size.rimSize'] = 'Rim size is required';
    
    if (!formData.vehicleTypes?.length) newErrors.vehicleTypes = 'At least one vehicle type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSave(formData as Tire);
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tire ? `Edit ${tire.brand} ${tire.model}` : 'Add New Product'}
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
            id="brand"
            name="brand"
            label="Brand"
            value={formData.brand || ''}
            onChange={handleChange}
            error={errors.brand}
            fullWidth
            required
          />
          
          <Input
            id="model"
            name="model"
            label="Model"
            value={formData.model || ''}
            onChange={handleChange}
            error={errors.model}
            fullWidth
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description || ''}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
              ${errors.description ? 'border-red-500' : 'border-gray-300'}
            `}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="price"
            name="price"
            label="Price ($)"
            type="number"
            min="0"
            step="0.01"
            value={formData.price?.toString() || ''}
            onChange={handleChange}
            error={errors.price}
            fullWidth
            required
          />
          
          <Input
            id="salePrice"
            name="salePrice"
            label="Sale Price ($) (optional)"
            type="number"
            min="0"
            step="0.01"
            value={formData.salePrice?.toString() || ''}
            onChange={handleChange}
            fullWidth
          />
          
          <Input
            id="image"
            name="image"
            label="Image URL"
            value={formData.image || ''}
            onChange={handleChange}
            fullWidth
          />
        </div>
        
        <h3 className="font-medium text-gray-700 border-t pt-4">Tire Size</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="width"
            name="size.width"
            label="Width (mm)"
            type="number"
            min="0"
            value={formData.size?.width?.toString() || ''}
            onChange={handleChange}
            error={errors['size.width']}
            fullWidth
            required
          />
          
          <Input
            id="profile"
            name="size.profile"
            label="Profile (%)"
            type="number"
            min="0"
            value={formData.size?.profile?.toString() || ''}
            onChange={handleChange}
            error={errors['size.profile']}
            fullWidth
            required
          />
          
          <Input
            id="rimSize"
            name="size.rimSize"
            label="Rim Size (inches)"
            type="number"
            min="0"
            value={formData.size?.rimSize?.toString() || ''}
            onChange={handleChange}
            error={errors['size.rimSize']}
            fullWidth
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Types
          </label>
          <select
            name="vehicleTypes"
            multiple
            value={formData.vehicleTypes || []}
            onChange={handleChange}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
              ${errors.vehicleTypes ? 'border-red-500' : 'border-gray-300'}
            `}
            size={3}
            required
          >
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
          {errors.vehicleTypes && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicleTypes}</p>
          )}
        </div>
        
        <h3 className="font-medium text-gray-700 border-t pt-4">Inventory</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(formData.stock && Object.keys(formData.stock).length > 0) ? 
            Object.keys(formData.stock).map(location => (
              <Input
                key={location}
                id={`stock-${location}`}
                name={`stock.${location}`}
                label={`Stock at ${location}`}
                type="number"
                min="0"
                value={formData.stock?.[location]?.toString() || '0'}
                onChange={(e) => handleStockChange(location, e.target.value)}
                fullWidth
              />
            )) : (
              <div className="col-span-3">
                <p className="text-sm text-gray-500">No inventory locations configured.</p>
              </div>
            )
          }
        </div>
        
        {tire && (
          <Input
            id="id"
            name="id"
            label="Product ID"
            value={formData.id || ''}
            disabled
            fullWidth
          />
        )}
      </form>
    </Modal>
  );
};

export default EditProductModal;
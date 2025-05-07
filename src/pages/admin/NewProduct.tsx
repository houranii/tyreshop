import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Upload,
  Plus,
  Minus,
  X
} from 'lucide-react';
import { Card } from '@tremor/react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { VehicleType } from '../../types';
import { locations } from '../../data/locations';

const NewProduct: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>(['']);
  const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>([
    { key: '', value: '' }
  ]);
  
  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };
  
  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };
  
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };
  
  const handleRemoveSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };
  
  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecifications = [...specifications];
    newSpecifications[index][field] = value;
    setSpecifications(newSpecifications);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Implement product creation logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/admin/products')}
          className="mr-4"
        >
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600">Create a new tire product listing</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="brand"
                label="Brand"
                placeholder="e.g., Michelin"
                required
              />
              <Input
                id="model"
                label="Model"
                placeholder="e.g., Pilot Sport 4"
                required
              />
              <Input
                id="price"
                label="Regular Price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                required
              />
              <Input
                id="salePrice"
                label="Sale Price (Optional)"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </Card>
          
          {/* Tire Specifications */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tire Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                id="width"
                label="Width (mm)"
                type="number"
                min="0"
                placeholder="225"
                required
              />
              <Input
                id="profile"
                label="Profile (%)"
                type="number"
                min="0"
                placeholder="45"
                required
              />
              <Input
                id="rimSize"
                label="Rim Size (inches)"
                type="number"
                min="0"
                placeholder="17"
                required
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Types
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Car', 'SUV', 'Truck'] as VehicleType[]).map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-900 shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200"
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Product Details */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload size={24} className="mx-auto text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-900 focus:ring focus:ring-blue-200"
                  placeholder="Enter product description..."
                  required
                />
              </div>
              
              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      id={`feature-${index}`}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Enter feature..."
                      fullWidth
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddFeature}
                  leftIcon={<Plus size={16} />}
                >
                  Add Feature
                </Button>
              </div>
              
              {/* Specifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Specifications
                </label>
                {specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      id={`spec-key-${index}`}
                      value={spec.key}
                      onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                      placeholder="Specification name..."
                      className="w-1/3"
                    />
                    <Input
                      id={`spec-value-${index}`}
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                      placeholder="Value..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSpecification(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSpecification}
                  leftIcon={<Plus size={16} />}
                >
                  Add Specification
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Inventory */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory</h2>
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {location.name}
                    </label>
                    <Input
                      id={`stock-${location.id}`}
                      type="number"
                      min="0"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
            >
              Create Product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
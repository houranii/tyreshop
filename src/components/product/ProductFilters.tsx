import React from 'react';
import { Filter, X } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import useFilterStore from '../../store/filterStore';
import { VehicleType } from '../../types';

interface ProductFiltersProps {
  className?: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ className = '' }) => {
  const {
    width,
    profile,
    rimSize,
    vehicleType,
    brand,
    availableOptions,
    setWidth,
    setProfile,
    setRimSize,
    setVehicleType,
    setBrand,
    resetFilters
  } = useFilterStore();
  
  // Format the tire size display (e.g. 225/45R17)
  const formatTireSize = (w: number, p: number, r: number) => {
    return `${w}/${p}R${r}`;
  };
  
  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as VehicleType | '';
    setVehicleType(value ? value as VehicleType : null);
  };
  
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBrand(value || null);
  };
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setWidth(value ? parseInt(value) : null);
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setProfile(value ? parseInt(value) : null);
  };
  
  const handleRimSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRimSize(value ? parseInt(value) : null);
  };
  
  const hasActiveFilters = width !== null || profile !== null || rimSize !== null || vehicleType !== null || brand !== null;
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
          <Filter size={18} className="mr-2" />
          Filters
        </h2>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetFilters}
            leftIcon={<X size={16} />}
          >
            Clear All
          </Button>
        )}
      </div>
      
      {hasActiveFilters && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Active filters:</span>{' '}
            {width && `Width: ${width}mm`}{width && (profile || rimSize || brand || vehicleType) && ', '}
            {profile && `Profile: ${profile}%`}{profile && (rimSize || brand || vehicleType) && ', '}
            {rimSize && `Rim: ${rimSize}"`}{rimSize && (brand || vehicleType) && ', '}
            {brand && `Brand: ${brand}`}{brand && vehicleType && ', '}
            {vehicleType && `Vehicle: ${vehicleType}`}
            {width && profile && rimSize && (
              <span className="ml-2 font-medium">
                ({formatTireSize(width, profile, rimSize)})
              </span>
            )}
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        {/* Vehicle Type */}
        <Select
          id="vehicleType"
          label="Vehicle Type"
          value={vehicleType || ''}
          onChange={handleVehicleTypeChange}
          options={[
            { value: '', label: 'All Vehicle Types' },
            ...['Car', 'SUV', 'Truck'].filter(type => {
              // Only show vehicle types that have matching tires with current filters
              if (!hasActiveFilters) return true;
              return availableOptions.widths.length > 0;
            }).map(type => ({ value: type, label: type }))
          ]}
          fullWidth
        />
        
        {/* Brand */}
        <Select
          id="brand"
          label="Brand"
          value={brand || ''}
          onChange={handleBrandChange}
          options={[
            { value: '', label: 'All Brands' },
            ...availableOptions.brands.map(b => ({ value: b, label: b }))
          ]}
          fullWidth
        />
        
        <div className="border-t border-gray-200 my-4"></div>
        
        <h3 className="font-medium text-gray-700">Tyre Size</h3>
        
        {/* Width */}
        <Select
          id="width"
          label="Width (mm)"
          value={width?.toString() || ''}
          onChange={handleWidthChange}
          options={[
            { value: '', label: 'All Widths' },
            ...availableOptions.widths.map(w => ({ value: w.toString(), label: w.toString() }))
          ]}
          fullWidth
        />
        
        {/* Profile */}
        <Select
          id="profile"
          label="Profile (%)"
          value={profile?.toString() || ''}
          onChange={handleProfileChange}
          options={[
            { value: '', label: 'All Profiles' },
            ...availableOptions.profiles.map(p => ({ value: p.toString(), label: p.toString() }))
          ]}
          fullWidth
        />
        
        {/* Rim Size */}
        <Select
          id="rimSize"
          label="Rim Size (inches)"
          value={rimSize?.toString() || ''}
          onChange={handleRimSizeChange}
          options={[
            { value: '', label: 'All Rim Sizes' },
            ...availableOptions.rimSizes.map(r => ({ value: r.toString(), label: r.toString() }))
          ]}
          fullWidth
        />
        
        {width && profile && rimSize && (
          <div className="mt-2 text-center p-2 bg-gray-100 rounded-md">
            <span className="text-lg font-medium text-gray-800">
              {formatTireSize(width, profile, rimSize)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
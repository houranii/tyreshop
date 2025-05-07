import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import Button from '../components/common/Button';
import useFilterStore from '../store/filterStore';

const Products: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { 
    width, 
    profile, 
    rimSize, 
    vehicleType, 
    brand, 
    searchQuery,
    filteredTires,
    resetFilters
  } = useFilterStore();
  
  const hasActiveFilters = width !== null || profile !== null || rimSize !== null || vehicleType !== null || brand !== null || searchQuery !== '';
  
  const toggleFilters = () => setShowFilters(!showFilters);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tyre Collection</h1>
        <p className="text-gray-600">
          Browse our extensive selection of premium tyres for all vehicle types
        </p>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline"
          onClick={toggleFilters}
          leftIcon={<Filter size={18} />}
          fullWidth
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4`}>
          <ProductFilters className="sticky top-24" />
        </div>
        
        {/* Products */}
        <div className="md:w-3/4">
          {filteredTires.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No tyres found</h2>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to find tyres that match your criteria.
              </p>
              <Button variant="primary" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">{filteredTires.length} products found</p>
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTires.map((tire) => (
                  <ProductCard key={tire.id} tire={tire} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
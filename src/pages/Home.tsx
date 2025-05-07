import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Truck, CreditCard, Star, Filter } from 'lucide-react';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import ProductCard from '../components/product/ProductCard';
import { tires } from '../data/tires';
import useFilterStore from '../store/filterStore';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { 
    width, 
    profile, 
    rimSize, 
    brand, 
    setWidth, 
    setProfile, 
    setRimSize, 
    setBrand,
    filteredTires,
    availableOptions
  } = useFilterStore();
  
  // Get featured tires (with sale or highest rating)
  const featuredTires = tires
    .filter(tire => tire.salePrice || tire.avgRating >= 4.5)
    .slice(0, 4);
  
  // Display either filtered results or featured tires
  const displayTires = filteredTires.length > 0 && (width !== null || profile !== null || rimSize !== null || brand !== null) 
    ? filteredTires.slice(0, 4)
    : featuredTires;
  
  const hasActiveFilters = width !== null || profile !== null || rimSize !== null || brand !== null;
  
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
  
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBrand(value || null);
  };
  
  const handleFindTires = () => {
    navigate('/products');
  };
  
  const handleResetFilters = () => {
    useFilterStore.getState().resetFilters();
  };
  
  // Format the tire size display (e.g. 225/45R17)
  const formatTireSize = (w: number, p: number, r: number) => {
    return `${w}/${p}R${r}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-primary-700 text-white py-16 md:py-24" 
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1000)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the Perfect Tyres for Your Vehicle
            </h1>
            <p className="text-xl mb-8">
              Premium selection of tyres from top brands with professional fitting services at convenient locations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Shop Tyres
                </Button>
              </Link>
              <Link to="/locations">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white bg-white bg-opacity-20 backdrop-blur-sm hover:text-primary-600 hover:bg-opacity-100 relative overflow-hidden group"
                >
                  <span className="relative z-10">Find Locations</span>
                  <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search by Vehicle Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect Tyres</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Filter by tyre size and brand for your specific vehicle
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Filter size={18} className="mr-2 text-primary-500" />
                Filter Tyres
              </h3>
              
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleResetFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Width Filter */}
              <div>
                <Select
                  id="width"
                  label="Width (mm)"
                  value={width?.toString() || ''}
                  onChange={handleWidthChange}
                  options={[
                    { value: '', label: 'Select Width' },
                    ...availableOptions.widths.map(w => ({ value: w.toString(), label: w.toString() }))
                  ]}
                  fullWidth
                />
              </div>
              
              {/* Profile Filter */}
              <div>
                <Select
                  id="profile"
                  label="Profile (%)"
                  value={profile?.toString() || ''}
                  onChange={handleProfileChange}
                  options={[
                    { value: '', label: 'Select Profile' },
                    ...availableOptions.profiles.map(p => ({ value: p.toString(), label: p.toString() }))
                  ]}
                  fullWidth
                />
              </div>
              
              {/* Rim Size Filter */}
              <div>
                <Select
                  id="rimSize"
                  label="Rim Size (in)"
                  value={rimSize?.toString() || ''}
                  onChange={handleRimSizeChange}
                  options={[
                    { value: '', label: 'Select Rim' },
                    ...availableOptions.rimSizes.map(r => ({ value: r.toString(), label: r.toString() }))
                  ]}
                  fullWidth
                />
              </div>
              
              {/* Brand Filter */}
              <div>
                <Select
                  id="brand"
                  label="Brand"
                  value={brand || ''}
                  onChange={handleBrandChange}
                  options={[
                    { value: '', label: 'Select Brand' },
                    ...availableOptions.brands.map(b => ({ value: b, label: b }))
                  ]}
                  fullWidth
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="primary" 
                  fullWidth 
                  leftIcon={<Search size={18} />}
                  onClick={handleFindTires}
                >
                  Search
                </Button>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-sm text-primary-800">
                  <span className="font-semibold">Active filters:</span>{' '}
                  {width && `Width: ${width}mm`}{width && (profile || rimSize || brand) && ', '}
                  {profile && `Profile: ${profile}%`}{profile && (rimSize || brand) && ', '}
                  {rimSize && `Rim: ${rimSize}"`}{rimSize && brand && ', '}
                  {brand && `Brand: ${brand}`}
                  {width && profile && rimSize && (
                    <span className="ml-2 font-medium">
                      ({formatTireSize(width, profile, rimSize)})
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Dynamic Results / Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {hasActiveFilters ? 'Matching Tires' : 'Featured Tyres'}
            </h2>
            <div className="flex items-center">
              {hasActiveFilters && filteredTires.length > 4 && (
                <p className="text-gray-600 mr-4">
                  Showing {displayTires.length} of {filteredTires.length} results
                </p>
              )}
              <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
                View All
              </Link>
            </div>
          </div>
          
          {hasActiveFilters && filteredTires.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching tires found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or clearing them to see all available options.
              </p>
              <Button variant="primary" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayTires.map((tire) => (
                <ProductCard key={tire.id} tire={tire} />
              ))}
            </div>
          )}
          
          {hasActiveFilters && filteredTires.length > 4 && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline"
                onClick={handleFindTires}
              >
                View All {filteredTires.length} Results
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Why Choose TyreWarehouse</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best tyre shopping experience with quality products and expert service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="h-12 w-12 bg-primary-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Selection</h3>
              <p className="text-gray-600">
                Curated collection of high-quality tyres from world-renowned brands for all vehicle types.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="h-12 w-12 bg-primary-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Convenient Locations</h3>
              <p className="text-gray-600">
                7 service centers strategically located throughout the city for your convenience.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="h-12 w-12 bg-primary-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Service</h3>
              <p className="text-gray-600">
                Expert technicians providing top-notch installation and maintenance services.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="h-12 w-12 bg-primary-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Payment</h3>
              <p className="text-gray-600">
                Multiple payment options with secure checkout for a hassle-free shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Tyres?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our extensive collection and find the perfect match for your vehicle today.
          </p>
          <Link to="/products">
            <Button variant="accent" size="lg" className="hover:scale-105 transition-transform duration-200">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
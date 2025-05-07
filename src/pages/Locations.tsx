import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import { locations } from '../data/locations';
import { Location } from '../types';

const Locations: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Locations</h1>
        <p className="text-gray-600">
          Find a TyreStore service center near you for professional tyre installation and service
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Location List */}
        <div className="lg:col-span-1 space-y-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`
                p-4 rounded-lg border border-gray-200 cursor-pointer transition-colors
                ${activeLocation?.id === location.id ? 'bg-blue-50 border-blue-500' : 'bg-white hover:bg-gray-50'}
              `}
              onClick={() => setActiveLocation(location)}
            >
              <div className="flex items-start">
                <MapPin className="text-blue-900 flex-shrink-0 mt-1 mr-2" size={18} />
                <div>
                  <h3 className="font-semibold text-gray-800">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.city}, {location.state}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Location Details */}
        <div className="lg:col-span-2">
          {activeLocation ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                {/* Placeholder for Google Map */}
                <div className="h-full w-full flex items-center justify-center bg-primary-600 text-white">
                  <div className="text-center">
                    <MapPin size={40} className="mx-auto mb-2" />
                    <h3 className="font-semibold">{activeLocation.name}</h3>
                    <p className="text-white">{activeLocation.address}, {activeLocation.city}, {activeLocation.state} {activeLocation.zipCode}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{activeLocation.name}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="text-blue-900 flex-shrink-0 mt-1 mr-2" size={18} />
                        <div>
                          <p className="text-gray-800">{activeLocation.address}</p>
                          <p className="text-gray-800">{activeLocation.city}, {activeLocation.state} {activeLocation.zipCode}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="text-blue-900 flex-shrink-0 mr-2" size={18} />
                        <a href={`tel:${activeLocation.phone}`} className="text-blue-900 hover:underline">
                          {activeLocation.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="text-blue-900 flex-shrink-0 mr-2" size={18} />
                        <a href={`mailto:${activeLocation.email}`} className="text-blue-900 hover:underline">
                          {activeLocation.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="primary" fullWidth>
                        Get Directions
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Business Hours</h3>
                    
                    <div className="space-y-2">
                      {Object.entries(activeLocation.businessHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-1 border-b border-gray-100">
                          <span className="font-medium text-gray-700">{day}</span>
                          <span className="text-gray-600">{hours}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center p-3 bg-blue-50 rounded-md text-blue-800">
                      <Clock size={18} className="mr-2" />
                      <span>Services available during business hours</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Services Available</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 bg-gray-50 rounded-md text-gray-700">Tyre Installation</div>
                    <div className="p-3 bg-gray-50 rounded-md text-gray-700">Tyre Balancing</div>
                    <div className="p-3 bg-gray-50 rounded-md text-gray-700">Wheel Alignment</div>
                    <div className="p-3 bg-gray-50 rounded-md text-gray-700">Tyre Rotation</div>
                    <div className="p-3 bg-gray-50 rounded-md text-gray-700">Tyre Pressure Monitoring</div>
                    <div className="p-3 bg-gray-50 rounded-md text-gray-700">Flat Tyre Repair</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <MapPin size={48} className="mx-auto text-blue-900 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select a Location</h2>
              <p className="text-gray-600">
                Choose a location from the list to see detailed information, business hours, and available services.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;
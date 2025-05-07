import React, { useState } from 'react';
import { 
  Search, 
  Edit2, 
  Trash2, 
  ArrowUpDown,
  Plus,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import EditLocationModal from '../../components/admin/EditLocationModal';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import { Location } from '../../types';
import { locations as initialLocations } from '../../data/locations';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'city'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSort = (field: 'name' | 'city') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleOpenEditModal = (location: Location) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (location: Location) => {
    setSelectedLocation(location);
    setIsDeleteModalOpen(true);
  };

  const handleAddNewLocation = () => {
    setSelectedLocation(null);
    setIsAddModalOpen(true);
  };

  const handleSaveLocation = (location: Location) => {
    if (location.id) {
      // Edit existing location
      setLocations(prev => 
        prev.map(loc => loc.id === location.id ? location : loc)
      );
    } else {
      // Add new location
      const newLocation = {
        ...location,
        id: `loc${locations.length + 1}`
      };
      setLocations(prev => [...prev, newLocation]);
    }
  };

  const handleDeleteLocation = () => {
    if (selectedLocation) {
      setLocations(prev => prev.filter(loc => loc.id !== selectedLocation.id));
      setIsDeleteModalOpen(false);
    }
  };

  const filteredLocations = locations
    .filter(location => 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return a[sortField].localeCompare(b[sortField]) * modifier;
    });

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Locations</h1>
          <p className="text-gray-600">Manage your store locations</p>
        </div>
        <Button 
          variant="primary" 
          leftIcon={<Plus size={20} />}
          onClick={handleAddNewLocation}
        >
          Add New Location
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 mb-4">
          <Input
            id="search"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={20} />}
            fullWidth
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('city')}
                >
                  <div className="flex items-center">
                    City
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Hours
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLocations.map((location) => (
                <tr key={location.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{location.name}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {location.city}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1 text-gray-400" />
                      <span>{location.address}, {location.zipCode}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Phone size={16} className="mr-1 text-gray-400" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={16} className="mr-1 text-gray-400" />
                        <span className="text-sm">{location.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">
                    <div className="space-y-1">
                      {Object.entries(location.businessHours).map(([day, hours]) => (
                        <div key={day} className="flex">
                          <span className="font-medium w-20">{day}:</span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Edit2 size={16} />}
                        onClick={() => handleOpenEditModal(location)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => handleOpenDeleteModal(location)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Location Modal */}
      <EditLocationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        location={selectedLocation}
        onSave={handleSaveLocation}
      />

      {/* Add Location Modal */}
      <EditLocationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        location={null}
        onSave={handleSaveLocation}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteLocation}
        title="Delete Location"
        itemName={selectedLocation?.name || ''}
        itemType="location"
      />
    </div>
  );
};

export default Locations;
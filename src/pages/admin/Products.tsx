import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ArrowUpDown,
  Package
} from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import EditProductModal from '../../components/admin/EditProductModal';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import { Tire } from '../../types';
import { tires as initialTires } from '../../data/tires';

const Products: React.FC = () => {
  const [tires, setTires] = useState<Tire[]>(initialTires);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'brand' | 'model' | 'price'>('brand');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);

  const handleSort = (field: 'brand' | 'model' | 'price') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleOpenEditModal = (tire: Tire) => {
    setSelectedTire(tire);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (tire: Tire) => {
    setSelectedTire(tire);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = (updatedTire: Tire) => {
    setTires(prev => 
      prev.map(tire => tire.id === updatedTire.id ? updatedTire : tire)
    );
  };

  const handleDeleteProduct = () => {
    if (selectedTire) {
      setTires(prev => prev.filter(tire => tire.id !== selectedTire.id));
      setIsDeleteModalOpen(false);
    }
  };

  const filteredTires = tires
    .filter(tire => 
      tire.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tire.model.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'price') {
        return (a[sortField] - b[sortField]) * modifier;
      }
      return a[sortField].localeCompare(b[sortField]) * modifier;
    });

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your tyre inventory</p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" leftIcon={<Plus size={20} />}>
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 mb-4">
          <Input
            id="search"
            placeholder="Search products..."
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('brand')}
                >
                  <div className="flex items-center">
                    Brand
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('model')}
                >
                  <div className="flex items-center">
                    Model
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTires.map((tire) => {
                const totalStock = Object.values(tire.stock).reduce((sum, count) => sum + count, 0);
                return (
                  <tr key={tire.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <img 
                        src={tire.image} 
                        alt={`${tire.brand} ${tire.model}`}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{tire.brand}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {tire.model}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {tire.size.width}/{tire.size.profile}R{tire.size.rimSize}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">${tire.price}</span>
                        {tire.salePrice && (
                          <span className="ml-2 text-sm text-green-600">${tire.salePrice}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${totalStock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : totalStock > 0 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {totalStock} units
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Edit2 size={16} />}
                          onClick={() => handleOpenEditModal(tire)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          leftIcon={<Trash2 size={16} />}
                          onClick={() => handleOpenDeleteModal(tire)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        tire={selectedTire}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        itemName={selectedTire ? `${selectedTire.brand} ${selectedTire.model}` : ''}
        itemType="product"
      />
    </div>
  );
};

export default Products;
import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  ArrowUpDown,
  Eye,
  Download,
  UserPlus,
  Pencil,
  Trash2
} from 'lucide-react';
import { Card, Title } from '@tremor/react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import CustomerDetailsModal from '../../components/admin/CustomerDetailsModal';
import EditCustomerModal from '../../components/admin/EditCustomerModal';
import NewCustomerModal from '../../components/admin/NewCustomerModal';
import { customers, Customer } from '../../data/customers';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [customerList, setCustomerList] = useState<Customer[]>(customers);

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => {
      if (searchTerm === '') return true;
      
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      
      return (
        fullName.includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.id.toLowerCase().includes(searchLower) ||
        customer.phone.includes(searchLower)
      );
    })
    .filter(customer => {
      if (filterOption === 'all') return true;
      if (filterOption === 'highValue' && customer.totalSpent > 2000) return true;
      if (filterOption === 'recent' && new Date(customer.lastOrderDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) return true;
      return false;
    })
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      } else if (sortOption === 'oldest') {
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
      } else if (sortOption === 'nameAsc') {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortOption === 'nameDesc') {
        return b.lastName.localeCompare(a.lastName);
      } else if (sortOption === 'mostOrders') {
        return b.totalOrders - a.totalOrders;
      } else if (sortOption === 'highestSpend') {
        return b.totalSpent - a.totalSpent;
      }
      return 0;
    });

  // Open customer details modal
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  };

  // Open edit customer modal
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  // Open delete confirmation modal
  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  // Close customer details modal
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedCustomer(null);
  };

  // Handle customer deletion confirmation
  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;
    // In a real app, you would call an API to delete the customer
    setCustomerList(prev => prev.filter(c => c.id !== selectedCustomer.id));
    console.log(`Deleting customer: ${selectedCustomer.id}`);
    // Then close the modal
    handleCloseModal();
  };

  // Handle adding a new customer
  const handleAddCustomer = () => {
    setShowNewCustomerModal(true);
  };

  // Handle customer creation
  const handleCreateCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer = {
      ...customerData,
      id: `C${Math.floor(100000 + Math.random() * 900000)}`, // Generate random ID
      joinDate: new Date().toISOString(),
      lastOrderDate: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
    };
    
    setCustomerList(prev => [...prev, newCustomer]);
    setShowNewCustomerModal(false);
  };

  // Handle customer update
  const handleUpdateCustomer = (customerId: string, customerData: Partial<Customer>) => {
    if (!selectedCustomer) return;
    
    setCustomerList(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, ...customerData }
          : customer
      )
    );
    
    setShowEditModal(false);
    setSelectedCustomer(null);
  };

  // Close new customer modal
  const handleCloseNewCustomerModal = () => {
    setShowNewCustomerModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>Customer Management</Title>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Download size={18} />
            Export
          </Button>
          <Button className="flex items-center gap-1" onClick={handleAddCustomer}>
            <UserPlus size={18} />
            Add Customer
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Input 
              id="customer-search"
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center gap-1 w-full md:w-auto">
              <Filter size={18} className="text-gray-500" />
              <Select
                id="customer-filter"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="w-full md:w-40"
                options={[
                  { value: 'all', label: 'All Customers' },
                  { value: 'highValue', label: 'High Value' },
                  { value: 'recent', label: 'Recent Orders' }
                ]}
              />
            </div>
            <Select
              id="customer-sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full md:w-40"
              options={[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'nameAsc', label: 'Name (A-Z)' },
                { value: 'nameDesc', label: 'Name (Z-A)' },
                { value: 'mostOrders', label: 'Most Orders' },
                { value: 'highestSpend', label: 'Highest Spend' }
              ]}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.city}, {customer.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.totalOrders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${customer.totalSpent.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(customer.lastOrderDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewCustomer(customer)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View details"
                      >
                        <Eye size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditCustomer(customer)}
                        className="text-amber-600 hover:text-amber-900"
                        title="Edit customer"
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete customer"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <CustomerDetailsModal 
          isOpen={showDetailsModal}
          onClose={handleCloseModal}
          customer={selectedCustomer}
        />
      )}

      {/* Edit Customer Modal */}
      {showEditModal && selectedCustomer && (
        <EditCustomerModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          customer={selectedCustomer}
          onSave={handleUpdateCustomer}
        />
      )}

      {/* New Customer Modal */}
      <NewCustomerModal
        isOpen={showNewCustomerModal}
        onClose={handleCloseNewCustomerModal}
        onSave={handleCreateCustomer}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCustomer && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          title="Delete Customer"
          message={`Are you sure you want to delete ${selectedCustomer.firstName} ${selectedCustomer.lastName}? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default Customers;
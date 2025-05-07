import React, { useState } from 'react';
import { 
  Search, 
  Filter,
  ArrowUpDown,
  Eye,
  Download
} from 'lucide-react';
import { Card, Title } from '@tremor/react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import OrderDetailsModal from '../../components/admin/OrderDetailsModal';

// Sample orders data
const orders = [
  {
    id: 'ORD-7352',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2024-03-15',
    status: 'Completed',
    total: 721.40,
    location: 'Downtown Service Center',
    paymentStatus: 'Paid',
    serviceType: 'Professional Fitting',
    phone: '(555) 123-4567',
    address: '123 Main St, Brooklyn, NY 10001',
    paymentMethod: 'Credit Card (ending in 4242)',
    trackingNumber: 'TRK-78952364',
    notes: 'Customer requested installation before noon.',
    items: [
      {
        id: 'ITEM-1001',
        name: 'Continental ExtremeContact DWS06 Plus 245/45R18',
        quantity: 2,
        price: 180.95,
        total: 361.90
      },
      {
        id: 'ITEM-1002',
        name: 'Professional Tire Fitting & Balancing',
        quantity: 2,
        price: 25.00,
        total: 50.00
      },
      {
        id: 'ITEM-1003',
        name: 'Wheel Alignment Service',
        quantity: 1,
        price: 89.50,
        total: 89.50
      },
      {
        id: 'ITEM-1004',
        name: 'Road Hazard Protection',
        quantity: 2,
        price: 110.00,
        total: 220.00
      }
    ]
  },
  {
    id: 'ORD-7351',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2024-03-14',
    status: 'Processing',
    total: 413.80,
    location: 'Uptown Tire Center',
    paymentStatus: 'Paid',
    serviceType: 'Self-Pickup',
    phone: '(555) 987-6543',
    address: '456 Park Ave, New York, NY 10022',
    paymentMethod: 'PayPal',
    items: [
      {
        id: 'ITEM-2001',
        name: 'Michelin Pilot Sport 4S 225/40R18',
        quantity: 1,
        price: 245.80,
        total: 245.80
      },
      {
        id: 'ITEM-2002',
        name: 'Tire Disposal Fee',
        quantity: 1,
        price: 18.00,
        total: 18.00
      },
      {
        id: 'ITEM-2003',
        name: 'Valve Stems',
        quantity: 4,
        price: 5.00,
        total: 20.00
      },
      {
        id: 'ITEM-2004',
        name: 'Nitrogen Inflation',
        quantity: 4,
        price: 32.50,
        total: 130.00
      }
    ]
  },
  {
    id: 'ORD-7350',
    customer: 'Michael Johnson',
    email: 'michael@example.com',
    date: '2024-03-14',
    status: 'Pending',
    total: 872.25,
    location: 'Brooklyn Tire Shop',
    paymentStatus: 'Pending',
    serviceType: 'Professional Fitting',
    phone: '(555) 321-7654',
    address: '789 Broadway Ave, Brooklyn, NY 11221',
    notes: 'Customer requested notification before delivery.',
    items: [
      {
        id: 'ITEM-3001',
        name: 'Bridgestone Potenza Sport 255/35R19',
        quantity: 4,
        price: 193.75,
        total: 775.00
      },
      {
        id: 'ITEM-3002',
        name: 'Professional Tire Installation',
        quantity: 4,
        price: 22.50,
        total: 90.00
      },
      {
        id: 'ITEM-3003',
        name: 'Wheel Weight Balance',
        quantity: 1,
        price: 7.25,
        total: 7.25
      }
    ]
  }
];

const Orders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState<'date' | 'total'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleSort = (field: 'date' | 'total') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleViewDetails = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const filteredOrders = orders
    .filter(order => 
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter ? order.status === statusFilter : true)
    )
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'date') {
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * modifier;
      }
      return (a[sortField] - b[sortField]) * modifier;
    });

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Download size={20} />}
          onClick={() => {}}
        >
          Export Orders
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              id="search"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={20} />}
              fullWidth
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Processing', label: 'Processing' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' }
              ]}
              fullWidth
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center">
                    Total
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-gray-900">{order.customer}</div>
                      <div className="text-gray-500 text-sm">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'Pending'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.paymentStatus === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye size={16} />}
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Order Details Modal */}
      <OrderDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        order={selectedOrder} 
      />
    </div>
  );
};

export default Orders;
import React from 'react';
import { Clock, MapPin, Package, CreditCard, Truck, User, Mail, Phone } from 'lucide-react';
import Modal from './Modal';
import Badge from '../common/Badge';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: string;
  total: number;
  items?: OrderItem[];
  location: string;
  paymentStatus: string;
  serviceType: string;
  phone?: string;
  address?: string;
  paymentMethod?: string;
  trackingNumber?: string;
  notes?: string;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  if (!order) return null;
  
  // Mock order items if not provided
  const orderItems: OrderItem[] = order.items || [
    {
      id: 'ITEM-1',
      name: 'Continental ExtremeContact DWS06 Plus 245/45R18',
      quantity: 2,
      price: 180.95,
      total: 361.90
    },
    {
      id: 'ITEM-2',
      name: 'Professional Tire Fitting & Balancing',
      quantity: 2,
      price: 25.00,
      total: 50.00
    }
  ];
  
  // Mock additional customer details if not provided
  const customerDetails = {
    phone: order.phone || '(555) 123-4567',
    address: order.address || '123 Main St, Brooklyn, NY 10001',
    paymentMethod: order.paymentMethod || 'Credit Card (ending in 4242)',
    trackingNumber: order.trackingNumber || 'TRK-78952364',
    notes: order.notes || ''
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Processing':
        return 'warning';
      case 'Pending':
        return 'info';
      case 'Cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Details - ${order.id}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <Clock size={18} className="mr-2 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-600">Order Date</h3>
            </div>
            <p className="text-sm font-medium">{formatDate(order.date)}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <Package size={18} className="mr-2 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-600">Order Status</h3>
            </div>
            <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <CreditCard size={18} className="mr-2 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-600">Payment Status</h3>
            </div>
            <Badge color={order.paymentStatus === 'Paid' ? 'success' : 'warning'}>
              {order.paymentStatus}
            </Badge>
          </div>
        </div>
        
        {/* Customer Information */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-base font-medium mb-4">Customer Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex">
                <User size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Name</h4>
                  <p>{order.customer}</p>
                </div>
              </div>
              
              <div className="flex">
                <Mail size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Email</h4>
                  <p>{order.email}</p>
                </div>
              </div>
              
              <div className="flex">
                <Phone size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Phone</h4>
                  <p>{customerDetails.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <MapPin size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Address</h4>
                  <p>{customerDetails.address}</p>
                </div>
              </div>
              
              <div className="flex">
                <Truck size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Service Location</h4>
                  <p>{order.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-base font-medium mb-4">Order Items</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-3 whitespace-normal text-sm">
                      <div className="font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <th colSpan={3} className="px-3 py-2 text-right text-sm font-medium text-gray-600">
                    Total
                  </th>
                  <th className="px-3 py-2 text-right text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Payment and Shipping */}
        <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium mb-3">Payment Information</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm mb-1"><span className="font-medium">Method:</span> {customerDetails.paymentMethod}</p>
              <p className="text-sm"><span className="font-medium">Status:</span> {order.paymentStatus}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-3">Service Information</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm mb-1"><span className="font-medium">Type:</span> {order.serviceType}</p>
              <p className="text-sm"><span className="font-medium">Location:</span> {order.location}</p>
              {order.serviceType !== 'Self-Pickup' && customerDetails.trackingNumber && (
                <p className="text-sm"><span className="font-medium">Tracking #:</span> {customerDetails.trackingNumber}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Notes */}
        {customerDetails.notes && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-base font-medium mb-3">Notes</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm">{customerDetails.notes}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
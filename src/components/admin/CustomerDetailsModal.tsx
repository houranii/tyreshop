import React from 'react';
import { CalendarDays, MapPin, CreditCard, Phone, Mail, ClipboardList } from 'lucide-react';
import Modal from './Modal';
import Badge from '../common/Badge';

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    joinDate: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    preferredLocation?: string;
    paymentMethods?: string[];
    orders?: {
      id: string;
      date: string;
      status: string;
      total: number;
    }[];
    notes?: string;
  } | null;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  customer 
}) => {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Customer: ${customer.firstName} ${customer.lastName}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Customer Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              <span>{customer.phone}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Customer Since</h3>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-gray-500" />
              <span>{new Date(customer.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Address */}
        {customer.address && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Address</h3>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-gray-500 mt-1" />
              <div>
                <p>{customer.address}</p>
                <p>{customer.city}, {customer.state} {customer.zipCode}</p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Preferred Location</h3>
            <p>{customer.preferredLocation || 'No preferred location set'}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            {customer.paymentMethods && customer.paymentMethods.length > 0 ? (
              <ul className="space-y-1">
                {customer.paymentMethods.map((method, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CreditCard size={16} className="text-gray-500" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment methods on file</p>
            )}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Order History */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Order History</h3>
            <div className="text-sm">
              <span className="font-medium">{customer.totalOrders} orders</span>
              <span className="mx-2">•</span>
              <span className="font-medium">${customer.totalSpent.toFixed(2)} total</span>
            </div>
          </div>

          {customer.orders && customer.orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{order.id}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <Badge 
                          variant={
                            order.status === 'Completed' ? 'success' : 
                            order.status === 'In Progress' ? 'warning' : 
                            order.status === 'Cancelled' ? 'danger' : undefined
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No order history</p>
          )}
        </div>

        {/* Notes */}
        {customer.notes && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList size={18} className="text-gray-500" />
              Notes
            </h3>
            <p className="bg-gray-50 p-3 rounded-md">{customer.notes}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CustomerDetailsModal;
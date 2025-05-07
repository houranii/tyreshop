import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Package, 
  MapPin, 
  Users, 
  BarChart2, 
  DollarSign,
  TrendingUp,
  Truck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, Title, AreaChart, DonutChart, BarChart } from '@tremor/react';
import { format, subDays } from 'date-fns';
import { tires } from '../../data/tires';
import { locations } from '../../data/locations';

// Sample data for charts
const salesData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'MMM dd'),
  Sales: Math.floor(Math.random() * 10000) + 5000,
  Orders: Math.floor(Math.random() * 50) + 20,
}));

const categoryData = [
  { name: 'SUV Tires', sales: 35 },
  { name: 'Car Tires', sales: 45 },
  { name: 'Truck Tires', sales: 20 },
];

const locationSales = locations.map(location => ({
  name: location.name,
  sales: Math.floor(Math.random() * 50000) + 20000,
}));

const AdminDashboard: React.FC = () => {
  // Calculate statistics
  const totalProducts = tires.length;
  const totalLocations = locations.length;
  const totalInventory = tires.reduce((sum, tire) => {
    return sum + Object.values(tire.stock).reduce((total, count) => total + count, 0);
  }, 0);
  
  const pendingOrders = 12;
  const completedOrders = 247;
  const cancelledOrders = 5;
  const totalRevenue = 45897.32;
  
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: pendingOrders + completedOrders + cancelledOrders,
      change: '+8%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      title: 'Total Products',
      value: totalProducts,
      change: '-3%',
      trend: 'down',
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Active Locations',
      value: totalLocations,
      change: '0%',
      trend: 'neutral',
      icon: MapPin,
      color: 'orange'
    }
  ];

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Overview of your store's performance and operations
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-full bg-${stat.color}-100 text-${stat.color}-600 mr-3`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
            <div className={`mt-2 flex items-center text-${stat.color}-600 text-sm`}>
              {stat.trend === 'up' ? (
                <ArrowUpRight size={16} className="mr-1" />
              ) : stat.trend === 'down' ? (
                <ArrowDownRight size={16} className="mr-1" />
              ) : null}
              <span>{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Trend */}
        <Card>
          <Title>Sales Trend</Title>
          <AreaChart
            className="h-72 mt-4"
            data={salesData}
            index="date"
            categories={["Sales"]}
            colors={["blue"]}
          />
        </Card>

        {/* Orders Trend */}
        <Card>
          <Title>Orders Trend</Title>
          <AreaChart
            className="h-72 mt-4"
            data={salesData}
            index="date"
            categories={["Orders"]}
            colors={["green"]}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <Card>
          <Title>Sales by Category</Title>
          <DonutChart
            className="h-80 mt-4"
            data={categoryData}
            category="sales"
            index="name"
            colors={["blue", "cyan", "indigo"]}
          />
        </Card>

        {/* Location Performance */}
        <Card>
          <Title>Sales by Location</Title>
          <BarChart
            className="h-80 mt-4"
            data={locationSales}
            index="name"
            categories={["sales"]}
            colors={["blue"]}
          />
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="mt-8">
        <Card>
          <Title>Recent Orders</Title>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: '#ORD-7352',
                    customer: 'John Doe',
                    date: '2023-09-15',
                    status: 'Completed',
                    amount: '$721.40'
                  },
                  {
                    id: '#ORD-7351',
                    customer: 'Jane Smith',
                    date: '2023-09-14',
                    status: 'Processing',
                    amount: '$413.80'
                  },
                  {
                    id: '#ORD-7350',
                    customer: 'Michael Johnson',
                    date: '2023-09-14',
                    status: 'Pending',
                    amount: '$872.25'
                  }
                ].map((order, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {order.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {order.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { title: 'Add New Product', icon: Package, link: '/admin/products/new', color: 'blue' },
          { title: 'View Orders', icon: ShoppingBag, link: '/admin/orders', color: 'green' },
          { title: 'Update Inventory', icon: Truck, link: '/admin/inventory', color: 'purple' },
          { title: 'Generate Reports', icon: BarChart2, link: '/admin/reports', color: 'orange' }
        ].map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`flex items-center p-4 rounded-lg bg-${action.color}-50 text-${action.color}-900 hover:bg-${action.color}-100 transition-colors`}
          >
            <action.icon size={20} className="mr-3" />
            <span className="font-medium">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
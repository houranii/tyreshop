export interface CustomerOrder {
  id: string;
  date: string;
  status: string;
  total: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  preferredLocation?: string;
  paymentMethods?: string[];
  orders?: CustomerOrder[];
  notes?: string;
}

export const customers: Customer[] = [
  {
    id: 'CUST-1001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    joinDate: '2022-06-15',
    totalOrders: 7,
    totalSpent: 2134.75,
    lastOrderDate: '2024-04-12',
    preferredLocation: 'Springfield Downtown',
    paymentMethods: ['Visa ending in 4242', 'Mastercard ending in 8372'],
    notes: 'Prefers appointment on weekends. Always asks for rotation with oil changes.'
  },
  {
    id: 'CUST-1002',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.j@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak Avenue',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    joinDate: '2023-01-22',
    totalOrders: 4,
    totalSpent: 1256.99,
    lastOrderDate: '2024-03-28',
    preferredLocation: 'Springfield East'
  },
  {
    id: 'CUST-1003',
    firstName: 'Michael',
    lastName: 'Davis',
    email: 'michael.davis@example.com',
    phone: '(555) 456-7890',
    address: '789 Pine Road',
    city: 'Lincoln',
    state: 'IL',
    zipCode: '62656',
    joinDate: '2021-11-05',
    totalOrders: 12,
    totalSpent: 3687.25,
    lastOrderDate: '2024-05-01',
    preferredLocation: 'Lincoln Heights',
    notes: 'Fleet manager for Davis Construction. Handles multiple company vehicles.'
  },
  {
    id: 'CUST-1004',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'swilliams@example.com',
    phone: '(555) 321-9876',
    address: '1010 Cedar Lane',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62703',
    joinDate: '2023-03-17',
    totalOrders: 3,
    totalSpent: 864.50,
    lastOrderDate: '2024-02-03',
    preferredLocation: 'Springfield Downtown'
  },
  {
    id: 'CUST-1005',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'rbrown@example.com',
    phone: '(555) 234-5678',
    address: '555 Maple Street',
    city: 'Chatham',
    state: 'IL',
    zipCode: '62629',
    joinDate: '2022-08-30',
    totalOrders: 6,
    totalSpent: 1792.15,
    lastOrderDate: '2024-04-22'
  },
  {
    id: 'CUST-1006',
    firstName: 'Jennifer',
    lastName: 'Miller',
    email: 'jmiller@example.com',
    phone: '(555) 876-5432',
    address: '222 Willow Drive',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62702',
    joinDate: '2021-05-12',
    totalOrders: 9,
    totalSpent: 2914.30,
    lastOrderDate: '2024-04-15',
    preferredLocation: 'Springfield West'
  },
  {
    id: 'CUST-1007',
    firstName: 'David',
    lastName: 'Garcia',
    email: 'dgarcia@example.com',
    phone: '(555) 567-8901',
    address: '333 Birch Court',
    city: 'Sherman',
    state: 'IL',
    zipCode: '62684',
    joinDate: '2023-07-08',
    totalOrders: 5,
    totalSpent: 1345.80,
    lastOrderDate: '2024-03-05'
  },
  {
    id: 'CUST-1008',
    firstName: 'Amanda',
    lastName: 'Wilson',
    email: 'awilson@example.com',
    phone: '(555) 890-1234',
    address: '444 Spruce Avenue',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62707',
    joinDate: '2022-02-19',
    totalOrders: 8,
    totalSpent: 2089.45,
    lastOrderDate: '2024-04-30',
    preferredLocation: 'Springfield East',
    notes: 'Prefers email communication over phone calls.'
  }
];
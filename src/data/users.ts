import { User } from '../types';

export const users: User[] = [
  {
    id: 'u1',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '(212) 555-1122',
    address: {
      street: '123 5th Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    orders: ['o1', 'o3'],
    isAdmin: false
  },
  {
    id: 'u2',
    email: 'janedoe@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '(212) 555-3344',
    address: {
      street: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10022'
    },
    orders: ['o2'],
    isAdmin: false
  },
  {
    id: 'admin',
    email: 'admin@tirestore.com',
    firstName: 'Admin',
    lastName: 'User',
    phone: '(212) 555-9999',
    address: {
      street: '789 Broadway',
      city: 'New York',
      state: 'NY',
      zipCode: '10003'
    },
    orders: [],
    isAdmin: true
  }
];
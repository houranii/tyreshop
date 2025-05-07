export type TireSize = {
  width: number;
  profile: number;
  rimSize: number;
};

export type VehicleType = 'Car' | 'SUV' | 'Truck';

export enum ServiceType {
  FITTING = 'Professional Fitting',
  PICKUP = 'Self-Pickup'
}

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Tire = {
  id: string;
  brand: string;
  model: string;
  size: TireSize;
  vehicleTypes: VehicleType[];
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: Record<string, number>; // locationId: stockCount
  reviews: Review[];
  avgRating: number;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  businessHours: Record<string, string>;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type CartItem = {
  tire: Tire;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  serviceType: ServiceType;
  selectedLocationId: string | null;
  total: number;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  serviceType: ServiceType;
  locationId: string | null;
  total: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  createdAt: string;
  appointmentDate?: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  orders: string[]; // Array of order IDs
  isAdmin: boolean;
};
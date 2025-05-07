import { Location } from '../types';

export const locations: Location[] = [
  {
    id: 'loc1',
    name: 'Burnside Fitting',
    address: '123 Burnside Road',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8053',
    phone: '(03) 555-1234',
    email: 'burnside@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 7:00 PM',
      Tuesday: '8:00 AM - 7:00 PM',
      Wednesday: '8:00 AM - 7:00 PM',
      Thursday: '8:00 AM - 7:00 PM',
      Friday: '8:00 AM - 7:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.489,
      lng: 172.582
    }
  },
  {
    id: 'loc2',
    name: 'Riccarton Fitting',
    address: '456 Riccarton Road',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8041',
    phone: '(03) 555-5678',
    email: 'riccarton@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '7:30 AM - 8:00 PM',
      Tuesday: '7:30 AM - 8:00 PM',
      Wednesday: '7:30 AM - 8:00 PM',
      Thursday: '7:30 AM - 8:00 PM',
      Friday: '7:30 AM - 8:00 PM',
      Saturday: '8:00 AM - 6:00 PM',
      Sunday: '10:00 AM - 4:00 PM'
    },
    coordinates: {
      lat: -43.531,
      lng: 172.599
    }
  },
  {
    id: 'loc3',
    name: 'Rangiora Fitting',
    address: '789 High Street',
    city: 'Rangiora',
    state: 'Canterbury',
    zipCode: '7400',
    phone: '(03) 555-9012',
    email: 'rangiora@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 7:00 PM',
      Tuesday: '8:00 AM - 7:00 PM',
      Wednesday: '8:00 AM - 7:00 PM',
      Thursday: '8:00 AM - 7:00 PM',
      Friday: '8:00 AM - 7:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.303,
      lng: 172.597
    }
  },
  {
    id: 'loc4',
    name: 'Opawa Fitting',
    address: '321 Opawa Road',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8022',
    phone: '(03) 555-3456',
    email: 'opawa@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '7:00 AM - 8:00 PM',
      Tuesday: '7:00 AM - 8:00 PM',
      Wednesday: '7:00 AM - 8:00 PM',
      Thursday: '7:00 AM - 8:00 PM',
      Friday: '7:00 AM - 8:00 PM',
      Saturday: '8:00 AM - 6:00 PM',
      Sunday: '9:00 AM - 5:00 PM'
    },
    coordinates: {
      lat: -43.544,
      lng: 172.666
    }
  },
  {
    id: 'loc5',
    name: 'Kaipoi Fitting',
    address: '654 Charles Street',
    city: 'Kaiapoi',
    state: 'Canterbury',
    zipCode: '7630',
    phone: '(03) 555-7890',
    email: 'kaiapoi@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 7:00 PM',
      Tuesday: '8:00 AM - 7:00 PM',
      Wednesday: '8:00 AM - 7:00 PM',
      Thursday: '8:00 AM - 7:00 PM',
      Friday: '8:00 AM - 7:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.383,
      lng: 172.657
    }
  },
  {
    id: 'loc6',
    name: 'Sydenham Fitting',
    address: '987 Colombo Street',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8023',
    phone: '(03) 555-2345',
    email: 'sydenham@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 6:00 PM',
      Tuesday: '8:00 AM - 6:00 PM',
      Wednesday: '8:00 AM - 6:00 PM',
      Thursday: '8:00 AM - 6:00 PM',
      Friday: '8:00 AM - 6:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.544,
      lng: 172.636
    }
  },
  {
    id: 'loc7',
    name: 'New Brighton Fitting',
    address: '741 Marine Parade',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8083',
    phone: '(03) 555-6789',
    email: 'newbrighton@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '7:30 AM - 7:30 PM',
      Tuesday: '7:30 AM - 7:30 PM',
      Wednesday: '7:30 AM - 7:30 PM',
      Thursday: '7:30 AM - 7:30 PM',
      Friday: '7:30 AM - 7:30 PM',
      Saturday: '8:00 AM - 6:00 PM',
      Sunday: '10:00 AM - 4:00 PM'
    },
    coordinates: {
      lat: -43.507,
      lng: 172.734
    }
  },
  {
    id: 'loc8',
    name: 'Local Pickup (Rangiora)',
    address: '789 High Street',
    city: 'Rangiora',
    state: 'Canterbury',
    zipCode: '7400',
    phone: '(03) 555-9012',
    email: 'rangiora-pickup@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 7:00 PM',
      Tuesday: '8:00 AM - 7:00 PM',
      Wednesday: '8:00 AM - 7:00 PM',
      Thursday: '8:00 AM - 7:00 PM',
      Friday: '8:00 AM - 7:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.303,
      lng: 172.597
    }
  },
  {
    id: 'loc9',
    name: 'Local Pickup (Burnside)',
    address: '123 Burnside Road',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8053',
    phone: '(03) 555-1234',
    email: 'burnside-pickup@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 7:00 PM',
      Tuesday: '8:00 AM - 7:00 PM',
      Wednesday: '8:00 AM - 7:00 PM',
      Thursday: '8:00 AM - 7:00 PM',
      Friday: '8:00 AM - 7:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.489,
      lng: 172.582
    }
  },
  {
    id: 'loc10',
    name: 'Local Pickup (Riccarton)',
    address: '456 Riccarton Road',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8041',
    phone: '(03) 555-5678',
    email: 'riccarton-pickup@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '7:30 AM - 8:00 PM',
      Tuesday: '7:30 AM - 8:00 PM',
      Wednesday: '7:30 AM - 8:00 PM',
      Thursday: '7:30 AM - 8:00 PM',
      Friday: '7:30 AM - 8:00 PM',
      Saturday: '8:00 AM - 6:00 PM',
      Sunday: '10:00 AM - 4:00 PM'
    },
    coordinates: {
      lat: -43.531,
      lng: 172.599
    }
  },
  {
    id: 'loc11',
    name: 'Local Pickup (Opawa)',
    address: '321 Opawa Road',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8022',
    phone: '(03) 555-3456',
    email: 'opawa-pickup@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '7:00 AM - 8:00 PM',
      Tuesday: '7:00 AM - 8:00 PM',
      Wednesday: '7:00 AM - 8:00 PM',
      Thursday: '7:00 AM - 8:00 PM',
      Friday: '7:00 AM - 8:00 PM',
      Saturday: '8:00 AM - 6:00 PM',
      Sunday: '9:00 AM - 5:00 PM'
    },
    coordinates: {
      lat: -43.544,
      lng: 172.666
    }
  },
  {
    id: 'loc12',
    name: 'Local Pickup (Kaiapoi)',
    address: '654 Charles Street',
    city: 'Kaiapoi',
    state: 'Canterbury',
    zipCode: '7630',
    phone: '(03) 555-7890',
    email: 'kaiapoi-pickup@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 7:00 PM',
      Tuesday: '8:00 AM - 7:00 PM',
      Wednesday: '8:00 AM - 7:00 PM',
      Thursday: '8:00 AM - 7:00 PM',
      Friday: '8:00 AM - 7:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.383,
      lng: 172.657
    }
  },
  {
    id: 'loc13',
    name: 'Local Pickup (Sydenham)',
    address: '987 Colombo Street',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8023',
    phone: '(03) 555-2345',
    email: 'sydenham-pickup@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '8:00 AM - 6:00 PM',
      Tuesday: '8:00 AM - 6:00 PM',
      Wednesday: '8:00 AM - 6:00 PM',
      Thursday: '8:00 AM - 6:00 PM',
      Friday: '8:00 AM - 6:00 PM',
      Saturday: '9:00 AM - 5:00 PM',
      Sunday: 'Closed'
    },
    coordinates: {
      lat: -43.544,
      lng: 172.636
    }
  },
  {
    id: 'loc14',
    name: 'Local Pickup (New Brighton)',
    address: '741 Marine Parade',
    city: 'Christchurch',
    state: 'Canterbury',
    zipCode: '8083',
    phone: '(03) 555-6789',
    email: 'newbrighton-pickup@tyrewarehouse.co.nz',
    businessHours: {
      Monday: '7:30 AM - 7:30 PM',
      Tuesday: '7:30 AM - 7:30 PM',
      Wednesday: '7:30 AM - 7:30 PM',
      Thursday: '7:30 AM - 7:30 PM',
      Friday: '7:30 AM - 7:30 PM',
      Saturday: '8:00 AM - 6:00 PM',
      Sunday: '10:00 AM - 4:00 PM'
    },
    coordinates: {
      lat: -43.507,
      lng: 172.734
    }
  }
];
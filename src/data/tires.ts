import { Tire } from '../types';

export const tires: Tire[] = [
  {
    id: '1',
    brand: 'Michelin',
    model: 'Pilot Sport 4',
    size: { width: 225, profile: 45, rimSize: 17 },
    vehicleTypes: ['Car', 'SUV'],
    price: 180,
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Michelin Pilot Sport 4 delivers exceptional steering precision and driving enjoyment. Designed for premium and sports vehicles, it provides outstanding grip and stability at high speeds.',
    features: [
      'Responsive steering and sports handling',
      'Excellent grip on dry roads',
      'Effective braking on wet surfaces',
      'Long lasting performance'
    ],
    specifications: {
      'Tread Depth': '8.5mm',
      'Load Index': '91',
      'Speed Rating': 'Y (up to 186 mph)',
      'Tread Pattern': 'Asymmetric',
      'Season': 'Summer',
      'Warranty': '30,000 miles'
    },
    stock: {
      'loc1': 12,
      'loc2': 8,
      'loc3': 5,
      'loc4': 10,
      'loc5': 6,
      'loc6': 4,
      'loc7': 9
    },
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'John D.',
        rating: 5,
        comment: 'Excellent tires! Grip is amazing and they handle great in all conditions.',
        date: '2023-05-15'
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Sarah M.',
        rating: 4,
        comment: 'Great performance, but a bit pricey.',
        date: '2023-06-22'
      }
    ],
    avgRating: 4.5
  },
  {
    id: '2',
    brand: 'Continental',
    model: 'ExtremeContact DWS 06',
    size: { width: 245, profile: 40, rimSize: 18 },
    vehicleTypes: ['Car', 'SUV'],
    price: 165,
    salePrice: 140,
    image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Continental ExtremeContact DWS 06 is an ultra-high performance all-season tire designed for sports cars, coupes, and sedans. It offers superior traction in dry, wet, and light snow conditions.',
    features: [
      'All-season performance',
      'SportPlus Technology for responsive handling',
      'X-Sipe technology for snow traction',
      'Tuned for performance driving'
    ],
    specifications: {
      'Tread Depth': '10mm',
      'Load Index': '93',
      'Speed Rating': 'W (up to 168 mph)',
      'Tread Pattern': 'Asymmetric',
      'Season': 'All-Season',
      'Warranty': '50,000 miles'
    },
    stock: {
      'loc1': 6,
      'loc2': 10,
      'loc3': 8,
      'loc4': 4,
      'loc5': 12,
      'loc6': 7,
      'loc7': 5
    },
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Michael T.',
        rating: 5,
        comment: 'Best all-season tires I\'ve ever owned. Great in all conditions.',
        date: '2023-04-18'
      }
    ],
    avgRating: 5.0
  },
  {
    id: '3',
    brand: 'Bridgestone',
    model: 'Dueler H/L Alenza Plus',
    size: { width: 265, profile: 70, rimSize: 16 },
    vehicleTypes: ['SUV', 'Truck'],
    price: 210,
    image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Bridgestone Dueler H/L Alenza Plus is designed for light trucks, SUVs, and crossovers. It provides a quiet, comfortable ride with dependable all-season performance.',
    features: [
      'Long tread life',
      'Quiet, comfortable ride',
      'Reliable all-season traction',
      'Fuel-efficient design'
    ],
    specifications: {
      'Tread Depth': '10.5mm',
      'Load Index': '112',
      'Speed Rating': 'H (up to 130 mph)',
      'Tread Pattern': 'Symmetric',
      'Season': 'All-Season',
      'Warranty': '80,000 miles'
    },
    stock: {
      'loc1': 4,
      'loc2': 6,
      'loc3': 10,
      'loc4': 8,
      'loc5': 3,
      'loc6': 5,
      'loc7': 7
    },
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Emily W.',
        rating: 4,
        comment: 'Smooth and quiet ride. Great for my SUV.',
        date: '2023-07-10'
      },
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Robert J.',
        rating: 5,
        comment: 'Excellent tires for my truck. No complaints at all.',
        date: '2023-08-03'
      }
    ],
    avgRating: 4.5
  },
  {
    id: '4',
    brand: 'Goodyear',
    model: 'Eagle F1 Asymmetric 5',
    size: { width: 235, profile: 35, rimSize: 19 },
    vehicleTypes: ['Car'],
    price: 195,
    image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Goodyear Eagle F1 Asymmetric 5 is an ultra-high-performance summer tire designed for sports cars and high-performance vehicles. It offers exceptional grip and precise handling.',
    features: [
      'Optimized contact patch for even pressure distribution',
      'High-grip compound for maximum traction',
      'Reduced braking distance',
      'Responsive handling'
    ],
    specifications: {
      'Tread Depth': '7.5mm',
      'Load Index': '90',
      'Speed Rating': 'Y (up to 186 mph)',
      'Tread Pattern': 'Asymmetric',
      'Season': 'Summer',
      'Warranty': '30,000 miles'
    },
    stock: {
      'loc1': 8,
      'loc2': 5,
      'loc3': 6,
      'loc4': 10,
      'loc5': 4,
      'loc6': 7,
      'loc7': 3
    },
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'Thomas G.',
        rating: 5,
        comment: 'Phenomenal grip! These tires transformed the handling of my car.',
        date: '2023-06-12'
      }
    ],
    avgRating: 5.0
  },
  {
    id: '5',
    brand: 'Pirelli',
    model: 'Scorpion All Terrain Plus',
    size: { width: 275, profile: 65, rimSize: 18 },
    vehicleTypes: ['SUV', 'Truck'],
    price: 225,
    image: 'https://images.pexels.com/photos/185815/pexels-photo-185815.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Pirelli Scorpion All Terrain Plus is designed for SUVs and light trucks. It offers excellent off-road capability without compromising on-road comfort and handling.',
    features: [
      'Aggressive tread pattern for off-road traction',
      'Reinforced sidewalls for durability',
      'Comfortable on-road performance',
      'All-weather capability'
    ],
    specifications: {
      'Tread Depth': '12.5mm',
      'Load Index': '116',
      'Speed Rating': 'T (up to 118 mph)',
      'Tread Pattern': 'Aggressive',
      'Season': 'All-Terrain',
      'Warranty': '65,000 miles'
    },
    stock: {
      'loc1': 5,
      'loc2': 7,
      'loc3': 4,
      'loc4': 6,
      'loc5': 9,
      'loc6': 3,
      'loc7': 8
    },
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Jennifer L.',
        rating: 4,
        comment: 'Great off-road capability and surprisingly quiet on the highway.',
        date: '2023-05-29'
      },
      {
        id: 'r8',
        userId: 'u8',
        userName: 'David P.',
        rating: 5,
        comment: 'Perfect for my Jeep! Handles mud and rock with ease.',
        date: '2023-07-17'
      }
    ],
    avgRating: 4.5
  },
  {
    id: '6',
    brand: 'Yokohama',
    model: 'ADVAN Sport V105',
    size: { width: 255, profile: 40, rimSize: 19 },
    vehicleTypes: ['Car', 'SUV'],
    price: 205,
    salePrice: 185,
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Yokohama ADVAN Sport V105 is a high-performance summer tire designed for sports cars and premium vehicles. It delivers exceptional handling, grip, and stability at high speeds.',
    features: [
      'Advanced compound for maximum grip',
      'Optimized contact patch for even pressure distribution',
      'Excellent high-speed stability',
      'Precise steering response'
    ],
    specifications: {
      'Tread Depth': '8mm',
      'Load Index': '94',
      'Speed Rating': 'Y (up to 186 mph)',
      'Tread Pattern': 'Asymmetric',
      'Season': 'Summer',
      'Warranty': '25,000 miles'
    },
    stock: {
      'loc1': 7,
      'loc2': 4,
      'loc3': 9,
      'loc4': 5,
      'loc5': 6,
      'loc6': 8,
      'loc7': 3
    },
    reviews: [
      {
        id: 'r9',
        userId: 'u9',
        userName: 'Andrew K.',
        rating: 5,
        comment: 'Incredible grip and handling. Worth every penny!',
        date: '2023-08-09'
      },
      {
        id: 'r10',
        userId: 'u10',
        userName: 'Natalie S.',
        rating: 4,
        comment: 'Great performance, but wear out a bit quickly.',
        date: '2023-09-01'
      }
    ],
    avgRating: 4.5
  },
  {
    id: '7',
    brand: 'Dunlop',
    model: 'SP Sport Maxx GT',
    size: { width: 245, profile: 35, rimSize: 20 },
    vehicleTypes: ['Car'],
    price: 220,
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Dunlop SP Sport Maxx GT is an ultra-high-performance summer tire designed for sports cars and high-performance vehicles. It offers exceptional grip and precise handling.',
    features: [
      'High-grip compound for maximum traction',
      'Optimized tread pattern for improved handling',
      'Excellent wet and dry performance',
      'Responsive steering'
    ],
    specifications: {
      'Tread Depth': '7mm',
      'Load Index': '92',
      'Speed Rating': 'Y (up to 186 mph)',
      'Tread Pattern': 'Asymmetric',
      'Season': 'Summer',
      'Warranty': '30,000 miles'
    },
    stock: {
      'loc1': 6,
      'loc2': 5,
      'loc3': 4,
      'loc4': 8,
      'loc5': 10,
      'loc6': 3,
      'loc7': 7
    },
    reviews: [
      {
        id: 'r11',
        userId: 'u11',
        userName: 'Jessica R.',
        rating: 5,
        comment: 'Amazing tires! The grip is phenomenal and they look great too.',
        date: '2023-08-15'
      }
    ],
    avgRating: 5.0
  },
  {
    id: '8',
    brand: 'Falken',
    model: 'Azenis FK510',
    size: { width: 215, profile: 50, rimSize: 17 },
    vehicleTypes: ['Car'],
    price: 135,
    image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Falken Azenis FK510 is a premium summer tire designed for performance vehicles, offering excellent wet and dry grip.',
    features: [
      'Advanced tread compound',
      'Excellent wet and dry traction',
      'Enhanced cornering stability',
      'Low road noise'
    ],
    specifications: {
      'Tread Depth': '8mm',
      'Load Index': '95',
      'Speed Rating': 'Y (up to 186 mph)',
      'Tread Pattern': 'Asymmetric',
      'Season': 'Summer',
      'Warranty': '30,000 miles'
    },
    stock: {
      'loc1': 8,
      'loc2': 6,
      'loc3': 7,
      'loc4': 5,
      'loc5': 4,
      'loc6': 3,
      'loc7': 2
    },
    reviews: [
      {
        id: 'r12',
        userId: 'u12',
        userName: 'Lucas F.',
        rating: 5,
        comment: 'Great tire for spirited driving!',
        date: '2023-09-15'
      }
    ],
    avgRating: 5.0
  },
  {
    id: '9',
    brand: 'Nokian',
    model: 'Hakkapeliitta R3',
    size: { width: 205, profile: 55, rimSize: 16 },
    vehicleTypes: ['Car'],
    price: 160,
    image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'The Nokian Hakkapeliitta R3 is a premium winter tire for safe and comfortable driving in harsh winter conditions.',
    features: [
      'Superior winter grip',
      'Low rolling resistance',
      'Comfortable ride',
      'Eco-friendly materials'
    ],
    specifications: {
      'Tread Depth': '9mm',
      'Load Index': '94',
      'Speed Rating': 'T (up to 118 mph)',
      'Tread Pattern': 'Directional',
      'Season': 'Winter',
      'Warranty': '40,000 miles'
    },
    stock: {
      'loc1': 10,
      'loc2': 8,
      'loc3': 6,
      'loc4': 4,
      'loc5': 2,
      'loc6': 5,
      'loc7': 3
    },
    reviews: [
      {
        id: 'r13',
        userId: 'u13',
        userName: 'Anna S.',
        rating: 5,
        comment: 'Best winter tire I have used.',
        date: '2023-12-01'
      }
    ],
    avgRating: 5.0
  },
  {
    id: '10',
    brand: 'Firestone',
    model: 'Destination LE3',
    size: { width: 265, profile: 60, rimSize: 18 },
    vehicleTypes: ['SUV', 'Truck'],
    price: 175,
    image: 'https://images.pexels.com/photos/185815/pexels-photo-185815.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Firestone Destination LE3 is an all-season tire built for SUVs and light trucks, offering long-lasting performance and comfort.',
    features: [
      'Long tread life',
      'All-season traction',
      'Quiet ride',
      'Fuel-efficient design'
    ],
    specifications: {
      'Tread Depth': '10mm',
      'Load Index': '110',
      'Speed Rating': 'H (up to 130 mph)',
      'Tread Pattern': 'Symmetric',
      'Season': 'All-Season',
      'Warranty': '70,000 miles'
    },
    stock: {
      'loc1': 7,
      'loc2': 9,
      'loc3': 5,
      'loc4': 8,
      'loc5': 6,
      'loc6': 4,
      'loc7': 3
    },
    reviews: [
      {
        id: 'r14',
        userId: 'u14',
        userName: 'Carlos M.',
        rating: 4,
        comment: 'Solid tire for my SUV, good value.',
        date: '2023-10-20'
      }
    ],
    avgRating: 4.0
  },
  {
    id: '11',
    brand: 'BFGoodrich',
    model: 'All-Terrain T/A KO2',
    size: { width: 285, profile: 75, rimSize: 16 },
    vehicleTypes: ['Truck', 'SUV'],
    price: 245,
    image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'BFGoodrich All-Terrain T/A KO2 is a rugged tire for off-road and on-road use, built for durability and traction.',
    features: [
      'Aggressive tread for off-road',
      'Reinforced sidewalls',
      'Long tread life',
      'All-weather capability'
    ],
    specifications: {
      'Tread Depth': '15mm',
      'Load Index': '126',
      'Speed Rating': 'R (up to 106 mph)',
      'Tread Pattern': 'Aggressive',
      'Season': 'All-Terrain',
      'Warranty': '50,000 miles'
    },
    stock: {
      'loc1': 3,
      'loc2': 5,
      'loc3': 2,
      'loc4': 4,
      'loc5': 6,
      'loc6': 7,
      'loc7': 8
    },
    reviews: [
      {
        id: 'r15',
        userId: 'u15',
        userName: 'Mike B.',
        rating: 5,
        comment: 'Handles everything I throw at it!',
        date: '2023-11-11'
      }
    ],
    avgRating: 5.0
  },
  {
    id: '12',
    brand: 'Kumho',
    model: 'Solus TA31',
    size: { width: 195, profile: 65, rimSize: 15 },
    vehicleTypes: ['Car'],
    price: 95,
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Kumho Solus TA31 is a reliable all-season tire for compact and midsize cars, offering comfort and value.',
    features: [
      'All-season performance',
      'Comfortable ride',
      'Low noise',
      'Affordable price'
    ],
    specifications: {
      'Tread Depth': '8mm',
      'Load Index': '91',
      'Speed Rating': 'H (up to 130 mph)',
      'Tread Pattern': 'Symmetric',
      'Season': 'All-Season',
      'Warranty': '60,000 miles'
    },
    stock: {
      'loc1': 12,
      'loc2': 10,
      'loc3': 8,
      'loc4': 6,
      'loc5': 4,
      'loc6': 2,
      'loc7': 1
    },
    reviews: [
      {
        id: 'r16',
        userId: 'u16',
        userName: 'Sophie L.',
        rating: 4,
        comment: 'Quiet and smooth, great for city driving.',
        date: '2023-09-30'
      }
    ],
    avgRating: 4.0
  }
];
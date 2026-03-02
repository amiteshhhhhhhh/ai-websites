export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: 'Running' | 'Basketball' | 'Lifestyle' | 'Training';
  images: string[];
  colors: string[];
  sizes: number[];
  isNew?: boolean;
  isBestSeller?: boolean;
  athlete?: string;
}

export interface CartItem extends Product {
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'v-1',
    name: 'AERO-MAX X1',
    brand: 'VELOCITY',
    price: 240,
    description: 'Engineered for explosive speed and unparalleled comfort. The X1 features our proprietary Carbon-Fiber plate and React-Foam technology.',
    category: 'Running',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: ['Red/Black', 'Neon Green', 'Stealth Black'],
    sizes: [7, 8, 9, 10, 11, 12],
    isNew: true,
    isBestSeller: true,
    athlete: 'Eliud Kipchoge'
  },
  {
    id: 'v-2',
    name: 'TITAN COURT',
    brand: 'VELOCITY',
    price: 190,
    description: 'Dominate the hardwood with the Titan Court. High-top support meets low-profile responsiveness for the ultimate basketball experience.',
    category: 'Basketball',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: ['Lakers Gold', 'Royal Blue', 'Classic White'],
    sizes: [8, 9, 10, 11, 12, 13, 14],
    isBestSeller: true,
    athlete: 'LeBron James'
  },
  {
    id: 'v-3',
    name: 'URBAN PULSE',
    brand: 'VELOCITY',
    price: 160,
    description: 'The perfect blend of street style and athletic performance. Designed for the modern urban explorer.',
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: ['Sandstone', 'Midnight Gray', 'Forest Green'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isNew: true
  },
  {
    id: 'v-4',
    name: 'CORE TRAINER 360',
    brand: 'VELOCITY',
    price: 130,
    description: 'Versatile training shoe for high-intensity workouts. Stable base with multi-directional traction.',
    category: 'Training',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: ['Volt', 'Black/White', 'Crimson'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    isBestSeller: false
  },
  {
    id: 'v-5',
    name: 'ZENITH RUNNER',
    brand: 'VELOCITY',
    price: 210,
    description: 'Ultra-lightweight marathon shoe. Every gram counts when you are chasing your personal best.',
    category: 'Running',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: ['Cloud White', 'Solar Red'],
    sizes: [7, 8, 9, 10, 11, 12],
    isNew: true
  },
  {
    id: 'v-6',
    name: 'APEX LIFT',
    brand: 'VELOCITY',
    price: 150,
    description: 'The ultimate weightlifting shoe. Solid heel for maximum stability during heavy squats and cleans.',
    category: 'Training',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=1000'
    ],
    colors: ['Iron Gray', 'Raw Umber'],
    sizes: [8, 9, 10, 11, 12, 13],
    isBestSeller: true
  }
];

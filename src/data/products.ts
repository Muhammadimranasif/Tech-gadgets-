import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Quantum X Pro Smartphone',
    price: 899.99,
    originalPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&q=80&w=800',
    category: 'smartphones',
    rating: 4.8,
    reviews: 1245,
    stock: 15,
    badges: ['Sale', 'Best Seller'],
    description: 'Experience the future with the Quantum X Pro. Featuring a revolutionary 120Hz OLED display, next-gen AI camera system, and all-day battery life.',
    features: [
      '6.7" OLED Display (120Hz)',
      '108MP Triple Camera System',
      '5000mAh Battery with 65W Fast Charging',
      '5G Ready',
      '256GB Storage / 12GB RAM'
    ]
  },
  {
    id: 'p2',
    name: 'AeroBuds Pro Noise Cancelling',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800',
    category: 'audio',
    rating: 4.9,
    reviews: 892,
    stock: 5,
    badges: ['Low Stock'],
    description: 'Immerse yourself in pure sound. Active Noise Cancellation blocks out the world, while spatial audio surrounds you.',
    features: [
      'Active Noise Cancellation',
      'Transparency Mode',
      'Up to 24 hours battery life',
      'Sweat and water resistant',
      'Customizable fit'
    ]
  },
  {
    id: 'p3',
    name: 'Titanium Smart Watch Series 8',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
    category: 'wearables',
    rating: 4.7,
    reviews: 534,
    stock: 42,
    badges: ['New Arrival'],
    description: 'Your ultimate fitness and health companion. Track your workouts, monitor your heart rate, and stay connected on the go.',
    features: [
      'Always-On Retina display',
      'Blood Oxygen app',
      'ECG app',
      'Water resistant to 50 meters',
      'Built-in GPS'
    ]
  },
  {
    id: 'p4',
    name: 'Nova Mechanical Keyboard',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    category: 'pc-parts',
    rating: 4.6,
    reviews: 312,
    stock: 28,
    badges: ['Sale'],
    description: 'Precision engineered for gamers and typists. Custom tactile switches and per-key RGB lighting.',
    features: [
      'Hot-swappable switches',
      'Per-key RGB lighting',
      'Aircraft-grade aluminum frame',
      'Detachable USB-C cable',
      'PBT double-shot keycaps'
    ]
  },
  {
    id: 'p5',
    name: 'Stealth Wireless Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&q=80&w=800',
    category: 'pc-parts',
    rating: 4.5,
    reviews: 421,
    stock: 60,
    description: 'Ultra-lightweight design with a flawless 25K sensor for pixel-perfect tracking.',
    features: [
      '25K DPI Sensor',
      'Ultra-lightweight (63g)',
      '70-hour battery life',
      'PTFE feet',
      '5 programmable buttons'
    ]
  },
  {
    id: 'p6',
    name: 'Lumina 4K Webcam',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80&w=800',
    category: 'accessories',
    rating: 4.4,
    reviews: 189,
    stock: 12,
    description: 'Look your best in every meeting. AI-powered auto-framing and exceptional low-light performance.',
    features: [
      '4K Ultra HD resolution',
      'AI Auto-framing',
      'Dual noise-reducing mics',
      'Privacy cover included',
      'USB-C connection'
    ]
  },
  {
    id: 'p7',
    name: 'Pulse Portable Bluetooth Speaker',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
    category: 'audio',
    rating: 4.8,
    reviews: 675,
    stock: 35,
    badges: ['Sale'],
    description: 'Take the party anywhere. 360-degree sound, waterproof design, and a mesmerizing LED light show.',
    features: [
      '360-degree sound',
      'IPX7 Waterproof',
      '12-hour playtime',
      'Customizable LED light show',
      'PartyBoost compatible'
    ]
  },
  {
    id: 'p8',
    name: 'Nexus 27" 144Hz Gaming Monitor',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    category: 'pc-parts',
    rating: 4.7,
    reviews: 256,
    stock: 8,
    badges: ['Low Stock', 'Sale'],
    description: 'Experience buttery-smooth gameplay with a 144Hz refresh rate and 1ms response time on a vibrant IPS panel.',
    features: [
      '27" QHD (2560x1440) IPS Panel',
      '144Hz Refresh Rate',
      '1ms Response Time',
      'G-Sync Compatible',
      'HDR400 Support'
    ]
  }
];

export const getFeaturedProducts = () => products.slice(0, 4);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
export const getProductById = (id: string) => products.find(p => p.id === id);

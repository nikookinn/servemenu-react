import type { MenuItem, PricingPlan, Feature } from '../types';

export const MENU_CATEGORIES = [
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'main-courses', name: 'Main Courses', icon: '🍖' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export const SAMPLE_MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan cheese and croutons',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    category: 'appetizers',
  },
  {
    id: '2',
    name: 'Crispy Calamari',
    description: 'Golden fried squid rings with marinara sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400',
    category: 'appetizers',
  },
  {
    id: '3',
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes and basil',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400',
    category: 'appetizers',
  },
  // Main Courses
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Perfectly grilled Atlantic salmon with lemon butter',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    category: 'main-courses',
  },
  {
    id: '5',
    name: 'Ribeye Steak',
    description: 'Juicy 12oz ribeye cooked to perfection',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    category: 'main-courses',
  },
  {
    id: '6',
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast with marinara and mozzarella',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400',
    category: 'main-courses',
  },
  // Beverages
  {
    id: '7',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
    category: 'beverages',
  },
  {
    id: '8',
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk foam',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    category: 'beverages',
  },
  {
    id: '9',
    name: 'Craft Beer',
    description: 'Selection of local craft beers',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400',
    category: 'beverages',
  },
  // Desserts
  {
    id: '10',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with ganache',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    category: 'desserts',
  },
  {
    id: '11',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    category: 'desserts',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    annualPrice: 0,
    buttonText: 'Start Free',
    features: [
      '5 tables/QR codes per store',
      '1 store management',
      '1 admin user',
      '100 QR orders/month',
      '150 online orders/month',
      'Basic features',
      'Email support',
      'Community forum access',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 10,
    annualPrice: 96, // 20% discount (10 * 12 * 0.8)
    buttonText: 'Get Started',
    highlighted: true,
    features: [
      '15 tables/QR codes per store',
      '2 stores management',
      '2 admins per store',
      'Unlimited orders',
      'Advanced features',
      'PayPal + Stripe integration',
      'Priority email support',
      'Custom branding',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 50,
    annualPrice: 480, // 20% discount (50 * 12 * 0.8)
    buttonText: 'Contact Sales',
    features: [
      '40 tables/QR codes per store',
      '5 stores management',
      '3 admins per store',
      'All Standard features',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Dedicated account manager',
    ],
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'qr-ordering',
    title: 'QR Code Ordering System',
    description: 'Contactless ordering with instant QR code generation for each table',
    icon: 'QrCode2',
  },
  {
    id: 'multi-store',
    title: 'Multi-store Management',
    description: 'Manage multiple restaurant locations from a single dashboard',
    icon: 'Store',
  },
  {
    id: 'analytics',
    title: 'Real-time Analytics',
    description: 'Track orders, revenue, and customer behavior in real-time',
    icon: 'Analytics',
  },
  {
    id: 'payment',
    title: 'Payment Integration',
    description: 'Accept payments through multiple gateways including Stripe and PayPal',
    icon: 'Payment',
  },
  {
    id: 'customizable',
    title: 'Customizable Menus',
    description: 'Create beautiful, branded menus with unlimited customization options',
    icon: 'MenuBook',
  },
];

// Common types used across the application

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  action?: () => void;
}


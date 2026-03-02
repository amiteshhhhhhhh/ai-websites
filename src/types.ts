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

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  priceModifier?: number;
  image?: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: Category;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  highlights?: string[];
  colors?: string[];
  sizes?: string[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  verified: boolean;
  helpfulCount?: number;
  unhelpfulCount?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variantId?: string;
  quantity: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  priceRange: PriceRange;
  brands: string[];
  ratings: number[];
  sortBy: "price-asc" | "price-desc" | "rating" | "newest" | "popular";
}

export interface CheckoutFormValues {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  subscribe: boolean;
  shipping: AddressValues;
  billingSameAsShipping: boolean;
  billing?: AddressValues;
  shippingMethod: string;
  discountCode?: string;
}

export interface AddressValues {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
}

export interface ApiSingleResponse<T> {
  data: T;
}

# API Services Documentation

This document explains the new API service architecture implemented in the `src/lib` folder.

## 📁 Folder Structure

```
src/lib/
├── api/                          # Core API service layer
│   ├── client.ts                 # HTTP client with retry, timeout, caching
│   ├── mock-simulation.ts        # Mock response simulation
│   ├── services/                 # Domain-specific services
│   │   ├── products.ts           # Product & category services
│   │   ├── auth.ts               # Authentication & user services
│   │   ├── cart.ts               # Shopping cart service
│   │   ├── payments.ts           # Payment processing service
│   │   ├── orders.ts             # Order management service
│   │   ├── stripe.ts             # Stripe integration
│   │   └── index.ts              # Service exports
│   ├── types/                    # TypeScript interfaces
│   │   ├── common.ts             # Common API types
│   │   ├── products.ts           # Product-related types
│   │   ├── auth.ts               # Auth & user types
│   │   ├── cart.ts               # Cart types
│   │   ├── payments.ts           # Payment types
│   │   ├── orders.ts             # Order types
│   │   └── index.ts              # Type exports
│   └── index.ts                  # Main API exports
├── config/                       # Configuration
│   ├── api.ts                    # API & cache configuration
│   ├── endpoints.ts              # API endpoint definitions
│   └── index.ts                  # Config exports
├── constants/                    # Application constants
│   └── index.ts                  # Status codes, error codes, etc.
├── utils/                        # Utility functions
│   ├── common.ts                 # General utilities
│   ├── format.ts                 # Formatting functions
│   ├── date.ts                   # Date utilities
│   ├── validation.ts             # Validation functions
│   └── index.ts                  # Util exports
├── mock/                         # Mock data
│   ├── data.ts                   # Mock products, categories, etc.
│   └── index.ts                  # Mock exports
├── api-legacy.ts                 # Backward compatibility layer
├── client-api-legacy.ts          # Client-side compatibility
├── utils.ts                      # Original utils (for cn function)
└── index.ts                      # Main lib exports
```

## 🚀 Quick Start

### Using the New API Services

```typescript
import { 
  productService, 
  categoryService, 
  authService, 
  cartService, 
  orderService 
} from "@/lib/api/services";

// Get products with filters
const products = await productService.getProducts({
  filters: { 
    categorySlug: "smartphones",
    priceMin: 100,
    priceMax: 1000 
  },
  pagination: { page: 1, pageSize: 20 },
  sort: { sortBy: "price", sortOrder: "asc" }
});

// Get single product
const product = await productService.getProduct("iphone-15");

// User authentication
const authResult = await authService.login({
  email: "user@example.com",
  password: "password"
});

// Add to cart
const cartItem = await cartService.addToCart({
  productId: "prod-123",
  variantId: "var-456",
  quantity: 2
});
```

### Using Configuration

```typescript
import { API_ENDPOINTS, CACHE_CONFIG } from "@/lib/config";

// Use predefined endpoints
const endpoint = API_ENDPOINTS.PRODUCTS.DETAIL("product-slug");

// Use cache configuration
const options = {
  ...CACHE_CONFIG.PRODUCTS,
  tags: ["custom-tag"]
};
```

### Using Utilities

```typescript
import { 
  formatCurrency, 
  formatDate, 
  isValidEmail, 
  debounce 
} from "@/lib/utils";

// Format currency
const price = formatCurrency(99.99); // "$99.99"

// Validate email
const isValid = isValidEmail("user@example.com"); // true

// Debounce function
const debouncedSearch = debounce(searchFunction, 300);
```

## 🔧 Service Classes

### ProductService

```typescript
// Get products with advanced filtering
await productService.getProducts({
  query: "smartphone",
  filters: {
    categorySlug: "electronics",
    priceMin: 200,
    priceMax: 1500,
    brands: ["apple", "samsung"],
    inStock: true
  },
  pagination: { page: 1, pageSize: 20 },
  sort: { sortBy: "rating", sortOrder: "desc" }
});

// Get related products
await productService.getRelatedProducts("product-id");

// Create product review
await productService.createReview({
  productId: "prod-123",
  rating: 5,
  comment: "Great product!"
});
```

### AuthService & UserService

```typescript
// Authentication
const auth = await authService.login({ email, password });
await authService.logout();
await authService.refreshToken(refreshToken);

// User management
await userService.updateProfile({ firstName: "John" });
await userService.changePassword({ currentPassword, newPassword });

// Address management
await userService.createAddress({
  type: "shipping",
  firstName: "John",
  lastName: "Doe",
  addressLine1: "123 Main St",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "US"
});
```

### CartService

```typescript
// Cart operations
await cartService.addToCart({ productId: "prod-123", quantity: 2 });
await cartService.updateCartItem({ itemId: "item-456", quantity: 3 });
await cartService.removeCartItem("item-456");
await cartService.applyCoupon({ code: "SAVE20" });

// Get cart summary
const summary = await cartService.getCartSummary();
```

### OrderService

```typescript
// Order management
const orders = await orderService.getOrders({
  filters: { 
    status: ["pending", "confirmed"],
    dateFrom: "2024-01-01" 
  },
  pagination: { page: 1, pageSize: 10 }
});

// Create order
await orderService.createOrder({
  items: [{ productId: "prod-123", quantity: 2 }],
  shippingAddressId: "addr-456",
  shippingMethodId: "method-789"
});

// Track order
const tracking = await orderService.trackOrder("order-123");
```

### PaymentService

```typescript
// Payment processing
const paymentIntent = await paymentService.createPaymentIntent({
  amount: 9999, // $99.99 in cents
  currency: "usd"
});

await paymentService.confirmPayment({
  paymentIntentId: paymentIntent.data.id,
  paymentMethodId: "pm_123"
});

// Payment methods
const methods = await paymentService.getPaymentMethods();
await paymentService.addPaymentMethod("pm_new_123");
```

## 🛠 Advanced Features

### Error Handling

The API client includes comprehensive error handling with automatic retries and fallback mechanisms:

```typescript
import { ApiClientError } from "@/lib/api/client";

try {
  const product = await productService.getProduct("non-existent");
} catch (error) {
  if (error instanceof ApiClientError) {
    console.log("Status:", error.status);
    console.log("Code:", error.code);
    console.log("Details:", error.details);
  }
}
```

### Caching & Revalidation

Built-in caching with Next.js integration:

```typescript
// Get data with custom cache options
const products = await productService.getProducts({}, {
  revalidate: 60, // Cache for 1 minute
  tags: ["products", "featured"]
});

// Revalidate cache manually
productService.revalidate(["products"]);
```

### Mock Data Fallback

Automatic fallback to mock data when API is unavailable:

```typescript
// Will use real API if available, fallback to mock data
const products = await productService.getProducts();
```

## 🔄 Migration Guide

### From Legacy API

**Old way:**
```typescript
import { getProducts, getProduct } from "@/lib/api";

const products = await getProducts();
const product = await getProduct("slug");
```

**New way:**
```typescript
import { productService } from "@/lib/api/services";

const productsResponse = await productService.getProducts();
const products = productsResponse.products; // Note: different response structure

const productResponse = await productService.getProduct("slug");
const product = productResponse.data;
```

**Compatibility layer (temporary):**
```typescript
import { getProductsLegacy as getProducts } from "@/lib";
// Works exactly like the old API
```

## 📊 Type Safety

All services are fully typed with TypeScript:

```typescript
import type { 
  ProductSearchParams, 
  CreateOrderRequest, 
  User 
} from "@/lib/api/types";

// Type-safe parameters
const searchParams: ProductSearchParams = {
  filters: { categorySlug: "electronics" },
  pagination: { page: 1, pageSize: 20 }
};

// Type-safe responses
const user: User = authResponse.user;
```

## 🔐 Authentication

The API client automatically handles authentication tokens:

```typescript
// Login sets the token automatically
await authService.login({ email, password });

// All subsequent requests include the auth token
const orders = await orderService.getOrders(); // Authenticated request

// Logout clears the token
await authService.logout();
```

## 🎯 Best Practices

1. **Use services instead of direct API calls**
2. **Leverage TypeScript types for better DX**
3. **Handle errors appropriately**
4. **Use caching strategically**
5. **Prefer the new API over legacy functions**
6. **Keep API keys and secrets in environment variables**

## 🚦 Constants & Configuration

```typescript
import { 
  HTTP_STATUS, 
  ORDER_STATUS, 
  PRODUCT_SORT_OPTIONS 
} from "@/lib/constants";

// Use predefined constants
if (response.status === HTTP_STATUS.NOT_FOUND) {
  // Handle not found
}

// Filter by order status
const filters = {
  status: [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED]
};
```

This new architecture provides a scalable, maintainable, and type-safe foundation for all API interactions in your application.
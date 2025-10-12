// Export all services
export * from "./products";
export * from "./auth";
export * from "./cart";
export * from "./payments";
export * from "./orders";

// Export service instances for easy import
export { 
  productService, 
  categoryService 
} from "./products";

export { 
  authService, 
  userService 
} from "./auth";

export { cartService } from "./cart";
export { paymentService } from "./payments";
export { orderService } from "./orders";
"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductService } from "@/lib/api/services/products";
import type { Product } from "@/types";

const productService = new ProductService();

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getProducts({ pagination: { limit: 50 } });
      setProducts(response.products);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      // In a real app, you would call: await productsService.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Image</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img
                          src={product.images[0] || "/placeholder.png"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {product.description}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {product.category?.name || "Uncategorized"}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                          {product.inStock ? "Available" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/product/${product.slug}`} target="_blank">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

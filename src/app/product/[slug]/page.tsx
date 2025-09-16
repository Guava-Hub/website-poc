import { notFound } from "next/navigation";

import { getProduct, getProductReviews, getProducts } from "@/lib/api";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDetailContent } from "@/components/product/product-detail-content";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const { data: product } = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const [{ data: reviews }, { data: allProducts }] = await Promise.all([
    getProductReviews(product.id),
    getProducts()
  ]);

  const related = allProducts
    .filter((item) => item.category.id === product.category.id && item.id !== product.id)
    .slice(0, 4);
  const images = product.images.length
    ? product.images
    : ["https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"];

  return (
    <div className="container space-y-10 py-12">
      <ProductGallery images={images} alt={product.name} />
      <ProductDetailContent product={product} related={related} reviews={reviews} />
    </div>
  );
}

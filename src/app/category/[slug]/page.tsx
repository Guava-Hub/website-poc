import { notFound } from "next/navigation";

import { getCategories, getCategoryProducts } from "@/lib/api";
import { CategoryPageContent } from "@/components/product/category-page-content";
import { Separator } from "@/components/ui/separator";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const [{ data: categories }, { data: products }] = await Promise.all([
    getCategories(),
    getCategoryProducts(slug)
  ]);

  const category = categories.find((item) => item.slug === slug) ?? null;

  if (!category) {
    notFound();
  }

  return (
    <div className="container space-y-10 py-12">
      <header className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">{category.name}</span>
        <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{category.description}</p>
        <Separator className="mt-6" />
      </header>
      <CategoryPageContent products={products} category={category} />
    </div>
  );
}

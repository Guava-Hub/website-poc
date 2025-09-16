import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end gap-2 p-6 text-white">
        <h3 className="text-xl font-semibold">{category.name}</h3>
        <p className="text-sm text-white/80 line-clamp-2">{category.description}</p>
        <span className="inline-flex items-center text-sm font-medium">
          Shop now <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

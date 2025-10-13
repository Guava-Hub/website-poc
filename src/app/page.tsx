import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck, HeadphonesIcon } from "lucide-react";

import { getCategoriesLegacy as getCategories, getProductsLegacy as getProducts } from "@/lib";
import { CategoryCard } from "@/components/product/category-card";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function HomePage() {
  const [{ data: categories }, { data: products }] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  const trendingProducts = products.slice(0, 4);
  const featuredCategories = categories.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent/30 via-background to-background" />
        <div className="container grid gap-10 py-24 lg:grid-cols-[1fr,1fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" /> Introducing the Aurora Collection
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Elevate your everyday with innovative technology
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Discover premium devices curated for future-forward creators. From intelligent smartphones to immersive audio,
              Guava Hub helps you stay connected to what matters most.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/category/smartphones">
                  Shop best sellers <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/category/laptops">Explore the full collection</Link>
              </Button>
            </div>
            <div className="grid gap-6 rounded-2xl border bg-background/60 p-6 shadow-sm sm:grid-cols-3">
              <Feature
                icon={<Truck className="h-5 w-5" />}
                title="Free express shipping"
                description="Delivered in 2-3 days with real-time tracking"
              />
              <Feature
                icon={<ShieldCheck className="h-5 w-5" />}
                title="2-year warranty"
                description="Complimentary coverage and hassle-free returns"
              />
              <Feature
                icon={<HeadphonesIcon className="h-5 w-5" />}
                title="24/7 concierge"
                description="Access to product specialists any time"
              />
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -right-16 top-10 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border shadow-xl">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80"
              >
                <source src="https://cdn.v0.dev/assets/hero-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Shop by category</h2>
            <p className="text-sm text-muted-foreground">
              Browse curated selections designed around how you live, work, and play.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/category/smartphones">View all categories</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="container space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Trending now</h2>
            <p className="text-sm text-muted-foreground">
              Handpicked best sellers designed to perform from day one.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/category/all">View all products</Link>
          </Button>
        </div>
        <ProductGrid products={trendingProducts} />
      </section>

      <Separator className="container" />

      <section className="container grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight">Why creators choose Guava Hub</h2>
          <p className="text-lg text-muted-foreground">
            We combine premium hardware with seamless experiences to help you do more with every moment.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Highlight
              title="Curated collections"
              description="Expertly sourced devices that work beautifully together."
            />
            <Highlight
              title="Sustainable sourcing"
              description="Responsible suppliers and packaging that minimize impact."
            />
            <Highlight
              title="Priority support"
              description="US-based specialists ready when you need them most."
            />
            <Highlight
              title="Flexible payments"
              description="Checkout with Stripe and choose the plan that fits you."
            />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary/90 to-primary/60 p-10 text-primary-foreground shadow-xl">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-widest">
              Member exclusive
            </span>
            <h3 className="text-3xl font-semibold">Unlock insider access</h3>
            <p className="text-sm text-primary-foreground/90">
              Join Guava Hub Collective for personalized product drops, studio experiences, and extended warranties on every device.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-primary">
              <Link href="/signup">Become a member</Link>
            </Button>
          </div>
          <div className="absolute -bottom-16 -right-12 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-background/50 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function Highlight({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border bg-muted/40 p-5">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

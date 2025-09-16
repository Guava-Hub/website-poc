import type { Category, Product, Review } from "@/types";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Smartphones",
    slug: "smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    description: "Latest flagship smartphones with cutting-edge technology."
  },
  {
    id: "cat-2",
    name: "Laptops",
    slug: "laptops",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    description: "High-performance laptops for work and play."
  },
  {
    id: "cat-3",
    name: "Audio",
    slug: "audio",
    image:
      "https://images.unsplash.com/photo-1471479917193-f00955256257?auto=format&fit=crop&w=1200&q=80",
    description: "Premium headphones, speakers, and audio accessories."
  },
  {
    id: "cat-4",
    name: "Wearables",
    slug: "wearables",
    image:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
    description: "Smartwatches and fitness trackers that keep you connected."
  }
];

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Aurora X Pro",
    slug: "aurora-x-pro",
    description:
      "Experience the future with Aurora X Pro featuring a stunning 6.7"" AMOLED display, triple-lens camera system, and all-day battery life.",
    price: 999,
    salePrice: 899,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510554310709-f60c6d5cd0d5?auto=format&fit=crop&w=1200&q=80"
    ],
    category: mockCategories[0],
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Midnight Black", "Polar Silver", "Sunset Gold"]
      },
      {
        id: "storage",
        name: "Storage",
        options: ["128GB", "256GB", "512GB"],
        priceModifier: 100
      }
    ],
    rating: 4.7,
    reviewCount: 124,
    inStock: true,
    sku: "AURXPRO-001",
    highlights: [
      '6.7" AMOLED display',
      "Triple 64MP camera system",
      "Fast 45W charging",
      "Water resistant"
    ],
    colors: ["#0f172a", "#94a3b8", "#f97316"],
    sizes: []
  },
  {
    id: "prod-2",
    name: "ZenBook Ultra 15",
    slug: "zenbook-ultra-15",
    description:
      "Ultra-thin laptop with 11th Gen Intel Core processor, OLED display, and premium magnesium alloy design.",
    price: 1899,
    salePrice: 1699,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=1200&q=80"
    ],
    category: mockCategories[1],
    variants: [
      {
        id: "memory",
        name: "Memory",
        options: ["16GB", "32GB"]
      },
      {
        id: "storage",
        name: "Storage",
        options: ["512GB SSD", "1TB SSD"],
        priceModifier: 150
      }
    ],
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    sku: "ZENULTRA15-002",
    highlights: [
      '15" 4K OLED display',
      "Intel Core i9 processor",
      "NVIDIA RTX graphics",
      "Thunderbolt 4 ports"
    ]
  },
  {
    id: "prod-3",
    name: "Pulse Wireless Earbuds",
    slug: "pulse-wireless-earbuds",
    description:
      "Immersive sound with active noise cancellation, 32-hour battery life, and sweat-resistant design.",
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1471479917193-f00955256257?auto=format&fit=crop&w=1200&q=80"
    ],
    category: mockCategories[2],
    variants: [
      {
        id: "color",
        name: "Color",
        options: ["Graphite", "Pearl", "Sage"]
      }
    ],
    rating: 4.6,
    reviewCount: 210,
    inStock: true,
    sku: "PULSEBUDS-003",
    highlights: [
      "Active noise cancellation",
      "Wireless charging case",
      "Transparency mode",
      "IPX5 water resistance"
    ]
  },
  {
    id: "prod-4",
    name: "Vita Smartwatch 3",
    slug: "vita-smartwatch-3",
    description:
      "Track your health with advanced sensors, GPS, and 7-day battery life in a sleek stainless steel design.",
    price: 349,
    salePrice: 299,
    images: [
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80"
    ],
    category: mockCategories[3],
    variants: [
      {
        id: "band",
        name: "Band",
        options: ["Sport", "Leather", "Metal"]
      }
    ],
    rating: 4.4,
    reviewCount: 65,
    inStock: true,
    sku: "VITA3-004",
    highlights: [
      "ECG and SpO2 tracking",
      "Built-in GPS",
      "7-day battery life",
      "Contactless payments"
    ]
  }
];

export const mockReviews: Record<string, Review[]> = {
  "prod-1": [
    {
      id: "rev-1",
      rating: 5,
      comment:
        "Absolutely love this phone! The camera quality is top-notch and the battery easily lasts all day.",
      author: "Alex Johnson",
      date: "2024-02-14",
      verified: true,
      helpfulCount: 12,
      unhelpfulCount: 1
    },
    {
      id: "rev-2",
      rating: 4,
      comment: "Great performance but wish the storage upgrades were a bit more affordable.",
      author: "Maria Chen",
      date: "2024-03-02",
      verified: true,
      helpfulCount: 5,
      unhelpfulCount: 0
    }
  ],
  "prod-2": [
    {
      id: "rev-3",
      rating: 5,
      comment:
        "The OLED display is stunning and the build quality is premium. Perfect for creative work.",
      author: "Jordan Smith",
      date: "2024-01-28",
      verified: true,
      helpfulCount: 9,
      unhelpfulCount: 0
    }
  ]
};

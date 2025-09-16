# Visionary Commerce

Visionary Commerce is a modern e-commerce proof of concept built with Next.js 14, the App Router, and Tailwind CSS. The UI leverages shadcn/ui primitives to deliver a premium shopping experience with responsive layouts, animated components, and rich interactivity.

## Features

- **Home page** showcasing hero messaging, category highlights, and trending products.
- **Category browsing** with filtering, sorting, responsive product grids, and quick views.
- **Detailed product pages** featuring image galleries, variants, specs, reviews, and related products.
- **Checkout flow** with cart management, address forms validated with Zod, shipping selection, and Stripe Elements integration.
- **Global UI elements** including navigation, mobile menus, search suggestions, wishlist actions, toasts, and newsletter signups.

## Tech Stack

- Next.js 14 App Router with TypeScript
- Tailwind CSS & shadcn/ui component system
- Stripe Elements for secure payments
- React Hook Form + Zod for form validation
- Lucide icons and Radix primitives for accessible UI patterns

## Getting Started

> **Note:** Package installation requires access to the public npm registry. If your environment restricts that access, `npm install` may fail.

```bash
npm install
npm run dev
```

The application loads mock data by default. To connect a real backend, set `NEXT_PUBLIC_API_URL` to the base URL of your API.

## Project Structure

```
src/
├── app/               # App Router routes and layouts
├── components/        # UI building blocks, layout, product, cart, and form modules
├── hooks/             # Client hooks (cart, products)
├── lib/               # API helpers, mock data, utilities, Stripe loader
├── types/             # Shared TypeScript interfaces
```

Enjoy exploring the Visionary Commerce storefront!

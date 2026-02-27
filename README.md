# Mezzanine - B2B Construction & Contracting Platform

A high-fidelity, interactive, frontend-only MVP for a B2B Construction & Contracting Platform built with React, Vite, and Tailwind CSS.

## Features

- **Registration & Onboarding**: Clean registration form with industry selection
- **Setup Wizard**: 3-step guided setup process
- **Marketplace**: Browse construction equipment with product cards
- **Checkout System**: Complete checkout flow with delivery and payment options
- **Torbiona Credit Calculator**: AI-powered credit scoring visualization
- **Modular Architecture**: Highly reusable components

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- Context API (state management)

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   └── Radio.jsx
│   ├── layout/          # Layout components
│   │   ├── Sidebar.jsx
│   │   └── DashboardLayout.jsx
│   ├── Registration.jsx
│   ├── SetupWizard.jsx
│   ├── Marketplace.jsx
│   ├── ProductCard.jsx
│   ├── CheckoutPanel.jsx
│   └── TorbionaModal.jsx
├── context/
│   └── AppContext.jsx   # Global state management
├── data/
│   └── mockData.js      # Mock data for products, etc.
├── App.jsx
└── main.jsx
```

## User Flow

1. **Registration** → Enter user details and select industry
2. **Setup Wizard** → Complete 3-step setup process
3. **Marketplace** → Browse and add products to cart
4. **Checkout** → Select delivery and payment options
5. **Torbiona** → View credit analysis and approval (if Torbiona selected)

## Design System

- **Background**: #f7f4e8 (Cream)
- **Primary**: #56afb6 (Teal)
- **Secondary**: #eeeeee (Light Gray)
- **Text**: #1e293b (Dark Slate), #475569 (Slate Gray)
- **Typography**: Plus Jakarta Sans, Tajawal
- **Style**: Modern SaaS with glassmorphism elements

## Mock Data

All data is stored in `src/data/mockData.js` including:
- Products
- Delivery options
- Payment methods
- Torbiona credit scores

## Notes

- No backend or database - all state managed with React Context
- Fully responsive design
- Ready for investor pitch demonstrations

# Mezzanine - B2B Construction & Contracting Platform

A high-fidelity, interactive, frontend-only MVP for a B2B Construction & Contracting Platform built with React, Vite, and Tailwind CSS.

## 🎨 Design System

### Color Palette
- **Primary Background**: #f7f4e8 (Cream)
- **Primary Action/Brand**: #56afb6 (Teal with gradients)
- **Secondary Background**: White and #eeeeee (Light Gray)
- **Text**: #1e293b (Dark Slate)

### UI Style
- Glassmorphism cards with backdrop blur
- Rounded-2xl corners throughout
- Soft shadows (shadow-lg)
- Teal gradient buttons (from-teal-400 to-teal-600)
- Lucide React icons

## 🚀 Features

### View 1: Auth & Registration
- **3 Tabs**: Company Login, Employee Login, Register Company
- Clean glass-card centered layout
- Registration form with 8 fields + industry dropdown
- Smooth tab transitions with teal gradient highlights

### View 2: Quick Setup Wizard
- **Step 1**: Create Organizational Structure
  - 6 department cards (Executive, Finance, HR, Operations, IT, Sales)
  - Mock CEO profile in Executive Management
  - "Add Employee" buttons
- **Step 2**: Create Company Page
  - Company info form (Name, Industry, About, Contact)
  - Mock upload areas for Logo, Building, Team images
- **Step 3**: Add Products
  - Mock product grid (Polyethylene, Chemicals, Equipment)
  - "Add Product" button

### View 3: Main B2B Platform
- **Top Navbar**: Logo, Search bar, User profile, "Go to CRM Dashboard" button
- **Marketplace Feed**: Construction equipment products
- **Product Cards**: 
  - Arabic titles (حفارات ثقيلة للمشاريع الكبرى)
  - Price display ($450,000)
  - Stock indicators
  - Quantity input & Delivery date picker
  - "Contact Seller" and "Buy" buttons

### View 4: Checkout & Torbiona Flow
- **Checkout Modal**:
  - Order summary with product details
  - 3 delivery options (Fast/Standard/Pickup)
  - 2 payment methods (Pay Now/Torbiona)
  - Dynamic price calculation
- **Torbiona Credit Calculator**:
  - AI credit analysis with 5 score categories
  - Circular progress showing 70% overall score
  - Approval message with $500K credit limit
  - Gradient progress bars and circular SVG

### View 5: CRM Dashboard
- **Professional Sidebar**: 12 menu items with icons
- **Main Content**:
  - 4 stat cards (Revenue, Orders, Suppliers, Tasks)
  - Revenue and order status charts
  - Recent activity feed
- Click "Marketplace" to return to B2B Platform

## 🔄 User Flow

```
Auth (3 tabs) → Setup (3 steps) → B2B Platform → Checkout → Torbiona → CRM Dashboard
```

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS with custom config
- Lucide React (icons)
- Context API (state management)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.jsx   # Teal gradient buttons
│   │   ├── Card.jsx     # Glassmorphism cards
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   └── Radio.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── DashboardLayout.jsx
│   ├── Auth.jsx         # 3-tab auth system
│   ├── SetupWizard.jsx  # 3-step setup
│   ├── B2BPlatform.jsx  # Marketplace
│   ├── CRMDashboard.jsx # Analytics dashboard
│   ├── CheckoutPanel.jsx
│   └── TorbionaModal.jsx
├── context/
│   └── AppContext.jsx   # State management
├── data/
│   └── mockData.js
├── App.jsx
└── main.jsx
```

## 🎯 State Management

The app uses React Context with the following states:
- `currentView`: 'auth' | 'setup' | 'b2b-platform' | 'crm-dashboard'
- `authTab`: 'company' | 'employee' | 'register'
- `setupStep`: 1 | 2 | 3
- `showCheckout`: boolean
- `showTorbiona`: boolean

## 🎨 Key Design Features

1. **Glassmorphism**: All cards use `bg-white/70 backdrop-blur-md`
2. **Teal Gradients**: `from-teal-400 to-teal-600` on buttons and highlights
3. **Rounded Corners**: `rounded-2xl` throughout
4. **Soft Shadows**: `shadow-lg` with `hover:shadow-xl`
5. **Smooth Transitions**: `transition-all` on interactive elements

## 🚀 Quick Start

1. Run `npm run dev`
2. Open http://localhost:5173
3. Navigate through:
   - Register Company tab → Fill form → Create Account
   - Complete 3 setup steps
   - Browse marketplace → Click "Buy" on Heavy Excavator
   - Select Torbiona payment → See 70% approval
   - Go to CRM Dashboard → Explore analytics

## 📝 Notes

- No backend or database - all state managed with React Context
- Fully responsive design
- Ready for investor pitch demonstrations
- Arabic product names for local market support
- Professional SaaS-grade UI/UX

## 🎬 Demo Flow (4 minutes)

1. **Auth** (30s): Show 3 tabs, register company
2. **Setup** (1m): Walk through 3 steps
3. **Marketplace** (1m): Browse products, add to cart
4. **Checkout** (1m): Select delivery & Torbiona
5. **Torbiona** (30s): Show approval & credit limit
6. **CRM** (30s): Show dashboard analytics

---

**Built with precision for investor demonstrations** 🚀

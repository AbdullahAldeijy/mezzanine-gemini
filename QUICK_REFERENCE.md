# 📋 Quick Reference Card

## 🚀 Essential Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing logic |
| `src/context/AppContext.jsx` | Global state management |
| `src/data/mockData.js` | All mock data |
| `src/components/ui/` | Reusable UI components |
| `tailwind.config.js` | Color and font config |

## 🎨 Color Variables

```javascript
cream: '#f7f4e8'      // Background
teal: '#56afb6'       // Primary
lightgray: '#eeeeee'  // Secondary
darkslate: '#1e293b'  // Headings
slategray: '#475569'  // Body text
```

## 🧩 Component Quick Access

### UI Components
```jsx
import { Button, Card, Input, Select, Radio } from './components/ui/...'
```

### Layout Components
```jsx
import { Sidebar, DashboardLayout } from './components/layout/...'
```

### View Components
```jsx
import { Registration, SetupWizard, Marketplace, 
         CheckoutPanel, TorbionaModal } from './components/...'
```

## 🔄 State Management

```jsx
const {
  currentView,        // 'registration' | 'setup' | 'dashboard'
  setupStep,          // 1 | 2 | 3
  addToCart,          // Function to add product
  showCheckout,       // Boolean for checkout modal
  showTorbiona,       // Boolean for Torbiona modal
  openTorbiona,       // Function to open Torbiona
  closeTorbiona,      // Function to close Torbiona
  closeCheckout,      // Function to close checkout
} = useApp();
```

## 📊 Mock Data Structure

```javascript
// Products
{
  id: 1,
  name: 'حفارات ثقيلة',
  nameEn: 'Heavy Excavators',
  price: 450000,
  company: 'شركة المعدات',
  image: 'url'
}

// Delivery Options
{
  id: 'fast',
  name: 'Fast Delivery',
  nameAr: 'فاست لوجيستك',
  duration: 'Same Day',
  price: 50
}

// Torbiona Scores
{
  behavioral: 61,
  financial: 60,
  market: 78,
  technical: 76,
  governmental: 78,
  overall: 70,
  creditLimit: 500000
}
```

## 🎯 User Flow States

```
registration → setup (step 1-3) → dashboard → checkout → torbiona
```

## 🛠️ Common Customizations

### Change Initial View
```javascript
// src/context/AppContext.jsx line 8
const [currentView, setCurrentView] = useState('dashboard');
```

### Add New Product
```javascript
// src/data/mockData.js
export const mockProducts = [
  { id: 5, name: 'New Product', price: 100000, ... }
];
```

### Modify Colors
```javascript
// tailwind.config.js
colors: {
  cream: '#YOUR_COLOR',
  teal: '#YOUR_COLOR',
}
```

### Add Sidebar Item
```javascript
// src/components/layout/Sidebar.jsx
{ icon: YourIcon, label: 'Your Label' }
```

## 📱 Responsive Breakpoints

```
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
```

## 🎨 Common Tailwind Classes Used

```
Spacing:     p-4, p-6, p-8, mb-2, mb-4, mb-6, gap-4
Rounding:    rounded-xl
Shadows:     shadow-lg, hover:shadow-xl
Colors:      bg-cream, bg-teal, text-darkslate
Transitions: transition-all duration-200
```

## 🔍 Debugging Tips

### View Current State
```jsx
console.log(currentView, setupStep, showCheckout, showTorbiona);
```

### Test Specific View
```javascript
// Change initial state in AppContext.jsx
const [currentView, setCurrentView] = useState('dashboard');
```

### Check Product Data
```javascript
// In Marketplace.jsx
console.log(mockProducts);
```

## 📚 Documentation Files

1. **README.md** - Overview
2. **GETTING_STARTED.md** - Complete guide
3. **QUICKSTART.md** - Quick start
4. **ARCHITECTURE.md** - Structure
5. **COMPONENT_SHOWCASE.md** - Components
6. **DEV_TIPS.md** - Tips & tricks
7. **PROJECT_COMPLETE.md** - Summary

## 🚨 Troubleshooting

### Port in Use
```bash
npx kill-port 5173
npm run dev
```

### Styles Not Loading
```bash
rm -rf node_modules/.vite
npm run dev
```

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎬 4-Minute Demo Flow

1. **Registration** (30s) - Fill form
2. **Setup** (30s) - Click through 3 steps
3. **Marketplace** (1m) - Browse products, add to cart
4. **Checkout** (1m) - Select delivery & Torbiona
5. **Torbiona** (1m) - Show approval & proceed

## 🌐 Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder
```

## 💡 Pro Tips

1. Keep components under 100 lines
2. Use mock data for rapid iteration
3. Test full flow after changes
4. Document new features
5. Keep state minimal

## 📞 Quick Help

- Can't find a file? Check ARCHITECTURE.md
- Need to customize? Check DEV_TIPS.md
- Want to understand flow? Check GETTING_STARTED.md
- Need component details? Check COMPONENT_SHOWCASE.md

---

**Keep this card handy for quick reference!**

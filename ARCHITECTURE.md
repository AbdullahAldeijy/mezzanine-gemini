# Component Architecture

## Component Hierarchy

```
App (AppProvider)
├── Registration
│   ├── Card
│   ├── Input (x7)
│   ├── Select
│   └── Button
│
├── SetupWizard
│   ├── Card
│   └── Button
│
├── Marketplace
│   ├── DashboardLayout
│   │   └── Sidebar
│   └── ProductCard (x4)
│       ├── Card
│       └── Button
│
├── CheckoutPanel (Modal)
│   ├── Card
│   ├── Radio (x5)
│   └── Button
│
└── TorbionaModal (Modal)
    ├── Card
    ├── ScoreBar (x5)
    ├── CircularProgress
    └── Button (x2)
```

## Component Responsibilities

### UI Components (Reusable)
- **Button**: Primary, secondary, outline variants
- **Card**: Container with optional glassmorphism
- **Input**: Text input with label and validation
- **Select**: Dropdown with label
- **Radio**: Radio button with label and description

### Layout Components
- **Sidebar**: Navigation menu with icons
- **DashboardLayout**: Wrapper with sidebar + content area

### View Components
- **Registration**: User onboarding form
- **SetupWizard**: 3-step setup process with stepper
- **Marketplace**: Product grid with sidebar
- **ProductCard**: Individual product display
- **CheckoutPanel**: Checkout modal with delivery/payment
- **TorbionaModal**: Credit analysis and approval

### State Management
- **AppContext**: Global state for navigation, cart, modals

### Data
- **mockData**: Products, delivery options, payment methods, scores

## Data Flow

1. User fills Registration → Updates AppContext → Navigate to Setup
2. User completes Setup → Navigate to Marketplace
3. User clicks "Add to Cart" → Opens CheckoutPanel
4. User selects Torbiona → Opens TorbionaModal
5. User approves → Completes purchase → Closes modals

## Styling Approach

- Tailwind CSS utility classes
- Custom colors in tailwind.config.js
- Consistent spacing and rounded corners
- Glassmorphism on product cards
- Smooth transitions and hover effects

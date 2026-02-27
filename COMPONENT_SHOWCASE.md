# Component Showcase

## UI Components (src/components/ui/)

### Button
**Purpose**: Reusable button with 3 variants
**Props**: 
- `variant`: 'primary' | 'secondary' | 'outline'
- `onClick`: Function
- `className`: Additional classes

**Usage**:
```jsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

**Variants**:
- Primary: Teal background, white text
- Secondary: Light gray background
- Outline: Teal border, transparent background

---

### Card
**Purpose**: Container with optional glassmorphism effect
**Props**:
- `glass`: boolean (enables glassmorphism)
- `className`: Additional classes

**Usage**:
```jsx
<Card glass>
  <h3>Card Content</h3>
</Card>
```

**Features**:
- Rounded corners (rounded-xl)
- Shadow effect
- Optional glass effect for modern look

---

### Input
**Purpose**: Text input with label and validation
**Props**:
- `label`: String
- `type`: 'text' | 'email' | 'password' | 'tel' | 'date'
- `value`: String
- `onChange`: Function
- `required`: boolean

**Usage**:
```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

---

### Select
**Purpose**: Dropdown with label
**Props**:
- `label`: String
- `options`: Array of strings
- `value`: String
- `onChange`: Function
- `required`: boolean

**Usage**:
```jsx
<Select
  label="Industry"
  options={['Contracting', 'Logistics']}
  value={industry}
  onChange={(e) => setIndustry(e.target.value)}
/>
```

---

### Radio
**Purpose**: Radio button with label and description
**Props**:
- `name`: String (group name)
- `value`: String
- `checked`: boolean
- `onChange`: Function
- `label`: String
- `description`: String (optional)
- `badge`: boolean (shows teal badge)

**Usage**:
```jsx
<Radio
  name="payment"
  value="torbiona"
  checked={payment === 'torbiona'}
  onChange={(e) => setPayment(e.target.value)}
  label="Torbiona"
  description="Secure financing"
  badge
/>
```

---

## Layout Components (src/components/layout/)

### Sidebar
**Purpose**: Navigation menu with icons
**Props**:
- `activeItem`: String (highlights active menu item)

**Features**:
- 12 menu items with Lucide icons
- Active state highlighting
- Fixed position
- Scrollable

**Menu Items**:
1. Dashboard
2. My Products
3. Purchase Orders
4. Contracts
5. Supplier Performance
6. Analytics
7. Marketplace
8. Market Analytics
9. Advertising Packages
10. Manage Departments
11. Tasks & Goals
12. Company Page

---

### DashboardLayout
**Purpose**: Wrapper with sidebar and content area
**Props**:
- `activeItem`: String (passed to Sidebar)
- `children`: React nodes

**Usage**:
```jsx
<DashboardLayout activeItem="Marketplace">
  <YourContent />
</DashboardLayout>
```

---

## View Components (src/components/)

### Registration
**Purpose**: User onboarding form
**Features**:
- 8 form fields
- Industry dropdown
- Form validation
- Centered card layout

**Fields**:
1. Email
2. Password
3. Full Name
4. Position
5. Phone Number
6. National ID
7. Date of Birth
8. Industry Type

---

### SetupWizard
**Purpose**: 3-step setup process
**Features**:
- Visual stepper with progress
- Step indicators with checkmarks
- Dynamic content per step
- Navigation buttons

**Steps**:
1. Create Organizational Structure
2. Create Company Page
3. Add Products

---

### Marketplace
**Purpose**: Product browsing interface
**Features**:
- Dashboard layout with sidebar
- Product grid (responsive)
- Product cards with images
- Add to cart functionality

---

### ProductCard
**Purpose**: Individual product display
**Props**:
- `product`: Object (id, name, price, company, image)
- `onAddToCart`: Function

**Features**:
- Product image
- Arabic name
- Company name
- Price display
- Add to cart button

---

### CheckoutPanel
**Purpose**: Checkout modal with delivery and payment
**Features**:
- Order summary
- 3 delivery options (Fast, Standard, Pickup)
- 2 payment methods (Torbiona, Pay Now)
- Price calculation
- Modal overlay

**Delivery Options**:
1. Fast Delivery - Same Day - 50 SAR
2. Standard - 2-3 Days - 25 SAR
3. Pickup - Free

**Payment Methods**:
1. Torbiona (with badge)
2. Pay Now

---

### TorbionaModal
**Purpose**: Credit analysis and approval
**Features**:
- 5 score categories with progress bars
- Circular overall score (70%)
- Approval message
- Credit limit display ($500,000)
- Partner logos
- Action buttons

**Score Categories**:
1. Behavioral: 61%
2. Financial: 60%
3. Market: 78%
4. Technical and Operational: 76%
5. Governmental and Regulatory: 78%

---

## State Management (src/context/AppContext.jsx)

### AppContext
**Purpose**: Global state management

**State Variables**:
- `currentView`: 'registration' | 'setup' | 'dashboard'
- `setupStep`: 1 | 2 | 3
- `cart`: Array
- `selectedProduct`: Object | null
- `showCheckout`: boolean
- `showTorbiona`: boolean
- `userData`: Object

**Functions**:
- `addToCart(product)`: Add product and show checkout
- `completeRegistration(data)`: Save user data and navigate
- `completeSetup()`: Navigate to dashboard
- `nextSetupStep()`: Progress through setup
- `openTorbiona()`: Show Torbiona modal
- `closeTorbiona()`: Hide Torbiona modal
- `closeCheckout()`: Hide checkout panel

---

## Mock Data (src/data/mockData.js)

### mockProducts
Array of 4 construction products with:
- Arabic and English names
- Prices ($85K - $680K)
- Company names
- Unsplash images

### deliveryOptions
3 delivery options with pricing

### paymentMethods
2 payment methods

### torbionaScores
Credit scoring data

### industries
6 industry types for registration

---

## Component Reusability Matrix

| Component | Used In | Reusable |
|-----------|---------|----------|
| Button | All views | ✅ High |
| Card | All views | ✅ High |
| Input | Registration | ✅ High |
| Select | Registration | ✅ High |
| Radio | Checkout | ✅ High |
| Sidebar | Dashboard views | ✅ Medium |
| DashboardLayout | Dashboard views | ✅ Medium |
| ProductCard | Marketplace | ✅ Medium |

---

## Styling Patterns

### Consistent Spacing
- Padding: `p-4`, `p-6`, `p-8`
- Margin: `mb-2`, `mb-4`, `mb-6`
- Gap: `gap-2`, `gap-4`, `gap-6`

### Consistent Rounding
- All cards: `rounded-xl`
- Buttons: `rounded-xl`
- Inputs: `rounded-xl`

### Consistent Shadows
- Cards: `shadow-lg`
- Hover: `hover:shadow-xl`

### Consistent Transitions
- All interactive elements: `transition-all duration-200`

---

## Best Practices Implemented

1. ✅ Single Responsibility Principle
2. ✅ DRY (Don't Repeat Yourself)
3. ✅ Consistent naming conventions
4. ✅ Props validation through usage
5. ✅ Separation of concerns
6. ✅ Reusable components
7. ✅ Clean code structure
8. ✅ Responsive design
9. ✅ Accessibility considerations
10. ✅ Performance optimization

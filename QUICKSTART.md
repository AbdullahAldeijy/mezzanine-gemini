# Quick Start Guide

## Run the Application

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`

## User Flow Demo

### Step 1: Registration
- Fill in all required fields
- Select an industry type
- Click "Create Account"

### Step 2: Setup Wizard
- Complete the 3-step setup process
- Click "Next Step" for each step
- Click "Finish Setup & Go to Dashboard" on the final step

### Step 3: Marketplace
- Browse the product grid
- Click "Add to Cart" on any product (e.g., "حفارات ثقيلة للمشاريع الكبرى")

### Step 4: Checkout
- Select a delivery option (Fast, Standard, or Pickup)
- Select a payment method (Torbiona or Pay Now)
- Click "Complete Purchase"

### Step 5: Torbiona (if selected)
- View the credit analysis scores
- See the 70% overall approval score
- Check the $500,000 credit limit
- Click "Proceed with Torbiona" to complete

## Key Features to Showcase

1. **Clean Design**: Cream background (#f7f4e8) with teal accents (#56afb6)
2. **Glassmorphism**: Product cards have glass effect
3. **Modular Components**: All UI elements are reusable
4. **Smooth Navigation**: State-based routing between views
5. **Arabic Support**: Product names and delivery options in Arabic
6. **Credit Visualization**: Circular progress and bar charts in Torbiona modal

## Customization

- Edit `src/data/mockData.js` to add more products or change data
- Modify colors in `tailwind.config.js`
- Add new components in `src/components/`
- Extend state in `src/context/AppContext.jsx`

# 🚀 Quick Start - Mezzanine Platform

## Start the Application

```bash
npm run dev
```

Open: **http://localhost:5173**

---

## 🎯 Complete Demo Flow (4 minutes)

### 1️⃣ Auth & Registration (30s)
**What you'll see:**
- 3 tabs: Company Login | Employee Login | Register Company
- Click **"Register Company"** tab
- Fill in the form (any data works)
- Click **"Create Account"**

**Result:** → Navigates to Setup Wizard

---

### 2️⃣ Setup Wizard (1m)

**Step 1: Organizational Structure**
- See 6 department cards with gradient icons
- Notice CEO profile in Executive Management
- Click **"Next Step"**

**Step 2: Company Page**
- See company info form
- Notice 3 upload areas (Logo, Building, Team)
- Click **"Next Step"**

**Step 3: Add Products**
- See 3 mock products (Polyethylene, Chemicals, Equipment)
- Click **"Finish Setup"**

**Result:** → Navigates to B2B Platform

---

### 3️⃣ B2B Platform Marketplace (1m)
**What you'll see:**
- Top navbar with search and "Go to CRM Dashboard" button
- 4 construction equipment products
- Arabic product names (حفارات ثقيلة للمشاريع الكبرى)
- Prices, stock indicators, quantity inputs

**Action:**
- Click **"Buy"** on the first product (Heavy Excavator - $450,000)

**Result:** → Opens Checkout Modal

---

### 4️⃣ Checkout Flow (1m)
**What you'll see:**
- Order summary: Heavy Excavator, Qty 1, $450,000
- 3 delivery options (Fast/Standard/Pickup)
- 2 payment methods (Pay Now/Torbiona)

**Action:**
- Select **"Standard Delivery"** (25 SAR)
- Select **"Torbiona"** payment (with "Secure financing" badge)
- Notice final total: $450,025
- Click **"Complete Purchase"**

**Result:** → Opens Torbiona Modal

---

### 5️⃣ Torbiona Credit Calculator (30s)
**What you'll see:**
- 5 progress bars with scores:
  - Behavioral: 61%
  - Financial: 60%
  - Market: 78%
  - Technical: 76%
  - Regulatory: 78%
- Circular progress: **70% Overall Score**
- Approval message: "✅ Approved! Congratulations!"
- Credit limit: **$500,000**

**Action:**
- Click **"Proceed with Torbiona"**

**Result:** → Purchase complete, modals close

---

### 6️⃣ CRM Dashboard (30s)
**Action:**
- Click **"Go to CRM Dashboard"** in navbar

**What you'll see:**
- Professional sidebar with 12 menu items
- 4 stat cards (Revenue, Orders, Suppliers, Tasks)
- Chart placeholders
- Recent activity feed

**Action:**
- Click **"Marketplace"** in sidebar to return to B2B Platform

---

## 🎨 Design Highlights to Show

1. **Teal Gradients**: All buttons use `from-teal-400 to-teal-600`
2. **Glassmorphism**: Cards have `backdrop-blur-md` effect
3. **Rounded Corners**: Everything uses `rounded-2xl`
4. **Smooth Transitions**: Hover effects on all interactive elements
5. **Arabic Support**: Product names in Arabic
6. **Professional Icons**: Lucide React icons throughout

---

## 🔄 Navigation Map

```
Auth
 ↓ Create Account
Setup (Step 1 → 2 → 3)
 ↓ Finish Setup
B2B Platform
 ↓ Buy Product
Checkout Modal
 ↓ Select Torbiona
Torbiona Modal
 ↓ Proceed
Purchase Complete
 ↓ Go to CRM Dashboard
CRM Dashboard
 ↓ Click Marketplace
Back to B2B Platform
```

---

## 💡 Pro Tips for Demo

1. **Start with Auth**: Show the 3-tab system
2. **Highlight Setup**: Show all 3 steps completely
3. **Emphasize Arabic**: Point out bilingual support
4. **Show Torbiona**: This is the unique selling point
5. **End with CRM**: Show the complete platform

---

## 🎯 Key Talking Points

- **No Backend**: Pure frontend, perfect for rapid prototyping
- **Premium Design**: Teal/Cream palette with glassmorphism
- **Complete Flow**: From registration to analytics
- **AI Credit Scoring**: Torbiona's unique value proposition
- **B2B Focus**: Construction industry specific
- **Investor Ready**: Professional UI/UX

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 5173
npm run dev
```

### Styles Not Loading
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 📱 Responsive Testing

The app is fully responsive. Test on:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

---

**Ready to impress investors! 🚀**

Start with `npm run dev` and follow the demo flow above.

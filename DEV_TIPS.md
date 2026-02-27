# Development Tips & Commands

## Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Workflow

### Adding New Products
Edit `src/data/mockData.js`:
```javascript
{
  id: 5,
  name: 'اسم المنتج بالعربي',
  nameEn: 'Product Name in English',
  price: 250000,
  company: 'اسم الشركة',
  companyEn: 'Company Name',
  image: 'https://images.unsplash.com/photo-xxxxx',
}
```

### Adding New Views
1. Create component in `src/components/YourView.jsx`
2. Add to `src/components/index.js`
3. Import in `src/App.jsx`
4. Add navigation logic in AppContext

### Customizing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  cream: '#f7f4e8',
  teal: '#56afb6',
  // Add your colors here
}
```

### Creating New UI Components
Follow the pattern in `src/components/ui/`:
- Accept props for customization
- Use Tailwind classes
- Export as named export
- Keep components small and focused

## Testing the Flow

### Full User Journey Test
1. Open http://localhost:5173
2. Fill registration form
3. Complete 3 setup steps
4. Click "Add to Cart" on first product
5. Select "Standard" delivery
6. Select "Torbiona" payment
7. Click "Complete Purchase"
8. View credit analysis
9. Click "Proceed with Torbiona"

### Quick Test (Skip to Marketplace)
In `src/context/AppContext.jsx`, change initial state:
```javascript
const [currentView, setCurrentView] = useState('dashboard');
```

## Common Customizations

### Change Default View
`src/context/AppContext.jsx` line 8

### Add Sidebar Menu Item
`src/components/layout/Sidebar.jsx` - add to menuItems array

### Modify Torbiona Scores
`src/data/mockData.js` - edit torbionaScores object

### Change Fonts
`index.html` - update Google Fonts link
`tailwind.config.js` - update fontFamily

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Styles Not Updating
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Performance Tips

1. Images are loaded from Unsplash - consider local images for production
2. Use lazy loading for modals (already implemented)
3. Optimize images before deployment
4. Enable gzip compression on server
5. Use CDN for static assets

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
# Add to vite.config.js:
base: '/mezzanine-gemini/'

npm run build
# Deploy dist/ to gh-pages branch
```

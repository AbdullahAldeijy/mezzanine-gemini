import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card glass className="hover:shadow-xl transition-all">
      <div className="aspect-video bg-lightgray rounded-lg mb-4 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-bold text-darkslate mb-2">{product.name}</h3>
      <p className="text-sm text-slategray mb-3">{product.company}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-teal">${product.price.toLocaleString()}</span>
        <Button onClick={() => onAddToCart(product)} variant="primary" className="flex items-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

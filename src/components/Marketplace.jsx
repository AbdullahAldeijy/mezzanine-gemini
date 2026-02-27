import { DashboardLayout } from './layout/DashboardLayout';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockData';

export const Marketplace = () => {
  const { addToCart } = useApp();

  return (
    <DashboardLayout activeItem="Marketplace">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-darkslate mb-2">Marketplace</h1>
        <p className="text-slategray">Browse and purchase construction equipment</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export const mockProducts = [
  {
    id: 1,
    name: 'حفارات ثقيلة للمشاريع الكبرى',
    nameEn: 'Heavy Excavators for Large Projects',
    price: 450000,
    company: 'شركة المعدات الثقيلة',
    companyEn: 'Heavy Equipment Co.',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400',
  },
  {
    id: 2,
    name: 'رافعات برجية عالية الأداء',
    nameEn: 'High-Performance Tower Cranes',
    price: 680000,
    company: 'مؤسسة الرافعات المتقدمة',
    companyEn: 'Advanced Cranes Est.',
    image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400',
  },
  {
    id: 3,
    name: 'خلاطات خرسانة صناعية',
    nameEn: 'Industrial Concrete Mixers',
    price: 125000,
    company: 'شركة الخرسانة الحديثة',
    companyEn: 'Modern Concrete Co.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
  },
  {
    id: 4,
    name: 'معدات لحام متطورة',
    nameEn: 'Advanced Welding Equipment',
    price: 85000,
    company: 'مصنع اللحام الصناعي',
    companyEn: 'Industrial Welding Factory',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
  },
];

export const deliveryOptions = [
  { id: 'fast', name: 'Fast Delivery', nameAr: 'فاست لوجيستك', duration: 'Same Day', price: 50 },
  { id: 'standard', name: 'Standard', nameAr: 'فاست لوجيستك', duration: '2-3 Days', price: 25 },
  { id: 'pickup', name: 'Pickup', nameAr: 'Self Pickup', duration: 'Free', price: 0 },
];

export const paymentMethods = [
  { id: 'torbiona', name: 'Torbiona', description: 'Secure financing', badge: true },
  { id: 'paynow', name: 'Pay Now', description: 'Instant payment', badge: false },
];

export const torbionaScores = {
  behavioral: 61,
  financial: 60,
  market: 78,
  technical: 76,
  governmental: 78,
  overall: 70,
  creditLimit: 500000,
};

export const industries = [
  'Contracting',
  'Logistics',
  'Supplying',
  'Manufacturing',
  'Engineering',
  'Real Estate Development',
];

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, ArrowRight, Zap, Database, Building2, ChevronDown, ChevronRight,
  AlertTriangle, CheckCircle2, CheckCircle, Check, Lock, Clock, XCircle,
  Shield, Activity, CreditCard, Download, FileText, Package, Users, BarChart2,
  Landmark, TrendingUp,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════════
   Fuzzy Logic — guided journey (self-contained, mirrors AdminRiskPortal +
   JointOperation pages exactly). Nothing here touches the other components.
   ══════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  { label: 'Portfolio' },
  { label: 'AI Verdict' },
  { label: 'Profile A' },
  { label: 'Fuzzy Targets' },
  { label: 'Profile B' },
];

/* ── STEP 1 data — exact copy of AdminRiskPortal creditPortfolioData ──────── */
const creditPortfolioData = [
  // ── Active (approved = in progress — tranches released as شروط are met) ──
  {
    id: 'CP-001', company: 'BuildTech Construction', nameAr: 'بيلدتك للإنشاءات',
    sector: 'Construction', region: 'Riyadh', amount: 500000, ecl: 1.2, mezzanineIndex: 742,
    status: 'active', approvedDate: 'Jan 15, 2025', purpose: 'Operating Capital',
    disbursements: [
      {
        label: 'Disbursement 1 — Month 4', labelAr: 'الدفعة الأولى', amount: 166667, date: 'Apr 2025', disbStatus: 'Disbursed',
        conditions: [
          { label: 'KYB identity verified', labelAr: 'التحقق من الهوية', done: true },
          { label: 'Digital contract signed', labelAr: 'توقيع العقد الرقمي', done: true },
          { label: 'Escrow account activated', labelAr: 'تفعيل حساب الضمان', done: true },
        ],
      },
      {
        label: 'Disbursement 2 — Month 8', labelAr: 'الدفعة الثانية', amount: 166667, date: 'Aug 2025', disbStatus: 'Conditions Pending',
        conditions: [
          { label: 'Q1 financial statements uploaded', labelAr: 'رفع كشوف الربع الأول', done: false },
          { label: 'Min. 2 new products added to marketplace', labelAr: 'إضافة منتجين للسوق', done: true },
          { label: 'At least 1 active contract executed', labelAr: 'عقد نشط على الأقل', done: false },
        ],
      },
      {
        label: 'Disbursement 3 — Month 12', labelAr: 'الدفعة الثالثة', amount: 166666, date: 'Dec 2025', disbStatus: 'Locked',
        conditions: [
          { label: 'Invoice reconciliation submitted', labelAr: 'تقديم تسوية الفواتير', done: false },
          { label: '3+ active customer contracts maintained', labelAr: '٣ عقود نشطة على الأقل', done: false },
          { label: 'Platform engagement score ≥ 90%', labelAr: 'نشاط المنصة ≥ ٩٠٪', done: false },
        ],
      },
    ],
  },
  {
    id: 'CP-002', company: 'Riyadh Steel Works', nameAr: 'أعمال الرياض للصلب',
    sector: 'Manufacturing', region: 'Riyadh', amount: 380000, ecl: 0.9, mezzanineIndex: 798,
    status: 'active', approvedDate: 'Mar 1, 2025', purpose: 'Raw Materials',
    disbursements: [
      {
        label: 'Disbursement 1 — Month 3', labelAr: 'الدفعة الأولى', amount: 127000, date: 'May 2025', disbStatus: 'Disbursed',
        conditions: [
          { label: 'KYB identity verified', labelAr: 'التحقق من الهوية', done: true },
          { label: 'Digital contract signed', labelAr: 'توقيع العقد الرقمي', done: true },
          { label: 'Bank account linked', labelAr: 'ربط الحساب البنكي', done: true },
        ],
      },
      {
        label: 'Disbursement 2 — Month 6', labelAr: 'الدفعة الثانية', amount: 127000, date: 'Aug 2025', disbStatus: 'Disbursed',
        conditions: [
          { label: 'Supplier invoice submitted', labelAr: 'تقديم فاتورة المورد', done: true },
          { label: 'ERP sync confirmed', labelAr: 'تأكيد مزامنة ERP', done: true },
          { label: 'Goods delivery receipt', labelAr: 'إيصال تسليم البضاعة', done: true },
        ],
      },
      {
        label: 'Disbursement 3 — Month 10', labelAr: 'الدفعة الثالثة', amount: 126000, date: 'Dec 2025', disbStatus: 'Conditions Pending',
        conditions: [
          { label: 'H1 financial statements', labelAr: 'كشوف النصف الأول', done: true },
          { label: 'Credit bureau re-check clear', labelAr: 'إعادة فحص البيورو', done: false },
          { label: 'Platform score ≥ 85%', labelAr: 'نشاط المنصة ≥ ٨٥٪', done: false },
        ],
      },
    ],
  },
  {
    id: 'CP-003', company: 'Dammam Logistics Hub', nameAr: 'مركز الدمام للخدمات اللوجستية',
    sector: 'Logistics', region: 'Dammam', amount: 620000, ecl: 2.8, mezzanineIndex: 601,
    status: 'active', approvedDate: 'Jul 1, 2025', purpose: 'Fleet Expansion',
    disbursements: [
      {
        label: 'Disbursement 1 — Month 4', labelAr: 'الدفعة الأولى', amount: 206667, date: 'Oct 2025', disbStatus: 'Disbursed',
        conditions: [
          { label: 'KYB identity verified', labelAr: 'التحقق من الهوية', done: true },
          { label: 'Fleet registration submitted', labelAr: 'تقديم تسجيل الأسطول', done: true },
          { label: 'Insurance certificate uploaded', labelAr: 'رفع شهادة التأمين', done: true },
        ],
      },
      {
        label: 'Disbursement 2 — Month 8', labelAr: 'الدفعة الثانية', amount: 206667, date: 'Feb 2026', disbStatus: 'Conditions Pending',
        conditions: [
          { label: 'Q3 revenue report uploaded', labelAr: 'رفع تقرير إيرادات الربع الثالث', done: false },
          { label: 'Milestone certificate signed', labelAr: 'توقيع شهادة الإنجاز', done: false },
          { label: 'At least 5 active delivery contracts', labelAr: '٥ عقود توصيل نشطة على الأقل', done: true },
        ],
      },
      {
        label: 'Disbursement 3 — Month 12', labelAr: 'الدفعة الثالثة', amount: 206666, date: 'Jun 2026', disbStatus: 'Locked',
        conditions: [
          { label: 'Annual audit report submitted', labelAr: 'تقديم تقرير المراجعة السنوية', done: false },
          { label: 'ECL maintained below 3.5%', labelAr: 'الحفاظ على ECL أقل من ٣.٥٪', done: false },
          { label: 'Full ERP integration active', labelAr: 'تفعيل تكامل ERP الكامل', done: false },
        ],
      },
    ],
  },
  {
    id: 'CP-004', company: 'Qassim Heavy Metals', nameAr: 'قصيم للمعادن الثقيلة',
    sector: 'Manufacturing', region: 'Qassim', amount: 800000, ecl: 4.7, mezzanineIndex: 612,
    status: 'active', approvedDate: 'Sep 5, 2025', purpose: 'Equipment Financing',
    disbursements: [
      {
        label: 'Disbursement 1 — Month 4', labelAr: 'الدفعة الأولى', amount: 266667, date: 'Jan 2026', disbStatus: 'Conditions Pending',
        conditions: [
          { label: 'KYB identity verified', labelAr: 'التحقق من الهوية', done: true },
          { label: 'Digital contract signed', labelAr: 'توقيع العقد الرقمي', done: true },
          { label: 'Equipment purchase invoice', labelAr: 'فاتورة شراء المعدات', done: false },
          { label: 'Bureau compliance pending clearance', labelAr: 'إخلاء الالتزام من البيورو', done: false },
        ],
      },
      {
        label: 'Disbursement 2 — Month 8', labelAr: 'الدفعة الثانية', amount: 266667, date: 'May 2026', disbStatus: 'Locked',
        conditions: [
          { label: 'Equipment delivery confirmed', labelAr: 'تأكيد تسليم المعدات', done: false },
          { label: 'Q1 operational report', labelAr: 'تقرير التشغيل للربع الأول', done: false },
          { label: 'ECL improvement to < 4%', labelAr: 'تحسين ECL إلى أقل من ٤٪', done: false },
        ],
      },
      {
        label: 'Disbursement 3 — Month 12', labelAr: 'الدفعة الثالثة', amount: 266666, date: 'Sep 2026', disbStatus: 'Locked',
        conditions: [
          { label: 'Full audit trail submitted', labelAr: 'تقديم مسار المراجعة الكامل', done: false },
          { label: 'No new bureau defaults', labelAr: 'لا توجد تخلفات جديدة في البيورو', done: false },
          { label: 'Platform engagement ≥ 80%', labelAr: 'نشاط المنصة ≥ ٨٠٪', done: false },
        ],
      },
    ],
  },
  {
    id: 'CP-005', company: 'Al-Noor Trading Co.', nameAr: 'شركة النور للتجارة',
    sector: 'Trading', region: 'Jeddah', amount: 700000, ecl: 3.2, mezzanineIndex: 588,
    status: 'active', approvedDate: 'Oct 12, 2025', purpose: 'Inventory Purchase',
    disbursements: [
      {
        label: 'Disbursement 1 — Month 3', labelAr: 'الدفعة الأولى', amount: 350000, date: 'Jan 2026', disbStatus: 'Disbursed',
        conditions: [
          { label: 'KYB identity verified', labelAr: 'التحقق من الهوية', done: true },
          { label: 'CPA-signed financials received', labelAr: 'استلام البيانات المالية الموقعة', done: true },
          { label: 'Purchase order uploaded', labelAr: 'رفع أمر الشراء', done: true },
        ],
      },
      {
        label: 'Disbursement 2 — Month 6', labelAr: 'الدفعة الثانية', amount: 350000, date: 'Apr 2026', disbStatus: 'Conditions Pending',
        conditions: [
          { label: 'Goods receipt note submitted', labelAr: 'تقديم إيصال استلام البضاعة', done: false },
          { label: 'Sales report — Q1 2026', labelAr: 'تقرير المبيعات الربع الأول ٢٠٢٦', done: false },
          { label: 'No new credit bureau flags', labelAr: 'لا تنبيهات جديدة في البيورو', done: true },
        ],
      },
    ],
  },
  {
    id: 'CP-006', company: 'National Contracting Corp.', nameAr: 'الشركة الوطنية للمقاولات',
    sector: 'Construction', region: 'Riyadh', amount: 950000, ecl: 2.1, mezzanineIndex: 724,
    status: 'active', approvedDate: 'Aug 20, 2025', purpose: 'Project Financing',
    disbursements: [
      {
        label: 'Disbursement 1 — Month 3', labelAr: 'الدفعة الأولى', amount: 237500, date: 'Nov 2025', disbStatus: 'Disbursed',
        conditions: [
          { label: 'KYB identity verified', labelAr: 'التحقق من الهوية', done: true },
          { label: 'Project contract signed', labelAr: 'توقيع عقد المشروع', done: true },
          { label: 'Escrow account activated', labelAr: 'تفعيل حساب الضمان', done: true },
        ],
      },
      {
        label: 'Disbursement 2 — Month 6', labelAr: 'الدفعة الثانية', amount: 237500, date: 'Feb 2026', disbStatus: 'Disbursed',
        conditions: [
          { label: 'Phase 1 milestone certificate', labelAr: 'شهادة إنجاز المرحلة الأولى', done: true },
          { label: 'Quantity surveyor report', labelAr: 'تقرير مسّاح الكميات', done: true },
          { label: '2+ subcontractor POs issued', labelAr: 'إصدار أوامر شراء للمقاولين الفرعيين', done: true },
        ],
      },
      {
        label: 'Disbursement 3 — Month 9', labelAr: 'الدفعة الثالثة', amount: 237500, date: 'May 2026', disbStatus: 'Conditions Pending',
        conditions: [
          { label: 'Phase 2 milestone certificate', labelAr: 'شهادة إنجاز المرحلة الثانية', done: true },
          { label: 'Updated project timeline submitted', labelAr: 'تقديم الجدول الزمني المحدث', done: false },
          { label: 'No unresolved site violations', labelAr: 'لا مخالفات موقع معلقة', done: false },
        ],
      },
      {
        label: 'Disbursement 4 — Month 12', labelAr: 'الدفعة الرابعة', amount: 237500, date: 'Aug 2026', disbStatus: 'Locked',
        conditions: [
          { label: 'Project completion certificate', labelAr: 'شهادة إتمام المشروع', done: false },
          { label: 'Final audit report', labelAr: 'تقرير المراجعة النهائي', done: false },
          { label: 'Client acceptance sign-off', labelAr: 'موافقة العميل النهائية', done: false },
        ],
      },
    ],
  },
  {
    id: 'CP-007', company: 'Al-Madinah Steel', nameAr: 'حديد المدينة',
    sector: 'Manufacturing', region: 'Madinah', amount: 480000, ecl: 1.4, mezzanineIndex: 709,
    status: 'active', approvedDate: 'Sep 15, 2025', purpose: 'Raw Materials',
    disbursements: [
      {
        label: 'Disbursement 1 — Month 3', labelAr: 'الدفعة الأولى', amount: 160000, date: 'Dec 2025', disbStatus: 'Disbursed',
        conditions: [
          { label: 'KYB identity verified', labelAr: 'التحقق من الهوية', done: true },
          { label: 'Digital contract signed', labelAr: 'توقيع العقد الرقمي', done: true },
          { label: 'Supplier invoice — Steel batch 1', labelAr: 'فاتورة مورد الصلب', done: true },
        ],
      },
      {
        label: 'Disbursement 2 — Month 6', labelAr: 'الدفعة الثانية', amount: 160000, date: 'Mar 2026', disbStatus: 'Disbursed',
        conditions: [
          { label: 'Goods receipt — batch 1', labelAr: 'إيصال استلام الدفعة الأولى', done: true },
          { label: 'ERP sync report', labelAr: 'تقرير مزامنة ERP', done: true },
          { label: 'No ECL deterioration', labelAr: 'لا تدهور في ECL', done: true },
        ],
      },
      {
        label: 'Disbursement 3 — Month 9', labelAr: 'الدفعة الثالثة', amount: 160000, date: 'Jun 2026', disbStatus: 'Conditions Pending',
        conditions: [
          { label: 'Supplier invoice — Steel batch 2', labelAr: 'فاتورة مورد الصلب - الدفعة الثانية', done: false },
          { label: 'Platform engagement ≥ 88%', labelAr: 'نشاط المنصة ≥ ٨٨٪', done: true },
          { label: 'No outstanding buyer disputes', labelAr: 'لا نزاعات مع المشترين معلقة', done: false },
        ],
      },
    ],
  },
  // ── Collected (fully repaid) ─────────────────────────────────────────
  {
    id: 'CP-010', company: 'Global Materials', nameAr: 'المواد العالمية',
    sector: 'Trading', region: 'Jeddah', amount: 1200000, ecl: 0.7, mezzanineIndex: 815,
    status: 'collected', startDate: 'Feb 2024', endDate: 'Feb 2025', installments: '12/12',
    purpose: 'Bulk Inventory',
    note: 'Flagship case — highest volume collected. Zero late payments.',
  },
  {
    id: 'CP-011', company: 'Riyadh Steel Works (Prior Facility)', nameAr: 'أعمال الرياض للصلب — تسهيل سابق',
    sector: 'Manufacturing', region: 'Riyadh', amount: 380000, ecl: 0.9, mezzanineIndex: 798,
    status: 'collected', startDate: 'Mar 2024', endDate: 'Jan 2025', installments: '10/10',
    purpose: 'Raw Materials',
    note: 'Early settlement in month 9. ECL remained below 1% throughout.',
  },
  {
    id: 'CP-012', company: 'Eastern Logistics Group', nameAr: 'مجموعة الشرقية للخدمات',
    sector: 'Logistics', region: 'Dammam', amount: 320000, ecl: 1.9, mezzanineIndex: 681,
    status: 'collected', startDate: 'Jun 2024', endDate: 'Dec 2024', installments: '6/6',
    purpose: 'Fleet Upgrade',
    note: 'Early settlement in month 5. Clean credit record maintained.',
  },
  {
    id: 'CP-013', company: 'Jeddah Trade Hub', nameAr: 'مركز جدة للتجارة',
    sector: 'Trading', region: 'Jeddah', amount: 290000, ecl: 1.6, mezzanineIndex: 695,
    status: 'collected', startDate: 'May 2024', endDate: 'Nov 2024', installments: '6/6',
    purpose: 'Inventory Financing',
    note: 'Short-term cycle. Platform engagement score 94% throughout.',
  },
  {
    id: 'CP-014', company: 'Gulf Engineering Co. (Prior)', nameAr: 'شركة الخليج للهندسة — سابق',
    sector: 'Engineering', region: 'Riyadh', amount: 550000, ecl: 1.3, mezzanineIndex: 731,
    status: 'collected', startDate: 'Jan 2024', endDate: 'Oct 2024', installments: '9/9',
    purpose: 'Project Financing',
    note: 'Completed all tranches. Re-financed for a second facility.',
  },
  // ── Rejected ─────────────────────────────────────────────────────────
  {
    id: 'CP-015', company: 'Hail Textiles Co.', nameAr: 'شركة حائل للنسيج',
    sector: 'Manufacturing', region: 'Hail', amount: 150000, ecl: 8.4, mezzanineIndex: 412,
    status: 'rejected', rejectedDate: 'Jan 15, 2025', purpose: 'Working Capital',
    reason: 'ECL Exceeds Threshold (8.4% > 6% max)',
    note: '2 bureau defaults detected. Non-compliant Gov API. Auto-rejected by Torbiona.',
  },
  {
    id: 'CP-016', company: 'Najd Retail Co.', nameAr: 'شركة نجد للتجزئة',
    sector: 'Trading', region: 'Riyadh', amount: 200000, ecl: 6.8, mezzanineIndex: 445,
    status: 'rejected', rejectedDate: 'Feb 3, 2025', purpose: 'Store Expansion',
    reason: 'Insufficient Credit Bureau History',
    note: 'Less than 6 months of bureau data. Eligible to reapply after 12 months.',
  },
  {
    id: 'CP-017', company: 'Al-Sharq Catering', nameAr: 'الشرق للضيافة',
    sector: 'Services', region: 'Jeddah', amount: 90000, ecl: 7.2, mezzanineIndex: 390,
    status: 'rejected', rejectedDate: 'Mar 10, 2025', purpose: 'Equipment Purchase',
    reason: 'Out-of-Scope Sector — Services not covered',
    note: 'Mezzanine Finance does not cover the Services sector. Referred to partner.',
  },
];

/* ── STEP 2 data — exact copy of AdminRiskPortal autoApprovedApps[0] ──────── */
const BUILDTECH_REQUEST = {
  company: 'BuildTech Construction',
  amount: 45000,
  purpose: 'Operating Capital',
  ecl: 1.2,
  recommendedLimit: 45000,
  approvedAt: '2024-01-15 09:23:14',
  govApi: { status: 'Active', age: '5 Years', compliance: 'Verified' },
  erp: { ccc: '+6 days improved', invoices: 2 },
  platform: { pos: 12, rating: 4.8 },
  bureau: { defaults: 0, history: 'Clean' },
  monitoring: {
    amountPerDisbursement: '15,000 SAR / tranche (3 tranches)',
    disbursementConditions: 'Delivery-confirmed, escrow controlled',
    beneficiary: 'BuildTech Construction — Operating Account ****4471',
    requiredDocuments: 'GRN + supplier invoice per tranche',
    suspensionRules: 'Auto-suspend if ECL > 3% or 2 missed ERP syncs',
    reserveRatio: '5%',
    repaymentSchedule: 'Monthly, 12 installments — auto-debit',
  },
};

/* ── STEP 3 / STEP 5 data — Profile Complete summaries (JointOperation shape) ─ */
const PROFILE_A = {
  tag: 'Company A · confirmed sector',
  company: 'BuildTech Construction Ltd.',
  cr: '1010123456',
  established: '2015',
  regDocs: [
    { label: 'Commercial Registration (CR)', status: 'uploaded' },
    { label: 'Business Licenses', status: 'pending' },
    { label: 'Zakat & Tax Certificate', status: 'uploaded' },
    { label: 'National Address', status: 'uploaded' },
    { label: 'Core Contracts', status: 'pending' },
    { label: 'Other Regulatory Documents', status: 'pending' },
  ],
  products: [
    { name: 'Polyethylene', price: '9,375', unit: 'ton' },
    { name: 'Specialized Chemicals', price: '18,750', unit: 'unit' },
    { name: 'Industrial Equipment', price: '56,250', unit: 'unit' },
  ],
  org: [
    { label: 'Departments', value: '6' },
    { label: 'Team Members', value: '4' },
    { label: 'Role Groups', value: '3' },
    { label: 'Active Users', value: '3' },
  ],
  activity: [
    { label: 'Total Revenue', value: 'SAR 7.5M' },
    { label: 'Active Customers', value: 3 },
    { label: 'Active Projects', value: 3 },
    { label: 'Invoices', value: 3 },
    { label: 'Paid Invoices', value: 2 },
    { label: 'Cash Flow (90d)', value: 'SAR 2,100,000' },
  ],
};

const PROFILE_B = {
  tag: 'Company B · AI fuzzy target (Building Materials)',
  company: 'Al-Rajhi Building Materials Co.',
  cr: '1010774521',
  established: '2018',
  regDocs: [
    { label: 'Commercial Registration (CR)', status: 'uploaded' },
    { label: 'Business Licenses', status: 'uploaded' },
    { label: 'Zakat & Tax Certificate', status: 'uploaded' },
    { label: 'National Address', status: 'pending' },
    { label: 'Core Contracts', status: 'pending' },
    { label: 'Other Regulatory Documents', status: 'pending' },
  ],
  products: [
    { name: 'Portland Cement', price: '24', unit: 'bag' },
    { name: 'Steel Rebar B500', price: '2,900', unit: 'ton' },
    { name: 'Concrete Blocks', price: '3.2', unit: 'unit' },
  ],
  org: [
    { label: 'Departments', value: '5' },
    { label: 'Team Members', value: '3' },
    { label: 'Role Groups', value: '3' },
    { label: 'Active Users', value: '2' },
  ],
  activity: [
    { label: 'Total Revenue', value: 'SAR 4.7M' },
    { label: 'Active Customers', value: 2 },
    { label: 'Active Projects', value: 2 },
    { label: 'Invoices', value: 2 },
    { label: 'Paid Invoices', value: 1 },
    { label: 'Cash Flow (90d)', value: 'SAR 1,250,000' },
  ],
};

/* ── STEP 4 data — Fuzzy Logic zones (AdminRiskPortal credit-risk panel) ──── */
const CONFIRMED_ZONE = [
  { sector: 'Construction', ar: 'الإنشاءات', companies: 45, ecl: 1.1, success: 96, volume: '22.4M', color: 'emerald' },
  { sector: 'Trading',      ar: 'التجارة',   companies: 22, ecl: 1.4, success: 91, volume: '9.8M',  color: 'emerald' },
  { sector: 'Manufacturing',ar: 'التصنيع',   companies: 12, ecl: 2.1, success: 82, volume: '6.1M',  color: 'teal'    },
  { sector: 'Logistics',    ar: 'اللوجستيات',companies:  8, ecl: 2.4, success: 78, volume: '3.2M',  color: 'teal'    },
];

const POLICIES = [
  {
    id: 'similarity',
    label: 'Pattern Similarity',
    ar: 'التشابه النمطي',
    reasoning: (
      <>
        Pattern detected: <span className="text-emerald-400 font-semibold">Construction</span> companies with ECL &lt; 2% and &gt;3 platform POs have a 96% success rate. AI is scanning for companies with <span className="text-purple-300 font-semibold">similar profiles</span> across adjacent sectors.
      </>
    ),
    targets: [
      { rank: 1, sector: 'Construction (Expansion)', ar: 'إنشاءات — توسع', confidence: 94, ecl: '< 1.8%', companies: 18, reason: 'Same sector, similar ECL profile to approved batch', color: 'amber' },
      { rank: 2, sector: 'Building Materials', ar: 'مواد البناء', confidence: 81, ecl: '< 2.5%', companies: 11, reason: 'Directly supplies approved Construction companies', color: 'purple' },
      { rank: 3, sector: 'Logistics (Freight)', ar: 'لوجستيات — شحن', confidence: 73, ecl: '< 3%', companies: 7, reason: 'Serves same supply chain as top-performing sectors', color: 'slate' },
    ],
  },
  {
    id: 'supplychain',
    label: 'Supply-Chain Adjacency',
    ar: 'سلاسل الإمداد',
    reasoning: (
      <>
        Policy switched to <span className="text-purple-300 font-semibold">supply-chain adjacency</span>. AI now ranks sectors by how tightly they feed the approved <span className="text-emerald-400 font-semibold">Construction &amp; Trading</span> book — upstream suppliers first.
      </>
    ),
    targets: [
      { rank: 1, sector: 'Building Materials', ar: 'مواد البناء', confidence: 92, ecl: '< 2.2%', companies: 14, reason: 'Primary input supplier to 45 approved Construction cos.', color: 'amber' },
      { rank: 2, sector: 'Engineering Services', ar: 'خدمات هندسية', confidence: 80, ecl: '< 2.6%', companies: 9, reason: 'Design & supervision partner on financed projects', color: 'purple' },
      { rank: 3, sector: 'Logistics (Freight)', ar: 'لوجستيات — شحن', confidence: 76, ecl: '< 3%', companies: 8, reason: 'Moves materials between suppliers and sites', color: 'slate' },
    ],
  },
  {
    id: 'diversify',
    label: 'Sector Diversification',
    ar: 'تنويع القطاعات',
    reasoning: (
      <>
        Policy switched to <span className="text-purple-300 font-semibold">portfolio diversification</span>. AI down-weights Construction exposure and surfaces low-correlation sectors with acceptable ECL.
      </>
    ),
    targets: [
      { rank: 1, sector: 'Engineering Services', ar: 'خدمات هندسية', confidence: 78, ecl: '< 2.4%', companies: 9, reason: 'Low correlation to current book, strong receivables', color: 'amber' },
      { rank: 2, sector: 'Food Processing', ar: 'تصنيع أغذية', confidence: 68, ecl: '< 3.2%', companies: 6, reason: 'Stable demand, diversifies sector concentration', color: 'purple' },
      { rank: 3, sector: 'Retail Distribution', ar: 'توزيع تجزئة', confidence: 61, ecl: '< 3.5%', companies: 12, reason: 'Broadens book but higher ECL variance', color: 'slate' },
    ],
  },
];

/* ── Shared progress bar (same pattern as CreditControl / JointOperation) ─── */
const ProgressBar = ({ step, onStepClick }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-3 z-50 shadow-lg">
    <div className="max-w-4xl mx-auto flex items-center">
      {STEPS.map((s, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <button onClick={() => onStepClick(num)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all hover:scale-110 ${done ? 'bg-purple-500 text-white' : active ? 'bg-purple-500 text-white ring-4 ring-purple-100' : 'bg-gray-200 text-gray-400'}`}>
                {done ? <Check size={11} /> : num}
              </button>
              <span onClick={() => onStepClick(num)} className={`text-[8px] mt-0.5 text-center hidden sm:block cursor-pointer max-w-[55px] leading-tight ${active ? 'text-purple-600 font-semibold' : 'text-gray-400'}`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-1 mx-1 rounded-full ${step > num ? 'bg-purple-500' : 'bg-gray-200'}`} />}
          </div>
        );
      })}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   STEP 1 — Credit Portfolio (exact copy of AdminRiskPortal "Credit Portfolio")
   ══════════════════════════════════════════════════════════════════════════ */
const PortfolioCard = ({ c, isOpen, onToggle, onOpenBuildTech }) => {
  const eclColor = c.ecl < 2 ? 'text-emerald-400' : c.ecl < 4 ? 'text-amber-400' : 'text-red-400';
  const idxColor = c.mezzanineIndex >= 700 ? 'text-emerald-400' : c.mezzanineIndex >= 580 ? 'text-amber-400' : 'text-red-400';
  const disbursed = c.status === 'active' ? c.disbursements.filter(d => d.disbStatus === 'Disbursed').length : 0;
  const totalDisb = c.status === 'active' ? c.disbursements.length : 0;
  const disbPct = totalDisb > 0 ? Math.round((disbursed / totalDisb) * 100) : 0;
  const isBuildTech = c.id === 'CP-001';
  const statusMeta = {
    active:    { label: `Active · ${disbursed}/${totalDisb} disbursed`, bg: c.ecl >= 4 ? 'bg-amber-500/10 text-amber-400 border-amber-800/50' : 'bg-[#56afb6]/10 text-[#56afb6] border-[#56afb6]/30', row: c.ecl >= 4 ? 'border-amber-900/30' : 'border-[#56afb6]/15' },
    collected: { label: 'Collected ✓', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/50', row: 'border-emerald-900/20' },
    rejected:  { label: 'Rejected ✗', bg: 'bg-red-500/10 text-red-400 border-red-800/50', row: 'border-red-900/20' },
  }[c.status];

  return (
    <div className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${isBuildTech ? 'border-purple-500/60 ring-1 ring-purple-500/40' : statusMeta.row}`}>
      <button className="w-full text-left" onClick={onToggle}>
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
            <Building2 size={14} className="text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white leading-tight truncate">
              {c.company}
              {isBuildTech && <span className="ml-2 text-[8px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/40 rounded-full px-1.5 py-0.5 align-middle">DEMO</span>}
            </p>
            <p className="text-[9px] text-slate-500 truncate">{c.sector} · {c.region}</p>
          </div>
          <div className="text-right flex-shrink-0 hidden sm:block">
            <p className="text-sm font-bold text-white">{(c.amount / 1000).toFixed(0)}K</p>
            <p className="text-[9px] text-slate-600">SAR</p>
          </div>
          <div className="text-right flex-shrink-0 hidden md:block w-12">
            <p className={`text-xs font-bold ${eclColor}`}>{c.ecl}%</p>
            <p className="text-[8px] text-slate-600">ECL</p>
          </div>
          <span className={`text-[9px] font-bold border rounded-full px-2 py-0.5 flex-shrink-0 whitespace-nowrap hidden xs:inline sm:inline ${statusMeta.bg}`}>{statusMeta.label}</span>
          {c.status === 'active' && (
            <div className="w-16 hidden lg:block">
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${c.ecl >= 4 ? 'bg-amber-500' : 'bg-[#56afb6]'}`} style={{ width: `${disbPct}%` }} />
              </div>
              <p className="text-[8px] text-slate-600 mt-0.5 text-center">{disbursed}/{totalDisb}</p>
            </div>
          )}
          {c.ecl >= 4 && c.status === 'active' && <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />}
          <ChevronDown size={13} className={`text-slate-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-800 px-4 pb-4 pt-3 bg-slate-900/60">
          {/* ── ACTIVE ── */}
          {c.status === 'active' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                <div className="bg-slate-800 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">Approved</p>
                  <p className="text-[9px] font-bold text-white">{c.approvedDate}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">Tranches</p>
                  <p className="text-[10px] font-bold text-[#56afb6]">{disbursed}/{totalDisb}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">Index</p>
                  <p className={`text-[9px] font-bold ${idxColor}`}>{c.mezzanineIndex}/1000</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">ECL</p>
                  <p className={`text-[9px] font-bold ${eclColor}`}>{c.ecl}%</p>
                </div>
              </div>

              <div className="space-y-3">
                {c.disbursements.map((d, di) => {
                  const allDone = d.conditions.every(r => r.done);
                  const disbColor = {
                    'Disbursed':          { border: 'border-emerald-800/50', bg: 'bg-emerald-950/30', icon: <CheckCircle2 size={14} className="text-emerald-400" />, badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-800', dot: 'bg-emerald-500' },
                    'Conditions Pending': { border: 'border-amber-800/50',   bg: 'bg-amber-950/20',   icon: <AlertTriangle size={14} className="text-amber-400" />,  badge: 'bg-amber-500/10 text-amber-400 border-amber-800',   dot: 'bg-amber-500'  },
                    'Locked':             { border: 'border-slate-700/50',   bg: 'bg-slate-800/40',   icon: <Lock size={14} className="text-slate-500" />,           badge: 'bg-slate-700 text-slate-500 border-slate-600',      dot: 'bg-slate-600'  },
                  }[d.disbStatus];
                  return (
                    <div key={di} className={`rounded-xl border ${disbColor.border} overflow-hidden`}>
                      <div className={`flex items-center gap-3 px-3 py-2.5 ${disbColor.bg}`}>
                        {disbColor.icon}
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-white leading-tight">{d.label}</p>
                          <p className="text-[8px] text-slate-500">{d.labelAr} · {d.date}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-white">{(d.amount / 1000).toFixed(0)}K SAR</p>
                          <span className={`text-[8px] font-bold border rounded-full px-1.5 py-0.5 ${disbColor.badge}`}>{d.disbStatus}</span>
                        </div>
                      </div>
                      {d.disbStatus !== 'Locked' && (
                        <div className="px-3 pb-3 pt-2 bg-slate-900/40 space-y-1.5">
                          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">الشروط المطلوبة · Conditions Required</p>
                          {d.conditions.map((req, ri) => (
                            <div key={ri} className={`flex items-center gap-2 p-2 rounded-lg border ${req.done ? 'bg-emerald-950/30 border-emerald-900/40' : 'bg-slate-800/60 border-slate-700/60'}`}>
                              <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border ${req.done ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-700 border-slate-600'}`}>
                                {req.done
                                  ? <CheckCircle2 size={9} className="text-white" />
                                  : <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-[9px] font-medium leading-tight ${req.done ? 'text-emerald-400 line-through' : 'text-slate-300'}`}>{req.label}</p>
                                <p className="text-[8px] text-slate-600 leading-tight">{req.labelAr}</p>
                              </div>
                              <span className={`text-[7px] font-bold rounded-full px-1.5 py-0.5 flex-shrink-0 border ${req.done ? 'bg-emerald-500/10 text-emerald-400 border-emerald-800' : 'bg-slate-700 text-slate-500 border-slate-600'}`}>
                                {req.done ? '✓' : '—'}
                              </span>
                            </div>
                          ))}
                          {allDone && d.disbStatus === 'Conditions Pending' && (
                            <div className="flex items-center justify-between bg-emerald-950/50 border border-emerald-800/50 rounded-lg px-2.5 py-1.5 mt-1">
                              <span className="text-[9px] font-semibold text-emerald-400 flex items-center gap-1"><CheckCircle2 size={9} /> جميع الشروط مستوفاة</span>
                              <button className="text-[8px] font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-lg hover:bg-emerald-500 transition-all">Release Funds</button>
                            </div>
                          )}
                        </div>
                      )}
                      {d.disbStatus === 'Locked' && (
                        <div className="px-3 py-2 text-center">
                          <p className="text-[8px] text-slate-600 italic">🔒 Locked — unlock after previous tranche is disbursed</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {isBuildTech && (
                <button onClick={onOpenBuildTech}
                  className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-900/40 transition-all">
                  Continue → Torbiona AI Verdict (Step 2) <ArrowRight size={14} />
                </button>
              )}
            </div>
          )}

          {/* ── COLLECTED ── */}
          {c.status === 'collected' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <div className="bg-emerald-950/40 border border-emerald-900/30 rounded-lg p-2.5 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">Total Collected</p>
                  <p className="text-sm font-bold text-emerald-400">{(c.amount / 1000).toFixed(0)}K</p>
                  <p className="text-[8px] text-slate-600">SAR</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2.5 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">Installments</p>
                  <p className="text-sm font-bold text-emerald-400">{c.installments}</p>
                  <p className="text-[8px] text-slate-600">all paid</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2.5 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">Final ECL</p>
                  <p className={`text-sm font-bold ${eclColor}`}>{c.ecl}%</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2.5 text-center">
                  <p className="text-[8px] text-slate-500 mb-0.5">Index</p>
                  <p className={`text-sm font-bold ${idxColor}`}>{c.mezzanineIndex}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Clock size={9} />{c.startDate}</span>
                <div className="flex-1 mx-3 h-1.5 bg-emerald-900/40 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-emerald-500 rounded-full" />
                </div>
                <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 size={9} />{c.endDate}</span>
              </div>
              <p className="text-[9px] text-slate-500 italic leading-relaxed">{c.note}</p>
            </div>
          )}

          {/* ── REJECTED ── */}
          {c.status === 'rejected' && (
            <div>
              <div className="flex items-start gap-2.5 bg-red-950/40 border border-red-900/40 rounded-lg p-3 mb-3">
                <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-red-400 mb-0.5">Rejection Reason</p>
                  <p className="text-[10px] text-slate-300">{c.reason}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-slate-800 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-slate-500">Rejected</p>
                  <p className="text-[9px] font-bold text-white">{c.rejectedDate}</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-slate-500">ECL</p>
                  <p className="text-[10px] font-bold text-red-400">{c.ecl}%</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-2 text-center">
                  <p className="text-[8px] text-slate-500">Index</p>
                  <p className="text-[10px] font-bold text-red-400">{c.mezzanineIndex}/1000</p>
                </div>
              </div>
              <p className="text-[9px] text-slate-500 italic leading-relaxed">{c.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PortfolioStep = ({ onOpenBuildTech }) => {
  const [portfolioTab, setPortfolioTab] = useState('all');
  const [expanded, setExpanded] = useState({ 'CP-001': true });
  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header + summary stats */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow">
          <Database size={15} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Credit Portfolio <span className="text-indigo-400">· محفظة التمويل</span></p>
          <p className="text-[10px] text-slate-500">All credit facilities — approved, active, collected, and rejected</p>
        </div>
      </div>

      {/* Summary KPI strip */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Active', labelAr: 'معتمدة · جارية', count: creditPortfolioData.filter(c => c.status === 'active').length, color: 'text-[#56afb6]', bg: 'bg-[#56afb6]/10 border-[#56afb6]/30', tab: 'active' },
          { label: 'Collected', labelAr: 'محصّلة', count: creditPortfolioData.filter(c => c.status === 'collected').length, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-800/40', tab: 'collected' },
          { label: 'Rejected', labelAr: 'مرفوضة', count: creditPortfolioData.filter(c => c.status === 'rejected').length, color: 'text-red-400', bg: 'bg-red-500/10 border-red-800/40', tab: 'rejected' },
        ].map(s => (
          <button key={s.tab} onClick={() => setPortfolioTab(portfolioTab === s.tab ? 'all' : s.tab)}
            className={`rounded-xl border p-3 text-center transition-all ${s.bg} ${portfolioTab === s.tab ? 'ring-1 ring-white/20' : 'opacity-70 hover:opacity-100'}`}>
            <p className={`text-lg font-bold ${s.color}`}>{s.count}</p>
            <p className="text-[9px] text-slate-400 font-semibold">{s.label}</p>
            <p className="text-[8px] text-slate-600">{s.labelAr}</p>
          </button>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 bg-slate-900/60 rounded-xl p-1 overflow-x-auto">
        {[
          { id: 'all',       label: 'All',       labelMobile: 'All' },
          { id: 'active',    label: 'Active · شروط الصرف', labelMobile: 'Active' },
          { id: 'collected', label: 'Collected',  labelMobile: 'Collected' },
          { id: 'rejected',  label: 'Rejected',   labelMobile: 'Rejected' },
        ].map(t => (
          <button key={t.id} onClick={() => setPortfolioTab(t.id)}
            className={`flex-shrink-0 sm:flex-1 py-2 px-3 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap ${
              portfolioTab === t.id
                ? 'bg-[#56afb6]/15 text-[#56afb6] ring-1 ring-[#56afb6]/30'
                : 'text-slate-500 hover:text-slate-300'
            }`}>
            <span className="sm:hidden">{t.labelMobile}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Company list */}
      <div className="space-y-2">
        {creditPortfolioData
          .filter(c => portfolioTab === 'all' || c.status === portfolioTab)
          .map((c) => (
            <PortfolioCard key={c.id} c={c} isOpen={!!expanded[c.id]} onToggle={() => toggle(c.id)} onOpenBuildTech={onOpenBuildTech} />
          ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   STEP 2 — Torbiona AI Verdict + Control & Monitoring (BuildTech, auto-approved)
   ══════════════════════════════════════════════════════════════════════════ */
const VerdictStep = ({ onNext }) => {
  const r = BUILDTECH_REQUEST;
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 overflow-hidden">
      <div className="p-4 md:p-6 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center">
              <Building2 size={18} className="text-[#56afb6]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">{r.company}</h2>
          </div>
          <p className="text-sm text-slate-600">
            Credit Request: <span className="font-semibold">{r.amount.toLocaleString()} SAR</span> for {r.purpose}
          </p>
        </div>

        {/* AI Verdict */}
        <div className="rounded-2xl border p-4 bg-emerald-50 border-emerald-200">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-slate-700 uppercase">Torbiona AI Verdict</span>
            <span className="ml-auto text-xs px-2 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-700">STP Executed</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/60 rounded-xl p-3 border border-white/80">
              <p className="text-xs text-slate-500 uppercase mb-1">ECL Score</p>
              <p className="text-2xl font-bold text-emerald-600">{r.ecl}%</p>
            </div>
            <div className="bg-white/60 rounded-xl p-3 border border-white/80 sm:col-span-2">
              <p className="text-xs text-slate-500 uppercase mb-1">Recommendation</p>
              <p className="text-lg font-bold text-emerald-700">✅ AUTO-APPROVED</p>
              <p className="text-xs text-emerald-600 mt-1">Approved at: {r.approvedAt}</p>
              <p className="text-xs text-slate-600 mt-1">
                Limit: <span className="font-bold">{r.recommendedLimit.toLocaleString()} SAR</span>
              </p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-3">Data Sources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={14} className="text-[#56afb6]" />
                <span className="text-xs font-bold text-slate-500 uppercase">Gov API</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-slate-500">Status</span><span className="font-semibold text-emerald-600">{r.govApi.status}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Age</span><span className="font-semibold">{r.govApi.age}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Compliance</span><span className="font-semibold text-emerald-600">{r.govApi.compliance}</span></div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Database size={14} className="text-[#56afb6]" />
                <span className="text-xs font-bold text-slate-500 uppercase">ERP</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-slate-500">CCC</span><span className="font-semibold text-emerald-600">{r.erp.ccc}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Invoices</span><span className="font-semibold">{r.erp.invoices}</span></div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} className="text-[#56afb6]" />
                <span className="text-xs font-bold text-slate-500 uppercase">Platform</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-slate-500">POs</span><span className="font-semibold text-[#56afb6]">{r.platform.pos}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">Rating</span><span className="font-semibold">{r.platform.rating}/5</span></div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard size={14} className="text-[#56afb6]" />
                <span className="text-xs font-bold text-slate-500 uppercase">Credit Bureau</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs"><span className="text-slate-500">Defaults</span><span className="font-semibold text-emerald-600">{r.bureau.defaults === 0 ? 'None' : r.bureau.defaults}</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">History</span><span className="font-semibold text-xs">{r.bureau.history}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Control & Monitoring */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
            <p className="text-xs font-bold text-slate-400 uppercase">Control &amp; Monitoring</p>
            <p className="text-xs text-slate-400">التحكم والمراقبة (ميزانين المالية)</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lock size={16} className="text-[#56afb6]" />
                <p className="text-sm font-bold text-slate-700">Disbursement Plan</p>
              </div>
              <div className="space-y-2">
                {[
                  ['Amount per Disbursement', 'مبلغ كل دفعة', r.monitoring.amountPerDisbursement],
                  ['Disbursement Conditions', 'شروط الصرف', r.monitoring.disbursementConditions],
                  ['Beneficiary', 'المستفيد', r.monitoring.beneficiary],
                  ['Required Documents', 'المستندات المطلوبة', r.monitoring.requiredDocuments],
                  ['Suspension & Hold Rules', 'قواعد التعليق والإيقاف', r.monitoring.suspensionRules],
                  ['Reserve Ratio', 'نسبة الاحتياطي', r.monitoring.reserveRatio],
                  ['Repayment Schedule', 'جدول السداد', r.monitoring.repaymentSchedule],
                ].map(([en, ar, value]) => (
                  <div key={en} className="bg-slate-50 rounded-lg px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">{en}</span>
                      <span className="text-xs text-slate-400">{ar}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-[#56afb6]" />
                <p className="text-sm font-bold text-white">Mezzanine Tech Automatically</p>
              </div>
              <div className="space-y-2">
                {[
                  ['Applies Conditions Technically', 'تطبيق الشروط تقنيًا'],
                  ['Verifies Invoices', 'التحقق من الفواتير'],
                  ['Monitors Usage', 'مراقبة الاستخدام'],
                  ['Tracks Execution', 'متابعة التنفيذ'],
                  ['Issues Alerts', 'إصدار التنبيهات'],
                  ['Updates Company Index', 'تحديث مؤشر المنشأة'],
                  ['Monitors Repayment Source', 'مراقبة مصدر السداد'],
                ].map(([en, ar]) => (
                  <div key={en} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 bg-slate-800/60 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-slate-200">{en}</span>
                    <span className="text-xs text-slate-500">{ar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-3 space-y-2">
        <div className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
          <CheckCircle2 size={16} />
          ✅ Auto-Approved by Torbiona AI
        </div>
        <button className="w-full py-2 bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 flex items-center justify-center gap-2">
          <Download size={16} />
          Download Audit Trail
        </button>
        <button onClick={onNext}
          className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-purple-900/30 transition-all flex items-center justify-center gap-2">
          Continue → Company Profile (Step 3) <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   STEP 3 / STEP 5 — Profile Complete (exact JointOperation "Credit Report")
   ══════════════════════════════════════════════════════════════════════════ */
const ProfileStep = ({ p, highlightCustomers, compareTo, onNext, nextLabel }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/60">
    <div className="text-center mb-6">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200">
        <CheckCircle size={42} className="text-white" />
      </div>
      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 uppercase tracking-widest">{p.tag}</span>
      <h2 className="text-2xl font-bold text-slate-900 mb-1 mt-3">Profile Complete!</h2>
      <p className="text-slate-500 text-sm max-w-md mx-auto">Your company profile has been fully set up on Mezzanine. Below is a summary of everything collected — ready to share with Mezzanine Finance.</p>
    </div>

    {compareTo && (
      <div className="mb-6 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={15} className="text-purple-600" />
          <p className="text-sm font-bold text-purple-800">Fuzzy Logic — prediction check</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white rounded-xl border border-purple-100 p-3 text-center">
            <p className="text-slate-500">{compareTo.aName} · Active Customers</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{compareTo.aValue}</p>
          </div>
          <div className="bg-white rounded-xl border border-purple-100 p-3 text-center">
            <p className="text-slate-500">{compareTo.bName} · Active Customers</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">{compareTo.bValue} <span className="text-xs font-semibold text-amber-600">▼ 1</span></p>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 mt-3 leading-relaxed">
          Company B has <strong>1 fewer active customer</strong> than BuildTech, but still sits inside the AI's fuzzy-approval band
          (≥ 2 anchor customers · ECL &lt; 2.5% · supplies a confirmed sector). The Fuzzy Logic engine flagged Building Materials
          as the next target — and this profile confirms the prediction. <span className="text-emerald-600 font-semibold">✅ Prediction confirmed.</span>
        </p>
      </div>
    )}

    <div className="space-y-4 mb-8">
      {/* Business Identity */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center"><Shield size={18} className="text-teal-600" /></div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Business Identity</h4>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><Check size={11} /> Verified via Wathiq</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div><span className="text-slate-500">Company</span><p className="font-semibold text-slate-800">{p.company}</p></div>
          <div><span className="text-slate-500">CR Number</span><p className="font-semibold text-slate-800">{p.cr}</p></div>
          <div><span className="text-slate-500">Status</span><p className="font-semibold text-emerald-700">Active &amp; Compliant</p></div>
          <div><span className="text-slate-500">Established</span><p className="font-semibold text-slate-800">{p.established}</p></div>
        </div>
      </div>

      {/* Regulatory Documents */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center"><FileText size={18} className="text-blue-600" /></div>
            <h4 className="font-bold text-slate-900 text-sm">Regulatory Documents</h4>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {p.regDocs.filter(d => d.status === 'uploaded').length}/{p.regDocs.length} uploaded
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {p.regDocs.map(doc => (
            <div key={doc.label} className="flex items-center gap-1.5 text-xs">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center ${doc.status === 'uploaded' ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                {doc.status === 'uploaded' && <Check size={8} className="text-white" />}
              </div>
              <span className={doc.status === 'uploaded' ? 'text-slate-700' : 'text-slate-400'}>{doc.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Listed */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center"><Package size={18} className="text-purple-600" /></div>
          <h4 className="font-bold text-slate-900 text-sm">Products Listed ({p.products.length})</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {p.products.map(pr => (
            <div key={pr.name} className="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg text-xs">
              <span className="font-semibold text-purple-800">{pr.name}</span>
              <span className="text-purple-600 ml-1">· SAR {pr.price}/{pr.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Organizational Structure */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center"><Users size={18} className="text-orange-600" /></div>
          <h4 className="font-bold text-slate-900 text-sm">Organizational Structure</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {p.org.map(s => (
            <div key={s.label} className="text-center bg-orange-50 rounded-lg p-3">
              <p className="text-xl font-bold text-orange-700">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Activity Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center"><BarChart2 size={18} className="text-emerald-600" /></div>
          <h4 className="font-bold text-slate-900 text-sm">Business Activity Summary</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {p.activity.map(s => {
            const isCustomers = s.label === 'Active Customers';
            if (isCustomers && highlightCustomers) {
              return (
                <div key={s.label} className="text-xs rounded-xl border-2 border-purple-400 bg-purple-50 p-3 -m-0.5">
                  <span className="text-purple-700 font-semibold flex items-center gap-1"><Zap size={11} /> {s.label}</span>
                  <p className="font-bold text-purple-800 text-lg">{s.value}</p>
                  <p className="text-[10px] text-purple-600 mt-0.5">AI anchor signal — tracked by Fuzzy Logic</p>
                </div>
              );
            }
            return (
              <div key={s.label} className="text-xs">
                <span className="text-slate-500">{s.label}</span>
                <p className="font-bold text-slate-900 text-sm">{s.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-2xl p-6 text-white text-center">
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
        <Landmark size={24} className="text-white" />
      </div>
      <h3 className="text-lg font-bold mb-2">You're Ready for Mezzanine Finance</h3>
      <p className="text-sm text-teal-100 mb-5 max-w-md mx-auto">
        Your complete company profile is now on Mezzanine. You can share it with Mezzanine Finance at any time to request credit, a financing facility, or a credit limit review.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button className="px-6 py-3 bg-white text-teal-700 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
          <CreditCard size={18} /> Request Credit from Mezzanine Finance
        </button>
        {onNext && (
          <button onClick={onNext} className="px-6 py-3 bg-white/20 border border-white/30 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all flex items-center justify-center gap-2">
            <ChevronRight size={18} /> {nextLabel}
          </button>
        )}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   STEP 4 — Fuzzy Logic zones + AI Next Targets (سياسات re-ranks predictions)
   ══════════════════════════════════════════════════════════════════════════ */
const FuzzyTargetsStep = ({ onNext }) => {
  const [policyId, setPolicyId] = useState('similarity');
  const policy = POLICIES.find(p => p.id === policyId);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-lg">
          <Zap size={15} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Fuzzy Logic · <span className="text-purple-400">مساحة ضبابية يستهدفها الذكاء</span></p>
          <p className="text-[10px] text-slate-500">AI learns from approved sectors and predicts the next credit targets using pattern similarity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ── Column 1: Confirmed Zone ── */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Confirmed Zone · المنطقة المؤكدة</p>
          </div>
          <div className="p-4 space-y-3">
            {CONFIRMED_ZONE.map((s) => {
              const bar = { emerald: 'bg-emerald-500', teal: 'bg-teal-400' }[s.color];
              const text = { emerald: 'text-emerald-400', teal: 'text-teal-400' }[s.color];
              const border = { emerald: 'border-emerald-800', teal: 'border-teal-800' }[s.color];
              return (
                <div key={s.sector} className={`rounded-xl border ${border} bg-slate-800/60 p-3`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold text-white">{s.sector}</p>
                      <p className="text-[9px] text-slate-500">{s.ar}</p>
                    </div>
                    <span className={`text-[10px] font-bold ${text}`}>{s.success}% success</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-700 rounded-full mb-2">
                    <div className={`h-full ${bar} rounded-full`} style={{ width: `${s.success}%` }} />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-slate-500">
                    <span>{s.companies} cos.</span>
                    <span>ECL {s.ecl}%</span>
                    <span className="ml-auto font-semibold text-slate-300">{s.volume} SAR</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Column 2: Fuzzy Zone visual ── */}
        <div className="bg-slate-900 rounded-2xl border border-purple-900/60 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-purple-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wide">Fuzzy Zone · مساحة ضبابية</p>
            </div>
            <span className="text-[9px] text-slate-600 italic">AI radial targeting map</span>
          </div>

          <div className="flex-1 flex flex-col p-3 gap-3">
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 300 280" className="w-full max-w-[280px]">
                <defs>
                  <filter id="fz-blur" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="fz-glow">
                    <feGaussianBlur stdDeviation="2.5" result="glow" />
                    <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="fz-inner" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.06" />
                  </radialGradient>
                  <radialGradient id="fz-fuzzy" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.04" />
                  </radialGradient>
                  <radialGradient id="fz-outer" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#1e293b" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
                  </radialGradient>
                  <marker id="fz-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="#a855f7" opacity="0.55" />
                  </marker>
                </defs>

                <circle cx="150" cy="138" r="128" fill="url(#fz-outer)" stroke="#1e293b" strokeWidth="1" />
                <text x="150" y="15"  textAnchor="middle" fill="#334155" fontSize="7.5" fontWeight="600" letterSpacing="2">UNKNOWN · مجهول</text>

                {[[55,40],[250,35],[268,140],[240,235],[60,235],[22,130],[150,20]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#334155" opacity="0.5" />
                ))}

                <circle cx="150" cy="138" r="98" fill="url(#fz-fuzzy)" filter="url(#fz-blur)" />
                <circle cx="150" cy="138" r="98" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
                <text x="150" y="247" textAnchor="middle" fill="#7c3aed" fontSize="7" fontWeight="700" letterSpacing="1" opacity="0.8">FUZZY ZONE · ضبابي</text>

                <circle cx="150" cy="138" r="62" fill="url(#fz-inner)" stroke="#10b981" strokeWidth="1.2" opacity="0.9" />
                <text x="150" y="193" textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="700" letterSpacing="1" opacity="0.7">CONFIRMED · مؤكد</text>

                <circle cx="150" cy="138" r="20" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
                <circle cx="150" cy="138" r="20" fill="none" stroke="#a855f7" strokeWidth="0.5" opacity="0.4">
                  <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="150" y="135" textAnchor="middle" fill="#c084fc" fontSize="8"  fontWeight="800">AI</text>
                <text x="150" y="145" textAnchor="middle" fill="#7c3aed" fontSize="6.5" fontWeight="600">ذكاء</text>

                <g filter="url(#fz-glow)"><circle cx="150" cy="85" r="7" fill="#10b981" /></g>
                <line x1="150" y1="118" x2="150" y2="93"  stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
                <text x="150" y="76" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontWeight="700">Construction</text>

                <g filter="url(#fz-glow)"><circle cx="203" cy="155" r="7" fill="#10b981" /></g>
                <line x1="170" y1="143" x2="197" y2="152" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
                <text x="218" y="158" textAnchor="start" fill="#6ee7b7" fontSize="7" fontWeight="700">Trading</text>

                <g filter="url(#fz-glow)"><circle cx="110" cy="168" r="6" fill="#2dd4bf" /></g>
                <line x1="133" y1="152" x2="115" y2="163" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
                <text x="65" y="172" textAnchor="middle" fill="#5eead4" fontSize="6.5" fontWeight="700">Manufact.</text>

                <g filter="url(#fz-glow)">
                  <circle cx="185" cy="96" r="6" fill="#f59e0b" />
                  <circle cx="185" cy="96" r="10" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.3">
                    <animate attributeName="r" values="7;12;7" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </g>
                <text x="197" y="94" textAnchor="start" fill="#fbbf24" fontSize="6.5" fontWeight="700">Logistics</text>

                <line x1="155" y1="119" x2="160" y2="78"  stroke="#a855f7" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" markerEnd="url(#fz-arrow)" />
                <line x1="164" y1="128" x2="205" y2="95"  stroke="#a855f7" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" markerEnd="url(#fz-arrow)" />
                <line x1="138" y1="130" x2="100" y2="106" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" markerEnd="url(#fz-arrow)" />

                <circle cx="160" cy="62" r="5.5" fill="#a855f7" opacity="0.85">
                  <animate attributeName="r"       values="5.5;8;5.5" dur="2s"   repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="175" y="57" textAnchor="start" fill="#c084fc" fontSize="6.5" fontWeight="700">Bldg. Materials</text>
                <text x="175" y="66" textAnchor="start" fill="#7c3aed" fontSize="6">مواد البناء</text>

                <circle cx="215" cy="88" r="5" fill="#a855f7" opacity="0.8">
                  <animate attributeName="r"       values="5;7.5;5"   dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.25;0.8" dur="2.8s" repeatCount="indefinite" />
                </circle>
                <text x="228" y="83" textAnchor="start" fill="#c084fc" fontSize="6.5" fontWeight="700">Logistics+</text>

                <circle cx="98" cy="93" r="4.5" fill="#a855f7" opacity="0.75">
                  <animate attributeName="r"       values="4.5;7;4.5"   dur="3.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.75;0.2;0.75" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <text x="50" y="91" textAnchor="middle" fill="#c084fc" fontSize="6.5" fontWeight="700">Engineering</text>
                <text x="50" y="100" textAnchor="middle" fill="#7c3aed" fontSize="6">هندسة</text>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-emerald-950/40 border border-emerald-900/40 rounded-xl p-2 text-center">
                <p className="text-[9px] text-emerald-600 uppercase font-semibold mb-0.5">Confirmed</p>
                <p className="text-sm font-bold text-emerald-400">4</p>
                <p className="text-[8px] text-slate-600">sectors</p>
              </div>
              <div className="bg-purple-950/40 border border-purple-900/40 rounded-xl p-2 text-center">
                <p className="text-[9px] text-purple-500 uppercase font-semibold mb-0.5">Fuzzy</p>
                <p className="text-sm font-bold text-purple-400">3</p>
                <p className="text-[8px] text-slate-600">AI targets</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-2 text-center">
                <p className="text-[9px] text-slate-600 uppercase font-semibold mb-0.5">Unknown</p>
                <p className="text-sm font-bold text-slate-500">∞</p>
                <p className="text-[8px] text-slate-600">unexplored</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Column 3: AI Next Targets ── */}
        <div className="bg-slate-900 rounded-2xl border border-amber-900/50 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-amber-900/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">AI Next Targets · التوقعات القادمة</p>
          </div>

          <div className="p-4 space-y-3 flex-1">
            {/* سياسات — policy selector */}
            <div>
              <p className="text-[9px] text-slate-500 font-semibold uppercase mb-1.5">سياسات · Targeting Policy</p>
              <div className="flex flex-wrap gap-1.5">
                {POLICIES.map(pol => (
                  <button key={pol.id} onClick={() => setPolicyId(pol.id)}
                    className={`text-left rounded-lg border px-2.5 py-1.5 transition-all ${
                      policyId === pol.id
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-200'
                        : 'bg-slate-800/60 border-slate-700 text-slate-500 hover:text-slate-300'
                    }`}>
                    <span className="block text-[10px] font-bold leading-tight">{pol.label}</span>
                    <span className="block text-[8px] opacity-80">{pol.ar}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-950/60 border border-purple-800/40 rounded-xl px-3 py-2.5">
              <p className="text-[9px] text-purple-400 font-semibold uppercase mb-1">AI Reasoning</p>
              <p className="text-[10px] text-slate-300 leading-relaxed">{policy.reasoning}</p>
            </div>

            {policy.targets.map((t) => {
              const ring  = { amber: 'ring-amber-700/40 bg-amber-950/40', purple: 'ring-purple-800/40 bg-purple-950/40', slate: 'ring-slate-700/40 bg-slate-800/60' }[t.color];
              const badge = { amber: 'bg-amber-500 text-white', purple: 'bg-purple-500 text-white', slate: 'bg-slate-600 text-white' }[t.color];
              const conf  = { amber: 'text-amber-400', purple: 'text-purple-400', slate: 'text-slate-400' }[t.color];
              const bar   = { amber: 'bg-amber-500', purple: 'bg-purple-500', slate: 'bg-slate-500' }[t.color];
              return (
                <div key={t.rank} className={`rounded-xl ring-1 ${ring} p-3`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 ${badge}`}>{t.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white leading-tight">{t.sector}</p>
                      <p className="text-[9px] text-slate-500">{t.ar}</p>
                    </div>
                    <span className={`text-xs font-bold flex-shrink-0 ${conf}`}>{t.confidence}%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full mb-2">
                    <div className={`h-full ${bar} rounded-full`} style={{ width: `${t.confidence}%` }} />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-slate-500 mb-1">
                    <span>ECL {t.ecl}</span>
                    <span>·</span>
                    <span>{t.companies} companies in scope</span>
                  </div>
                  <p className="text-[9px] text-slate-500 italic">{t.reason}</p>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/50">
            <p className="text-[9px] text-slate-600 text-center">Predictions update every 24h · Powered by Torbiona Fuzzy Logic Engine</p>
          </div>
        </div>
      </div>

      <button onClick={onNext}
        className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-900/40 transition-all">
        Onboard a predicted company → Building Materials (Step 5) <ArrowRight size={15} />
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   Main
   ══════════════════════════════════════════════════════════════════════════ */
export const FuzzyLogic = () => {
  const { setCurrentView } = useApp();
  const [step, setStep] = useState(1);

  const goNext = () => setStep(s => Math.min(STEPS.length, s + 1));
  const goBack = () => {
    if (step === 1) setCurrentView('b2b-platform');
    else setStep(s => s - 1);
  };

  const isDark = step === 1 || step === 4;
  const noticeMap = {
    1: 'Step 1 — The credit portfolio the AI learns from',
    2: 'Step 2 — Torbiona AI verdict & control plan for BuildTech (Company A)',
    3: 'Step 3 — Company A profile · watch the Active Customers signal',
    4: 'Step 4 — Fuzzy Zone map & the AI’s next credit targets',
    5: 'Step 5 — Company B profile · the Fuzzy Logic prediction, confirmed',
  };

  return (
    <div className={`min-h-screen pb-28 ${isDark ? 'bg-slate-950' : 'bg-[#f7f4e8]'}`}>
      {/* Journey notice strip */}
      <div className="bg-purple-600 text-white text-center py-2 text-xs font-semibold tracking-wide px-3">
        <Zap size={13} className="inline mr-1.5 mb-0.5" />
        Fuzzy Logic Journey — {noticeMap[step]}
      </div>

      {/* Back bar */}
      <div className="max-w-7xl mx-auto px-4 pt-5 pb-3">
        <button onClick={goBack}
          className={`flex items-center gap-2 font-medium text-sm hover:gap-3 transition-all ${isDark ? 'text-purple-300' : 'text-purple-500'}`}>
          <ArrowLeft size={16} /> {step === 1 ? 'Back to Marketplace' : 'Back'}
        </button>
      </div>

      <div className={`px-4 ${step === 1 || step === 4 ? '' : 'max-w-4xl mx-auto'}`}>
        {step === 1 && <PortfolioStep onOpenBuildTech={() => setStep(2)} />}
        {step === 2 && <VerdictStep onNext={goNext} />}
        {step === 3 && (
          <ProfileStep p={PROFILE_A} highlightCustomers onNext={goNext} nextLabel="Continue to Fuzzy Targets" />
        )}
        {step === 4 && <FuzzyTargetsStep onNext={goNext} />}
        {step === 5 && (
          <ProfileStep
            p={PROFILE_B}
            highlightCustomers
            compareTo={{ aName: 'BuildTech', aValue: 3, bName: 'Al-Rajhi Bld. Materials', bValue: 2 }}
            onNext={() => setCurrentView('b2b-platform')}
            nextLabel="Go to Marketplace"
          />
        )}
      </div>

      <ProgressBar step={step} onStepClick={setStep} />
    </div>
  );
};

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Shield, CheckCircle2, AlertTriangle, Building2,
  Database, Activity, CreditCard, Download, Zap, Clock, TrendingUp, Users, Briefcase,
  LayoutDashboard, Network, Bell, Megaphone, Percent, ArrowUpRight, FileText, CheckSquare,
  Lock, DollarSign, ClipboardCheck, Eye, Edit3, HelpCircle, XCircle, X, Search, Package, ChevronDown
} from 'lucide-react';

const REGISTERED_COMPANIES = [
  {
    id: 1, name: 'BuildTech Construction', nameAr: 'بيلدتك للإنشاءات',
    sector: 'Construction', region: 'Riyadh', size: 'Medium', employees: 120, founded: '2019',
    creditStatus: 'approved', mezzanineIndex: 742, ecl: 1.2, creditLimit: 45000,
    team: [
      { name: 'Ahmed Al-Rashid', role: 'Finance Admin', email: 'ahmed@buildtech.sa' },
      { name: 'Fatima Hassan', role: 'Procurement Officer', email: 'fatima@buildtech.sa' },
      { name: 'Mohammed Ali', role: 'Sales Rep', email: 'mohammed@buildtech.sa' },
    ],
    financing: [
      { id: 'FIN-001', amount: 45000, purpose: 'Operating Capital', status: 'Approved', date: '2024-01-15' },
      { id: 'FIN-002', amount: 60000, purpose: 'Equipment Financing', status: 'Pending', date: '2024-03-10' },
    ],
    orders: [
      { id: 'PO-2024-0142', product: 'Heavy Excavator', amount: 450000, status: 'Delivered' },
      { id: 'PO-2024-0189', product: 'Concrete Mixer', amount: 125000, status: 'In Transit' },
    ],
    contracts: [
      { id: 'CTR-001', title: 'Annual Supply Agreement', status: 'Active', value: 1200000 },
      { id: 'CTR-002', title: 'Equipment Maintenance', status: 'Active', value: 85000 },
    ],
    relationships: { suppliers: ['Global Materials', 'Heavy Equipment Co.'], customers: ['Safety First Ltd.', 'Al-Noor Trading Co.'] },
    bureau: { defaults: 0, history: 'Clean' },
    govApi: { status: 'Active', compliance: 'Verified', age: '5 Years' },
  },
  {
    id: 2, name: 'Qassim Heavy Metals', nameAr: 'قصيم للمعادن الثقيلة',
    sector: 'Manufacturing', region: 'Qassim', size: 'Medium', employees: 85, founded: '2020',
    creditStatus: 'review', mezzanineIndex: 612, ecl: 4.7, creditLimit: 80000,
    team: [
      { name: 'Khalid Al-Qassim', role: 'CEO', email: 'khalid@qhmetals.sa' },
      { name: 'Noura Fahad', role: 'Finance Manager', email: 'noura@qhmetals.sa' },
    ],
    financing: [
      { id: 'FIN-003', amount: 120000, purpose: 'Equipment Financing', status: 'Manual Review', date: '2024-01-14' },
    ],
    orders: [{ id: 'PO-2024-0101', product: 'Welding Equipment', amount: 85000, status: 'Processing' }],
    contracts: [{ id: 'CTR-003', title: 'Steel Supply Contract', status: 'Active', value: 540000 }],
    relationships: { suppliers: ['Riyadh Steel Works'], customers: ['BuildTech Construction', 'Dammam Logistics Hub'] },
    bureau: { defaults: 1, history: '1 Late Payment (2023)' },
    govApi: { status: 'Active', compliance: 'Pending', age: '2 Years' },
  },
  {
    id: 3, name: 'Al-Noor Trading Co.', nameAr: 'شركة النور للتجارة',
    sector: 'Trading', region: 'Jeddah', size: 'Small', employees: 32, founded: '2023',
    creditStatus: 'review', mezzanineIndex: 588, ecl: 3.2, creditLimit: 70000,
    team: [
      { name: 'Omar Al-Noor', role: 'Owner', email: 'omar@alnoor.sa' },
      { name: 'Reem Saleh', role: 'Operations Manager', email: 'reem@alnoor.sa' },
    ],
    financing: [{ id: 'FIN-004', amount: 95000, purpose: 'Inventory Purchase', status: 'Manual Review', date: '2024-01-13' }],
    orders: [{ id: 'PO-2024-0077', product: 'Safety Helmets (bulk)', amount: 54000, status: 'Delivered' }],
    contracts: [],
    relationships: { suppliers: ['Safety First Ltd.'], customers: ['BuildTech Construction'] },
    bureau: { defaults: 0, history: 'Limited History' },
    govApi: { status: 'Active', compliance: 'Verified', age: '1 Year' },
  },
  {
    id: 4, name: 'Riyadh Steel Works', nameAr: 'أعمال الرياض للصلب',
    sector: 'Manufacturing', region: 'Riyadh', size: 'Large', employees: 310, founded: '2017',
    creditStatus: 'approved', mezzanineIndex: 798, ecl: 0.9, creditLimit: 38000,
    team: [
      { name: 'Abdulaziz Al-Otaibi', role: 'CEO', email: 'abdulaziz@rswsa.sa' },
      { name: 'Mona Al-Rashidi', role: 'CFO', email: 'mona@rswsa.sa' },
      { name: 'Tariq Mansour', role: 'Procurement Head', email: 'tariq@rswsa.sa' },
      { name: 'Hessa Al-Dosari', role: 'Sales Director', email: 'hessa@rswsa.sa' },
    ],
    financing: [
      { id: 'FIN-005', amount: 38000, purpose: 'Raw Materials', status: 'Approved', date: '2024-01-15' },
      { id: 'FIN-006', amount: 55000, purpose: 'Inventory', status: 'Approved', date: '2023-10-02' },
    ],
    orders: [
      { id: 'PO-2024-0210', product: 'Steel Bars (5T)', amount: 4250, status: 'Delivered' },
      { id: 'PO-2024-0198', product: 'Steel Rods (bulk)', amount: 8500, status: 'Delivered' },
      { id: 'PO-2024-0303', product: 'Structural Steel', amount: 22000, status: 'In Transit' },
    ],
    contracts: [
      { id: 'CTR-004', title: 'Steel Supply Framework', status: 'Active', value: 3200000 },
      { id: 'CTR-005', title: 'Logistics Partnership', status: 'Active', value: 480000 },
    ],
    relationships: { suppliers: ['Global Materials'], customers: ['BuildTech Construction', 'Qassim Heavy Metals', 'Dammam Logistics Hub'] },
    bureau: { defaults: 0, history: 'Excellent' },
    govApi: { status: 'Active', compliance: 'Verified', age: '7 Years' },
  },
  {
    id: 5, name: 'Dammam Logistics Hub', nameAr: 'مركز الدمام للخدمات اللوجستية',
    sector: 'Logistics', region: 'Dammam', size: 'Medium', employees: 65, founded: '2021',
    creditStatus: 'progress', mezzanineIndex: 601, ecl: 2.8, creditLimit: 50000,
    team: [
      { name: 'Saad Al-Aqeel', role: 'Director', email: 'saad@dammamhub.sa' },
      { name: 'Lina Mahmoud', role: 'Finance Officer', email: 'lina@dammamhub.sa' },
    ],
    financing: [{ id: 'FIN-007', amount: 62000, purpose: 'Fleet Expansion', status: 'In Progress', date: '2024-01-12' }],
    orders: [{ id: 'PO-2024-0055', product: 'Logistics Services Q1', amount: 38000, status: 'Active' }],
    contracts: [{ id: 'CTR-006', title: 'Fleet Management Agreement', status: 'Pending', value: 250000 }],
    relationships: { suppliers: ['Riyadh Steel Works'], customers: ['Qassim Heavy Metals', 'Al-Noor Trading Co.'] },
    bureau: { defaults: 0, history: 'Clean' },
    govApi: { status: 'Active', compliance: 'Pending', age: '3 Years' },
  },
  {
    id: 6, name: 'Hail Textiles Co.', nameAr: 'شركة حائل للنسيج',
    sector: 'Manufacturing', region: 'Hail', size: 'Small', employees: 28, founded: '2023',
    creditStatus: 'rejected', mezzanineIndex: 412, ecl: 8.4, creditLimit: 0,
    team: [{ name: 'Ibrahim Al-Hail', role: 'Owner', email: 'ibrahim@hailtex.sa' }],
    financing: [{ id: 'FIN-008', amount: 150000, purpose: 'Working Capital', status: 'Rejected', date: '2024-01-15' }],
    orders: [], contracts: [],
    relationships: { suppliers: [], customers: [] },
    bureau: { defaults: 2, history: '2 Defaults (2022, 2023)' },
    govApi: { status: 'Active', compliance: 'Non-Compliant', age: '1 Year' },
  },
  {
    id: 7, name: 'Global Materials', nameAr: 'المواد العالمية',
    sector: 'Trading', region: 'Jeddah', size: 'Large', employees: 280, founded: '2015',
    creditStatus: 'approved', mezzanineIndex: 815, ecl: 0.7, creditLimit: 120000,
    team: [
      { name: 'Waleed Al-Ghamdi', role: 'CEO', email: 'waleed@globalmaterials.sa' },
      { name: 'Aisha Faisal', role: 'CFO', email: 'aisha@globalmaterials.sa' },
      { name: 'Nawaf Al-Zahrani', role: 'Sales Manager', email: 'nawaf@globalmaterials.sa' },
    ],
    financing: [
      { id: 'FIN-009', amount: 120000, purpose: 'Bulk Inventory', status: 'Approved', date: '2023-11-20' },
      { id: 'FIN-010', amount: 95000, purpose: 'Trade Finance', status: 'Approved', date: '2023-08-05' },
    ],
    orders: [
      { id: 'PO-2024-0301', product: 'Steel Bars (10T)', amount: 8500, status: 'Delivered' },
      { id: 'PO-2024-0289', product: 'Tower Crane', amount: 680000, status: 'In Transit' },
      { id: 'PO-2024-0260', product: 'Cement Bags (bulk)', amount: 90000, status: 'Delivered' },
    ],
    contracts: [
      { id: 'CTR-007', title: 'Exclusive Distribution Agreement', status: 'Active', value: 5800000 },
      { id: 'CTR-008', title: 'Import & Supply Contract', status: 'Active', value: 2200000 },
    ],
    relationships: { suppliers: ['Riyadh Steel Works'], customers: ['BuildTech Construction', 'Safety First Ltd.', 'Qassim Heavy Metals'] },
    bureau: { defaults: 0, history: 'Excellent' },
    govApi: { status: 'Active', compliance: 'Verified', age: '9 Years' },
  },
  {
    id: 8, name: 'Safety First Ltd.', nameAr: 'السلامة أولاً المحدودة',
    sector: 'Trading', region: 'Mecca', size: 'Small', employees: 45, founded: '2020',
    creditStatus: 'approved', mezzanineIndex: 698, ecl: 1.8, creditLimit: 25000,
    team: [
      { name: 'Nasser Al-Qahtani', role: 'Managing Director', email: 'nasser@safetyfirst.sa' },
      { name: 'Dana Al-Malki', role: 'Operations Officer', email: 'dana@safetyfirst.sa' },
    ],
    financing: [{ id: 'FIN-011', amount: 25000, purpose: 'Inventory Purchase', status: 'Approved', date: '2023-12-01' }],
    orders: [
      { id: 'PO-2024-0044', product: 'Safety Helmets (200 units)', amount: 240000, status: 'Delivered' },
      { id: 'PO-2024-0062', product: 'Safety Vests (bulk)', amount: 12000, status: 'Processing' },
    ],
    contracts: [{ id: 'CTR-010', title: 'Annual Safety Equipment Supply', status: 'Active', value: 380000 }],
    relationships: { suppliers: ['Al-Noor Trading Co.', 'Global Materials'], customers: ['BuildTech Construction', 'Qassim Heavy Metals'] },
    bureau: { defaults: 0, history: 'Clean' },
    govApi: { status: 'Active', compliance: 'Verified', age: '4 Years' },
  },
];

const creditStatusMeta = {
  approved:  { label: 'Approved',      color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  review:    { label: 'Manual Review', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  progress:  { label: 'In Progress',   color: 'bg-[#56afb6]/10 text-[#56afb6] border-[#56afb6]/30' },
  rejected:  { label: 'Rejected',      color: 'bg-red-100 text-red-700 border-red-200' },
};

const sectorDistribution = [
  { label: 'Construction', value: 128 },
  { label: 'Trading', value: 76 },
  { label: 'Manufacturing', value: 58 },
  { label: 'Logistics', value: 44 },
  { label: 'Other', value: 36 },
];
const regionDistribution = [
  { label: 'Riyadh', value: 142 },
  { label: 'Jeddah', value: 88 },
  { label: 'Dammam', value: 61 },
  { label: 'Qassim', value: 33 },
  { label: 'Other', value: 18 },
];
const sizeDistribution = [
  { label: 'Small (1-49 employees)', value: 210 },
  { label: 'Medium (50-249 employees)', value: 96 },
  { label: 'Large (250+ employees)', value: 36 },
];
const opsAlerts = [
  { level: 'high', text: 'Qassim Heavy Metals — ECL spiked to 4.7%, manual review recommended' },
  { level: 'medium', text: '3 companies approaching 90% credit limit utilization' },
  { level: 'medium', text: 'Al-Noor Trading Co. — new profile, limited bureau history' },
  { level: 'low', text: 'Riyadh Construction Pool ECL trending down (-0.2pp this month)' },
];

const manualReviewApps = [
  {
    id: 2,
    company: 'Qassim Heavy Metals',
    amount: 120000,
    purpose: 'Equipment Financing',
    status: 'Manual Review',
    type: 'manual',
    reason: 'High Amount Threshold',
    aiConfidence: 75,
    ecl: 4.7,
    recommendedLimit: 80000,
    govApi: { status: 'Active', age: '2 Years', compliance: 'Pending' },
    erp: { ccc: '-3 days worsened', invoices: 7 },
    platform: { pos: 3, rating: 3.9 },
    bureau: { defaults: 1, history: '1 Late Payment (2023)' },
    companySummary: 'Qassim Heavy Metals — 4 yrs, heavy equipment manufacturing',
    financials: 'Audited FY2023 statements verified',
    fiveCs: 'Character, Capacity, Capital, Collateral, Conditions — reviewed',
    mezzanineIndex: 612,
    expectedCashFlows: 'SAR 640K projected over 12 months',
    structuring: {
      capacity: '80,000 SAR', pricing: '11% APR', duration: '9 Months',
      reserveRatio: '8%', disbursementTerms: '2 tranches tied to milestones',
      controlPlan: 'Monthly ERP sync + escrow release',
    },
    monitoring: {
      amountPerDisbursement: '40,000 SAR / tranche (2 tranches)',
      disbursementConditions: 'Milestone-based, escrow controlled',
      beneficiary: 'Qassim Heavy Metals — Operating Account ****9013',
      requiredDocuments: 'Milestone certificate + supplier invoice',
      suspensionRules: 'Hold if ECL > 5% or compliance status lapses',
      reserveRatio: '8%',
      repaymentSchedule: 'Monthly, 9 installments',
    },
  },
  {
    id: 3,
    company: 'Al-Noor Trading Co.',
    amount: 95000,
    purpose: 'Inventory Purchase',
    status: 'Manual Review',
    type: 'manual',
    reason: 'New Customer Profile',
    aiConfidence: 68,
    ecl: 3.2,
    recommendedLimit: 70000,
    govApi: { status: 'Active', age: '1 Year', compliance: 'Verified' },
    erp: { ccc: '+2 days improved', invoices: 4 },
    platform: { pos: 1, rating: 4.2 },
    bureau: { defaults: 0, history: 'Limited History' },
    companySummary: 'Al-Noor Trading Co. — 1 yr, retail & distribution',
    financials: 'Unaudited FY2023 statements — pending CPA sign-off',
    fiveCs: 'Character, Capacity, Capital, Collateral, Conditions — reviewed',
    mezzanineIndex: 588,
    expectedCashFlows: 'SAR 410K projected over 12 months',
    structuring: {
      capacity: '70,000 SAR', pricing: '10.5% APR', duration: '6 Months',
      reserveRatio: '7%', disbursementTerms: 'Single tranche, escrow controlled',
      controlPlan: 'Quarterly ERP sync + platform activity review',
    },
    monitoring: {
      amountPerDisbursement: '70,000 SAR — single tranche',
      disbursementConditions: 'Escrow controlled, single release',
      beneficiary: 'Al-Noor Trading Co. — Operating Account ****5527',
      requiredDocuments: 'Purchase invoice + delivery note',
      suspensionRules: 'Hold if bureau history flags a new default',
      reserveRatio: '7%',
      repaymentSchedule: 'Monthly, 6 installments',
    },
  },
];

const autoApprovedApps = [
  {
    id: 1,
    company: 'BuildTech Construction',
    amount: 45000,
    purpose: 'Operating Capital',
    status: 'Auto-Approved ✅',
    type: 'auto',
    aiConfidence: 94,
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
  },
  {
    id: 4,
    company: 'Riyadh Steel Works',
    amount: 38000,
    purpose: 'Raw Materials',
    status: 'Auto-Approved ✅',
    type: 'auto',
    aiConfidence: 96,
    ecl: 0.9,
    recommendedLimit: 38000,
    approvedAt: '2024-01-15 08:47:32',
    govApi: { status: 'Active', age: '7 Years', compliance: 'Verified' },
    erp: { ccc: '+8 days improved', invoices: 1 },
    platform: { pos: 18, rating: 4.9 },
    bureau: { defaults: 0, history: 'Excellent' },
    monitoring: {
      amountPerDisbursement: '12,700 SAR / tranche (3 tranches)',
      disbursementConditions: 'Delivery-confirmed, escrow controlled',
      beneficiary: 'Riyadh Steel Works — Operating Account ****2208',
      requiredDocuments: 'GRN + supplier invoice per tranche',
      suspensionRules: 'Auto-suspend if ECL > 3% or 2 missed ERP syncs',
      reserveRatio: '4%',
      repaymentSchedule: 'Monthly, 10 installments — auto-debit',
    },
  },
];

const inProgressApps = [
  {
    id: 5,
    company: 'Dammam Logistics Hub',
    amount: 62000,
    purpose: 'Fleet Expansion',
    status: 'In Progress',
    type: 'progress',
    reason: 'Awaiting Additional Documentation',
    aiConfidence: 71,
    ecl: 2.8,
    recommendedLimit: 50000,
    govApi: { status: 'Active', age: '3 Years', compliance: 'Pending' },
    erp: { ccc: '-1 day worsened', invoices: 5 },
    platform: { pos: 6, rating: 4.1 },
    bureau: { defaults: 0, history: 'Clean' },
    companySummary: 'Dammam Logistics Hub — 3 yrs, freight & distribution',
    financials: 'FY2023 statements under review',
    fiveCs: 'Character, Capacity, Capital, Collateral, Conditions — in progress',
    mezzanineIndex: 601,
    expectedCashFlows: 'SAR 520K projected over 12 months',
    structuring: {
      capacity: '50,000 SAR', pricing: '10.8% APR', duration: '8 Months',
      reserveRatio: '6%', disbursementTerms: 'Pending underwriter sign-off',
      controlPlan: 'Weekly ERP sync pending activation',
    },
    monitoring: {
      amountPerDisbursement: '25,000 SAR / tranche (2 tranches)',
      disbursementConditions: 'Pending document verification',
      beneficiary: 'Dammam Logistics Hub — Operating Account ****7742',
      requiredDocuments: 'Fleet registration + insurance certificate',
      suspensionRules: 'Hold if documentation not received in 5 business days',
      reserveRatio: '6%',
      repaymentSchedule: 'Monthly, 8 installments',
    },
  },
];

const autoRejectedApps = [
  {
    id: 6,
    company: 'Hail Textiles Co.',
    amount: 150000,
    purpose: 'Working Capital',
    status: 'Auto-Rejected ❌',
    type: 'rejected',
    reason: 'ECL Exceeds Threshold',
    aiConfidence: 22,
    ecl: 8.4,
    recommendedLimit: 0,
    rejectedAt: '2024-01-15 07:12:05',
    govApi: { status: 'Active', age: '1 Year', compliance: 'Non-Compliant' },
    erp: { ccc: '-14 days worsened', invoices: 1 },
    platform: { pos: 0, rating: 2.3 },
    bureau: { defaults: 2, history: '2 Defaults (2022, 2023)' },
  },
];

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

const decisionOptions = [
  { id: 'approve', icon: CheckCircle2, label: 'Approval', labelAr: 'موافقة', accent: 'emerald' },
  { id: 'conditional', icon: AlertTriangle, label: 'Conditional Approval', labelAr: 'موافقة بشروط', accent: 'teal' },
  { id: 'amend', icon: Edit3, label: 'Amend Amount', labelAr: 'تعديل المبلغ', accent: 'amber' },
  { id: 'info', icon: HelpCircle, label: 'Request Information', labelAr: 'طلب معلومات', accent: 'slate' },
  { id: 'reject', icon: XCircle, label: 'Rejection', labelAr: 'رفض', accent: 'red' },
];
const decisionAccent = {
  emerald: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700',
  teal: 'bg-[#56afb6]/10 border-[#56afb6]/40 text-[#56afb6]',
  amber: 'bg-amber-500/10 border-amber-500/40 text-amber-700',
  slate: 'bg-slate-500/10 border-slate-400/40 text-slate-600',
  red: 'bg-red-500/10 border-red-500/40 text-red-600',
};

const AdminIdentityBanner = ({ company, companyAr, role, description, manages, gradient, Icon }) => (
  <div className={`rounded-2xl p-4 md:p-5 bg-gradient-to-r ${gradient} text-white shadow-sm`}>
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base md:text-lg font-bold">{company}</h3>
          <span className="text-xs text-white/60">{companyAr}</span>
        </div>
        <p className="text-xs md:text-sm text-white/90 font-semibold mt-0.5">{role}</p>
        <p className="text-xs text-white/75 mt-2 leading-relaxed max-w-3xl">{description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {manages.map((m) => (
            <span key={m} className="px-2.5 py-1 bg-white/15 rounded-full text-[11px] font-medium">{m}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   Fuzzy Logic — one section, four company lenses. Mezzanine Capital is the
   shared AI policy engine: Marketing feeds the market picture in, Capital
   sets the standard & policies, and Tech / Finance / Investment each act on
   the same fuzzy targeting map in their own way.
   ══════════════════════════════════════════════════════════════════════════ */
const FX_TONE = {
  good: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/50',
  mid:  'bg-amber-500/10 text-amber-400 border-amber-800/50',
  warn: 'bg-red-500/10 text-red-400 border-red-800/50',
};
const FX_C1 = {
  emerald: { bar: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-800' },
  teal:    { bar: 'bg-teal-400',    text: 'text-teal-400',    border: 'border-teal-800' },
};
const FX_T = {
  amber:  { ring: 'ring-amber-700/40 bg-amber-950/40',  badge: 'bg-amber-500 text-white',  conf: 'text-amber-400',  bar: 'bg-amber-500' },
  purple: { ring: 'ring-purple-800/40 bg-purple-950/40', badge: 'bg-purple-500 text-white', conf: 'text-purple-400', bar: 'bg-purple-500' },
  slate:  { ring: 'ring-slate-700/40 bg-slate-800/60',  badge: 'bg-slate-600 text-white',  conf: 'text-slate-400',  bar: 'bg-slate-500' },
};

const FUZZY_LENSES = {
  tech: {
    label: 'Mezzanine Tech', ar: 'ميزانين تِك', Icon: LayoutDashboard,
    tagline: 'monitors every company and turns behaviour into recommendations',
    col1Note: 'Sectors Tech keeps synced, monitored & healthy',
    col3Note: 'Recommendations Tech sends up to Capital',
    reasoning: (
      <>
        Pattern: companies with ERP synced, &gt;3 platform POs and ECL &lt; 2% stay stable. Tech recommends deeper data integration for <span className="text-purple-300 font-semibold">look-alike companies</span> and escalates data gaps to <span className="text-purple-300 font-semibold">Capital</span>.
      </>
    ),
    col1: [
      { name: 'Construction', ar: 'الإنشاءات', metric: '99% synced', pct: 99, a: '45 companies', b: '0 alerts', foot: '22.4M SAR tracked', color: 'emerald' },
      { name: 'Trading', ar: 'التجارة', metric: '97% synced', pct: 97, a: '22 companies', b: '1 alert', foot: '9.8M SAR tracked', color: 'emerald' },
      { name: 'Manufacturing', ar: 'التصنيع', metric: '93% synced', pct: 93, a: '12 companies', b: '2 alerts', foot: '6.1M SAR tracked', color: 'teal' },
      { name: 'Logistics', ar: 'اللوجستيات', metric: '88% synced', pct: 88, a: '8 companies', b: '3 alerts', foot: '3.2M SAR tracked', color: 'teal' },
    ],
    targets: [
      { title: 'Deep-integrate Construction cohort', ar: 'دمج بيانات — الإنشاءات', pct: 94, meta: '18 companies · data completeness < 60%', note: 'Recommend to Capital as onboarding priority' },
      { title: 'Add SIMAH webhook — Building Materials', ar: 'ربط سمة — مواد البناء', pct: 80, meta: '11 companies · bureau latency ~4d', note: 'Gives Finance fresher scores' },
      { title: 'Fleet telematics feed — Logistics', ar: 'تتبع الأسطول — اللوجستيات', pct: 69, meta: '7 companies · GPS coverage 40%', note: 'Closes monitoring blind spots' },
    ],
    effects: [
      { co: 'BuildTech Construction', tag: 'Healthy', tone: 'good', text: 'ERP synced · 12 POs · ECL 1.2% → recommend for expansion' },
      { co: 'Al-Rajhi Building Materials', tag: 'Onboarding', tone: 'mid', text: 'Partial ERP · 4 POs → recommend full integration' },
      { co: 'Dammam Logistics Hub', tag: 'Data gap', tone: 'warn', text: '2 missed ERP syncs → alert escalated to Capital' },
    ],
  },
  marketing: {
    label: 'Mezzanine Marketing', ar: 'ميزانين للتسويق', Icon: Megaphone,
    tagline: 'studies the market and uploads demand & risk signals to Capital',
    col1Note: 'Categories with proven demand and low return risk',
    col3Note: 'Signals Marketing uploads to Capital',
    reasoning: (
      <>
        Marketing watches order flow, search demand and return rates. Rising, low-risk categories are pushed to <span className="text-purple-300 font-semibold">Capital</span> as green signals; volatile or high-return products are flagged <span className="text-red-300 font-semibold">red</span>.
      </>
    ),
    col1: [
      { name: 'Cement & Aggregates', ar: 'الأسمنت والركام', metric: '+34% QoQ', pct: 92, a: '1,240 orders', b: '2.1% returns', foot: '18.6M SAR GMV', color: 'emerald' },
      { name: 'Local Steel Rebar', ar: 'حديد تسليح محلي', metric: '+21% QoQ', pct: 83, a: '980 orders', b: '3.0% returns', foot: '12.2M SAR GMV', color: 'emerald' },
      { name: 'Safety Equipment', ar: 'معدات السلامة', metric: '+9% QoQ', pct: 64, a: '610 orders', b: '1.4% returns', foot: '3.4M SAR GMV', color: 'teal' },
      { name: 'Heavy Welding Rigs', ar: 'معدات لحام ثقيلة', metric: '−12% QoQ', pct: 30, a: '120 orders', b: '8.7% returns', foot: '2.0M SAR GMV', color: 'teal' },
    ],
    targets: [
      { title: 'RISING — Building Materials demand', ar: 'صاعد — مواد البناء', pct: 88, meta: '+34% QoQ orders · 2.1% returns', note: 'Upload to Capital: widen credit appetite here' },
      { title: 'STEADY — Construction services', ar: 'ثابت — خدمات الإنشاء', pct: 72, meta: '+6% QoQ · 61% repeat buyers', note: 'Hold current policy' },
      { title: 'HIGH-RISK — Imported rebar', ar: 'مخاطر — حديد مستورد', pct: 34, meta: 'price volatility 22% · 8.7% return rate', note: 'Warn Capital: cap exposure, shorten tenor' },
    ],
    effects: [
      { co: 'BuildTech Construction', tag: 'Buys the rising SKU', tone: 'good', text: 'Heavy cement + rebar buyer — categories up 34% → strong repayment source' },
      { co: 'Al-Rajhi Building Materials', tag: 'Sells the rising SKU', tone: 'good', text: 'Supplies cement & blocks — GMV +28% → healthy receivables' },
      { co: 'Dammam Logistics Hub', tag: 'Volatile lane', tone: 'warn', text: 'Freight tied to imported steel — price swings reported to Capital' },
    ],
  },
  finance: {
    label: 'Mezzanine Finance', ar: 'ميزانين للتمويل', Icon: Shield,
    tagline: "decides who gets credit and who doesn't, within Capital's policy",
    col1Note: 'Sectors already inside the approved credit book',
    col3Note: 'Credit verdicts — grant / conditional / decline',
    reasoning: (
      <>
        Pattern detected: <span className="text-emerald-400 font-semibold">Construction</span> companies with ECL &lt; 2% and &gt;3 platform POs have a 96% success rate. Finance grants credit to look-alikes inside <span className="text-purple-300 font-semibold">Capital's band</span> and declines anything outside it.
      </>
    ),
    col1: [
      { name: 'Construction', ar: 'الإنشاءات', metric: '96% success', pct: 96, a: '45 cos.', b: 'ECL 1.1%', foot: '22.4M SAR', color: 'emerald' },
      { name: 'Trading', ar: 'التجارة', metric: '91% success', pct: 91, a: '22 cos.', b: 'ECL 1.4%', foot: '9.8M SAR', color: 'emerald' },
      { name: 'Manufacturing', ar: 'التصنيع', metric: '82% success', pct: 82, a: '12 cos.', b: 'ECL 2.1%', foot: '6.1M SAR', color: 'teal' },
      { name: 'Logistics', ar: 'اللوجستيات', metric: '78% success', pct: 78, a: '8 cos.', b: 'ECL 2.4%', foot: '3.2M SAR', color: 'teal' },
    ],
    targets: [
      { title: 'GRANT — Construction (Expansion)', ar: 'منح — إنشاءات توسّع', pct: 94, meta: '18 companies · ECL < 1.8% · auto-approve band', note: 'STP approve · 3-tranche disbursement' },
      { title: 'CONDITIONAL — Building Materials', ar: 'بشروط — مواد البناء', pct: 81, meta: '11 companies · ECL < 2.5%', note: 'Approve with escrow + GRN per tranche' },
      { title: 'DECLINE — Services / ECL > 6%', ar: 'رفض — خدمات / مخاطر عالية', pct: 18, meta: 'out-of-scope sector · bureau defaults', note: 'Auto-reject · refer to partner' },
    ],
    effects: [
      { co: 'BuildTech Construction', tag: 'Credit granted', tone: 'good', text: 'ECL 1.2% · 45K SAR auto-approved · monitored disbursement' },
      { co: 'Al-Rajhi Building Materials', tag: 'Conditional', tone: 'mid', text: 'ECL 2.3% · approved with escrow + per-tranche documents' },
      { co: 'Dammam Logistics Hub', tag: 'On hold', tone: 'warn', text: 'ECL 2.8% rising · tranche 2 frozen pending Q3 report' },
    ],
  },
  investment: {
    label: 'Mezzanine Investment', ar: 'ميزانين للاستثمار', Icon: TrendingUp,
    tagline: 'packages already-controlled companies into Sukuk for investors',
    col1Note: 'Controlled companies grouped into Sukuk-ready pools',
    col3Note: 'Sukuk issuance instructions from Capital',
    reasoning: (
      <>
        Capital confirms which companies are <span className="text-emerald-400 font-semibold">fully controlled</span> — credit granted, monitored, and repaying. Investment is told to <span className="text-purple-300 font-semibold">securitize only those</span> into Sharia-compliant Sukuk.
      </>
    ),
    col1: [
      { name: 'Riyadh Construction Pool', ar: 'مجمع الرياض للإنشاءات', metric: 'yield 8.7%', pct: 92, a: '45 cos.', b: 'ECL 1.1%', foot: '5.0M SAR', color: 'emerald' },
      { name: 'Trade Receivables Pool', ar: 'مجمع مستحقات التجارة', metric: 'yield 8.4%', pct: 88, a: '28 cos.', b: 'ECL 1.4%', foot: '3.8M SAR', color: 'emerald' },
      { name: 'Qassim Industrial Pool', ar: 'مجمع القصيم الصناعي', metric: 'yield 9.0%', pct: 80, a: '12 cos.', b: 'ECL 1.8%', foot: '2.4M SAR', color: 'teal' },
      { name: 'Logistics Pool (forming)', ar: 'مجمع اللوجستيات — تكوين', metric: 'not ready', pct: 45, a: '6 cos.', b: 'ECL 2.4%', foot: 'held', color: 'teal' },
    ],
    targets: [
      { title: 'ISSUE — Construction Sukuk Series II', ar: 'إصدار — صكوك إنشاءات ٢', pct: 92, meta: '18 controlled cos · 2+ collections each · ECL < 1.8%', note: 'Ready for institutional offering · 8.5% profit rate' },
      { title: 'BUILD — Building Materials pool', ar: 'تكوين — مجمع مواد البناء', pct: 78, meta: '11 cos · 1 collection cycle done', note: 'Add ~4 collections before issuing' },
      { title: 'HOLD — Logistics pool', ar: 'تأجيل — مجمع اللوجستيات', pct: 54, meta: 'ECL 2.4% · thin track record', note: 'Do not securitize until ECL < 2%' },
    ],
    effects: [
      { co: 'BuildTech Construction', tag: 'In Sukuk pool', tone: 'good', text: 'Controlled + 2 collections → Construction Series II' },
      { co: 'Al-Rajhi Building Materials', tag: 'Pool forming', tone: 'mid', text: 'Controlled · 1 collection → queued for Building Materials pool' },
      { co: 'Dammam Logistics Hub', tag: 'Excluded', tone: 'warn', text: 'ECL 2.8% + hold → kept out of Sukuk issuance for now' },
    ],
  },
};

const MARKET_MOVES = [
  { cat: 'Cement & Aggregates', ar: 'الأسمنت والركام', trend: '▲ +34%', dir: 'up', orders: '1,240', search: 'High', ret: '2.1%', risk: 'Low', signal: 'Widen credit appetite' },
  { cat: 'Local Steel Rebar', ar: 'حديد تسليح محلي', trend: '▲ +21%', dir: 'up', orders: '980', search: 'High', ret: '3.0%', risk: 'Low', signal: 'Widen credit appetite' },
  { cat: 'Ready-Mix Concrete', ar: 'خرسانة جاهزة', trend: '▲ +12%', dir: 'up', orders: '760', search: 'Rising', ret: '1.8%', risk: 'Low', signal: 'Keep policy' },
  { cat: 'Safety Equipment', ar: 'معدات السلامة', trend: '▲ +9%', dir: 'up', orders: '610', search: 'Steady', ret: '1.4%', risk: 'Low', signal: 'Keep policy' },
  { cat: 'Electrical & Plumbing', ar: 'كهرباء وسباكة', trend: '▬ +2%', dir: 'flat', orders: '430', search: 'Flat', ret: '4.2%', risk: 'Medium', signal: 'Hold' },
  { cat: 'Prefab Site Cabins', ar: 'كبائن مواقع جاهزة', trend: '▼ −18%', dir: 'down', orders: '70', search: 'Low', ret: '5.4%', risk: 'Medium', signal: 'Trim exposure' },
  { cat: 'Imported Rebar', ar: 'حديد مستورد', trend: '▼ −8%', dir: 'down', orders: '190', search: 'Falling', ret: '8.7%', risk: 'High', signal: 'Cap exposure · shorten tenor' },
  { cat: 'Heavy Welding Rigs', ar: 'معدات لحام ثقيلة', trend: '▼ −12%', dir: 'down', orders: '120', search: 'Low', ret: '6.1%', risk: 'High', signal: 'Reduce credit appetite' },
];

const FuzzyCapitalBand = ({ lens }) => (
  <div className="mb-4 rounded-2xl border border-purple-800/50 bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 p-4">
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <div className="flex items-start gap-3 flex-1">
        <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-purple-300" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Mezzanine Capital · <span className="text-purple-300">رأس المال</span></p>
          <p className="text-[10px] text-slate-400 leading-relaxed max-w-xl">
            AI Policy Engine — aggregates every company's signals and sets the standard &amp; policies all four companies operate under.
            Marketing feeds the market picture in; Capital hands policy out to Tech, Finance &amp; Investment.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {[['marketing', 'Marketing'], ['capital', 'Capital'], ['tech', 'Tech'], ['finance', 'Finance'], ['investment', 'Investment']].map(([k, label], i) => (
          <div key={k} className="flex items-center gap-1">
            <span className={`text-[9px] font-bold rounded-full px-2 py-1 border ${
              k === 'capital'
                ? 'bg-purple-500/20 text-purple-200 border-purple-500/50'
                : k === lens
                ? 'bg-[#56afb6]/15 text-[#56afb6] border-[#56afb6]/40'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}>{label}</span>
            {i < 4 && <span className="text-slate-600 text-[10px]">→</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HOLDING_POLICIES_FOR = {
  finance: [
    { label: 'Target Sector', value: 'Building Materials — low-risk adjacency to Construction book' },
    { label: 'Approval Condition', value: 'ECL < 2.5% + 2+ active customers confirmed' },
    { label: 'Fast-track STP', value: 'Suppliers to existing Construction clients — auto-approve band' },
    { label: 'Credit Range', value: '50,000 – 600,000 SAR | Reserve ratio: 5%' },
    { label: 'Alert Threshold', value: 'Auto-suspend if ECL > 3% or 2 missed ERP syncs' },
  ],
  marketing: [
    { label: 'Campaign Focus', value: 'Building Materials suppliers — Riyadh & Jeddah priority' },
    { label: 'Lead Qualification', value: 'Platform engagement ≥ 80% + verified ERP sync' },
    { label: 'Lead Target', value: '15 new qualified leads by Q2 2025' },
    { label: 'Prioritise', value: 'Companies supplying directly to approved Construction clients' },
    { label: 'Reporting', value: 'Weekly pipeline report back to Capital' },
  ],
  tech: [
    { label: 'Auto-KYB', value: 'Enable auto-KYB flow for Building Materials sector — 11 eligible' },
    { label: 'ERP Monitoring', value: 'Daily reconciliation for all onboarded Building Materials companies' },
    { label: 'ECL Alert', value: 'Flag any company exceeding ECL 3% for immediate review' },
    { label: 'Scorecard', value: 'Auto-populate credit scorecard from platform PO data' },
    { label: 'Onboarding', value: 'Track completion for 11 platform-identified eligible companies' },
  ],
  investment: [
    { label: 'Issue Now', value: 'Construction Sukuk Series II — 18 cos. · ECL < 1.8% · 8.5% profit rate' },
    { label: 'Build Pool', value: 'Building Materials pool — await 4 more collection cycles before issuing' },
    { label: 'Hold', value: 'Logistics pool — do not securitize until ECL drops below 2%' },
    { label: 'Buffer', value: '5% reserve from each pool against ECL deterioration' },
    { label: 'Reporting', value: 'Monthly pool-readiness report to Capital' },
  ],
};

const FuzzyLogicSection = ({ lens }) => {
  const L = FUZZY_LENSES[lens];
  const LensIcon = L.Icon;
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl mx-4 my-4 px-4 py-5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-lg">
            <Zap size={15} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Fuzzy Logic · <span className="text-purple-400">مساحة ضبابية يستهدفها الذكاء</span></p>
            <p className="text-[10px] text-slate-500">AI learns from approved sectors and predicts the next credit targets using pattern similarity</p>
            <p className="text-[10px] text-[#56afb6] font-semibold mt-0.5 flex items-center gap-1">
              <LensIcon size={11} /> {L.label} lens · {L.tagline}
            </p>
          </div>
        </div>

        <FuzzyCapitalBand lens={lens} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Column 1: Confirmed Zone (per-lens meaning) ── */}
          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Confirmed Zone · المنطقة المؤكدة</p>
              </div>
              <p className="text-[9px] text-slate-500 mt-1">{L.col1Note}</p>
            </div>
            <div className="p-4 space-y-3">
              {L.col1.map((s) => {
                const c = FX_C1[s.color];
                return (
                  <div key={s.name} className={`rounded-xl border ${c.border} bg-slate-800/60 p-3`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold text-white">{s.name}</p>
                        <p className="text-[9px] text-slate-500">{s.ar}</p>
                      </div>
                      <span className={`text-[10px] font-bold ${c.text}`}>{s.metric}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full mb-2">
                      <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${s.pct}%` }} />
                    </div>
                    <div className="flex items-center gap-3 text-[9px] text-slate-500">
                      <span>{s.a}</span>
                      <span>{s.b}</span>
                      <span className="ml-auto font-semibold text-slate-300">{s.foot}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Column 2: Fuzzy Zone radial map (shared — Capital's map) ── */}
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

          {/* ── Column 3: AI Next Targets (per-lens verdicts) ── */}
          <div className="bg-slate-900 rounded-2xl border border-amber-900/50 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-amber-900/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">AI Next Targets · التوقعات القادمة</p>
              </div>
              <p className="text-[9px] text-slate-500 mt-1">{L.col3Note}</p>
            </div>

            <div className="p-4 space-y-3 flex-1">
              <div className="bg-purple-950/60 border border-purple-800/40 rounded-xl px-3 py-2.5">
                <p className="text-[9px] text-purple-400 font-semibold uppercase mb-1">AI Reasoning</p>
                <p className="text-[10px] text-slate-300 leading-relaxed">{L.reasoning}</p>
              </div>

              {L.targets.map((t, i) => {
                const color = ['amber', 'purple', 'slate'][i];
                const c = FX_T[color];
                return (
                  <div key={t.title} className={`rounded-xl ring-1 ${c.ring} p-3`}>
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 ${c.badge}`}>{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white leading-tight">{t.title}</p>
                        <p className="text-[9px] text-slate-500">{t.ar}</p>
                      </div>
                      <span className={`text-xs font-bold flex-shrink-0 ${c.conf}`}>{t.pct}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full mb-2">
                      <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${t.pct}%` }} />
                    </div>
                    <p className="text-[9px] text-slate-500 mb-1">{t.meta}</p>
                    <p className="text-[9px] text-slate-500 italic">{t.note}</p>
                  </div>
                );
              })}
            </div>

            <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/50">
              <p className="text-[9px] text-slate-600 text-center">Predictions update every 24h · Powered by Torbiona Fuzzy Logic Engine</p>
            </div>
          </div>
        </div>

        {/* ── Policies received from Mezzanine Holding (shown for subsidiary lenses) ── */}
        {lens !== 'capital' && HOLDING_POLICIES_FOR[lens] && (
          <div className="mt-4 rounded-2xl border border-purple-800/40 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.15) 0%, rgba(15,23,42,0.95) 100%)' }}>
            <div className="px-4 py-3 border-b border-purple-800/30 flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                <Shield size={13} className="text-purple-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">
                  Policy Directive Received from Mezzanine Holding
                  <span className="text-purple-400"> · السياسات الواردة من القابضة</span>
                </p>
                <p className="text-[9px] text-slate-500 mt-0.5">
                  {L.label} is operating under these Capital directives this cycle — issued via Torbiona Fuzzy Logic Engine
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full px-2.5 py-1 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[8px] font-bold text-purple-300 uppercase tracking-wide">Active · فعّال</span>
              </div>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {HOLDING_POLICIES_FOR[lens].map((item, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-800/50 border border-purple-900/30 rounded-xl px-3 py-2.5">
                  <CheckCircle2 size={10} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] font-bold text-purple-300 uppercase tracking-wide leading-none mb-0.5">{item.label}</p>
                    <p className="text-[9px] text-slate-300 leading-snug">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-purple-900/30 bg-purple-950/20">
              <p className="text-[8px] text-purple-600 text-center">
                Mezzanine Capital → {L.label} · السياسات تصدر عن القابضة للشركات التابعة عبر محرك المنطق الضبابي
              </p>
            </div>
          </div>
        )}

        {/* ── Effect on the 3 companies (this lens) ── */}
        <div className="mt-4 bg-slate-900 rounded-2xl border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-white">Effect on companies · <span className="text-purple-400">الأثر على المنشآت</span></p>
            <p className="text-[9px] text-slate-500">seen through the {L.label} lens</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {L.effects.map((e) => (
              <div key={e.co} className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Building2 size={13} className="text-slate-400" />
                  <p className="text-[11px] font-bold text-white leading-tight">{e.co}</p>
                </div>
                <span className={`inline-block text-[9px] font-bold border rounded-full px-2 py-0.5 mb-1.5 ${FX_TONE[e.tone]}`}>{e.tag}</span>
                <p className="text-[10px] text-slate-400 leading-snug">{e.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export const AdminRiskPortal = () => {
  const { setCurrentView } = useApp();
  const [hubTab, setHubTab] = useState('operations');
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companySearch, setCompanySearch] = useState('');
  const [expandedSections, setExpandedSections] = useState({ team: true, financing: false, orders: false, contracts: false, relationships: false, risk: false });
  const [expandedCreditCards, setExpandedCreditCards] = useState({});
  const toggleCreditCard = (id) => setExpandedCreditCards(p => ({ ...p, [id]: !p[id] }));
  const [creditPortfolioTab, setCreditPortfolioTab] = useState('all');
  const toggleSection = (key) => setExpandedSections((p) => ({ ...p, [key]: !p[key] }));
  const filteredCompanies = REGISTERED_COMPANIES.filter((c) =>
    c.name.toLowerCase().includes(companySearch.toLowerCase()) ||
    c.sector.toLowerCase().includes(companySearch.toLowerCase()) ||
    c.region.toLowerCase().includes(companySearch.toLowerCase())
  );
  const [creditLimit, setCreditLimit] = useState(0);
  const [decision, setDecision] = useState('conditional');
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: 'Riyadh Construction Pool', companies: 45, value: 5000000, ecl: 1.1, status: 'ready',  investor: null,         issued: false },
    { id: 2, name: 'Qassim Industrial Pool',   companies: 12, value: 2400000, ecl: 1.8, status: 'active', investor: 'Al Rajhi Bank', issued: true  },
    { id: 3, name: 'Jeddah Trade Pool',        companies: 28, value: 3800000, ecl: 1.4, status: 'ready',  investor: null,         issued: false },
  ]);
  const [draggedCompany, setDraggedCompany] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [poolCompanies, setPoolCompanies] = useState({ 1: [], 2: [], 3: [] });
  const [newPoolName, setNewPoolName] = useState('');

  const handleDragStart = (co) => setDraggedCompany(co);
  const handleDrop = (poolId) => {
    if (!draggedCompany) return;
    setPoolCompanies((prev) => {
      const already = Object.values(prev).flat().some((c) => c.id === draggedCompany.id);
      if (already) return prev;
      const updated = { ...prev, [poolId]: [...prev[poolId], draggedCompany] };
      const count = updated[poolId].length;
      setPortfolios((pp) => pp.map((p) =>
        p.id === poolId
          ? { ...p, companies: p.companies + 1, value: p.value + draggedCompany.creditLimit * 10, ecl: Math.max(0.5, p.ecl - 0.02) }
          : p
      ));
      return updated;
    });
    setDraggedCompany(null);
    setDragOver(null);
  };
  const removeFromPool = (poolId, coId) => {
    setPoolCompanies((prev) => ({ ...prev, [poolId]: prev[poolId].filter((c) => c.id !== coId) }));
    setPortfolios((pp) => pp.map((p) => p.id === poolId ? { ...p, companies: Math.max(0, p.companies - 1) } : p));
  };
  const addNewPool = () => {
    if (!newPoolName.trim()) return;
    const id = portfolios.length + 1;
    setPortfolios((p) => [...p, { id, name: newPoolName, companies: 0, value: 0, ecl: 0, status: 'building', investor: null, issued: false }]);
    setPoolCompanies((p) => ({ ...p, [id]: [] }));
    setNewPoolName('');
  };
  const droppedInPool = (poolId) => poolCompanies[poolId] || [];
  const usedCompanyIds = new Set(Object.values(poolCompanies).flat().map((c) => c.id));

  const listByTab = {
    manual: manualReviewApps,
    auto: autoApprovedApps,
    progress: inProgressApps,
    rejected: autoRejectedApps,
  };
  const currentList = listByTab[activeTab];
  const isAutoApproved = selectedRequest?.type === 'auto';
  const isAutoRejected = selectedRequest?.type === 'rejected';
  const isReadOnly = isAutoApproved || isAutoRejected;

  const handleSelectRequest = (app) => {
    setSelectedRequest(app);
    setCreditLimit(app.recommendedLimit);
    setDecision('conditional');
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f4e8] flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('b2b-platform')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#56afb6]" />
              <h1 className="text-white font-bold text-sm md:text-base">Admin Portal</h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 ml-6">Mezzanine Tech · Mezzanine Finance · Mezzanine Investment · Mezzanine Marketing</p>
          </div>
        </div>
      </header>

      {/* Hub Tabs */}
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-2 bg-slate-900/50 rounded-xl p-1">
          <button
            onClick={() => setHubTab('operations')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              hubTab === 'operations'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Mezzanine Tech</span>
            <span className="sm:hidden">Tech</span>
          </button>
          <button
            onClick={() => setHubTab('credit-risk')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              hubTab === 'credit-risk'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield size={16} />
            <span className="hidden sm:inline">Mezzanine Finance</span>
            <span className="sm:hidden">Finance</span>
          </button>
          <button
            onClick={() => setHubTab('investment-portfolios')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              hubTab === 'investment-portfolios'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp size={16} />
            <span className="hidden sm:inline">Mezzanine Investment</span>
            <span className="sm:hidden">Investment</span>
          </button>
          <button
            onClick={() => setHubTab('marketing')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              hubTab === 'marketing'
                ? 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Megaphone size={16} />
            <span className="hidden sm:inline">Mezzanine Marketing</span>
            <span className="sm:hidden">Marketing</span>
          </button>
        </div>
      </div>

      {/* Mezzanine Operations Dashboard */}
      {hubTab === 'operations' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Mezzanine Operations Dashboard</h2>
              <p className="text-sm text-slate-600">Portfolio-wide view of registered companies, financing eligibility, relationships and risk</p>
            </div>

            <AdminIdentityBanner
              company="Mezzanine Tech"
              companyAr="ميزانين تك"
              role="Platform Operations Administrator"
              description="Owns the core platform infrastructure — company onboarding, data pipelines, relationship mapping, and system-wide risk monitoring across every registered company on Mezzanine."
              manages={[
                'Registered company directory',
                'Sector / region / size analytics',
                'Relationship & transaction network',
                'Platform alerts & risk indicators',
                'Data integration health (ERP, SIMAH, Gov API)',
              ]}
              gradient="from-teal-500 to-teal-700"
              Icon={LayoutDashboard}
            />

            <FuzzyLogicSection lens="tech" />

            {/* Top KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 size={14} className="text-slate-400" />
                  <p className="text-xs text-slate-400 uppercase font-semibold">Registered Companies</p>
                </div>
                <p className="text-2xl font-bold text-white">342</p>
              </div>
              <div className="bg-[#56afb6]/10 rounded-xl p-4 border border-[#56afb6]/30">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={14} className="text-[#56afb6]" />
                  <p className="text-xs text-[#56afb6] uppercase font-semibold">Eligible for Financing</p>
                </div>
                <p className="text-2xl font-bold text-[#56afb6]">218 <span className="text-sm text-slate-500">(64%)</span></p>
              </div>
              <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <Percent size={14} className="text-emerald-500" />
                  <p className="text-xs text-emerald-600 uppercase font-semibold">Avg Mezzanine Index</p>
                </div>
                <p className="text-2xl font-bold text-emerald-600">742<span className="text-sm text-slate-500">/1000</span></p>
              </div>
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-amber-600" />
                  <p className="text-xs text-amber-600 uppercase font-semibold">Creditworthiness Improvement</p>
                </div>
                <p className="text-2xl font-bold text-amber-600">+12.4%</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Financing Requests Volume</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">48.6M <span className="text-sm text-slate-500">SAR</span></p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Authorized Transactions</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">1,284</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <Network size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Mapped Relationships</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">1,967</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-white/60">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowUpRight size={14} className="text-slate-500" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Projected Q3 Flows</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">+9.2%</p>
              </div>
            </div>

            {/* Distribution: Sector / Region / Size */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-3">Distribution by Sector, Region & Size</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'By Sector', data: sectorDistribution },
                  { title: 'By Region', data: regionDistribution },
                  { title: 'By Size', data: sizeDistribution },
                ].map((group) => {
                  const max = Math.max(...group.data.map((d) => d.value));
                  return (
                    <div key={group.title} className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-4">
                      <p className="text-sm font-bold text-slate-700 mb-3">{group.title}</p>
                      <div className="space-y-2">
                        {group.data.map((d) => (
                          <div key={d.label}>
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                              <span>{d.label}</span>
                              <span className="font-semibold text-slate-700">{d.value}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#56afb6] to-teal-500 rounded-full"
                                style={{ width: `${(d.value / max) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Relationships + Forecasts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Network size={16} className="text-[#56afb6]" />
                  <p className="text-sm font-bold text-slate-700">Company, Customer & Supplier Relationships</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">342</p>
                    <p className="text-xs text-slate-500">Companies</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">1,120</p>
                    <p className="text-xs text-slate-500">Customer Links</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-slate-900">847</p>
                    <p className="text-xs text-slate-500">Supplier Links</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">1,284 authorized financial & operational transactions flowing through the mapped network this month.</p>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-[#56afb6]" />
                  <p className="text-sm font-bold text-slate-700">Forecast: Future Flows & Relationships</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                    <span className="text-xs text-slate-600">Next Quarter Financing Volume</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><ArrowUpRight size={14} />+9.2%</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                    <span className="text-xs text-slate-600">New Relationships Expected</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><ArrowUpRight size={14} />+184</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3">
                    <span className="text-xs text-slate-600">Eligible Companies Growth</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><ArrowUpRight size={14} />+6.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts & Risk Indicators */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Bell size={16} className="text-[#56afb6]" />
                <p className="text-xs font-bold text-slate-400 uppercase">Alerts & Risk Indicators</p>
              </div>
              <div className="space-y-2">
                {opsAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 rounded-xl p-3 border ${
                      alert.level === 'high'
                        ? 'bg-red-50 border-red-200'
                        : alert.level === 'medium'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    <AlertTriangle
                      size={16}
                      className={`flex-shrink-0 mt-0.5 ${
                        alert.level === 'high' ? 'text-red-500' : alert.level === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                      }`}
                    />
                    <p className="text-sm text-slate-700">{alert.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Company Registry ── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-[#56afb6]" />
                  <p className="text-base font-bold text-slate-900">Company Registry</p>
                  <span className="text-xs font-semibold bg-[#56afb6]/10 text-[#56afb6] border border-[#56afb6]/30 rounded-full px-2.5 py-0.5">{REGISTERED_COMPANIES.length} companies</span>
                </div>
                {selectedCompany && (
                  <button onClick={() => setSelectedCompany(null)} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                    ← Back to list
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[520px]">

                {/* Left: company list */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden flex flex-col">
                  <div className="p-3 border-b border-slate-700">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                        placeholder="Search company, sector, region…"
                        className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#56afb6]"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                    {filteredCompanies.map((co) => {
                      const meta = creditStatusMeta[co.creditStatus];
                      const isSelected = selectedCompany?.id === co.id;
                      return (
                        <button
                          key={co.id}
                          onClick={() => { setSelectedCompany(co); setExpandedSections({ team: true, financing: false, orders: false, contracts: false, relationships: false, risk: false }); }}
                          className={`w-full text-left rounded-xl p-3 border transition-all ${isSelected ? 'bg-[#56afb6]/15 border-[#56afb6]/50' : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'}`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#56afb6]/20 flex items-center justify-center flex-shrink-0">
                                <Building2 size={13} className="text-[#56afb6]" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white leading-tight">{co.name}</p>
                                <p className="text-[10px] text-slate-500">{co.nameAr}</p>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold border rounded-full px-1.5 py-0.5 flex-shrink-0 ${meta.color}`}>{meta.label}</span>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-slate-500">
                            <span>{co.sector}</span>
                            <span>·</span>
                            <span>{co.region}</span>
                            <span>·</span>
                            <span className={`font-bold ${co.mezzanineIndex >= 700 ? 'text-emerald-400' : co.mezzanineIndex >= 580 ? 'text-amber-400' : 'text-red-400'}`}>{co.mezzanineIndex}/1000</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: CRM tree */}
                <div className="lg:col-span-3 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden flex flex-col">
                  {selectedCompany ? (() => {
                    const co = selectedCompany;
                    const meta = creditStatusMeta[co.creditStatus];

                    const TreeSection = ({ sKey, icon, label, count, color, children }) => {
                      const open = expandedSections[sKey];
                      return (
                        <div className="relative">
                          <button
                            onClick={() => toggleSection(sKey)}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 transition-colors group ${open ? 'bg-slate-50' : ''}`}
                          >
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                              {icon}
                            </div>
                            <span className="text-xs font-bold text-slate-700 flex-1 text-left">{label}</span>
                            {count !== undefined && (
                              <span className="text-[9px] font-bold bg-slate-200 text-slate-500 rounded-full px-1.5 py-0.5">{count}</span>
                            )}
                            <ChevronDown size={13} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                          </button>
                          {open && (
                            <div className="relative ml-8 border-l-2 border-slate-100 mb-1">
                              {children}
                            </div>
                          )}
                        </div>
                      );
                    };

                    const TreeLeaf = ({ label, sub, badge, badgeColor }) => (
                      <div className="flex items-start gap-2 px-4 py-2 hover:bg-slate-50/60 transition-colors relative">
                        <div className="absolute left-0 top-1/2 w-3 h-px bg-slate-200" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0 mt-1.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-700 font-medium leading-tight truncate">{label}</p>
                          {sub && <p className="text-[10px] text-slate-400 truncate">{sub}</p>}
                        </div>
                        {badge && (
                          <span className={`text-[9px] font-bold border rounded-full px-1.5 py-0.5 flex-shrink-0 ${badgeColor}`}>{badge}</span>
                        )}
                      </div>
                    );

                    const statusBadge = (s) => {
                      if (s === 'Approved' || s === 'Delivered' || s === 'Active') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                      if (s === 'Rejected') return 'bg-red-50 text-red-700 border-red-200';
                      return 'bg-amber-50 text-amber-700 border-amber-200';
                    };

                    return (
                      <>
                        {/* Company header */}
                        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#56afb6] to-teal-600 flex items-center justify-center flex-shrink-0 shadow">
                              <Building2 size={20} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-bold text-slate-900">{co.name}</h3>
                                <span className={`text-[9px] font-bold border rounded-full px-1.5 py-0.5 ${meta.color}`}>{meta.label}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5">{co.nameAr} · {co.sector} · {co.region} · {co.size} · {co.employees} employees · Est. {co.founded}</p>
                              <div className="flex items-center gap-3 mt-2 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <span className="text-[9px] text-slate-500 uppercase font-semibold">Index</span>
                                  <span className={`text-xs font-bold ${co.mezzanineIndex >= 700 ? 'text-emerald-600' : co.mezzanineIndex >= 580 ? 'text-amber-600' : 'text-red-600'}`}>{co.mezzanineIndex}/1000</span>
                                </div>
                                <div className="w-px h-3 bg-slate-200" />
                                <div className="flex items-center gap-1">
                                  <span className="text-[9px] text-slate-500 uppercase font-semibold">ECL</span>
                                  <span className={`text-xs font-bold ${co.ecl < 2 ? 'text-emerald-600' : co.ecl < 5 ? 'text-amber-600' : 'text-red-600'}`}>{co.ecl}%</span>
                                </div>
                                <div className="w-px h-3 bg-slate-200" />
                                <div className="flex items-center gap-1">
                                  <span className="text-[9px] text-slate-500 uppercase font-semibold">Credit</span>
                                  <span className="text-xs font-bold text-[#56afb6]">{co.creditLimit.toLocaleString()} SAR</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tree */}
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">

                          <TreeSection sKey="team" icon={<Users size={12} className="text-white" />} label="Team & Contacts" count={co.team.length} color="bg-blue-500">
                            {co.team.map((m) => (
                              <TreeLeaf key={m.email} label={m.name} sub={`${m.role} · ${m.email}`} />
                            ))}
                          </TreeSection>

                          <TreeSection sKey="financing" icon={<DollarSign size={12} className="text-white" />} label="Financing History" count={co.financing.length} color="bg-[#56afb6]">
                            {co.financing.map((f) => (
                              <TreeLeaf key={f.id} label={`${f.id} · ${f.amount.toLocaleString()} SAR · ${f.purpose}`} sub={f.date} badge={f.status} badgeColor={statusBadge(f.status)} />
                            ))}
                          </TreeSection>

                          <TreeSection sKey="orders" icon={<Package size={12} className="text-white" />} label="Orders & POs" count={co.orders.length} color="bg-purple-500">
                            {co.orders.length === 0
                              ? <TreeLeaf label="No orders yet" />
                              : co.orders.map((o) => (
                                <TreeLeaf key={o.id} label={`${o.id} · ${o.product}`} sub={`${o.amount.toLocaleString()} SAR`} badge={o.status} badgeColor={statusBadge(o.status)} />
                              ))}
                          </TreeSection>

                          <TreeSection sKey="contracts" icon={<FileText size={12} className="text-white" />} label="Contracts" count={co.contracts.length} color="bg-indigo-500">
                            {co.contracts.length === 0
                              ? <TreeLeaf label="No contracts yet" />
                              : co.contracts.map((c) => (
                                <TreeLeaf key={c.id} label={`${c.id} · ${c.title}`} sub={`${(c.value / 1000).toFixed(0)}K SAR`} badge={c.status} badgeColor={statusBadge(c.status)} />
                              ))}
                          </TreeSection>

                          <TreeSection sKey="relationships" icon={<Network size={12} className="text-white" />} label="Relationships" color="bg-amber-500">
                            <TreeLeaf label={`Suppliers (${co.relationships.suppliers.length})`} sub={co.relationships.suppliers.join(', ') || 'None'} />
                            <TreeLeaf label={`Customers (${co.relationships.customers.length})`} sub={co.relationships.customers.join(', ') || 'None'} />
                          </TreeSection>

                          <TreeSection sKey="risk" icon={<Shield size={12} className="text-white" />} label="Risk Profile" color="bg-slate-600">
                            <TreeLeaf label="Gov API" sub={`${co.govApi.status} · ${co.govApi.compliance} · ${co.govApi.age}`} badge={co.govApi.compliance} badgeColor={statusBadge(co.govApi.compliance)} />
                            <TreeLeaf label="Credit Bureau" sub={co.bureau.history} badge={co.bureau.defaults === 0 ? 'Clean' : `${co.bureau.defaults} Default${co.bureau.defaults > 1 ? 's' : ''}`} badgeColor={co.bureau.defaults === 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'} />
                            <TreeLeaf label="Torbiona Status" sub={`ECL ${co.ecl}% · Index ${co.mezzanineIndex}/1000`} badge={meta.label} badgeColor={meta.color} />
                          </TreeSection>

                        </div>
                      </>
                    );
                  })() : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-300 p-8">
                      <Building2 size={40} className="opacity-30" />
                      <p className="text-sm font-medium">Select a company to view its CRM profile</p>
                      <p className="text-xs text-center max-w-xs">Click any company in the list to see team, financing history, orders, contracts, relationships, and risk data.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mezzanine Finance Identity */}
      {hubTab === 'credit-risk' && (
        <div className="px-4 pt-4 bg-slate-800">
          <AdminIdentityBanner
            company="Mezzanine Finance"
            companyAr="ميزانين للتمويل"
            role="Credit Underwriting Administrator — powered by Torbiona AI"
            description="Reviews and decisions every financing request — approving, rejecting, or escalating based on Torbiona AI's automated risk scoring, then structures disbursement and repayment controls."
            manages={[
              'Financing request queue',
              'ECL scoring & AI confidence review',
              'Credit limit approval & structuring',
              'Disbursement & repayment monitoring',
              'Audit trail & compliance decisions',
            ]}
            gradient="from-indigo-500 to-indigo-700"
            Icon={Shield}
          />
        </div>
      )}

      {/* KPI Cards */}
      {hubTab === 'credit-risk' && (
        <div className="px-4 py-4 bg-slate-800 border-b border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={14} className="text-slate-400" />
              <p className="text-xs text-slate-400 uppercase font-semibold">Total Requests</p>
            </div>
            <p className="text-2xl font-bold text-white">142</p>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-emerald-400" />
              <p className="text-xs text-emerald-400 uppercase font-semibold">Auto-Approved (STP)</p>
            </div>
            <p className="text-2xl font-bold text-emerald-400">128 <span className="text-sm">(90%)</span></p>
          </div>
          <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-amber-400" />
              <p className="text-xs text-amber-400 uppercase font-semibold">Pending Review</p>
            </div>
            <p className="text-2xl font-bold text-amber-400">14</p>
          </div>
        </div>
        </div>
      )}

      {/* Mezzanine Marketing Identity */}
      {hubTab === 'marketing' && (
        <div className="px-4 pt-4 bg-slate-800">
          <AdminIdentityBanner
            company="Mezzanine Marketing"
            companyAr="ميزانين للتسويق"
            role="Market Intelligence Administrator — powered by Fuzzy Logic AI"
            description="Monitors the marketplace end-to-end — what's selling, what's slowing, where orders concentrate, and which products carry risk — then uploads demand and risk signals to Mezzanine Capital to shape credit policy."
            manages={[
              'Category demand & search trends',
              'Order volume & concentration',
              'Product return / dispute risk',
              'Seasonality & price volatility',
              'Signal upload to Mezzanine Capital',
            ]}
            gradient="from-pink-500 to-rose-600"
            Icon={Megaphone}
          />
        </div>
      )}

      {/* Marketing KPI Cards */}
      {hubTab === 'marketing' && (
        <div className="px-4 py-4 bg-slate-800 border-b border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={14} className="text-slate-400" />
                <p className="text-xs text-slate-400 uppercase font-semibold">Categories Tracked</p>
              </div>
              <p className="text-2xl font-bold text-white">36</p>
            </div>
            <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-emerald-400" />
                <p className="text-xs text-emerald-400 uppercase font-semibold">Rising Categories</p>
              </div>
              <p className="text-2xl font-bold text-emerald-400">7 <span className="text-sm">(+ demand)</span></p>
            </div>
            <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-amber-400" />
                <p className="text-xs text-amber-400 uppercase font-semibold">High-Risk Products</p>
              </div>
              <p className="text-2xl font-bold text-amber-400">4</p>
            </div>
          </div>
        </div>
      )}

      {/* Marketing — Fuzzy Logic (market-intelligence lens) */}
      {hubTab === 'marketing' && <FuzzyLogicSection lens="marketing" />}

      {/* Marketing — Market Moves Monitor */}
      {hubTab === 'marketing' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f7f4e8]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Market Moves Monitor · مراقبة حركة السوق</h2>
              <p className="text-sm text-slate-600">What's in high demand, what's slowing, where orders concentrate, and which products carry risk — uploaded to Mezzanine Capital.</p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <Megaphone size={14} className="text-pink-400" />
                <p className="text-xs font-bold text-white">Market Moves → uploaded to Mezzanine Capital</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] uppercase text-slate-500 border-b border-slate-800">
                      <th className="px-3 py-2 font-semibold">Category</th>
                      <th className="px-3 py-2 font-semibold">Demand</th>
                      <th className="px-3 py-2 font-semibold">Orders 30d</th>
                      <th className="px-3 py-2 font-semibold">Search</th>
                      <th className="px-3 py-2 font-semibold">Returns</th>
                      <th className="px-3 py-2 font-semibold">Risk</th>
                      <th className="px-3 py-2 font-semibold">Signal to Capital</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MARKET_MOVES.map((m) => (
                      <tr key={m.cat} className="border-b border-slate-800/60 last:border-0">
                        <td className="px-3 py-2">
                          <p className="text-[11px] font-bold text-white leading-tight">{m.cat}</p>
                          <p className="text-[9px] text-slate-500">{m.ar}</p>
                        </td>
                        <td className={`px-3 py-2 text-[11px] font-bold whitespace-nowrap ${m.dir === 'up' ? 'text-emerald-400' : m.dir === 'down' ? 'text-red-400' : 'text-slate-400'}`}>{m.trend}</td>
                        <td className="px-3 py-2 text-[11px] text-slate-300">{m.orders}</td>
                        <td className="px-3 py-2 text-[10px] text-slate-400">{m.search}</td>
                        <td className="px-3 py-2 text-[11px] text-slate-300">{m.ret}</td>
                        <td className="px-3 py-2">
                          <span className={`text-[9px] font-bold rounded-full px-2 py-0.5 border ${m.risk === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-800/50' : m.risk === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-800/50' : 'bg-red-500/10 text-red-400 border-red-800/50'}`}>{m.risk}</span>
                        </td>
                        <td className="px-3 py-2 text-[10px] text-[#56afb6] font-medium whitespace-nowrap">{m.signal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                  <Megaphone size={20} className="text-pink-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">How Mezzanine Marketing feeds Capital</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Marketing turns raw marketplace activity into a demand-and-risk map: rising categories with low returns become green signals that let
                    Mezzanine Capital widen credit appetite; volatile, high-return products become red signals that tighten tenor and cap exposure.
                    Capital then hands the updated standard and policy to Tech, Finance and Investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {hubTab === 'investment-portfolios' && (
        <div className="px-4 py-4 bg-slate-800 border-b border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase size={14} className="text-slate-400" />
                <p className="text-xs text-slate-400 uppercase font-semibold">Total Securitized Assets</p>
              </div>
              <p className="text-2xl font-bold text-white">15.2M <span className="text-sm text-slate-400">SAR</span></p>
            </div>
            <div className="bg-[#56afb6]/10 rounded-xl p-3 border border-[#56afb6]/30">
              <div className="flex items-center gap-2 mb-1">
                <Users size={14} className="text-[#56afb6]" />
                <p className="text-xs text-[#56afb6] uppercase font-semibold">Active Institutional Investors</p>
              </div>
              <p className="text-2xl font-bold text-[#56afb6]">8 <span className="text-sm text-slate-400">(Banks, Govt Funds)</span></p>
            </div>
            <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-emerald-400" />
                <p className="text-xs text-emerald-400 uppercase font-semibold">Average Yield</p>
              </div>
              <p className="text-2xl font-bold text-emerald-400">8.5%</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Fuzzy Logic — per-company lenses ── */}
      {hubTab === 'investment-portfolios' && <FuzzyLogicSection lens="investment" />}
      {hubTab === 'credit-risk' && <FuzzyLogicSection lens="finance" />}

      {/* ── Credit Portfolio ── */}
      {hubTab === 'credit-risk' && (
        <div className="bg-slate-950 border-b border-slate-700 px-4 py-5">
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
                <button key={s.tab} onClick={() => setCreditPortfolioTab(creditPortfolioTab === s.tab ? 'all' : s.tab)}
                  className={`rounded-xl border p-3 text-center transition-all ${s.bg} ${creditPortfolioTab === s.tab ? 'ring-1 ring-white/20' : 'opacity-70 hover:opacity-100'}`}>
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
                <button key={t.id} onClick={() => setCreditPortfolioTab(t.id)}
                  className={`flex-shrink-0 sm:flex-1 py-2 px-3 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap ${
                    creditPortfolioTab === t.id
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
                .filter(c => creditPortfolioTab === 'all' || c.status === creditPortfolioTab)
                .map((c) => {
                  const isOpen = !!expandedCreditCards[c.id];
                  const eclColor = c.ecl < 2 ? 'text-emerald-400' : c.ecl < 4 ? 'text-amber-400' : 'text-red-400';
                  const idxColor = c.mezzanineIndex >= 700 ? 'text-emerald-400' : c.mezzanineIndex >= 580 ? 'text-amber-400' : 'text-red-400';
                  const disbursed = c.status === 'active' ? c.disbursements.filter(d => d.disbStatus === 'Disbursed').length : 0;
                  const totalDisb = c.status === 'active' ? c.disbursements.length : 0;
                  const disbPct = totalDisb > 0 ? Math.round((disbursed / totalDisb) * 100) : 0;
                  const statusMeta = {
                    active:    { label: `Active · ${disbursed}/${totalDisb} disbursed`, bg: c.ecl >= 4 ? 'bg-amber-500/10 text-amber-400 border-amber-800/50' : 'bg-[#56afb6]/10 text-[#56afb6] border-[#56afb6]/30', row: c.ecl >= 4 ? 'border-amber-900/30' : 'border-[#56afb6]/15' },
                    collected: { label: 'Collected ✓', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/50', row: 'border-emerald-900/20' },
                    rejected:  { label: 'Rejected ✗', bg: 'bg-red-500/10 text-red-400 border-red-800/50', row: 'border-red-900/20' },
                  }[c.status];

                  return (
                    <div key={c.id} className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${statusMeta.row}`}>
                      {/* Row — always visible */}
                      <button className="w-full text-left" onClick={() => toggleCreditCard(c.id)}>
                        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3">
                          {/* Icon */}
                          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                            <Building2 size={14} className="text-slate-400" />
                          </div>
                          {/* Name */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white leading-tight truncate">{c.company}</p>
                            <p className="text-[9px] text-slate-500 truncate">{c.sector} · {c.region}</p>
                          </div>
                          {/* Amount */}
                          <div className="text-right flex-shrink-0 hidden sm:block">
                            <p className="text-sm font-bold text-white">{(c.amount / 1000).toFixed(0)}K</p>
                            <p className="text-[9px] text-slate-600">SAR</p>
                          </div>
                          {/* ECL */}
                          <div className="text-right flex-shrink-0 hidden md:block w-12">
                            <p className={`text-xs font-bold ${eclColor}`}>{c.ecl}%</p>
                            <p className="text-[8px] text-slate-600">ECL</p>
                          </div>
                          {/* Status badge */}
                          <span className={`text-[9px] font-bold border rounded-full px-2 py-0.5 flex-shrink-0 whitespace-nowrap hidden xs:inline sm:inline ${statusMeta.bg}`}>{statusMeta.label}</span>
                          {/* Progress bar (active only) */}
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

                      {/* Expanded panel */}
                      {isOpen && (
                        <div className="border-t border-slate-800 px-4 pb-4 pt-3 bg-slate-900/60">

                          {/* ── ACTIVE: disbursements + per-tranche شروط ── */}
                          {c.status === 'active' && (
                            <div>
                              {/* Summary strip */}
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

                              {/* Disbursement tranches */}
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
                                      {/* Tranche header */}
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
                                      {/* Conditions */}
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
                                      {/* Locked placeholder */}
                                      {d.disbStatus === 'Locked' && (
                                        <div className="px-3 py-2 text-center">
                                          <p className="text-[8px] text-slate-600 italic">🔒 Locked — unlock after previous tranche is disbursed</p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* ── COLLECTED: completion summary ── */}
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
                })}
            </div>

          </div>
        </div>
      )}


      {/* Main Content - Master-Detail Pattern */}
      {hubTab === 'credit-risk' && (
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 md:grid-cols-3">
          {/* Queue List - Hidden on mobile when request selected */}
          <aside className={`${selectedRequest ? 'hidden md:block' : 'block'} bg-slate-900 overflow-y-auto`}>
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-slate-700">
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 min-w-[45%] px-3 py-3 text-xs font-semibold uppercase ${
                  activeTab === 'manual'
                    ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400'
                    : 'text-slate-500'
                }`}
              >
                Pending Review
              </button>
              <button
                onClick={() => setActiveTab('auto')}
                className={`flex-1 min-w-[45%] px-3 py-3 text-xs font-semibold uppercase ${
                  activeTab === 'auto'
                    ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                Auto-Approved
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex-1 min-w-[45%] px-3 py-3 text-xs font-semibold uppercase ${
                  activeTab === 'progress'
                    ? 'bg-[#56afb6]/10 text-[#56afb6] border-b-2 border-[#56afb6]'
                    : 'text-slate-500'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`flex-1 min-w-[45%] px-3 py-3 text-xs font-semibold uppercase ${
                  activeTab === 'rejected'
                    ? 'bg-red-500/10 text-red-400 border-b-2 border-red-400'
                    : 'text-slate-500'
                }`}
              >
                Auto-Rejected
              </button>
            </div>

            {/* List */}
            <div className="p-3 space-y-2">
              {currentList.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleSelectRequest(app)}
                  className={`w-full text-left rounded-xl p-3 border transition-all ${
                    selectedRequest?.id === app.id
                      ? 'bg-[#56afb6]/15 border-[#56afb6]/50'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={16} className="text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{app.company}</p>
                      <p className="text-xs text-slate-500">{app.amount.toLocaleString()} SAR</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    app.type === 'auto'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : app.type === 'rejected'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : app.type === 'progress'
                      ? 'bg-[#56afb6]/10 text-[#56afb6] border border-[#56afb6]/30'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {app.status}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Details Panel - Hidden on mobile when no request selected */}
          <main className={`${selectedRequest ? 'block' : 'hidden md:block'} md:col-span-2 bg-[#f7f4e8] overflow-y-auto`}>
            {selectedRequest ? (
              <div className="flex flex-col h-full">
                {/* Mobile Back Button */}
                <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-10">
                  <button
                    onClick={handleBackToList}
                    className="flex items-center gap-2 text-slate-600 hover:text-[#56afb6] font-medium"
                  >
                    <ArrowLeft size={18} />
                    <span>Back to List</span>
                  </button>
                </div>

                <div className="flex-1 p-4 md:p-6 space-y-4 pb-32">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center">
                        <Building2 size={18} className="text-[#56afb6]" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900">{selectedRequest.company}</h2>
                    </div>
                    <p className="text-sm text-slate-600">
                      Credit Request: <span className="font-semibold">{selectedRequest.amount.toLocaleString()} SAR</span> for {selectedRequest.purpose}
                    </p>
                    {selectedRequest.companySummary && (
                      <p className="text-xs text-slate-500 mt-1">{selectedRequest.companySummary}</p>
                    )}
                  </div>

                  {/* AI Alert for Manual Review */}
                  {!isReadOnly && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-amber-900">⚠️ AI Confidence: {selectedRequest.aiConfidence}%</p>
                        <p className="text-xs text-amber-700">Reason: {selectedRequest.reason}. Human override required.</p>
                      </div>
                    </div>
                  )}

                  {/* AI Verdict */}
                  <div className={`rounded-2xl border p-4 ${
                    isAutoApproved ? 'bg-emerald-50 border-emerald-200' : isAutoRejected ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield size={16} className={isAutoApproved ? 'text-emerald-600' : isAutoRejected ? 'text-red-600' : 'text-amber-600'} />
                      <span className="text-xs font-bold text-slate-700 uppercase">Torbiona AI Verdict</span>
                      {isReadOnly && (
                        <span className={`ml-auto text-xs px-2 py-1 rounded-full font-semibold ${
                          isAutoApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          STP Executed
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white/60 rounded-xl p-3 border border-white/80">
                        <p className="text-xs text-slate-500 uppercase mb-1">ECL Score</p>
                        <p className={`text-2xl font-bold ${isAutoApproved ? 'text-emerald-600' : isAutoRejected ? 'text-red-600' : 'text-amber-600'}`}>
                          {selectedRequest.ecl}%
                        </p>
                      </div>
                      <div className="bg-white/60 rounded-xl p-3 border border-white/80 sm:col-span-2">
                        <p className="text-xs text-slate-500 uppercase mb-1">Recommendation</p>
                        <p className={`text-lg font-bold ${isAutoApproved ? 'text-emerald-700' : isAutoRejected ? 'text-red-700' : 'text-amber-700'}`}>
                          {isAutoApproved ? '✅ AUTO-APPROVED' : isAutoRejected ? '❌ AUTO-REJECTED' : '⚠️ MANUAL REVIEW'}
                        </p>
                        {isAutoApproved && (
                          <p className="text-xs text-emerald-600 mt-1">Approved at: {selectedRequest.approvedAt}</p>
                        )}
                        {isAutoRejected && (
                          <p className="text-xs text-red-600 mt-1">Rejected at: {selectedRequest.rejectedAt} — {selectedRequest.reason}</p>
                        )}
                        <p className="text-xs text-slate-600 mt-1">
                          Limit: <span className="font-bold">{selectedRequest.recommendedLimit.toLocaleString()} SAR</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Data Sources</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Gov API */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">Gov API</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Status</span>
                            <span className="font-semibold text-emerald-600">{selectedRequest.govApi.status}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Age</span>
                            <span className="font-semibold">{selectedRequest.govApi.age}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Compliance</span>
                            <span className={`font-semibold ${
                              selectedRequest.govApi.compliance === 'Verified' ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              {selectedRequest.govApi.compliance}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ERP */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Database size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">ERP</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">CCC</span>
                            <span className={`font-semibold ${
                              selectedRequest.erp.ccc.includes('improved') ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                              {selectedRequest.erp.ccc}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Invoices</span>
                            <span className="font-semibold">{selectedRequest.erp.invoices}</span>
                          </div>
                        </div>
                      </div>

                      {/* Platform */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">Platform</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">POs</span>
                            <span className="font-semibold text-[#56afb6]">{selectedRequest.platform.pos}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Rating</span>
                            <span className="font-semibold">{selectedRequest.platform.rating}/5</span>
                          </div>
                        </div>
                      </div>

                      {/* Bureau */}
                      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard size={14} className="text-[#56afb6]" />
                          <span className="text-xs font-bold text-slate-500 uppercase">Credit Bureau</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Defaults</span>
                            <span className={`font-semibold ${
                              selectedRequest.bureau.defaults === 0 ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                              {selectedRequest.bureau.defaults === 0 ? 'None' : selectedRequest.bureau.defaults}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">History</span>
                            <span className="font-semibold text-xs">{selectedRequest.bureau.history}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Underwriting Inputs (5Cs, Financials, Cash Flows) */}
                  {selectedRequest.structuring && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-3">Mezzanine Finance Inputs</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Financial Statements</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.financials}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckSquare size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">5Cs Assessment</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.fiveCs}</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Percent size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Mezzanine Index</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.mezzanineIndex} / 1000</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={14} className="text-[#56afb6]" />
                            <span className="text-xs font-bold text-slate-500 uppercase">Expected Cash Flows</span>
                          </div>
                          <p className="text-xs text-slate-700">{selectedRequest.expectedCashFlows}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Structuring Result */}
                  {selectedRequest.structuring && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase mb-3">Structuring Result</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><DollarSign size={12} className="text-emerald-600" /><span className="text-xs text-emerald-700 uppercase font-semibold">Capacity</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.capacity}</p>
                        </div>
                        <div className="bg-[#56afb6]/10 border border-[#56afb6]/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Clock size={12} className="text-[#56afb6]" /><span className="text-xs text-[#56afb6] uppercase font-semibold">Duration</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.duration}</p>
                        </div>
                        <div className="bg-[#56afb6]/10 border border-[#56afb6]/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Percent size={12} className="text-[#56afb6]" /><span className="text-xs text-[#56afb6] uppercase font-semibold">Pricing</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.pricing}</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Lock size={12} className="text-amber-600" /><span className="text-xs text-amber-700 uppercase font-semibold">Reserve Ratio</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.reserveRatio}</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><ClipboardCheck size={12} className="text-amber-600" /><span className="text-xs text-amber-700 uppercase font-semibold">Disbursement</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.disbursementTerms}</p>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                          <div className="flex items-center gap-1 mb-1"><Eye size={12} className="text-amber-600" /><span className="text-xs text-amber-700 uppercase font-semibold">Monitoring</span></div>
                          <p className="text-sm font-bold text-slate-900">{selectedRequest.structuring.controlPlan}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Control & Monitoring */}
                  {selectedRequest.monitoring && (
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                        <p className="text-xs font-bold text-slate-400 uppercase">Control & Monitoring</p>
                        <p className="text-xs text-slate-400">التحكم والمراقبة (ميزانين المالية)</p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Control & Monitoring Plan */}
                        <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-4 sm:p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Lock size={16} className="text-[#56afb6]" />
                            <p className="text-sm font-bold text-slate-700">Disbursement Plan</p>
                          </div>
                          <div className="space-y-2">
                            {[
                              ['Amount per Disbursement', 'مبلغ كل دفعة', selectedRequest.monitoring.amountPerDisbursement],
                              ['Disbursement Conditions', 'شروط الصرف', selectedRequest.monitoring.disbursementConditions],
                              ['Beneficiary', 'المستفيد', selectedRequest.monitoring.beneficiary],
                              ['Required Documents', 'المستندات المطلوبة', selectedRequest.monitoring.requiredDocuments],
                              ['Suspension & Hold Rules', 'قواعد التعليق والإيقاف', selectedRequest.monitoring.suspensionRules],
                              ['Reserve Ratio', 'نسبة الاحتياطي', selectedRequest.monitoring.reserveRatio],
                              ['Repayment Schedule', 'جدول السداد', selectedRequest.monitoring.repaymentSchedule],
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

                        {/* Mezzanine Tech Automation */}
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
                  )}
                </div>

                {/* Action Bar - Sticky Bottom */}
                <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-3">
                  {isReadOnly ? (
                    <div className="space-y-2">
                      <div className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold border ${
                        isAutoApproved
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {isAutoApproved ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        {isAutoApproved ? '✅ Auto-Approved by Torbiona AI' : '❌ Auto-Rejected by Torbiona AI'}
                      </div>
                      <button className="w-full py-2 bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 flex items-center justify-center gap-2">
                        <Download size={16} />
                        Download Audit Trail
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase">Financier's Decision</label>
                        <span className="text-xs text-slate-400">قرار الممول</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {decisionOptions.map(({ id, icon: Icon, label, labelAr, accent }) => {
                          const isActive = decision === id;
                          return (
                            <button
                              key={id}
                              onClick={() => setDecision(id)}
                              className={`text-left rounded-xl p-2 border-2 transition-all ${
                                isActive ? decisionAccent[accent] : 'bg-white/60 border-slate-200 text-slate-400 hover:border-slate-300'
                              }`}
                            >
                              <Icon size={14} className="mb-1" />
                              <p className={`text-[11px] font-bold leading-tight ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>{label}</p>
                              <p className="text-[10px]">{labelAr}</p>
                            </button>
                          );
                        })}
                      </div>

                      {(decision === 'approve' || decision === 'conditional' || decision === 'amend') && (
                        <div className="flex flex-col md:w-48">
                          <label className="text-xs text-slate-500 font-medium mb-1">Credit Limit (SAR)</label>
                          <input
                            type="number"
                            value={creditLimit}
                            onChange={(e) => setCreditLimit(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:border-[#56afb6] focus:ring-2 focus:ring-[#56afb6]/20 outline-none"
                          />
                        </div>
                      )}

                      <button className={`w-full py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${
                        decision === 'reject' ? 'from-red-500 to-red-600' : 'from-[#56afb6] to-teal-500'
                      }`}>
                        Confirm {decisionOptions.find((d) => d.id === decision)?.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex h-full items-center justify-center p-6">
                <div className="text-center text-slate-400">
                  <Shield size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Select a request to view details</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      )}

      {/* Investment & Sukuk Portfolios Content */}
      {hubTab === 'investment-portfolios' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f7f4e8]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Sukuk Pool Builder · منشئ مجمعات الصكوك</h2>
              <p className="text-sm text-slate-600">Drag approved companies into pools, then issue as Sharia-compliant Sukuk for institutional investors</p>
            </div>

            {/* ── Drag & Drop Layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 min-h-[520px]">

              {/* Companies Panel */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-xs font-bold text-[#56afb6] uppercase tracking-wide mb-1">Available Companies</p>
                  <p className="text-[9px] text-slate-500">Drag into a pool →</p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                  {REGISTERED_COMPANIES.map((co) => {
                    const used = usedCompanyIds.has(co.id);
                    return (
                      <div
                        key={co.id}
                        draggable={!used}
                        onDragStart={() => !used && handleDragStart(co)}
                        className={`rounded-xl border px-3 py-2 transition-all select-none ${
                          used
                            ? 'border-slate-800 bg-slate-800/30 opacity-40 cursor-not-allowed'
                            : 'border-slate-700 bg-slate-800/60 cursor-grab hover:border-[#56afb6]/50 hover:bg-slate-700/60 active:cursor-grabbing'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#56afb6]/20 flex items-center justify-center flex-shrink-0">
                            <Building2 size={11} className="text-[#56afb6]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-white truncate">{co.name}</p>
                            <p className="text-[9px] text-slate-500">{co.sector} · {co.region}</p>
                          </div>
                          <span className={`text-[8px] font-bold flex-shrink-0 ${co.mezzanineIndex >= 700 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {co.mezzanineIndex}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Add new pool */}
                <div className="p-3 border-t border-slate-700 space-y-2">
                  <p className="text-[9px] text-slate-500 uppercase font-semibold">Create New Pool</p>
                  <div className="flex gap-1">
                    <input
                      value={newPoolName}
                      onChange={(e) => setNewPoolName(e.target.value)}
                      placeholder="Pool name…"
                      className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-[10px] text-white placeholder-slate-600 outline-none focus:border-[#56afb6]"
                    />
                    <button onClick={addNewPool} className="px-2 py-1.5 bg-[#56afb6] rounded-lg text-white text-[10px] font-bold hover:bg-teal-400 transition-colors">+</button>
                  </div>
                </div>
              </div>

              {/* Pools */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                {portfolios.map((pool) => {
                  const dropped = droppedInPool(pool.id);
                  const isOver  = dragOver === pool.id;
                  return (
                    <div
                      key={pool.id}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(pool.id); }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={() => handleDrop(pool.id)}
                      className={`rounded-2xl border-2 flex flex-col transition-all duration-200 ${
                        isOver
                          ? 'border-[#56afb6] bg-[#56afb6]/5 scale-[1.01] shadow-xl shadow-teal-900/20'
                          : pool.issued
                          ? 'border-emerald-700/40 bg-slate-900'
                          : pool.status === 'building'
                          ? 'border-dashed border-slate-600 bg-slate-900/60'
                          : 'border-amber-700/30 bg-slate-900'
                      }`}
                    >
                      {/* Pool header */}
                      <div className={`px-4 py-3 border-b flex items-center justify-between gap-2 ${isOver ? 'border-[#56afb6]/30' : 'border-slate-700/60'}`}>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{pool.name}</p>
                          <p className="text-[9px] text-slate-500">{pool.companies} companies</p>
                        </div>
                        {pool.issued
                          ? <span className="text-[8px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full px-1.5 py-0.5 flex-shrink-0">✅ Issued</span>
                          : pool.status === 'building'
                          ? <span className="text-[8px] font-bold bg-slate-700 text-slate-500 rounded-full px-1.5 py-0.5 flex-shrink-0">Building</span>
                          : <span className="text-[8px] font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full px-1.5 py-0.5 flex-shrink-0">⚡ Ready</span>
                        }
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 p-3">
                        <div className="bg-slate-800/60 rounded-xl p-2 text-center">
                          <p className="text-[8px] text-slate-500 mb-0.5">Value</p>
                          <p className="text-xs font-bold text-white">{(pool.value / 1_000_000).toFixed(1)}M</p>
                          <p className="text-[8px] text-slate-600">SAR</p>
                        </div>
                        <div className="bg-slate-800/60 rounded-xl p-2 text-center">
                          <p className="text-[8px] text-slate-500 mb-0.5">Avg ECL</p>
                          <p className={`text-xs font-bold ${pool.ecl < 1.5 ? 'text-emerald-400' : pool.ecl === 0 ? 'text-slate-500' : 'text-amber-400'}`}>
                            {pool.ecl > 0 ? `${pool.ecl.toFixed(1)}%` : '—'}
                          </p>
                        </div>
                      </div>

                      {/* Drop zone + dropped companies */}
                      <div
                        className={`flex-1 mx-3 mb-3 rounded-xl border-2 border-dashed p-2 min-h-[100px] transition-colors ${
                          isOver ? 'border-[#56afb6] bg-[#56afb6]/10' : 'border-slate-700'
                        }`}
                      >
                        {dropped.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center gap-1 text-slate-700">
                            <p className="text-[9px]">{isOver ? '📥 Drop here' : 'Drop companies here'}</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {dropped.map((co) => (
                              <div key={co.id} className="flex items-center justify-between gap-1 bg-slate-800/80 rounded-lg px-2 py-1">
                                <p className="text-[9px] text-white truncate">{co.name}</p>
                                <button onClick={() => removeFromPool(pool.id, co.id)} className="text-slate-600 hover:text-red-400 flex-shrink-0 transition-colors">
                                  <X size={10} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Investor row */}
                      {pool.issued && pool.investor && (
                        <div className="mx-3 mb-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          <div>
                            <p className="text-[8px] text-emerald-600 font-semibold">Active Investor</p>
                            <p className="text-[10px] font-bold text-emerald-400">{pool.investor}</p>
                          </div>
                        </div>
                      )}

                      {/* Issue button */}
                      <div className="px-3 pb-3">
                        <button
                          onClick={() => {
                            if (!pool.issued) {
                              setPortfolios((pp) => pp.map((p) =>
                                p.id === pool.id ? { ...p, issued: true, status: 'active', investor: 'Pending Settlement' } : p
                              ));
                            }
                          }}
                          disabled={pool.issued}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            pool.issued
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                              : 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white hover:shadow-lg'
                          }`}
                        >
                          {pool.issued ? <><CheckCircle2 size={13} /> Sukuk Issued</> : <><TrendingUp size={13} /> Issue Sukuk</>}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 hidden">Regional Securitization Pools</h2>
            </div>

            <div className="mb-6">
              <AdminIdentityBanner
                company="Mezzanine Investment"
                companyAr="ميزانين للاستثمار"
                role="Capital Markets & Securitization Administrator"
                description="Bundles credit portfolios already approved by Mezzanine Finance into regional pools and issues them as Sharia-compliant Sukuk instruments to institutional investors."
                manages={[
                  'Regional securitization pools',
                  'Sukuk issuance & listing',
                  'Institutional investor relationships',
                  'Portfolio yield & ECL oversight',
                ]}
                gradient="from-purple-500 to-purple-700"
                Icon={Briefcase}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#56afb6] to-teal-500 flex items-center justify-center">
                        <Briefcase size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{portfolio.name}</h3>
                        <p className="text-xs text-slate-500">{portfolio.companies} Active Companies</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Portfolio Value</p>
                      <p className="text-2xl font-bold text-slate-900">{(portfolio.value / 1000000).toFixed(1)}M <span className="text-sm text-slate-500">SAR</span></p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Avg ECL (Risk)</p>
                        <p className={`text-lg font-bold ${
                          portfolio.ecl < 1.5 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>{portfolio.ecl}%</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Companies</p>
                        <p className="text-lg font-bold text-[#56afb6]">{portfolio.companies}</p>
                      </div>
                    </div>

                    {portfolio.status === 'active' && portfolio.investor && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                        <p className="text-xs text-emerald-700 font-semibold mb-1">✓ Active Investor</p>
                        <p className="text-sm font-bold text-emerald-900">{portfolio.investor}</p>
                      </div>
                    )}

                    {portfolio.status === 'ready' && (
                      <div className="bg-[#56afb6]/10 border border-[#56afb6]/30 rounded-xl p-3">
                        <p className="text-xs text-[#56afb6] font-semibold">⚡ Ready for Issuance</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (!portfolio.issued) {
                        setPortfolios(portfolios.map(p => 
                          p.id === portfolio.id 
                            ? { ...p, issued: true, status: 'active', investor: 'Pending Settlement' }
                            : p
                        ));
                      }
                    }}
                    disabled={portfolio.issued}
                    className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      portfolio.issued
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#56afb6] to-teal-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {portfolio.issued ? (
                      <>
                        <CheckCircle2 size={16} />
                        ✅ Sukuk Issued & Listed
                      </>
                    ) : (
                      <>
                        <TrendingUp size={16} />
                        Issue Sukuk (Securitize)
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Info Panel */}
            <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#56afb6]/20 border border-[#56afb6]/30 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-[#56afb6]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">How Mezzanine Securitization Works</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Mezzanine bundles vetted B2B credit portfolios (approved by Torbiona AI) into regional pools. 
                    These pools are then securitized into Sharia-compliant Sukuk instruments and offered to institutional investors 
                    (banks, sovereign wealth funds, pension funds). This creates liquidity for SME lending while offering 
                    institutional-grade fixed-income products with 8-9% yields backed by diversified trade receivables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

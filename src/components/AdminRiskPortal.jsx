import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Shield, CheckCircle2, AlertTriangle, Building2,
  Database, Activity, CreditCard, Download, Zap, Clock, TrendingUp, Users, Briefcase,
  LayoutDashboard, Network, Bell, Percent, ArrowUpRight, FileText, CheckSquare,
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

export const AdminRiskPortal = () => {
  const { setCurrentView } = useApp();
  const [hubTab, setHubTab] = useState('operations');
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companySearch, setCompanySearch] = useState('');
  const [expandedSections, setExpandedSections] = useState({ team: true, financing: false, orders: false, contracts: false, relationships: false, risk: false });
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
            <p className="text-xs text-slate-400 mt-0.5 ml-6">Mezzanine Tech · Mezzanine Finance · Mezzanine Investment</p>
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

      {/* ── Fuzzy Logic Panel ── */}
      {hubTab === 'credit-risk' && (
        <div className="bg-slate-950 border-b border-slate-700 px-4 py-5">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              {/* ── Column 1: Sectors that got credit & succeeded ── */}
              <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Confirmed Zone · المنطقة المؤكدة</p>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { sector: 'Construction', ar: 'الإنشاءات', companies: 45, ecl: 1.1, success: 96, volume: '22.4M', color: 'emerald' },
                    { sector: 'Trading',      ar: 'التجارة',   companies: 22, ecl: 1.4, success: 91, volume: '9.8M',  color: 'emerald' },
                    { sector: 'Manufacturing',ar: 'التصنيع',   companies: 12, ecl: 2.1, success: 82, volume: '6.1M',  color: 'teal'    },
                    { sector: 'Logistics',    ar: 'اللوجستيات',companies:  8, ecl: 2.4, success: 78, volume: '3.2M',  color: 'teal'    },
                  ].map((s) => {
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

              {/* ── Column 2: Fuzzy Zone Visual — ENHANCED ── */}
              <div className="bg-slate-900 rounded-2xl border border-purple-900/60 overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-purple-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-wide">Fuzzy Zone · مساحة ضبابية</p>
                  </div>
                  <span className="text-[9px] text-slate-600 italic">AI radial targeting map</span>
                </div>

                <div className="flex-1 flex flex-col p-3 gap-3">
                  {/* SVG radial map */}
                  <div className="flex items-center justify-center">
                    <svg viewBox="0 0 300 280" className="w-full max-w-[280px]">
                      <defs>
                        {/* Fuzzy blur filter */}
                        <filter id="fz-blur" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="3.5" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        {/* Glow for confirmed dots */}
                        <filter id="fz-glow">
                          <feGaussianBlur stdDeviation="2.5" result="glow" />
                          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                        {/* Radial gradients */}
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

                      {/* ── Outer unknown ring ── */}
                      <circle cx="150" cy="138" r="128" fill="url(#fz-outer)" stroke="#1e293b" strokeWidth="1" />
                      <text x="150" y="15"  textAnchor="middle" fill="#334155" fontSize="7.5" fontWeight="600" letterSpacing="2">UNKNOWN · مجهول</text>

                      {/* Unknown scatter dots */}
                      {[[55,40],[250,35],[268,140],[240,235],[60,235],[22,130],[150,20]].map(([x,y],i) => (
                        <circle key={i} cx={x} cy={y} r="3" fill="#334155" opacity="0.5" />
                      ))}

                      {/* ── Fuzzy zone ring (blurred) ── */}
                      <circle cx="150" cy="138" r="98" fill="url(#fz-fuzzy)" filter="url(#fz-blur)" />
                      <circle cx="150" cy="138" r="98" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
                      {/* Outer fuzzy label */}
                      <text x="150" y="247" textAnchor="middle" fill="#7c3aed" fontSize="7" fontWeight="700" letterSpacing="1" opacity="0.8">FUZZY ZONE · ضبابي</text>

                      {/* ── Confirmed inner zone ── */}
                      <circle cx="150" cy="138" r="62" fill="url(#fz-inner)" stroke="#10b981" strokeWidth="1.2" opacity="0.9" />
                      <text x="150" y="193" textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="700" letterSpacing="1" opacity="0.7">CONFIRMED · مؤكد</text>

                      {/* ── AI brain at center ── */}
                      <circle cx="150" cy="138" r="20" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="1.5" />
                      <circle cx="150" cy="138" r="20" fill="none" stroke="#a855f7" strokeWidth="0.5" opacity="0.4">
                        <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <text x="150" y="135" textAnchor="middle" fill="#c084fc" fontSize="8"  fontWeight="800">AI</text>
                      <text x="150" y="145" textAnchor="middle" fill="#7c3aed" fontSize="6.5" fontWeight="600">ذكاء</text>

                      {/* ── Confirmed sector dots (inner ring) ── */}
                      {/* Construction */}
                      <g filter="url(#fz-glow)">
                        <circle cx="150" cy="85" r="7" fill="#10b981" />
                      </g>
                      <line x1="150" y1="118" x2="150" y2="93"  stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
                      <text x="150" y="76" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontWeight="700">Construction</text>

                      {/* Trading */}
                      <g filter="url(#fz-glow)">
                        <circle cx="203" cy="155" r="7" fill="#10b981" />
                      </g>
                      <line x1="170" y1="143" x2="197" y2="152" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
                      <text x="218" y="158" textAnchor="start" fill="#6ee7b7" fontSize="7" fontWeight="700">Trading</text>

                      {/* Manufacturing */}
                      <g filter="url(#fz-glow)">
                        <circle cx="110" cy="168" r="6" fill="#2dd4bf" />
                      </g>
                      <line x1="133" y1="152" x2="115" y2="163" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
                      <text x="65" y="172" textAnchor="middle" fill="#5eead4" fontSize="6.5" fontWeight="700">Manufact.</text>

                      {/* Logistics — on boundary (amber, entering fuzzy) */}
                      <g filter="url(#fz-glow)">
                        <circle cx="185" cy="96" r="6" fill="#f59e0b" />
                        <circle cx="185" cy="96" r="10" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.3">
                          <animate attributeName="r" values="7;12;7" dur="2.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                      </g>
                      <text x="197" y="94" textAnchor="start" fill="#fbbf24" fontSize="6.5" fontWeight="700">Logistics</text>

                      {/* ── AI prediction arrows from center ── */}
                      <line x1="155" y1="119" x2="160" y2="78"  stroke="#a855f7" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" markerEnd="url(#fz-arrow)" />
                      <line x1="164" y1="128" x2="205" y2="95"  stroke="#a855f7" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" markerEnd="url(#fz-arrow)" />
                      <line x1="138" y1="130" x2="100" y2="106" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" markerEnd="url(#fz-arrow)" />

                      {/* ── Fuzzy zone target dots (pulsing purple) ── */}
                      {/* Target A — Build. Materials */}
                      <circle cx="160" cy="62" r="5.5" fill="#a855f7" opacity="0.85">
                        <animate attributeName="r"       values="5.5;8;5.5" dur="2s"   repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text x="175" y="57" textAnchor="start" fill="#c084fc" fontSize="6.5" fontWeight="700">Bldg. Materials</text>
                      <text x="175" y="66" textAnchor="start" fill="#7c3aed" fontSize="6">مواد البناء</text>

                      {/* Target B — Logistics Freight */}
                      <circle cx="215" cy="88" r="5" fill="#a855f7" opacity="0.8">
                        <animate attributeName="r"       values="5;7.5;5"   dur="2.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.25;0.8" dur="2.8s" repeatCount="indefinite" />
                      </circle>
                      <text x="228" y="83" textAnchor="start" fill="#c084fc" fontSize="6.5" fontWeight="700">Logistics+</text>

                      {/* Target C — Engineering */}
                      <circle cx="98" cy="93" r="4.5" fill="#a855f7" opacity="0.75">
                        <animate attributeName="r"       values="4.5;7;4.5"   dur="3.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.75;0.2;0.75" dur="3.2s" repeatCount="indefinite" />
                      </circle>
                      <text x="50" y="91" textAnchor="middle" fill="#c084fc" fontSize="6.5" fontWeight="700">Engineering</text>
                      <text x="50" y="100" textAnchor="middle" fill="#7c3aed" fontSize="6">هندسة</text>
                    </svg>
                  </div>

                  {/* Stats strip */}
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

              {/* ── Column 3: AI Next Prediction ── */}
              <div className="bg-slate-900 rounded-2xl border border-amber-900/50 overflow-hidden flex flex-col">
                <div className="px-4 py-3 border-b border-amber-900/50 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">AI Next Targets · التوقعات القادمة</p>
                </div>

                <div className="p-4 space-y-3 flex-1">
                  {/* Reasoning */}
                  <div className="bg-purple-950/60 border border-purple-800/40 rounded-xl px-3 py-2.5">
                    <p className="text-[9px] text-purple-400 font-semibold uppercase mb-1">AI Reasoning</p>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      Pattern detected: <span className="text-emerald-400 font-semibold">Construction</span> companies with ECL &lt; 2% and &gt;3 platform POs have a 96% success rate. AI is scanning for companies with <span className="text-purple-300 font-semibold">similar profiles</span> across adjacent sectors.
                    </p>
                  </div>

                  {/* Predicted targets */}
                  {[
                    {
                      rank: 1, sector: 'Construction (Expansion)', ar: 'إنشاءات — توسع',
                      confidence: 94, ecl: '< 1.8%', companies: 18,
                      reason: 'Same sector, similar ECL profile to approved batch',
                      color: 'amber',
                    },
                    {
                      rank: 2, sector: 'Building Materials', ar: 'مواد البناء',
                      confidence: 81, ecl: '< 2.5%', companies: 11,
                      reason: 'Directly supplies approved Construction companies',
                      color: 'purple',
                    },
                    {
                      rank: 3, sector: 'Logistics (Freight)', ar: 'لوجستيات — شحن',
                      confidence: 73, ecl: '< 3%', companies: 7,
                      reason: 'Serves same supply chain as top-performing sectors',
                      color: 'slate',
                    },
                  ].map((t) => {
                    const ring   = { amber: 'ring-amber-700/40 bg-amber-950/40',   purple: 'ring-purple-800/40 bg-purple-950/40', slate: 'ring-slate-700/40 bg-slate-800/60' }[t.color];
                    const badge  = { amber: 'bg-amber-500 text-white',              purple: 'bg-purple-500 text-white',            slate: 'bg-slate-600 text-white'           }[t.color];
                    const conf   = { amber: 'text-amber-400',                       purple: 'text-purple-400',                     slate: 'text-slate-400'                    }[t.color];
                    const bar    = { amber: 'bg-amber-500',                         purple: 'bg-purple-500',                       slate: 'bg-slate-500'                      }[t.color];
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

                {/* Footer */}
                <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/50">
                  <p className="text-[9px] text-slate-600 text-center">Predictions update every 24h · Powered by Torbiona Fuzzy Logic Engine</p>
                </div>
              </div>

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

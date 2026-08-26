import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Search, AlertTriangle, TrendingUp, TrendingDown, Building2,
  Users, Link2, BarChart3, Globe2, ShieldCheck, CheckCircle, XCircle,
  Clock, Star, Layers,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────────────────

const companies = [
  {
    en: 'BuildTech Construction',
    ar: 'بيلدتك للإنشاءات',
    status: 'Approved',
    sector: 'Construction',
    region: 'Riyadh',
    score: 742,
    intangible: '14.3M SAR',
    intangibleNote: 'برامج ERP، علاقات العملاء، قاعدة الموردين',
  },
  {
    en: 'Qassim Heavy Metals',
    ar: 'قصيم للمعادن الثقيلة',
    status: 'Manual Review',
    sector: 'Manufacturing',
    region: 'Qassim',
    score: 612,
    intangible: '7.1M SAR',
    intangibleNote: 'براءات التصنيع، شبكة التوزيع',
  },
  {
    en: 'Al-Noor Trading Co.',
    ar: 'شركة النور للتجارة',
    status: 'Manual Review',
    sector: 'Trading',
    region: 'Jeddah',
    score: 588,
    intangible: '3.8M SAR',
    intangibleNote: 'علاقات العملاء، قنوات التوزيع',
  },
  {
    en: 'Riyadh Steel Works',
    ar: 'أعمال الرياض للصلب',
    status: 'Approved',
    sector: 'Manufacturing',
    region: 'Riyadh',
    score: 798,
    intangible: '21.6M SAR',
    intangibleNote: 'تقنيات إنتاج الصلب، علامة تجارية، عقود طويلة الأمد',
  },
  {
    en: 'Dammam Logistics Hub',
    ar: 'مركز الدمام للخدمات اللوجستية',
    status: 'In Progress',
    sector: 'Logistics',
    region: 'Dammam',
    score: 601,
    intangible: '5.4M SAR',
    intangibleNote: 'نظام إدارة المستودعات، قاعدة شركاء النقل',
  },
  {
    en: 'Hail Textiles Co.',
    ar: 'شركة حائل للنسيج',
    status: 'Rejected',
    sector: 'Manufacturing',
    region: 'Hail',
    score: 412,
    intangible: '1.9M SAR',
    intangibleNote: 'تصاميم وأنماط نسيج مسجلة',
  },
  {
    en: 'Global Materials',
    ar: 'المواد العالمية',
    status: 'Approved',
    sector: 'Trading',
    region: 'Jeddah',
    score: 815,
    intangible: '26.2M SAR',
    intangibleNote: 'شبكة موردين دولية، عقود حصرية، علامة تجارية معتمدة',
  },
  {
    en: 'Safety First Ltd.',
    ar: 'السلامة أولاً المحدودة',
    status: 'Approved',
    sector: 'Trading',
    region: 'Mecca',
    score: 698,
    intangible: '9.2M SAR',
    intangibleNote: 'شهادات السلامة، برامج التدريب، علاقات عملاء حكومية',
  },
];

const statusConfig = {
  Approved: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, dot: 'bg-emerald-500' },
  'Manual Review': { color: 'bg-amber-100 text-amber-700', icon: AlertTriangle, dot: 'bg-amber-500' },
  'In Progress': { color: 'bg-blue-100 text-blue-700', icon: Clock, dot: 'bg-blue-500' },
  Rejected: { color: 'bg-red-100 text-red-700', icon: XCircle, dot: 'bg-red-500' },
};

// ─── Main Component ────────────────────────────────────────────────────────

export const OperationsDashboard = () => {
  const { setCurrentView } = useApp();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = companies.filter(c =>
    !search ||
    c.en.toLowerCase().includes(search.toLowerCase()) ||
    c.ar.includes(search) ||
    c.sector.toLowerCase().includes(search.toLowerCase()) ||
    c.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentView('b2b-platform')}
            className="flex items-center gap-2 text-teal-500 text-sm font-medium hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Marketplace
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Mezzanine Operations Dashboard</h1>
            <p className="text-xs text-slate-500">
              Portfolio-wide view of registered companies, financing eligibility, relationships and risk
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* ── Admin Identity Card ── */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 flex flex-col md:flex-row gap-5 items-start md:items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-xl flex-shrink-0">
            <Layers size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-white text-xl font-bold">Mezzanine Tech</span>
              <span className="text-slate-400 text-base">·</span>
              <span className="text-teal-300 text-base font-medium">ميزانين تك</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">Platform Operations Administrator</p>
            <p className="text-slate-500 text-xs leading-relaxed max-w-2xl">
              Owns the core platform infrastructure — company onboarding, data pipelines, relationship
              mapping, and system-wide risk monitoring across every registered company on Mezzanine.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Registered company directory',
              'Sector / region / size analytics',
              'Relationship & transaction network',
              'Platform alerts & risk indicators',
              'Data integration health (ERP, SIMAH, Gov API)',
            ].map(tag => (
              <span key={tag} className="text-[10px] px-2.5 py-1 bg-white/10 text-slate-300 rounded-full border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── KPI Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Registered Companies', value: '342', sub: 'Active on platform', icon: Building2, color: 'from-teal-400 to-teal-600' },
            { label: 'Eligible for Financing', value: '218', sub: '64% of total', icon: ShieldCheck, color: 'from-emerald-400 to-emerald-600' },
            { label: 'Avg Mezzanine Index', value: '742/1000', sub: 'Creditworthiness score', icon: Star, color: 'from-amber-400 to-amber-600' },
            { label: 'Creditworthiness Growth', value: '+12.4%', sub: 'Year-over-year', icon: TrendingUp, color: 'from-blue-400 to-blue-600' },
            { label: 'Financing Requests Volume', value: '48.6M SAR', sub: 'This quarter', icon: BarChart3, color: 'from-purple-400 to-purple-600' },
            { label: 'Authorized Transactions', value: '1,284', sub: 'This month', icon: CheckCircle, color: 'from-indigo-400 to-indigo-600' },
            { label: 'Mapped Relationships', value: '1,967', sub: 'Supplier & customer links', icon: Link2, color: 'from-pink-400 to-pink-600' },
            { label: 'Projected Q3 Flows', value: '+9.2%', sub: 'Forecast growth', icon: Globe2, color: 'from-orange-400 to-orange-600' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon size={18} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-0.5">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-700 mb-0.5">{stat.label}</p>
                <p className="text-[11px] text-slate-400">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* ── Distribution ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* By Sector */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-teal-500" /> By Sector
            </h3>
            <div className="space-y-2.5">
              {[
                { label: 'Construction', count: 128, max: 128 },
                { label: 'Trading', count: 76, max: 128 },
                { label: 'Manufacturing', count: 58, max: 128 },
                { label: 'Logistics', count: 44, max: 128 },
                { label: 'Other', count: 36, max: 128 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{s.label}</span>
                    <span className="font-semibold text-slate-800">{s.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" style={{ width: `${(s.count / s.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Region */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Globe2 size={16} className="text-blue-500" /> By Region
            </h3>
            <div className="space-y-2.5">
              {[
                { label: 'Riyadh', count: 142, max: 142 },
                { label: 'Jeddah', count: 88, max: 142 },
                { label: 'Dammam', count: 61, max: 142 },
                { label: 'Qassim', count: 33, max: 142 },
                { label: 'Other', count: 18, max: 142 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{s.label}</span>
                    <span className="font-semibold text-slate-800">{s.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: `${(s.count / s.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Size */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users size={16} className="text-purple-500" /> By Size
            </h3>
            <div className="space-y-2.5">
              {[
                { label: 'Small (1–49 employees)', count: 210, max: 210 },
                { label: 'Medium (50–249 employees)', count: 96, max: 210 },
                { label: 'Large (250+ employees)', count: 36, max: 210 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{s.label}</span>
                    <span className="font-semibold text-slate-800">{s.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: `${(s.count / s.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Relationship Network ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-5 text-lg flex items-center gap-2">
            <Link2 size={18} className="text-teal-500" />
            Company, Customer & Supplier Relationships
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Companies', value: '342', color: 'from-teal-400 to-teal-600' },
              { label: 'Customer Links', value: '1,120', color: 'from-blue-400 to-blue-600' },
              { label: 'Supplier Links', value: '847', color: 'from-purple-400 to-purple-600' },
            ].map(item => (
              <div key={item.label} className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-white text-center`}>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs opacity-80 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">1,284</span> authorized financial & operational
            transactions flowing through the mapped network this month.
          </p>
        </div>

        {/* ── Forecast ── */}
        <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-teal-400" />
            Forecast: Future Flows & Relationships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Next Quarter Financing Volume', value: '+9.2%', icon: TrendingUp, color: 'text-emerald-400' },
              { label: 'New Relationships Expected', value: '+184', icon: Link2, color: 'text-blue-400' },
              { label: 'Eligible Companies Growth', value: '+6.8%', icon: TrendingUp, color: 'text-amber-400' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white/10 rounded-xl p-4 flex items-center gap-4">
                  <Icon size={24} className={item.color} />
                  <div>
                    <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Alerts ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-900 mb-4 text-lg flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Alerts & Risk Indicators
          </h3>
          <div className="space-y-3">
            {[
              { text: 'Qassim Heavy Metals — ECL spiked to 4.7%, manual review recommended', type: 'danger' },
              { text: '3 companies approaching 90% credit limit utilization', type: 'warning' },
              { text: 'Al-Noor Trading Co. — new profile, limited bureau history', type: 'warning' },
              { text: 'Riyadh Construction Pool ECL trending down (−0.2pp this month)', type: 'success' },
            ].map((alert, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                  alert.type === 'danger'
                    ? 'bg-red-50 border border-red-100'
                    : alert.type === 'warning'
                    ? 'bg-amber-50 border border-amber-100'
                    : 'bg-emerald-50 border border-emerald-100'
                }`}
              >
                {alert.type === 'success'
                  ? <TrendingDown size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <AlertTriangle size={16} className={`flex-shrink-0 mt-0.5 ${alert.type === 'danger' ? 'text-red-500' : 'text-amber-500'}`} />
                }
                <span className={
                  alert.type === 'danger' ? 'text-red-700' :
                  alert.type === 'warning' ? 'text-amber-700' :
                  'text-emerald-700'
                }>{alert.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Company Registry ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Company Registry</h3>
                <p className="text-xs text-slate-500">{filtered.length} companies</p>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search company, sector, region…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none w-64"
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filtered.map((company, idx) => {
              const cfg = statusConfig[company.status];
              const StatusIcon = cfg.icon;
              const isOpen = expanded === idx;
              return (
                <div key={idx}>
                  <div
                    className="p-5 hover:bg-slate-50 transition-all cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : idx)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Left: name + details */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Building2 size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{company.en}</p>
                          <p className="text-xs text-slate-500 mb-1">{company.ar}</p>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                            <span>{company.sector}</span>
                            <span>·</span>
                            <span>{company.region}</span>
                            <span>·</span>
                            <span className="font-semibold text-teal-600">{company.score}/1000</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: status + intangible badge */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Intangible assets badge */}
                        <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-1.5">
                          <Layers size={12} className="text-indigo-500 flex-shrink-0" />
                          <div>
                            <p className="text-[9px] text-indigo-400 font-medium leading-none mb-0.5">
                              الأصول غير الملموسة
                            </p>
                            <p className="text-[11px] font-bold text-indigo-700">{company.intangible}</p>
                          </div>
                        </div>

                        {/* Status chip */}
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.color}`}>
                          <StatusIcon size={12} />
                          {company.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded — intangible assets breakdown */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0">
                      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                        <p className="text-xs font-bold text-indigo-800 mb-1 flex items-center gap-1.5">
                          <Layers size={13} />
                          الأصول غير الملموسة المُقدَّرة من ميزانين
                        </p>
                        <p className="text-xl font-bold text-indigo-700 mb-1">{company.intangible}</p>
                        <p className="text-xs text-indigo-600">{company.intangibleNote}</p>
                        <p className="text-[10px] text-indigo-400 mt-2">
                          * تقدير تحليلي بناءً على بيانات المنصة — ليس تقييماً رسمياً معتمداً
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

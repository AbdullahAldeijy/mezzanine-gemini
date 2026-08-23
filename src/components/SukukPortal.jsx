import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Star, ArrowRight, X, TrendingUp, Shield,
  Users, BarChart3, AlertTriangle, CheckCircle, FileText,
  Building2, Calendar, Clock,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────── */
const SUKUK = [
  {
    id: 1,
    issueNameAr: 'صكوك بيلدتك للإنشاءات — الإصدار الأول',
    issueNameEn: 'BuildTech Construction Sukuk · Series I',
    status: 'open',
    issuer: 'شركة بيلدتك للإنشاءات',
    sponsor: 'مجمع إنشاءات الرياض',
    arranger: 'ميزانين للأسواق المالية',
    type: 'مرابحة', typeEn: 'Murabaha',
    size: 50_000_000,
    nominalValue: 10_000,
    minSubscription: 100_000,
    duration: 36,
    profitRate: 9.5,
    distribution: 'ربع سنوية',
    offeringStart: '01/02/2024', offeringEnd: '28/02/2024',
    maturityDate: '01/03/2027',
    useOfProceeds: 'تمويل رأس المال العامل المرتبط بعقود قائمة',
    repaymentSource: 'التدفقات التشغيلية وتحصيلات العقود',
    collateral: 'حوالة حقوق التحصيل + كفالة بنكية',
    creditRating: 'A-',
    indicators: { contracts: '75M SAR', revenue: '42M SAR', avgCollection: '45 يومًا', debtCoverage: '2.1x' },
    risks: 'مخاطر الائتمان، التدفقات النقدية، التركُّز والسيولة',
    subscribed: 65,
    sector: 'إنشاءات',
    region: 'الرياض',
  },
  {
    id: 2,
    issueNameAr: 'صكوك مجمع قصيم الصناعي — الإصدار الأول',
    issueNameEn: 'Qassim Industrial Pool Sukuk · Series I',
    status: 'issued',
    issuer: 'مجمع قصيم الصناعي ذات الغرض الخاص',
    sponsor: 'ميزانين للتمويل',
    arranger: 'ميزانين للأسواق المالية',
    type: 'وكالة', typeEn: 'Wakala',
    size: 24_000_000,
    nominalValue: 10_000,
    minSubscription: 100_000,
    duration: 24,
    profitRate: 8.8,
    distribution: 'نصف سنوية',
    offeringStart: '01/10/2023', offeringEnd: '31/10/2023',
    maturityDate: '01/11/2025',
    useOfProceeds: 'تمويل المعدات الصناعية والمواد الخام',
    repaymentSource: 'عائدات المبيعات والعقود الصناعية',
    collateral: 'رهن المعدات + ضمان شركات الأعمال',
    creditRating: 'BBB+',
    indicators: { contracts: '38M SAR', revenue: '28.5M SAR', avgCollection: '52 يومًا', debtCoverage: '1.8x' },
    risks: 'مخاطر الإنتاج، تقلبات أسعار المواد الخام',
    subscribed: 100,
    investor: 'Al Rajhi Bank',
    sector: 'تصنيع',
    region: 'القصيم',
  },
  {
    id: 3,
    issueNameAr: 'صكوك مجمع تجارة جدة — الإصدار الأول',
    issueNameEn: 'Jeddah Trade Pool Sukuk · Series I',
    status: 'open',
    issuer: 'مجمع تجارة جدة ذات الغرض الخاص',
    sponsor: 'ميزانين للتمويل',
    arranger: 'ميزانين للأسواق المالية',
    type: 'إجارة', typeEn: 'Ijara',
    size: 38_000_000,
    nominalValue: 10_000,
    minSubscription: 100_000,
    duration: 36,
    profitRate: 8.5,
    distribution: 'ربع سنوية',
    offeringStart: '15/01/2024', offeringEnd: '15/02/2024',
    maturityDate: '15/02/2027',
    useOfProceeds: 'تمويل المخزون التجاري وعمليات الاستيراد والتصدير',
    repaymentSource: 'تحصيلات التجارة والمديونيات التجارية',
    collateral: 'حوالة المستحقات التجارية + بوليصة تأمين',
    creditRating: 'A',
    indicators: { contracts: '62M SAR', revenue: '51M SAR', avgCollection: '38 يومًا', debtCoverage: '2.4x' },
    risks: 'مخاطر الائتمان التجاري، تقلبات أسعار السلع',
    subscribed: 42,
    sector: 'تجارة',
    region: 'جدة',
  },
];

const STATUS = {
  open:   { ar: 'الاكتتاب مفتوح', pill: 'bg-amber-100 text-amber-700 border border-amber-200'   },
  issued: { ar: 'صادر ومدرج',      pill: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
};

const TYPE_COLOR = {
  'مرابحة': 'bg-amber-50 text-amber-600 border-amber-200',
  'وكالة':  'bg-yellow-50 text-yellow-700 border-yellow-200',
  'إجارة':  'bg-orange-50 text-orange-600 border-orange-200',
};

function fmt(n) {
  return n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(0)}M SAR`
    : `${(n / 1_000).toFixed(0)}K SAR`;
}

/* ─── Detail Modal ──────────────────────────────────────────── */
function DetailModal({ s, onClose }) {
  const Row = ({ label, value, gold }) => (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-slate-500 flex-shrink-0" dir="rtl">{label}</span>
      <span className={`text-sm font-semibold text-right leading-snug ${gold ? 'text-amber-600' : 'text-slate-800'}`} dir="rtl">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 rounded-full px-2.5 py-0.5">طرح خاص لصكوك</span>
              <span className={`text-[10px] font-bold rounded-full px-2.5 py-0.5 ${STATUS[s.status].pill}`}>{STATUS[s.status].ar}</span>
              <span className={`text-[10px] font-bold border rounded-full px-2.5 py-0.5 ${TYPE_COLOR[s.type]}`}>{s.type}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900" dir="rtl">{s.issueNameAr}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{s.issueNameEn}</p>
            <p className="text-xs font-semibold text-amber-500 mt-1">للمستثمرين المؤهلين والمؤسسيين فقط</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"><X size={20} /></button>
        </div>

        <div className="p-4 md:p-6 space-y-5">

          {/* Key stat chips — same style as marketplace product stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
            {[
              { label: 'حجم الإصدار',    value: fmt(s.size)             },
              { label: 'مدة الصكوك',     value: `${s.duration} شهرًا`   },
              { label: 'معدل الربح',     value: `${s.profitRate}% سنويًا`, gold: true },
              { label: 'التوزيعات',      value: s.distribution           },
              { label: 'القيمة الاسمية', value: `${s.nominalValue.toLocaleString()} ريال` },
              { label: 'الحد الأدنى',    value: `${(s.minSubscription/1000).toFixed(0)}K ريال` },
            ].map(({ label, value, gold }) => (
              <div key={label} className={`rounded-xl p-3 text-center border ${gold ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}`}>
                <p className="text-[9px] text-slate-400 mb-1">{label}</p>
                <p className={`text-sm font-bold ${gold ? 'text-amber-600' : 'text-slate-800'}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Parties */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">أطراف الإصدار</p>
            <div className="bg-gray-50 rounded-xl px-4 py-1 divide-y divide-gray-100">
              <Row label="المصدر"  value={s.issuer}   />
              <Row label="الراعي"  value={s.sponsor}  />
              <Row label="المرتب"  value={s.arranger} />
            </div>
          </div>

          {/* Terms */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">شروط الإصدار</p>
            <div className="bg-gray-50 rounded-xl px-4 py-1 divide-y divide-gray-100">
              <Row label="نوع الصكوك"               value={`${s.type} · ${s.typeEn}`}              gold />
              <Row label="حجم الإصدار"              value={`${s.size.toLocaleString()} ريال`}       gold />
              <Row label="الحد الأدنى للاكتتاب"     value={`${s.minSubscription.toLocaleString()} ريال`} />
              <Row label="مدة الصكوك"               value={`${s.duration} شهرًا`}                  gold />
              <Row label="العائد / معدل الربح"      value={`${s.profitRate}% سنويًا`}              gold />
              <Row label="دورية التوزيع"            value={s.distribution}                          />
              <Row label="فترة الطرح"               value={`${s.offeringStart} — ${s.offeringEnd}`} />
              <Row label="تاريخ الاستحقاق المتوقع"  value={s.maturityDate}                          />
              <Row label="التصنيف الائتماني"        value={s.creditRating}                          gold />
            </div>
          </div>

          {/* Structure */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">الهيكل المالي</p>
            <div className="bg-gray-50 rounded-xl px-4 py-1 divide-y divide-gray-100">
              <Row label="استخدام المتحصلات" value={s.useOfProceeds}   />
              <Row label="مصدر السداد"       value={s.repaymentSource} />
              <Row label="الضمانات"          value={s.collateral}       />
            </div>
          </div>

          {/* Indicators */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">مؤشرات مختارة</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['قيمة العقود القائمة', s.indicators.contracts],
                ['الإيرادات',            s.indicators.revenue],
                ['متوسط التحصيل',        s.indicators.avgCollection],
                ['تغطية خدمة الدين',    s.indicators.debtCoverage],
              ].map(([label, value]) => (
                <div key={label} className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                  <p className="text-[9px] text-amber-500 mb-1" dir="rtl">{label}</p>
                  <p className="text-base font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-500 mb-1">أبرز المخاطر</p>
              <p className="text-xs text-red-400 leading-relaxed" dir="rtl">{s.risks}، إضافة إلى المخاطر المبينة تفصيلًا في مستند الطرح.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled={s.status === 'issued'}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all min-h-[48px] ${
                s.status === 'issued'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg hover:shadow-xl hover:shadow-amber-200'
              }`}
            >
              {s.status === 'issued' ? '✅ صادر ومدرج' : 'الاكتتاب في الصك'}
            </button>
            <button onClick={onClose} className="flex-1 py-3.5 border-2 border-gray-200 text-slate-700 rounded-xl font-medium hover:bg-gray-50 transition-all min-h-[48px]">
              إغلاق
            </button>
          </div>

          <p className="text-[9px] text-gray-400 text-center leading-relaxed">
            هذا الطرح موجَّه للمستثمرين المؤهلين والمؤسسيين فقط وفقًا لأنظمة هيئة السوق المالية.<br />
            المرتب: {s.arranger} · مؤسسة سوق مالية مرخصة
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Sukuk Card (same shape as marketplace product card) ───── */
function SukukCard({ s, onOpen }) {
  const st = STATUS[s.status];
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all flex flex-col">
      {/* Card image area — gold gradient banner */}
      <div className="h-36 bg-gradient-to-br from-amber-400 to-amber-700 relative overflow-hidden flex flex-col items-center justify-center gap-1 p-4">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 20px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 20px)' }}
        />
        <Star size={28} className="text-white fill-white drop-shadow relative z-10" />
        <p className="text-white font-bold text-sm text-center leading-tight relative z-10" dir="rtl">{s.issueNameAr.split('—')[0].trim()}</p>
        <span className={`text-[9px] font-bold rounded-full px-2.5 py-0.5 relative z-10 ${
          s.status === 'issued' ? 'bg-emerald-100 text-emerald-700' : 'bg-white/90 text-amber-700'
        }`}>
          {st.ar}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Type + rating */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-bold border rounded-full px-2 py-0.5 ${TYPE_COLOR[s.type]}`}>{s.type} · {s.typeEn}</span>
          <span className="text-[10px] font-bold text-slate-500">تصنيف: <span className="text-amber-600">{s.creditRating}</span></span>
        </div>

        {/* Issue name */}
        <div>
          <p className="text-xs font-bold text-slate-800 leading-snug" dir="rtl">{s.issueNameAr}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{s.issueNameEn}</p>
        </div>

        {/* Key numbers — styled like price in marketplace */}
        <p className="text-2xl font-bold text-amber-500">{s.profitRate}%
          <span className="text-sm text-slate-400 font-normal mr-1"> سنويًا</span>
        </p>

        {/* Stat row */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          {[
            { icon: BarChart3,  label: 'حجم الإصدار',  value: fmt(s.size)          },
            { icon: Clock,      label: 'مدة الصك',      value: `${s.duration} شهرًا` },
            { icon: Calendar,   label: 'التوزيعات',     value: s.distribution       },
            { icon: Building2,  label: 'القطاع',        value: s.sector             },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-1.5 text-slate-500">
              <Icon size={11} className="text-amber-400 flex-shrink-0" />
              <span className="truncate"><span className="text-slate-400">{label}: </span><span className="font-semibold text-slate-700">{value}</span></span>
            </div>
          ))}
        </div>

        {/* Subscription bar */}
        <div>
          <div className="flex justify-between text-[9px] mb-1 text-slate-400">
            <span>نسبة الاكتتاب</span>
            <span className={`font-bold ${s.subscribed === 100 ? 'text-emerald-500' : 'text-amber-500'}`}>{s.subscribed}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${s.subscribed === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`}
              style={{ width: `${s.subscribed}%` }}
            />
          </div>
          {s.investor && <p className="text-[9px] text-emerald-500 font-semibold mt-1">✓ مستثمر نشط: {s.investor}</p>}
        </div>

        {/* للمستثمرين */}
        <p className="text-[9px] text-slate-400 text-center">للمستثمرين المؤهلين والمؤسسيين فقط</p>

        {/* Buttons — same layout as marketplace Buy/RFQ */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onOpen(s)}
            className="flex-1 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-xl text-xs font-bold hover:shadow-md transition-all"
          >
            عرض تفاصيل الإصدار
          </button>
          <button
            disabled={s.status === 'issued'}
            className={`flex-1 py-2.5 border rounded-xl text-xs font-medium transition-all ${
              s.status === 'issued'
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-amber-400 text-amber-500 hover:bg-amber-50'
            }`}
          >
            {s.status === 'issued' ? 'مكتتب بالكامل' : 'اشترك الآن'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Portal ───────────────────────────────────────────── */
export const SukukPortal = () => {
  const { setCurrentView } = useApp();
  const [detail, setDetail] = useState(null);
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [filterType,   setFilterType]   = useState('الكل');

  const statuses = ['الكل', 'الاكتتاب مفتوح', 'صادر ومدرج'];
  const types    = ['الكل', 'مرابحة', 'وكالة', 'إجارة'];

  const filtered = SUKUK.filter((s) => {
    const matchStatus = filterStatus === 'الكل' || STATUS[s.status].ar === filterStatus;
    const matchType   = filterType   === 'الكل' || s.type === filterType;
    return matchStatus && matchType;
  });

  const totalSize = SUKUK.reduce((a, s) => a + s.size, 0);

  return (
    <div className="min-h-screen bg-[#f7f4e8]">

      {/* ── Nav — same structure as marketplace ── */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">

            {/* Left: back + logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('b2b-platform')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  بورتال الصكوك
                </h1>
                <p className="text-[10px] text-slate-400 mt-0.5">Mezzanine Sukuk Market · للمستثمرين المؤهلين فقط</p>
              </div>
            </div>

            {/* Right: KPI chips — desktop only */}
            <div className="hidden md:flex items-center gap-3">
              {[
                { label: 'إجمالي الإصدارات', value: fmt(totalSize), color: 'text-amber-600' },
                { label: 'متوسط العائد',     value: `${(SUKUK.reduce((a,s)=>a+s.profitRate,0)/SUKUK.length).toFixed(1)}%`, color: 'text-amber-600' },
                { label: 'مفتوح للاكتتاب',  value: `${SUKUK.filter(s=>s.status==='open').length} إصدارات`, color: 'text-emerald-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-[9px] text-slate-400">{label}</p>
                  <p className={`text-sm font-bold ${color}`}>{value}</p>
                </div>
              ))}
              <div className="flex items-center gap-1.5 ml-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-400">السوق مفتوح</span>
              </div>
            </div>

            {/* Mobile: market open badge */}
            <div className="flex md:hidden items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400">مفتوح</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile KPI strip */}
      <div className="md:hidden bg-amber-50 border-b border-amber-100 px-4 py-2 flex gap-3 overflow-x-auto">
        {[
          { label: 'إجمالي', value: fmt(totalSize) },
          { label: 'متوسط العائد', value: `${(SUKUK.reduce((a,s)=>a+s.profitRate,0)/SUKUK.length).toFixed(1)}%` },
          { label: 'إصدارات مفتوحة', value: `${SUKUK.filter(s=>s.status==='open').length}` },
        ].map(({ label, value }) => (
          <div key={label} className="flex-shrink-0 text-center px-3 py-1 bg-white rounded-lg border border-amber-100">
            <p className="text-[9px] text-slate-400">{label}</p>
            <p className="text-xs font-bold text-amber-600">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Filters bar — same style as marketplace ── */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 space-y-2">
          {/* Status filters */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 hide-scrollbar">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  filterStatus === st
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/50 hover:bg-amber-50 text-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          {/* Type filters */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 hide-scrollbar">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  filterType === t
                    ? 'bg-amber-600 text-white'
                    : 'bg-white border border-amber-200 text-amber-600 hover:bg-amber-50'
                }`}
              >
                {t === 'الكل' ? 'كل الأنواع' : t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">

        {/* Section header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">الصكوك المتاحة للاكتتاب</h2>
          <p className="text-sm text-slate-500">
            {filtered.length} {filtered.length === 1 ? 'إصدار' : 'إصدارات'} متاحة · طرح خاص للمستثمرين المؤهلين والمؤسسيين
          </p>
        </div>

        {/* Sukuk grid — same 3-col grid as marketplace */}
        {filtered.length === 0 ? (
          <p className="text-slate-400 text-sm py-12 text-center">لا توجد إصدارات تطابق الفلاتر المحددة.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((s) => (
              <SukukCard key={s.id} s={s} onOpen={setDetail} />
            ))}
          </div>
        )}

        {/* Disclaimer — same footer-note style */}
        <div className="mt-10 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-5 flex items-start gap-3">
          <Shield size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed" dir="rtl">
            هذا الطرح موجَّه للمستثمرين المؤهلين والمؤسسيين فقط وفقًا لنظام السوق المالية ولوائح هيئة السوق المالية في المملكة العربية السعودية.
            المعلومات الواردة هنا لأغراض إعلامية فقط. يُرجى الرجوع إلى مستند الطرح الرسمي للحصول على التفاصيل الكاملة والمخاطر المرتبطة.
          </p>
        </div>
      </div>

      {/* Footer — same structure as marketplace */}
      <footer className="bg-slate-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-2">بورتال الصكوك</h3>
              <p className="text-gray-400 text-sm">صكوك متوافقة مع الشريعة الإسلامية · Sharia-Compliant Sukuk</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentView('b2b-platform')} className="hover:text-amber-400 transition-all">السوق الرئيسي</button></li>
                <li><button className="hover:text-amber-400 transition-all">كل الإصدارات</button></li>
                <li><button className="hover:text-amber-400 transition-all">للمستثمرين المؤسسيين</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">تواصل معنا</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>الرياض، المملكة العربية السعودية</li>
                <li>sukuk@mezzanine.sa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
            © 2026 Mezzanine Investment · بورتال الصكوك · جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      {/* Detail modal */}
      {detail && <DetailModal s={detail} onClose={() => setDetail(null)} />}
    </div>
  );
};

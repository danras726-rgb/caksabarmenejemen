const { useState, useMemo, useEffect, useRef } = React;

// --- KOMPONEN IKON ---
const Icon = ({ path, size=20, className="" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} dangerouslySetInnerHTML={{__html: path}} />
);

const Icons = {
    LayoutDashboard: (props) => <Icon path='<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>' {...props} />,
    ArrowRightLeft: (props) => <Icon path='<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>' {...props} />,
    FileText: (props) => <Icon path='<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>' {...props} />,
    Utensils: (props) => <Icon path='<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>' {...props} />,
    CalendarDays: (props) => <Icon path='<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>' {...props} />,
    Beef: (props) => <Icon path='<circle cx="12.5" cy="8.5" r="2.5"/><path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"/><path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C16.9 19 14.7 22 12 22a3 3 0 0 1-2.68-1.66L8.4 19.5"/>' {...props} />,
    Plus: (props) => <Icon path='<path d="M5 12h14"/><path d="M12 5v14"/>' {...props} />,
    TrendingUp: (props) => <Icon path='<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>' {...props} />,
    TrendingDown: (props) => <Icon path='<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>' {...props} />,
    DollarSign: (props) => <Icon path='<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' {...props} />,
    Briefcase: (props) => <Icon path='<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' {...props} />,
    Search: (props) => <Icon path='<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>' {...props} />,
    Bell: (props) => <Icon path='<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>' {...props} />,
    User: (props) => <Icon path='<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' {...props} />,
    CheckCircle: (props) => <Icon path='<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>' {...props} />,
    Clock: (props) => <Icon path='<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' {...props} />,
    LogOut: (props) => <Icon path='<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>' {...props} />,
    X: (props) => <Icon path='<path d="M18 6 6 18"/><path d="m6 6 12 12"/>' {...props} />,
    Trash2: (props) => <Icon path='<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>' {...props} />,
    Activity: (props) => <Icon path='<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>' {...props} />,
    Printer: (props) => <Icon path='<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>' {...props} />,
    ChevronRight: (props) => <Icon path='<path d="m9 18 6-6-6-6"/>' {...props} />,
    MoreHorizontal: (props) => <Icon path='<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>' {...props} />,
    BarChart3: (props) => <Icon path='<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>' {...props} />,
    Package: (props) => <Icon path='<line x1="16.5" x2="7.5" y1="9.4" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/>' {...props} />,
    Menu: (props) => <Icon path='<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>' {...props} />,
    Wallet: (props) => <Icon path='<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>' {...props} />,
    Landmark: (props) => <Icon path='<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>' {...props} />,
    ChevronDown: (props) => <Icon path='<path d="m6 9 6 6 6-6"/>' {...props} />,
    Folder: (props) => <Icon path='<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>' {...props} />,
    ClipboardList: (props) => <Icon path='<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>' {...props} />,
    Settings: (props) => <Icon path='<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>' {...props} />,
    AlertTriangle: (props) => <Icon path='<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>' {...props} />,
    Pencil: (props) => <Icon path='<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>' {...props} />,
    PiggyBank: (props) => <Icon path='<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>' {...props} />
};

const cn = (...parts) => parts.filter(Boolean).join(' ');
const Btn = ({ variant = 'primary', className = '', type = 'button', icon: Ico, children, ...props }) => (
    <button type={type} className={cn('btn', `btn-${variant}`, className)} {...props}>
        {Ico ? <Ico size={16} /> : null}
        {children}
    </button>
);
const IconTile = ({ icon: Ico, tone = 'brand', size = 18, className = '' }) => (
    <div className={cn('icon-tile', tone === 'emerald' && 'icon-tile-emerald', tone === 'rose' && 'icon-tile-rose', tone === 'slate' && 'icon-tile-slate', className)}>
        <Ico size={size} />
    </div>
);
const PageHeader = ({ badge, title, subtitle, actions }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            {badge && <span className="inline-flex text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full mb-2">{badge}</span>}
            <h2 className="text-3xl font-sans font-extrabold text-slate-900 tracking-tight">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
);
const Modal = ({ open, onClose, title, subtitle, children, wide }) => {
    if (!open) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={cn('modal-panel', wide && 'max-w-lg')} onClick={(e) => e.stopPropagation()}>
                {(title || onClose) && (
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            {title && <h3 className="text-xl font-bold text-slate-800">{title}</h3>}
                            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
                        </div>
                        {onClose && <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"><Icons.X size={18}/></button>}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};
const DataTable = ({ headers, children, empty, colSpan }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left text-sm data-table">
            <thead>
                <tr>{headers.map((h) => <th key={h.label} className={h.align === 'right' ? 'text-right' : h.align === 'center' ? 'text-center' : ''}>{h.label}</th>)}</tr>
            </thead>
            <tbody>{children}{empty && <tr><td colSpan={colSpan || headers.length} className="p-10 text-center text-slate-400">{empty}</td></tr>}</tbody>
        </table>
    </div>
);

// --- BANTUAN TANGGAL & FORMAT ---
const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))); 
startOfWeek.setHours(0,0,0,0);
const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const startOfYear = new Date(today.getFullYear(), 0, 1);

const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return '-';
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    if(includeTime) { options.hour = '2-digit'; options.minute = '2-digit'; }
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
const formatRibuanInput = (value) => String(value).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const unformatRibuan = (value) => parseInt(String(value).replace(/\./g, ''), 10) || 0;

const pad2 = (n) => String(n).padStart(2, '0');
const getDateKey = (dateString) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return '';
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};
const getMonthKey = (dateString) => getDateKey(dateString).slice(0, 7);
const currentMonthKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
};
const formatMonthTitle = (monthKey) => {
    const [y, m] = (monthKey || '').split('-');
    if (!y || !m) return monthKey;
    return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
};
const toLocalDateInput = (date = new Date()) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
const parseDateKey = (dateKey) => {
    const [y, m, d] = String(dateKey).split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
};
const dateInputToIso = (value) => {
    const [y, m, d] = (value || '').split('-').map(Number);
    if (!y || !m || !d) return new Date().toISOString();
    return new Date(y, m - 1, d, 12, 0, 0).toISOString();
};
const isIncome = (type) => type === 'pemasukan';
const isExpense = (type) => type === 'pengeluaran';

const FUND_SOURCES = [
    { key: 'tunai', label: 'Tunai' },
    { key: 'bca', label: 'BCA' },
    { key: 'bsi', label: 'BSI' }
];
const FUND_KEYS = FUND_SOURCES.map((s) => s.key);
const fundLabel = (key) => (FUND_SOURCES.find((s) => s.key === key) || {}).label || key;
const sumKas = (balances) => FUND_KEYS.reduce((sum, key) => sum + (Number(balances?.[key]) || 0), 0);
const daysInCurrentMonth = () => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};
const applyWalletDelta = (balances, wallet, type, amount) => {
    if (!FUND_KEYS.includes(wallet)) return balances;
    const delta = type === 'pemasukan' ? amount : type === 'pengeluaran' ? -amount : 0;
    return {
        ...balances,
        [wallet]: (Number(balances[wallet]) || 0) + delta,
        updatedAt: new Date().toISOString()
    };
};
const emptyWalletBag = () => ({ tunai: 0, bca: 0, bsi: 0 });
const SALDO_WIDGETS = [
    { key: 'tunai', name: 'Saldo Tunai', icon: 'Wallet' },
    { key: 'bca', name: 'Saldo BCA', icon: 'Landmark' },
    { key: 'bsi', name: 'Saldo BSI', icon: 'Landmark' }
];
const SATUAN_OPTIONS = ['Pcs', 'Kg', 'Gram', 'Liter', 'Jerigen', 'Bungkus', 'Ekor', 'Ikat', 'Dus'];
const EXPENSE_CATEGORIES = ['Bahan Baku', 'Operasional Warung', 'Gaji & Upah', 'Transport', 'Lain-lain'];

// --- DEFAULT DATA JIKA DATABASE KOSONG ---
const initialCatering = {
    Salsa: { saldo: 0, history: [] }, Kurnia: { saldo: 0, history: [] }
};
const initialGoatSuppliers = [
    { id: 1, name: 'Pak Haji Rohman', hutang: 0, lastTx: null }
];
const initialBalances = { tunai: 0, bca: 0, bsi: 0, updatedAt: null };

// Membuang field lama (mis. SeaBank / modal awal) agar struktur saldo tetap 3 dompet.
const sanitizeBalances = (raw) => {
    const clean = { ...initialBalances };
    FUND_KEYS.forEach((key) => { clean[key] = Number(raw?.[key]) || 0; });
    clean.updatedAt = raw?.updatedAt || null;
    return clean;
};

// Daftar menu default. Harga & nama bisa diubah lewat menu Pengaturan lalu tersimpan di cloud.
const defaultMenuItems = [
    { id: 'paket-hemat', name: 'Paket Hemat', price: 2250000, unit: 'paket', desc: '1 Ekor, 400 Sate, 1 Panci Gule', type: 'paket' },
    { id: 'paket-sedang', name: 'Paket Sedang', price: 2500000, unit: 'paket', desc: '1 Ekor, 500 Sate, 1 Panci Gule', type: 'paket' },
    { id: 'paket-besar', name: 'Paket Besar', price: 3000000, unit: 'paket', desc: '1 Ekor, 700 Sate, 1.5 Panci Gule', type: 'paket' },
    { id: 'jasa-masak', name: 'Jasa Masak', price: 850000, unit: 'paket', desc: 'Kambing Bawa Sendiri', type: 'paket' },
    { id: 'jasa-guling', name: 'Jasa K. Guling', price: 1200000, unit: 'paket', desc: 'K. Bawa Sendiri (Bakar & Iris)', type: 'paket' },
    { id: 'guling-full', name: 'K. Guling (Full)', price: 2500000, unit: 'paket', desc: 'Kambing Dari Kami (Beres)', type: 'paket' },
    { id: 'kotakan', name: 'Layanan Kotakan', price: 10000, unit: 'box', desc: 'Nasi, Sate, Gule, Acar, Krupuk', type: 'kotakan' },
    { id: 'sate-ayam', name: 'Sate Ayam', price: 1200, priceKatering: 1000, unit: 'tusuk', desc: 'Harga umum & harga khusus katering', type: 'sateayam' }
];
// Menggabungkan menu default dengan versi tersimpan agar menu baru tetap muncul.
const mergeMenuItems = (saved) => {
    if (!Array.isArray(saved) || saved.length === 0) return defaultMenuItems;
    const merged = defaultMenuItems.map((d) => {
        const hit = saved.find((s) => s.id === d.id);
        return hit ? { ...d, ...hit } : d;
    });
    return merged.concat(saved.filter((s) => !defaultMenuItems.some((d) => d.id === s.id)));
};
const menuPriceFor = (item, isUmum) => (item.type === 'sateayam' && !isUmum ? Number(item.priceKatering) || 0 : Number(item.price) || 0);
const menuPriceLabel = (item) => {
    if (item.type === 'kotakan') return `${formatRupiah(item.price)} / box`;
    if (item.type === 'sateayam') return `${formatRupiah(item.price)} / tusuk · katering ${formatRupiah(item.priceKatering || 0)}`;
    return formatRupiah(item.price);
};

// --- BANTUAN TANGGUNGAN (periode & kalkulator cicilan harian) ---
const MONTH_NAMES = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const clampDayInMonth = (year, monthIndex, day) => Math.min(Math.max(1, Number(day) || 1), new Date(year, monthIndex + 1, 0).getDate());

// Menormalkan data lama (hanya punya monthlyTarget) ke struktur periode yang baru.
const normalizeTanggungan = (item) => ({
    ...item,
    amount: Number(item.amount) || Number(item.monthlyTarget) || 0,
    periode: item.periode || 'bulanan',
    mode: item.mode || 'berulang',
    dayOfMonth: Number(item.dayOfMonth) || 1,
    recurDay: Number(item.recurDay) || 1,
    recurMonth: Number(item.recurMonth) || 1,
    dueDate: item.dueDate || '',
    collected: Number(item.collected) || 0,
    sourceWallet: FUND_KEYS.includes(item.sourceWallet) ? item.sourceWallet : 'tunai',
    targetWallet: FUND_KEYS.includes(item.targetWallet) ? item.targetWallet : 'bca'
});

// Tanggal jatuh tempo terdekat: sekali pakai dueDate, berulang cari kemunculan berikutnya.
const nextDueDate = (item) => {
    const today = startOfToday();
    if (item.mode === 'sekali') {
        if (!item.dueDate) return null;
        const d = parseDateKey(item.dueDate);
        return Number.isNaN(d.getTime()) ? null : d;
    }
    if (item.periode === 'tahunan') {
        const monthIndex = Math.min(11, Math.max(0, (Number(item.recurMonth) || 1) - 1));
        let year = today.getFullYear();
        let candidate = new Date(year, monthIndex, clampDayInMonth(year, monthIndex, item.recurDay));
        if (candidate < today) {
            year += 1;
            candidate = new Date(year, monthIndex, clampDayInMonth(year, monthIndex, item.recurDay));
        }
        return candidate;
    }
    let year = today.getFullYear();
    let monthIndex = today.getMonth();
    let candidate = new Date(year, monthIndex, clampDayInMonth(year, monthIndex, item.dayOfMonth));
    if (candidate < today) {
        monthIndex += 1;
        if (monthIndex > 11) { monthIndex = 0; year += 1; }
        candidate = new Date(year, monthIndex, clampDayInMonth(year, monthIndex, item.dayOfMonth));
    }
    return candidate;
};

// Jatuh tempo tercapai bila hari ini sama dengan atau sudah melewati tanggal bayar.
const isTanggunganDue = (item) => {
    const due = nextDueDate(item);
    return due ? startOfToday().getTime() >= due.getTime() : false;
};

const daysUntilDue = (item) => {
    const due = nextDueDate(item);
    if (!due) return null;
    const diff = Math.ceil((due.getTime() - startOfToday().getTime()) / 86400000);
    return Math.max(1, diff);
};

// Target menabung harian = total nominal / sisa hari menuju jatuh tempo.
const dailySavingTarget = (item) => {
    const sisaHari = daysUntilDue(item);
    if (!sisaHari) return 0;
    return Math.ceil((Number(item.amount) || 0) / sisaHari);
};

const jadwalLabel = (item) => {
    if (item.mode === 'sekali') {
        return item.dueDate ? `Sekali bayar · target ${formatDate(parseDateKey(item.dueDate).toISOString())}` : 'Sekali bayar · tanggal belum diatur';
    }
    if (item.periode === 'tahunan') {
        return `Berulang tiap tahun · ${clampDayInMonth(2024, (Number(item.recurMonth) || 1) - 1, item.recurDay)} ${MONTH_NAMES[(Number(item.recurMonth) || 1) - 1]}`;
    }
    return `Berulang tiap bulan · tanggal ${Number(item.dayOfMonth) || 1}`;
};

// --- KOMPONEN BANTUAN UI ---
const Toast = ({ message, isVisible }) => (
    <div className={`fixed top-5 right-5 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100 animate-toast' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-white border border-slate-200 text-slate-800 px-5 py-3 rounded-2xl shadow-xl shadow-slate-900/10 flex items-center space-x-3">
            <IconTile icon={Icons.CheckCircle} tone="emerald" size={16} className="w-9 h-9" />
            <span className="font-semibold text-sm tracking-wide">{message}</span>
        </div>
    </div>
);

// Tombol reset data dengan verifikasi 2 langkah: data hanya terhapus setelah dua konfirmasi.
const ResetDataControl = ({ label = 'Reset Data', title, firstMessage, secondMessage, successMessage, onReset, showToast }) => {
    const [step, setStep] = useState(0);
    const [busy, setBusy] = useState(false);

    const finish = async () => {
        if (busy) return;
        setBusy(true);
        try {
            await onReset();
            setStep(0);
            showToast(successMessage || 'Data berhasil direset.');
        } catch (err) {
            console.error(err);
            showToast('Gagal mereset data.');
        } finally { setBusy(false); }
    };

    return (
        <React.Fragment>
            <Btn variant="ghost" className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700" onClick={() => setStep(1)} icon={Icons.Trash2}>{label}</Btn>
            <Modal open={step > 0} onClose={() => setStep(0)} title={title} subtitle={`Verifikasi langkah ${step} dari 2`}>
                <div className="flex items-center gap-3 mb-4 -mt-2">
                    <IconTile icon={Icons.AlertTriangle} tone={step === 1 ? 'brand' : 'rose'} />
                </div>
                <p className="text-sm text-slate-600">{step === 1 ? firstMessage : secondMessage}</p>
                <div className="flex gap-3 mt-6">
                    <Btn variant="ghost" className="flex-1" onClick={() => setStep(0)}>Batal</Btn>
                    {step === 1
                        ? <Btn variant="primary" className="flex-1" onClick={() => setStep(2)}>Ya, lanjutkan</Btn>
                        : <Btn variant="danger" className="flex-1" onClick={finish} disabled={busy}>{busy ? 'Mereset...' : 'Konfirmasi Reset'}</Btn>}
                </div>
            </Modal>
        </React.Fragment>
    );
};

// --- KOMPONEN LOGIN ---
const LoginScreen = ({ onLogin, onGoogle, showToast }) => {
    const [username, setUsername] = useState(() => {
        try { return localStorage.getItem('caksabarRemember') === '1' ? (localStorage.getItem('caksabarRememberUser') || '') : ''; } catch (e) { return ''; }
    });
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(() => {
        try { return localStorage.getItem('caksabarRemember') === '1'; } catch (e) { return false; }
    });
    const [googleBusy, setGoogleBusy] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const name = username.trim();
        try {
            if (remember) {
                localStorage.setItem('caksabarRemember', '1');
                localStorage.setItem('caksabarRememberUser', name);
            } else {
                localStorage.removeItem('caksabarRemember');
                localStorage.removeItem('caksabarRememberUser');
            }
        } catch (err) { /* storage tidak tersedia */ }
        if (name === 'owner' && password === '123') {
            onLogin({ name: 'Bpk. Owner', role: 'admin' });
            showToast('Berhasil login sebagai Owner');
        } else if (name === 'pegawai' && password === '123') {
            onLogin({ name: 'Staf Warung', role: 'staff' });
            showToast('Berhasil login sebagai Pegawai');
        } else {
            showToast('Username atau password salah!');
        }
    };

    const soon = (label) => (e) => {
        e.preventDefault();
        showToast(label + ' belum tersedia.');
    };

    const handleGoogle = async (e) => {
        e.preventDefault();
        if (googleBusy) return;
        setGoogleBusy(true);
        try { await onGoogle(); } finally { setGoogleBusy(false); }
    };

    return (
        <div className="login-stage">
            <section className="login-hero">
                <div className="login-brand">
                    <svg className="login-mark" viewBox="0 0 36 36" aria-hidden="true">
                        <rect x="3" y="18" width="6" height="14" rx="1.5" fill="#5eead4" />
                        <rect x="13" y="10" width="6" height="22" rx="1.5" fill="#2dd4bf" />
                        <rect x="23" y="4" width="6" height="28" rx="1.5" fill="#99f6e4" />
                        <path d="M5 16l8-6 6 4 10-9" fill="none" stroke="#ccfbf1" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div>
                        <strong>CAKSABAR</strong>
                        <span>Manajemen Keuangan</span>
                    </div>
                </div>

                <div className="login-art" aria-hidden="true">
                    <span className="art-spark art-spark-a"></span>
                    <span className="art-spark art-spark-b"></span>
                    <div className="art-float art-bars">
                        <svg viewBox="0 0 64 48">
                            <rect x="6" y="26" width="8" height="16" rx="2" fill="#5eead4" />
                            <rect x="20" y="16" width="8" height="26" rx="2" fill="#2dd4bf" />
                            <rect x="34" y="8" width="8" height="34" rx="2" fill="#14b8a6" />
                            <path d="M8 22l14-10 8 6" fill="none" stroke="#0f766e" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M26 12h8v8" fill="none" stroke="#0f766e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="art-glass">
                        <div className="art-home">
                            <svg viewBox="0 0 24 24"><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" fill="none" stroke="#0f766e" strokeWidth="1.6" /></svg>
                        </div>
                        <div className="art-card art-line">
                            <svg viewBox="0 0 160 90">
                                <path d="M8 70 C 28 68, 36 40, 54 42 S 78 62, 96 36 S 128 18, 152 22" fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" />
                                <path d="M8 70 C 28 68, 36 40, 54 42 S 78 62, 96 36 S 128 18, 152 22 V 82 H 8 Z" fill="url(#artFill)" opacity="0.35" />
                                <defs>
                                    <linearGradient id="artFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#5eead4" />
                                        <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="art-card art-donut">
                            <svg viewBox="0 0 72 72">
                                <circle cx="36" cy="36" r="22" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                                <circle cx="36" cy="36" r="22" fill="none" stroke="#14b8a6" strokeWidth="10" strokeDasharray="92 46" strokeLinecap="round" transform="rotate(-90 36 36)" />
                            </svg>
                        </div>
                        <div className="art-card art-stat">
                            <span>Tabungan</span>
                            <i className="art-bar art-bar-green"></i>
                        </div>
                        <div className="art-card art-stat">
                            <span>Pengeluaran</span>
                            <i className="art-bar art-bar-rose"></i>
                        </div>
                    </div>
                    <div className="art-float art-mini">
                        <svg viewBox="0 0 48 36">
                            <circle cx="16" cy="18" r="10" fill="none" stroke="#14b8a6" strokeWidth="6" strokeDasharray="40 24" />
                            <rect x="30" y="10" width="14" height="4" rx="2" fill="#99f6e4" />
                            <rect x="30" y="20" width="10" height="4" rx="2" fill="#5eead4" />
                        </svg>
                    </div>
                </div>

                <div className="login-copy">
                    <h2>Kelola Keuangan Lebih Bijak, Hidup Lebih Tenang.</h2>
                    <p>Pantau pengeluaran, buat anggaran, dan capai impian finansial Anda bersama caksabar.</p>
                </div>
            </section>

            <section className="login-panel">
                <div className="login-form">
                    <h1>Selamat Datang</h1>
                    <p className="login-lead">Masuk ke akun Anda untuk mulai mengelola keuangan.</p>
                    <form onSubmit={handleLogin}>
                        <label className="login-field">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Email atau Username" autoComplete="username" />
                        </label>
                        <label className="login-field">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>
                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Kata Sandi" autoComplete="current-password" />
                            <button type="button" className="login-eye" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}>
                                {showPassword
                                    ? <svg viewBox="0 0 24 24"><path d="M3 3l18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9.3 3.1 11 7-0.6 1.4-1.6 2.7-2.8 3.8M6.1 6.1C4.2 7.4 2.7 9.1 1 12c1.7 3.9 6 7 11 7 1.6 0 3.1-.3 4.5-.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
                                    : <svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>}
                            </button>
                        </label>
                        <div className="login-row">
                            <label className="login-check">
                                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                                <span>Ingat Saya</span>
                            </label>
                            <button type="button" className="login-link" onClick={soon('Lupa kata sandi')}>Lupa Kata Sandi?</button>
                        </div>
                        <button type="submit" className="login-submit">Masuk</button>
                    </form>
                    <div className="login-or"><span>Atau masuk dengan</span></div>
                    <div className="login-social">
                        <button type="button" onClick={handleGoogle} disabled={googleBusy}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7C21.6 18.8 23 15.8 23 12.3Z"/>
                                <path fill="#34A853" d="M12 23c3.2 0 5.8-1 7.7-2.8l-3.7-2.9c-1 .7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.6v3c1.9 3.8 5.8 6.4 10.4 6.4Z"/>
                                <path fill="#FBBC05" d="M5.4 13.6A6.8 6.8 0 0 1 5 12c0-.6.1-1.1.3-1.6V7.4H1.6A11 11 0 0 0 1 12c0 1.8.4 3.4 1.2 4.9l3.2-3.3Z"/>
                                <path fill="#EA4335" d="M12 5.5c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.8 1.9 15.2.9 12 .9 7.4.9 3.5 3.5 1.6 7.3l3.8 3.1C6.3 7.6 8.9 5.5 12 5.5Z"/>
                            </svg>
                            {googleBusy ? 'Menghubungkan...' : 'Google'}
                        </button>
                    </div>
                    <p className="login-signup">Belum punya akun? <button type="button" onClick={handleGoogle} disabled={googleBusy}>Daftar Sekarang</button></p>
                </div>
            </section>
        </div>
    );
};

// --- KOMPONEN TAB ---

const readLocal = (key, fallback = '') => {
    try { return localStorage.getItem(key) ?? fallback; } catch (e) { return fallback; }
};
const writeLocal = (key, value) => {
    try { localStorage.setItem(key, value); } catch (e) { /* storage tidak tersedia */ }
};

const Beranda = ({ stats, transactions, setTab, orders, balances }) => {
    const [filterPesanan, setFilterPesanan] = useState('Semua'); 
    const [saldoAwal, setSaldoAwal] = useState(() => readLocal('proyeksiSaldoAwal', ''));

    useEffect(() => { writeLocal('proyeksiSaldoAwal', saldoAwal); }, [saldoAwal]);

    // Kalkulator proyeksi keuntungan terhadap modal/saldo awal yang diisi pengguna.
    const proyeksi = useMemo(() => {
        const modal = unformatRibuan(saldoAwal);
        const periode = [
            { label: 'Per Minggu', data: stats.mingguIni, tone: 'text-emerald-600' },
            { label: 'Per Bulan', data: stats.bulanIni, tone: 'text-brand-700' },
            { label: 'Per Tahun', data: stats.tahunIni, tone: 'text-blue-700' }
        ];
        return {
            modal,
            rows: periode.map((p) => ({
                label: p.label,
                tone: p.tone,
                omset: p.data.omset,
                pengeluaran: p.data.pengeluaran,
                laba: p.data.laba,
                persen: modal > 0 ? (p.data.laba / modal) * 100 : 0
            }))
        };
    }, [saldoAwal, stats]);

    const filteredOrders = orders.filter(o => filterPesanan === 'Semua' ? true : o.status === filterPesanan).slice(0, 5); 

    const omsetMonth = useMemo(() => {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const todayDate = now.getDate();
        const daily = [];
        let total = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            const key = `${y}-${pad2(m + 1)}-${pad2(day)}`;
            const amount = transactions
                .filter((t) => getDateKey(t.date) === key && t.type === 'pemasukan')
                .reduce((sum, t) => sum + (t.amount || 0), 0);
            if (day <= todayDate) total += amount;
            daily.push({
                day,
                label: String(day),
                fullDate: new Date(y, m, day).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
                amount,
                isFuture: day > todayDate
            });
        }
        const avg = todayDate > 0 ? Math.round(total / todayDate) : 0;
        const maxAmount = Math.max(avg, ...daily.map((d) => d.amount), 1);
        return { daily, total, avg, todayDate, daysInMonth, maxAmount, monthTitle: formatMonthTitle(currentMonthKey()) };
    }, [transactions]);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <PageHeader
                badge="Ringkasan"
                title="Dashboard Saldo"
                subtitle="Cloud sync aktif · pantau kas, omset, dan pesanan hari ini."
                actions={<Btn variant="primary" icon={Icons.Plus} onClick={() => setTab('transaksi')}>Input Transaksi</Btn>}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
                {SALDO_WIDGETS.map((item) => {
                    const Ico = Icons[item.icon];
                    return (
                        <div key={item.key} className="soft-card lift-card p-5 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-400"></div>
                            <div className="flex items-start justify-between">
                                <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400">{item.name}</p>
                                <IconTile icon={Ico} size={16} className="w-8 h-8" />
                            </div>
                            <p className="text-xl md:text-2xl font-bold mt-3 tracking-tight text-slate-900">{formatRupiah(balances?.[item.key] || 0)}</p>
                        </div>
                    );
                })}
                <div className="soft-card lift-card p-5 relative overflow-hidden">
                    <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400">Total Saldo</p>
                    <p className="text-xl md:text-2xl font-bold mt-3 tracking-tight text-slate-900">{formatRupiah(sumKas(balances))}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Tunai + BCA + BSI</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: 'Omset Hari Ini', value: stats.hariIni.omset, color: 'text-emerald-700' },
                    { title: 'Pengeluaran Hari Ini', value: stats.hariIni.pengeluaran, color: 'text-rose-600' },
                    { title: 'Laba Bulan Ini', value: stats.bulanIni.laba, color: 'text-brand-700' }
                ].map((item) => (
                    <div key={item.title} className="soft-card rounded-2xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.title}</p>
                        <p className={`text-xl font-bold mt-2 ${item.color}`}>{formatRupiah(item.value)}</p>
                    </div>
                ))}
            </div>

            <div className="soft-card rounded-2xl p-6 md:p-7">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
                        <div className="flex items-center gap-3">
                            <IconTile icon={Icons.PiggyBank} />
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Kalkulator Proyeksi Keuntungan</h3>
                            <p className="text-xs text-slate-500 mt-1">Isi saldo awal (modal), lalu persentase keuntungan dihitung otomatis dari laba berjalan.</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-72">
                        <label className="field-label">Saldo awal / modal (Rp)</label>
                        <input type="text" inputMode="numeric" className="field-input" placeholder="Contoh: 20.000.000" value={saldoAwal} onChange={(e) => setSaldoAwal(formatRibuanInput(e.target.value))} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {proyeksi.rows.map((row) => {
                        const positif = row.laba >= 0;
                        return (
                            <div key={row.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center justify-between">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{row.label}</p>
                                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${proyeksi.modal <= 0 ? 'bg-white text-slate-400 border-slate-200' : positif ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                                        {proyeksi.modal > 0 ? `${positif ? '+' : ''}${row.persen.toFixed(1)}%` : '—'}
                                    </span>
                                </div>
                                <p className={`text-2xl font-bold mt-3 ${positif ? row.tone : 'text-rose-600'}`}>{formatRupiah(row.laba)}</p>
                                <div className="mt-3 pt-3 border-t border-slate-200 space-y-1">
                                    <p className="text-[11px] text-slate-500 flex justify-between"><span>Omset</span><span className="font-bold text-slate-700">{formatRupiah(row.omset)}</span></p>
                                    <p className="text-[11px] text-slate-500 flex justify-between"><span>Pengeluaran</span><span className="font-bold text-slate-700">{formatRupiah(row.pengeluaran)}</span></p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {proyeksi.modal <= 0 && <p className="text-xs text-slate-400 mt-4">Isi saldo awal terlebih dahulu untuk melihat persentase keuntungan.</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-7 flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-6 gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 flex items-center"><Icons.BarChart3 size={18} className="mr-2 text-brand-500"/> Rata-rata Omset</h3>
                            <p className="text-xs text-slate-500 mt-1">Pemasukan harian {omsetMonth.monthTitle} · rata-rata dari {omsetMonth.todayDate} hari berjalan</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Rata-rata / hari</p>
                            <p className="text-xl font-bold text-brand-700">{formatRupiah(omsetMonth.avg)}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-end space-x-0.5 md:space-x-1 h-48 mt-4 relative w-full pt-4">
                        <div className="absolute inset-0 flex flex-col justify-between z-0 pb-6">
                            <div className="border-b border-slate-100 w-full"></div>
                            <div className="border-b border-slate-100 w-full"></div>
                            <div className="border-b border-slate-100 w-full"></div>
                            <div className="border-b border-slate-100 w-full"></div>
                        </div>
                        {omsetMonth.daily.map((item) => (
                            <div key={item.day} className={`flex-1 flex flex-col justify-end h-full relative z-10 group cursor-pointer pb-6 ${item.isFuture ? 'opacity-30' : ''}`}>
                                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-slate-100 text-slate-800 text-xs px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl z-20 whitespace-nowrap pointer-events-none scale-95 group-hover:scale-100 flex flex-col items-center">
                                    <p className="text-[10px] text-slate-500 mb-0.5">{item.fullDate}</p>
                                    <p className="font-bold text-brand-600">{formatRupiah(item.amount)}</p>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                                </div>
                                <div className="relative mx-px bg-gradient-to-t from-brand-100 to-brand-500 rounded-t-md chart-bar" style={{ height: `${Math.max((item.amount / omsetMonth.maxAmount) * 100, item.amount > 0 ? 4 : 0)}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>Tgl 1</span>
                        <span>Total omset bulan ini {formatRupiah(omsetMonth.total)}</span>
                        <span>Tgl {omsetMonth.daysInMonth}</span>
                    </div>
                </div>

                <div className="soft-card lift-card p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-50 rounded-full blur-[70px] pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="flex items-center space-x-2">
                            <IconTile icon={Icons.Utensils} size={16} className="w-8 h-8" />
                            <span className="font-bold text-slate-800 tracking-wide">SateGule<sup className="text-brand-500">®</sup></span>
                        </div>
                        <span className="bg-brand-50 text-brand-700 border border-brand-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">Tahunan</span>
                    </div>
                    <div className="relative z-10 mb-8">
                        <h3 className="text-2xl font-display font-semibold text-slate-900 mb-3">Ringkasan Portofolio</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">Pantau total akumulasi aset dan pertumbuhan bisnis Anda secara menyeluruh dalam tahun ini.</p>
                    </div>
                    <div className="space-y-4 relative z-10 mt-auto">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                            <p className="text-slate-400 text-xs mb-1">Total Omset</p>
                            <p className="text-lg font-bold text-slate-800">{formatRupiah(stats.tahunIni.omset)}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                            <div>
                                <p className="text-slate-400 text-xs mb-1">Laba Bersih</p>
                                <p className="text-xl font-bold text-slate-900">{formatRupiah(stats.tahunIni.laba)}</p>
                            </div>
                            <IconTile icon={Icons.TrendingUp} tone="emerald" size={16} className="w-10 h-10" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-7 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center"><Icons.Package size={18} className="mr-2 text-brand-500"/> Daftar Pesanan Terkini</h3>
                        <div className="seg-control">
                            {['Semua', 'Pending', 'Selesai'].map(f => (
                                <button key={f} onClick={() => setFilterPesanan(f)} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${filterPesanan === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{f}</button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3 flex-grow">
                        {filteredOrders.length === 0 ? (
                            <div className="text-slate-400 text-sm flex flex-col items-center justify-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 h-full">
                                <Icons.Package size={32} className="mb-3 opacity-30"/> Tidak ada pesanan di kategori ini.
                            </div>
                        ) : (
                            filteredOrders.map(order => (
                                <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-200 transition-colors gap-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="icon-tile hidden sm:flex"><Icons.User size={16}/></div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <p className="font-bold text-slate-800 text-sm">{order.source}</p>
                                                {order.namaPemesan && <span className="text-xs text-slate-500">({order.namaPemesan})</span>}
                                            </div>
                                            <p className="text-xs text-slate-600 mt-1 line-clamp-1">{order.details}</p>
                                            <p className="text-[10px] text-slate-400 mt-1 flex items-center"><Icons.Clock size={10} className="mr-1"/>{formatDate(order.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border mb-1 ${order.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : order.status === 'Batal' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-brand-50 text-brand-600 border-brand-200'}`}>{order.status}</span>
                                        <span className="font-bold text-slate-800 text-sm">{formatRupiah(order.total)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mt-4 text-center">
                        <button onClick={() => setTab('jadwal_pesanan')} className="text-xs text-brand-600 hover:text-brand-700 font-bold flex items-center justify-center w-full bg-brand-50 py-2.5 rounded-xl transition-colors border border-brand-100 hover:border-brand-200">Lihat Seluruh Jadwal Pesanan <Icons.ChevronRight size={14} className="ml-1"/></button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center"><Icons.Activity size={18} className="mr-2 text-emerald-500"/> Aktivitas Terakhir</h3>
                    </div>
                    <div className="space-y-3 flex-grow overflow-hidden">
                        {transactions.slice(0, 5).map((t, idx) => (
                            <div key={t.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2.5 rounded-xl border ${t.type === 'pemasukan' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : t.type === 'pengeluaran' ? 'bg-rose-50 text-rose-600 border-rose-100' : t.type === 'hutang_kambing' ? 'bg-sky-50 text-sky-600 border-sky-100' : 'bg-brand-50 text-brand-600 border-brand-100'}`}>
                                        {t.type === 'pemasukan' ? <Icons.TrendingUp size={16} /> : t.type === 'pengeluaran' ? <Icons.TrendingDown size={16} /> : t.type === 'hutang_kambing' ? <Icons.Beef size={16} /> : <Icons.Briefcase size={16}/>}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-xs tracking-wide line-clamp-1">{t.desc}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(t.date, true)}</p>
                                    </div>
                                </div>
                                <span className={`font-bold tracking-wide text-xs whitespace-nowrap pl-2 ${t.type === 'pemasukan' ? 'text-emerald-600' : t.type === 'pengeluaran' ? 'text-rose-600' : t.type === 'hutang_kambing' ? 'text-sky-600' : 'text-brand-600'}`}>
                                    {t.type === 'pemasukan' ? '+' : t.type === 'pengeluaran' ? '-' : ''}{formatRupiah(t.amount)}
                                </span>
                            </div>
                        ))}
                        {transactions.length === 0 && <div className="text-slate-400 text-sm flex flex-col items-center justify-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 h-full"><Icons.Activity size={32} className="mb-3 opacity-30"/>Belum ada transaksi aktif.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DailyLedgerCard = ({ day, isOpen, onToggle, onRequestDelete }) => (
    <div className={`soft-card rounded-2xl overflow-hidden transition-all ${isOpen ? 'ring-1 ring-brand-200' : ''}`}>
        <button type="button" onClick={onToggle} className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 border border-brand-100 flex items-center justify-center font-bold">
                    {parseDateKey(day.dateKey).getDate()}
                </div>
                <div>
                    <p className="font-bold text-slate-800">{parseDateKey(day.dateKey).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{day.items.length} catatan · klik untuk rincian pemasukan & pengeluaran</p>
                </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600">Pemasukan</p>
                    <p className="font-bold text-emerald-700 text-sm">{formatRupiah(day.pemasukan)}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-rose-500">Pengeluaran</p>
                    <p className="font-bold text-rose-600 text-sm">{formatRupiah(day.pengeluaran)}</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Bersih</p>
                    <p className={`font-bold text-sm ${day.bersih >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>{formatRupiah(day.bersih)}</p>
                </div>
                <Icons.ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
        </button>
        {isOpen && (
            <div className="px-5 md:px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4 animate-fade-in">
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3 flex items-center"><Icons.TrendingUp size={14} className="mr-2"/> Rincian Pemasukan</h4>
                    {day.incomes.length === 0 ? <p className="text-sm text-slate-400">Tidak ada pemasukan.</p> : day.incomes.map(t => (
                        <div key={t.id} className="flex justify-between items-start py-2 border-b border-emerald-100/80 last:border-0 gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800">{t.desc}</p>
                                <p className="text-[10px] text-slate-400">{new Date(t.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}{t.wallet ? ` · ${fundLabel(t.wallet)}` : ''}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <p className="text-sm font-bold text-emerald-700 whitespace-nowrap">+{formatRupiah(t.amount)}</p>
                                <button type="button" onClick={() => onRequestDelete(t)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg" title="Hapus transaksi"><Icons.Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-3 flex items-center"><Icons.TrendingDown size={14} className="mr-2"/> Rincian Pengeluaran</h4>
                    {day.expenses.length === 0 ? <p className="text-sm text-slate-400">Tidak ada pengeluaran.</p> : day.expenses.map(t => (
                        <div key={t.id} className="flex justify-between items-start py-2 border-b border-rose-100/80 last:border-0 gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800">{t.desc}</p>
                                <p className="text-[10px] text-slate-400">{new Date(t.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}{t.wallet ? ` · ${fundLabel(t.wallet)}` : ''}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <p className="text-sm font-bold text-rose-600 whitespace-nowrap">-{formatRupiah(t.amount)}</p>
                                <button type="button" onClick={() => onRequestDelete(t)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg" title="Hapus transaksi"><Icons.Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
                {day.others.length > 0 && (
                    <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Catatan lain</h4>
                        {day.others.map(t => (
                            <div key={t.id} className="flex justify-between items-center text-sm py-1.5 gap-3">
                                <span className="text-slate-600">{t.desc} <span className="text-[10px] uppercase tracking-wider text-slate-400">({String(t.type).replace('_', ' ')})</span></span>
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-slate-800">{formatRupiah(t.amount)}</span>
                                    <button type="button" onClick={() => onRequestDelete(t)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg" title="Hapus transaksi"><Icons.Trash2 size={14}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
    </div>
);

const FundSourcePills = ({ value, onChange, tone = 'brand' }) => (
    <div className="flex flex-wrap gap-2">
        {FUND_SOURCES.map((src) => {
            const active = value === src.key;
            const activeClass = tone === 'rose'
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-emerald-600 text-white border-emerald-600 shadow-sm';
            return (
                <button
                    key={src.key}
                    type="button"
                    onClick={() => onChange(src.key)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${active ? activeClass : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}`}
                >
                    {src.label}
                </button>
            );
        })}
    </div>
);

const Transaksi = ({ addTransaction, addBahanBaku, balances, showToast }) => {
    const [txDate, setTxDate] = useState(toLocalDateInput());
    const [income, setIncome] = useState({ amount: '', desc: '', wallet: 'tunai' });
    const [expense, setExpense] = useState({
        amount: '', desc: '', wallet: 'tunai',
        kategori: 'Operasional Warung', namaBahan: '', jumlah: '', satuan: SATUAN_OPTIONS[0]
    });

    const isBahanBaku = expense.kategori === 'Bahan Baku';

    const saveIncome = (e) => {
        e.preventDefault();
        const numAmount = unformatRibuan(income.amount);
        if (!numAmount || !income.desc.trim()) return showToast('Lengkapi nominal dan keterangan.');
        if (!FUND_KEYS.includes(income.wallet)) return showToast('Pilih tujuan dana.');
        addTransaction({ date: dateInputToIso(txDate), type: 'pemasukan', amount: numAmount, desc: income.desc.trim(), wallet: income.wallet });
        setIncome({ amount: '', desc: '', wallet: income.wallet });
        showToast(`Pemasukan tersimpan. Saldo ${fundLabel(income.wallet)} bertambah ${formatRupiah(numAmount)}.`);
    };

    const saveExpense = async (e) => {
        e.preventDefault();
        const numAmount = unformatRibuan(expense.amount);
        if (!numAmount || !expense.desc.trim()) return showToast('Lengkapi nominal dan keterangan.');
        if (!FUND_KEYS.includes(expense.wallet)) return showToast('Pilih sumber dana.');
        if (isBahanBaku && (!expense.namaBahan.trim() || !expense.jumlah)) return showToast('Lengkapi nama bahan baku dan jumlahnya.');

        const currentSaldo = Number(balances?.[expense.wallet]) || 0;
        const warn = currentSaldo < numAmount ? ` Perhatian: saldo ${fundLabel(expense.wallet)} saat ini ${formatRupiah(currentSaldo)}.` : '';

        await addTransaction({
            date: dateInputToIso(txDate),
            type: 'pengeluaran',
            amount: numAmount,
            desc: expense.desc.trim(),
            wallet: expense.wallet,
            kategori: expense.kategori
        });

        if (isBahanBaku) {
            await addBahanBaku({
                date: dateInputToIso(txDate),
                nama: expense.namaBahan.trim(),
                jumlah: Number(expense.jumlah) || 0,
                satuan: expense.satuan,
                total: numAmount,
                sumber: 'Input Transaksi',
                wallet: expense.wallet,
                createdAt: new Date().toISOString()
            });
        }

        setExpense({ ...expense, amount: '', desc: '', namaBahan: '', jumlah: '' });
        showToast(`Pengeluaran tersimpan. Saldo ${fundLabel(expense.wallet)} berkurang ${formatRupiah(numAmount)}.${isBahanBaku ? ' Rincian masuk Riwayat Bahan Baku.' : ''}${warn}`);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                badge="Keuangan harian"
                title="Input Transaksi"
                subtitle="Pilih sumber dana. Pemasukan menambah saldo, pengeluaran mengurangi saldo secara otomatis."
                actions={
                    <div className="soft-card px-4 py-3 min-w-[220px]">
                        <label className="field-label mb-1">Tanggal transaksi</label>
                        <input type="date" className="field-input py-2" value={txDate} onChange={(e) => setTxDate(e.target.value)} />
                    </div>
                }
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FUND_SOURCES.map((src) => (
                    <div key={src.key} className="soft-card rounded-2xl px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{src.label}</p>
                        <p className="font-bold text-slate-800 text-sm mt-1">{formatRupiah(balances?.[src.key] || 0)}</p>
                    </div>
                ))}
                <div className="soft-card rounded-2xl px-4 py-3 bg-brand-50/60">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-brand-500">Total Saldo</p>
                    <p className="font-bold text-brand-800 text-sm mt-1">{formatRupiah(sumKas(balances))}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <form onSubmit={saveIncome} className="soft-card rounded-2xl p-6 md:p-7 relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Pemasukan Harian</h3>
                            <p className="text-xs text-slate-500 mt-1">Omset, pelunasan, atau uang masuk lain.</p>
                        </div>
                        <IconTile icon={Icons.TrendingUp} tone="emerald" />
                    </div>
                    <div className="space-y-4 relative z-10">
                        <div>
                            <label className="field-label">Masuk ke saldo</label>
                            <FundSourcePills value={income.wallet} onChange={(wallet) => setIncome({ ...income, wallet })} />
                        </div>
                        <div>
                            <label className="field-label">Nominal (Rp)</label>
                            <input type="text" inputMode="numeric" className="field-input" placeholder="Contoh: 1.500.000" value={income.amount} onChange={(e) => setIncome({ ...income, amount: formatRibuanInput(e.target.value) })} />
                        </div>
                        <div>
                            <label className="field-label">Keterangan</label>
                            <input type="text" className="field-input" placeholder="Contoh: Omset warung, DP pesanan..." value={income.desc} onChange={(e) => setIncome({ ...income, desc: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-success w-full py-3.5">Simpan Pemasukan</button>
                    </div>
                </form>

                <form onSubmit={saveExpense} className="soft-card rounded-2xl p-6 md:p-7 relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose-50 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Pengeluaran Harian</h3>
                            <p className="text-xs text-slate-500 mt-1">Bahan, operasional, atau uang keluar lain.</p>
                        </div>
                        <IconTile icon={Icons.TrendingDown} tone="rose" />
                    </div>
                    <div className="space-y-4 relative z-10">
                        <div>
                            <label className="field-label">Keluar dari saldo</label>
                            <FundSourcePills value={expense.wallet} onChange={(wallet) => setExpense({ ...expense, wallet })} tone="rose" />
                        </div>
                        <div>
                            <label className="field-label">Kategori pengeluaran</label>
                            <select className="field-input" value={expense.kategori} onChange={(e) => setExpense({ ...expense, kategori: e.target.value })}>
                                {EXPENSE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        {isBahanBaku && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-slide-down">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-700">Rincian bahan baku</p>
                                <div>
                                    <label className="field-label">Nama bahan baku</label>
                                    <input type="text" className="field-input" placeholder="Contoh: Minyak goreng, Kelapa, Bumbu" value={expense.namaBahan} onChange={(e) => setExpense({ ...expense, namaBahan: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="field-label">Jumlah</label>
                                        <input type="number" min="0" step="any" className="field-input" placeholder="0" value={expense.jumlah} onChange={(e) => setExpense({ ...expense, jumlah: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="field-label">Satuan</label>
                                        <select className="field-input" value={expense.satuan} onChange={(e) => setExpense({ ...expense, satuan: e.target.value })}>
                                            {SATUAN_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-500">Rincian ini otomatis masuk ke halaman Riwayat Bahan Baku.</p>
                            </div>
                        )}
                        <div>
                            <label className="field-label">Nominal (Rp)</label>
                            <input type="text" inputMode="numeric" className="field-input" placeholder="Contoh: 250.000" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: formatRibuanInput(e.target.value) })} />
                        </div>
                        <div>
                            <label className="field-label">Keterangan</label>
                            <input type="text" className="field-input" placeholder="Contoh: Beli bumbu, bayar listrik..." value={expense.desc} onChange={(e) => setExpense({ ...expense, desc: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-danger w-full py-3.5">Simpan Pengeluaran</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SaldoPage = ({ balances, saveBalances, transfers, addTransfer, showToast }) => {
    const [updateModal, setUpdateModal] = useState(false);
    const [transferModal, setTransferModal] = useState(false);
    const [busy, setBusy] = useState(false);
    const [updateForm, setUpdateForm] = useState({ wallet: 'tunai', amount: '' });
    const [transferForm, setTransferForm] = useState({ from: 'tunai', to: 'bca', amount: '', note: '' });

    const totalSaldo = sumKas(balances);

    const saldoItems = [
        { key: 'tunai', name: 'Saldo Tunai', hint: 'Kas fisik di warung', icon: Icons.Wallet },
        { key: 'bca', name: 'Saldo BCA', hint: 'Rekening BCA operasional', icon: Icons.Landmark },
        { key: 'bsi', name: 'Saldo BSI', hint: 'Rekening BSI / syariah', icon: Icons.Landmark }
    ];

    const openUpdate = (wallet) => {
        setUpdateForm({ wallet, amount: formatRibuanInput(Number(balances?.[wallet]) || 0) });
        setUpdateModal(true);
    };

    const submitUpdate = async (e) => {
        e.preventDefault();
        if (busy) return;
        const nominal = unformatRibuan(updateForm.amount);
        if (!FUND_KEYS.includes(updateForm.wallet)) return showToast('Pilih saldo yang ingin diperbarui.');
        setBusy(true);
        try {
            await saveBalances({ ...balances, [updateForm.wallet]: nominal, updatedAt: new Date().toISOString() });
            setUpdateModal(false);
            setUpdateForm({ wallet: 'tunai', amount: '' });
            showToast(`Saldo ${fundLabel(updateForm.wallet)} diperbarui menjadi ${formatRupiah(nominal)}.`);
        } finally { setBusy(false); }
    };

    const submitTransfer = async (e) => {
        e.preventDefault();
        if (busy) return;
        const nominal = unformatRibuan(transferForm.amount);
        const { from, to, note } = transferForm;
        if (!nominal) return showToast('Masukkan nominal transfer.');
        if (from === to) return showToast('Saldo asal dan tujuan tidak boleh sama.');
        const saldoAsal = Number(balances?.[from]) || 0;
        if (saldoAsal < nominal) return showToast(`Saldo ${fundLabel(from)} hanya ${formatRupiah(saldoAsal)}.`);
        setBusy(true);
        try {
            await saveBalances({
                ...balances,
                [from]: saldoAsal - nominal,
                [to]: (Number(balances?.[to]) || 0) + nominal,
                updatedAt: new Date().toISOString()
            });
            await addTransfer({
                id: Date.now().toString(),
                date: new Date().toISOString(),
                from, to,
                amount: nominal,
                note: (note || '').trim()
            });
            setTransferModal(false);
            setTransferForm({ from: 'tunai', to: 'bca', amount: '', note: '' });
            showToast(`Transfer ${formatRupiah(nominal)} dari ${fundLabel(from)} ke ${fundLabel(to)} berhasil.`);
        } finally { setBusy(false); }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                badge="Kas usaha"
                title="Saldo"
                subtitle="Saldo berubah otomatis dari transaksi, tanggungan, mitra, pesanan, dan suplier."
                actions={
                    <React.Fragment>
                        <Btn variant="primary" icon={Icons.Wallet} onClick={() => openUpdate('tunai')}>Isi / Perbarui Saldo</Btn>
                        <Btn variant="dark" icon={Icons.ArrowRightLeft} onClick={() => setTransferModal(true)}>Transfer Antar Saldo</Btn>
                    </React.Fragment>
                }
            />

            <div className="soft-card p-7 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-400"></div>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Total Saldo Keseluruhan</p>
                <p className="text-4xl md:text-5xl font-display font-semibold mt-3 tracking-tight text-slate-900">{formatRupiah(totalSaldo)}</p>
                <p className="text-xs text-slate-400 mt-3">Dihitung otomatis: Tunai + BCA + BSI. Tidak bisa diisi manual.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">
                {saldoItems.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                        <div key={item.key} className="soft-card lift-card p-5 relative overflow-hidden">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-xs uppercase tracking-widest font-bold text-slate-400">{item.name}</p>
                                    <p className="text-2xl font-bold mt-3 tracking-tight text-slate-900">{formatRupiah(balances?.[item.key] || 0)}</p>
                                    <p className="text-[11px] text-slate-400 mt-2">{item.hint}</p>
                                </div>
                                <IconTile icon={ItemIcon} size={16} />
                            </div>
                            <button type="button" onClick={() => openUpdate(item.key)} className="btn btn-ghost mt-4 w-full py-2 text-xs">Perbarui</button>
                        </div>
                    );
                })}
            </div>

            <div className="soft-card rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center gap-3">
                    <IconTile icon={Icons.ArrowRightLeft} />
                    <div>
                        <h3 className="font-bold text-slate-800">Riwayat Transfer Antar Saldo</h3>
                        <p className="text-xs text-slate-500">Perpindahan dana internal beserta catatannya.</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm data-table">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Tanggal</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Dari</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Ke</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Catatan</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest text-right">Nominal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {(transfers || []).length === 0 && (
                                <tr><td colSpan="5" className="p-10 text-center text-slate-400">Belum ada transfer antar saldo.</td></tr>
                            )}
                            {(transfers || []).map((t) => (
                                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-slate-700 font-semibold whitespace-nowrap">{formatDate(t.date, true)}</td>
                                    <td className="p-4"><span className="text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 px-2.5 py-1 rounded-full">{fundLabel(t.from)}</span></td>
                                    <td className="p-4"><span className="text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-full">{fundLabel(t.to)}</span></td>
                                    <td className="p-4 text-slate-600">{t.note || '-'}</td>
                                    <td className="p-4 text-right font-bold text-slate-800">{formatRupiah(t.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {balances.updatedAt && <p className="text-xs text-slate-400">Terakhir diperbarui: {formatDate(balances.updatedAt, true)}</p>}

            {updateModal && (
                <div className="modal-overlay">
                    <form onSubmit={submitUpdate} className="modal-panel">
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Isi / Perbarui Saldo</h3>
                                <p className="text-sm text-slate-500 mt-1">Nominal yang disimpan menjadi jumlah saldo terbaru dompet tersebut.</p>
                            </div>
                            <button type="button" onClick={() => setUpdateModal(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"><Icons.X size={18}/></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="field-label">Pilih saldo</label>
                                <select className="field-input" value={updateForm.wallet} onChange={(e) => setUpdateForm({ wallet: e.target.value, amount: formatRibuanInput(Number(balances?.[e.target.value]) || 0) })}>
                                    {FUND_SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="field-label">Nominal (Rp)</label>
                                <input autoFocus type="text" inputMode="numeric" className="field-input" placeholder="0" value={updateForm.amount} onChange={(e) => setUpdateForm({ ...updateForm, amount: formatRibuanInput(e.target.value) })} />
                                <p className="text-xs text-slate-400 mt-2">Saldo sekarang: {formatRupiah(balances?.[updateForm.wallet] || 0)}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setUpdateModal(false)} className="btn btn-ghost flex-1">Batal</button>
                            <button type="submit" disabled={busy} className="btn btn-primary flex-1">Simpan</button>
                        </div>
                    </form>
                </div>
            )}

            {transferModal && (
                <div className="modal-overlay">
                    <form onSubmit={submitTransfer} className="modal-panel">
                        <div className="flex items-start justify-between mb-5">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Transfer Antar Saldo</h3>
                                <p className="text-sm text-slate-500 mt-1">Memindahkan dana internal. Total saldo keseluruhan tidak berubah.</p>
                            </div>
                            <button type="button" onClick={() => setTransferModal(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"><Icons.X size={18}/></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="field-label">Saldo asal</label>
                                    <select className="field-input" value={transferForm.from} onChange={(e) => setTransferForm({ ...transferForm, from: e.target.value })}>
                                        {FUND_SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                                    </select>
                                    <p className="text-[11px] text-slate-400 mt-1.5">Tersedia {formatRupiah(balances?.[transferForm.from] || 0)}</p>
                                </div>
                                <div>
                                    <label className="field-label">Saldo tujuan</label>
                                    <select className="field-input" value={transferForm.to} onChange={(e) => setTransferForm({ ...transferForm, to: e.target.value })}>
                                        {FUND_SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                                    </select>
                                    <p className="text-[11px] text-slate-400 mt-1.5">Saat ini {formatRupiah(balances?.[transferForm.to] || 0)}</p>
                                </div>
                            </div>
                            <div>
                                <label className="field-label">Nominal (Rp)</label>
                                <input autoFocus type="text" inputMode="numeric" className="field-input" placeholder="0" value={transferForm.amount} onChange={(e) => setTransferForm({ ...transferForm, amount: formatRibuanInput(e.target.value) })} />
                            </div>
                            <div>
                                <label className="field-label">Catatan</label>
                                <input type="text" className="field-input" placeholder="Contoh: Setor tunai ke BCA" value={transferForm.note} onChange={(e) => setTransferForm({ ...transferForm, note: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setTransferModal(false)} className="btn btn-ghost flex-1">Batal</button>
                            <button type="submit" disabled={busy} className="btn btn-dark flex-1">Transfer</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

const RiwayatBahanBaku = ({ bahanBaku, onReset, showToast }) => {
    const [query, setQuery] = useState('');

    const rows = useMemo(() => {
        const q = query.toLowerCase().trim();
        return (bahanBaku || [])
            .filter((b) => !q || String(b.nama || '').toLowerCase().includes(q) || String(b.sumber || '').toLowerCase().includes(q))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [bahanBaku, query]);

    const totalBiaya = rows.reduce((s, b) => s + (Number(b.total) || 0), 0);
    const bulanIni = rows.filter((b) => getMonthKey(b.date) === currentMonthKey()).reduce((s, b) => s + (Number(b.total) || 0), 0);

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                badge="Belanja produksi"
                title="Riwayat Bahan Baku"
                subtitle="Data otomatis dari pengeluaran kategori Bahan Baku dan pengambilan kambing di menu Suplier."
                actions={
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                        <ResetDataControl
                            label="Reset Data"
                            title="Reset Riwayat Bahan Baku"
                            firstMessage="Yakin ingin menghapus seluruh riwayat di halaman ini? Data belum terhapus sampai Anda konfirmasi sekali lagi."
                            secondMessage="Konfirmasi kedua: seluruh riwayat bahan baku akan dihapus dan tidak bisa dikembalikan."
                            successMessage="Riwayat bahan baku berhasil direset."
                            onReset={onReset}
                            showToast={showToast}
                        />
                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Icons.Search size={18} className="text-slate-400" /></div>
                            <input type="text" placeholder="Cari nama bahan baku..." className="field-input pl-12" value={query} onChange={(e) => setQuery(e.target.value)} />
                        </div>
                    </div>
                }
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="soft-card rounded-2xl p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Item Tercatat</p>
                    <p className="text-2xl font-bold mt-2 text-slate-800">{rows.length}</p>
                </div>
                <div className="soft-card rounded-2xl p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Belanja Bulan Ini</p>
                    <p className="text-2xl font-bold mt-2 text-brand-700">{formatRupiah(bulanIni)}</p>
                </div>
                <div className="soft-card rounded-2xl p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Keseluruhan</p>
                    <p className="text-2xl font-bold mt-2 text-rose-600">{formatRupiah(totalBiaya)}</p>
                </div>
            </div>

            <div className="soft-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm data-table">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Tanggal</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Nama Bahan Baku</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest text-center">Jumlah</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Satuan</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Sumber</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest text-right">Total Biaya</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-slate-400">
                                        <Icons.Package size={32} className="mx-auto mb-3 opacity-40" />
                                        Belum ada riwayat bahan baku. Data akan muncul otomatis setelah ada pengeluaran bahan baku atau pengambilan kambing.
                                    </td>
                                </tr>
                            )}
                            {rows.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-slate-700 font-semibold whitespace-nowrap">{formatDate(b.date)}</td>
                                    <td className="p-4 text-slate-800 font-bold">{b.nama}</td>
                                    <td className="p-4 text-center text-slate-700 font-semibold">{b.jumlah}</td>
                                    <td className="p-4"><span className="text-xs font-bold bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">{b.satuan}</span></td>
                                    <td className="p-4 text-xs text-slate-500">{b.sumber}{b.supplier ? ` · ${b.supplier}` : ''}</td>
                                    <td className="p-4 text-right font-bold text-rose-600">{formatRupiah(b.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const emptyTanggunganForm = () => ({
    name: '', amount: '', periode: 'bulanan', mode: 'berulang',
    dayOfMonth: '1', dueDate: '', recurDay: '1', recurMonth: '1',
    sourceWallet: 'tunai', targetWallet: 'bca'
});

const TanggunganPage = ({ items, saveItems, addTransaction, balances, saveBalances, showToast }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState(emptyTanggunganForm());
    const [collectedDraft, setCollectedDraft] = useState({});
    const [payingId, setPayingId] = useState(null);

    const list = useMemo(() => (items || []).map(normalizeTanggungan), [items]);
    const totalTarget = list.reduce((s, i) => s + i.amount, 0);
    const totalCollected = list.reduce((s, i) => s + i.collected, 0);
    const totalDaily = list.reduce((s, i) => s + dailySavingTarget(i), 0);

    // Pratinjau kalkulator harian untuk form yang sedang diisi.
    const draftPreview = useMemo(() => {
        const amount = unformatRibuan(newItem.amount);
        if (!amount) return null;
        const draft = {
            amount,
            periode: newItem.periode,
            mode: newItem.mode,
            dayOfMonth: Number(newItem.dayOfMonth) || 1,
            recurDay: Number(newItem.recurDay) || 1,
            recurMonth: Number(newItem.recurMonth) || 1,
            dueDate: newItem.dueDate
        };
        const due = nextDueDate(draft);
        if (!due) return null;
        return { due, sisaHari: daysUntilDue(draft), daily: dailySavingTarget(draft) };
    }, [newItem]);

    const addItem = (e) => {
        e.preventDefault();
        const amount = unformatRibuan(newItem.amount);
        if (!newItem.name.trim() || !amount) return showToast('Isi nama tanggungan dan total nominalnya.');
        if (newItem.mode === 'sekali') {
            if (!newItem.dueDate) return showToast('Pilih target tanggal pelunasan.');
            if (parseDateKey(newItem.dueDate) < startOfToday()) return showToast('Target tanggal pelunasan sudah lewat.');
        }
        if (newItem.mode === 'berulang' && newItem.periode === 'bulanan') {
            const day = Number(newItem.dayOfMonth);
            if (!day || day < 1 || day > 31) return showToast('Tanggal pembayaran harus antara 1 sampai 31.');
        }

        const next = [...(items || []), {
            id: Date.now().toString(),
            name: newItem.name.trim(),
            amount,
            periode: newItem.periode,
            mode: newItem.mode,
            dayOfMonth: newItem.periode === 'bulanan' && newItem.mode === 'berulang' ? Number(newItem.dayOfMonth) || 1 : null,
            recurDay: newItem.periode === 'tahunan' && newItem.mode === 'berulang' ? Number(newItem.recurDay) || 1 : null,
            recurMonth: newItem.periode === 'tahunan' && newItem.mode === 'berulang' ? Number(newItem.recurMonth) || 1 : null,
            dueDate: newItem.mode === 'sekali' ? newItem.dueDate : '',
            sourceWallet: newItem.sourceWallet,
            targetWallet: newItem.targetWallet,
            collected: 0,
            collectedByWallet: emptyWalletBag(),
            createdAt: new Date().toISOString()
        }];
        saveItems(next);
        setNewItem(emptyTanggunganForm());
        setIsAdding(false);
        showToast('Tanggungan baru ditambahkan.');
    };

    const removeItem = (id) => {
        saveItems(items.filter((i) => i.id !== id));
        showToast('Tanggungan dihapus.');
    };

    const setWallet = (id, field, value) => {
        saveItems((items || []).map((i) => i.id === id ? { ...i, [field]: value } : i));
    };

    // Menabung: dana dipindahkan dari Sumber Dana ke Tujuan Dana, progres bertambah.
    const saveCollected = async (item) => {
        const added = unformatRibuan(collectedDraft[item.id]);
        if (!added) return showToast('Masukkan nominal dana yang ditambahkan.');
        const src = item.sourceWallet;
        const dst = item.targetWallet;
        const saldoSumber = Number(balances?.[src]) || 0;
        if (src !== dst && saldoSumber < added) return showToast(`Saldo ${fundLabel(src)} hanya ${formatRupiah(saldoSumber)}.`);

        if (src !== dst) {
            await saveBalances({
                ...balances,
                [src]: saldoSumber - added,
                [dst]: (Number(balances?.[dst]) || 0) + added,
                updatedAt: new Date().toISOString()
            });
        }
        await saveItems(items.map((i) => {
            if (i.id !== item.id) return i;
            const bag = { ...emptyWalletBag(), ...(i.collectedByWallet || {}) };
            bag[dst] = (Number(bag[dst]) || 0) + added;
            return { ...i, collected: (Number(i.collected) || 0) + added, collectedByWallet: bag };
        }));
        setCollectedDraft((prev) => ({ ...prev, [item.id]: '' }));
        showToast(`Dana ${formatRupiah(added)} dipindahkan dari ${fundLabel(src)} ke ${fundLabel(dst)}.`);
    };

    // Bayar saat jatuh tempo: lunasi sisa dari Sumber Dana, lalu keluarkan total dari Tujuan Dana.
    const payNow = async (item) => {
        if (payingId) return;
        const total = Number(item.amount) || 0;
        const collected = Number(item.collected) || 0;
        const sisa = Math.max(0, total - collected);
        const src = item.sourceWallet;
        const dst = item.targetWallet;
        const saldoSumber = Number(balances?.[src]) || 0;
        const saldoTujuan = Number(balances?.[dst]) || 0;

        if (sisa > 0 && src !== dst && saldoSumber < sisa) return showToast(`Saldo ${fundLabel(src)} hanya ${formatRupiah(saldoSumber)}, kurang ${formatRupiah(sisa - saldoSumber)}.`);
        const tujuanSetelahSetor = src === dst ? saldoTujuan : saldoTujuan + sisa;
        if (tujuanSetelahSetor < total) return showToast(`Saldo ${fundLabel(dst)} belum cukup untuk membayar ${formatRupiah(total)}.`);

        setPayingId(item.id);
        try {
            const next = { ...balances, updatedAt: new Date().toISOString() };
            if (src !== dst) {
                next[src] = saldoSumber - sisa;
                next[dst] = saldoTujuan + sisa - total;
            } else {
                next[dst] = saldoTujuan - total;
            }
            await saveBalances(next);

            await addTransaction({
                date: new Date().toISOString(),
                type: 'pengeluaran',
                amount: total,
                desc: `Bayar tanggungan: ${item.name} (${fundLabel(src)} → ${fundLabel(dst)})`,
                wallet: dst,
                kategori: 'Tanggungan',
                source: 'tanggungan',
                tanggunganId: item.id,
                skipBalance: true // saldo sudah disesuaikan di atas
            });

            await saveItems(items.map((i) => i.id === item.id ? { ...i, collected: 0, collectedByWallet: emptyWalletBag(), lastPaidAt: new Date().toISOString() } : i));
            setCollectedDraft((prev) => ({ ...prev, [item.id]: '' }));
            showToast(`${item.name} terbayar ${formatRupiah(total)}. Riwayat masuk ke Laporan.`);
        } catch (err) {
            console.error(err);
            showToast('Gagal memproses pembayaran tanggungan.');
        } finally {
            setPayingId(null);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                badge="Rencana pembayaran"
                title="Tanggungan"
                subtitle="Atur tanggungan bulanan atau tahunan beserta target menabung hariannya. Dana yang ditabung berpindah dari Sumber Dana ke Tujuan Dana, dan tombol Bayar muncul otomatis saat jatuh tempo."
                actions={<Btn variant="primary" icon={Icons.Plus} onClick={() => setIsAdding((v) => !v)}>Tambahkan Tanggungan</Btn>}
            />

            {isAdding && (
                <form onSubmit={addItem} className="soft-card rounded-2xl p-6 space-y-5 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-5">
                            <label className="field-label">Nama tanggungan</label>
                            <input type="text" className="field-input" placeholder="Contoh: Angsuran BSI, Gaji Pegawai" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                        </div>
                        <div className="md:col-span-4">
                            <label className="field-label">Total nominal</label>
                            <input type="text" inputMode="numeric" className="field-input" placeholder="Contoh: 3.100.000" value={newItem.amount} onChange={(e) => setNewItem({ ...newItem, amount: formatRibuanInput(e.target.value) })} />
                        </div>
                        <div className="md:col-span-3">
                            <label className="field-label">Tipe periode</label>
                            <select className="field-input" value={newItem.periode} onChange={(e) => setNewItem({ ...newItem, periode: e.target.value })}>
                                <option value="bulanan">Bulanan</option>
                                <option value="tahunan">Tahunan</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4">
                            <label className="field-label">Pola pembayaran</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button type="button" onClick={() => setNewItem({ ...newItem, mode: 'berulang' })} className={`py-3 rounded-2xl text-xs font-bold border transition-all ${newItem.mode === 'berulang' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}`}>Berulang</button>
                                <button type="button" onClick={() => setNewItem({ ...newItem, mode: 'sekali' })} className={`py-3 rounded-2xl text-xs font-bold border transition-all ${newItem.mode === 'sekali' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300'}`}>Sekali</button>
                            </div>
                        </div>

                        {newItem.mode === 'sekali' && (
                            <div className="md:col-span-8">
                                <label className="field-label">Target tanggal pelunasan</label>
                                <input type="date" className="field-input" value={newItem.dueDate} min={toLocalDateInput()} onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })} />
                            </div>
                        )}

                        {newItem.mode === 'berulang' && newItem.periode === 'bulanan' && (
                            <div className="md:col-span-8">
                                <label className="field-label">Dibayar setiap tanggal berapa?</label>
                                <input type="number" min="1" max="31" className="field-input" placeholder="1 - 31" value={newItem.dayOfMonth} onChange={(e) => setNewItem({ ...newItem, dayOfMonth: e.target.value })} />
                            </div>
                        )}

                        {newItem.mode === 'berulang' && newItem.periode === 'tahunan' && (
                            <div className="md:col-span-8">
                                <label className="field-label">Dibayar setiap tanggal dan bulan apa tiap tahunnya?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="number" min="1" max="31" className="field-input" placeholder="Tanggal" value={newItem.recurDay} onChange={(e) => setNewItem({ ...newItem, recurDay: e.target.value })} />
                                    <select className="field-input" value={newItem.recurMonth} onChange={(e) => setNewItem({ ...newItem, recurMonth: e.target.value })}>
                                        {MONTH_NAMES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="field-label">Sumber dana (saldo yang dipotong)</label>
                            <select className="field-input" value={newItem.sourceWallet} onChange={(e) => setNewItem({ ...newItem, sourceWallet: e.target.value })}>
                                {FUND_SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="field-label">Tujuan dana (tempat dana dikumpulkan)</label>
                            <select className="field-input" value={newItem.targetWallet} onChange={(e) => setNewItem({ ...newItem, targetWallet: e.target.value })}>
                                {FUND_SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                        </div>
                    </div>

                    {draftPreview && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                            <p className="text-base font-bold text-emerald-700">Target menabung: {formatRupiah(draftPreview.daily)} / hari</p>
                            <p className="text-xs text-emerald-600 mt-1">Jatuh tempo {formatDate(draftPreview.due.toISOString())} · sisa {draftPreview.sisaHari} hari.</p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Btn type="submit" variant="primary" className="flex-1">Simpan Tanggungan</Btn>
                        <Btn type="button" variant="ghost" onClick={() => { setIsAdding(false); setNewItem(emptyTanggunganForm()); }}>Batal</Btn>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {list.length === 0 && (
                    <div className="soft-card rounded-2xl p-10 text-center text-slate-400">
                        <Icons.ClipboardList size={32} className="mx-auto mb-3 opacity-40" />
                        Belum ada tanggungan. Tambahkan item seperti angsuran atau gaji.
                    </div>
                )}
                {list.map((item) => {
                    const daily = dailySavingTarget(item);
                    const sisaHari = daysUntilDue(item);
                    const due = nextDueDate(item);
                    const collected = item.collected;
                    const pct = item.amount > 0 ? Math.min(100, Math.round((collected / item.amount) * 100)) : 0;
                    const isComplete = collected >= item.amount && item.amount > 0;
                    const bag = item.collectedByWallet || {};
                    const jatuhTempo = isTanggunganDue(item);
                    return (
                        <div key={item.id} className="soft-card rounded-2xl p-5 md:p-6">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-100 px-2 py-1 rounded-full">{item.periode === 'tahunan' ? 'Tahunan' : 'Bulanan'}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-full">{item.mode === 'sekali' ? 'Sekali' : 'Berulang'}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1">Total nominal {formatRupiah(item.amount)} · {jadwalLabel(item)}</p>
                                            <p className="text-base font-bold text-brand-700 mt-2">Target menabung: {formatRupiah(daily)} / hari</p>
                                            <p className="text-xs text-slate-500 mt-1">{due ? `Jatuh tempo ${formatDate(due.toISOString())} · sisa ${sisaHari} hari` : 'Tanggal jatuh tempo belum diatur'}</p>
                                            <p className="text-sm font-bold text-slate-800 mt-2">Terkumpul: {formatRupiah(collected)}</p>
                                        </div>
                                        <button type="button" onClick={() => removeItem(item.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl" title="Hapus"><Icons.Trash2 size={18}/></button>
                                    </div>
                                    <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full progress-anim ${isComplete ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{ width: `${pct}%` }}></div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">{pct}% terkumpul · sisa {formatRupiah(Math.max(0, item.amount - collected))}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {FUND_KEYS.filter((k) => (Number(bag[k]) || 0) > 0).map((k) => (
                                            <span key={k} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded-full">{fundLabel(k)} {formatRupiah(bag[k])}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full lg:w-80 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="field-label">Sumber dana</label>
                                            <select className="field-input py-2.5 text-sm" value={item.sourceWallet} onChange={(e) => setWallet(item.id, 'sourceWallet', e.target.value)}>
                                                {FUND_SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                                            </select>
                                            <p className="text-[11px] text-slate-400 mt-1.5">{formatRupiah(balances?.[item.sourceWallet] || 0)}</p>
                                        </div>
                                        <div>
                                            <label className="field-label">Tujuan dana</label>
                                            <select className="field-input py-2.5 text-sm" value={item.targetWallet} onChange={(e) => setWallet(item.id, 'targetWallet', e.target.value)}>
                                                {FUND_SOURCES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                                            </select>
                                            <p className="text-[11px] text-slate-400 mt-1.5">{formatRupiah(balances?.[item.targetWallet] || 0)}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="field-label">Update dana terkumpul</label>
                                        <input type="text" inputMode="numeric" className="field-input" placeholder="Nominal yang ditabung" value={collectedDraft[item.id] || ''} onChange={(e) => setCollectedDraft({ ...collectedDraft, [item.id]: formatRibuanInput(e.target.value) })} />
                                    </div>
                                    <Btn variant="dark" className="w-full" onClick={() => saveCollected(item)}>Update Dana</Btn>
                                    {jatuhTempo ? (
                                        <Btn variant="success" className="w-full" disabled={payingId === item.id} onClick={() => payNow(item)}>
                                            {payingId === item.id ? 'Memproses...' : `Bayar ${formatRupiah(item.amount)}`}
                                        </Btn>
                                    ) : (
                                        <p className="text-[11px] text-center text-slate-400">Tombol Bayar muncul otomatis pada {due ? formatDate(due.toISOString()) : 'tanggal jatuh tempo'}.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="soft-card p-6">
                    <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Total keseluruhan tanggungan aktif</p>
                    <p className="text-3xl font-display font-semibold mt-3 text-slate-900">{formatRupiah(totalTarget)}</p>
                    <p className="text-sm text-slate-400 mt-2">Target menabung gabungan {formatRupiah(totalDaily)}/hari</p>
                </div>
                <div className="soft-card p-6">
                    <p className="text-xs uppercase tracking-widest font-bold text-emerald-600">Total dana keseluruhan yang sudah terkumpul</p>
                    <p className="text-3xl font-display font-semibold mt-3 text-emerald-700">{formatRupiah(totalCollected)}</p>
                    <p className="text-sm text-slate-400 mt-2">Kekurangan {formatRupiah(Math.max(0, totalTarget - totalCollected))}</p>
                </div>
            </div>
        </div>
    );
};

const Laporan = ({ transactions, searchTerm, setSearchTerm, onDelete }) => {
    const [openDay, setOpenDay] = useState(null);
    const [openArchive, setOpenArchive] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const thisMonth = currentMonthKey();

    const groupedDays = useMemo(() => {
        const map = {};
        const q = (searchTerm || '').toLowerCase().trim();
        transactions.forEach((t) => {
            if (q) {
                const hit = String(t.desc || '').toLowerCase().includes(q) || String(t.amount).includes(q.replace(/\./g, ''));
                if (!hit) return;
            }
            const dateKey = getDateKey(t.date);
            if (!dateKey) return;
            if (!map[dateKey]) map[dateKey] = [];
            map[dateKey].push(t);
        });
        return Object.keys(map).sort((a, b) => b.localeCompare(a)).map((dateKey) => {
            const items = map[dateKey];
            const incomes = items.filter((t) => isIncome(t.type));
            const expenses = items.filter((t) => isExpense(t.type));
            const others = items.filter((t) => !isIncome(t.type) && !isExpense(t.type));
            const pemasukan = incomes.reduce((s, t) => s + (t.amount || 0), 0);
            const pengeluaran = expenses.reduce((s, t) => s + (t.amount || 0), 0);
            return { dateKey, monthKey: dateKey.slice(0, 7), items, incomes, expenses, others, pemasukan, pengeluaran, bersih: pemasukan - pengeluaran };
        });
    }, [transactions, searchTerm]);

    const currentDays = groupedDays.filter((d) => d.monthKey === thisMonth);
    const archives = useMemo(() => {
        const months = {};
        groupedDays.filter((d) => d.monthKey !== thisMonth).forEach((d) => {
            if (!months[d.monthKey]) months[d.monthKey] = { monthKey: d.monthKey, days: [], pemasukan: 0, pengeluaran: 0 };
            months[d.monthKey].days.push(d);
            months[d.monthKey].pemasukan += d.pemasukan;
            months[d.monthKey].pengeluaran += d.pengeluaran;
        });
        return Object.values(months).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
    }, [groupedDays, thisMonth]);

    const toggleDay = (dateKey) => setOpenDay((prev) => (prev === dateKey ? null : dateKey));
    const requestDelete = (tx) => setPendingDelete({ tx, step: 1 });
    const confirmFirst = () => setPendingDelete((prev) => prev ? { ...prev, step: 2 } : null);
    const confirmFinal = async () => {
        if (!pendingDelete?.tx) return;
        await onDelete(pendingDelete.tx);
        setPendingDelete(null);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <PageHeader
                badge="Arsip keuangan"
                title="Buku Besar Transaksi"
                subtitle="Daftar harian bulan berjalan di atas. Bulan yang sudah lewat otomatis masuk folder arsip."
                actions={
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Icons.Search size={18} className="text-slate-400" />
                        </div>
                        <input type="text" placeholder="Cari keterangan atau nominal..." className="field-input pl-12" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                }
            />

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 text-lg">Bulan berjalan · {formatMonthTitle(thisMonth)}</h3>
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full">{currentDays.length} hari tercatat</span>
                </div>
                <div className="space-y-3">
                    {currentDays.length === 0 && (
                        <div className="soft-card rounded-2xl p-10 text-center text-slate-400">
                            <Icons.FileText size={32} className="mx-auto mb-3 opacity-40" />
                            Belum ada transaksi di bulan ini.
                        </div>
                    )}
                    {currentDays.map((day) => (
                        <DailyLedgerCard key={day.dateKey} day={day} isOpen={openDay === day.dateKey} onToggle={() => toggleDay(day.dateKey)} onRequestDelete={requestDelete} />
                    ))}
                </div>
            </section>

            <section>
                <div className="mb-4">
                    <h3 className="font-bold text-slate-800 text-lg">Arsip bulan tertutup</h3>
                    <p className="text-sm text-slate-500 mt-1">Setiap bulan yang sudah berganti dikelompokkan otomatis. Buka foldernya untuk melihat riwayat harian.</p>
                </div>
                {archives.length === 0 ? (
                    <div className="soft-card rounded-2xl p-8 text-sm text-slate-400">Arsip akan muncul setelah ada data di bulan sebelumnya.</div>
                ) : (
                    <div className="space-y-3">
                        {archives.map((month) => {
                            const isOpen = openArchive === month.monthKey;
                            return (
                                <div key={month.monthKey} className="soft-card rounded-2xl overflow-hidden">
                                    <button type="button" onClick={() => setOpenArchive(isOpen ? null : month.monthKey)} className="w-full p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <IconTile icon={Icons.Folder} />
                                            <div className="text-left">
                                                <p className="font-bold text-slate-800 capitalize">{formatMonthTitle(month.monthKey)}</p>
                                                <p className="text-xs text-slate-500">{month.days.length} hari · masuk {formatRupiah(month.pemasukan)} · keluar {formatRupiah(month.pengeluaran)}</p>
                                            </div>
                                        </div>
                                        <Icons.ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 pb-4 space-y-3 animate-fade-in">
                                            {month.days.map((day) => (
                                                <DailyLedgerCard key={day.dateKey} day={day} isOpen={openDay === day.dateKey} onToggle={() => toggleDay(day.dateKey)} onRequestDelete={requestDelete} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {pendingDelete?.tx && (
                <div className="modal-overlay">
                    <div className="modal-panel">
                        <h3 className="text-xl font-bold text-slate-800">{pendingDelete.step === 1 ? 'Hapus transaksi?' : 'Konfirmasi kedua'}</h3>
                        <p className="text-sm text-slate-500 mt-2">
                            {pendingDelete.step === 1
                                ? 'Apakah Anda yakin ingin menghapus transaksi ini? Data belum dihapus sampai konfirmasi kedua.'
                                : 'Konfirmasi sekali lagi. Transaksi akan dihapus permanen dari Buku Besar dan saldo terkait akan dikembalikan.'}
                        </p>
                        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm">
                            <p className="font-bold text-slate-800">{pendingDelete.tx.desc}</p>
                            <p className="text-slate-500 mt-1">{formatRupiah(pendingDelete.tx.amount)} · {pendingDelete.tx.type}{pendingDelete.tx.wallet ? ` · ${fundLabel(pendingDelete.tx.wallet)}` : ''}</p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setPendingDelete(null)} className="btn btn-ghost flex-1">Batal</button>
                            {pendingDelete.step === 1
                                ? <button type="button" onClick={confirmFirst} className="btn btn-primary flex-1">Ya, lanjutkan</button>
                                : <button type="button" onClick={confirmFinal} className="btn btn-danger flex-1">Hapus permanen</button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const KeuanganKatering = ({ catering, updateCatering, addTransaction, orders, balances, resetCatering, showToast }) => {
    const [selectedKatering, setSelectedKatering] = useState(Object.keys(catering)[0] || null);
    const [isAddingMitra, setIsAddingMitra] = useState(false);
    const [newMitraName, setNewMitraName] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [katTxType, setKatTxType] = useState('deposit'); 
    const [amountInput, setAmountInput] = useState('');
    const [descInput, setDescInput] = useState('');
    const [walletInput, setWalletInput] = useState('tunai');
    const [rightTab, setRightTab] = useState('history');

    useEffect(() => {
        if (Object.keys(catering).length > 0 && !catering[selectedKatering]) {
            setSelectedKatering(Object.keys(catering)[0]);
        }
    }, [catering, selectedKatering]);

    const handleAddMitra = (e) => {
        e.preventDefault();
        if(!newMitraName.trim()) return;
        if(catering[newMitraName]) return showToast('Nama mitra sudah ada!');
        
        const newCatering = { ...catering, [newMitraName]: { saldo: 0, history: [] } };
        updateCatering(newCatering);
        
        setSelectedKatering(newMitraName); setNewMitraName(''); setIsAddingMitra(false);
        showToast(`Mitra ${newMitraName} berhasil disimpan ke Cloud.`);
    };

    const handleDeleteMitra = (mitra) => {
        if (confirmDelete === mitra) {
            const newCatering = { ...catering }; delete newCatering[mitra]; 
            updateCatering(newCatering);
            setConfirmDelete(null);
            showToast(`Mitra ${mitra} dihapus.`);
        } else {
            setConfirmDelete(mitra); setTimeout(() => setConfirmDelete(null), 3000); 
        }
    };

    const handleTx = (e) => {
        e.preventDefault();
        const amount = unformatRibuan(amountInput);
        if (!amount) return;
        const isDeposit = katTxType === 'deposit';
        if (!isDeposit && catering[selectedKatering].saldo < amount) return showToast('Saldo katering tidak mencukupi!');
        if (isDeposit && !FUND_KEYS.includes(walletInput)) return showToast('Pilih saldo tujuan deposit.');

        const newHistory = { id: Date.now().toString(), date: new Date().toISOString(), type: katTxType, amount: amount, desc: (descInput || (isDeposit ? 'Deposit Dana / Bayar DP' : 'Potong Saldo untuk Pesanan')) + (isDeposit ? ` · masuk ${fundLabel(walletInput)}` : '') };
        const newCatering = { 
            ...catering, 
            [selectedKatering]: { 
                saldo: isDeposit ? catering[selectedKatering].saldo + amount : catering[selectedKatering].saldo - amount, 
                history: [newHistory, ...catering[selectedKatering].history] 
            } 
        };
        
        updateCatering(newCatering);
        addTransaction({
            date: new Date().toISOString(),
            type: isDeposit ? 'pemasukan' : 'potong_saldo',
            amount: amount,
            desc: isDeposit ? `Deposit Dana Katering ${selectedKatering}` : `Potong Saldo Katering ${selectedKatering}`,
            ...(isDeposit ? { wallet: walletInput } : {})
        });
        
        setAmountInput(''); setDescInput('');
        showToast(isDeposit ? `Deposit ${formatRupiah(amount)} masuk ke saldo ${fundLabel(walletInput)}.` : `Saldo katering dipotong.`);
    };

    const linkedOrders = orders.filter(o => o.source === `Katering ${selectedKatering}`);

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                title="Manajemen Mitra Katering"
                subtitle="Kelola mitra, deposit uang muka, dan rekap pesanan mereka secara Real-Time."
                actions={
                    <ResetDataControl
                        title="Reset Data Mitra"
                        firstMessage="Yakin ingin reset seluruh data mitra katering? Semua mitra beserta saldo deposit dan riwayatnya akan dihapus."
                        secondMessage="Tindakan ini tidak bisa dibatalkan. Konfirmasi reset data mitra katering?"
                        successMessage="Data mitra katering berhasil direset."
                        onReset={resetCatering}
                        showToast={showToast}
                    />
                }
            />

            <div className="flex flex-wrap gap-2 p-2 bg-white rounded-2xl w-fit items-center border border-slate-200 shadow-sm">
                {Object.keys(catering).map(kat => (
                    <div key={kat} className="relative group flex items-center">
                        <button onClick={() => setSelectedKatering(kat)} className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center ${selectedKatering === kat ? 'bg-brand-600 text-white shadow-md pr-10' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>Katering {kat}</button>
                        {selectedKatering === kat && (
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteMitra(kat); }} className={`absolute right-1.5 p-1 rounded-lg text-white transition-all ${confirmDelete === kat ? 'bg-rose-500 animate-pulse' : 'bg-black/20 hover:bg-rose-500'}`} title={confirmDelete === kat ? "Yakin hapus?" : "Hapus Mitra"}>
                                {confirmDelete === kat ? <Icons.Trash2 size={14} /> : <Icons.X size={14} />}
                            </button>
                        )}
                    </div>
                ))}
                {isAddingMitra ? (
                    <form onSubmit={handleAddMitra} className="flex items-center space-x-1 ml-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
                        <input autoFocus type="text" value={newMitraName} onChange={e => setNewMitraName(e.target.value)} placeholder="Nama Mitra..." className="w-32 text-sm px-3 py-1.5 outline-none font-bold text-slate-800 bg-transparent placeholder-slate-400" />
                        <button type="submit" className="bg-emerald-500 text-white p-1.5 rounded-lg hover:bg-emerald-600 shadow-sm"><Icons.CheckCircle size={16}/></button>
                        <button type="button" onClick={() => setIsAddingMitra(false)} className="bg-white text-slate-500 border border-slate-200 p-1.5 rounded-lg hover:bg-slate-100"><Icons.X size={16}/></button>
                    </form>
                ) : (
                    <button onClick={() => setIsAddingMitra(true)} className="ml-2 px-4 py-2 rounded-xl font-bold text-sm text-brand-600 bg-brand-50 hover:bg-brand-100 flex items-center transition-all border border-brand-100"><Icons.Plus size={16} className="mr-1.5"/> Tambah Mitra</button>
                )}
            </div>

            {!selectedKatering || !catering[selectedKatering] ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
                    <Icons.Briefcase size={56} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-500">Belum Ada Mitra Katering</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="soft-card p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-50 rounded-full blur-[60px] pointer-events-none"></div>
                        <div>
                            <div className="flex justify-between items-center mb-6"><h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Saldo Deposit Aktif</h3><Icons.Briefcase size={18} className="text-brand-500" /></div>
                            <p className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">{formatRupiah(catering[selectedKatering].saldo)}</p>
                            <p className="text-xs text-slate-500">Saldo ini dapat dipotong saat ada pesanan masuk.</p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                            <form onSubmit={handleTx} className="space-y-4">
                                <div className="flex rounded-xl bg-slate-50 p-1 border border-slate-200">
                                    <button type="button" onClick={() => setKatTxType('deposit')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${katTxType === 'deposit' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>+ Deposit</button>
                                    <button type="button" onClick={() => setKatTxType('pesanan')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${katTxType === 'pesanan' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>- Potong Saldo</button>
                                </div>
                                {katTxType === 'deposit' && (
                                    <div className="animate-slide-down">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Pilih saldo tujuan</label>
                                        <FundSourcePills value={walletInput} onChange={setWalletInput} />
                                        <p className="text-[11px] text-slate-400 mt-2">Saldo {fundLabel(walletInput)} sekarang {formatRupiah(balances?.[walletInput] || 0)}. Deposit otomatis menambah saldo ini.</p>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    <input type="text" value={amountInput} onChange={(e) => setAmountInput(formatRibuanInput(e.target.value))} placeholder="Nominal (Rp)" className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium transition-all shadow-sm" />
                                    <input type="text" value={descInput} onChange={(e) => setDescInput(e.target.value)} placeholder="Keterangan opsional..." className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all shadow-sm" />
                                    <button type="submit" className={`btn w-full py-4 ${katTxType === 'deposit' ? 'btn-success' : 'btn-primary'}`}>Eksekusi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="flex border-b border-slate-200 bg-slate-50">
                            <button onClick={() => setRightTab('history')} className={`flex-1 p-4 font-bold text-sm tracking-wide transition-colors border-b-2 ${rightTab === 'history' ? 'text-brand-600 border-brand-500 bg-white' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100'}`}>Riwayat Saldo</button>
                            <button onClick={() => setRightTab('orders')} className={`flex-1 p-4 font-bold text-sm tracking-wide transition-colors flex justify-center items-center space-x-2 border-b-2 ${rightTab === 'orders' ? 'text-brand-600 border-brand-500 bg-white' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100'}`}>
                                <span>Pesanan Katering</span><span className="bg-brand-100 text-brand-700 py-0.5 px-2.5 rounded-full text-xs border border-brand-200">{linkedOrders.length}</span>
                            </button>
                        </div>
                        <div className="p-0 overflow-y-auto custom-scrollbar flex-1 min-h-[320px]">
                            {rightTab === 'history' && (
                                <table className="w-full text-left text-sm data-table">
                                    <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                                        <tr><th className="p-5 font-bold text-slate-500">Tanggal</th><th className="p-5 font-bold text-slate-500">Keterangan</th><th className="p-5 font-bold text-slate-500 text-right">Nominal</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {catering[selectedKatering].history.map(h => (
                                            <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-5 text-slate-800 font-bold">{formatDate(h.date)}</td>
                                                <td className="p-5 text-slate-600 flex items-center font-medium"><span className={`inline-block w-2 h-2 rounded-full mr-3 ${h.type === 'deposit' ? 'bg-emerald-500' : 'bg-brand-500'}`}></span>{h.desc}</td>
                                                <td className={`p-5 font-bold text-right tracking-wide ${h.type === 'deposit' ? 'text-emerald-600' : 'text-slate-800'}`}>{h.type === 'deposit' ? '+' : '-'}{formatRupiah(h.amount)}</td>
                                            </tr>
                                        ))}
                                        {catering[selectedKatering].history.length === 0 && <tr><td colSpan="3" className="p-10 text-center text-slate-500">Belum ada riwayat transaksi saldo.</td></tr>}
                                    </tbody>
                                </table>
                            )}
                            {rightTab === 'orders' && (
                                <div className="p-5 space-y-4">
                                    {linkedOrders.length === 0 ? <div className="text-center py-12"><p className="text-slate-500 font-medium">Belum ada pesanan yang tercatat untuk mitra ini.</p></div> : linkedOrders.map(order => (
                                        <div key={order.id} className="bg-white border border-slate-200 p-5 rounded-2xl flex justify-between items-center hover:border-brand-300 hover:shadow-sm transition-all">
                                            <div><p className="text-xs text-slate-500 font-bold mb-1.5 flex items-center"><Icons.Clock size={12} className="mr-1.5"/>{formatDate(order.date)}</p><p className="font-bold text-slate-800 text-sm whitespace-pre-wrap">{order.details}</p></div>
                                            <span className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-widest shrink-0 ml-4 border ${order.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : order.status === 'Batal' ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-brand-50 text-brand-600 border-brand-200 shadow-sm'}`}>{order.status}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const FormTambahPesanan = ({ addOrder, addTransaction, catering, balances, menuItems, showToast }) => {
    const [form, setForm] = useState({ date: '', source: Object.keys(catering).length > 0 ? `Katering ${Object.keys(catering)[0]}` : 'Umum / Acara', details: '', namaPemesan: '', noHp: '', dp: '', dpWallet: 'tunai', jenisAcara: 'Aqiqah', namaAqiqah: '' });
    const [selectedPackages, setSelectedPackages] = useState({});
    const [kotakanData, setKotakanData] = useState({ jmlKotak: '', isiSate: '' });
    const [sateAyamQty, setSateAyamQty] = useState('');

    const isUmum = form.source === 'Umum / Acara';

    const kotakanMenu = menuItems.find(m => m.type === 'kotakan');
    const sateAyamMenu = menuItems.find(m => m.type === 'sateayam');

    const handlePackageClick = (menuId) => setSelectedPackages(prev => ({ ...prev, [menuId]: (prev[menuId] || 0) + 1 }));
    const handleRemovePackage = (e, menuId) => { e.stopPropagation(); setSelectedPackages(prev => { const newPkgs = { ...prev }; if (newPkgs[menuId] > 1) { newPkgs[menuId] -= 1; } else { delete newPkgs[menuId]; } return newPkgs; }); };

    const handleAddOrder = (e) => {
        e.preventDefault();
        let calculatedTotal = 0; let orderItems = [];

        Object.entries(selectedPackages).forEach(([menuId, btnClickQty]) => {
            const menu = menuItems.find(m => m.id === menuId);
            if (!menu) return;
            const unitPrice = menuPriceFor(menu, isUmum);
            if (menu.type === 'kotakan') { const kQty = parseInt(kotakanData.jmlKotak) || 0; calculatedTotal += kQty * unitPrice; orderItems.push(`${menu.name} (${kQty} Box, ${kotakanData.isiSate || 0} Tsk/Box)`); }
            else if (menu.type === 'sateayam') { const sQty = parseInt(sateAyamQty) || 0; calculatedTotal += sQty * unitPrice; orderItems.push(`${sQty} Tusuk ${menu.name}`); }
            else { calculatedTotal += unitPrice * btnClickQty; orderItems.push(`${btnClickQty}x ${menu.name}`); }
        });

        let detailLines = [];
        if (isUmum) { detailLines.push(`Pelanggan: ${form.namaPemesan || '-'} (${form.noHp || '-'})`); detailLines.push(`Acara: ${form.jenisAcara}${form.jenisAcara === 'Aqiqah' && form.namaAqiqah ? ` (Anak: ${form.namaAqiqah})` : ''}`); }
        if (orderItems.length > 0) detailLines.push(`Pesanan: ${orderItems.join(' | ')}`);
        if (form.details) detailLines.push(`Catatan: ${form.details}`);
        const finalDetails = detailLines.join('\n').trim();

        if(!form.date || !finalDetails) return showToast('Tanggal dan (Menu atau Catatan) harus diisi!');

        const dpNum = isUmum ? (unformatRibuan(form.dp) || 0) : 0;
        
        addOrder({ date: form.date, source: form.source, namaPemesan: form.namaPemesan, details: finalDetails, status: 'Pending', total: calculatedTotal, dp: dpNum, createdAt: new Date().toISOString() });

        if (isUmum && dpNum > 0) {
            addTransaction({
                date: new Date().toISOString(),
                type: 'pemasukan',
                amount: dpNum,
                desc: `DP Pesanan: ${form.namaPemesan || 'Umum'}`,
                wallet: FUND_KEYS.includes(form.dpWallet) ? form.dpWallet : 'tunai'
            });
        }
        
        setForm({ ...form, details: '', namaPemesan: '', noHp: '', dp: '', namaAqiqah: '' }); setSelectedPackages({}); setKotakanData({ jmlKotak: '', isiSate: '' }); setSateAyamQty('');
        showToast(dpNum > 0 && isUmum ? `Pesanan tersimpan. DP ${formatRupiah(dpNum)} masuk ke saldo ${fundLabel(form.dpWallet)}.` : 'Pesanan baru berhasil disimpan di Cloud!');
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader title="Tambah Pesanan Baru" subtitle="Input pesanan masuk dari pelanggan umum maupun katering di sini." />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                <form onSubmit={handleAddOrder} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-1/3"><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tanggal Kirim</label><input type="date" className="w-full p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all shadow-sm" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required/></div>
                        <div className="w-full md:w-2/3"><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Sumber Pesanan</label><select className="w-full p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-bold appearance-none transition-all shadow-sm" value={form.source} onChange={e => setForm({...form, source: e.target.value})}>{Object.keys(catering).map(k => <option key={k} value={`Katering ${k}`}>Katering {k}</option>)}<option value="Umum / Acara">Umum / Acara Khusus</option></select></div>
                    </div>

                    {isUmum && (
                        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 space-y-4 animate-fade-in">
                            <h4 className="font-bold text-sm text-emerald-700 mb-2">Data Pelanggan Umum</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Pemesan</label><input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm" value={form.namaPemesan} onChange={e => setForm({...form, namaPemesan: e.target.value})} placeholder="Bpk/Ibu..." /></div>
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Nomor Telepon</label><input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm" value={form.noHp} onChange={e => setForm({...form, noHp: e.target.value})} placeholder="08..." /></div>
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Jenis Acara</label><select className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-slate-800 appearance-none shadow-sm" value={form.jenisAcara} onChange={e => setForm({...form, jenisAcara: e.target.value})}><option value="Aqiqah">Aqiqah</option><option value="Nikahan">Nikahan</option><option value="Lainnya">Lainnya / Keluarga</option></select></div>
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Uang Muka / DP (Rp)</label><input type="text" className="w-full p-3 bg-white border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-emerald-600 placeholder-emerald-200 shadow-sm" value={form.dp} onChange={e => setForm({...form, dp: formatRibuanInput(e.target.value)})} placeholder="0" /></div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Pilih Saldo Tujuan DP</label>
                                    <FundSourcePills value={form.dpWallet} onChange={(wallet) => setForm({ ...form, dpWallet: wallet })} />
                                    <p className="text-[11px] text-slate-400 mt-2">DP otomatis dicatat sebagai pemasukan dan menambah saldo {fundLabel(form.dpWallet)} (kini {formatRupiah(balances?.[form.dpWallet] || 0)}).</p>
                                </div>
                                {form.jenisAcara === 'Aqiqah' && (<div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Anak (Aqiqah)</label><input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm" value={form.namaAqiqah} onChange={e => setForm({...form, namaAqiqah: e.target.value})} placeholder="Tulis nama anak..." /></div>)}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Pilih Paket Menu</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {menuItems.map(pkg => {
                                const qty = selectedPackages[pkg.id] || 0;
                                return (
                                    <div key={pkg.id} className="relative">
                                        <button type="button" onClick={() => handlePackageClick(pkg.id)} className={`w-full p-4 rounded-2xl text-left transition-all h-full min-h-[110px] flex flex-col justify-center border ${qty > 0 ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500/50' : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-sm'}`}>
                                            <span className={`block text-sm font-bold mb-1 ${qty > 0 ? 'text-brand-700' : 'text-slate-800'}`}>{pkg.name}</span><span className="block text-xs font-bold text-emerald-600 mb-1.5">{menuPriceLabel(pkg)}</span><span className="block text-[10px] font-medium text-slate-500 leading-snug">{pkg.desc}</span>
                                        </button>
                                        {qty > 0 && <div onClick={(e) => handleRemovePackage(e, pkg.id)} className="absolute -top-2 -right-2 bg-brand-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shadow-md border-2 border-white cursor-pointer hover:bg-rose-500 transition-colors" title="Klik untuk mengurangi">{qty}</div>}
                                    </div>
                                )
                            })}
                        </div>

                        {kotakanMenu && selectedPackages[kotakanMenu.id] > 0 && (
                            <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center animate-fade-in">
                                <div className="font-bold text-sm text-slate-700 w-full md:w-auto shrink-0 flex items-center"><Icons.FileText size={16} className="mr-2 text-slate-400"/> Detail Kotakan:</div>
                                <div className="flex-1 w-full flex space-x-3"><input type="number" placeholder="Jml Kotak" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-bold text-slate-800 placeholder-slate-400 shadow-sm" value={kotakanData.jmlKotak} onChange={e => setKotakanData({...kotakanData, jmlKotak: e.target.value})} /><input type="number" placeholder="Sate / kotak" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-bold text-slate-800 placeholder-slate-400 shadow-sm" value={kotakanData.isiSate} onChange={e => setKotakanData({...kotakanData, isiSate: e.target.value})} /></div>
                            </div>
                        )}
                        {sateAyamMenu && selectedPackages[sateAyamMenu.id] > 0 && (
                            <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center animate-fade-in">
                                <div className="font-bold text-sm text-slate-700 w-full md:w-auto shrink-0 flex items-center"><Icons.Utensils size={16} className="mr-2 text-slate-400"/> {sateAyamMenu.name}:</div>
                                <div className="flex-1 w-full flex space-x-3 items-center"><input type="number" placeholder="Berapa tusuk?" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-bold text-slate-800 placeholder-slate-400 shadow-sm" value={sateAyamQty} onChange={e => setSateAyamQty(e.target.value)} /><span className="text-xs font-bold text-slate-500 whitespace-nowrap bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">@ {formatRibuanInput(menuPriceFor(sateAyamMenu, isUmum))}</span></div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Catatan Tambahan</label>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                            <input type="text" placeholder="Contoh: Jam 4 sore, pedas pisah..." className="flex-1 p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all placeholder-slate-400 shadow-sm" value={form.details} onChange={e => setForm({...form, details: e.target.value})} />
                            <button type="submit" className="btn btn-primary px-8 py-4 whitespace-nowrap">Simpan Pesanan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const JadwalPesanan = ({ orders, updateOrder, catering, updateCatering, addTransaction, resetOrders, showToast, searchTerm, setSearchTerm }) => {
    const handleStatus = (id, newStatus) => {
        const order = orders.find(o => o.id === id);
        if (newStatus === 'Selesai' && order.status !== 'Selesai') {
            const sisaTagihan = order.total - (order.dp || 0);
            if (sisaTagihan > 0) {
                if (order.source.startsWith('Katering')) {
                    const katName = order.source.replace('Katering ', '');
                    if (catering[katName]) {
                        const newHistory = { id: Date.now().toString(), date: new Date().toISOString(), type: 'pesanan', amount: sisaTagihan, desc: `Potong Saldo (Selesai ID: ${id.slice(0,4)})` };
                        const newCatering = { ...catering, [katName]: { saldo: catering[katName].saldo - sisaTagihan, history: [newHistory, ...catering[katName].history] } };
                        updateCatering(newCatering);
                        addTransaction({ date: new Date().toISOString(), type: 'potong_saldo', amount: sisaTagihan, desc: `Potong Saldo (Pesanan ${katName})` });
                        showToast(`Pesanan selesai! Saldo ${katName} otomatis dipotong.`);
                    }
                } else {
                    addTransaction({ date: new Date().toISOString(), type: 'pemasukan', amount: sisaTagihan, desc: `Pelunasan: ${order.namaPemesan || 'Umum'} (ID: ${id.slice(0,4)})` });
                    showToast(`Pesanan selesai! Pemasukan sisa tagihan dicatat.`);
                }
            } else { showToast('Pesanan selesai!'); }
        }
        updateOrder(id, { status: newStatus });
    };

    const filteredOrders = orders.filter(o => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return ( o.id.toString().includes(term) || o.source.toLowerCase().includes(term) || o.details.toLowerCase().includes(term) || (o.namaPemesan && o.namaPemesan.toLowerCase().includes(term)) );
    });

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                title="Antrean Jadwal Pesanan"
                subtitle="Pantau status penyelesaian pesanan berjalan secara Real-time."
                actions={
                    <React.Fragment>
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Icons.Search size={18} className="text-slate-400" /></div>
                        <input type="text" placeholder="Cari ID / data pesanan..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm text-slate-800 placeholder-slate-400 transition-all" value={searchTerm || ''} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <ResetDataControl
                        title="Reset Data Antrean"
                        firstMessage="Yakin ingin reset seluruh antrean pesanan? Semua pesanan yang tercatat akan dihapus."
                        secondMessage="Tindakan ini tidak bisa dibatalkan. Konfirmasi reset seluruh data pesanan?"
                        successMessage="Data antrean pesanan berhasil direset."
                        onReset={resetOrders}
                        showToast={showToast}
                    />
                    </React.Fragment>
                }
            />

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 mb-4"><Icons.CalendarDays size={32} className="text-slate-400"/></div>
                    <h3 className="text-xl font-bold text-slate-700">Belum Ada Pesanan</h3><p className="text-slate-500 mt-2 text-sm">Pesanan baru akan muncul di dashboard ini.</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center">
                    <Icons.Search size={32} className="text-slate-400 mb-4"/><h3 className="text-xl font-bold text-slate-700">Pencarian Tidak Ditemukan</h3><p className="text-slate-500 mt-2 text-sm">Tidak ada pesanan yang cocok dengan kata kunci tersebut.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredOrders.map(order => (
                        <div key={order.id} className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col group ${order.status === 'Selesai' ? 'bg-slate-50 border-slate-200 opacity-70' : order.status === 'Batal' ? 'bg-rose-50/50 border-rose-200 opacity-70' : 'bg-white border-brand-200 shadow-md shadow-brand-500/5 hover:border-brand-300'}`}>
                            <div className="flex justify-between items-start mb-5 relative z-10">
                                <div className="flex items-center space-x-3"><div className="bg-slate-100 p-2 rounded-xl border border-slate-200"><Icons.User size={16} className="text-slate-500" /></div><span className="font-bold text-slate-800 tracking-wide">{order.source}</span></div>
                                <div className="flex items-center space-x-2">{order.status === 'Pending' && <span className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse"></span>}<span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{order.status}</span></div>
                            </div>
                            <div className="relative z-10 flex-grow flex flex-col">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-xs text-slate-500 flex items-center font-bold"><Icons.Clock size={12} className="mr-1.5"/> {formatDate(order.date)}</p>
                                    <span className="text-[10px] text-slate-400 font-mono font-bold">ID: {order.id?.slice(0,4)}</span>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-5 flex-grow"><p className="text-slate-700 font-medium whitespace-pre-wrap text-sm leading-relaxed">{order.details}</p></div>
                                {order.total > 0 && (
                                    <div className="mb-5 p-4 bg-white border border-slate-100 rounded-2xl flex justify-between items-center text-xs shadow-sm">
                                        <div className="flex flex-col"><span className="text-slate-500 mb-1 font-medium">Total Harga</span><span className="font-bold text-emerald-600 text-sm">{formatRupiah(order.total)}</span></div>
                                        <div className="flex flex-col text-right"><span className="text-slate-500 mb-1 font-medium">Sisa Tagihan</span><span className="font-bold text-slate-800 text-sm">{formatRupiah(order.total - (order.dp || 0))}</span></div>
                                    </div>
                                )}
                                {order.status === 'Pending' && (
                                    <div className="flex space-x-3 mt-auto pt-4 border-t border-slate-100">
                                        <button onClick={() => handleStatus(order.id, 'Selesai')} className="btn btn-primary flex-1 py-2.5 text-xs">Tandai Selesai</button>
                                        <button onClick={() => handleStatus(order.id, 'Batal')} className="btn btn-ghost py-2.5 px-4 text-xs hover:text-rose-600 hover:bg-rose-50">Batal</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const KeuanganKambing = ({ goatSuppliers, updateSuppliers, addTransaction, addBahanBaku, balances, resetSuppliers, showToast }) => {
    const [mode, setMode] = useState('ambil');
    const [supplierId, setSupplierId] = useState(goatSuppliers[0]?.id || '');
    const [ambil, setAmbil] = useState({ jumlah: 1, prices: [''], metode: 'hutang', wallet: 'tunai' });
    const [bayar, setBayar] = useState({ amount: '', wallet: 'tunai' });
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (goatSuppliers.length > 0 && !goatSuppliers.find(s => s.id.toString() === supplierId.toString())) {
            setSupplierId(goatSuppliers[0].id);
        }
    }, [goatSuppliers, supplierId]);

    const activeSupplier = goatSuppliers.find(s => s.id.toString() === supplierId.toString()) || null;
    const sisaHutang = Number(activeSupplier?.hutang) || 0;
    const totalAmbil = ambil.prices.reduce((sum, p) => sum + unformatRibuan(p), 0);
    const nominalBayar = unformatRibuan(bayar.amount);
    const kelebihanBayar = Math.max(0, nominalBayar - Math.max(0, sisaHutang));

    const riwayatGabungan = useMemo(() => {
        const rows = [];
        goatSuppliers.forEach((s) => {
            (s.history || []).forEach((h) => rows.push({ ...h, supplierName: s.name, supplierId: s.id }));
        });
        return rows.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [goatSuppliers]);

    const setJumlahKambing = (raw) => {
        const n = Math.max(0, Math.min(50, parseInt(raw, 10) || 0));
        setAmbil((prev) => {
            const prices = Array.from({ length: n }, (_, i) => prev.prices[i] || '');
            return { ...prev, jumlah: n, prices };
        });
    };

    const setHarga = (index, value) => {
        setAmbil((prev) => {
            const prices = [...prev.prices];
            prices[index] = formatRibuanInput(value);
            return { ...prev, prices };
        });
    };

    const handleAddSupplier = (e) => {
        e.preventDefault(); if(!newName.trim()) return;
        const newSupplier = { id: Date.now().toString(), name: newName.trim(), hutang: 0, lastTx: null, history: [] };
        updateSuppliers([...goatSuppliers, newSupplier]); 
        setNewName(''); setIsAdding(false); showToast(`Pedagang ditambahkan.`); setSupplierId(newSupplier.id);
    };

    const handleDeleteSupplier = (id) => {
        if(confirmDelete === id) { 
            updateSuppliers(goatSuppliers.filter(s => s.id !== id)); 
            setConfirmDelete(null); showToast(`Pedagang dihapus.`); 
        } else { setConfirmDelete(id); setTimeout(() => setConfirmDelete(null), 3000); }
    };

    const pushHistory = (supplier, entry) => goatSuppliers.map((s) => {
        if (s.id.toString() !== supplier.id.toString()) return s;
        return { ...s, hutang: entry.sisaHutang, lastTx: entry.date, history: [entry, ...(s.history || [])].slice(0, 200) };
    });

    // ALUR A: pengambilan kambing (hutang atau bayar lunas)
    const submitAmbil = async (e) => {
        e.preventDefault();
        if (busy) return;
        if (!activeSupplier) return showToast('Tambah pedagang dulu!');
        if (!ambil.jumlah) return showToast('Isi jumlah kambing.');
        if (ambil.prices.some((p) => !unformatRibuan(p))) return showToast('Lengkapi harga tiap kambing.');
        const isLunas = ambil.metode === 'lunas';
        if (isLunas && !FUND_KEYS.includes(ambil.wallet)) return showToast('Pilih saldo pembayaran.');
        if (isLunas && (Number(balances?.[ambil.wallet]) || 0) < totalAmbil) {
            return showToast(`Saldo ${fundLabel(ambil.wallet)} hanya ${formatRupiah(balances?.[ambil.wallet] || 0)}.`);
        }

        setBusy(true);
        try {
            const dateStr = new Date().toISOString();
            const rincian = ambil.prices.map((p, i) => `Kambing ${i + 1}: ${formatRupiah(unformatRibuan(p))}`).join(', ');
            const nextHutang = isLunas ? sisaHutang : sisaHutang + totalAmbil;

            updateSuppliers(pushHistory(activeSupplier, {
                id: Date.now().toString(),
                date: dateStr,
                type: 'ambil',
                jumlah: ambil.jumlah,
                metode: ambil.metode,
                wallet: isLunas ? ambil.wallet : null,
                amount: totalAmbil,
                rincian,
                sisaHutang: nextHutang
            }));

            await addTransaction(isLunas
                ? { date: dateStr, type: 'pengeluaran', amount: totalAmbil, wallet: ambil.wallet, kategori: 'Bahan Baku', desc: `Ambil ${ambil.jumlah} kambing (lunas): ${activeSupplier.name}` }
                : { date: dateStr, type: 'hutang_kambing', amount: totalAmbil, desc: `Ambil ${ambil.jumlah} kambing (hutang): ${activeSupplier.name}` }
            );

            await addBahanBaku({
                date: dateStr,
                nama: 'Kambing',
                jumlah: ambil.jumlah,
                satuan: 'Ekor',
                total: totalAmbil,
                sumber: 'Suplier Kambing',
                supplier: activeSupplier.name,
                rincian,
                wallet: isLunas ? ambil.wallet : null,
                createdAt: dateStr
            });

            setAmbil({ jumlah: 1, prices: [''], metode: ambil.metode, wallet: ambil.wallet });
            showToast(isLunas
                ? `${ambil.jumlah} kambing lunas. Saldo ${fundLabel(ambil.wallet)} berkurang ${formatRupiah(totalAmbil)}.`
                : `${ambil.jumlah} kambing dicatat sebagai hutang ${formatRupiah(totalAmbil)}.`);
        } finally { setBusy(false); }
    };

    // ALUR B: pembayaran hutang pedagang
    const submitBayar = async (e) => {
        e.preventDefault();
        if (busy) return;
        if (!activeSupplier) return showToast('Tambah pedagang dulu!');
        if (!nominalBayar) return showToast('Masukkan nominal pembayaran.');
        if (!FUND_KEYS.includes(bayar.wallet)) return showToast('Pilih saldo sumber dana.');
        if ((Number(balances?.[bayar.wallet]) || 0) < nominalBayar) {
            return showToast(`Saldo ${fundLabel(bayar.wallet)} hanya ${formatRupiah(balances?.[bayar.wallet] || 0)}.`);
        }

        setBusy(true);
        try {
            const dateStr = new Date().toISOString();
            const nextHutang = sisaHutang - nominalBayar;

            updateSuppliers(pushHistory(activeSupplier, {
                id: Date.now().toString(),
                date: dateStr,
                type: 'bayar',
                amount: nominalBayar,
                wallet: bayar.wallet,
                rincian: `Pembayaran via ${fundLabel(bayar.wallet)}`,
                sisaHutang: nextHutang
            }));

            await addTransaction({ date: dateStr, type: 'pengeluaran', amount: nominalBayar, wallet: bayar.wallet, desc: `Bayar hutang kambing: ${activeSupplier.name}` });

            setBayar({ amount: '', wallet: bayar.wallet });
            showToast(nextHutang < 0
                ? `Pembayaran tercatat. Kelebihan bayar ${formatRupiah(Math.abs(nextHutang))}.`
                : `Pembayaran ${formatRupiah(nominalBayar)} tercatat. Sisa hutang ${formatRupiah(nextHutang)}.`);
        } finally { setBusy(false); }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                title="Suplier Kambing"
                subtitle="Dua alur: ambil kambing (hutang / bayar lunas) dan bayar hutang pedagang."
                actions={isAdding ? (
                    <form onSubmit={handleAddSupplier} className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200">
                        <input autoFocus type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nama..." className="w-40 text-sm px-3 py-2 outline-none font-bold text-slate-800 bg-transparent placeholder-slate-400"/>
                        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors"><Icons.CheckCircle size={16}/></button>
                        <button type="button" onClick={() => setIsAdding(false)} className="bg-slate-100 text-slate-500 hover:bg-slate-200 p-2 rounded-lg transition-colors"><Icons.X size={16}/></button>
                    </form>
                ) : (
                    <React.Fragment>
                        <Btn variant="soft" icon={Icons.Plus} onClick={() => setIsAdding(true)}>Tambah Suplier</Btn>
                        <ResetDataControl
                            title="Reset Data Suplier"
                            firstMessage="Yakin ingin reset seluruh data suplier? Semua pedagang, sisa hutang, dan riwayat transaksinya akan dihapus."
                            secondMessage="Tindakan ini tidak bisa dibatalkan. Konfirmasi reset seluruh data suplier?"
                            successMessage="Data suplier berhasil direset."
                            onReset={resetSuppliers}
                            showToast={showToast}
                        />
                    </React.Fragment>
                )}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                    {goatSuppliers.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm"><Icons.Beef size={48} className="mx-auto text-slate-300 mb-4"/><h3 className="text-xl font-bold text-slate-500">Belum Ada Pedagang</h3></div>
                    ) : (
                        goatSuppliers.map(supplier => (
                            <div key={supplier.id} className={`soft-card lift-card p-6 flex flex-col md:flex-row md:justify-between md:items-center relative group cursor-pointer ${supplier.id.toString() === supplierId.toString() ? 'border-brand-400 ring-1 ring-brand-400/40' : ''}`} onClick={() => setSupplierId(supplier.id)}>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteSupplier(supplier.id); }} className={`absolute top-4 right-4 p-2 rounded-lg text-white transition-all opacity-0 group-hover:opacity-100 ${confirmDelete === supplier.id ? 'bg-rose-500 animate-pulse opacity-100' : 'bg-slate-100 text-slate-400 hover:bg-rose-500 hover:text-white border border-slate-200'}`}>{confirmDelete === supplier.id ? <Icons.Trash2 size={14} /> : <Icons.X size={14} />}</button>
                                <div className="mb-4 md:mb-0"><h4 className="font-bold text-lg text-slate-800 flex items-center pr-10"><Icons.Beef size={18} className="mr-2 text-slate-400"/> {supplier.name}</h4><p className="text-xs text-slate-500 mt-1.5 flex items-center font-medium"><Icons.Clock size={12} className="mr-1"/> Update: {formatDate(supplier.lastTx)}</p></div>
                                <div className="md:text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        {supplier.hutang > 0 ? 'Sisa Hutang' : supplier.hutang < 0 ? 'Kembalian / Kelebihan Bayar' : 'Hutang Lunas'}
                                    </p>
                                    <div className={`text-xl font-bold px-4 py-2 rounded-xl inline-flex items-center border ${supplier.hutang > 0 ? 'bg-rose-50 text-rose-600 border-rose-200' : supplier.hutang < 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                        {supplier.hutang > 0 && <Icons.TrendingDown size={18} className="mr-2" />}
                                        {supplier.hutang < 0 && <Icons.TrendingUp size={18} className="mr-2" />}
                                        {supplier.hutang > 0 ? '-' : supplier.hutang < 0 ? '+' : ''}{formatRupiah(Math.abs(supplier.hutang))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                    <div className="lg:col-span-5 soft-card p-6 md:p-8 h-fit sticky top-6">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100"><IconTile icon={Icons.ArrowRightLeft} /><h3 className="text-lg font-bold text-slate-800">Transaksi Pedagang</h3></div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Pilih Pedagang</label>
                            <select className="field-input font-bold" value={supplierId} onChange={e => setSupplierId(e.target.value)} disabled={goatSuppliers.length === 0}>
                                {goatSuppliers.length === 0 && <option value="">Kosong...</option>}
                                {goatSuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button type="button" onClick={() => setMode('ambil')} className={`border rounded-2xl p-4 flex flex-col items-center text-center transition-all ${mode === 'ambil' ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500/50' : 'border-slate-200 bg-white hover:border-brand-300'}`}>
                                <Icons.Beef size={20} className={mode === 'ambil' ? 'text-brand-600 mb-2' : 'text-slate-400 mb-2'}/>
                                <span className={`text-xs font-bold ${mode === 'ambil' ? 'text-brand-700' : 'text-slate-500'}`}>Ambil Kambing</span>
                            </button>
                            <button type="button" onClick={() => setMode('bayar')} className={`border rounded-2xl p-4 flex flex-col items-center text-center transition-all ${mode === 'bayar' ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/50' : 'border-slate-200 bg-white hover:border-emerald-300'}`}>
                                <Icons.DollarSign size={20} className={mode === 'bayar' ? 'text-emerald-600 mb-2' : 'text-slate-400 mb-2'}/>
                                <span className={`text-xs font-bold ${mode === 'bayar' ? 'text-emerald-700' : 'text-slate-500'}`}>Bayar Hutang</span>
                            </button>
                        </div>

                        {mode === 'ambil' ? (
                            <form onSubmit={submitAmbil} className="space-y-4 animate-fade-in">
                                <div>
                                    <label className="field-label">Jumlah kambing (ekor)</label>
                                    <input type="number" min="1" max="50" className="field-input font-bold" value={ambil.jumlah} onChange={(e) => setJumlahKambing(e.target.value)} disabled={goatSuppliers.length === 0} />
                                </div>

                                {ambil.prices.length > 0 && (
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-700">Harga per ekor</p>
                                        {ambil.prices.map((p, i) => (
                                            <div key={i}>
                                                <label className="field-label">Harga Kambing {i + 1}</label>
                                                <input type="text" inputMode="numeric" className="field-input" placeholder="0" value={p} onChange={(e) => setHarga(i, e.target.value)} />
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Total harga</span>
                                            <span className="font-bold text-slate-800">{formatRupiah(totalAmbil)}</span>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="field-label">Metode pembayaran</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button type="button" onClick={() => setAmbil({ ...ambil, metode: 'hutang' })} className={`border rounded-2xl py-3 text-xs font-bold transition-all ${ambil.metode === 'hutang' ? 'border-rose-400 bg-rose-50 text-rose-600 ring-1 ring-rose-400/40' : 'border-slate-200 bg-white text-slate-500 hover:border-rose-300'}`}>Hutang</button>
                                        <button type="button" onClick={() => setAmbil({ ...ambil, metode: 'lunas' })} className={`border rounded-2xl py-3 text-xs font-bold transition-all ${ambil.metode === 'lunas' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/40' : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-300'}`}>Bayar Lunas</button>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-2">
                                        {ambil.metode === 'hutang'
                                            ? 'Total harga menambah hutang pedagang. Saldo kas tidak dipotong.'
                                            : 'Total harga langsung memotong saldo kas yang dipilih tanpa menambah hutang.'}
                                    </p>
                                </div>

                                {ambil.metode === 'lunas' && (
                                    <div className="animate-slide-down">
                                        <label className="field-label">Pilih saldo pembayaran</label>
                                        <FundSourcePills value={ambil.wallet} onChange={(wallet) => setAmbil({ ...ambil, wallet })} tone="rose" />
                                        <p className="text-[11px] text-slate-400 mt-2">Saldo {fundLabel(ambil.wallet)}: {formatRupiah(balances?.[ambil.wallet] || 0)}</p>
                                    </div>
                                )}

                                <button type="submit" disabled={goatSuppliers.length === 0 || busy} className="btn btn-primary w-full py-4">Simpan Pengambilan</button>
                                <p className="text-[11px] text-center text-slate-400">Rincian otomatis masuk ke Riwayat Bahan Baku.</p>
                            </form>
                        ) : (
                            <form onSubmit={submitBayar} className="space-y-4 animate-fade-in">
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                        {sisaHutang < 0 ? 'Kembalian / Kelebihan Bayar' : 'Sisa hutang saat ini'}
                                    </p>
                                    <p className={`text-2xl font-bold mt-1 ${sisaHutang > 0 ? 'text-rose-600' : sisaHutang < 0 ? 'text-emerald-600' : 'text-slate-700'}`}>{formatRupiah(Math.abs(sisaHutang))}</p>
                                </div>
                                <div>
                                    <label className="field-label">Nominal pembayaran (Rp)</label>
                                    <input type="text" inputMode="numeric" className="field-input font-bold" placeholder="0" value={bayar.amount} onChange={(e) => setBayar({ ...bayar, amount: formatRibuanInput(e.target.value) })} disabled={goatSuppliers.length === 0} />
                                </div>
                                <div>
                                    <label className="field-label">Pilih saldo sumber dana</label>
                                    <FundSourcePills value={bayar.wallet} onChange={(wallet) => setBayar({ ...bayar, wallet })} tone="rose" />
                                    <p className="text-[11px] text-slate-400 mt-2">Saldo {fundLabel(bayar.wallet)}: {formatRupiah(balances?.[bayar.wallet] || 0)}</p>
                                </div>
                                {kelebihanBayar > 0 && (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 animate-slide-down">
                                        <p className="text-sm font-bold text-emerald-700">Kembalian / Kelebihan Bayar: {formatRupiah(kelebihanBayar)}</p>
                                    </div>
                                )}
                                <button type="submit" disabled={goatSuppliers.length === 0 || busy} className="btn btn-success w-full py-4">Bayar Hutang</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="soft-card rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center gap-3">
                    <IconTile icon={Icons.ClipboardList} />
                    <div>
                        <h3 className="font-bold text-slate-800">Riwayat Transaksi Pedagang</h3>
                        <p className="text-xs text-slate-500">Rekam jejak pengambilan kambing, pembayaran, dan sisa hutang.</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm data-table">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Tanggal</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Pedagang</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Jenis</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Rincian</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest text-right">Nominal</th>
                                <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest text-right">Sisa Hutang</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {riwayatGabungan.length === 0 && (
                                <tr><td colSpan="6" className="p-10 text-center text-slate-400">Belum ada transaksi pedagang.</td></tr>
                            )}
                            {riwayatGabungan.map((h) => (
                                <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-slate-700 font-semibold whitespace-nowrap">{formatDate(h.date)}</td>
                                    <td className="p-4 text-slate-800 font-bold">{h.supplierName}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${h.type === 'ambil' ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                            {h.type === 'ambil' ? `Ambil ${h.jumlah} ekor${h.metode === 'lunas' ? ' (lunas)' : ' (hutang)'}` : 'Pembayaran'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs text-slate-500 max-w-xs">{h.rincian || '-'}</td>
                                    <td className="p-4 text-right font-bold text-slate-800">{formatRupiah(h.amount)}</td>
                                    <td className={`p-4 text-right font-bold ${h.sisaHutang > 0 ? 'text-rose-600' : h.sisaHutang < 0 ? 'text-emerald-600' : 'text-slate-500'}`}>
                                        {h.sisaHutang < 0 ? `Lebih bayar ${formatRupiah(Math.abs(h.sisaHutang))}` : formatRupiah(h.sisaHutang)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PengaturanPage = ({ menuItems, saveMenuItems, resetTransactions, transactionCount, showToast }) => {
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState({ name: '', price: '', priceKatering: '', desc: '' });
    const [confirmReset, setConfirmReset] = useState(false);
    const [resetting, setResetting] = useState(false);

    const startEdit = (item) => {
        setEditingId(item.id);
        setDraft({
            name: item.name,
            price: formatRibuanInput(item.price || 0),
            priceKatering: formatRibuanInput(item.priceKatering || 0),
            desc: item.desc || ''
        });
    };

    const cancelEdit = () => { setEditingId(null); setDraft({ name: '', price: '', priceKatering: '', desc: '' }); };

    const saveEdit = async (item) => {
        const price = unformatRibuan(draft.price);
        if (!draft.name.trim()) return showToast('Nama menu tidak boleh kosong.');
        if (!price) return showToast('Harga menu tidak boleh kosong.');
        const next = menuItems.map((m) => m.id !== item.id ? m : {
            ...m,
            name: draft.name.trim(),
            price,
            desc: draft.desc.trim(),
            ...(m.type === 'sateayam' ? { priceKatering: unformatRibuan(draft.priceKatering) } : {})
        });
        await saveMenuItems(next);
        cancelEdit();
        showToast(`${draft.name.trim()} diperbarui. Harga baru langsung berlaku di halaman pesanan.`);
    };

    const doReset = async () => {
        if (resetting) return;
        setResetting(true);
        try {
            await resetTransactions();
            setConfirmReset(false);
            showToast('Semua data transaksi dihapus dan saldo dikembalikan ke 0.');
        } finally { setResetting(false); }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <PageHeader
                badge="Konfigurasi sistem"
                title="Pengaturan"
                subtitle="Ubah nama dan harga menu, serta kelola data transaksi aplikasi."
            />

            <div className="soft-card rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center gap-3">
                    <IconTile icon={Icons.Utensils} />
                    <div>
                        <h3 className="font-bold text-slate-800">Pengaturan Harga Menu</h3>
                        <p className="text-xs text-slate-500">Harga yang disimpan otomatis dipakai saat menghitung total di halaman Order Baru.</p>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {menuItems.map((item) => (
                        <div key={item.id} className="p-5">
                            {editingId === item.id ? (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="field-label">Nama menu</label>
                                            <input type="text" className="field-input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="field-label">Harga {item.type === 'kotakan' ? 'per box' : item.type === 'sateayam' ? 'umum per tusuk' : '(Rp)'}</label>
                                            <input type="text" inputMode="numeric" className="field-input" value={draft.price} onChange={(e) => setDraft({ ...draft, price: formatRibuanInput(e.target.value) })} />
                                        </div>
                                        {item.type === 'sateayam' && (
                                            <div>
                                                <label className="field-label">Harga katering per tusuk</label>
                                                <input type="text" inputMode="numeric" className="field-input" value={draft.priceKatering} onChange={(e) => setDraft({ ...draft, priceKatering: formatRibuanInput(e.target.value) })} />
                                            </div>
                                        )}
                                        <div className={item.type === 'sateayam' ? '' : 'md:col-span-2'}>
                                            <label className="field-label">Keterangan</label>
                                            <input type="text" className="field-input" value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => saveEdit(item)} className="btn btn-primary">Simpan Perubahan</button>
                                        <button type="button" onClick={cancelEdit} className="btn btn-ghost">Batal</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="font-bold text-slate-800">{item.name}</p>
                                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-brand-700 text-sm text-right">{menuPriceLabel(item)}</p>
                                        <button type="button" onClick={() => startEdit(item)} className="btn btn-ghost text-xs">
                                            <Icons.Pencil size={14}/> Edit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-6">
                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 border border-rose-200"><Icons.AlertTriangle size={18}/></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-rose-700">Zona Berbahaya</h3>
                        <p className="text-sm text-rose-600/80 mt-1">Menghapus seluruh riwayat transaksi ({transactionCount} catatan) dan mengembalikan semua saldo ke Rp 0. Tindakan ini permanen.</p>
                        <button type="button" onClick={() => setConfirmReset(true)} className="btn btn-danger mt-4">
                            <Icons.Trash2 size={16}/> Reset Semua Transaksi
                        </button>
                    </div>
                </div>
            </div>

            {confirmReset && (
                <div className="modal-overlay">
                    <div className="modal-panel">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 border border-rose-200"><Icons.AlertTriangle size={20}/></div>
                            <h3 className="text-xl font-bold text-slate-800">Reset Semua Transaksi</h3>
                        </div>
                        <p className="text-sm text-slate-600">Apakah Anda yakin ingin menghapus semua data transaksi? Tindakan ini tidak bisa dibatalkan.</p>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setConfirmReset(false)} className="btn btn-ghost flex-1">Tidak</button>
                            <button type="button" onClick={doReset} disabled={resetting} className="btn btn-danger flex-1">{resetting ? 'Menghapus...' : 'Ya, Reset'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- NAVIGASI SIDEBAR ---
const NAV_GROUPS = [
    {
        title: 'Utama',
        icon: Icons.LayoutDashboard,
        items: [
            { id: 'beranda', icon: Icons.Activity, label: 'Dashboard' },
            { id: 'transaksi', icon: Icons.ArrowRightLeft, label: 'Input Transaksi' },
            { id: 'saldo', icon: Icons.Wallet, label: 'Saldo' },
            { id: 'laporan', icon: Icons.FileText, label: 'Laporan' },
            { id: 'tanggungan', icon: Icons.ClipboardList, label: 'Tanggungan' },
            { id: 'bahan_baku', icon: Icons.Package, label: 'Riwayat Bahan Baku' }
        ]
    },
    {
        title: 'Operasional',
        icon: Icons.Briefcase,
        items: [
            { id: 'katering', icon: Icons.Briefcase, label: 'Mitra' },
            { id: 'tambah_pesanan', icon: Icons.Plus, label: 'Order Baru' },
            { id: 'jadwal_pesanan', icon: Icons.CalendarDays, label: 'Antrean', badgeKey: 'pending' }
        ]
    },
    { title: 'Eksternal', icon: Icons.Beef, items: [{ id: 'kambing', icon: Icons.Beef, label: 'Suplier' }] },
    { title: 'Sistem', icon: Icons.Settings, items: [{ id: 'pengaturan', icon: Icons.Settings, label: 'Pengaturan' }] }
];

const SidebarItem = ({ icon: IconComponent, label, id, badge, activeTab, onSelect }) => (
    <button onClick={() => onSelect(id)} className={`nav-item relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200 group ${activeTab === id ? 'is-active bg-[#0f6e6b] text-white shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}>
        <div className="flex items-center space-x-3"><IconComponent size={18} className={activeTab === id ? 'text-white' : 'text-slate-400 group-hover:text-white'} /><span className="font-semibold text-sm tracking-wide">{label}</span></div>
        {badge > 0 && <span className="w-5 h-5 flex items-center justify-center bg-white text-[#0f6e6b] text-[10px] font-bold rounded-full">{badge}</span>}
    </button>
);

// --- KOMPONEN UTAMA (APP) & FIREBASE INTEGRATION ---
function App() {
    // State User & UI
    const [authUser, setAuthUser] = useState(null); 
    const [activeTab, setActiveTab] = useState('beranda');
    const [globalSearchTerm, setGlobalSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [toastMessage, setToastMessage] = useState('');
    const [showToastObj, setShowToastObj] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const navRef = useRef(null);

    // State Database Cloud (Firebase)
    const [fbConfig, setFbConfig] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [catering, setCatering] = useState(initialCatering);
    const [orders, setOrders] = useState([]);
    const [goatSuppliers, setGoatSuppliers] = useState(initialGoatSuppliers);
    const [balances, setBalances] = useState(initialBalances);
    const [tanggungan, setTanggungan] = useState([]);
    const [bahanBaku, setBahanBaku] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [menuItems, setMenuItems] = useState(defaultMenuItems);
    const balancesRef = useRef(initialBalances);
    const transfersRef = useRef([]);
    useEffect(() => { balancesRef.current = balances; }, [balances]);
    useEffect(() => { transfersRef.current = transfers; }, [transfers]);

    // 1. Inisialisasi Firebase Menggunakan Data Config Anda Sendiri
    useEffect(() => {
        let interval = setInterval(() => {
            if (window.FirebaseLib) {
                clearInterval(interval);
                try {
                    const { initializeApp, getFirestore, getAuth, signInAnonymously, onAuthStateChanged, doc, setDoc } = window.FirebaseLib;
                    
                    // INI ADALAH CONFIG ANDA ("caksabarmj-app")
                    const config = {
                        apiKey: "AIzaSyD_PNjLDEgBv_qA32RB9XvXb9ht-WIrDQY",
                        authDomain: "caksabarmj-app.firebaseapp.com",
                        projectId: "caksabarmj-app",
                        storageBucket: "caksabarmj-app.firebasestorage.app",
                        messagingSenderId: "1029641001193",
                        appId: "1:1029641001193:web:a18f55604ab494a84c3878",
                        measurementId: "G-M0BLFF00M8"
                    };

                    const app = initializeApp(config);
                    const auth = getAuth(app);
                    const db = getFirestore(app);
                    window.CaksabarAuth = auth;

                    onAuthStateChanged(auth, async (user) => {
                        if (!user) {
                            try { await signInAnonymously(auth); } catch (error) { console.error("Auth Error:", error); }
                            return;
                        }
                        setFbConfig({ db, user, auth, ...window.FirebaseLib });
                        if (user.isAnonymous) return;
                        const profile = {
                            name: user.displayName || 'Pengguna Google',
                            email: user.email || '',
                            role: 'admin',
                            provider: 'google'
                        };
                        setAuthUser((prev) => (prev?.uid === user.uid ? prev : { ...profile, uid: user.uid }));
                        try {
                            await setDoc(doc(db, 'users', user.uid), {
                                name: profile.name,
                                email: profile.email,
                                role: 'admin',
                                provider: 'google',
                                createdAt: user.metadata?.creationTime || new Date().toISOString(),
                                updatedAt: new Date().toISOString()
                            }, { merge: true });
                        } catch (error) {
                            console.error("Simpan profil Google gagal:", error);
                        }
                    });
                } catch(e) { console.error("Firebase Init Error:", e); }
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // 2. Sinkronisasi Data secara Real-Time (onSnapshot) menggunakan standar path Firestore baru
    useEffect(() => {
        if (!fbConfig || !fbConfig.user) return;
        const { db, collection, onSnapshot, doc } = fbConfig;

        // Penanganan Error Permissions tanpa memunculkan error berulang di Console
        const handleError = (err) => {
            console.error("Firestore Listen Error:", err);
        };

        // Listen Transactions
        const unsubTx = onSnapshot(collection(db, 'transactions'), (snap) => {
            const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
            data.sort((a,b) => new Date(b.date) - new Date(a.date));
            setTransactions(data);
        }, handleError);

        // Listen Orders
        const unsubOrders = onSnapshot(collection(db, 'orders'), (snap) => {
            const data = snap.docs.map(d => ({id: d.id, ...d.data()}));
            data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        }, handleError);

        // Listen Catering Config
        const unsubCat = onSnapshot(doc(db, 'settings', 'catering'), (d) => {
            if (d.exists() && d.data().data) { setCatering(d.data().data); } 
            else { setCatering(initialCatering); } // Fallback
        }, handleError);

        // Listen Suppliers
        const unsubSup = onSnapshot(doc(db, 'settings', 'suppliers'), (d) => {
            if (d.exists() && d.data().list) { setGoatSuppliers(d.data().list); } 
            else { setGoatSuppliers(initialGoatSuppliers); } // Fallback
        }, handleError);

        const unsubBal = onSnapshot(doc(db, 'settings', 'balances'), (d) => {
            setBalances(d.exists() ? sanitizeBalances(d.data()) : initialBalances);
        }, handleError);

        const unsubTanggungan = onSnapshot(doc(db, 'settings', 'tanggungan'), (d) => {
            if (d.exists() && Array.isArray(d.data().list)) { setTanggungan(d.data().list); }
            else { setTanggungan([]); }
        }, handleError);

        // Listen Riwayat Bahan Baku
        const unsubBahan = onSnapshot(collection(db, 'bahanbaku'), (snap) => {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setBahanBaku(data);
        }, handleError);

        // Listen Riwayat Transfer Antar Saldo
        const unsubTransfers = onSnapshot(doc(db, 'settings', 'transfers'), (d) => {
            if (d.exists() && Array.isArray(d.data().list)) { setTransfers(d.data().list); }
            else { setTransfers([]); }
        }, handleError);

        // Listen Pengaturan Harga Menu
        const unsubMenu = onSnapshot(doc(db, 'settings', 'menu'), (d) => {
            setMenuItems(mergeMenuItems(d.exists() ? d.data().list : null));
        }, handleError);

        return () => { unsubTx(); unsubOrders(); unsubCat(); unsubSup(); unsubBal(); unsubTanggungan(); unsubBahan(); unsubTransfers(); unsubMenu(); };
    }, [fbConfig]);


    // 3. Fungsi-fungsi untuk Menulis ke Database Cloud
    const addTransactionToCloud = async (newTx) => {
        if(!fbConfig) return;
        try {
            await fbConfig.addDoc(fbConfig.collection(fbConfig.db, 'transactions'), newTx);
            if (!newTx.skipBalance && FUND_KEYS.includes(newTx.wallet) && (newTx.type === 'pemasukan' || newTx.type === 'pengeluaran')) {
                const nextBalances = applyWalletDelta(balancesRef.current, newTx.wallet, newTx.type, Number(newTx.amount) || 0);
                balancesRef.current = nextBalances;
                await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'balances'), nextBalances);
            }
        } catch (e) { console.error(e); }
    };

    const deleteTransactionFromCloud = async (tx) => {
        if(!fbConfig || !tx?.id) return;
        try {
            await fbConfig.deleteDoc(fbConfig.doc(fbConfig.db, 'transactions', tx.id));
            if (!tx.skipBalance && FUND_KEYS.includes(tx.wallet) && (tx.type === 'pemasukan' || tx.type === 'pengeluaran')) {
                const reverseType = tx.type === 'pemasukan' ? 'pengeluaran' : 'pemasukan';
                const nextBalances = applyWalletDelta(balancesRef.current, tx.wallet, reverseType, Number(tx.amount) || 0);
                balancesRef.current = nextBalances;
                await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'balances'), nextBalances);
            }
        } catch (e) { console.error(e); }
    };

    const addOrderToCloud = async (newOrder) => {
        if(!fbConfig) return;
        try {
            await fbConfig.addDoc(fbConfig.collection(fbConfig.db, 'orders'), newOrder);
        } catch (e) { console.error(e); }
    };

    const updateOrderInCloud = async (id, updates) => {
        if(!fbConfig) return;
        try {
            await fbConfig.updateDoc(fbConfig.doc(fbConfig.db, 'orders', id), updates);
        } catch (e) { console.error(e); }
    };

    const updateCateringInCloud = async (newCateringData) => {
        if(!fbConfig) return;
        try {
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'catering'), { data: newCateringData });
        } catch (e) { console.error(e); }
    };

    const updateSuppliersInCloud = async (newSuppliers) => {
        if(!fbConfig) return;
        try {
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'suppliers'), { list: newSuppliers });
        } catch (e) { console.error(e); }
    };

    const saveBalancesToCloud = async (nextBalances) => {
        if(!fbConfig) return;
        try {
            const clean = sanitizeBalances({ ...nextBalances, updatedAt: nextBalances.updatedAt || new Date().toISOString() });
            balancesRef.current = clean;
            setBalances(clean);
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'balances'), clean);
        } catch (e) { console.error(e); }
    };

    const saveTanggunganToCloud = async (list) => {
        if(!fbConfig) return;
        try {
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'tanggungan'), { list });
        } catch (e) { console.error(e); }
    };

    const resetCateringInCloud = async () => {
        if(!fbConfig) return;
        setCatering({});
        await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'catering'), { data: {} });
    };

    const resetOrdersInCloud = async () => {
        if(!fbConfig) return;
        await Promise.all((orders || []).map((o) => fbConfig.deleteDoc(fbConfig.doc(fbConfig.db, 'orders', o.id))));
        setOrders([]);
    };

    const resetSuppliersInCloud = async () => {
        if(!fbConfig) return;
        setGoatSuppliers([]);
        await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'suppliers'), { list: [] });
    };

    const saveMenuItemsToCloud = async (list) => {
        if(!fbConfig) return;
        try {
            setMenuItems(list);
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'menu'), { list });
        } catch (e) { console.error(e); }
    };

    // Zona berbahaya: hapus semua transaksi lalu kembalikan seluruh saldo ke 0.
    const resetAllTransactions = async () => {
        if(!fbConfig) return;
        try {
            await Promise.all((transactions || []).map((t) => fbConfig.deleteDoc(fbConfig.doc(fbConfig.db, 'transactions', t.id))));
            const zeroed = sanitizeBalances({ updatedAt: new Date().toISOString() });
            balancesRef.current = zeroed;
            setBalances(zeroed);
            setTransactions([]);
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'balances'), zeroed);
        } catch (e) { console.error(e); }
    };

    const resetBahanBakuInCloud = async () => {
        if (!fbConfig) throw new Error('Firebase belum siap');
        await Promise.all((bahanBaku || []).map((b) => fbConfig.deleteDoc(fbConfig.doc(fbConfig.db, 'bahanbaku', b.id))));
        setBahanBaku([]);
    };

    const addBahanBakuToCloud = async (entry) => {
        if(!fbConfig) return;
        try {
            await fbConfig.addDoc(fbConfig.collection(fbConfig.db, 'bahanbaku'), entry);
        } catch (e) { console.error(e); }
    };

    const addTransferToCloud = async (entry) => {
        if(!fbConfig) return;
        try {
            const list = [entry, ...transfersRef.current].slice(0, 200);
            transfersRef.current = list;
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'transfers'), { list });
        } catch (e) { console.error(e); }
    };

    // --- Bantuan UI & Logic ---
    useEffect(() => {
        const handleClickOutside = (event) => { if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false); };
        document.addEventListener('mousedown', handleClickOutside);
        const handleResize = () => { if (window.innerWidth >= 768) setIsSidebarOpen(true); else setIsSidebarOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => { document.removeEventListener('mousedown', handleClickOutside); window.removeEventListener('resize', handleResize); }
    }, []);

    const showToast = (msg) => { setToastMessage(msg); setShowToastObj(true); setTimeout(() => setShowToastObj(false), 3000); };
    const pendingOrders = orders.filter(o => o.status === 'Pending');

    const stats = useMemo(() => {
        const calculate = (startDate) => {
            let omset = 0; let pengeluaran = 0;
            transactions.forEach(t => {
                const tDate = new Date(t.date);
                if (tDate >= startDate) { if (t.type === 'pemasukan') omset += t.amount; if (t.type === 'pengeluaran') pengeluaran += t.amount; }
            });
            return { omset, pengeluaran, laba: omset - pengeluaran };
        };
        return { hariIni: calculate(startOfDay), mingguIni: calculate(startOfWeek), bulanIni: calculate(startOfMonth), tahunIni: calculate(startOfYear) };
    }, [transactions]);

    // Posisi scroll sidebar disimpan supaya tidak melompat ke atas saat pindah menu.
    const handleNavScroll = (e) => writeLocal('sidebarScroll', String(e.currentTarget.scrollTop));
    useEffect(() => {
        if (!authUser || !navRef.current) return;
        const saved = Number(readLocal('sidebarScroll', '0')) || 0;
        if (saved > 0) navRef.current.scrollTop = saved;
    }, [authUser]);

    const handleTabClick = (id) => {
        if (navRef.current) writeLocal('sidebarScroll', String(navRef.current.scrollTop));
        setActiveTab(id);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };
    const handleGoogleLogin = async () => {
        const lib = window.FirebaseLib;
        const auth = window.CaksabarAuth;
        if (!auth || !lib?.signInWithPopup || !lib?.GoogleAuthProvider) {
            showToast('Koneksi belum siap. Muat ulang halaman, lalu coba lagi.');
            return;
        }
        try {
            const provider = new lib.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await lib.signInWithPopup(auth, provider);
            const firstVisit = result?.user?.metadata?.creationTime && result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
            showToast(firstVisit ? 'Akun Google berhasil didaftarkan.' : 'Berhasil masuk dengan Google.');
        } catch (error) {
            const code = error?.code || '';
            if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return;
            if (code === 'auth/operation-not-allowed') {
                showToast('Aktifkan penyedia Google di Firebase Authentication.');
                return;
            }
            if (code === 'auth/unauthorized-domain') {
                showToast('Buka aplikasi lewat localhost atau domain yang diizinkan Firebase.');
                return;
            }
            showToast('Gagal masuk dengan Google.');
            console.error(error);
        }
    };

    const handleLogout = async () => {
        setAuthUser(null);
        setActiveTab('beranda');
        const auth = window.CaksabarAuth;
        const lib = window.FirebaseLib;
        if (auth?.currentUser && !auth.currentUser.isAnonymous && lib?.signOut) {
            try {
                await lib.signOut(auth);
            } catch (error) {
                console.error(error);
            }
        }
        showToast('Berhasil keluar dari sistem.');
    };

    useEffect(() => { if (authUser) { setActiveTab('beranda'); } }, [authUser]);

    // Tampilan Login
    if (!authUser) {
        return (
            <div className="h-screen w-full flex font-sans text-slate-800 overflow-hidden bg-white">
                <Toast message={toastMessage} isVisible={showToastObj} />
                <LoginScreen onLogin={setAuthUser} onGoogle={handleGoogleLogin} showToast={showToast} />
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-slate-50 flex font-sans text-slate-700 selection:bg-brand-400/25 overflow-hidden">
            <Toast message={toastMessage} isVisible={showToastObj} />

            {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden animate-overlay" onClick={() => setIsSidebarOpen(false)}/>}

            {/* Sidebar Navigation */}
            <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-[#0b1f33] text-white flex flex-col flex-shrink-0 transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-ml-64 shadow-none'} shadow-[8px_0_32px_rgba(11,31,51,0.28)] md:shadow-none`}>
                <div className="px-5 pt-6 pb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <svg className="w-9 h-9 flex-none" viewBox="0 0 36 36" aria-hidden="true">
                            <rect x="3" y="18" width="6" height="14" rx="1.5" fill="#5eead4" />
                            <rect x="13" y="10" width="6" height="22" rx="1.5" fill="#2dd4bf" />
                            <rect x="23" y="4" width="6" height="28" rx="1.5" fill="#99f6e4" />
                        </svg>
                        <div>
                            <h1 className="text-lg font-extrabold tracking-tight text-white leading-none">CAKSABAR</h1>
                            <p className="text-[11px] text-slate-300 mt-1">Manajemen Keuangan</p>
                        </div>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-300 hover:text-white transition-colors p-1"><Icons.X size={18}/></button>
                </div>
                
                <nav ref={navRef} onScroll={handleNavScroll} className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar sidebar-scroll">
                    {NAV_GROUPS.map((group, groupIndex) => (
                        <React.Fragment key={group.title}>
                            {groupIndex > 0 && <div className="my-3 border-t border-white/10 mx-3"></div>}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3 flex items-center"><group.icon size={12} className="mr-2"/> {group.title}</p>
                            {group.items.map((item) => (
                                <SidebarItem
                                    key={item.id}
                                    id={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    badge={item.badgeKey === 'pending' ? pendingOrders.length : 0}
                                    activeTab={activeTab}
                                    onSelect={handleTabClick}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </nav>
                
                <div className="px-4 pb-5 pt-2">
                    <div className="flex items-center space-x-3 px-1 mb-3">
                        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"><Icons.User size={16} className="text-teal-200"/></div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">{authUser.name}</p>
                            <p className="text-[11px] text-slate-400">{authUser.role === 'admin' ? 'Owner / Admin' : 'Staf Warung'}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full py-2.5 rounded-full border border-white/25 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Keluar</button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 page-shell h-screen relative transition-all duration-300">
                <header className="flex-shrink-0 px-4 md:px-6 py-4 flex justify-between items-center z-20 bg-transparent sticky top-0">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-brand-600 transition-colors" title="Toggle Menu"><Icons.Menu size={22} /></button>
                        <div className="hidden sm:flex items-center"><h2 className="text-xs font-bold text-slate-400 flex items-center"><Icons.Clock size={12} className="mr-2 text-brand-500"/> {formatDate(today.toISOString())}</h2></div>
                        {!isSidebarOpen && (
                            <div className="sm:hidden flex items-center space-x-2 ml-1 animate-fade-in"><h1 className="text-base font-extrabold text-slate-800 tracking-wide">CAKSABAR</h1></div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4 animate-fade-in">
                        <div className="hidden md:flex relative">
                            <Icons.Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Cari ID pesanan..." value={globalSearchTerm} onChange={(e) => { const term = e.target.value; setGlobalSearchTerm(term); if (term.trim() !== '') { const lowerTerm = term.toLowerCase(); const matchOrder = orders.some(o => o.id.toString().includes(lowerTerm) || (o.source || '').toLowerCase().includes(lowerTerm)); if (matchOrder) setActiveTab('jadwal_pesanan'); else setActiveTab('laporan'); } }} className="bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 w-56 lg:w-64 transition-all placeholder-slate-400 shadow-sm" />
                        </div>
                        <div className="relative" ref={notifRef}>
                            <button onClick={() => setIsNotifOpen(!isNotifOpen)} className={`relative p-2.5 rounded-full transition-colors border shadow-sm ${isNotifOpen ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-white text-slate-500 border-slate-200 hover:text-brand-700'}`}><Icons.Bell size={18} />{pendingOrders.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full bell-live"></span>}</button>
                            {isNotifOpen && (
                                <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden z-50 animate-modal-in origin-top-right">
                                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50"><h4 className="font-bold text-slate-800 text-sm">Pesanan Menunggu</h4><span className="text-xs bg-brand-100 border border-brand-200 text-brand-700 px-2 py-0.5 rounded-full font-bold">{pendingOrders.length}</span></div>
                                    <div className="max-h-72 overflow-y-auto custom-scrollbar">
                                        {pendingOrders.length === 0 ? <div className="p-8 text-center flex flex-col items-center"><Icons.CheckCircle size={24} className="text-emerald-500 mb-2"/><p className="text-sm text-slate-500 font-medium">Semua pesanan sudah selesai.</p></div> : pendingOrders.map(po => (
                                            <div key={po.id} onClick={() => { setActiveTab('jadwal_pesanan'); setGlobalSearchTerm(po.id.toString()); setIsNotifOpen(false); }} className="p-4 border-b border-slate-50 hover:bg-brand-50 cursor-pointer transition-colors group">
                                                <div className="flex justify-between items-start mb-1"><p className="text-sm font-bold text-slate-800 group-hover:text-brand-700 transition-colors">{po.source}</p><span className="text-[10px] text-slate-400 font-mono font-bold">#{po.id?.slice(0,4)}</span></div>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{po.details}</p><p className="text-[10px] text-brand-600 mt-2 flex items-center font-bold"><Icons.Clock size={10} className="mr-1"/>{formatDate(po.date)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {pendingOrders.length > 0 && <div className="p-2 border-t border-slate-100 bg-slate-50"><button onClick={() => { setActiveTab('jadwal_pesanan'); setIsNotifOpen(false); }} className="w-full py-2 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">Lihat Semua Jadwal</button></div>}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex-1 relative w-full overflow-hidden">
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'beranda' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><Beranda stats={stats} transactions={transactions} setTab={setActiveTab} orders={orders} balances={balances} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'transaksi' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><Transaksi addTransaction={addTransactionToCloud} addBahanBaku={addBahanBakuToCloud} balances={balances} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'saldo' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><SaldoPage balances={balances} saveBalances={saveBalancesToCloud} transfers={transfers} addTransfer={addTransferToCloud} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'laporan' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><Laporan transactions={transactions} searchTerm={globalSearchTerm} setSearchTerm={setGlobalSearchTerm} onDelete={deleteTransactionFromCloud} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'tanggungan' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><TanggunganPage items={tanggungan} saveItems={saveTanggunganToCloud} addTransaction={addTransactionToCloud} balances={balances} saveBalances={saveBalancesToCloud} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'bahan_baku' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><RiwayatBahanBaku bahanBaku={bahanBaku} onReset={resetBahanBakuInCloud} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'katering' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><KeuanganKatering catering={catering} updateCatering={updateCateringInCloud} addTransaction={addTransactionToCloud} orders={orders} balances={balances} resetCatering={resetCateringInCloud} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'tambah_pesanan' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><FormTambahPesanan addOrder={addOrderToCloud} addTransaction={addTransactionToCloud} catering={catering} balances={balances} menuItems={menuItems} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'jadwal_pesanan' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><JadwalPesanan orders={orders} updateOrder={updateOrderInCloud} catering={catering} updateCatering={updateCateringInCloud} addTransaction={addTransactionToCloud} resetOrders={resetOrdersInCloud} showToast={showToast} searchTerm={globalSearchTerm} setSearchTerm={setGlobalSearchTerm} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'kambing' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><KeuanganKambing goatSuppliers={goatSuppliers} updateSuppliers={updateSuppliersInCloud} addTransaction={addTransactionToCloud} addBahanBaku={addBahanBakuToCloud} balances={balances} resetSuppliers={resetSuppliersInCloud} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'pengaturan' ? 'block page-enter' : 'hidden'}`}><div className="max-w-6xl mx-auto"><PengaturanPage menuItems={menuItems} saveMenuItems={saveMenuItemsToCloud} resetTransactions={resetAllTransactions} transactionCount={transactions.length} showToast={showToast} /></div></div>
                </div>
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


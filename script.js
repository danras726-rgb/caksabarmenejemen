const { useState, useMemo, useEffect, useRef } = React;

// --- KOMPONEN IKON ---
const Icon = ({ path, size=20, className="" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} dangerouslySetInnerHTML={{__html: path}} />
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
    ClipboardList: (props) => <Icon path='<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>' {...props} />
};

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
    { key: 'bsi', label: 'BSI' },
    { key: 'seabank', label: 'SeaBank' }
];
const FUND_KEYS = FUND_SOURCES.map((s) => s.key);
const fundLabel = (key) => (FUND_SOURCES.find((s) => s.key === key) || {}).label || key;
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
const emptyWalletBag = () => ({ tunai: 0, bca: 0, bsi: 0, seabank: 0 });
const SALDO_WIDGETS = [
    { key: 'tunai', name: 'Saldo Tunai', tone: 'from-stone-700 to-stone-900' },
    { key: 'bca', name: 'Saldo BCA', tone: 'from-blue-700 to-blue-900' },
    { key: 'bsi', name: 'Saldo BSI', tone: 'from-teal-700 to-emerald-900' },
    { key: 'seabank', name: 'Saldo SeaBank', tone: 'from-orange-600 to-amber-800' },
    { key: 'modalAwal', name: 'Modal Awal', tone: 'from-brand-700 to-brand-900' }
];

// --- DEFAULT DATA JIKA DATABASE KOSONG ---
const initialCatering = {
    Salsa: { saldo: 0, history: [] }, Kurnia: { saldo: 0, history: [] }
};
const initialGoatSuppliers = [
    { id: 1, name: 'Pak Haji Rohman', hutang: 0, lastTx: null }
];
const initialBalances = { tunai: 0, bca: 0, bsi: 0, seabank: 0, modalAwal: 0, updatedAt: null };

const menuPackages = [
    { id: 1, name: 'Paket Hemat', price: 'Rp 2.25jt', desc: '1 Ekor, 400 Sate, 1 Panci Gule' },
    { id: 2, name: 'Paket Sedang', price: 'Rp 2.5jt', desc: '1 Ekor, 500 Sate, 1 Panci Gule' },
    { id: 3, name: 'Paket Besar', price: 'Rp 3.0jt', desc: '1 Ekor, 700 Sate, 1.5 Panci Gule' },
    { id: 4, name: 'Jasa Masak', price: 'Rp 850rb', desc: 'Kambing Bawa Sendiri' },
    { id: 5, name: 'Jasa K. Guling', price: 'Rp 1.2jt', desc: 'K. Bawa Sendiri (Bakar & Iris)' },
    { id: 6, name: 'K. Guling (Full)', price: 'Rp 2.5jt', desc: 'Kambing Dari Kami (Beres)' },
    { id: 7, name: 'Layanan Kotakan', price: '+Rp 10rb/box', desc: 'Nasi, Sate, Gule, Acar, Krupuk' },
    { id: 8, name: 'Sate Ayam', price: 'Rp 1rb - 1.2rb/tsk', desc: 'Umum: 1.2rb | Katering: 1rb' },
];

// --- KOMPONEN BANTUAN UI ---
const Toast = ({ message, isVisible }) => (
    <div className={`fixed top-5 right-5 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-white border border-slate-100 text-slate-800 px-6 py-3 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center space-x-3">
            <Icons.CheckCircle size={20} className="text-emerald-500" />
            <span className="font-medium text-sm tracking-wide">{message}</span>
        </div>
    </div>
);

// --- KOMPONEN LOGIN ---
const LoginScreen = ({ onLogin, showToast }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Login Level Aplikasi (Gatekeeper)
        if (username === 'owner' && password === '123') {
            onLogin({ name: 'Bpk. Owner', role: 'admin' });
            showToast('Berhasil login sebagai Owner');
        } else if (username === 'pegawai' && password === '123') {
            onLogin({ name: 'Staf Warung', role: 'staff' });
            showToast('Berhasil login sebagai Pegawai');
        } else {
            showToast('Username atau password salah!');
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-cream-100 p-4">
            <div className="bg-white w-full max-w-md rounded-3xl border border-cream-200 shadow-xl shadow-stone-200/50 p-8 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex bg-brand-600 text-white p-3 rounded-2xl shadow-sm mb-4">
                        <Icons.Utensils size={28} />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-800">SateGule<sup className="text-xs text-brand-500">®</sup></h1>
                    <p className="text-sm text-slate-500 mt-2">Sistem Manajemen Terkoneksi Cloud</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Icons.User size={18} className="text-slate-400" />
                            </div>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Ketik: owner / pegawai" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm text-slate-800 transition-all font-medium" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Icons.Briefcase size={18} className="text-slate-400" />
                            </div>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Ketik: 123" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm text-slate-800 transition-all font-medium" />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold transition-all shadow-md shadow-brand-500/20 mt-2">Masuk ke Sistem</button>
                </form>
            </div>
        </div>
    );
};

// --- KOMPONEN TAB ---

const Beranda = ({ stats, transactions, setTab, orders, balances }) => {
    const [filterPesanan, setFilterPesanan] = useState('Semua'); 
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
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-semibold text-brand-600 uppercase tracking-widest bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">Ringkasan</span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center"><Icons.Activity size={12} className="mr-1"/> Cloud Sync Active</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Saldo</h2>
                </div>
                <button onClick={() => setTab('transaksi')} className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center transition-all shadow-lg shadow-brand-500/30">
                    <Icons.Plus size={16} className="mr-2"/> Input Transaksi
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {SALDO_WIDGETS.map((item) => (
                    <div key={item.key} className={`rounded-3xl p-5 text-white bg-gradient-to-br ${item.tone} shadow-lg relative overflow-hidden`}>
                        <div className="absolute -right-6 -bottom-8 w-24 h-24 bg-white/10 rounded-full"></div>
                        <p className="text-[11px] uppercase tracking-widest font-bold text-white/70">{item.name}</p>
                        <p className="text-xl md:text-2xl font-black mt-3 tracking-tight">{formatRupiah(balances?.[item.key] || 0)}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: 'Omset Hari Ini', value: stats.hariIni.omset, color: 'text-emerald-700' },
                    { title: 'Pengeluaran Hari Ini', value: stats.hariIni.pengeluaran, color: 'text-rose-600' },
                    { title: 'Laba Bulan Ini', value: stats.bulanIni.laba, color: 'text-brand-700' }
                ].map((item) => (
                    <div key={item.title} className="soft-card rounded-3xl p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{item.title}</p>
                        <p className={`text-xl font-black mt-2 ${item.color}`}>{formatRupiah(item.value)}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-7 flex flex-col justify-between">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-6 gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 flex items-center"><Icons.BarChart3 size={18} className="mr-2 text-brand-500"/> Rata-rata Omset</h3>
                            <p className="text-xs text-slate-500 mt-1">Pemasukan harian {omsetMonth.monthTitle} · rata-rata dari {omsetMonth.todayDate} hari berjalan</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Rata-rata / hari</p>
                            <p className="text-xl font-black text-brand-700">{formatRupiah(omsetMonth.avg)}</p>
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
                                <div className="relative mx-px bg-gradient-to-t from-brand-100 to-brand-500 rounded-t-md transition-all duration-500" style={{ height: `${Math.max((item.amount / omsetMonth.maxAmount) * 100, item.amount > 0 ? 4 : 0)}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                        <span>Tgl 1</span>
                        <span>Total omset bulan ini {formatRupiah(omsetMonth.total)}</span>
                        <span>Tgl {omsetMonth.daysInMonth}</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-brand-600 to-blue-800 rounded-3xl border border-brand-500 shadow-lg shadow-brand-500/20 p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="flex items-center space-x-2">
                            <Icons.Utensils size={18} className="text-white"/>
                            <span className="font-bold text-white tracking-wide">SateGule<sup className="text-brand-200">®</sup></span>
                        </div>
                        <span className="bg-white/20 text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">Tahunan</span>
                    </div>
                    <div className="relative z-10 mb-8">
                        <h3 className="text-2xl font-bold text-white mb-3">Ringkasan Portofolio</h3>
                        <p className="text-brand-100 text-sm leading-relaxed">Pantau total akumulasi aset dan pertumbuhan bisnis Anda secara menyeluruh dalam tahun ini.</p>
                    </div>
                    <div className="space-y-4 relative z-10 mt-auto">
                        <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md">
                            <p className="text-brand-100 text-xs mb-1">Total Omset</p>
                            <p className="text-lg font-bold text-white">{formatRupiah(stats.tahunIni.omset)}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md flex justify-between items-center">
                            <div>
                                <p className="text-brand-100 text-xs mb-1">Laba Bersih</p>
                                <p className="text-xl font-bold text-white">{formatRupiah(stats.tahunIni.laba)}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                                <Icons.TrendingUp size={16} className="text-white"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-7 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center"><Icons.Package size={18} className="mr-2 text-brand-500"/> Daftar Pesanan Terkini</h3>
                        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                            {['Semua', 'Pending', 'Selesai'].map(f => (
                                <button key={f} onClick={() => setFilterPesanan(f)} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${filterPesanan === f ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>{f}</button>
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
                                        <div className="p-3 bg-brand-50 text-brand-600 rounded-xl hidden sm:block border border-brand-100"><Icons.User size={18}/></div>
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

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 flex flex-col">
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
    <div className={`soft-card rounded-3xl overflow-hidden transition-all ${isOpen ? 'ring-1 ring-brand-200' : ''}`}>
        <button type="button" onClick={onToggle} className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-cream-50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 border border-brand-100 flex items-center justify-center font-black">
                    {parseDateKey(day.dateKey).getDate()}
                </div>
                <div>
                    <p className="font-bold text-stone-800">{parseDateKey(day.dateKey).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{day.items.length} catatan · klik untuk rincian pemasukan & pengeluaran</p>
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
                    <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Bersih</p>
                    <p className={`font-black text-sm ${day.bersih >= 0 ? 'text-stone-800' : 'text-rose-600'}`}>{formatRupiah(day.bersih)}</p>
                </div>
                <Icons.ChevronDown size={18} className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
        </button>
        {isOpen && (
            <div className="px-5 md:px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-cream-200 pt-4 animate-fade-in">
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3 flex items-center"><Icons.TrendingUp size={14} className="mr-2"/> Rincian Pemasukan</h4>
                    {day.incomes.length === 0 ? <p className="text-sm text-stone-400">Tidak ada pemasukan.</p> : day.incomes.map(t => (
                        <div key={t.id} className="flex justify-between items-start py-2 border-b border-emerald-100/80 last:border-0 gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-stone-800">{t.desc}</p>
                                <p className="text-[10px] text-stone-400">{new Date(t.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}{t.wallet ? ` · ${fundLabel(t.wallet)}` : ''}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <p className="text-sm font-bold text-emerald-700 whitespace-nowrap">+{formatRupiah(t.amount)}</p>
                                <button type="button" onClick={() => onRequestDelete(t)} className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-white rounded-lg" title="Hapus transaksi"><Icons.Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-3 flex items-center"><Icons.TrendingDown size={14} className="mr-2"/> Rincian Pengeluaran</h4>
                    {day.expenses.length === 0 ? <p className="text-sm text-stone-400">Tidak ada pengeluaran.</p> : day.expenses.map(t => (
                        <div key={t.id} className="flex justify-between items-start py-2 border-b border-rose-100/80 last:border-0 gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-stone-800">{t.desc}</p>
                                <p className="text-[10px] text-stone-400">{new Date(t.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}{t.wallet ? ` · ${fundLabel(t.wallet)}` : ''}</p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <p className="text-sm font-bold text-rose-600 whitespace-nowrap">-{formatRupiah(t.amount)}</p>
                                <button type="button" onClick={() => onRequestDelete(t)} className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-white rounded-lg" title="Hapus transaksi"><Icons.Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
                {day.others.length > 0 && (
                    <div className="md:col-span-2 bg-cream-50 border border-cream-200 rounded-2xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Catatan lain</h4>
                        {day.others.map(t => (
                            <div key={t.id} className="flex justify-between items-center text-sm py-1.5 gap-3">
                                <span className="text-stone-600">{t.desc} <span className="text-[10px] uppercase tracking-wider text-stone-400">({String(t.type).replace('_', ' ')})</span></span>
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-stone-800">{formatRupiah(t.amount)}</span>
                                    <button type="button" onClick={() => onRequestDelete(t)} className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-white rounded-lg" title="Hapus transaksi"><Icons.Trash2 size={14}/></button>
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
                    className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-all ${active ? activeClass : 'bg-white text-stone-600 border-cream-200 hover:border-brand-300'}`}
                >
                    {src.label}
                </button>
            );
        })}
    </div>
);

const Transaksi = ({ addTransaction, balances, showToast }) => {
    const [txDate, setTxDate] = useState(toLocalDateInput());
    const [income, setIncome] = useState({ amount: '', desc: '', wallet: 'tunai' });
    const [expense, setExpense] = useState({ amount: '', desc: '', wallet: 'tunai' });

    const saveEntry = (type, form, reset) => (e) => {
        e.preventDefault();
        const numAmount = unformatRibuan(form.amount);
        if (!numAmount || !form.desc.trim()) return showToast('Lengkapi nominal dan keterangan.');
        if (!FUND_KEYS.includes(form.wallet)) return showToast('Pilih sumber atau tujuan dana.');
        const currentSaldo = Number(balances?.[form.wallet]) || 0;
        const warn = type === 'pengeluaran' && currentSaldo < numAmount
            ? ` Perhatian: saldo ${fundLabel(form.wallet)} saat ini ${formatRupiah(currentSaldo)}.`
            : '';
        addTransaction({ date: dateInputToIso(txDate), type, amount: numAmount, desc: form.desc.trim(), wallet: form.wallet });
        reset();
        const arah = type === 'pemasukan' ? 'ditambah ke' : 'dikurangi dari';
        showToast(`${type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'} tersimpan. Saldo ${fundLabel(form.wallet)} ${arah} ${formatRupiah(numAmount)}.${warn}`);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="inline-flex text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full mb-2">Keuangan harian</span>
                    <h2 className="text-3xl font-bold text-stone-800 tracking-tight">Input Transaksi</h2>
                    <p className="text-sm text-stone-500 mt-1">Pilih sumber dana. Pemasukan menambah saldo, pengeluaran mengurangi saldo secara otomatis.</p>
                </div>
                <div className="soft-card rounded-2xl px-4 py-3 min-w-[220px]">
                    <label className="field-label mb-1">Tanggal transaksi</label>
                    <input type="date" className="field-input py-2" value={txDate} onChange={(e) => setTxDate(e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FUND_SOURCES.map((src) => (
                    <div key={src.key} className="soft-card rounded-2xl px-4 py-3">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{src.label}</p>
                        <p className="font-bold text-stone-800 text-sm mt-1">{formatRupiah(balances?.[src.key] || 0)}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <form onSubmit={saveEntry('pemasukan', income, () => setIncome({ amount: '', desc: '', wallet: income.wallet }))} className="soft-card rounded-3xl p-6 md:p-7 relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div>
                            <h3 className="text-lg font-bold text-stone-800">Pemasukan Harian</h3>
                            <p className="text-xs text-stone-500 mt-1">Omset, pelunasan, atau uang masuk lain.</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100"><Icons.TrendingUp size={18}/></div>
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
                        <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-md shadow-emerald-600/20">Simpan Pemasukan</button>
                    </div>
                </form>

                <form onSubmit={saveEntry('pengeluaran', expense, () => setExpense({ amount: '', desc: '', wallet: expense.wallet }))} className="soft-card rounded-3xl p-6 md:p-7 relative overflow-hidden">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-rose-50 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div>
                            <h3 className="text-lg font-bold text-stone-800">Pengeluaran Harian</h3>
                            <p className="text-xs text-stone-500 mt-1">Bahan, operasional, atau uang keluar lain.</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100"><Icons.TrendingDown size={18}/></div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <div>
                            <label className="field-label">Keluar dari saldo</label>
                            <FundSourcePills value={expense.wallet} onChange={(wallet) => setExpense({ ...expense, wallet })} tone="rose" />
                        </div>
                        <div>
                            <label className="field-label">Nominal (Rp)</label>
                            <input type="text" inputMode="numeric" className="field-input" placeholder="Contoh: 250.000" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: formatRibuanInput(e.target.value) })} />
                        </div>
                        <div>
                            <label className="field-label">Keterangan</label>
                            <input type="text" className="field-input" placeholder="Contoh: Beli bumbu, bayar listrik..." value={expense.desc} onChange={(e) => setExpense({ ...expense, desc: e.target.value })} />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold transition-all shadow-md shadow-rose-500/20">Simpan Pengeluaran</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SaldoPage = ({ balances, saveBalances, showToast }) => {
    const [form, setForm] = useState({
        tunai: formatRibuanInput(balances.tunai || 0),
        bca: formatRibuanInput(balances.bca || 0),
        bsi: formatRibuanInput(balances.bsi || 0),
        seabank: formatRibuanInput(balances.seabank || 0),
        modalAwal: formatRibuanInput(balances.modalAwal || 0)
    });

    useEffect(() => {
        setForm({
            tunai: formatRibuanInput(balances.tunai || 0),
            bca: formatRibuanInput(balances.bca || 0),
            bsi: formatRibuanInput(balances.bsi || 0),
            seabank: formatRibuanInput(balances.seabank || 0),
            modalAwal: formatRibuanInput(balances.modalAwal || 0)
        });
    }, [balances]);

    const totalKas = FUND_KEYS.reduce((sum, key) => sum + (Number(balances[key]) || 0), 0);

    const saveField = async (key, label) => {
        const next = {
            ...balances,
            [key]: unformatRibuan(form[key]),
            updatedAt: new Date().toISOString()
        };
        await saveBalances(next);
        showToast(`${label} berhasil diperbarui.`);
    };

    const saldoItems = [
        { key: 'tunai', name: 'Saldo Tunai', hint: 'Kas fisik di warung', tone: 'from-stone-700 to-stone-900', icon: Icons.Wallet },
        { key: 'bca', name: 'Saldo BCA', hint: 'Rekening BCA operasional', tone: 'from-blue-700 to-blue-900', icon: Icons.Landmark },
        { key: 'bsi', name: 'Saldo BSI', hint: 'Rekening BSI / syariah', tone: 'from-teal-700 to-emerald-900', icon: Icons.Landmark },
        { key: 'seabank', name: 'Saldo SeaBank', hint: 'Rekening SeaBank digital', tone: 'from-orange-600 to-amber-800', icon: Icons.Landmark }
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div>
                <span className="inline-flex text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full mb-2">Kas & modal</span>
                <h2 className="text-3xl font-bold text-stone-800 tracking-tight">Saldo</h2>
                <p className="text-sm text-stone-500 mt-1">Saldo ini juga berubah otomatis setiap ada input transaksi. Koreksi manual tetap bisa dilakukan di sini.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {saldoItems.map((item) => (
                    <div key={item.key} className={`rounded-3xl p-5 text-white bg-gradient-to-br ${item.tone} shadow-lg relative overflow-hidden`}>
                        <div className="absolute -right-6 -bottom-8 w-24 h-24 bg-white/10 rounded-full"></div>
                        <p className="text-xs uppercase tracking-widest font-bold text-white/70">{item.name}</p>
                        <p className="text-2xl font-black mt-3 tracking-tight">{formatRupiah(balances[item.key] || 0)}</p>
                    </div>
                ))}
                <div className="rounded-3xl p-5 bg-brand-700 text-white shadow-lg">
                    <p className="text-xs uppercase tracking-widest font-bold text-white/70">Modal Awal</p>
                    <p className="text-2xl font-black mt-3 tracking-tight">{formatRupiah(balances.modalAwal || 0)}</p>
                    <p className="text-[11px] text-white/50 mt-2">Total kas: {formatRupiah(totalKas)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {saldoItems.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                    <div key={item.key} className="soft-card rounded-3xl p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-700 border border-brand-100"><ItemIcon size={18}/></div>
                            <div>
                                <h3 className="font-bold text-stone-800">{item.name}</h3>
                                <p className="text-xs text-stone-500">{item.hint}</p>
                            </div>
                        </div>
                        <label className="field-label">Jumlah saldo</label>
                        <input type="text" inputMode="numeric" className="field-input mb-4" value={form[item.key]} onChange={(e) => setForm({ ...form, [item.key]: formatRibuanInput(e.target.value) })} />
                        <button type="button" onClick={() => saveField(item.key, item.name)} className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold transition-all">Simpan {item.name.replace('Saldo ', '')}</button>
                    </div>
                    );
                })}

                <div className="soft-card rounded-3xl p-6 border-2 border-dashed border-brand-200 lg:col-span-2">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2.5 rounded-xl bg-stone-900 text-brand-200"><Icons.Wallet size={18}/></div>
                        <div>
                            <h3 className="font-bold text-stone-800">Input Modal Awal</h3>
                            <p className="text-xs text-stone-500">Khusus jumlah modal pertama kali usaha dijalankan.</p>
                        </div>
                    </div>
                    <label className="field-label">Jumlah modal pertama</label>
                    <input type="text" inputMode="numeric" className="field-input mb-3" placeholder="Masukkan modal awal" value={form.modalAwal} onChange={(e) => setForm({ ...form, modalAwal: formatRibuanInput(e.target.value) })} />
                    <p className="text-xs text-stone-400 mb-4">Gunakan field ini sekali untuk mencatat modal awal. Perubahan berikutnya hanya jika perlu koreksi.</p>
                    <button type="button" onClick={() => saveField('modalAwal', 'Modal awal')} className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-2xl font-bold transition-all">Simpan Modal Awal</button>
                </div>
            </div>
            {balances.updatedAt && <p className="text-xs text-stone-400">Terakhir diperbarui: {formatDate(balances.updatedAt, true)}</p>}
        </div>
    );
};

const TanggunganPage = ({ items, saveItems, addTransaction, showToast }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', monthlyTarget: '' });
    const [collectedDraft, setCollectedDraft] = useState({});
    const [walletDraft, setWalletDraft] = useState({});
    const [payingId, setPayingId] = useState(null);
    const days = daysInCurrentMonth();
    const monthTitle = formatMonthTitle(currentMonthKey());

    const totalTarget = items.reduce((s, i) => s + (Number(i.monthlyTarget) || 0), 0);
    const totalCollected = items.reduce((s, i) => s + (Number(i.collected) || 0), 0);

    const addItem = (e) => {
        e.preventDefault();
        const monthlyTarget = unformatRibuan(newItem.monthlyTarget);
        if (!newItem.name.trim() || !monthlyTarget) return showToast('Isi nama dan nominal target bulanan.');
        const next = [...items, {
            id: Date.now().toString(),
            name: newItem.name.trim(),
            monthlyTarget,
            collected: 0,
            collectedByWallet: emptyWalletBag(),
            createdAt: new Date().toISOString()
        }];
        saveItems(next);
        setNewItem({ name: '', monthlyTarget: '' });
        setIsAdding(false);
        showToast('Tanggungan baru ditambahkan.');
    };

    const removeItem = (id) => {
        saveItems(items.filter((i) => i.id !== id));
        showToast('Tanggungan dihapus.');
    };

    const saveCollected = (id) => {
        const added = unformatRibuan(collectedDraft[id]);
        if (!added) return showToast('Masukkan nominal dana yang ditambahkan.');
        const wallet = walletDraft[id] || 'tunai';
        saveItems(items.map((i) => {
            if (i.id !== id) return i;
            const bag = { ...emptyWalletBag(), ...(i.collectedByWallet || {}) };
            bag[wallet] = (Number(bag[wallet]) || 0) + added;
            return {
                ...i,
                collected: (Number(i.collected) || 0) + added,
                collectedByWallet: bag,
                wallet
            };
        }));
        setCollectedDraft((prev) => ({ ...prev, [id]: '' }));
        showToast(`Dana ${formatRupiah(added)} dicatat di ${fundLabel(wallet)}.`);
    };

    const markPaid = async (item) => {
        if (payingId) return;
        const collected = Number(item.collected) || 0;
        if (collected < (Number(item.monthlyTarget) || 0)) return;
        setPayingId(item.id);
        try {
            const bag = { ...emptyWalletBag(), ...(item.collectedByWallet || {}) };
            const parts = FUND_KEYS.filter((k) => (Number(bag[k]) || 0) > 0).map((k) => ({ wallet: k, amount: Number(bag[k]) }));
            if (parts.length === 0 && collected > 0) {
                parts.push({ wallet: item.wallet || 'tunai', amount: collected });
            }
            for (const part of parts) {
                await addTransaction({
                    date: new Date().toISOString(),
                    type: 'pengeluaran',
                    amount: part.amount,
                    desc: `Bayar tanggungan: ${item.name}`,
                    wallet: part.wallet,
                    source: 'tanggungan',
                    tanggunganId: item.id
                });
            }
            saveItems(items.map((i) => i.id === item.id ? { ...i, collected: 0, collectedByWallet: emptyWalletBag() } : i));
            setCollectedDraft((prev) => ({ ...prev, [item.id]: '' }));
            showToast(`${item.name} sudah terbayar. Pengeluaran masuk Buku Besar dan saldo dipotong.`);
        } catch (err) {
            console.error(err);
            showToast('Gagal menandai sudah terbayar.');
        } finally {
            setPayingId(null);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="inline-flex text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full mb-2">Target bulanan</span>
                    <h2 className="text-3xl font-bold text-stone-800 tracking-tight">Tanggungan</h2>
                    <p className="text-sm text-stone-500 mt-1">Kelola pengeluaran tetap {monthTitle}. Target harian dihitung otomatis: dibagi {days} hari.</p>
                </div>
                <button type="button" onClick={() => setIsAdding((v) => !v)} className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center shadow-lg shadow-brand-500/20">
                    <Icons.Plus size={16} className="mr-2"/> Tambah Tanggungan
                </button>
            </div>

            {isAdding && (
                <form onSubmit={addItem} className="soft-card rounded-3xl p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-5">
                        <label className="field-label">Nama tanggungan</label>
                        <input type="text" className="field-input" placeholder="Contoh: Angsuran BSI, Gaji Pegawai" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                    </div>
                    <div className="md:col-span-4">
                        <label className="field-label">Nominal target bulanan</label>
                        <input type="text" inputMode="numeric" className="field-input" placeholder="Contoh: 3.100.000" value={newItem.monthlyTarget} onChange={(e) => setNewItem({ ...newItem, monthlyTarget: formatRibuanInput(e.target.value) })} />
                    </div>
                    <div className="md:col-span-3 flex gap-2">
                        <button type="submit" className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold">Simpan</button>
                        <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-3 bg-cream-100 text-stone-600 rounded-2xl font-bold">Batal</button>
                    </div>
                    {unformatRibuan(newItem.monthlyTarget) > 0 && (
                        <p className="md:col-span-12 text-sm text-emerald-700 font-semibold">Target Harian: {formatRupiah(Math.round(unformatRibuan(newItem.monthlyTarget) / days))}/hari ({days} hari bulan ini)</p>
                    )}
                </form>
            )}

            <div className="space-y-4">
                {items.length === 0 && (
                    <div className="soft-card rounded-3xl p-10 text-center text-stone-400">
                        <Icons.ClipboardList size={32} className="mx-auto mb-3 opacity-40" />
                        Belum ada tanggungan. Tambahkan item seperti angsuran atau gaji.
                    </div>
                )}
                {items.map((item) => {
                    const daily = Math.round((Number(item.monthlyTarget) || 0) / days);
                    const collected = Number(item.collected) || 0;
                    const pct = item.monthlyTarget > 0 ? Math.min(100, Math.round((collected / item.monthlyTarget) * 100)) : 0;
                    const isComplete = collected >= (Number(item.monthlyTarget) || 0) && item.monthlyTarget > 0;
                    const bag = item.collectedByWallet || {};
                    return (
                        <div key={item.id} className="soft-card rounded-3xl p-5 md:p-6">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-bold text-stone-800 text-lg">{item.name}</h3>
                                            <p className="text-sm text-stone-500 mt-1">Target bulanan {formatRupiah(item.monthlyTarget)}</p>
                                            <p className="text-sm font-semibold text-brand-700 mt-1">Target Harian: {formatRupiah(daily)}/hari</p>
                                            <p className="text-sm font-bold text-stone-800 mt-2">Terkumpul: {formatRupiah(collected)}</p>
                                        </div>
                                        <button type="button" onClick={() => removeItem(item.id)} className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl" title="Hapus"><Icons.Trash2 size={18}/></button>
                                    </div>
                                    <div className="mt-4 h-2 bg-cream-200 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full transition-all ${isComplete ? 'bg-emerald-500' : 'bg-brand-500'}`} style={{ width: `${pct}%` }}></div>
                                    </div>
                                    <p className="text-xs text-stone-400 mt-2">{pct}% terkumpul · sisa {formatRupiah(Math.max(0, item.monthlyTarget - collected))}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {FUND_KEYS.filter((k) => (Number(bag[k]) || 0) > 0).map((k) => (
                                            <span key={k} className="text-[10px] font-bold uppercase tracking-wider bg-cream-100 border border-cream-200 text-stone-600 px-2 py-1 rounded-full">{fundLabel(k)} {formatRupiah(bag[k])}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full lg:w-80 space-y-3">
                                    <label className="field-label">Update dana terkumpul</label>
                                    <FundSourcePills value={walletDraft[item.id] || 'tunai'} onChange={(wallet) => setWalletDraft({ ...walletDraft, [item.id]: wallet })} />
                                    <input type="text" inputMode="numeric" className="field-input" placeholder="Nominal yang ditambahkan" value={collectedDraft[item.id] || ''} onChange={(e) => setCollectedDraft({ ...collectedDraft, [item.id]: formatRibuanInput(e.target.value) })} />
                                    <button type="button" onClick={() => saveCollected(item.id)} className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-2xl font-bold">Update Dana</button>
                                    {isComplete && (
                                        <button type="button" disabled={payingId === item.id} onClick={() => markPaid(item)} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-2xl font-bold">
                                            {payingId === item.id ? 'Memproses...' : 'Sudah Terbayar'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-3xl p-6 bg-stone-900 text-white">
                    <p className="text-xs uppercase tracking-widest font-bold text-white/60">Total keseluruhan tanggungan bulan ini</p>
                    <p className="text-3xl font-black mt-3">{formatRupiah(totalTarget)}</p>
                    <p className="text-sm text-white/50 mt-2">Setara {formatRupiah(Math.round(totalTarget / days))}/hari</p>
                </div>
                <div className="rounded-3xl p-6 bg-emerald-700 text-white">
                    <p className="text-xs uppercase tracking-widest font-bold text-white/70">Total dana keseluruhan yang sudah terkumpul</p>
                    <p className="text-3xl font-black mt-3">{formatRupiah(totalCollected)}</p>
                    <p className="text-sm text-white/70 mt-2">Kekurangan {formatRupiah(Math.max(0, totalTarget - totalCollected))}</p>
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <span className="inline-flex text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full mb-2">Arsip keuangan</span>
                    <h2 className="text-3xl font-bold text-stone-800 tracking-tight">Buku Besar Transaksi</h2>
                    <p className="text-sm text-stone-500 mt-1">Daftar harian bulan berjalan di atas. Bulan yang sudah lewat otomatis masuk folder arsip.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icons.Search size={18} className="text-stone-400" />
                    </div>
                    <input type="text" placeholder="Cari keterangan atau nominal..." className="field-input pl-12 rounded-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-stone-800 text-lg">Bulan berjalan · {formatMonthTitle(thisMonth)}</h3>
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full">{currentDays.length} hari tercatat</span>
                </div>
                <div className="space-y-3">
                    {currentDays.length === 0 && (
                        <div className="soft-card rounded-3xl p-10 text-center text-stone-400">
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
                    <h3 className="font-bold text-stone-800 text-lg">Arsip bulan tertutup</h3>
                    <p className="text-sm text-stone-500 mt-1">Setiap bulan yang sudah berganti dikelompokkan otomatis. Buka foldernya untuk melihat riwayat harian.</p>
                </div>
                {archives.length === 0 ? (
                    <div className="soft-card rounded-3xl p-8 text-sm text-stone-400">Arsip akan muncul setelah ada data di bulan sebelumnya.</div>
                ) : (
                    <div className="space-y-3">
                        {archives.map((month) => {
                            const isOpen = openArchive === month.monthKey;
                            return (
                                <div key={month.monthKey} className="soft-card rounded-3xl overflow-hidden">
                                    <button type="button" onClick={() => setOpenArchive(isOpen ? null : month.monthKey)} className="w-full p-5 flex items-center justify-between gap-4 hover:bg-cream-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-700 border border-brand-100"><Icons.Folder size={18}/></div>
                                            <div className="text-left">
                                                <p className="font-bold text-stone-800 capitalize">{formatMonthTitle(month.monthKey)}</p>
                                                <p className="text-xs text-stone-500">{month.days.length} hari · masuk {formatRupiah(month.pemasukan)} · keluar {formatRupiah(month.pengeluaran)}</p>
                                            </div>
                                        </div>
                                        <Icons.ChevronDown size={18} className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
                <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-stone-800">{pendingDelete.step === 1 ? 'Hapus transaksi?' : 'Konfirmasi kedua'}</h3>
                        <p className="text-sm text-stone-500 mt-2">
                            {pendingDelete.step === 1
                                ? 'Apakah Anda yakin ingin menghapus transaksi ini? Data belum dihapus sampai konfirmasi kedua.'
                                : 'Konfirmasi sekali lagi. Transaksi akan dihapus permanen dari Buku Besar dan saldo terkait akan dikembalikan.'}
                        </p>
                        <div className="mt-4 bg-cream-50 border border-cream-200 rounded-2xl p-4 text-sm">
                            <p className="font-bold text-stone-800">{pendingDelete.tx.desc}</p>
                            <p className="text-stone-500 mt-1">{formatRupiah(pendingDelete.tx.amount)} · {pendingDelete.tx.type}{pendingDelete.tx.wallet ? ` · ${fundLabel(pendingDelete.tx.wallet)}` : ''}</p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setPendingDelete(null)} className="flex-1 py-3 rounded-2xl font-bold bg-cream-100 text-stone-600">Batal</button>
                            {pendingDelete.step === 1
                                ? <button type="button" onClick={confirmFirst} className="flex-1 py-3 rounded-2xl font-bold bg-brand-600 text-white">Ya, lanjutkan</button>
                                : <button type="button" onClick={confirmFinal} className="flex-1 py-3 rounded-2xl font-bold bg-rose-600 text-white">Hapus permanen</button>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const KeuanganKatering = ({ catering, updateCatering, addTransaction, orders, showToast }) => {
    const [selectedKatering, setSelectedKatering] = useState(Object.keys(catering)[0] || null);
    const [isAddingMitra, setIsAddingMitra] = useState(false);
    const [newMitraName, setNewMitraName] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [katTxType, setKatTxType] = useState('deposit'); 
    const [amountInput, setAmountInput] = useState('');
    const [descInput, setDescInput] = useState('');
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

        const newHistory = { id: Date.now().toString(), date: new Date().toISOString(), type: katTxType, amount: amount, desc: descInput || (isDeposit ? 'Deposit Dana / Bayar DP' : 'Potong Saldo untuk Pesanan') };
        const newCatering = { 
            ...catering, 
            [selectedKatering]: { 
                saldo: isDeposit ? catering[selectedKatering].saldo + amount : catering[selectedKatering].saldo - amount, 
                history: [newHistory, ...catering[selectedKatering].history] 
            } 
        };
        
        updateCatering(newCatering);
        addTransaction({ date: new Date().toISOString(), type: isDeposit ? 'pemasukan' : 'potong_saldo', amount: amount, desc: isDeposit ? `Deposit Dana Katering ${selectedKatering}` : `Potong Saldo Katering ${selectedKatering}` });
        
        setAmountInput(''); setDescInput(''); showToast(isDeposit ? `Deposit berhasil dicatat di Cloud.` : `Saldo dipotong.`);
    };

    const linkedOrders = orders.filter(o => o.source === `Katering ${selectedKatering}`);

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Manajemen Mitra Katering</h2>
                <p className="text-sm text-slate-500 mt-1">Kelola mitra, deposit uang muka, dan rekap pesanan mereka secara Real-Time.</p>
            </div>

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
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                    <Icons.Briefcase size={56} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-500">Belum Ada Mitra Katering</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between relative overflow-hidden">
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
                                <div className="space-y-3">
                                    <input type="text" value={amountInput} onChange={(e) => setAmountInput(formatRibuanInput(e.target.value))} placeholder="Nominal (Rp)" className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-medium transition-all shadow-sm" />
                                    <input type="text" value={descInput} onChange={(e) => setDescInput(e.target.value)} placeholder="Keterangan opsional..." className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm transition-all shadow-sm" />
                                    <button type="submit" className={`w-full py-4 rounded-2xl font-bold transition-all shadow-sm border border-transparent flex justify-center items-center ${katTxType === 'deposit' ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'}`}>Eksekusi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="flex border-b border-slate-200 bg-slate-50">
                            <button onClick={() => setRightTab('history')} className={`flex-1 p-4 font-bold text-sm tracking-wide transition-colors border-b-2 ${rightTab === 'history' ? 'text-brand-600 border-brand-500 bg-white' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100'}`}>Riwayat Saldo</button>
                            <button onClick={() => setRightTab('orders')} className={`flex-1 p-4 font-bold text-sm tracking-wide transition-colors flex justify-center items-center space-x-2 border-b-2 ${rightTab === 'orders' ? 'text-brand-600 border-brand-500 bg-white' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100'}`}>
                                <span>Pesanan Katering</span><span className="bg-brand-100 text-brand-700 py-0.5 px-2.5 rounded-full text-xs border border-brand-200">{linkedOrders.length}</span>
                            </button>
                        </div>
                        <div className="p-0 overflow-y-auto custom-scrollbar flex-1 min-h-[320px]">
                            {rightTab === 'history' && (
                                <table className="w-full text-left text-sm">
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

const FormTambahPesanan = ({ addOrder, addTransaction, catering, showToast }) => {
    const [form, setForm] = useState({ date: '', source: Object.keys(catering).length > 0 ? `Katering ${Object.keys(catering)[0]}` : 'Umum / Acara', details: '', namaPemesan: '', noHp: '', dp: '', jenisAcara: 'Aqiqah', namaAqiqah: '' });
    const [selectedPackages, setSelectedPackages] = useState({});
    const [kotakanData, setKotakanData] = useState({ jmlKotak: '', isiSate: '' });
    const [sateAyamQty, setSateAyamQty] = useState('');

    const isUmum = form.source === 'Umum / Acara';

    const handlePackageClick = (pkgName) => setSelectedPackages(prev => ({ ...prev, [pkgName]: (prev[pkgName] || 0) + 1 }));
    const handleRemovePackage = (e, pkgName) => { e.stopPropagation(); setSelectedPackages(prev => { const newPkgs = { ...prev }; if (newPkgs[pkgName] > 1) { newPkgs[pkgName] -= 1; } else { delete newPkgs[pkgName]; } return newPkgs; }); };

    const handleAddOrder = (e) => {
        e.preventDefault();
        const basePrices = { 'Paket Hemat': 2250000, 'Paket Sedang': 2500000, 'Paket Besar': 3000000, 'Jasa Masak': 850000, 'Jasa K. Guling': 1200000, 'K. Guling (Full)': 2500000 };
        let calculatedTotal = 0; let orderItems = [];

        Object.entries(selectedPackages).forEach(([name, btnClickQty]) => {
            if (basePrices[name]) { calculatedTotal += basePrices[name] * btnClickQty; orderItems.push(`${btnClickQty}x ${name}`); } 
            else if (name === 'Layanan Kotakan') { const kQty = parseInt(kotakanData.jmlKotak) || 0; calculatedTotal += kQty * 10000; orderItems.push(`Layanan Kotakan (${kQty} Box, ${kotakanData.isiSate || 0} Tsk/Box)`); } 
            else if (name === 'Sate Ayam') { const sQty = parseInt(sateAyamQty) || 0; calculatedTotal += sQty * (isUmum ? 1200 : 1000); orderItems.push(`${sQty} Tusuk Sate Ayam`); }
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
            addTransaction({ date: new Date().toISOString(), type: 'pemasukan', amount: dpNum, desc: `DP Pesanan: ${form.namaPemesan || 'Umum'}` });
        }
        
        setForm({ ...form, details: '', namaPemesan: '', noHp: '', dp: '', namaAqiqah: '' }); setSelectedPackages({}); setKotakanData({ jmlKotak: '', isiSate: '' }); setSateAyamQty(''); showToast('Pesanan baru berhasil disimpan di Cloud!');
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div><h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tambah Pesanan Baru</h2><p className="text-sm text-slate-500 mt-1">Input pesanan masuk dari pelanggan umum maupun katering di sini.</p></div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
                <form onSubmit={handleAddOrder} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-1/3"><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tanggal Kirim</label><input type="date" className="w-full p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all shadow-sm" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required/></div>
                        <div className="w-full md:w-2/3"><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Sumber Pesanan</label><select className="w-full p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-bold appearance-none transition-all shadow-sm" value={form.source} onChange={e => setForm({...form, source: e.target.value})}>{Object.keys(catering).map(k => <option key={k} value={`Katering ${k}`}>Katering {k}</option>)}<option value="Umum / Acara">Umum / Acara Khusus</option></select></div>
                    </div>

                    {isUmum && (
                        <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 space-y-4 animate-fade-in">
                            <h4 className="font-bold text-sm text-emerald-700 mb-2">Data Pelanggan Umum</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Pemesan</label><input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm" value={form.namaPemesan} onChange={e => setForm({...form, namaPemesan: e.target.value})} placeholder="Bpk/Ibu..." /></div>
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Nomor Telepon</label><input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm" value={form.noHp} onChange={e => setForm({...form, noHp: e.target.value})} placeholder="08..." /></div>
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Jenis Acara</label><select className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-slate-800 appearance-none shadow-sm" value={form.jenisAcara} onChange={e => setForm({...form, jenisAcara: e.target.value})}><option value="Aqiqah">Aqiqah</option><option value="Nikahan">Nikahan</option><option value="Lainnya">Lainnya / Keluarga</option></select></div>
                                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Uang Muka / DP (Rp)</label><input type="text" className="w-full p-3 bg-white border border-emerald-300 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-emerald-600 placeholder-emerald-200 shadow-sm" value={form.dp} onChange={e => setForm({...form, dp: formatRibuanInput(e.target.value)})} placeholder="0" /></div>
                                {form.jenisAcara === 'Aqiqah' && (<div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Anak (Aqiqah)</label><input type="text" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm" value={form.namaAqiqah} onChange={e => setForm({...form, namaAqiqah: e.target.value})} placeholder="Tulis nama anak..." /></div>)}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Pilih Paket Menu</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {menuPackages.map(pkg => {
                                const qty = selectedPackages[pkg.name] || 0;
                                return (
                                    <div key={pkg.id} className="relative">
                                        <button type="button" onClick={() => handlePackageClick(pkg.name)} className={`w-full p-4 rounded-2xl text-left transition-all h-full min-h-[110px] flex flex-col justify-center border ${qty > 0 ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500/50' : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-sm'}`}>
                                            <span className={`block text-sm font-bold mb-1 ${qty > 0 ? 'text-brand-700' : 'text-slate-800'}`}>{pkg.name}</span><span className="block text-xs font-bold text-emerald-600 mb-1.5">{pkg.price}</span><span className="block text-[10px] font-medium text-slate-500 leading-snug">{pkg.desc}</span>
                                        </button>
                                        {qty > 0 && <div onClick={(e) => handleRemovePackage(e, pkg.name)} className="absolute -top-2 -right-2 bg-brand-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shadow-md border-2 border-white cursor-pointer hover:bg-rose-500 transition-colors" title="Klik untuk mengurangi">{qty}</div>}
                                    </div>
                                )
                            })}
                        </div>

                        {selectedPackages['Layanan Kotakan'] > 0 && (
                            <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center animate-fade-in">
                                <div className="font-bold text-sm text-slate-700 w-full md:w-auto shrink-0 flex items-center"><Icons.FileText size={16} className="mr-2 text-slate-400"/> Detail Kotakan:</div>
                                <div className="flex-1 w-full flex space-x-3"><input type="number" placeholder="Jml Kotak" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-bold text-slate-800 placeholder-slate-400 shadow-sm" value={kotakanData.jmlKotak} onChange={e => setKotakanData({...kotakanData, jmlKotak: e.target.value})} /><input type="number" placeholder="Sate / kotak" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-bold text-slate-800 placeholder-slate-400 shadow-sm" value={kotakanData.isiSate} onChange={e => setKotakanData({...kotakanData, isiSate: e.target.value})} /></div>
                            </div>
                        )}
                        {selectedPackages['Sate Ayam'] > 0 && (
                            <div className="mt-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center animate-fade-in">
                                <div className="font-bold text-sm text-slate-700 w-full md:w-auto shrink-0 flex items-center"><Icons.Utensils size={16} className="mr-2 text-slate-400"/> Sate Ayam:</div>
                                <div className="flex-1 w-full flex space-x-3 items-center"><input type="number" placeholder="Berapa tusuk?" className="w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm font-bold text-slate-800 placeholder-slate-400 shadow-sm" value={sateAyamQty} onChange={e => setSateAyamQty(e.target.value)} /><span className="text-xs font-bold text-slate-500 whitespace-nowrap bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">@ {isUmum ? '1.200' : '1.000'}</span></div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Catatan Tambahan</label>
                        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                            <input type="text" placeholder="Contoh: Jam 4 sore, pedas pisah..." className="flex-1 p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium transition-all placeholder-slate-400 shadow-sm" value={form.details} onChange={e => setForm({...form, details: e.target.value})} />
                            <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold whitespace-nowrap shadow-md shadow-brand-500/20 border border-transparent transition-all flex items-center justify-center">Simpan Pesanan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const JadwalPesanan = ({ orders, updateOrder, catering, updateCatering, addTransaction, showToast, searchTerm, setSearchTerm }) => {
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div><h2 className="text-2xl font-bold text-slate-800 tracking-tight">Antrean Jadwal Pesanan</h2><p className="text-sm text-slate-500 mt-1">Pantau status penyelesaian pesanan berjalan secara Real-time.</p></div>
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Icons.Search size={18} className="text-slate-400" /></div>
                    <input type="text" placeholder="Cari ID / data pesanan..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all" value={searchTerm || ''} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 mb-4"><Icons.CalendarDays size={32} className="text-slate-400"/></div>
                    <h3 className="text-xl font-bold text-slate-700">Belum Ada Pesanan</h3><p className="text-slate-500 mt-2 text-sm">Pesanan baru akan muncul di dashboard ini.</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm flex flex-col items-center">
                    <Icons.Search size={32} className="text-slate-400 mb-4"/><h3 className="text-xl font-bold text-slate-700">Pencarian Tidak Ditemukan</h3><p className="text-slate-500 mt-2 text-sm">Tidak ada pesanan yang cocok dengan kata kunci tersebut.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredOrders.map(order => (
                        <div key={order.id} className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col group ${order.status === 'Selesai' ? 'bg-slate-50 border-slate-200 opacity-70' : order.status === 'Batal' ? 'bg-rose-50/50 border-rose-200 opacity-70' : 'bg-white border-brand-200 shadow-md shadow-brand-500/5 hover:border-brand-300'}`}>
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
                                        <button onClick={() => handleStatus(order.id, 'Selesai')} className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm shadow-brand-500/20">Tandai Selesai</button>
                                        <button onClick={() => handleStatus(order.id, 'Batal')} className="py-2.5 px-4 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 text-xs font-bold rounded-xl transition-colors">Batal</button>
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

const KeuanganKambing = ({ goatSuppliers, updateSuppliers, addTransaction, showToast }) => {
    const [form, setForm] = useState({ supplierId: goatSuppliers[0]?.id || '', type: 'tambah_hutang', amount: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => { if (goatSuppliers.length > 0 && !goatSuppliers.find(s => s.id === parseInt(form.supplierId) || s.id === form.supplierId)) { setForm(prev => ({ ...prev, supplierId: goatSuppliers[0].id })); } }, [goatSuppliers, form.supplierId]);

    const handleAddSupplier = (e) => {
        e.preventDefault(); if(!newName.trim()) return;
        const newSupplier = { id: Date.now().toString(), name: newName, hutang: 0, lastTx: null };
        updateSuppliers([...goatSuppliers, newSupplier]); 
        setNewName(''); setIsAdding(false); showToast(`Pedagang ditambahkan.`); setForm(prev => ({ ...prev, supplierId: newSupplier.id }));
    };

    const handleDeleteSupplier = (id, name) => {
        if(confirmDelete === id) { 
            updateSuppliers(goatSuppliers.filter(s => s.id !== id)); 
            setConfirmDelete(null); showToast(`Pedagang dihapus.`); 
        } else { setConfirmDelete(id); setTimeout(() => setConfirmDelete(null), 3000); }
    };

    const handleKambingTx = (e) => {
        e.preventDefault(); if (goatSuppliers.length === 0) return showToast('Tambah pedagang dulu!');
        const amount = unformatRibuan(form.amount); if(!amount) return;
        const dateStr = new Date().toISOString(); 
        const supplierName = goatSuppliers.find(s => s.id.toString() === form.supplierId.toString())?.name || 'Pedagang';

        const newSuppliers = goatSuppliers.map(s => { 
            if(s.id.toString() === form.supplierId.toString()) { 
                return { ...s, hutang: form.type === 'tambah_hutang' ? s.hutang + amount : s.hutang - amount, lastTx: dateStr }; 
            } 
            return s; 
        });
        updateSuppliers(newSuppliers);

        if(form.type === 'bayar_hutang') { 
            addTransaction({ date: dateStr, type: 'pengeluaran', amount, desc: `Bayar Hutang / Deposit: ${supplierName}` }); 
            showToast(`Pembayaran dicatat.`); 
        } else { 
            addTransaction({ date: dateStr, type: 'hutang_kambing', amount, desc: `Ambil Kambing: ${supplierName}` }); 
            showToast(`Hutang ditambahkan.`); 
        }
        setForm({...form, amount: ''});
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div><h2 className="text-2xl font-bold text-slate-800 tracking-tight">Suplier Kambing</h2><p className="text-sm text-slate-500 mt-1">Pantau hutang dan tagihan pedagang kambing.</p></div>
                {isAdding ? (
                    <form onSubmit={handleAddSupplier} className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        <input autoFocus type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nama..." className="w-40 text-sm px-3 py-2 outline-none font-bold text-slate-800 bg-transparent placeholder-slate-400"/>
                        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors"><Icons.CheckCircle size={16}/></button>
                        <button type="button" onClick={() => setIsAdding(false)} className="bg-slate-100 text-slate-500 hover:bg-slate-200 p-2 rounded-lg transition-colors"><Icons.X size={16}/></button>
                    </form>
                ) : (
                    <button onClick={() => setIsAdding(true)} className="px-5 py-2.5 rounded-full font-bold text-sm text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-200 flex items-center transition-all"><Icons.Plus size={16} className="mr-2"/> Tambah Suplier</button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                    {goatSuppliers.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm"><Icons.Beef size={48} className="mx-auto text-slate-300 mb-4"/><h3 className="text-xl font-bold text-slate-500">Belum Ada Pedagang</h3></div>
                    ) : (
                        goatSuppliers.map(supplier => (
                            <div key={supplier.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-brand-200 transition-colors flex flex-col md:flex-row md:justify-between md:items-center relative group">
                                <button onClick={() => handleDeleteSupplier(supplier.id, supplier.name)} className={`absolute top-4 right-4 p-2 rounded-lg text-white transition-all opacity-0 group-hover:opacity-100 ${confirmDelete === supplier.id ? 'bg-rose-500 animate-pulse opacity-100' : 'bg-slate-100 text-slate-400 hover:bg-rose-500 hover:text-white border border-slate-200'}`}>{confirmDelete === supplier.id ? <Icons.Trash2 size={14} /> : <Icons.X size={14} />}</button>
                                <div className="mb-4 md:mb-0"><h4 className="font-bold text-lg text-slate-800 flex items-center pr-10"><Icons.Beef size={18} className="mr-2 text-slate-400"/> {supplier.name}</h4><p className="text-xs text-slate-500 mt-1.5 flex items-center font-medium"><Icons.Clock size={12} className="mr-1"/> Update: {formatDate(supplier.lastTx)}</p></div>
                                <div className="md:text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        {supplier.hutang > 0 ? 'Tagihan Aktif' : supplier.hutang < 0 ? 'Saldo Deposit' : 'Tagihan / Saldo'}
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

                <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit sticky top-6">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100"><div className="bg-brand-50 p-2 rounded-xl text-brand-600 border border-brand-100"><Icons.ArrowRightLeft size={20}/></div><h3 className="text-lg font-bold text-slate-800">Transaksi Pedagang</h3></div>
                    <form onSubmit={handleKambingTx} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Pilih Pedagang</label>
                            <select className="w-full p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-bold disabled:opacity-50 appearance-none shadow-sm" value={form.supplierId} onChange={e => setForm({...form, supplierId: e.target.value})} disabled={goatSuppliers.length === 0}>{goatSuppliers.length === 0 && <option value="">Kosong...</option>}{goatSuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tipe</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`border rounded-2xl p-4 cursor-pointer flex flex-col items-center text-center transition-all ${form.type === 'tambah_hutang' ? 'border-brand-500 bg-brand-50 shadow-sm ring-1 ring-brand-500/50' : 'border-slate-200 bg-white hover:border-brand-300'}`}><input type="radio" name="type" className="sr-only" onChange={() => setForm({...form, type: 'tambah_hutang'})} checked={form.type === 'tambah_hutang'}/><Icons.Beef size={20} className={form.type === 'tambah_hutang' ? 'text-brand-600 mb-2' : 'text-slate-400 mb-2'}/><span className={`text-xs font-bold ${form.type === 'tambah_hutang' ? 'text-brand-700' : 'text-slate-500'}`}>Ambil<br/>(Hutang +)</span></label>
                                <label className={`border rounded-2xl p-4 cursor-pointer flex flex-col items-center text-center transition-all ${form.type === 'bayar_hutang' ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-500/50' : 'border-slate-200 bg-white hover:border-emerald-300'}`}><input type="radio" name="type" className="sr-only" onChange={() => setForm({...form, type: 'bayar_hutang'})} checked={form.type === 'bayar_hutang'}/><Icons.DollarSign size={20} className={form.type === 'bayar_hutang' ? 'text-emerald-600 mb-2' : 'text-slate-400 mb-2'}/><span className={`text-xs font-bold ${form.type === 'bayar_hutang' ? 'text-emerald-700' : 'text-slate-500'}`}>Bayar<br/>(Hutang -)</span></label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nominal (Rp)</label>
                            <input type="text" className="w-full p-4 bg-white border border-slate-300 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-bold disabled:opacity-50 placeholder-slate-400 shadow-sm" placeholder="0" value={form.amount} onChange={e => setForm({...form, amount: formatRibuanInput(e.target.value)})} disabled={goatSuppliers.length === 0} />
                        </div>
                        <button type="submit" disabled={goatSuppliers.length === 0} className="w-full py-4 mt-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-2xl transition-all shadow-md shadow-brand-500/20 border border-transparent">Kirim Data</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

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

    // State Database Cloud (Firebase)
    const [fbConfig, setFbConfig] = useState(null);
    const [isDbReady, setIsDbReady] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [catering, setCatering] = useState(initialCatering);
    const [orders, setOrders] = useState([]);
    const [goatSuppliers, setGoatSuppliers] = useState(initialGoatSuppliers);
    const [balances, setBalances] = useState(initialBalances);
    const [tanggungan, setTanggungan] = useState([]);
    const balancesRef = useRef(initialBalances);
    useEffect(() => { balancesRef.current = balances; }, [balances]);

    // 1. Inisialisasi Firebase Menggunakan Data Config Anda Sendiri
    useEffect(() => {
        let interval = setInterval(() => {
            if (window.FirebaseLib) {
                clearInterval(interval);
                try {
                    const { initializeApp, getFirestore, getAuth, signInAnonymously, onAuthStateChanged } = window.FirebaseLib;
                    
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
                    
                    // Otentikasi Anonim
                    const initAuth = async () => {
                        try {
                            await signInAnonymously(auth);
                        } catch (error) {
                            console.error("Auth Error:", error);
                        }
                    };
                    
                    initAuth();

                    // Tunggu status login dari Firebase
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            setFbConfig({ db, user, ...window.FirebaseLib });
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
            if (d.exists()) { setBalances({ ...initialBalances, ...d.data() }); }
            else { setBalances(initialBalances); }
        }, handleError);

        const unsubTanggungan = onSnapshot(doc(db, 'settings', 'tanggungan'), (d) => {
            if (d.exists() && Array.isArray(d.data().list)) { setTanggungan(d.data().list); }
            else { setTanggungan([]); }
        }, handleError);

        setIsDbReady(true); // Matikan loading screen
        
        return () => { unsubTx(); unsubOrders(); unsubCat(); unsubSup(); unsubBal(); unsubTanggungan(); };
    }, [fbConfig]);


    // 3. Fungsi-fungsi untuk Menulis ke Database Cloud
    const addTransactionToCloud = async (newTx) => {
        if(!fbConfig) return;
        try {
            await fbConfig.addDoc(fbConfig.collection(fbConfig.db, 'transactions'), newTx);
            if (FUND_KEYS.includes(newTx.wallet) && (newTx.type === 'pemasukan' || newTx.type === 'pengeluaran')) {
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
            if (FUND_KEYS.includes(tx.wallet) && (tx.type === 'pemasukan' || tx.type === 'pengeluaran')) {
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
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'balances'), nextBalances);
        } catch (e) { console.error(e); }
    };

    const saveTanggunganToCloud = async (list) => {
        if(!fbConfig) return;
        try {
            await fbConfig.setDoc(fbConfig.doc(fbConfig.db, 'settings', 'tanggungan'), { list });
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

    const handleTabClick = (id) => { setActiveTab(id); if (window.innerWidth < 768) setIsSidebarOpen(false); };
    const handleLogout = () => { setAuthUser(null); setActiveTab('beranda'); showToast('Berhasil keluar dari sistem.'); };

    useEffect(() => { if (authUser) { setActiveTab('beranda'); } }, [authUser]);

    // Tampilan Loading Database
    if (!isDbReady) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-cream-100">
                <Icons.Activity className="animate-spin text-brand-500 mb-4" size={32}/>
                <p className="text-stone-500 font-bold animate-pulse">Menghubungkan ke Database Anda (caksabarmj-app)...</p>
            </div>
        );
    }

    // Tampilan Login
    if (!authUser) {
        return (
            <div className="h-screen w-full bg-cream-100 flex font-sans text-stone-700 selection:bg-brand-500/20 overflow-hidden">
                <Toast message={toastMessage} isVisible={showToastObj} />
                <LoginScreen onLogin={setAuthUser} showToast={showToast} />
            </div>
        );
    }

    const SidebarItem = ({ icon: IconComponent, label, id, badge, tag }) => (
        <button onClick={() => handleTabClick(id)} className={`relative w-full flex items-center justify-between px-4 py-3 rounded-2xl mb-1.5 transition-all duration-200 group ${activeTab === id ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <div className="flex items-center space-x-3"><IconComponent size={18} className={activeTab === id ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'} /><span className="font-bold text-sm tracking-wide">{label}</span></div>
            <div className="flex items-center space-x-2">{tag && <span className="bg-brand-100 text-brand-700 text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider border border-brand-200">{tag}</span>}{badge > 0 && <span className="w-5 h-5 flex items-center justify-center bg-brand-600 text-white text-[10px] font-bold rounded-full shadow-sm">{badge}</span>}</div>
        </button>
    );

    return (
        <div className="h-screen w-full bg-cream-100 flex font-sans text-stone-700 selection:bg-brand-500/20 overflow-hidden">
            <Toast message={toastMessage} isVisible={showToastObj} />

            {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden animate-fade-in" onClick={() => setIsSidebarOpen(false)}/>}

            {/* Sidebar Navigation */}
            <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-ml-64 shadow-none'} shadow-[4px_0_24px_rgba(0,0,0,0.05)] md:shadow-none`}>
                <div className="p-6 pb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3 mb-1"><div className="bg-brand-600 text-white p-1.5 rounded-xl shadow-sm"><Icons.Utensils size={18} /></div><h1 className="text-xl font-black tracking-tight text-slate-800">SateGule<sup className="text-[10px] text-brand-500">®</sup></h1></div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-rose-500 transition-colors p-1"><Icons.X size={18}/></button>
                </div>
                
                <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 px-4 flex items-center"><Icons.LayoutDashboard size={12} className="mr-2"/> Utama</p>
                    <SidebarItem id="beranda" icon={Icons.Activity} label="Dashboard" />
                    <SidebarItem id="transaksi" icon={Icons.ArrowRightLeft} label="Input Transaksi" />
                    <SidebarItem id="saldo" icon={Icons.Wallet} label="Saldo" />
                    <SidebarItem id="laporan" icon={Icons.FileText} label="Laporan" />
                    <SidebarItem id="tanggungan" icon={Icons.ClipboardList} label="Tanggungan" />
                    <div className="my-6 border-t border-cream-200 mx-4"></div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 px-4 flex items-center"><Icons.Briefcase size={12} className="mr-2"/> Operasional</p>
                    <SidebarItem id="katering" icon={Icons.Briefcase} label="Mitra" />
                    <SidebarItem id="tambah_pesanan" icon={Icons.Plus} label="Order Baru" />
                    <SidebarItem id="jadwal_pesanan" icon={Icons.CalendarDays} label="Antrean" badge={pendingOrders.length} />
                    <div className="my-6 border-t border-cream-200 mx-4"></div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3 px-4 flex items-center"><Icons.Beef size={12} className="mr-2"/> Eksternal</p>
                    <SidebarItem id="kambing" icon={Icons.Beef} label="Suplier" />
                </nav>
                
                <div className="p-4 m-3 bg-cream-50 border border-cream-200 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-cream-200 shadow-sm"><Icons.User size={14} className={authUser.role === 'admin' ? "text-brand-600" : "text-emerald-600"}/></div>
                        <div><p className="text-xs font-bold text-stone-800">{authUser.name}</p><p className={`text-[10px] font-bold uppercase tracking-wider ${authUser.role === 'admin' ? 'text-brand-600' : 'text-emerald-600'}`}>{authUser.role === 'admin' ? 'Owner / Admin' : 'Staf Warung'}</p></div>
                    </div>
                    <button onClick={handleLogout} className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Logout"><Icons.LogOut size={16} /></button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 bg-cream-100 page-shell h-screen relative transition-all duration-300">
                <header className="flex-shrink-0 border-b border-cream-200 px-4 md:px-6 py-4 flex justify-between items-center z-20 bg-white/80 backdrop-blur-md sticky top-0">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 rounded-xl text-stone-500 hover:bg-cream-100 hover:text-brand-600 transition-colors" title="Toggle Menu"><Icons.Menu size={22} /></button>
                        <div className="hidden sm:flex items-center"><h2 className="text-xs font-bold text-stone-500 flex items-center"><Icons.Clock size={12} className="mr-2 text-brand-500"/> {formatDate(today.toISOString())}</h2></div>
                        {!isSidebarOpen && (
                            <div className="sm:hidden flex items-center space-x-2 ml-1 animate-fade-in"><div className="bg-brand-600 p-1.5 rounded-lg text-white"><Icons.Utensils size={14} /></div><h1 className="text-base font-black text-stone-800 tracking-tight">SateGule</h1></div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4 animate-fade-in">
                        <div className="hidden md:flex relative">
                            <Icons.Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                            <input type="text" placeholder="Cari ID pesanan..." value={globalSearchTerm} onChange={(e) => { const term = e.target.value; setGlobalSearchTerm(term); if (term.trim() !== '') { const lowerTerm = term.toLowerCase(); const matchOrder = orders.some(o => o.id.toString().includes(lowerTerm) || (o.source || '').toLowerCase().includes(lowerTerm)); if (matchOrder) setActiveTab('jadwal_pesanan'); else setActiveTab('laporan'); } }} className="bg-cream-50 border border-cream-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-brand-500/50 focus:bg-white w-56 lg:w-64 transition-all placeholder-stone-400 shadow-sm" />
                        </div>
                        <div className="relative" ref={notifRef}>
                            <button onClick={() => setIsNotifOpen(!isNotifOpen)} className={`relative p-2 rounded-full transition-colors border ${isNotifOpen ? 'bg-brand-50 text-brand-600 border-brand-200' : 'bg-white text-stone-400 border-cream-200 hover:text-brand-600 hover:bg-cream-50'}`}><Icons.Bell size={18} />{pendingOrders.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>}</button>
                            {isNotifOpen && (
                                <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-cream-200 rounded-2xl shadow-xl shadow-stone-200/50 overflow-hidden z-50 animate-fade-in origin-top-right">
                                    <div className="p-4 border-b border-cream-100 flex justify-between items-center bg-cream-50"><h4 className="font-bold text-stone-800 text-sm">Pesanan Menunggu</h4><span className="text-xs bg-brand-100 border border-brand-200 text-brand-700 px-2 py-0.5 rounded-full font-bold">{pendingOrders.length}</span></div>
                                    <div className="max-h-72 overflow-y-auto custom-scrollbar">
                                        {pendingOrders.length === 0 ? <div className="p-8 text-center flex flex-col items-center"><Icons.CheckCircle size={24} className="text-emerald-500 mb-2"/><p className="text-sm text-stone-500 font-medium">Semua pesanan sudah selesai.</p></div> : pendingOrders.map(po => (
                                            <div key={po.id} onClick={() => { setActiveTab('jadwal_pesanan'); setGlobalSearchTerm(po.id.toString()); setIsNotifOpen(false); }} className="p-4 border-b border-cream-50 hover:bg-brand-50 cursor-pointer transition-colors group">
                                                <div className="flex justify-between items-start mb-1"><p className="text-sm font-bold text-stone-800 group-hover:text-brand-700 transition-colors">{po.source}</p><span className="text-[10px] text-stone-400 font-mono font-bold">#{po.id?.slice(0,4)}</span></div>
                                                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">{po.details}</p><p className="text-[10px] text-brand-600 mt-2 flex items-center font-bold"><Icons.Clock size={10} className="mr-1"/>{formatDate(po.date)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {pendingOrders.length > 0 && <div className="p-2 border-t border-cream-100 bg-cream-50"><button onClick={() => { setActiveTab('jadwal_pesanan'); setIsNotifOpen(false); }} className="w-full py-2 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">Lihat Semua Jadwal</button></div>}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex-1 relative w-full overflow-hidden">
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'beranda' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><Beranda stats={stats} transactions={transactions} setTab={setActiveTab} orders={orders} balances={balances} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'transaksi' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><Transaksi addTransaction={addTransactionToCloud} balances={balances} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'saldo' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><SaldoPage balances={balances} saveBalances={saveBalancesToCloud} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'laporan' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><Laporan transactions={transactions} searchTerm={globalSearchTerm} setSearchTerm={setGlobalSearchTerm} onDelete={deleteTransactionFromCloud} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'tanggungan' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><TanggunganPage items={tanggungan} saveItems={saveTanggunganToCloud} addTransaction={addTransactionToCloud} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'katering' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><KeuanganKatering catering={catering} updateCatering={updateCateringInCloud} addTransaction={addTransactionToCloud} orders={orders} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'tambah_pesanan' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><FormTambahPesanan addOrder={addOrderToCloud} addTransaction={addTransactionToCloud} catering={catering} showToast={showToast} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'jadwal_pesanan' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><JadwalPesanan orders={orders} updateOrder={updateOrderInCloud} catering={catering} updateCatering={updateCateringInCloud} addTransaction={addTransactionToCloud} showToast={showToast} searchTerm={globalSearchTerm} setSearchTerm={setGlobalSearchTerm} /></div></div>
                    <div className={`absolute inset-0 overflow-y-auto p-4 md:p-8 custom-scrollbar ${activeTab === 'kambing' ? 'block' : 'hidden'}`}><div className="max-w-6xl mx-auto"><KeuanganKambing goatSuppliers={goatSuppliers} updateSuppliers={updateSuppliersInCloud} addTransaction={addTransactionToCloud} showToast={showToast} /></div></div>
                </div>
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


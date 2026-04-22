import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { LogIn, LogOut, RefreshCcw, Phone, MapPin, Package, Loader2 } from 'lucide-react';

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND}/api`;

const STATUS_COLORS = {
    pending:    'bg-amber-100 text-amber-900 border-amber-300',
    confirmed:  'bg-blue-100 text-blue-900 border-blue-300',
    preparing:  'bg-indigo-100 text-indigo-900 border-indigo-300',
    ready:      'bg-teal-100 text-teal-900 border-teal-300',
    delivered:  'bg-green-100 text-green-900 border-green-300',
    cancelled:  'bg-red-100 text-red-900 border-red-300',
};

const STATUS_OPTIONS = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];

export default function AdminPage() {
    const [token, setToken] = useState(() => localStorage.getItem('batatas_admin_token') || '');
    const [pwd, setPwd] = useState('');
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({ total_orders: 0, pending_orders: 0, today_orders: 0 });
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const headers = { 'X-Admin-Password': token };

    const login = async (e) => {
        e.preventDefault();
        if (!pwd.trim()) return;
        try {
            const r = await axios.post(`${API}/admin/login`, { password: pwd });
            const t = r.data.token;
            localStorage.setItem('batatas_admin_token', t);
            setToken(t);
            setPwd('');
            toast.success('Welcome back');
        } catch (err) {
            toast.error(err?.response?.data?.detail || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('batatas_admin_token');
        setToken('');
        setOrders([]);
    };

    const refresh = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const [o, s] = await Promise.all([
                axios.get(`${API}/admin/orders`, { headers: { 'X-Admin-Password': token } }),
                axios.get(`${API}/admin/stats`, { headers: { 'X-Admin-Password': token } }),
            ]);
            setOrders(o.data.orders || []);
            setStats(s.data);
        } catch (err) {
            if (err?.response?.status === 401) {
                toast.error('Session expired, please log in again');
                logout();
            } else {
                toast.error('Failed to load orders');
            }
        } finally {
            setLoading(false);
        }
    }, [token]);

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`${API}/admin/orders/${id}`, { status }, { headers });
            toast.success(`Marked as ${status}`);
            refresh();
        } catch (err) {
            toast.error('Update failed');
        }
    };

    useEffect(() => {
        if (token) {
            refresh();
            const t = setInterval(refresh, 15000);
            return () => clearInterval(t);
        }
    }, [token, refresh]);

    const visible = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

    if (!token) {
        return (
            <div className="min-h-screen bg-brand-cream grid place-items-center px-4">
                <form onSubmit={login} className="w-full max-w-sm bg-white rounded-3xl border border-brand-line p-8 shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
                    <div className="font-script text-brand-tan text-2xl -rotate-2">admin</div>
                    <h1 className="font-display uppercase text-3xl tracking-wide text-brand-ink">Batatas HQ</h1>
                    <p className="mt-2 font-body text-sm text-brand-muted">Sign in to view orders.</p>
                    <label className="block mt-6 font-body text-xs uppercase tracking-widest text-brand-muted">Password</label>
                    <input
                        type="password"
                        data-testid="admin-password-input"
                        autoFocus
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        className="mt-2 w-full bg-brand-cream rounded-xl border border-brand-line px-4 py-3 font-body focus:border-brand-tan outline-none"
                        placeholder="Enter admin password"
                    />
                    <button
                        type="submit"
                        data-testid="admin-login-btn"
                        className="mt-5 w-full py-3 rounded-full bg-brand-tan text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-brand-tanDark active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2"
                    >
                        <LogIn size={15} /> Sign in
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream text-brand-ink">
            {/* Top bar */}
            <header className="bg-brand-ink text-brand-cream px-4 md:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="font-script text-brand-tan text-xl -rotate-2">admin</div>
                    <div className="font-display uppercase text-2xl tracking-wider text-brand-cream">Batatas HQ</div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={refresh} data-testid="admin-refresh-btn" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-brand-cream text-xs uppercase tracking-widest font-bold transition-colors">
                        {loading ? <Loader2 size={13} className="animate-spin"/> : <RefreshCcw size={13}/>} Refresh
                    </button>
                    <button onClick={logout} data-testid="admin-logout-btn" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-tan hover:bg-brand-tanDark text-white text-xs uppercase tracking-widest font-bold transition-colors">
                        <LogOut size={13}/> Logout
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Today', value: stats.today_orders, testid: 'stat-today' },
                        { label: 'Pending', value: stats.pending_orders, testid: 'stat-pending' },
                        { label: 'All-time', value: stats.total_orders, testid: 'stat-total' },
                    ].map((s) => (
                        <div key={s.label} data-testid={s.testid} className="bg-white rounded-2xl border border-brand-line p-5">
                            <div className="font-body text-[11px] uppercase tracking-widest text-brand-muted">{s.label}</div>
                            <div className="font-display text-4xl text-brand-ink mt-1">{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                    {['all', ...STATUS_OPTIONS].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            data-testid={`admin-filter-${s}`}
                            className={`whitespace-nowrap px-4 py-2 rounded-full font-body text-[11px] uppercase tracking-widest font-bold border transition-all ${filter === s ? 'bg-brand-ink text-brand-cream border-brand-ink' : 'bg-white text-brand-muted border-brand-line hover:border-brand-tan'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Orders */}
                {visible.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-brand-line p-12 text-center">
                        <Package className="mx-auto text-brand-tan mb-3" size={32} />
                        <div className="font-display uppercase text-xl">No orders yet</div>
                        <p className="font-body text-sm text-brand-muted mt-1">New orders will appear here automatically.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {visible.map((o) => (
                            <details key={o.id} data-testid={`order-card-${o.short_id}`} className="group bg-white rounded-2xl border border-brand-line overflow-hidden">
                                <summary className="flex items-center gap-4 p-4 cursor-pointer list-none">
                                    <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-6 gap-3 items-center">
                                        <div>
                                            <div className="font-display uppercase text-sm text-brand-ink tracking-wide">#{o.short_id}</div>
                                            <div className="font-body text-[11px] text-brand-muted">{new Date(o.created_at).toLocaleString()}</div>
                                        </div>
                                        <div className="col-span-1 md:col-span-2">
                                            <div className="font-body text-sm text-brand-ink font-bold truncate">{o.customer_name}</div>
                                            <a href={`tel:${o.customer_phone}`} className="font-body text-xs text-brand-tan inline-flex items-center gap-1 hover:underline"><Phone size={11}/> {o.customer_phone}</a>
                                        </div>
                                        <div className="font-body text-xs text-brand-muted inline-flex items-center gap-1 capitalize"><MapPin size={11}/> {o.branch}</div>
                                        <div className="font-body text-xs text-brand-muted capitalize">{o.order_type}</div>
                                        <div className="flex items-center justify-end gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${o.payment_method === 'online' ? 'bg-brand-tan/15 text-brand-tanDark' : 'bg-brand-ink/10 text-brand-ink'}`}>
                                                {o.payment_method === 'online' ? 'Online' : o.payment_method === 'cod' ? 'COD' : 'Counter'}
                                            </span>
                                            <div className="font-display text-lg text-brand-ink">₹{o.amount}</div>
                                            <span className={`px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-widest font-bold ${STATUS_COLORS[o.status] || 'bg-brand-cream text-brand-muted border-brand-line'}`}>{o.status}</span>
                                        </div>
                                    </div>
                                </summary>
                                <div className="border-t border-brand-line px-4 py-4 bg-brand-cream/40 space-y-4">
                                    {/* Items */}
                                    <div>
                                        <div className="font-body text-[10px] uppercase tracking-widest text-brand-muted mb-2">Items</div>
                                        <ul className="space-y-1 font-body text-sm">
                                            {o.items.map((it) => (
                                                <li key={it.id} className="flex justify-between">
                                                    <span>{it.qty}× {it.name}</span>
                                                    <span className="text-brand-muted">₹{it.line_total}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {o.customer_address && (
                                        <div>
                                            <div className="font-body text-[10px] uppercase tracking-widest text-brand-muted">Delivery address</div>
                                            <div className="font-body text-sm text-brand-ink">{o.customer_address}</div>
                                        </div>
                                    )}
                                    {o.notes && (
                                        <div>
                                            <div className="font-body text-[10px] uppercase tracking-widest text-brand-muted">Notes</div>
                                            <div className="font-body text-sm text-brand-ink">{o.notes}</div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                        <span className="font-body text-[10px] uppercase tracking-widest text-brand-muted mr-1">Set status:</span>
                                        {STATUS_OPTIONS.map((s) => (
                                            <button
                                                key={s}
                                                data-testid={`set-status-${s}-${o.short_id}`}
                                                onClick={() => updateStatus(o.id, s)}
                                                className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all ${o.status === s ? 'bg-brand-ink text-brand-cream border-brand-ink' : 'bg-white text-brand-muted border-brand-line hover:border-brand-tan hover:text-brand-tan'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                        {o.payment_link && (
                                            <a
                                                href={o.payment_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="ml-auto px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-brand-tan text-white hover:bg-brand-tanDark"
                                            >
                                                View Payment Link
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

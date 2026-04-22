import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Plus, Minus, Trash2, Truck, Store, ShoppingBag, Loader2, ArrowUpRight, CheckCircle2, Copy, CreditCard, Banknote, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND}/api`;

const BRANCH_OPTIONS = [
    { id: 'wandoor', label: 'Wandoor · Opp CH Button House' },
    { id: 'manjeri', label: 'Manjeri · KP Tower, Thurakkal Bypass' },
    { id: 'mampad', label: 'Mampad · Main Road' },
];

export default function CartSheet() {
    const { items, inc, dec, remove, clear, total, count, orderType, setOrderType, isOpen, setIsOpen } = useCart();
    const [step, setStep] = useState('cart'); // cart | details | placed
    const [form, setForm] = useState({ name: '', phone: '', branch: '', address: '', notes: '' });
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [loading, setLoading] = useState(false);
    const [placed, setPlaced] = useState(null);

    const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    // If order type changes, reset incompatible payment choice
    const offlineKey = orderType === 'delivery' ? 'cod' : 'counter';
    const offlineLabel = orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter';
    const OfflineIcon = orderType === 'delivery' ? Banknote : Wallet;

    const effectivePayment = useMemo(() => {
        if (paymentMethod === 'online') return 'online';
        return offlineKey;
    }, [paymentMethod, offlineKey]);

    const reset = () => {
        clear();
        setIsOpen(false);
        setStep('cart');
        setForm({ name: '', phone: '', branch: '', address: '', notes: '' });
        setPaymentMethod('online');
        setPlaced(null);
    };

    const handlePlace = async () => {
        if (!form.name.trim() || !form.phone.trim()) { toast.error('Please enter your name and phone'); return; }
        if (!form.branch) { toast.error('Please select a branch'); return; }
        if (orderType === 'delivery' && !form.address.trim()) { toast.error('Address is required for delivery'); return; }

        setLoading(true);
        try {
            const resp = await axios.post(`${API}/orders/create`, {
                items: items.map((i) => ({ id: i.id, qty: i.qty })),
                order_type: orderType,
                payment_method: effectivePayment,
                branch: form.branch,
                customer_name: form.name,
                customer_phone: form.phone,
                customer_address: form.address,
                notes: form.notes,
            });
            setPlaced(resp.data);
            setStep('placed');
            toast.success('Order placed successfully!');
        } catch (e) {
            toast.error(e?.response?.data?.detail || 'Order failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyOrderId = async () => {
        try { await navigator.clipboard.writeText(placed.short_id); toast.success('Order ID copied'); } catch { /* ignore */ }
    };

    return (
        <Sheet open={isOpen} onOpenChange={(v) => { if (!v && step === 'placed') reset(); else setIsOpen(v); }}>
            <SheetContent data-testid="cart-sheet" side="right" className="w-full sm:max-w-md p-0 bg-brand-cream border-l border-brand-line flex flex-col">
                <SheetHeader className="bg-brand-ink text-brand-cream p-6 border-b-2 border-brand-tan">
                    <SheetTitle className="font-display uppercase text-2xl tracking-wider text-brand-cream flex items-center gap-3">
                        <ShoppingBag size={20} />
                        {step === 'placed' ? 'Order Placed' : `Your Cart · ${count}`}
                    </SheetTitle>
                </SheetHeader>

                {/* EMPTY */}
                {count === 0 && step !== 'placed' && (
                    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                        <div className="h-20 w-20 rounded-full bg-brand-tan/15 grid place-items-center mb-4">
                            <ShoppingBag size={30} className="text-brand-tan" />
                        </div>
                        <div className="font-display text-2xl uppercase text-brand-ink">Empty cart</div>
                        <p className="mt-2 font-body text-sm text-brand-muted">Add some crispy goodness to get started.</p>
                        <button data-testid="cart-close-empty-btn" onClick={() => setIsOpen(false)} className="mt-6 px-6 py-3 rounded-full bg-brand-tan text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-tanDark">Browse Menu</button>
                    </div>
                )}

                {/* PLACED */}
                {step === 'placed' && placed && (
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                        <div className="rounded-2xl bg-white border border-brand-line p-5">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-brand-tan/15 grid place-items-center text-brand-tan mt-1"><CheckCircle2 size={20} /></div>
                                <div>
                                    <div className="font-display uppercase text-xl text-brand-ink">Order #{placed.short_id}</div>
                                    <p className="mt-1 font-body text-sm text-brand-muted">
                                        Thank you! Our team at <span className="font-bold capitalize text-brand-ink">{placed.branch}</span> will call you shortly to confirm.
                                    </p>
                                </div>
                            </div>
                            <button onClick={copyOrderId} data-testid="copy-order-id-btn" className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-tan hover:text-brand-tanDark">
                                <Copy size={13}/> Copy Order ID
                            </button>
                        </div>

                        {placed.payment_method === 'online' && placed.payment_link ? (
                            <div className="rounded-2xl bg-white border border-brand-line p-5">
                                <div className="font-body text-xs uppercase tracking-widest text-brand-muted mb-2">Amount to pay · Online</div>
                                <div className="font-display text-4xl text-brand-ink">₹{placed.amount}</div>
                                <a
                                    href={placed.payment_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="pay-on-razorpay-btn"
                                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-brand-tan text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-brand-tanDark active:scale-[0.98] transition-all"
                                >
                                    Pay ₹{placed.amount} on Razorpay <ArrowUpRight size={16} />
                                </a>
                                <p className="mt-3 font-body text-[11px] text-brand-muted leading-relaxed">
                                    Please mention Order <span className="font-bold">#{placed.short_id}</span> as a note on the Razorpay page.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-2xl bg-white border border-brand-line p-5">
                                <div className="flex items-center gap-2 text-brand-tan font-body text-xs uppercase tracking-widest font-bold">
                                    {placed.payment_method === 'cod' ? <Banknote size={15}/> : <Wallet size={15}/>}
                                    {placed.payment_method === 'cod' ? 'Cash on Delivery' : 'Pay at Counter'}
                                </div>
                                <div className="mt-2 font-display text-4xl text-brand-ink">₹{placed.amount}</div>
                                <p className="mt-3 font-body text-sm text-brand-muted">
                                    {placed.payment_method === 'cod'
                                        ? 'Please keep the exact amount ready. Our delivery partner will collect it on arrival.'
                                        : 'Please pay at the counter when you arrive. Your order will be ready for pickup/seating.'}
                                </p>
                            </div>
                        )}

                        <button onClick={reset} data-testid="place-another-order-btn" className="w-full px-5 py-3 rounded-full bg-brand-ink text-brand-cream font-body font-bold uppercase tracking-widest text-xs hover:bg-brand-tan transition-colors">
                            Place another order
                        </button>
                    </div>
                )}

                {/* CART OR DETAILS */}
                {count > 0 && step !== 'placed' && (
                    <>
                        <div className="flex-1 overflow-y-auto p-5 space-y-3">
                            {step === 'cart' && items.map((it) => (
                                <div key={it.id} data-testid={`cart-line-${it.id}`} className="flex gap-3 bg-white rounded-2xl p-3 border border-brand-line">
                                    <img src={it.image} alt={it.name} className="h-20 w-20 rounded-xl object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-display uppercase text-base text-brand-ink truncate">{it.name}</div>
                                        <div className="font-body text-sm text-brand-tan font-bold">₹{it.price}</div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <button onClick={() => dec(it.id)} data-testid={`cart-dec-${it.id}`} className="h-7 w-7 grid place-items-center rounded-full bg-brand-cream border border-brand-line hover:bg-brand-tan hover:text-white hover:border-brand-tan transition-colors"><Minus size={13}/></button>
                                            <span data-testid={`cart-qty-${it.id}`} className="font-bold w-6 text-center">{it.qty}</span>
                                            <button onClick={() => inc(it.id)} data-testid={`cart-inc-${it.id}`} className="h-7 w-7 grid place-items-center rounded-full bg-brand-cream border border-brand-line hover:bg-brand-tan hover:text-white hover:border-brand-tan transition-colors"><Plus size={13}/></button>
                                            <button onClick={() => remove(it.id)} data-testid={`cart-remove-${it.id}`} className="ml-auto text-brand-tan hover:text-brand-tanDark" aria-label="Remove"><Trash2 size={16}/></button>
                                        </div>
                                    </div>
                                    <div className="font-display text-brand-ink text-lg self-start">₹{it.price * it.qty}</div>
                                </div>
                            ))}

                            {step === 'details' && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="font-body text-xs uppercase tracking-widest text-brand-muted">Full Name</label>
                                        <input data-testid="checkout-name-input" value={form.name} onChange={(e)=>update('name',e.target.value)} className="mt-1 w-full bg-white rounded-xl border border-brand-line px-4 py-3 font-body focus:border-brand-tan outline-none" placeholder="e.g. Aisha Rahman" />
                                    </div>
                                    <div>
                                        <label className="font-body text-xs uppercase tracking-widest text-brand-muted">Phone</label>
                                        <input data-testid="checkout-phone-input" value={form.phone} onChange={(e)=>update('phone',e.target.value)} className="mt-1 w-full bg-white rounded-xl border border-brand-line px-4 py-3 font-body focus:border-brand-tan outline-none" placeholder="+91 9XXXXXXXXX" />
                                    </div>
                                    <div>
                                        <label className="font-body text-xs uppercase tracking-widest text-brand-muted">Select Branch</label>
                                        <select
                                            data-testid="checkout-branch-select"
                                            value={form.branch}
                                            onChange={(e) => update('branch', e.target.value)}
                                            className="mt-1 w-full bg-white rounded-xl border border-brand-line px-4 py-3 font-body focus:border-brand-tan outline-none"
                                        >
                                            <option value="" disabled>Choose a branch…</option>
                                            {BRANCH_OPTIONS.map((b) => (
                                                <option key={b.id} value={b.id}>{b.label}</option>
                                            ))}
                                            <option value="" disabled>Dubai · Coming soon</option>
                                        </select>
                                    </div>
                                    {orderType === 'delivery' && (
                                        <div>
                                            <label className="font-body text-xs uppercase tracking-widest text-brand-muted">Delivery Address</label>
                                            <textarea data-testid="checkout-address-input" value={form.address} onChange={(e)=>update('address',e.target.value)} rows={3} className="mt-1 w-full bg-white rounded-xl border border-brand-line px-4 py-3 font-body focus:border-brand-tan outline-none" placeholder="House no, street, landmark" />
                                            <p className="mt-1 text-[11px] text-brand-tan font-bold">🚚 Home delivery available only within 5 km radius.</p>
                                        </div>
                                    )}

                                    {/* Payment Method */}
                                    <div>
                                        <label className="font-body text-xs uppercase tracking-widest text-brand-muted">Payment Method</label>
                                        <div data-testid="payment-method-group" className="mt-2 grid grid-cols-1 gap-2">
                                            <button
                                                type="button"
                                                data-testid="payment-online-btn"
                                                onClick={() => setPaymentMethod('online')}
                                                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${paymentMethod === 'online' ? 'border-brand-tan bg-brand-tan/10' : 'border-brand-line bg-white hover:border-brand-tan'}`}
                                            >
                                                <div className={`h-10 w-10 rounded-full grid place-items-center ${paymentMethod === 'online' ? 'bg-brand-tan text-white' : 'bg-brand-cream text-brand-muted'}`}><CreditCard size={17}/></div>
                                                <div className="flex-1">
                                                    <div className="font-body font-bold text-sm text-brand-ink">Pay Online</div>
                                                    <div className="font-body text-[11px] text-brand-muted">UPI · Card · Netbanking via Razorpay</div>
                                                </div>
                                                <span className={`h-4 w-4 rounded-full border-2 ${paymentMethod === 'online' ? 'bg-brand-tan border-brand-tan' : 'border-brand-line'}`}></span>
                                            </button>
                                            <button
                                                type="button"
                                                data-testid={orderType === 'delivery' ? 'payment-cod-btn' : 'payment-counter-btn'}
                                                onClick={() => setPaymentMethod('offline')}
                                                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${paymentMethod === 'offline' ? 'border-brand-tan bg-brand-tan/10' : 'border-brand-line bg-white hover:border-brand-tan'}`}
                                            >
                                                <div className={`h-10 w-10 rounded-full grid place-items-center ${paymentMethod === 'offline' ? 'bg-brand-tan text-white' : 'bg-brand-cream text-brand-muted'}`}><OfflineIcon size={17}/></div>
                                                <div className="flex-1">
                                                    <div className="font-body font-bold text-sm text-brand-ink">{offlineLabel}</div>
                                                    <div className="font-body text-[11px] text-brand-muted">
                                                        {orderType === 'delivery' ? 'Pay cash when your order arrives' : 'Pay at the counter when you arrive'}
                                                    </div>
                                                </div>
                                                <span className={`h-4 w-4 rounded-full border-2 ${paymentMethod === 'offline' ? 'bg-brand-tan border-brand-tan' : 'border-brand-line'}`}></span>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="font-body text-xs uppercase tracking-widest text-brand-muted">Notes (optional)</label>
                                        <input data-testid="checkout-notes-input" value={form.notes} onChange={(e)=>update('notes',e.target.value)} className="mt-1 w-full bg-white rounded-xl border border-brand-line px-4 py-3 font-body focus:border-brand-tan outline-none" placeholder="Less spicy, extra sauce..." />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-brand-line bg-white p-5 space-y-3">
                            <div data-testid="order-type-toggle" className="grid grid-cols-2 gap-2 p-1 rounded-full bg-brand-cream">
                                <button data-testid="order-type-delivery-btn" onClick={() => { setOrderType('delivery'); }} className={`flex items-center justify-center gap-2 py-2 rounded-full font-body font-bold text-xs uppercase tracking-widest transition-all ${orderType==='delivery'?'bg-brand-tan text-white':'text-brand-muted'}`}><Truck size={14}/> Delivery</button>
                                <button data-testid="order-type-dinein-btn" onClick={() => { setOrderType('dine-in'); }} className={`flex items-center justify-center gap-2 py-2 rounded-full font-body font-bold text-xs uppercase tracking-widest transition-all ${orderType==='dine-in'?'bg-brand-ink text-brand-cream':'text-brand-muted'}`}><Store size={14}/> Dine-in</button>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="font-body text-xs uppercase tracking-widest text-brand-muted">Total</span>
                                <span data-testid="cart-total" className="font-display text-3xl text-brand-ink">₹{total}</span>
                            </div>

                            {step === 'cart' ? (
                                <button data-testid="proceed-to-checkout-btn" onClick={() => setStep('details')} className="ripple w-full py-4 rounded-full bg-brand-tan text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-brand-tanDark active:scale-[0.98] transition-all">
                                    Proceed to Checkout
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button data-testid="back-to-cart-btn" onClick={() => setStep('cart')} className="px-5 py-4 rounded-full bg-brand-cream text-brand-ink font-body font-bold uppercase tracking-widest text-xs border border-brand-line">Back</button>
                                    <button data-testid="checkout-btn" onClick={handlePlace} disabled={loading} className="ripple flex-1 py-4 rounded-full bg-brand-tan text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-brand-tanDark active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                                        {loading ? <><Loader2 size={16} className="animate-spin"/> Placing…</> : <>Place order · ₹{total}</>}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}

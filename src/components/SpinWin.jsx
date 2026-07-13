import React, { useState, useRef } from 'react';
import { X, Gift, ChevronRight, ArrowLeft, MapPin, User, Phone } from 'lucide-react';
import axios from 'axios';

const PIN = '0420';
const MASCOT = '/images/mascot.png';
const BRANCHES = ['Manjeri', 'Wandoor', 'Thiruvali'];
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PRIZES = [
    { label: '20% Off', color: '#C21807', text: '#fff', weight: 2 },
    { label: '2 Piece Wings', color: '#C98A4B', text: '#fff', weight: 2 },
    { label: 'Free Mojito', color: '#C21807', text: '#fff', weight: 2 },
    { label: 'Free Fresh\nLime', color: '#C98A4B', text: '#fff', weight: 2 },
    { label: '10% Off', color: '#C21807', text: '#fff', weight: 2 },
    { label: 'Exotic French Fries', color: '#C98A4B', text: '#fff', weight: 2 },
];

const SEGMENT_ANGLE = 360 / PRIZES.length;

function WheelSVG({ rotation, spinning }) {
    return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl"
            style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
            <circle cx="100" cy="100" r="99" fill="none" stroke="#fff" strokeWidth="3" />
            {PRIZES.map((prize, idx) => {
                const startAngle = idx * SEGMENT_ANGLE - 90;
                const endAngle = startAngle + SEGMENT_ANGLE;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const midRad = ((startAngle + SEGMENT_ANGLE / 2) * Math.PI) / 180;
                const r = 98;
                const x1 = 100 + r * Math.cos(startRad);
                const y1 = 100 + r * Math.sin(startRad);
                const x2 = 100 + r * Math.cos(endRad);
                const y2 = 100 + r * Math.sin(endRad);
                const tx = 100 + 68 * Math.cos(midRad);
                const ty = 100 + 68 * Math.sin(midRad);
                const lines = prize.label.split('\n');
                return (
                    <g key={idx}>
                        <path d={`M100,100 L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`} fill={prize.color} stroke="#fff" strokeWidth="2" />
                        <text x={tx} y={ty} fill={prize.text} fontSize="7.5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle"
                            transform={`rotate(${startAngle + SEGMENT_ANGLE / 2 + 90}, ${tx}, ${ty})`} fontFamily="sans-serif">
                            {lines.map((line, li) => (
                                <tspan key={li} x={tx} dy={li === 0 ? (lines.length > 1 ? -5 : 0) : 10}>{line}</tspan>
                            ))}
                        </text>
                    </g>
                );
            })}
            <circle cx="100" cy="100" r="14" fill="#fff" stroke="#C98A4B" strokeWidth="3" />
            <circle cx="100" cy="100" r="7" fill="#C98A4B" />
        </svg>
    );
}

function CustomerInfoModal({ onNext, onBack }) {
    const [branch, setBranch] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!branch) e.branch = 'Please select a branch';
        if (!name.trim()) e.name = 'Please enter your name';
        if (!/^\d{10}$/.test(phone)) e.phone = 'Enter a valid 10-digit phone number';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (validate()) onNext({ branch, name, phone });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-sm bg-brand-cream rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="bg-brand-ink px-6 pt-5 pb-0 flex items-end justify-between">
                    <div>
                        <div className="font-script text-brand-tan text-xl -rotate-2 mb-0.5">almost there!</div>
                        <h2 className="font-display uppercase text-3xl text-white tracking-wide">Your Details</h2>
                        <p className="font-body text-xs text-white/40 mt-1 mb-4">Fill in your info to continue</p>
                    </div>
                    <img src={MASCOT} alt="mascot" className="w-20 h-auto self-end" />
                </div>

                <div className="px-6 py-5 space-y-4">
                    <div>
                        <label className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-brand-muted mb-2">
                            <MapPin size={12} /> Select Branch
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {BRANCHES.map((b) => (
                                <button key={b} onClick={() => { setBranch(b); setErrors(e => ({ ...e, branch: '' })); }}
                                    className={`px-4 py-2 rounded-full font-body text-xs font-bold uppercase tracking-widest border transition-all ${
                                        branch === b ? 'bg-brand-red text-white border-brand-red' : 'bg-white text-brand-ink border-brand-line hover:border-brand-red hover:text-brand-red'
                                    }`}>
                                    {b}
                                </button>
                            ))}
                        </div>
                        {errors.branch && <p className="font-body text-xs text-brand-red mt-1">{errors.branch}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-brand-muted mb-2">
                            <User size={12} /> Your Name
                        </label>
                        <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(ev => ({ ...ev, name: '' })); }}
                            placeholder="Enter your name"
                            className={`w-full px-4 py-3 rounded-xl border-2 bg-white font-body text-sm outline-none transition-all ${errors.name ? 'border-brand-red' : 'border-brand-line focus:border-brand-tan'}`} />
                        {errors.name && <p className="font-body text-xs text-brand-red mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-brand-muted mb-2">
                            <Phone size={12} /> Phone Number
                        </label>
                        <input type="tel" inputMode="numeric" value={phone}
                            onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setErrors(ev => ({ ...ev, phone: '' })); }}
                            placeholder="10-digit mobile number"
                            className={`w-full px-4 py-3 rounded-xl border-2 bg-white font-body text-sm outline-none transition-all ${errors.phone ? 'border-brand-red' : 'border-brand-line focus:border-brand-tan'}`} />
                        {errors.phone && <p className="font-body text-xs text-brand-red mt-1">{errors.phone}</p>}
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                        <button onClick={handleNext}
                            className="w-full py-3.5 rounded-full bg-brand-red text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-red-700 active:scale-95 transition-all shadow-[0_10px_30px_rgba(194,24,7,0.3)]">
                            Continue <ChevronRight size={16} className="inline" />
                        </button>
                        <button onClick={onBack}
                            className="w-full py-3 rounded-full bg-transparent text-brand-ink font-body font-bold uppercase tracking-widest text-sm border border-brand-ink/20 hover:border-brand-tan hover:text-brand-tan transition-all">
                            <ArrowLeft size={14} className="inline mr-1" /> Back
                        </button>
                    </div>
                </div>

                <button onClick={() => onBack(true)} className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <X size={16} className="text-white" />
                </button>
            </div>
        </div>
    );
}

function SpinWheel({ onClose, customer }) {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);
    const hasSpun = useRef(false);

    const spin = () => {
        if (spinning || hasSpun.current) return;
        hasSpun.current = true;
        setSpinning(true);

        const totalWeight = PRIZES.reduce((s, p) => s + p.weight, 0);
        let rand = Math.random() * totalWeight;
        let prizeIndex = 0;
        for (let i = 0; i < PRIZES.length; i++) {
            rand -= PRIZES[i].weight;
            if (rand <= 0) { prizeIndex = i; break; }
        }

        const extraSpins = 5 + Math.floor(Math.random() * 3);
        const targetAngle = 360 - (prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2);
        const finalRotation = rotation + extraSpins * 360 + targetAngle;
        setRotation(finalRotation);

        setTimeout(async () => {
            setSpinning(false);
            const prize = PRIZES[prizeIndex];
            setResult(prize);
            // Save to backend
            try {
                await axios.post(`${API}/spin/result`, {
                    name: customer.name,
                    phone: customer.phone,
                    branch: customer.branch,
                    prize: prize.label.replace('\n', ' '),
                });
            } catch (e) {
                console.error('Failed to save spin result', e);
            }
        }, 4500);
    };

    const isWin = result && !result.label.includes('Luck');

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-brand-ink rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="bg-brand-red px-6 pt-6 pb-3 text-center relative">
                    <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                        <X size={16} className="text-white" />
                    </button>
                    <div className="font-script text-white/80 text-xl -rotate-2">spin &</div>
                    <h2 className="font-display uppercase text-4xl text-white tracking-widest">WIN!</h2>
                    {customer && <p className="font-body text-xs text-white/70 mt-1">Good luck, {customer.name}! · {customer.branch}</p>}
                </div>

                {!result ? (
                    <div className="px-6 pb-8">
                        <div className="relative flex items-end justify-center mt-2">
                            <div className="relative z-10 -mr-6 mb-0 self-end">
                                <img src={MASCOT} alt="Batataas mascot" className="w-36 h-auto drop-shadow-xl" style={{ transform: 'scaleX(-1)' }} />
                            </div>
                            <div className="relative w-56 h-56 shrink-0">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[22px] border-l-transparent border-r-transparent border-b-brand-yellow drop-shadow-md" />
                                </div>
                                <div className="absolute inset-0 rounded-full"
                                    style={{ boxShadow: spinning ? '0 0 40px rgba(201,138,75,0.6)' : '0 0 20px rgba(201,138,75,0.3)', transition: 'box-shadow 0.5s' }} />
                                <WheelSVG rotation={rotation} spinning={spinning} />
                            </div>
                        </div>
                        <button onClick={spin} disabled={spinning || hasSpun.current}
                            className="mt-5 w-full py-4 rounded-full font-body font-bold uppercase tracking-widest text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: spinning ? '#555' : 'linear-gradient(135deg, #C98A4B, #e0a85e)', color: '#fff' }}>
                            {spinning ? '🎰 Spinning...' : '🎰 SPIN THE WHEEL!'}
                        </button>
                        <p className="text-center font-body text-xs text-white/40 mt-3">One spin per eligible order · Staff must be present</p>
                    </div>
                ) : (
                    <div className="px-6 pb-8 text-center">
                        <div className="flex justify-center mt-2 mb-2">
                            <img src={MASCOT} alt="Batataas mascot" className={`w-32 h-auto drop-shadow-xl transition-all duration-500 ${isWin ? '' : 'grayscale opacity-60'}`} />
                        </div>
                        {isWin ? (
                            <>
                                <div className="text-4xl mb-2">🎉</div>
                                <div className="font-script text-brand-tan text-2xl -rotate-2 mb-1">you won</div>
                                <h3 className="font-display uppercase text-4xl text-white tracking-wide mb-3">{result.label.replace('\n', ' ')}</h3>
                                <div className="bg-brand-red/20 border border-brand-red/40 rounded-2xl px-4 py-3 mb-6">
                                    <p className="font-body text-sm text-white/80">🎁 Show this screen to our staff to redeem your reward on this bill!</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-4xl mb-2">😔</div>
                                <h3 className="font-display uppercase text-3xl text-white tracking-wide mb-3">Better Luck Next Time!</h3>
                                <p className="font-body text-sm text-white/60 mb-6">Thank you for participating. Come back with your next order!</p>
                            </>
                        )}
                        <button onClick={onClose} className="w-full py-3.5 rounded-full bg-brand-tan text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-brand-tanDark transition-colors">
                            Back to Menu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function PinModal({ onSuccess, onBack }) {
    const [pin, setPin] = useState(['', '', '', '']);
    const [error, setError] = useState(false);
    const inputs = useRef([]);

    const handleChange = (val, idx) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...pin];
        next[idx] = val;
        setPin(next);
        setError(false);
        if (val && idx < 3) inputs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace' && !pin[idx] && idx > 0) inputs.current[idx - 1]?.focus();
    };

    const handleSubmit = () => {
        if (pin.join('') === PIN) { onSuccess(); }
        else { setError(true); setPin(['', '', '', '']); inputs.current[0]?.focus(); }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-sm bg-brand-cream rounded-t-[2rem] sm:rounded-[2rem] p-8 shadow-2xl text-center">
                <button onClick={onBack} className="absolute top-4 left-4 h-9 w-9 grid place-items-center rounded-full bg-brand-ink/10 hover:bg-brand-ink/20 transition-colors">
                    <ArrowLeft size={16} />
                </button>
                <button onClick={() => onBack(true)} className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-brand-ink/10 hover:bg-brand-ink/20 transition-colors">
                    <X size={16} />
                </button>
                <img src={MASCOT} alt="mascot" className="w-24 h-auto mx-auto mb-3 drop-shadow-lg" />
                <h2 className="font-display uppercase text-2xl text-brand-ink tracking-wide mb-1">Staff PIN</h2>
                <p className="font-body text-sm text-brand-muted mb-6">Ask our staff to enter the secret PIN to unlock your spin.</p>
                <div className="flex justify-center gap-3 mb-4">
                    {pin.map((d, idx) => (
                        <input key={idx} ref={el => inputs.current[idx] = el} type="password" inputMode="numeric" maxLength={1} value={d}
                            onChange={e => handleChange(e.target.value, idx)} onKeyDown={e => handleKeyDown(e, idx)}
                            className={`h-14 w-14 text-center text-2xl font-bold rounded-2xl border-2 bg-white outline-none transition-all ${error ? 'border-brand-red text-brand-red' : 'border-brand-line focus:border-brand-tan'}`} />
                    ))}
                </div>
                {error && <p className="font-body text-xs text-brand-red mb-4 font-bold">Incorrect PIN. Please try again.</p>}
                <button onClick={handleSubmit} disabled={pin.join('').length < 4}
                    className="w-full py-3 rounded-full bg-brand-red text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-red-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Unlock Spin <ChevronRight size={16} className="inline" />
                </button>
            </div>
        </div>
    );
}

function RulesModal({ onParticipate, onClose }) {
    const RULES = [
    'Valid on every order above ₹400.',
    'Offer only available for dine-in. Not applicable on delivery orders.',
    'Our staff will enter the secret PIN to unlock your spin.',
    'Offer must be redeemed on the same bill you became eligible on.',
    'You must participate in the presence of our staff.',
    'Only 1 attempt per person.',
];
    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-sm bg-brand-cream rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden">
                <div className="bg-brand-ink px-6 pt-5 pb-0 flex items-end justify-between">
                    <div>
                        <div className="font-script text-brand-tan text-xl -rotate-2 mb-0.5">spin & win</div>
                        <h2 className="font-display uppercase text-4xl text-white tracking-wide">Rules</h2>
                        <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-4">Read before participating</p>
                    </div>
                    <img src={MASCOT} alt="mascot" className="w-24 h-auto self-end" />
                </div>
                <div className="px-6 py-5">
                    <ul className="space-y-3 mb-6">
                        {RULES.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="shrink-0 h-6 w-6 rounded-full bg-brand-red text-white font-display text-xs grid place-items-center mt-0.5">{idx + 1}</span>
                                <span className="font-body text-sm text-brand-ink leading-relaxed">{rule}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-2">
                        <button onClick={onParticipate} className="w-full py-3.5 rounded-full bg-brand-red text-white font-body font-bold uppercase tracking-widest text-sm hover:bg-red-700 active:scale-95 transition-all shadow-[0_10px_30px_rgba(194,24,7,0.3)]">
                            🎰 Participate Now
                        </button>
                        <button onClick={onClose} className="w-full py-3 rounded-full bg-transparent text-brand-ink font-body font-bold uppercase tracking-widest text-sm border border-brand-ink/20 hover:border-brand-tan hover:text-brand-tan transition-all">
                            Back to Main Menu
                        </button>
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <X size={16} className="text-white" />
                </button>
            </div>
        </div>
    );
}

export default function SpinWin() {
    const [step, setStep] = useState(null);
    const [customer, setCustomer] = useState(null);
    return (
        <>
            <button onClick={() => setStep('rules')}
    className="ripple inline-flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-4 rounded-full text-white font-body font-bold uppercase tracking-widest text-[10px] md:text-[12px] active:scale-95 transition-all"
    style={{ background: '#C21807', boxShadow: '0 10px 30px rgba(194,24,7,0.4)' }}>
    🎰 Spin & Win
</button>
            {step === 'rules' && <RulesModal onParticipate={() => setStep('info')} onClose={() => setStep(null)} />}
            {step === 'info' && <CustomerInfoModal onNext={(data) => { setCustomer(data); setStep('pin'); }} onBack={(close) => setStep(close ? null : 'rules')} />}
            {step === 'pin' && <PinModal onSuccess={() => setStep('wheel')} onBack={(close) => setStep(close ? null : 'info')} />}
            {step === 'wheel' && <SpinWheel onClose={() => { setStep(null); setCustomer(null); }} customer={customer} />}
        </>
    );
}

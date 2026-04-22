import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Branches from './components/Branches';
import About from './components/About';
import Franchise from './components/Franchise';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import CartSheet from './components/CartSheet';
import AdminPage from './pages/AdminPage';
import { FALLBACK_MENU } from './data/menuData';
import './App.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND}/api`;

const FALLBACK_BRANCHES = [
    { id: 'wandoor', name: 'Wandoor', address: 'Opp CH Button House, Wandoor', phone: '+919061160269', map: 'https://www.google.com/maps/search/?api=1&query=Bataatas+Wandoor', status: 'open' },
    { id: 'manjeri', name: 'Manjeri', address: 'KP Tower, Thurakkal Bypass, Manjeri', phone: '+918111980269', map: 'https://www.google.com/maps/search/?api=1&query=Bataatas+Manjeri', status: 'open' },
    { id: 'mampad', name: 'Mampad', address: 'Mampad, Kerala', phone: '', map: 'https://maps.app.goo.gl/jUpvhTXLrgJT8Vpq5', status: 'open' },
    { id: 'dubai', name: 'Dubai', address: 'Coming Soon', phone: '', map: '', status: 'coming_soon' },
];

function Landing() {
    const [menu, setMenu] = useState(FALLBACK_MENU);
    const [branches, setBranches] = useState(FALLBACK_BRANCHES);

    useEffect(() => {
        axios.get(`${API}/menu`).then((r) => { if (r?.data?.categories?.length) setMenu(r.data); }).catch(() => {});
        axios.get(`${API}/branches`).then((r) => { if (r?.data?.branches?.length) setBranches(r.data.branches); }).catch(() => {});
    }, []);

    return (
        <CartProvider>
            <div className="App bg-brand-cream min-h-screen text-brand-ink">
                <Header />
                <main>
                    <Hero />
                    <Menu menuData={menu} />
                    <About />
                    <Branches branches={branches} />
                    <Franchise />
                </main>
                <Footer branches={branches} />
                <FloatingCart />
                <CartSheet />
            </div>
        </CartProvider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Landing />} />
            </Routes>
            <Toaster position="top-center" richColors />
        </BrowserRouter>
    );
}

export default App;

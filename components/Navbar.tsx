import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Features', path: '/features' },
        { label: 'Security', path: '/security' },
        { label: 'How It Works', path: '/how-it-works' },
    ];

    return (
        <>
            <nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 ${isScrolled
                        ? 'top-4 bg-zinc-900/80 border-white/10 shadow-2xl shadow-black/50'
                        : 'top-6 bg-transparent border-transparent'
                    } border rounded-full backdrop-blur-xl`}
            >
                <div className="px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                            NetGuard
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 bg-white/5 rounded-full px-2 py-1 border border-white/5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                                        ? 'bg-white/10 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/dashboard"
                            className="group relative px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] active:scale-95"
                        >
                            Open Dashboard
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-xl transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <div className="flex flex-col items-center justify-center h-screen space-y-8 p-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-bold text-zinc-400 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="w-12 h-px bg-white/10 my-8" />

                    <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-8 py-4 rounded-full bg-white text-black text-lg font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2"
                    >
                        Open Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </>
    );
};

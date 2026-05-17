import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Menu,
    X,
    BookOpen,
    Info,
    Calendar,
    FileText,
    PhoneCall,
    LayoutGrid,
    LogIn,
    LayoutDashboard,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
}

export const PublicNavbar: React.FC = () => {
    const { url, props } = usePage();
    const auth = props.auth as { user: any } | undefined;

    const [isOpen, setIsOpen] = useState(false);

    const navItems: NavItem[] = [
        { title: 'Beranda', href: '/', icon: LayoutGrid },
        { title: 'Tentang', href: '/about', icon: Info },
        { title: 'Kegiatan', href: '/activities', icon: Calendar },
        { title: 'Dokumen', href: '/dokumen', icon: FileText },
        { title: 'Kontak', href: '/kontak', icon: PhoneCall },
    ];

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/40 dark:bg-slate-950/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/logo-noname.png"
                                alt="logo"
                                className="w-10"
                            />
                            {/* <BookOpen size={18} /> */}
                            <span className="font-sans text-xs font-black tracking-widest text-slate-900 uppercase dark:text-white">
                                {props.name}
                            </span>
                        </Link>
                    </div>

                    {/* Navigasi Utama + Tombol Akses Admin (Desktop) */}
                    <div className="hidden items-center gap-6 md:flex">
                        <div className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-[10px] font-black tracking-widest uppercase transition-all ${
                                            active
                                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                                        }`}
                                    >
                                        <Icon size={14} />
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Garis Pembatas Vertikal */}
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

                        {/* Tombol Login / Dashboard Dinamis */}
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-[10px] font-black tracking-widest text-white uppercase shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                <LayoutDashboard size={14} />
                                Panel Admin
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-[10px] font-black tracking-widest text-slate-700 uppercase transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                            >
                                <LogIn size={14} />
                                Masuk
                            </Link>
                        )}
                    </div>

                    {/* Tombol Menu Mobile */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-900"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Panel Navigasi Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 top-16 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden dark:bg-slate-950/40"
                        />

                        <motion.div
                            initial={{ translateY: '-100%', opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            exit={{ translateY: '-100%', opacity: 0 }}
                            transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.4,
                            }}
                            className="absolute inset-x-0 top-16 z-50 border-b border-slate-200 bg-white px-4 py-6 shadow-xl md:hidden dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div className="flex flex-col gap-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-xs font-black tracking-widest uppercase transition-all ${
                                                active
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
                                                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {item.title}
                                        </Link>
                                    );
                                })}

                                {/* Garis Pembatas Horisontal Mobile */}
                                <div className="my-3 h-px bg-slate-100 dark:bg-slate-900" />

                                {/* Tombol Login / Dashboard (Mobile) */}
                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-4 py-4 text-xs font-black tracking-widest text-white uppercase shadow-lg dark:bg-white dark:text-slate-950"
                                    >
                                        <LayoutDashboard size={16} />
                                        Panel Admin
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-4 text-xs font-black tracking-widest text-slate-700 uppercase dark:border-slate-800 dark:text-slate-300"
                                    >
                                        <LogIn size={16} />
                                        Masuk Ke Panel
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

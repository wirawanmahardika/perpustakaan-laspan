import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PublicNavbar } from '@/components/public-navbar';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    Search,
    Calendar,
    Users,
    ArrowUpRight,
    FolderOpen,
    SlidersHorizontal,
} from 'lucide-react';
import { formatHumanDate } from '@/lib/utils';
import { Kegiatan } from '@/types/my-type/kegiatan';
import { ProfilPerpus } from '@/types/my-type/profil-perpus';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    profile?: ProfilPerpus | null;
    activities: {
        data: Kegiatan[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        type?: string;
    };
}

const Index: React.FC<Props> = ({ profile, activities, filters }) => {
    // Fungsi Handle Pencarian & Filter Sinkron Berbasis Inertia router
    const handleFilter = (key: string, value: string) => {
        router.get(
            '/activities',
            { ...filters, [key]: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    // Konfigurasi variasi animasi framer-motion untuk kelancaran pemuatan grid
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.98, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 130, damping: 16 },
        },
    };

    // Pemetaan tipe kegiatan ke label representatif terformat
    const typeLabels: Record<string, string> = {
        pemberdayaan: 'Pemberdayaan Masyarakat',
        promosi: 'Promosi Literasi',
        kerjasama: 'Kemitraan & Kerjasama',
        layanan_khusus: 'Layanan Khusus Publik',
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <Head title="Arsip Kronologi Kegiatan - Portal Perpustakaan" />

            {/* Integrasi Navigasi Utama Publik */}
            <PublicNavbar />

            {/* Header Dokumentasi Publik */}
            <header className="relative overflow-hidden border-b border-slate-200/60 bg-white py-14 dark:border-slate-800/50 dark:bg-slate-900">
                <div className="bg-radial-at-t absolute inset-0 from-blue-50/40 via-transparent to-transparent dark:from-blue-950/15" />
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-blue-600 uppercase dark:bg-blue-950/50 dark:text-blue-400">
                            <Calendar size={11} /> Berita & Dokumentasi
                        </div>
                        <h1 className="font-sans text-2xl font-black tracking-tight text-slate-900 uppercase sm:text-3xl dark:text-white">
                            Kronologi Kegiatan
                        </h1>
                        <p className="mt-1 max-w-xl text-xs leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                            Penelusuran seluruh riwayat pelaksanaan program
                            kerja, rekam jejak perluasan literasi, serta
                            aktivitas pemberdayaan masyarakat desa.
                        </p>
                    </div>

                    {/* Bilah Pencarian Responsif Terintegrasi */}
                    <div className="relative w-full shrink-0 md:w-72">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Search size={14} />
                        </span>
                        <input
                            type="text"
                            defaultValue={filters.search}
                            onChange={(e) =>
                                handleFilter('search', e.target.value)
                            }
                            placeholder="Cari kegiatan atau narasi..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-10 text-xs font-medium focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-950"
                        />
                    </div>
                </div>
            </header>

            {/* Konten Utama Galeri Kegiatan */}
            <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
                {/* Batang Penyaringan Tipe Menggunakan Struktur Segmented Control */}
                <div className="no-scrollbar flex flex-wrap items-center gap-1.5 overflow-x-auto rounded-2xl border border-slate-200/60 bg-white p-3.5 shadow-xs select-none dark:border-slate-800/60 dark:bg-slate-900">
                    <div className="mr-1 flex shrink-0 items-center gap-1 border-r border-slate-100 px-2 pr-3 text-[10px] font-black tracking-widest text-slate-400 uppercase dark:border-slate-800">
                        <SlidersHorizontal size={12} /> Kategori:
                    </div>

                    <button
                        onClick={() => handleFilter('type', '')}
                        className={`shrink-0 rounded-lg px-3.5 py-2 text-[9px] font-black tracking-widest uppercase transition-all ${
                            !filters.type
                                ? 'bg-slate-900 text-white dark:bg-blue-600'
                                : 'border border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400'
                        }`}
                    >
                        Semua Tipe
                    </button>

                    {Object.entries(typeLabels).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => handleFilter('type', key)}
                            className={`shrink-0 rounded-lg px-3.5 py-2 text-[9px] font-black tracking-widest uppercase transition-all ${
                                filters.type === key
                                    ? 'bg-slate-900 text-white dark:bg-blue-600'
                                    : 'border border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Grid Visualisasi Berita Kegiatan */}
                {activities.data.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {activities.data.map((act) => {
                                const hasArticle =
                                    act.artikel && act.artikel.trim() !== '';

                                return (
                                    <motion.div
                                        key={act.id}
                                        variants={itemVariants}
                                        layout
                                        className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-xs transition-all ${
                                            hasArticle
                                                ? 'cursor-pointer border-slate-200/60 hover:border-blue-500/30 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900'
                                                : 'cursor-not-allowed border-slate-200/30 bg-slate-100/40 dark:border-slate-900/40 dark:bg-slate-950/20'
                                        }`}
                                    >
                                        <div className="space-y-4 p-5">
                                            {/* Bar Informasi Atas Kartu */}
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <span
                                                    className={`inline-block rounded-md px-2 py-0.5 font-mono text-[9px] font-black tracking-wider uppercase ${
                                                        hasArticle
                                                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                                                            : 'bg-slate-200/60 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                                                    }`}
                                                >
                                                    {act.tipe.replace('_', ' ')}
                                                </span>
                                                <span className="font-mono text-[10px] font-bold text-slate-400">
                                                    {formatHumanDate(
                                                        act.tanggal,
                                                    )}
                                                </span>
                                            </div>

                                            {/* Detail Judul dan Deskripsi */}
                                            <div className="space-y-2">
                                                <h3
                                                    className={`font-sans text-sm leading-snug font-black tracking-tight transition-colors ${
                                                        hasArticle
                                                            ? 'text-slate-800 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400'
                                                            : 'text-slate-400 dark:text-slate-600'
                                                    }`}
                                                >
                                                    {act.nama_kegiatan}
                                                </h3>
                                                <p className="line-clamp-3 text-[11px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                                                    "{act.deskripsi}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* Batang Informasi Bagian Bawah Kartu */}
                                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 dark:border-slate-800/60 dark:bg-slate-950/10">
                                            <div className="flex items-center gap-1.5 overflow-hidden pr-2 font-mono text-[9px] font-bold tracking-tight text-slate-400 uppercase">
                                                <Users
                                                    size={11}
                                                    className="shrink-0 text-slate-400"
                                                />
                                                <span className="truncate">
                                                    Pihak:{' '}
                                                    {act.pihak_terlibat ||
                                                        'Internal'}
                                                </span>
                                            </div>

                                            {/* Aksi Berdasarkan Kondisi Eksistensi Artikel */}
                                            {hasArticle ? (
                                                <Link
                                                    href={`/kegiatan/${act.id}/read/artikel`}
                                                    className="inline-flex h-7 items-center gap-1 rounded-lg bg-slate-900 px-2.5 text-[9px] font-black tracking-widest text-white uppercase transition-colors hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600"
                                                >
                                                    Baca{' '}
                                                    <ArrowUpRight size={10} />
                                                </Link>
                                            ) : (
                                                <span className="shrink-0 font-mono text-[8px] font-black tracking-wider text-amber-500 uppercase dark:text-amber-500/80">
                                                    Proses Rilis
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Tampilan Kasus Kosong Jika Pencarian Gagal Menemukan Hasil */
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 py-20 text-center shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
                        <FolderOpen
                            size={36}
                            className="mx-auto mb-3 text-slate-300 dark:text-slate-700"
                        />
                        <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Aktivitas Tidak Ditemukan
                        </p>
                        <p className="mt-1 text-xs text-slate-400/80">
                            Belum ada rilis dokumentasi kegiatan resmi untuk
                            kategori penelusuran ini.
                        </p>
                    </div>
                )}

                {/* Kontrol Navigasi Halaman / Pagination Berkelas */}
                {activities.links.length > 3 && (
                    <div className="mt-12 flex items-center justify-center gap-1.5 select-none">
                        {activities.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                onClick={(e) => !link.url && e.preventDefault()}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-[9px] font-black tracking-wider uppercase transition-all ${
                                    link.active
                                        ? 'bg-slate-900 text-white shadow-xs dark:bg-blue-600 dark:text-white'
                                        : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60'
                                } ${!link.url ? 'pointer-events-none cursor-not-allowed opacity-30' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Footer Konten */}
            <footer className="mt-16 border-t border-slate-200/60 bg-white py-8 text-center dark:border-slate-800/40 dark:bg-slate-950">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        © {new Date().getFullYear()} •{' '}
                        {profile?.nama_perpustakaan || 'Perpustakaan Desa'}
                    </p>
                    <p className="rounded bg-slate-100 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-slate-400 uppercase dark:bg-slate-900">
                        Dokumentasi Program Kerja Resmi
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Index;

import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PublicNavbar } from '@/components/public-navbar';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Search,
    Filter,
    FolderOpen,
    ArrowUpRight,
    Eye,
    Layers,
    BookOpen,
    CheckCircle,
    Users,
    Briefcase,
    Settings,
    Lightbulb,
    TrendingUp,
} from 'lucide-react';
import { Document } from '@/types/my-type/document';

export interface ProfilPerpus {
    id: number;
    nama_perpustakaan: string;
    [key: string]: any;
}

interface DocumentsProps {
    profile: ProfilPerpus | null;
    documents: Document[];
}

export default function Documents({ profile, documents = [] }: DocumentsProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Cara atur kategori sesuai dengan spesifikasi komponen instrumen
    const categories = [
        'koleksi',
        'sarpras',
        'layanan',
        'tenaga',
        'penyelenggaraan',
        'pengelolaan',
        'inovasi',
        'dampak',
    ];

    // Pemetaan teks agar representasi kategori di halaman publik lebih rapi dan informatif
    const categoryLabels: Record<string, string> = {
        koleksi: 'Koleksi Perpustakaan',
        sarpras: 'Sarana & Prasarana',
        layanan: 'Layanan Pemustaka',
        tenaga: 'Tenaga & Pengelola',
        penyelenggaraan: 'Penyelenggaraan',
        pengelolaan: 'Pengelolaan Kelembagaan',
        inovasi: 'Inovasi Penguat',
        dampak: 'Dampak & Hasil Nyata',
    };

    // Fungsi penentu ikon berdasarkan kluster instrumen akreditasi
    const getCategoryIcon = (kategori: string) => {
        switch (kategori) {
            case 'koleksi':
                return <BookOpen className="text-blue-500" size={16} />;
            case 'sarpras':
                return <Layers className="text-amber-500" size={16} />;
            case 'layanan':
                return <CheckCircle className="text-emerald-500" size={16} />;
            case 'tenaga':
                return <Users className="text-purple-500" size={16} />;
            case 'penyelenggaraan':
                return <Briefcase className="text-indigo-500" size={16} />;
            case 'pengelolaan':
                return <Settings className="text-cyan-500" size={16} />;
            case 'inovasi':
                return <Lightbulb className="text-yellow-500" size={16} />;
            case 'dampak':
                return <TrendingUp className="text-rose-500" size={16} />;
            default:
                return <FileText className="text-slate-400" size={16} />;
        }
    };

    // Cara atur filtrasi data (Gabungan filter kategori tab + pencarian teks interaktif)
    const filteredDocs = documents.filter((doc) => {
        const matchesCategory =
            selectedCategory === 'all' || doc.kategori === selectedCategory;
        const matchesSearch = doc.keterangan
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        // ||
        // (doc.label_bukti &&
        //     doc.label_bukti
        //         .toLowerCase()
        //         .includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Konfigurasi animasi kelancaran transisi item saat filter berpindah
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.97, y: 8 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 140, damping: 15 },
        },
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <Head title="Arsip Bukti Fisik & Dokumen - Portal Perpustakaan" />

            <PublicNavbar />

            {/* Header Dokumentasi Publik */}
            <header className="relative overflow-hidden border-b border-slate-200/60 bg-white py-14 dark:border-slate-800/50 dark:bg-slate-900">
                <div className="bg-radial-at-t absolute inset-0 from-blue-50/40 via-transparent to-transparent dark:from-blue-950/15" />
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-blue-600 uppercase dark:bg-blue-950/50 dark:text-blue-400">
                            <FileText size={11} /> Transparansi Portofolio
                        </div>
                        <h1 className="font-sans text-2xl font-black tracking-tight text-slate-900 uppercase sm:text-3xl dark:text-white">
                            Arsip Bukti Fisik
                        </h1>
                        <p className="mt-1 max-w-xl text-xs leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                            Galeri keterbukaan dokumen pendukung instrumen,
                            portofolio tata kelola, dan bukti fisik penilaian
                            standardisasi perpustakaan desa.
                        </p>
                    </div>

                    {/* Bilah Pencarian Responsif Terintegrasi */}
                    <div className="relative w-full shrink-0 md:w-72">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                            <Search size={14} />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nomor bukti / kata kunci..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-10 text-xs font-medium focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-950"
                        />
                    </div>
                </div>
            </header>

            {/* Konten Utama */}
            <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
                {/* Cara Atur Navigasi Filter Menggunakan Struktur Segmented Tab */}
                <div className="no-scrollbar flex flex-wrap items-center gap-1.5 overflow-x-auto rounded-2xl border border-slate-200/60 bg-white p-3.5 shadow-xs select-none dark:border-slate-800/60 dark:bg-slate-900">
                    <div className="mr-1 flex shrink-0 items-center gap-1 border-r border-slate-100 px-2 pr-3 text-[10px] font-black tracking-widest text-slate-400 uppercase dark:border-slate-800">
                        <Filter size={12} /> Kluster:
                    </div>

                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`shrink-0 rounded-lg px-3.5 py-2 text-[9px] font-black tracking-widest uppercase transition-all ${
                            selectedCategory === 'all'
                                ? 'bg-slate-900 text-white dark:bg-blue-600'
                                : 'border border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400'
                        }`}
                    >
                        Semua Komponen
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[9px] font-black tracking-widest uppercase transition-all ${
                                selectedCategory === cat
                                    ? 'bg-slate-900 text-white dark:bg-blue-600'
                                    : 'border border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400'
                            }`}
                        >
                            {getCategoryIcon(cat)}
                            {categoryLabels[cat] || cat}
                        </button>
                    ))}
                </div>

                {/* Struktur Grid Visualisasi Dokumen */}
                {filteredDocs.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredDocs.map((doc) => (
                                <motion.div
                                    key={doc.id}
                                    variants={itemVariants}
                                    layout
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() =>
                                        window.open(
                                            doc.file_url,
                                            '_blank',
                                            'noopener,noreferrer',
                                        )
                                    }
                                    className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xs transition-all hover:border-blue-500/30 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900"
                                >
                                    {/* Wadah Pratinjau: Mengadaptasi logika pengecekan file .pdf atau gambar */}
                                    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50 dark:border-slate-800/50 dark:bg-slate-950">
                                        {doc.file_path
                                            .toLowerCase()
                                            .endsWith('.pdf') ? (
                                            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center text-slate-400">
                                                <FileText
                                                    size={36}
                                                    className="text-red-500 dark:text-red-400/90"
                                                />
                                                <span className="rounded-md bg-red-50 px-1.5 py-0.5 font-mono text-[8px] font-black tracking-wider text-red-600 uppercase dark:bg-red-950/40 dark:text-red-400">
                                                    PDF SCAN
                                                </span>
                                            </div>
                                        ) : (
                                            <img
                                                src={doc.file_url}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
                                                alt={doc.keterangan}
                                            />
                                        )}

                                        {/* Modifikasi Hover Mask: Menampilkan petunjuk interaktif baca berkas */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition-opacity group-hover:opacity-100">
                                            <div className="flex translate-y-2 transform items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[9px] font-black tracking-widest text-slate-900 uppercase shadow-sm transition-transform group-hover:translate-y-0">
                                                <Eye size={12} /> Pratinjau{' '}
                                                <ArrowUpRight size={10} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Blok Detail Informasi Dokumen */}
                                    <div className="flex flex-1 flex-col justify-between space-y-2 p-3.5">
                                        <div className="space-y-1">
                                            {/* {doc.label_bukti && (
                                                <p className="font-mono text-[9px] font-black tracking-wider text-blue-600 uppercase dark:text-blue-400">
                                                    {doc.label_bukti}
                                                </p>
                                            )} */}
                                            <h3 className="line-clamp-2 text-[11px] leading-snug font-bold tracking-tight text-slate-700 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                                                {doc.keterangan}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-slate-100 pt-2 font-mono text-[8px] font-bold tracking-tight text-slate-400 uppercase dark:border-slate-800/60">
                                            <span className="max-w-[75px] truncate">
                                                {doc.kategori}
                                            </span>
                                            <span>#{doc.id}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Tampilan penanganan jika filter pencarian tidak menemukan berkas apapun */
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 py-20 text-center shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
                        <FolderOpen
                            size={36}
                            className="mx-auto mb-3 text-slate-300 dark:text-slate-700"
                        />
                        <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Berkas Tidak Ditemukan
                        </p>
                        <p className="mt-1 text-xs text-slate-400/80">
                            Tidak ada dokumen bukti fisik yang terindeks di
                            dalam kriteria pencarian Anda.
                        </p>
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
                        Portofolio Akreditasi Publik
                    </p>
                </div>
            </footer>
        </div>
    );
}

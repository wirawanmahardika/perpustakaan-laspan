import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    Activity,
    Layers,
    ExternalLink,
    FileText,
    X,
    ArrowRight,
    BookOpen,
    Library,
    TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { StatBox } from '@/components/my-components/stat-box';
import { LegendItem } from '@/components/my-components/legend-item';
import { User } from '@/types';
import { ProfilPerpus } from '@/types/my-type/profil-perpus';
import { Stat } from '@/types/my-type/stat';
import { Document } from '@/types/my-type/document';
import { Kegiatan } from '@/types/my-type/kegiatan';
import { formatHumanDate } from '@/lib/utils';
import { PublicNavbar } from '@/components/public-navbar';

interface Props {
    profile: ProfilPerpus;
    activities: Kegiatan[];
    latest_stats?: Stat;
    documents: Document[];
    officers: User[];
}

const Welcome: React.FC<Props> = ({
    profile,
    activities,
    latest_stats,
    documents,
    officers,
}) => {
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100 },
        },
    };

    const collectionData = {
        labels: ['Fiksi', 'Non-Fiksi', 'Digital'],
        datasets: [
            {
                data: [
                    latest_stats?.koleksi_fiksi || 0,
                    latest_stats?.koleksi_nonfiksi || 0,
                    latest_stats?.koleksi_digital || 0,
                ],
                backgroundColor: ['#2563eb', '#10b981', '#f59e0b'],
                borderWidth: 0,
                hoverOffset: 10,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <Head
                title={`Portal Resmi - ${profile?.nama_perpustakaan || 'Perpustakaan'}`}
            />

            <PublicNavbar />

            {/* Hero Section */}
            <header className="relative overflow-hidden border-b border-slate-200/60 bg-white py-20 dark:border-slate-800/50 dark:bg-slate-900">
                <div className="bg-radial-at-t absolute inset-0 from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20" />
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black tracking-widest text-blue-600 uppercase dark:bg-blue-950/50 dark:text-blue-400"
                    >
                        <Activity className="h-3 w-3 animate-pulse" /> Portal
                        Digital Interaktif
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mb-6 max-w-4xl font-sans text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
                    >
                        {profile?.nama_perpustakaan || 'DIGITAL LIBRARY'}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400"
                    >
                        Pusat sumber informasi, literasi, dan kegiatan
                        masyarakat desa. Terus berkomitmen untuk meningkatkan
                        indeks literasi masyarakat melalui keberagaman koleksi
                        dan layanan.
                    </motion.p>
                </div>
            </header>

            <main className="mx-auto max-w-7xl space-y-24 px-6 py-16">
                {/* Stats Bar */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <div className="mb-8 flex items-center justify-between border-b border-slate-200/60 pb-4 dark:border-slate-800/60">
                        <div>
                            <h2 className="flex items-center gap-3 text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                                <TrendingUp
                                    size={20}
                                    className="text-blue-600"
                                />{' '}
                                Statistik Literasi
                            </h2>
                            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                Rekapitulasi data perkembangan literasi tahun{' '}
                                {latest_stats?.tahun ||
                                    new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <motion.div variants={itemVariants}>
                            <StatBox
                                icon={<Layers />}
                                label="Koleksi Buku"
                                value={latest_stats?.jumlah_koleksi || 0}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatBox
                                icon={<Users />}
                                label="Anggota"
                                value={latest_stats?.jumlah_anggota || 0}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatBox
                                icon={<Activity />}
                                label="Pengunjung"
                                value={latest_stats?.jumlah_pengunjung || 0}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatBox
                                icon={<Library />}
                                label="Peminjaman"
                                value={latest_stats?.jumlah_peminjaman || 0}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatBox
                                icon={<BookOpen />}
                                label="Buku Dibaca"
                                value={latest_stats?.buku_dibaca || 0}
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatBox
                                icon={<TrendingUp />}
                                label="Penambahan"
                                value={latest_stats?.penambahan_koleksi || 0}
                            />
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className="col-span-2"
                        >
                            <StatBox
                                icon={<ExternalLink />}
                                label="Koleksi Digital"
                                value={latest_stats?.koleksi_digital || 0}
                            />
                        </motion.div>
                    </div>
                </motion.section>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Log Agenda Section */}
                    <div className="lg:col-span-8">
                        <div className="mb-8 flex items-end justify-between border-b border-slate-200/60 pb-4 dark:border-slate-800/60">
                            <div>
                                <h2 className="text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                                    Log Agenda & Berita
                                </h2>
                                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Arsip Kegiatan & Dokumentasi Terbaru
                                </p>
                            </div>
                            <Link
                                href="/activities"
                                className="group flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-4 py-2 text-[10px] font-black tracking-widest uppercase transition-all hover:border-blue-500/30 hover:bg-slate-50 dark:border-slate-800/60 dark:bg-slate-900 dark:hover:bg-slate-800"
                            >
                                Lihat Semua{' '}
                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {activities.map((act) => {
                                const hasArticle =
                                    act.artikel && act.artikel.trim() !== '';

                                return (
                                    <div
                                        key={act.id}
                                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xs transition-all hover:border-blue-500/30 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900"
                                    >
                                        <div className="p-6">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-black tracking-wider text-blue-600 uppercase dark:bg-blue-950/40 dark:text-blue-400">
                                                    {act.tipe.replace('_', ' ')}
                                                </span>
                                                <span className="font-mono text-[10px] font-bold text-slate-400">
                                                    {formatHumanDate(
                                                        act.tanggal,
                                                    )}
                                                </span>
                                            </div>

                                            <h3 className="mb-3 font-sans text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                                                {act.nama_kegiatan}
                                            </h3>

                                            <p className="line-clamp-3 text-xs leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                                                "{act.deskripsi}"
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800/60 dark:bg-slate-950/10">
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

                                            {hasArticle ? (
                                                <Link
                                                    href={`/kegiatan/${act.id}/read/artikel`}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-[9px] font-black tracking-widest text-white uppercase transition-colors hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600"
                                                >
                                                    Baca{' '}
                                                    <ArrowRight size={10} />
                                                </Link>
                                            ) : (
                                                <span className="shrink-0 font-mono text-[8px] font-black tracking-wider text-amber-500 uppercase">
                                                    Selesai
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6 lg:col-span-4">
                        {/* Grafik Komposisi Koleksi */}
                        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs dark:border-slate-800/60 dark:bg-slate-900">
                            <h3 className="mb-2 text-sm font-black tracking-tight text-slate-900 uppercase dark:text-white">
                                Komposisi Koleksi
                            </h3>
                            <p className="mb-6 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                Kategori Buku {latest_stats?.tahun}
                            </p>

                            <div className="relative mx-auto mb-6 aspect-square max-w-50">
                                <Doughnut
                                    data={collectionData}
                                    options={{
                                        cutout: '75%',
                                        maintainAspectRatio: false,
                                        responsive: true,
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: {
                                                backgroundColor: '#0f172a',
                                                titleFont: {
                                                    size: 12,
                                                    weight: 'bold',
                                                },
                                                bodyFont: { size: 12 },
                                                padding: 12,
                                                displayColors: false,
                                            },
                                        },
                                    }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                                        {(
                                            latest_stats?.jumlah_koleksi || 0
                                        ).toLocaleString()}
                                    </span>
                                    <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                                        Total Judul
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <LegendItem
                                    color="bg-blue-600"
                                    label="Fiksi"
                                    value={latest_stats?.koleksi_fiksi}
                                />
                                <LegendItem
                                    color="bg-emerald-500"
                                    label="Non-Fiksi"
                                    value={latest_stats?.koleksi_nonfiksi}
                                />
                                <LegendItem
                                    color="bg-amber-500"
                                    label="Digital"
                                    value={latest_stats?.koleksi_digital}
                                />
                            </div>
                        </div>

                        {/* Analisis Literasi */}
                        {latest_stats?.analisis_minat_baca && (
                            <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-500/20 dark:bg-blue-900/50">
                                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                                    <Activity className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="mb-3 text-[9px] font-black tracking-widest text-blue-200 uppercase">
                                    Analisis Minat Baca
                                </h3>
                                <blockquote className="text-sm leading-relaxed font-medium">
                                    "{latest_stats.analisis_minat_baca}"
                                </blockquote>
                            </div>
                        )}

                        {/* Demografi Card */}
                        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs dark:border-slate-800/60 dark:bg-slate-900">
                            <h4 className="mb-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                Kondisi Wilayah
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-r border-slate-100 pr-2 dark:border-slate-800">
                                    <p className="text-lg font-black text-slate-900 dark:text-white">
                                        {profile?.jumlah_penduduk?.toLocaleString() ||
                                            '-'}
                                    </p>
                                    <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                        Penduduk
                                    </p>
                                </div>
                                <div className="pl-2">
                                    <p className="text-lg font-black text-slate-900 dark:text-white">
                                        {profile?.luas_wilayah || '-'} Km²
                                    </p>
                                    <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">
                                        Luas Area
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="mb-8 border-b border-slate-200/60 pb-4 dark:border-slate-800/60">
                    <h2 className="flex items-center gap-2 text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                        <Users size={18} className="text-blue-600" /> Pengelola
                        Unit
                    </h2>
                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Sumber Daya Manusia Kompeten
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {officers
                        .filter(
                            (user) =>
                                user.email !== 'wirawanmahardika10@gmail.com',
                        )
                        .map((user) => (
                            <div
                                key={user.id}
                                className="group flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-white p-4 shadow-xs transition-all hover:border-blue-500/30 dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 font-bold text-slate-400 dark:bg-slate-800">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        user.name.charAt(0)
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[9px] font-black tracking-widest text-blue-600 uppercase">
                                        {user.jabatan || 'Petugas'}
                                    </p>
                                    <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                        {user.name}
                                    </h4>
                                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-bold text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
                                            {user.pendidikan_terakhir || '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24">
                <div className="mb-8 border-b border-slate-200/60 pb-4 dark:border-slate-800/60">
                    <h2 className="flex items-center gap-2 text-base font-black tracking-tight text-slate-900 uppercase dark:text-white">
                        <FileText size={18} className="text-blue-600" />{' '}
                        Evidence Repository
                    </h2>
                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Penyimpanan Dokumentasi Digital Terbuka
                    </p>
                </div>

                {documents.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5"
                    >
                        {documents.map((doc) => (
                            <motion.div
                                key={doc.id}
                                variants={itemVariants}
                                onClick={() => setSelectedDoc(doc)}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-3 shadow-xs transition-all hover:border-blue-500/30 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <div className="relative mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-950/50">
                                    {doc.file_path.match(
                                        /\.(jpeg|jpg|png|gif)$/i,
                                    ) ? (
                                        <img
                                            src={`${doc.file_url}`}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            alt={doc.keterangan}
                                        />
                                    ) : (
                                        <FileText
                                            size={32}
                                            className="opacity-40"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-blue-600/0 transition-colors group-hover:bg-blue-600/10" />
                                </div>
                                <div className="px-1 pb-1">
                                    <p className="mb-1 text-[9px] font-black tracking-widest text-blue-600 uppercase dark:text-blue-400">
                                        {doc.kategori}
                                    </p>
                                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                                        {doc.keterangan}
                                    </p>
                                    {/* <span className="mt-1.5 inline-block rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[8px] font-bold text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
                                        {doc.tipe_file.replace('_', ' ')}
                                    </span> */}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200/60 bg-slate-50/50 py-16 text-center dark:border-slate-800/60 dark:bg-slate-900/50">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-300 shadow-xs dark:bg-slate-900 dark:text-slate-700">
                            <FileText size={28} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            Data Tidak Ditemukan
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Belum ada dokumen yang diunggah ke dalam repositori
                            ini.
                        </p>
                    </div>
                )}
            </section>

            <AnimatePresence>
                {selectedDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm sm:p-6 dark:bg-slate-950/80"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
                        >
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                            >
                                <X size={20} />
                            </button>
                            <div className="grid md:grid-cols-2">
                                <div className="flex aspect-square items-center justify-center bg-slate-50 p-6 md:aspect-auto dark:bg-slate-950/50">
                                    {selectedDoc.file_path.match(
                                        /\.(jpeg|jpg|png|gif)$/i,
                                    ) ? (
                                        <img
                                            src={`${selectedDoc.file_url}`}
                                            className="h-full w-full rounded-xl object-contain shadow-sm"
                                            alt={selectedDoc.keterangan}
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <FileText
                                                size={64}
                                                className="mx-auto mb-4 text-blue-600 opacity-80"
                                            />
                                            <a
                                                href={`${selectedDoc.file_url}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                                            >
                                                Buka Dokumen{' '}
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-center p-8 sm:p-10">
                                    <span className="mb-4 inline-block rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-black tracking-widest text-blue-600 uppercase dark:bg-blue-900/30 dark:text-blue-400">
                                        {selectedDoc.kategori}
                                    </span>
                                    <h2 className="mb-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                        {selectedDoc.keterangan}
                                    </h2>
                                    <div className="mb-6 h-px w-12 bg-slate-200 dark:bg-slate-800" />
                                    <div className="space-y-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <p>
                                            <span className="font-bold text-slate-700 dark:text-slate-300">
                                                Tipe Berkas:
                                            </span>{' '}
                                            <span className="uppercase">
                                                {selectedDoc.tipe_file.replace(
                                                    '_',
                                                    ' ',
                                                )}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="font-bold text-slate-700 dark:text-slate-300">
                                                Diupload Pada:
                                            </span>{' '}
                                            {formatHumanDate(
                                                selectedDoc.created_at || '',
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="border-t border-slate-200/60 bg-white py-8 text-center dark:border-slate-800/40 dark:bg-slate-950">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    © {new Date().getFullYear()} •{' '}
                    {profile?.nama_perpustakaan || 'Perpustakaan Desa'}
                </p>
            </footer>
        </div>
    );
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

export default Welcome;

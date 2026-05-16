import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    MapPin,
    Phone,
    LogIn,
    Users,
    Activity,
    Layers,
    Instagram,
    Facebook,
    Globe,
    ExternalLink,
    FileText,
    X,
    ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { ContactItem } from '@/components/my-components/contact-item';
import { SocialIcon } from '@/components/my-components/social-icon';
import { LegendItem } from '@/components/my-components/legend-item';
import { User } from '@/types';
import { ProfilPerpus } from '@/types/my-type/profil-perpus';
import { Stat } from '@/types/my-type/stat';
import { Document } from '@/types/my-type/document';
import { Kegiatan } from '@/types/my-type/kegiatan';
import { formatHumanDate } from '@/lib/utils';

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
    const socialMedia: any = profile?.media_sosial || {};
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
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
                hoverOffset: 20,
            },
        ],
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
            <Head
                title={`Portal Resmi - ${profile?.nama_perpustakaan || 'Perpustakaan'}`}
            />

            {/* Navigasi Minimalis */}
            <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo-noname.png"
                                className="w-12 text-white"
                                alt="logo"
                            />
                            <div className="flex flex-col">
                                <span className="leading-none font-[1000] tracking-tighter text-slate-900 uppercase sm:text-xl">
                                    {profile?.nama_perpustakaan ||
                                        'Sistem Perpustakaan'}
                                </span>
                                <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase">
                                    NPP. {profile?.npp || 'BELUM TERDAFTAR'}
                                </span>
                            </div>
                        </div>
                        <Link
                            href="/login"
                            className="group flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-[10px] font-black tracking-[0.2em] text-white transition-all hover:bg-blue-600 active:scale-95"
                        >
                            <LogIn className="h-4 w-4" /> LOGIN SISTEM
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative px-6 py-24 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-7xl text-center"
                >
                    <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2.5 text-[10px] font-black tracking-widest text-blue-600 uppercase">
                        <Activity className="h-4 w-4 animate-pulse" />{' '}
                        Monitoring Akreditasi 2026
                    </div>
                    <h1 className="mx-auto mb-10 max-w-5xl text-4xl font-[1000] tracking-[-0.04em] text-slate-900 sm:text-7xl lg:text-9xl lg:leading-[0.85]">
                        {profile?.nama_perpustakaan || 'DIGITAL LIBRARY'}
                    </h1>
                </motion.div>
            </header>

            {/* Stats Bar */}
            <section className="mx-auto mb-24 max-w-7xl px-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatBox
                        icon={<Layers className="text-blue-500" />}
                        label="Koleksi Buku"
                        value={latest_stats?.jumlah_koleksi || 0}
                    />
                    <StatBox
                        icon={<Users className="text-emerald-500" />}
                        label="Anggota Terdaftar"
                        value={latest_stats?.jumlah_anggota || 0}
                    />
                    <StatBox
                        icon={<Activity className="text-amber-500" />}
                        label="Pengunjung"
                        value={latest_stats?.jumlah_pengunjung || 0}
                    />
                    <StatBox
                        icon={<ExternalLink className="text-rose-500" />}
                        label="Koleksi Digital"
                        value={latest_stats?.koleksi_digital || 0}
                    />
                </div>
            </section>

            <section className="mx-auto mb-32 max-w-7xl px-6">
                <div className="mb-12">
                    <h2 className="text-4xl leading-none font-[1000] tracking-tighter uppercase italic">
                        Pengelola Unit
                    </h2>
                    <p className="mt-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Sumber Daya Manusia Kompeten
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {officers

                        .filter(
                            (user) =>
                                user.email !== 'wirawanmahardika10@gmail.com',
                        )

                        .map((user) => (
                            <motion.div
                                key={user.id}
                                whileHover={{ y: -5 }}
                                className="flex items-center gap-4 rounded-4xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-6 sm:rounded-[2.5rem] sm:p-6"
                            >
                                {/* RESPONSIVE FIX: Ukuran avatar h-14 w-14 di mobile, h-20 w-20 di layar sm */}
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-100 sm:h-20 sm:w-20 sm:text-2xl">
                                    {user.name ? user.name.charAt(0) : '?'}
                                </div>

                                {/* Kontainer Teks Fleksibel */}
                                <div className="min-w-0 flex-1">
                                    <p className="text-[9px] font-black tracking-widest text-blue-600 uppercase sm:text-[10px]">
                                        {user.jabatan}
                                    </p>
                                    {/* RESPONSIVE FIX: Ukuran font text-base di mobile agar muat, text-xl di layar sm */}
                                    <h4 className="truncate text-base font-[1000] tracking-tight text-slate-900 uppercase sm:text-xl">
                                        {user.name}
                                    </h4>
                                    {/* RESPONSIVE FIX: flex-wrap untuk mencegah elemen badge keluar dari batas lebar jika teks panjang */}
                                    <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[8px] font-bold text-slate-500 uppercase sm:text-[9px]">
                                            {user.pendidikan_terakhir}
                                        </span>
                                        {user.kreativitas_karya && (
                                            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[8px] font-bold text-emerald-600 uppercase sm:text-[9px]">
                                                Inovatif
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </section>

            <section className="mx-auto mb-20 max-w-7xl overflow-hidden px-4 md:mb-32 md:px-6">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                    {/* Grafik Komposisi Koleksi */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm md:rounded-[3rem] md:p-12 lg:col-span-5"
                    >
                        <h3 className="mb-2 text-xl leading-tight font-[1000] tracking-tighter uppercase md:text-2xl">
                            Komposisi Koleksi
                        </h3>
                        <p className="mb-8 text-[9px] font-black tracking-widest text-slate-400 uppercase md:mb-10 md:text-[10px]">
                            Data Berdasarkan Kategori Buku
                        </p>

                        {/* Perkecil max-width pada mobile agar tidak menekan padding */}
                        <div className="relative mx-auto aspect-square max-w-55 md:max-w-70">
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
                                <span className="text-2xl font-[1000] tracking-tighter italic md:text-4xl">
                                    {(
                                        latest_stats?.jumlah_koleksi || 0
                                    ).toLocaleString()}
                                </span>
                                <span className="text-[8px] font-black text-slate-400 uppercase md:text-[9px]">
                                    Total Judul
                                </span>
                            </div>
                        </div>

                        {/* Legend Custom - Sesuaikan margin */}
                        <div className="mt-8 space-y-3 md:mt-10">
                            <LegendItem
                                color="bg-blue-600"
                                label="Koleksi Fiksi"
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
                    </motion.div>

                    {/* Highlight Minat Baca */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center rounded-[2.5rem] bg-blue-600 p-8 text-white shadow-2xl shadow-blue-200 md:rounded-[3rem] md:p-12 lg:col-span-7"
                    >
                        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 md:mb-8 md:h-12 md:w-12">
                            <Activity className="h-5 w-5 text-white md:h-6 md:w-6" />
                        </div>
                        <h3 className="mb-4 text-[9px] font-black tracking-[0.2em] uppercase opacity-60 md:text-[10px] md:tracking-[0.3em]">
                            Analisis Literasi Desa
                        </h3>
                        {/* Responsif Font Size untuk Quote */}
                        <blockquote className="mb-8 text-xl leading-tight font-[1000] tracking-tighter italic sm:text-2xl md:mb-10 md:text-4xl">
                            "
                            {latest_stats?.analisis_minat_baca ||
                                'Terus berkomitmen meningkatkan indeks literasi masyarakat melalui keberagaman koleksi.'}
                            "
                        </blockquote>
                        <div className="flex items-center gap-4 border-t border-white/10 pt-8 md:pt-10">
                            <div>
                                <p className="text-lg font-black italic md:text-xl">
                                    Tahun {latest_stats?.tahun || '2025'}
                                </p>
                                <p className="text-[9px] font-black uppercase opacity-60 md:text-[10px]">
                                    Periode Data Terbaru
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content & Sidebar */}
            <motion.div>
                <main className="mx-auto max-w-7xl overflow-hidden px-4 pb-20 md:px-6 md:pb-32">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Log Agenda Section */}
                        <div className="lg:col-span-8">
                            <div className="mb-8 flex items-end justify-between border-b-4 border-slate-950 pb-4 md:mb-12 md:border-b-[6px] md:pb-6">
                                <div>
                                    <h2 className="text-3xl leading-none font-[1000] tracking-tighter uppercase italic md:text-4xl">
                                        Log Agenda
                                    </h2>
                                    <p className="mt-2 text-[9px] font-black tracking-widest text-slate-400 uppercase md:text-[10px]">
                                        Arsip Kegiatan & Dokumentasi
                                    </p>
                                </div>
                                <Link
                                    href="/aktivitas"
                                    className="group flex items-center gap-2 rounded-full border-2 border-slate-950 px-4 py-1.5 text-[8px] font-black tracking-widest whitespace-nowrap uppercase transition-all hover:bg-slate-950 hover:text-white md:px-5 md:py-2 md:text-[10px]"
                                >
                                    Lihat Semua{' '}
                                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                                {activities.map((act) => {
                                    const hasArticle =
                                        act.artikel &&
                                        act.artikel.trim() !== '';

                                    return (
                                        <div
                                            key={act.id}
                                            className="group relative flex flex-col rounded-4xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 md:rounded-[2.5rem] md:p-10"
                                        >
                                            <div className="mb-4 flex items-center justify-between md:mb-6">
                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-[8px] font-black tracking-widest text-blue-600 uppercase md:px-4 md:py-1.5 md:text-[9px]">
                                                    {act.tipe}
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-400 md:text-[10px]">
                                                    {formatHumanDate(
                                                        act.tanggal,
                                                    )}
                                                </span>
                                            </div>

                                            <h3 className="mb-4 text-xl leading-tight font-[1000] tracking-tight text-slate-950 uppercase italic transition-colors group-hover:text-blue-600 md:mb-5 md:text-2xl">
                                                {act.nama_kegiatan}
                                            </h3>

                                            <p className="mb-8 line-clamp-3 text-xs leading-relaxed font-medium text-slate-500 italic md:mb-10 md:line-clamp-4 md:text-sm">
                                                "{act.deskripsi}"
                                            </p>

                                            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6 md:pt-8">
                                                <p className="mr-2 truncate text-[9px] font-black text-slate-400 uppercase">
                                                    Pihak:{' '}
                                                    {act.pihak_terlibat ||
                                                        'Lokal'}
                                                </p>

                                                {hasArticle ? (
                                                    <Link
                                                        href={`/kegiatan/${act.id}/read/artikel`}
                                                        className="flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-[8px] font-black tracking-widest text-white uppercase shadow-lg shadow-slate-200 transition-all hover:bg-blue-600 md:px-6 md:py-3 md:text-[9px]"
                                                    >
                                                        Baca{' '}
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                ) : (
                                                    <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 py-2.5 text-[8px] font-black tracking-widest text-slate-400 uppercase md:text-[9px]">
                                                        Selesai
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6 md:space-y-8 lg:col-span-4">
                            {/* Info Perpus - Penyesuaian Padding Mobile */}
                            <div className="rounded-4xl bg-slate-950 p-8 text-white shadow-2xl md:rounded-[3rem] md:p-12">
                                <h3 className="mb-8 text-[9px] font-black tracking-[0.3em] text-blue-400 uppercase opacity-60 md:mb-10 md:text-[10px] md:tracking-[0.4em]">
                                    IDENTITAS UNIT
                                </h3>
                                <div className="space-y-8 md:space-y-12">
                                    <ContactItem
                                        icon={
                                            <MapPin className="h-5 w-5 text-blue-400" />
                                        }
                                        label="Lokasi"
                                        value={profile?.alamat}
                                    />
                                    <ContactItem
                                        icon={
                                            <Phone className="h-5 w-5 text-blue-400" />
                                        }
                                        label="Kontak"
                                        value={profile?.kontak}
                                    />

                                    <div className="space-y-4 border-t border-white/10 pt-8 md:pt-10">
                                        <p className="text-[9px] font-black tracking-widest text-slate-500 uppercase md:text-[10px]">
                                            Media Sosial
                                        </p>
                                        <div className="flex gap-4">
                                            {socialMedia.instagram && (
                                                <SocialIcon
                                                    href={socialMedia.instagram}
                                                    icon={<Instagram />}
                                                />
                                            )}
                                            {socialMedia.facebook && (
                                                <SocialIcon
                                                    href={socialMedia.facebook}
                                                    icon={<Facebook />}
                                                />
                                            )}
                                            {socialMedia.website && (
                                                <SocialIcon
                                                    href={socialMedia.website}
                                                    icon={<Globe />}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Demografi Card */}
                            <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                                <h4 className="mb-6 text-[9px] font-black tracking-widest text-slate-400 uppercase md:text-[10px]">
                                    Kondisi Wilayah
                                </h4>
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    <div className="border-r border-slate-100 pr-2">
                                        <p className="text-lg font-black md:text-xl">
                                            {profile?.jumlah_penduduk?.toLocaleString()}
                                        </p>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase md:text-[9px]">
                                            Penduduk
                                        </p>
                                    </div>
                                    <div className="pl-2">
                                        <p className="text-lg font-black md:text-xl">
                                            {profile?.luas_wilayah} Km²
                                        </p>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase md:text-[9px]">
                                            Luas
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </motion.div>

            <section className="mx-auto mb-32 max-w-7xl px-6">
                <div className="mb-12">
                    <h2 className="text-4xl leading-none font-[1000] tracking-tighter uppercase italic">
                        Evidence Repository
                    </h2>
                    <p className="mt-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Penyimpanan Dokumentasi Digital
                    </p>
                </div>

                {documents.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4 md:grid-cols-4"
                    >
                        {documents.map((doc) => (
                            <motion.div
                                key={doc.id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedDoc(doc)}
                                className="group cursor-pointer overflow-hidden rounded-4xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-600"
                            >
                                <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-slate-400">
                                    {doc.file_path.match(
                                        /\.(jpeg|jpg|png|gif)$/,
                                    ) ? (
                                        <img
                                            src={`${doc.file_url}`}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            alt={doc.keterangan}
                                        />
                                    ) : (
                                        <FileText
                                            size={48}
                                            className="opacity-20"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-blue-600/0 transition-colors group-hover:bg-blue-600/10" />
                                </div>
                                <p className="mb-1 text-[10px] font-black text-blue-600 uppercase">
                                    {doc.kategori}
                                </p>
                                <p className="truncate text-sm font-bold tracking-tight uppercase">
                                    {doc.keterangan}
                                </p>
                                <span
                                    className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[8px] font-black uppercase ${
                                        doc.kategori === 'inovasi'
                                            ? 'bg-amber-100 text-amber-700'
                                            : doc.kategori === 'dampak'
                                              ? 'bg-purple-100 text-purple-700'
                                              : doc.kategori === 'layanan'
                                                ? 'bg-blue-100 text-blue-700'
                                                : doc.kategori === 'tenaga'
                                                  ? 'bg-rose-100 text-rose-700'
                                                  : doc.kategori === 'sarpras'
                                                    ? 'bg-indigo-100 text-indigo-700'
                                                    : 'bg-slate-100 text-slate-700'
                                    }`}
                                >
                                    {doc.kategori.toUpperCase()}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/50 py-24 text-center"
                    >
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-lg font-[1000] tracking-tighter text-slate-900 uppercase">
                            Data Tidak Ditemukan
                        </h3>
                        <p className="mt-2 max-w-[320px] text-[10px] leading-relaxed font-black tracking-widest text-slate-400 uppercase">
                            Belum ada dokumen yang diunggah ke dalam repositori
                            ini. Silakan tambahkan berkas pendukung pada modul
                            terkait.
                        </p>
                    </motion.div>
                )}
            </section>

            <AnimatePresence>
                {selectedDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/90 p-6 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-4xl overflow-hidden rounded-[3rem] bg-white"
                        >
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="absolute top-8 right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-blue-600"
                            >
                                <X size={24} />
                            </button>
                            <div className="grid md:grid-cols-2">
                                <div className="flex aspect-square items-center justify-center bg-slate-100 md:aspect-auto">
                                    {selectedDoc.file_path.match(
                                        /\.(jpeg|jpg|png|gif)$/,
                                    ) ? (
                                        <img
                                            src={`${selectedDoc.file_url}`}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <div className="p-12 text-center">
                                            <FileText
                                                size={80}
                                                className="mx-auto mb-4 text-blue-600"
                                            />
                                            <a
                                                href={`${selectedDoc.file_url}`}
                                                target="_blank"
                                                className="text-xs font-black text-blue-600 uppercase underline"
                                            >
                                                Unduh Dokumen PDF
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="p-12">
                                    <span className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-black text-blue-600 uppercase">
                                        {selectedDoc.kategori}
                                    </span>
                                    <h2 className="mb-6 text-3xl font-[1000] tracking-tighter uppercase">
                                        {selectedDoc.keterangan}
                                    </h2>
                                    <div className="mb-6 h-1 w-12 bg-slate-900" />
                                    <p className="text-sm leading-relaxed font-medium text-slate-500 italic">
                                        "Dokumen ini merupakan bagian dari
                                        pemenuhan instrumen akreditasi
                                        perpustakaan desa tahun penilaian
                                        2025/2026."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="bg-slate-950 py-20 text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                            <img src="/logo-noname.png" alt="logo" sizes="20" />
                        </div>
                        <span className="font-[1000] tracking-tighter uppercase">
                            {profile?.nama_perpustakaan}
                        </span>
                    </div>
                    <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                        © {new Date().getFullYear()} Hak Cipta Dilindungi •
                        Dikembangkan untuk Akreditasi 2026
                    </p>
                </div>
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

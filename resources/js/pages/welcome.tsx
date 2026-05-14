import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    MapPin,
    Phone,
    BookOpen,
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

interface Props {
    profile: any;
    activities: any[];
    latest_stats?: any;
    documents: any[];
    officers: any[];
}

// Registrasi komponen Chart.js
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

const Welcome: React.FC<Props> = ({
    profile,
    activities,
    latest_stats,
    documents,
    officers,
}) => {
    // Media sosial dari JSON profil_perpus
    const socialMedia = profile?.media_sosial || {};
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    // Animasi Variants
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
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
            <Head
                title={`Portal Resmi - ${profile?.nama_perpustakaan || 'Perpustakaan'}`}
            />

            {/* Navigasi Minimalis */}
            <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl leading-none font-[1000] tracking-tighter text-slate-900 uppercase">
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
                    <h1 className="mx-auto mb-10 max-w-5xl text-6xl font-[1000] tracking-[-0.04em] text-slate-900 sm:text-8xl lg:text-[10rem] lg:leading-[0.85]">
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

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {officers.map((user) => (
                        <motion.div
                            key={user.id}
                            whileHover={{ y: -5 }}
                            className="flex items-center gap-6 rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            {/* Avatar Bulat / Inisial */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-100">
                                {user.name.charAt(0)}
                            </div>

                            <div className="min-w-0">
                                <p className="text-[10px] font-black tracking-widest text-blue-600 uppercase">
                                    {user.jabatan}
                                </p>
                                <h4 className="truncate text-xl font-[1000] tracking-tight text-slate-900 uppercase">
                                    {user.name}
                                </h4>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase">
                                        {user.pendidikan_terakhir}
                                    </span>
                                    {user.kreativitas_karya && (
                                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600 uppercase">
                                            Inovatif
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="mx-auto mb-32 max-w-7xl px-6">
                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Grafik Komposisi Koleksi */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-[3rem] border border-slate-200 bg-white p-12 shadow-sm lg:col-span-5"
                    >
                        <h3 className="mb-2 text-2xl font-[1000] tracking-tighter uppercase">
                            Komposisi Koleksi
                        </h3>
                        <p className="mb-10 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                            Data Berdasarkan Kategori Buku
                        </p>

                        <div className="relative mx-auto aspect-square max-w-[280px]">
                            <Doughnut
                                data={collectionData}
                                options={{
                                    cutout: '75%',
                                    maintainAspectRatio: false, // Tambahkan ini
                                    responsive: true, // Tambahkan ini
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
                                <span className="text-4xl font-[1000] tracking-tighter italic">
                                    {(
                                        latest_stats?.jumlah_koleksi || 0
                                    ).toLocaleString()}
                                </span>
                                <span className="text-[9px] font-black text-slate-400 uppercase">
                                    Total Judul
                                </span>
                            </div>
                        </div>

                        {/* Legend Custom */}
                        <div className="mt-10 space-y-3">
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

                    {/* Highlight Minat Baca (Data dari yearly_stats.analisis_minat_baca) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center rounded-[3rem] bg-blue-600 p-12 text-white shadow-2xl shadow-blue-200 lg:col-span-7"
                    >
                        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                            <Activity className="text-white" />
                        </div>
                        <h3 className="mb-4 text-[10px] font-black tracking-[0.3em] uppercase opacity-60">
                            Analisis Literasi Desa
                        </h3>
                        <blockquote className="mb-10 text-3xl leading-tight font-[1000] tracking-tighter italic md:text-4xl">
                            "
                            {latest_stats?.analisis_minat_baca ||
                                'Terus berkomitmen meningkatkan indeks literasi masyarakat melalui keberagaman koleksi dan layanan inklusif.'}
                            "
                        </blockquote>
                        <div className="flex items-center gap-4 border-t border-white/10 pt-10">
                            <div>
                                <p className="text-xl font-black italic">
                                    Tahun {latest_stats?.tahun || '2025'}
                                </p>
                                <p className="text-[10px] font-black uppercase opacity-60">
                                    Periode Data Terbaru
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content & Sidebar */}
            <motion.div>
                <main className="mx-auto max-w-7xl px-6 pb-32">
                    <div className="grid gap-16 lg:grid-cols-12">
                        {/* Log Agenda Section */}
                        <div className="lg:col-span-8">
                            <div className="mb-12 flex items-center justify-between border-b-[6px] border-slate-950 pb-6">
                                <div>
                                    <h2 className="text-4xl leading-none font-[1000] tracking-tighter uppercase italic">
                                        Log Agenda
                                    </h2>
                                    <p className="mt-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        Arsip Kegiatan & Dokumentasi
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-8 sm:grid-cols-2">
                                {activities.map((act) => (
                                    <div
                                        key={act.id}
                                        className="group relative flex flex-col rounded-[2.5rem] border border-slate-200 bg-white p-10 transition-all hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100"
                                    >
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-[9px] font-black tracking-widest text-blue-600 uppercase">
                                                {act.tipe}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400">
                                                {act.tanggal}
                                            </span>
                                        </div>
                                        <h3 className="mb-5 text-2xl font-[1000] tracking-tight text-slate-950 uppercase transition-colors group-hover:text-blue-600">
                                            {act.nama_kegiatan}
                                        </h3>
                                        <p className="mb-10 line-clamp-4 text-sm leading-relaxed font-medium text-slate-500 italic">
                                            "{act.deskripsi}"
                                        </p>
                                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-8">
                                            <p className="text-[10px] font-black text-slate-400 uppercase">
                                                Pihak:{' '}
                                                {act.pihak_terlibat || 'Lokal'}
                                            </p>
                                            {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white transition-all group-hover:scale-110 group-hover:bg-blue-600">
                                                <ArrowRight className="h-5 w-5" />
                                            </div> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8 lg:col-span-4">
                            {/* Info Perpus */}
                            <div className="rounded-[3rem] bg-slate-950 p-12 text-white shadow-2xl">
                                <h3 className="mb-10 text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase opacity-60">
                                    IDENTITAS UNIT
                                </h3>
                                <div className="space-y-12">
                                    <ContactItem
                                        icon={<MapPin className="h-5 w-5" />}
                                        label="Lokasi"
                                        value={profile?.alamat}
                                    />
                                    <ContactItem
                                        icon={<Phone className="h-5 w-5" />}
                                        label="Kontak"
                                        value={profile?.kontak}
                                    />

                                    <div className="space-y-4 border-t border-white/10 pt-10">
                                        <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
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
                            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10">
                                <h4 className="mb-6 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                    Kondisi Wilayah
                                </h4>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xl font-black">
                                            {profile?.jumlah_penduduk?.toLocaleString()}
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">
                                            Penduduk
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xl font-black">
                                            {profile?.luas_wilayah} Km²
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">
                                            Luas Wilayah
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
                        Dokumentasi Bukti Fisik Akreditasi
                    </p>
                </div>

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
                            className="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-600"
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
                                className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[8px] font-black ${
                                    doc.kategori === 'inovasi'
                                        ? 'bg-amber-100 text-amber-700'
                                        : doc.kategori === 'layanan'
                                          ? 'bg-blue-100 text-blue-700'
                                          : 'bg-slate-100 text-slate-700'
                                }`}
                            >
                                {doc.kategori.toUpperCase()}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <AnimatePresence>
                {selectedDoc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-6 backdrop-blur-md"
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
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                            <BookOpen size={20} />
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

// Sub-components dengan Styling Padat
const StatBox = ({ icon, label, value }: any) => (
    <div className="group flex items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-600/30 md:gap-5 md:rounded-[2rem] md:p-8">
        {/* Kontainer Icon yang Responsif */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg transition-colors group-hover:bg-blue-50 md:h-14 md:w-14 md:rounded-2xl md:text-2xl">
            {/* Solusi Error: Gunakan div pembungkus atau casting icon ke ReactElement dengan className */}
            {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<any>, {
                      className:
                          'h-5 w-5 md:h-7 md:w-7 transition-transform group-hover:scale-110',
                  })
                : icon}
        </div>

        <div className="min-w-0 flex-1">
            {/* Label yang lebih kecil dan rapat di mobile */}
            <p className="mb-0.5 truncate text-[8px] font-black tracking-[0.15em] text-slate-400 uppercase md:mb-1 md:text-[10px]">
                {label}
            </p>
            {/* Angka yang menyesuaikan ukuran layar agar tidak terpotong */}
            <p className="text-xl leading-none font-[1000] tracking-tighter text-slate-900 italic md:text-3xl">
                {value.toLocaleString('id-ID')}
            </p>
        </div>
    </div>
);

const ContactItem = ({ icon, label, value }: any) => (
    <div className="flex gap-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-blue-400">
            {icon}
        </div>
        <div className="flex flex-col justify-center">
            <p className="mb-1 text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">
                {label}
            </p>
            <p className="text-base leading-tight font-bold">{value || '-'}</p>
        </div>
    </div>
);

const SocialIcon = ({ href, icon }: { href: string; icon: any }) => (
    <a
        href={href}
        target="_blank"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white transition-all hover:-translate-y-1 hover:bg-blue-600"
    >
        {React.cloneElement(icon, { size: 20 })}
    </a>
);
const LegendItem = ({ color, label, value }: any) => (
    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
        <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${color}`} />
            <span className="text-[10px] font-black text-slate-500 uppercase">
                {label}
            </span>
        </div>
        <span className="text-xs font-bold">{value?.toLocaleString()} eks</span>
    </div>
);
export default Welcome;

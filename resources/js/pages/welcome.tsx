import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    MapPin,
    Phone,
    Calendar,
    BookOpen,
    ArrowRight,
    LogIn,
    Users,
    Activity,
    Layers,
    CheckCircle2,
} from 'lucide-react';

// Sesuai skema database activity_logs & yearly_stats
interface Props {
    profile: any;
    activities: any[];
    latest_stats?: any;
}

const Welcome: React.FC<Props> = ({ profile, activities, latest_stats }) => {
    const [selectedActivity, setSelectedActivity] = useState<any>(null);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
            <Head
                title={`Portal Resmi - ${profile.nama_perpustakaan || 'Perpustakaan'}`}
            />

            {/* Navigasi Minimalis */}
            <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg leading-none font-[1000] tracking-tighter text-slate-900 uppercase">
                                    {profile.nama_perpustakaan ||
                                        'Sistem Perpustakaan'}
                                </span>
                                <span className="text-[9px] font-black tracking-[0.3em] text-blue-600 uppercase">
                                    NPP. {profile.npp || '000000000'}
                                </span>
                            </div>
                        </div>
                        <Link
                            href="/login"
                            className="group flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-[10px] font-black tracking-widest text-white transition-all hover:bg-blue-600"
                        >
                            <LogIn className="h-3.5 w-3.5" /> LOGIN PETUGAS
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Brutal Typography */}
            <header className="relative px-6 py-24 lg:py-32">
                <div className="mx-auto max-w-7xl text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black tracking-widest text-blue-600">
                        <Activity className="h-3 w-3" /> DIGITAL REPOSITORY 2026
                    </div>
                    <h1 className="mb-8 text-5xl font-[1000] tracking-tighter text-slate-900 sm:text-7xl lg:text-9xl lg:leading-[0.8]">
                        {profile.nama_perpustakaan || 'Digital Library'}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-500 md:text-xl">
                        Akses keterbukaan informasi dan dokumentasi kegiatan{' '}
                        {profile.nama_perpustakaan} secara real-time.
                    </p>
                </div>
            </header>

            {/* Stats Bar - Data from YearlyStats */}
            <section className="mx-auto mb-24 max-w-7xl px-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatBox
                        icon={<Layers className="text-blue-500" />}
                        label="Total Koleksi"
                        value={latest_stats?.jumlah_koleksi || 0}
                    />
                    <StatBox
                        icon={<Users className="text-emerald-500" />}
                        label="Anggota Aktif"
                        value={latest_stats?.jumlah_anggota || 0}
                    />
                    <StatBox
                        icon={<BookOpen className="text-amber-500" />}
                        label="Buku Dibaca"
                        value={latest_stats?.buku_dibaca || 0}
                    />
                    <StatBox
                        icon={<Activity className="text-rose-500" />}
                        label="Total Kegiatan"
                        value={activities.length}
                    />
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-6 pb-32">
                <div className="grid gap-16 lg:grid-cols-12">
                    {/* Log Kegiatan Terbaru */}
                    <div className="lg:col-span-8">
                        <div className="mb-10 flex items-center justify-between border-b-4 border-slate-900 pb-4">
                            <h2 className="text-3xl font-[1000] tracking-tighter uppercase italic">
                                Log Agenda
                            </h2>
                            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                Latest Updates
                            </span>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {activities.map((act) => (
                                <div
                                    key={act.id}
                                    className="group relative rounded-[32px] border border-slate-200 bg-white p-8 transition-all hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100"
                                >
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="text-[10px] font-black tracking-widest text-blue-600 uppercase">
                                            {act.tipe.replace('_', ' ')}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                                            <Calendar className="h-3 w-3" />{' '}
                                            {act.tanggal}
                                        </div>
                                    </div>
                                    <h3 className="mb-4 text-xl leading-tight font-[1000] tracking-tight text-slate-900 uppercase group-hover:text-blue-600">
                                        {act.nama_kegiatan}
                                    </h3>
                                    <p className="mb-8 line-clamp-3 text-xs leading-relaxed font-bold text-slate-400 italic">
                                        "{act.deskripsi}"
                                    </p>
                                    <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
                                        <span className="text-[9px] font-black text-slate-400 uppercase">
                                            Pihak:{' '}
                                            {act.pihak_terlibat || 'Internal'}
                                        </span>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition-transform group-hover:translate-x-1">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Lokasi & Kontak */}
                    <aside className="space-y-6 lg:col-span-4">
                        <div className="rounded-[40px] bg-slate-950 p-10 text-white shadow-2xl">
                            <h3 className="mb-8 text-xs font-black tracking-[0.3em] text-blue-400 uppercase">
                                Official Info
                            </h3>
                            <div className="space-y-10">
                                <ContactItem
                                    icon={<MapPin />}
                                    label="Alamat Unit"
                                    value={profile.alamat || '-'}
                                />
                                <ContactItem
                                    icon={<Phone />}
                                    label="Kontak Layanan"
                                    value={profile.kontak || '-'}
                                />
                                <div className="border-t border-white/10 pt-6">
                                    <p className="mb-2 text-[9px] font-black text-slate-500 uppercase">
                                        Wilayah Operasional
                                    </p>
                                    <p className="text-sm font-bold">
                                        {profile.desa_kelurahan},{' '}
                                        {profile.kecamatan}
                                    </p>
                                    <p className="text-xs tracking-widest text-slate-400 uppercase">
                                        {profile.kabupaten_kota},{' '}
                                        {profile.provinsi}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Banner Akreditasi */}
                        <div className="rounded-[32px] bg-emerald-600 p-8 text-white">
                            <CheckCircle2 className="mb-4 h-8 w-8 opacity-50" />
                            <h4 className="mb-1 text-lg leading-none font-[1000] tracking-tighter uppercase">
                                Status Akreditasi
                            </h4>
                            <p className="text-[10px] font-black tracking-widest uppercase opacity-80">
                                Periode Penilaian 2026
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

// Sub-components
const StatBox = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-xl shadow-inner">
            {icon}
        </div>
        <div>
            <p className="mb-1 text-[9px] leading-none font-black tracking-widest text-slate-400 uppercase">
                {label}
            </p>
            <p className="text-2xl font-[1000] tracking-tighter italic">
                {value.toLocaleString()}
            </p>
        </div>
    </div>
);

const ContactItem = ({ icon, label, value }: any) => (
    <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-blue-400">
            {icon}
        </div>
        <div>
            <p className="mb-1 text-[9px] font-black tracking-widest text-slate-500 uppercase">
                {label}
            </p>
            <p className="text-sm leading-relaxed font-bold">{value}</p>
        </div>
    </div>
);

export default Welcome;

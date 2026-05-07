import React, { useState } from 'react';
import {
    MapPin,
    Phone,
    Clock,
    Calendar,
    BookOpen,
    FileText,
    CheckCircle2,
    X,
    ArrowRight,
    LayoutGrid,
    LogIn,
} from 'lucide-react';
import { Kegiatan, LibraryProfileProps } from '@/types/library';

const Welcome: React.FC<LibraryProfileProps> = ({ profile, activities }) => {
    const [selectedActivity, setSelectedActivity] = useState<Kegiatan | null>(
        null,
    );

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100">
            {/* Premium Navigation with Staff Login Access */}
            <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                            {profile.nama_perpus}
                        </span>
                    </div>

                    {/* Titik Akses Login Petugas */}
                    <div className="flex items-center gap-4">
                        <div className="mr-2 hidden text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase lg:block">
                            Akses Internal
                        </div>
                        <a
                            href="/login" // Ubah sesuai route Laravel Anda
                            className="group flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200"
                        >
                            <LogIn className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                            LOGIN PETUGAS
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 pt-24 pb-20">
                <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-full -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,#DBEAFE_0%,#F8FAFC_100%)] opacity-70"></div>

                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-bold text-blue-600 shadow-sm transition-all hover:border-blue-200">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                        </span>
                        PROFIL RESMI PERPUSTAKAAN
                    </div>
                    <h1 className="mb-8 text-5xl leading-[1.1] font-[900] tracking-tight text-slate-900 md:text-7xl">
                        {profile.nama_perpus}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 italic md:text-xl">
                        "
                        {profile.deskripsi ||
                            'Pusat literasi dan ilmu pengetahuan.'}
                        "
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="mx-auto max-w-7xl px-6 pb-24">
                <div className="grid gap-8 lg:grid-cols-12">
                    {/* List Kegiatan (Kolom Utama) */}
                    <div className="lg:col-span-8">
                        <div className="mb-10">
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">
                                Agenda Terdekat
                            </h2>
                            <p className="text-slate-500">
                                Data kegiatan yang diselenggarakan oleh unit
                                perpustakaan.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="group relative flex flex-col rounded-[32px] border border-white bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-100"
                                >
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <Calendar className="h-6 w-6" />
                                        </div>
                                        {activity.laporan && (
                                            <div
                                                className={`rounded-full px-4 py-1 text-[10px] font-black tracking-widest uppercase ${
                                                    activity.laporan.status ===
                                                    'Selesai'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-orange-100 text-orange-700'
                                                }`}
                                            >
                                                {activity.laporan.status}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-2 text-xs font-bold tracking-wider text-blue-500 uppercase">
                                        {formatDate(activity.tanggal_kegiatan)}
                                    </div>
                                    <h3 className="mb-3 text-xl leading-tight font-bold text-slate-900 group-hover:text-blue-600">
                                        {activity.nama_kegiatan}
                                    </h3>
                                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">
                                        {activity.deskripsi_kegiatan}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
                                        <div className="flex items-center gap-2 text-[11px] font-medium tracking-tighter text-slate-400 uppercase">
                                            <MapPin className="h-3 w-3" />
                                            {activity.lokasi}
                                        </div>
                                        {activity.laporan && (
                                            <button
                                                onClick={() =>
                                                    setSelectedActivity(
                                                        activity,
                                                    )
                                                }
                                                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                                            >
                                                Laporan{' '}
                                                <ArrowRight className="h-3 w-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Profil & Stats */}
                    <div className="space-y-8 lg:col-span-4">
                        {/* Box Kontak */}
                        <div className="rounded-[32px] bg-slate-900 p-10 text-white shadow-2xl shadow-slate-200">
                            <h3 className="mb-8 text-2xl font-bold">
                                Informasi Kontak
                            </h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-white/10 p-3 text-blue-400">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Lokasi
                                        </p>
                                        <p className="text-sm leading-relaxed font-medium">
                                            {profile.alamat}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-white/10 p-3 text-emerald-400">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Hubungi
                                        </p>
                                        <p className="text-sm font-medium">
                                            {profile.kontak}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 border-t border-white/10 pt-8">
                                    <div className="rounded-xl bg-white/10 p-3 text-orange-400">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Operasional
                                        </p>
                                        <p className="text-sm font-medium text-slate-300 italic">
                                            Senin - Jumat
                                        </p>
                                        <p className="text-lg font-black tracking-tight">
                                            08.00 - 16.00 WIB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistik Ringkas (Berdasarkan Data Tabel) */}
                        <div className="rounded-[32px] border border-white bg-white p-10 shadow-sm">
                            <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-900 uppercase">
                                <LayoutGrid className="h-4 w-4 text-blue-600" />
                                Monitoring Data
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                                    <div className="mb-1 text-3xl font-black text-blue-600">
                                        {activities.length}
                                    </div>
                                    <div className="text-[9px] font-bold tracking-widest text-blue-400 uppercase">
                                        Agenda
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                                    <div className="mb-1 text-3xl font-black text-emerald-600">
                                        {
                                            activities.filter(
                                                (a) =>
                                                    a.laporan?.status ===
                                                    'Selesai',
                                            ).length
                                        }
                                    </div>
                                    <div className="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
                                        Laporan
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal Laporan (Satu Arah dari Data Laporan) */}
            {selectedActivity?.laporan && (
                <div className="fixed inset-0 z-[60] flex animate-in items-center justify-center bg-slate-900/40 p-6 backdrop-blur-md duration-300 fade-in">
                    <div className="w-full max-w-2xl animate-in rounded-[40px] bg-white p-10 shadow-2xl duration-300 zoom-in">
                        <div className="mb-10 flex items-center justify-between">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                <FileText className="h-7 w-7" />
                            </div>
                            <button
                                onClick={() => setSelectedActivity(null)}
                                className="rounded-full bg-slate-100 p-3 text-slate-500 transition-colors hover:bg-slate-200"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mb-8">
                            <div className="mb-2 text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase">
                                Laporan Resmi Unit
                            </div>
                            <h3 className="text-3xl leading-tight font-black tracking-tight text-slate-900">
                                {selectedActivity.nama_kegiatan}
                            </h3>
                        </div>
                        <div className="mb-10">
                            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 leading-relaxed font-medium text-slate-600 italic">
                                "{selectedActivity.laporan.isi_laporan}"
                            </div>
                            <div className="mt-6 flex flex-wrap items-center gap-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-blue-400" />{' '}
                                    Agenda:{' '}
                                    {formatDate(
                                        selectedActivity.tanggal_kegiatan,
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />{' '}
                                    Valid:{' '}
                                    {formatDate(
                                        selectedActivity.laporan.tanggal_buat,
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedActivity(null)}
                            className="w-full rounded-2xl bg-slate-900 py-5 text-xs font-black tracking-[0.2em] text-white uppercase transition-all hover:bg-blue-600 hover:shadow-2xl"
                        >
                            Konfirmasi Pembacaan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;

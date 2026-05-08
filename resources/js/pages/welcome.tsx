import React, { useState } from 'react';
import {
    MapPin,
    Phone,
    Calendar,
    BookOpen,
    FileText,
    CheckCircle2,
    X,
    ArrowRight,
    LogIn,
    Quote,
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
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 selection:bg-blue-100">
            {/* Navigasi - Refined & Aesthetic */}
            <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between md:h-20">
                        {/* Sisi Kiri: Logo & Nama */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-700 shadow-md sm:h-10 sm:w-10 sm:rounded-xl">
                                <BookOpen className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm leading-none font-black tracking-tighter text-slate-900 uppercase sm:text-base md:text-lg">
                                    {profile.nama_perpus}
                                </span>
                                <span className="hidden text-[8px] font-bold tracking-[0.2em] text-blue-500 uppercase md:block">
                                    Digital Library Portal
                                </span>
                            </div>
                        </div>

                        {/* Sisi Kanan: Akses Login */}
                        <div className="flex items-center">
                            <a
                                href="/login"
                                className="group flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black tracking-widest text-white shadow-lg shadow-slate-200 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95 sm:px-6 sm:py-2.5 sm:text-[11px]"
                            >
                                <LogIn className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
                                <span className="xs:block hidden">
                                    LOGIN PETUGAS
                                </span>
                                <span className="xs:hidden">LOGIN</span>{' '}
                                {/* Teks lebih pendek di HP sangat kecil */}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero - Ultra Modern Typography */}
            <section className="relative overflow-hidden px-6 pt-32 pb-24">
                <div className="absolute -top-24 left-1/2 -z-10 h-150 w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,#eff6ff_0%,transparent_70%)]" />
                <div className="mx-auto max-w-5xl text-center">
                    <div className="animate-bounce-slow mb-6 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-blue-600">
                        OFFICIAL REPOSITORY
                    </div>
                    <h1 className="mb-8 text-4xl font-[1000] tracking-tight wrap-break-word text-slate-900 sm:text-5xl md:text-8xl lg:leading-[0.9]">
                        {profile.nama_perpus.split(' ').map((word, i) => (
                            <span
                                key={i}
                                className={`inline-block ${i === 0 ? 'text-blue-600' : ''}`}
                            >
                                {word}&nbsp;
                            </span>
                        ))}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-500 md:text-xl">
                        {profile.deskripsi ||
                            'Menjadi jembatan peradaban melalui literasi inklusif dan inovatif.'}
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-6 pb-32">
                <div className="grid gap-12 lg:grid-cols-12">
                    {/* List Kegiatan - Card Design with Hover Glow */}
                    <div className="lg:col-span-8">
                        <div className="mb-12 flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter uppercase">
                                    Agenda Terbaru
                                </h2>
                                <div className="mt-2 h-1.5 w-12 rounded-full bg-blue-600" />
                            </div>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="group relative flex flex-col rounded-[40px] border border-slate-100 bg-white p-10 transition-all duration-500 hover:border-blue-200 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
                                >
                                    <div className="mb-8 flex items-start justify-between">
                                        <div className="rounded-3xl bg-slate-50 p-4 transition-colors duration-500 group-hover:bg-blue-600">
                                            <Calendar className="h-6 w-6 text-slate-400 group-hover:text-white" />
                                        </div>
                                        {activity.laporan?.status ===
                                            'Selesai' && (
                                            <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[9px] font-black tracking-widest text-emerald-600 uppercase">
                                                <CheckCircle2 className="h-3 w-3" />{' '}
                                                Reported
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-3 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                        {formatDate(activity.tanggal_kegiatan)}
                                    </div>
                                    <h3 className="mb-4 text-2xl leading-tight font-black text-slate-900 transition-colors group-hover:text-blue-600">
                                        {activity.nama_kegiatan}
                                    </h3>
                                    <p className="mb-8 line-clamp-2 text-sm leading-relaxed font-medium text-slate-400">
                                        {activity.deskripsi_kegiatan}
                                    </p>
                                    <button
                                        disabled={!activity.laporan}
                                        onClick={() =>
                                            setSelectedActivity(activity)
                                        }
                                        className={`mt-auto flex items-center justify-center gap-2 rounded-2xl py-4 text-[10px] font-black tracking-widest uppercase transition-all ${
                                            activity.laporan
                                                ? 'bg-slate-900 text-white hover:bg-blue-600'
                                                : 'cursor-not-allowed bg-slate-50 text-slate-300'
                                        }`}
                                    >
                                        {activity.laporan
                                            ? 'Lihat Laporan'
                                            : 'Laporan Belum Tersedia'}
                                        {activity.laporan && (
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar - Informasi Kontak & Stats */}
                    <aside className="space-y-8 lg:col-span-4">
                        <div className="relative overflow-hidden rounded-[48px] bg-slate-900 p-10 text-white">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <MapPin className="h-32 w-32" />
                            </div>
                            <h3 className="mb-10 text-xl font-black tracking-widest uppercase">
                                Connect
                            </h3>
                            <div className="relative z-10 space-y-10">
                                {[
                                    {
                                        icon: MapPin,
                                        label: 'Lokasi',
                                        val: profile.alamat,
                                        color: 'text-blue-400',
                                    },
                                    {
                                        icon: Phone,
                                        label: 'Kontak',
                                        val: profile.kontak,
                                        color: 'text-emerald-400',
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                                            <item.icon
                                                className={`h-5 w-5 ${item.color}`}
                                            />
                                        </div>
                                        <div>
                                            <p className="mb-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
                                                {item.label}
                                            </p>
                                            <p className="text-sm leading-relaxed font-bold">
                                                {item.val}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Premium Modal Laporan - Mobile-First Fix */}
            {selectedActivity?.laporan && (
                <div className="fixed inset-0 z-[100] flex animate-in flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xl duration-300 fade-in">
                    {/* Tombol Tutup Floating - Selalu di pojok kanan atas layar, bukan pojok modal */}
                    <button
                        onClick={() => setSelectedActivity(null)}
                        className="fixed top-6 right-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all active:scale-90"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Kontainer Modal */}
                    <div className="relative flex max-h-[85vh] w-[92%] max-w-3xl animate-in flex-col duration-500 slide-in-from-bottom-8">
                        {/* Kertas Laporan dengan Scroll Internal */}
                        <div className="flex flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl">
                            {/* Header Modal (Sticky/Tetap) */}
                            <div className="shrink-0">
                                <div className="h-2 bg-linear-to-r from-blue-600 via-indigo-600 to-emerald-600" />
                                <div className="flex items-center justify-between px-8 pt-8 pb-4">
                                    <div className="rounded-xl bg-slate-50 p-3">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="text-right">
                                        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[9px] font-black text-emerald-600 uppercase">
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Area Konten yang Bisa di-Scroll */}
                            <div className="scrollbar-thin scrollbar-thumb-slate-200 overflow-y-auto px-8 pb-10 md:px-16 md:pb-16">
                                <h2 className="mb-4 text-2xl leading-tight font-[1000] tracking-tighter text-slate-900 uppercase md:text-4xl">
                                    {selectedActivity.nama_kegiatan}
                                </h2>

                                <div className="mb-10 flex flex-wrap items-center gap-3 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                    <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(
                                            selectedActivity.tanggal_kegiatan,
                                        )}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                                    <span>{selectedActivity.lokasi}</span>
                                </div>

                                {/* INTEGRASI WYSIWYG CONTENT */}
                                <div
                                    className="prose max-w-none prose-slate lg:prose-lg prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-img:rounded-3xl prose-img:shadow-lg"
                                    dangerouslySetInnerHTML={{
                                        __html: selectedActivity.laporan
                                            .isi_laporan,
                                    }}
                                />

                                {/* Footer di dalam area scroll agar tidak memotong layar */}
                                <div className="mt-12 flex flex-col gap-6 border-t border-slate-50 pt-8 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase">
                                            Unit Pengelola
                                        </p>
                                        <p className="text-sm font-bold text-slate-900">
                                            {profile.nama_perpus}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-100/50 bg-slate-50 p-4">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                        <div className="font-mono text-[10px] font-bold text-slate-600">
                                            SIG-ID-
                                            {selectedActivity.laporan.id
                                                .toString()
                                                .padStart(6, '0')}
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Tutup Tambahan untuk Mobile di akhir teks */}
                                <button
                                    onClick={() => setSelectedActivity(null)}
                                    className="mt-8 w-full rounded-xl bg-slate-900 py-4 text-[10px] font-black tracking-widest text-white uppercase shadow-lg md:hidden"
                                >
                                    Tutup Laporan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;

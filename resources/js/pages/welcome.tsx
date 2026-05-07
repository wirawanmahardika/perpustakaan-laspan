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
            {/* Navigasi - Blur & Floating Effect */}
            <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 p-2.5 shadow-lg">
                            <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">
                            {profile.nama_perpus}
                        </span>
                    </div>
                    <a
                        href="/login"
                        className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-[11px] font-black tracking-widest text-white shadow-xl shadow-slate-200 transition-all hover:scale-105 hover:bg-blue-600 active:scale-95"
                    >
                        <LogIn className="h-3.5 w-3.5" />
                        LOGIN PETUGAS
                    </a>
                </div>
            </nav>

            {/* Hero - Ultra Modern Typography */}
            <section className="relative overflow-hidden px-6 pt-32 pb-24">
                <div className="absolute -top-24 left-1/2 -z-10 h-150 w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,#eff6ff_0%,transparent_70%)]" />
                <div className="mx-auto max-w-5xl text-center">
                    <div className="animate-bounce-slow mb-6 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-blue-600">
                        OFFICIAL REPOSITORY
                    </div>
                    <h1 className="mb-8 text-6xl font-[1000] tracking-tight text-slate-900 md:text-8xl lg:leading-[0.9]">
                        {profile.nama_perpus.split(' ').map((word, i) => (
                            <span
                                key={i}
                                className={i === 0 ? 'text-blue-600' : ''}
                            >
                                {word}{' '}
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

            {/* Premium Modal Laporan - Desain Seperti Lembaran Kertas */}
            {selectedActivity?.laporan && (
                <div className="fixed inset-0 z-100 flex animate-in items-center justify-center bg-slate-950/60 p-6 backdrop-blur-xl duration-500 fade-in">
                    <div className="relative w-full max-w-3xl animate-in duration-500 slide-in-from-bottom-12">
                        <button
                            onClick={() => setSelectedActivity(null)}
                            className="absolute -top-16 right-0 flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-white/60 uppercase hover:text-white"
                        >
                            Tutup <X className="h-5 w-5" />
                        </button>

                        <div className="overflow-hidden rounded-[40px] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                            <div className="h-3 bg-linear-to-r from-blue-600 via-indigo-600 to-emerald-600" />
                            <div className="p-12 md:p-20">
                                <div className="mb-12 flex items-start justify-between">
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <FileText className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div className="text-right">
                                        <div className="mb-1 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                            Status Dokumen
                                        </div>
                                        <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                                            TERVALIDASI SISTEM
                                        </div>
                                    </div>
                                </div>

                                <h2 className="mb-4 text-4xl font-[1000] tracking-tighter text-slate-900 uppercase">
                                    {selectedActivity.nama_kegiatan}
                                </h2>
                                <div className="mb-12 flex items-center gap-4 border-b border-slate-50 pb-12 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                    <span>
                                        {formatDate(
                                            selectedActivity.tanggal_kegiatan,
                                        )}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                                    <span>{selectedActivity.lokasi}</span>
                                </div>

                                <div className="relative">
                                    <Quote className="absolute -top-8 -left-8 -z-10 h-16 w-16 text-slate-50" />
                                    <div className="text-lg leading-[1.8] font-medium text-slate-600 italic first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-black first-letter:text-slate-900 md:text-xl">
                                        {selectedActivity.laporan.isi_laporan}
                                    </div>
                                </div>

                                <div className="mt-16 flex flex-col justify-between gap-8 border-t border-slate-50 pt-12 md:flex-row">
                                    <div>
                                        <p className="mb-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Penanggung Jawab
                                        </p>
                                        <p className="font-bold tracking-tighter text-slate-900 uppercase">
                                            {profile.nama_perpus}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                        <div>
                                            <p className="text-[9px] font-black tracking-widest text-slate-400 uppercase">
                                                Tanda Tangan Digital
                                            </p>
                                            <p className="font-mono text-[10px] font-bold text-slate-600">
                                                ID-
                                                {selectedActivity.laporan.id
                                                    .toString()
                                                    .padStart(6, '0')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;

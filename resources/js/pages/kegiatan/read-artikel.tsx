import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User, Share2, Tag, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Kegiatan } from '@/types/my-type/kegiatan';
import { formatHumanDate } from '@/lib/utils';

interface Props {
    activity: Kegiatan;
}

const ReadArtikel: React.FC<Props> = ({ activity }) => {
    return (
        // SOLUSI: Tambahkan w-full dan overflow-x-hidden pada kontainer utama
        <div className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-slate-900">
            <Head title={`${activity.nama_kegiatan} - Detail Artikel`} />

            {/* Progress Bar / Top Nav */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
                    <Link
                        href="/aktivitas"
                        className="group flex min-w-0 items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors hover:text-blue-600"
                    >
                        <ArrowLeft
                            size={14}
                            className="shrink-0 transition-transform group-hover:-translate-x-1"
                        />
                        <span className="truncate">Kembali ke Arsip</span>
                    </Link>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-100">
                        <BookOpen size={16} />
                    </div>
                </div>
            </nav>

            {/* SOLUSI: Mengurangi padding vertikal (py-8) pada mobile device */}
            <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-16 md:py-24">
                {/* Header Artikel */}
                <header className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 inline-flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black tracking-widest text-blue-600 uppercase"
                    >
                        <Tag size={12} className="shrink-0" />{' '}
                        {activity.tipe.replace('_', ' ')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 text-3xl leading-[1.1] font-[1000] tracking-tighter wrap-break-word text-slate-950 uppercase italic sm:text-5xl sm:leading-[0.95] md:text-7xl"
                    >
                        {activity.nama_kegiatan}
                    </motion.h1>

                    {/* SOLUSI: Gap-4 pada mobile agar metadata membungkus dengan rapi */}
                    <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6 sm:gap-8 sm:pt-8">
                        <MetaInfo
                            icon={<Calendar size={14} />}
                            label="Tanggal Pelaksanaan"
                            value={formatHumanDate(activity.tanggal)}
                        />
                        <MetaInfo
                            icon={<User size={14} />}
                            label="Pihak Terlibat"
                            value={
                                activity.pihak_terlibat ||
                                'Internal Perpustakaan'
                            }
                        />
                    </div>
                </header>

                {/* Konten Utama (Output Tiptap) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    // SOLUSI: Tambahkan w-full, break-words, dan utilitas penanganan elemen tabel/pre internal agar tidak meluber
                    className="prose w-full max-w-none wrap-break-word prose-slate sm:prose-lg prose-headings:font-[1000] prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic prose-p:leading-relaxed prose-pre:max-w-full prose-pre:overflow-x-auto prose-table:block prose-table:w-full prose-table:overflow-x-auto prose-img:rounded-2xl prose-img:shadow-2xl sm:prose-img:rounded-[2.5rem]"
                >
                    {activity.artikel ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: activity.artikel,
                            }}
                        />
                    ) : (
                        // SOLUSI: Mengubah rounded-4xl menjadi rounded-3xl di mobile agar proporsional
                        <div className="rounded-3xl border-2 border-dashed border-slate-100 px-4 py-16 text-center sm:rounded-4xl sm:py-24">
                            <p className="text-xs font-black tracking-widest text-slate-300 uppercase italic sm:text-sm">
                                Narasi artikel sedang dalam proses penyusunan...
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Footer Artikel / Section Testimoni */}
                {activity.testimoni && (
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 rounded-4xl bg-slate-950 p-6 text-white shadow-2xl sm:rounded-[3rem] sm:p-10 md:p-16"
                    >
                        <span className="mb-4 block text-[9px] font-black tracking-[0.3em] text-blue-400 uppercase sm:text-[10px] sm:tracking-[0.4em]">
                            Dampak & Testimoni
                        </span>
                        {/* SOLUSI: text-lg pada mobile agar kalimat panjang tidak memotong layar */}
                        <blockquote className="text-lg leading-snug font-[1000] tracking-tighter italic sm:text-2xl md:text-4xl">
                            "{activity.testimoni}"
                        </blockquote>
                    </motion.section>
                )}

                {/* Call to Action */}
                {/* SOLUSI: flex-col pada mobile agar tombol cetak tidak terdesak ke kanan */}
                <footer className="mt-16 flex flex-col gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Kategori: {activity.tipe.replace('_', ' ')}
                    </p>
                    <button
                        onClick={() => window.print()}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-slate-50 sm:w-auto"
                    >
                        Cetak Laporan
                    </button>
                </footer>
            </article>
        </div>
    );
};

// Sub-komponen Meta Info
const MetaInfo = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    // SOLUSI: Tambahkan min-w-0 dan break-words agar teks metadata pembungkus aman
    <div className="flex max-w-full min-w-0 flex-col gap-1 wrap-break-word">
        <span className="flex items-center gap-2 truncate text-[9px] font-black tracking-widest text-slate-400 uppercase">
            <span className="shrink-0">{icon}</span> {label}
        </span>
        <span className="text-xs font-bold text-slate-900">{value}</span>
    </div>
);

export default ReadArtikel;

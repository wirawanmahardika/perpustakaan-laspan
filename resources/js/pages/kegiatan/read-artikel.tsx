import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User, Share2, Tag, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Kegiatan } from '@/types/library';

interface Props {
    activity: Kegiatan;
}

const ReadArtikel: React.FC<Props> = ({ activity }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <Head title={`${activity.nama_kegiatan} - Detail Artikel`} />

            {/* Progress Bar / Top Nav */}
            <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
                    <Link
                        href="/aktivitas"
                        className="group flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors hover:text-blue-600"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        Kembali ke Arsip
                    </Link>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-100">
                        <BookOpen size={16} />
                    </div>
                </div>
            </nav>

            <article className="mx-auto max-w-4xl px-6 py-12 md:py-24">
                {/* Header Artikel */}
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 inline-flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-[10px] font-black tracking-widest text-blue-600 uppercase"
                    >
                        <Tag size={12} /> {activity.tipe.replace('_', ' ')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-10 text-5xl leading-[0.95] font-[1000] tracking-tighter text-slate-950 uppercase italic md:text-7xl"
                    >
                        {activity.nama_kegiatan}
                    </motion.h1>

                    <div className="flex flex-wrap items-center gap-8 border-t border-slate-100 pt-8">
                        <MetaInfo
                            icon={<Calendar size={14} />}
                            label="Tanggal Pelaksanaan"
                            value={activity.tanggal}
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
                    className="prose prose-lg max-w-none prose-slate prose-headings:font-[1000] prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic prose-p:leading-relaxed prose-img:rounded-[2.5rem] prose-img:shadow-2xl"
                >
                    {activity.artikel ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: activity.artikel,
                            }}
                        />
                    ) : (
                        <div className="rounded-[2rem] border-2 border-dashed border-slate-100 py-24 text-center">
                            <p className="font-black tracking-widest text-slate-300 uppercase italic">
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
                        className="mt-24 rounded-[3rem] bg-slate-950 p-10 text-white shadow-2xl md:p-16"
                    >
                        <span className="mb-6 block text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase">
                            Dampak & Testimoni
                        </span>
                        <blockquote className="text-2xl leading-tight font-[1000] tracking-tighter italic md:text-4xl">
                            "{activity.testimoni}"
                        </blockquote>
                    </motion.section>
                )}

                {/* Call to Action */}
                <footer className="mt-24 flex items-center justify-between border-t border-slate-100 pt-12">
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Kategori: {activity.tipe}
                    </p>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-slate-50"
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
    icon: any;
    label: string;
    value: string;
}) => (
    <div className="flex flex-col gap-1">
        <span className="flex items-center gap-2 text-[9px] font-black tracking-widest text-slate-400 uppercase">
            {icon} {label}
        </span>
        <span className="text-xs font-bold text-slate-900">{value}</span>
    </div>
);

export default ReadArtikel;

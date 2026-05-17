import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PublicNavbar } from '@/components/public-navbar';
import { motion, Variants } from 'framer-motion';
import {
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    MessageSquare,
    Globe,
    Share2,
    HelpCircle,
} from 'lucide-react';
import { ProfilPerpus } from '@/types/my-type/profil-perpus';

interface ContactProps {
    profile: ProfilPerpus | null;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        email: '',
        subjek: '',
        pesan: '',
    });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100 },
        },
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/', {
            onSuccess: () => {
                setIsSubmitted(true);
                reset();
            },
        });
    };

    const alamatLengkap = profile
        ? `${profile.alamat}, Desa/Kel. ${profile.desa_kelurahan}, Kec. ${profile.kecamatan}, ${profile.kabupaten_kota}, Prov. ${profile.provinsi}`
        : 'Alamat resmi belum dikonfigurasi.';

    // Logika Pemrosesan Objek JSON Media Sosial menjadi Array lokal yang valid dan bersih
    const validMediaSosial = profile?.media_sosial
        ? Object.entries(profile.media_sosial)
              .filter(([_, url]) => url && url.trim() !== '') // Menyaring field yang kosong atau null
              .map(([platform, url]) => ({ platform, url: url as string }))
        : [];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <Head title="Hubungi Kami - Portal Perpustakaan" />

            <PublicNavbar />

            <header className="relative overflow-hidden border-b border-slate-200/60 bg-white py-16 dark:border-slate-800/50 dark:bg-slate-900">
                <div className="bg-radial-at-t absolute inset-0 from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20" />
                <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black tracking-widest text-blue-600 uppercase dark:bg-blue-950/50 dark:text-blue-400"
                    >
                        <MessageSquare size={12} /> Saluran Komunikasi Publik
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-sans text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white"
                    >
                        Hubungi Kami
                    </motion.h1>
                    <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                        Layanan pusat bantuan, informasi kemitraan literasi,
                        koordinasi program, dan pengaduan publik.
                    </p>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-8 lg:grid-cols-5"
                >
                    {/* Sisi Kiri: Panel Informasi Fisik & Kontak Resmi */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Box Alamat */}
                        <motion.section
                            variants={itemVariants}
                            className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <h2 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        Alamat Gedung Layanan
                                    </h2>
                                    <p className="mt-1 text-xs leading-normal font-bold text-slate-800 dark:text-slate-200">
                                        {alamatLengkap}
                                    </p>
                                    <span className="mt-2 inline-block rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-black tracking-wider text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
                                        Sifat Bangunan:{' '}
                                        {profile?.sifat_bangunan === 'sendiri'
                                            ? 'Mandiri'
                                            : 'Bergabung'}
                                    </span>
                                </div>
                            </div>
                        </motion.section>

                        {/* Box Kontak */}
                        <motion.section
                            variants={itemVariants}
                            className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                        >
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400">
                                        <Phone size={18} />
                                    </div>
                                    <div className="w-full overflow-hidden">
                                        <h2 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Kontak Hubung Utama
                                        </h2>
                                        <p className="mt-1 font-mono text-xs font-bold break-all whitespace-pre-wrap text-slate-800 dark:text-slate-200">
                                            {profile?.kontak || '-'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <h2 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Jam Operasional Pelayanan
                                        </h2>
                                        <p className="mt-1 text-xs leading-relaxed font-bold text-slate-700 dark:text-slate-300">
                                            Senin - Jumat: 08:00 - 15:30 WITA
                                            <br />
                                            Sabtu - Minggu / Hari Libur
                                            Nasional: Tutup
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Implementasi Baru Pengambilan Data JSON Object Media Sosial */}
                        {validMediaSosial.length > 0 && (
                            <motion.section
                                variants={itemVariants}
                                className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                            >
                                <h2 className="mb-4 flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                    <Share2 size={12} /> Tautan Media Sosial
                                    Resmi
                                </h2>
                                <div className="grid grid-cols-1 gap-2">
                                    {validMediaSosial.map((medsos, index) => (
                                        <a
                                            key={index}
                                            href={
                                                medsos.url.startsWith('http')
                                                    ? medsos.url
                                                    : `https://${medsos.url}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Globe
                                                    size={14}
                                                    className="text-blue-500"
                                                />
                                                <span className="font-sans capitalize">
                                                    {medsos.platform}
                                                </span>
                                            </div>
                                            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase">
                                                Kunjungi →
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* Sisi Kanan: Form Pengiriman Pesan */}
                    <div className="lg:col-span-3">
                        <motion.section
                            variants={itemVariants}
                            className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                        >
                            <h2 className="mb-6 flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                                <HelpCircle size={14} /> Formulir Kontak Digital
                            </h2>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-xl bg-green-50 p-6 text-center text-green-800 dark:bg-green-950/40 dark:text-green-400"
                                >
                                    <CheckCircle2
                                        size={32}
                                        className="mx-auto mb-3 text-green-600 dark:text-green-400"
                                    />
                                    <h3 className="text-xs font-black tracking-wider uppercase">
                                        Pesan Terkirim
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed font-medium text-green-600/90 dark:text-green-400/80">
                                        Aspirasi atau pertanyaan Anda berhasil
                                        masuk ke pusat data administrasi
                                        perpustakaan. Tim pengelola akan segera
                                        menindaklanjuti.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-4 text-[10px] font-black tracking-widest text-green-700 uppercase underline dark:text-green-400"
                                    >
                                        Kirim Pesan Baru
                                    </button>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                                Nama Pengirim
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.nama}
                                                onChange={(e) =>
                                                    setData(
                                                        'nama',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950"
                                                placeholder="Nama lengkap Anda"
                                            />
                                            {errors.nama && (
                                                <span className="mt-1 block text-[10px] font-bold text-red-500">
                                                    {errors.nama}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                                Korespondensi Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950"
                                                placeholder="alamat@email.com"
                                            />
                                            {errors.email && (
                                                <span className="mt-1 block text-[10px] font-bold text-red-500">
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Subjek / Kategori Pesan
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.subjek}
                                            onChange={(e) =>
                                                setData(
                                                    'subjek',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950"
                                            placeholder="Contoh: Pengajuan Donasi Buku Koleksi"
                                        />
                                        {errors.subjek && (
                                            <span className="mt-1 block text-[10px] font-bold text-red-500">
                                                {errors.subjek}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                            Uraian Pesan
                                        </label>
                                        <textarea
                                            rows={5}
                                            required
                                            value={data.pesan}
                                            onChange={(e) =>
                                                setData('pesan', e.target.value)
                                            }
                                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-xs focus:border-blue-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950"
                                            placeholder="Tulis detail pesan, pertanyaan, atau laporan pengaduan Anda..."
                                        />
                                        {errors.pesan && (
                                            <span className="mt-1 block text-[10px] font-bold text-red-500">
                                                {errors.pesan}
                                            </span>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-black tracking-widest text-white uppercase shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            <Send size={14} />
                                            {processing
                                                ? 'Memproses...'
                                                : 'Kirim Komunikasi'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.section>
                    </div>
                </motion.div>
            </main>

            <footer className="mt-12 border-t border-slate-200/60 bg-white py-8 text-center dark:border-slate-800/40 dark:bg-slate-950">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        © {new Date().getFullYear()} •{' '}
                        {profile?.nama_perpustakaan || 'Perpustakaan Desa'}
                    </p>
                    {profile?.npp && (
                        <p className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-bold text-slate-400 dark:bg-slate-900">
                            NPP: {profile.npp}
                        </p>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default Contact;

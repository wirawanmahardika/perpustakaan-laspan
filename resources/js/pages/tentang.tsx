import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { PublicNavbar } from '@/components/public-navbar';
import { motion, Variants } from 'framer-motion';
import {
    Shield,
    Target,
    Users,
    Landmark,
    Award,
    BookOpen,
    MapPin,
    Calendar,
    FileText,
    Phone,
    Building2,
    Briefcase,
    GraduationCap,
    Lightbulb,
} from 'lucide-react';
import { ProfilPerpus } from '@/types/my-type/profil-perpus';
import { User } from '@/types';

interface AboutProps {
    profile: ProfilPerpus | null;
    officers: User[];
}

const About: React.FC<AboutProps> = ({ profile, officers }) => {
    console.log(officers);

    // Definisi Animasi dengan Tipe Explicit untuk Validasi TypeScript
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

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
            <Head title="Tentang Kami - Portal Perpustakaan" />

            <PublicNavbar />

            {/* Hero Header Section */}
            <header className="relative overflow-hidden border-b border-slate-200/60 bg-white py-20 dark:border-slate-800/50 dark:bg-slate-900">
                <div className="bg-radial-at-t absolute inset-0 from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20" />
                <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black tracking-widest text-blue-600 uppercase dark:bg-blue-950/50 dark:text-blue-400"
                    >
                        <Landmark size={12} /> Profil Instansi Resmi
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-sans text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white"
                    >
                        {profile?.nama_perpustakaan || 'Perpustakaan Desa'}
                    </motion.h1>

                    {profile?.npp && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-2 font-mono text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                        >
                            NPP: {profile.npp}
                        </motion.p>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-6xl px-6 py-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-8 lg:grid-cols-3"
                >
                    {/* Kolom Utama Kiri: Informasi Kelembagaan */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Legalitas & Pendirian */}
                        <motion.section
                            variants={itemVariants}
                            className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                        >
                            <h2 className="mb-6 flex items-center gap-3 text-xs font-black tracking-widest text-blue-600 uppercase">
                                <FileText size={16} /> Legalitas Lembaga
                            </h2>
                            <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
                                <div>
                                    <span className="block text-xs font-medium tracking-wider text-slate-400 uppercase">
                                        Nomor SK Pendirian
                                    </span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.nomor_sk || '-'}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs font-medium tracking-wider text-slate-400 uppercase">
                                        Tahun Berdiri
                                    </span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.tahun_berdiri || '-'}
                                    </span>
                                </div>
                                {profile?.tanggal_operasi_efektif && (
                                    <div className="border-t border-slate-100 pt-4 sm:col-span-2 dark:border-slate-800">
                                        <span className="block text-xs font-medium tracking-wider text-slate-400 uppercase">
                                            Tanggal Operasi Efektif
                                        </span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">
                                            {new Date(
                                                profile.tanggal_operasi_efektif,
                                            ).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.section>

                        {/* Kondisi Fisik & Sarana */}
                        <motion.section
                            variants={itemVariants}
                            className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                        >
                            <h2 className="mb-6 flex items-center gap-3 text-xs font-black tracking-widest text-blue-600 uppercase">
                                <Building2 size={16} /> Sarana & Prasarana Fisik
                            </h2>
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs font-medium tracking-wider text-slate-400 uppercase">
                                        Sifat Bangunan
                                    </span>
                                    <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.sifat_bangunan === 'sendiri'
                                            ? 'Gedung Sendiri / Mandiri'
                                            : 'Bergabung dengan Gedung/Kantor Lain'}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Konteks Geografis & Demografi */}
                        <motion.section
                            variants={itemVariants}
                            className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                        >
                            <h2 className="mb-6 flex items-center gap-3 text-xs font-black tracking-widest text-blue-600 uppercase">
                                <MapPin size={16} /> Demografi & Geografis
                                Wilayah
                            </h2>
                            <div className="mb-6 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
                                <div>
                                    <span className="block text-xs font-medium text-slate-400">
                                        Luas Wilayah Desa
                                    </span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.luas_wilayah
                                            ? `${profile.luas_wilayah} km²`
                                            : '-'}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs font-medium text-slate-400">
                                        Jumlah Penduduk
                                    </span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.jumlah_penduduk
                                            ? `${profile.jumlah_penduduk.toLocaleString('id-ID')} Jiwa`
                                            : '-'}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs font-medium text-slate-400">
                                        Jarak ke Kab/Kota
                                    </span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.jarak_ke_kabkota
                                            ? `${profile.jarak_ke_kabkota} Km`
                                            : '-'}
                                    </span>
                                </div>
                            </div>

                            {profile?.mata_pencaharian_utama &&
                                profile.mata_pencaharian_utama.length > 0 && (
                                    <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                                        <span className="mb-2 block text-xs font-medium tracking-wider text-slate-400 uppercase">
                                            Mata Pencaharian Utama Masyarakat
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.mata_pencaharian_utama.map(
                                                (pekerjaan, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                                    >
                                                        {pekerjaan}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                        </motion.section>
                    </div>

                    {/* Kolom Kanan: Atribut Penanggung Jawab & Alamat */}
                    <div className="space-y-6">
                        <motion.div
                            variants={itemVariants}
                            className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs dark:border-slate-800/60 dark:bg-slate-900"
                        >
                            <h3 className="mb-6 flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                <Award size={14} /> Struktur Penanggung Jawab
                            </h3>
                            <div className="space-y-4 text-xs">
                                <div>
                                    <span className="block font-medium text-slate-400">
                                        Penanggung Jawab Utama
                                    </span>
                                    <span className="mt-0.5 block text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.nama_penanggung_jawab || '-'}
                                    </span>
                                </div>
                                <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                                    <span className="block font-medium text-slate-400">
                                        Kepala Petugas Operasional
                                    </span>
                                    <span className="mt-0.5 block text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {profile?.nama_petugas || '-'}
                                    </span>
                                </div>
                                <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                                    <span className="block font-medium text-slate-400">
                                        Alamat Layanan Fisik
                                    </span>
                                    <span className="mt-1 block leading-normal font-bold text-slate-800 dark:text-slate-200">
                                        {profile
                                            ? `${profile.alamat}, Desa/Kel. ${profile.desa_kelurahan}, Kec. ${profile.kecamatan}, ${profile.kabupaten_kota}, Prov. ${profile.provinsi}`
                                            : '-'}
                                    </span>
                                </div>
                                {profile?.kontak && (
                                    <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
                                        <span className="block font-medium text-slate-400">
                                            Saluran Kontak Resmi
                                        </span>
                                        <span className="mt-1 block font-mono font-bold break-all text-slate-700 dark:text-slate-300">
                                            {profile.kontak}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Seksi Anggota Petugas (Officers) */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="mt-12 border-t border-slate-200/60 pt-12 dark:border-slate-800/60"
                >
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="flex items-center justify-center gap-3 text-base font-black tracking-tight text-slate-900 uppercase md:justify-start dark:text-white">
                            <Users size={20} className="text-blue-600" />{' '}
                            Pengelola & Petugas Perpustakaan
                        </h2>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                            Personel resmi yang mengelola pelayanan administrasi
                            dan aktivitas literasi harian.
                        </p>
                    </div>

                    {officers.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {officers.map((officer) => (
                                <motion.div
                                    key={officer.id}
                                    variants={itemVariants}
                                    className="group flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs transition-all hover:border-blue-500/30 dark:border-slate-800/60 dark:bg-slate-900"
                                >
                                    <div>
                                        {/* Struktur Atas: Avatar & Detail Nama */}
                                        <div className="mb-4 flex items-center gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 font-sans font-black text-slate-500 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                                {officer.avatar ? (
                                                    <img
                                                        src={officer.avatar}
                                                        alt={officer.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    officer.name.substring(0, 2)
                                                )}
                                            </div>
                                            <div className="overflow-hidden">
                                                <h3 className="truncate font-sans text-sm font-bold tracking-tight text-slate-900 group-hover:text-blue-600 dark:text-white">
                                                    {officer.name}
                                                </h3>
                                                <p className="truncate font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                                    {officer.jabatan ||
                                                        (officer.role ===
                                                        'admin'
                                                            ? 'Administrator'
                                                            : 'Petugas Teknis')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Detail Kualifikasi & Kompetensi */}
                                        <div className="space-y-3 border-t border-slate-100 pt-3 text-xs dark:border-slate-800/80">
                                            {officer.pendidikan_terakhir && (
                                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                    <GraduationCap
                                                        size={14}
                                                        className="shrink-0 text-slate-400"
                                                    />
                                                    <span className="truncate">
                                                        Pendidikan:{' '}
                                                        <strong className="text-slate-700 dark:text-slate-300">
                                                            {
                                                                officer.pendidikan_terakhir
                                                            }
                                                        </strong>
                                                    </span>
                                                </div>
                                            )}

                                            {officer.kreativitas_karya && (
                                                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                                    <Lightbulb
                                                        size={14}
                                                        className="mt-0.5 shrink-0 text-amber-500"
                                                    />
                                                    <p className="line-clamp-2 text-[11px] leading-relaxed">
                                                        <span className="font-semibold text-slate-500">
                                                            Karya/Kreativitas:
                                                        </span>{' '}
                                                        {
                                                            officer.kreativitas_karya
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Identifikasi Peran Sistem */}
                                    <div className="mt-4 flex justify-end pt-2">
                                        <span
                                            className={`inline-block rounded-md px-2 py-0.5 text-[9px] font-black tracking-widest uppercase ${
                                                officer.role === 'admin'
                                                    ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                                                    : 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400'
                                            }`}
                                        >
                                            {officer.role}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
                            <p className="text-xs font-medium text-slate-400">
                                Data kepengurusan petugas belum tersedia.
                            </p>
                        </div>
                    )}
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200/60 bg-white py-8 text-center dark:border-slate-800/40 dark:bg-slate-950">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    © {new Date().getFullYear()} •{' '}
                    {profile?.nama_perpustakaan || 'Perpustakaan Desa'}
                </p>
            </footer>
        </div>
    );
};

export default About;

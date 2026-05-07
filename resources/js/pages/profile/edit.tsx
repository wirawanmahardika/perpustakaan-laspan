import { Head, useForm } from '@inertiajs/react';
import {
    Save,
    Building2,
    MapPin,
    Phone,
    Info,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';
import * as Label from '@radix-ui/react-label';
import { ProfilPerpus } from '@/types/library';
import { profileEditPut } from '@/routes/admin';
import { useState } from 'react';

export default function EditProfile({ profile }: { profile: ProfilPerpus }) {
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);
    const { data, setData, put, processing, errors } = useForm({
        nama_perpus: profile?.nama_perpus ?? '',
        alamat: profile?.alamat ?? '',
        kontak: profile?.kontak ?? '',
        deskripsi: profile?.deskripsi ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(profileEditPut().url, {
            onSuccess: () => {
                setMessage({
                    type: 'success',
                    text: 'Profil unit berhasil diperbarui!',
                });
                // Sembunyikan pesan setelah 3 detik
                setTimeout(() => setMessage(null), 3000);
            },
            onError: () => {
                setMessage({
                    type: 'error',
                    text: 'Terjadi kesalahan. Silakan periksa kembali form Anda.',
                });
            },
        });
    };

    return (
        <>
            <Head title="Pengaturan Profil" />

            {/* Container disesuaikan lebarnya agar tidak terlalu sempit di layar besar */}
            <div className="flex flex-col gap-8 p-6 transition-colors duration-300">
                <div className="border-b border-border pb-6">
                    <h1 className="text-4xl font-[900] tracking-tighter text-foreground">
                        Identitas Unit
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground">
                        Konfigurasi informasi dasar yang tampil pada landing
                        page publik.
                    </p>
                </div>

                {/* Banner Notifikasi */}
                {message && (
                    <div
                        className={`flex animate-in items-center gap-3 rounded-lg p-4 text-sm font-bold tracking-wider uppercase fade-in slide-in-from-top-4 ${
                            message.type === 'success'
                                ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                                : 'border border-destructive/20 bg-destructive/10 text-destructive'
                        }`}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        {message.text}
                    </div>
                )}

                <form onSubmit={submit} className="grid gap-8 lg:grid-cols-12">
                    {/* Grid kiri untuk input form */}
                    <div className="lg:col-span-8">
                        <div className="space-y-8 rounded-xl border border-border bg-card p-8 shadow-sm">
                            {/* Nama Perpustakaan */}
                            <div className="grid gap-3">
                                <Label.Root
                                    className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                    htmlFor="nama"
                                >
                                    Nama Perpustakaan
                                </Label.Root>
                                <div className="relative">
                                    <Building2 className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        id="nama"
                                        type="text"
                                        value={data.nama_perpus}
                                        onChange={(e) =>
                                            setData(
                                                'nama_perpus',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-input bg-background px-12 py-4 text-sm transition-all focus:border-primary focus:ring-1 focus:outline-none"
                                        placeholder="Masukkan nama resmi unit..."
                                    />
                                </div>
                                {errors.nama_perpus && (
                                    <p className="text-[10px] font-bold text-destructive uppercase">
                                        {errors.nama_perpus}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Kontak */}
                                <div className="grid gap-3">
                                    <Label.Root
                                        className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                        htmlFor="kontak"
                                    >
                                        Kontak / WhatsApp
                                    </Label.Root>
                                    <div className="relative">
                                        <Phone className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            id="kontak"
                                            type="text"
                                            value={data.kontak}
                                            onChange={(e) =>
                                                setData(
                                                    'kontak',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-input bg-background px-12 py-4 text-sm focus:border-primary focus:ring-1 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Alamat */}
                                <div className="grid gap-3">
                                    <Label.Root
                                        className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                        htmlFor="alamat"
                                    >
                                        Lokasi Unit
                                    </Label.Root>
                                    <div className="relative">
                                        <MapPin className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            id="alamat"
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    'alamat',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-lg border border-input bg-background px-12 py-4 text-sm focus:border-primary focus:ring-1 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="grid gap-3">
                                <Label.Root
                                    className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                    htmlFor="deskripsi"
                                >
                                    Profil Singkat
                                </Label.Root>
                                <div className="relative">
                                    <Info className="absolute top-4 left-4 h-4 w-4 text-muted-foreground" />
                                    <textarea
                                        id="deskripsi"
                                        rows={6}
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData('deskripsi', e.target.value)
                                        }
                                        className="w-full resize-none rounded-lg border border-input bg-background px-12 py-4 text-sm leading-relaxed focus:border-primary focus:ring-1 focus:outline-none"
                                        placeholder="Tuliskan deskripsi atau visi misi unit..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Kanan untuk aksi */}
                    <div className="space-y-6 lg:col-span-4">
                        <div className="rounded-xl border border-border bg-secondary/30 p-6 shadow-sm">
                            <h3 className="mb-4 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                Tindakan
                            </h3>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary py-5 text-xs font-black tracking-[0.2em] text-primary-foreground uppercase shadow-xl shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Profil'}
                            </button>
                        </div>

                        <div className="rounded-xl border border-border bg-card p-6">
                            <p className="text-[10px] leading-relaxed font-bold tracking-tight text-muted-foreground uppercase">
                                Data ini bersifat{' '}
                                <span className="text-primary underline">
                                    Publik
                                </span>
                                . Pastikan informasi kontak dan alamat sudah
                                benar agar pengunjung dapat menghubungi
                                perpustakaan.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

EditProfile.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Profil Unit', href: '#' },
    ],
};

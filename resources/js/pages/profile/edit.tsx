import { Head, useForm } from '@inertiajs/react';
import {
    Save,
    Building2,
    MapPin,
    Phone,
    Info,
    CheckCircle2,
    AlertCircle,
    Loader2,
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
                    text: 'Profil berhasil diperbarui!',
                });
                setTimeout(() => setMessage(null), 3000);
            },
            onError: () => {
                setMessage({
                    type: 'error',
                    text: 'Terjadi kesalahan pada form.',
                });
            },
        });
    };

    return (
        <>
            <Head title="Pengaturan Profil" />

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 transition-all md:p-8">
                {/* Header Area - Ramping */}
                <div className="border-b border-border pb-5">
                    <h1 className="text-2xl leading-none font-[1000] tracking-tighter uppercase md:text-3xl dark:text-white">
                        Identitas Unit
                    </h1>
                    <p className="mt-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        Konfigurasi informasi dasar landing page publik
                    </p>
                </div>

                {/* Notifikasi Floating-style */}
                {message && (
                    <div
                        className={`flex animate-in items-center gap-3 rounded-xl border p-3 shadow-md fade-in slide-in-from-top-2 ${
                            message.type === 'success'
                                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'border-destructive/20 bg-destructive/10 text-destructive'
                        }`}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="text-[10px] font-black tracking-widest uppercase">
                            {message.text}
                        </span>
                    </div>
                )}

                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-12">
                    {/* Form Utama */}
                    <div className="space-y-5 lg:col-span-8">
                        <div className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
                            {/* Nama Perpustakaan */}
                            <div className="grid gap-2">
                                <Label.Root
                                    className="ml-1 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                    htmlFor="nama"
                                >
                                    Nama Resmi Unit
                                </Label.Root>
                                <div className="group relative">
                                    <Building2 className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    <input
                                        id="nama"
                                        value={data.nama_perpus}
                                        onChange={(e) =>
                                            setData(
                                                'nama_perpus',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-input bg-muted/20 px-11 py-3 text-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white"
                                        placeholder="Nama Unit"
                                    />
                                </div>
                                {errors.nama_perpus && (
                                    <p className="text-[9px] font-bold tracking-tighter text-destructive uppercase">
                                        {errors.nama_perpus}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Kontak */}
                                <div className="grid gap-2">
                                    <Label.Root
                                        className="ml-1 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                        htmlFor="kontak"
                                    >
                                        Kontak / WhatsApp
                                    </Label.Root>
                                    <div className="group relative">
                                        <Phone className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                        <input
                                            id="kontak"
                                            value={data.kontak}
                                            onChange={(e) =>
                                                setData(
                                                    'kontak',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-input bg-muted/20 px-11 py-3 text-sm transition-all outline-none focus:border-primary dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Alamat */}
                                <div className="grid gap-2">
                                    <Label.Root
                                        className="ml-1 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                        htmlFor="alamat"
                                    >
                                        Lokasi Fisik
                                    </Label.Root>
                                    <div className="group relative">
                                        <MapPin className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                        <input
                                            id="alamat"
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    'alamat',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-input bg-muted/20 px-11 py-3 text-sm transition-all outline-none focus:border-primary dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="grid gap-2">
                                <Label.Root
                                    className="ml-1 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                    htmlFor="deskripsi"
                                >
                                    Profil & Deskripsi
                                </Label.Root>
                                <div className="group relative">
                                    <Info className="absolute top-4 left-4 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    <textarea
                                        id="deskripsi"
                                        rows={5}
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData('deskripsi', e.target.value)
                                        }
                                        className="w-full resize-none rounded-xl border border-input bg-muted/20 px-11 py-4 text-sm leading-relaxed transition-all outline-none focus:border-primary dark:text-white"
                                        placeholder="Visi, misi, atau deskripsi singkat..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Aksi */}
                    <div className="space-y-4 lg:col-span-4">
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h3 className="mb-4 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                Kontrol Panel
                            </h3>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-[10px] font-black tracking-[0.2em] text-primary-foreground uppercase shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </button>
                        </div>

                        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
                            <div className="flex gap-3">
                                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <p className="text-[9px] leading-relaxed font-bold tracking-tight text-muted-foreground uppercase">
                                    Data ini akan tampil di{' '}
                                    <span className="text-primary underline">
                                        Halaman Utama Publik
                                    </span>
                                    . Pastikan alamat dan nomor kontak valid.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

EditProfile.layout = (page: React.ReactNode) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Profil Unit', href: '#' },
    ],
    children: page,
});

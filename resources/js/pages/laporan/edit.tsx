import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    FileText,
    Save,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Clock,
    Calendar,
    CheckCircle2,
    Loader2,
} from 'lucide-react';
import * as Label from '@radix-ui/react-label';
import { Kegiatan, Laporan } from '@/types/library';

interface LaporanEditorProps {
    kegiatan: Kegiatan;
    laporan?: Laporan | null;
}

export default function LaporanEditor({
    kegiatan,
    laporan,
}: LaporanEditorProps) {
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const { data, setData, post, put, processing, errors } = useForm({
        kegiatan_id: kegiatan.id,
        isi_laporan: laporan?.isi_laporan ?? '',
        status: laporan?.status ?? 'Draft',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const options = {
            onSuccess: () => {
                setMessage({
                    type: 'success',
                    text: 'Laporan berhasil disimpan.',
                });
                setTimeout(() => setMessage(null), 4000);
            },
            onError: () => {
                setMessage({
                    type: 'error',
                    text: 'Gagal menyimpan. Periksa kembali.',
                });
            },
        };

        if (laporan?.id) {
            put(`/laporan/${laporan.id}`, options);
        } else {
            post('/laporan', options);
        }
    };

    return (
        <>
            <Head title={`${laporan ? 'Sunting' : 'Tulis'} Laporan`} />

            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 p-4 text-foreground transition-all md:p-8">
                {/* Header Area - Lebih Ramping */}
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="group flex w-fit items-center gap-2 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                        Kembali
                    </button>

                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl leading-none font-[1000] tracking-tighter uppercase md:text-3xl dark:text-white">
                            {laporan ? 'Sunting Laporan' : 'Penyusunan Laporan'}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-tight text-muted-foreground uppercase">
                            <span className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1 text-primary">
                                <Calendar className="h-3 w-3" />
                                {new Date(
                                    kegiatan.tanggal_kegiatan,
                                ).toLocaleDateString('id-ID', {
                                    dateStyle: 'medium',
                                })}
                            </span>
                            <span className="hidden text-border md:block">
                                •
                            </span>
                            <span className="italic dark:text-slate-400">
                                {kegiatan.nama_kegiatan}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Banner Notifikasi Floating */}
                {message && (
                    <div
                        className={`flex animate-in items-center gap-3 rounded-xl border p-3 shadow-lg fade-in slide-in-from-top-2 ${
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
                        <span className="text-[9px] font-black tracking-widest uppercase">
                            {message.text}
                        </span>
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="grid flex-1 gap-5 lg:grid-cols-12"
                >
                    {/* Main Editor (Kiri) */}
                    <div className="flex min-h-[400px] flex-col lg:col-span-8">
                        <div
                            className={`flex flex-1 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all ${
                                errors.isi_laporan
                                    ? 'border-destructive ring-1 ring-destructive/20'
                                    : 'border-border'
                            }`}
                        >
                            <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
                                <Label.Root
                                    className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                    htmlFor="isi"
                                >
                                    Konten Utama
                                </Label.Root>
                                <FileText className="h-3.5 w-3.5 text-muted-foreground/50" />
                            </div>

                            <textarea
                                id="isi"
                                value={data.isi_laporan}
                                onChange={(e) =>
                                    setData('isi_laporan', e.target.value)
                                }
                                className="w-full flex-1 resize-none bg-transparent p-5 text-sm leading-relaxed focus:outline-none md:p-6 dark:text-slate-200"
                                placeholder="Tuliskan jalannya kegiatan..."
                            />
                        </div>
                        {errors.isi_laporan && (
                            <p className="mt-2 ml-2 text-[9px] font-bold tracking-widest text-destructive uppercase">
                                {errors.isi_laporan}
                            </p>
                        )}
                    </div>

                    {/* Sidebar (Kanan) */}
                    <div className="flex flex-col gap-4 lg:col-span-4">
                        {/* Status Selection */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                            <h3 className="mb-3 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                Status Publikasi
                            </h3>
                            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                                {(['Draft', 'Selesai'] as const).map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setData('status', s)}
                                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-[10px] font-black tracking-widest uppercase transition-all active:scale-[0.97] ${
                                            data.status === s
                                                ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                                                : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/50'
                                        }`}
                                    >
                                        {s === 'Draft' ? (
                                            <Clock className="h-3.5 w-3.5" />
                                        ) : (
                                            <CheckCircle className="h-3.5 w-3.5" />
                                        )}
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Warnings */}
                        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                            <div className="flex gap-3 text-amber-600 dark:text-amber-400">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                <p className="text-[9px] leading-tight font-bold tracking-tight uppercase">
                                    Status{' '}
                                    <span className="underline">Selesai</span>{' '}
                                    akan menampilkan laporan di portal publik.
                                </p>
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="mt-auto p-2 md:mt-0 lg:p-0">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-[10px] font-black tracking-[0.2em] text-primary-foreground uppercase shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                {processing ? 'Menyimpan...' : 'Simpan Laporan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

LaporanEditor.layout = (page: React.ReactNode) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Laporan', href: '#' },
    ],
    children: page,
});

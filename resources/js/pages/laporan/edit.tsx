import { Head, useForm } from '@inertiajs/react';
import {
    FileText,
    Save,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Clock,
    Calendar,
} from 'lucide-react';
import * as Label from '@radix-ui/react-label';
import { Kegiatan, Laporan } from '@/types/library';

export default function LaporanEditor({
    kegiatan,
    laporan,
}: {
    kegiatan: Kegiatan;
    laporan: Laporan;
}) {
    const { data, setData, processing } = useForm({
        kegiatan_id: kegiatan.id,
        isi_laporan: laporan?.isi_laporan ?? '',
        status: laporan?.status ?? 'Draft',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Jika laporan sudah ada (mode edit), gunakan PUT. Jika belum, gunakan POST.
        // if (laporan?.id) {
        //     put('/');
        // } else {
        //     post('/');
        // }
    };

    return (
        <>
            <Head title={`Laporan - ${kegiatan.nama_kegiatan}`} />

            <div className="flex h-full w-full flex-col gap-8 p-6 transition-colors duration-300">
                {/* Header Area */}
                <div className="flex flex-col gap-2 border-b border-border pb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="group flex w-fit items-center gap-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                        Kembali ke Agenda
                    </button>

                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="space-y-1">
                            <h1 className="text-4xl font-[900] tracking-tighter text-foreground">
                                {laporan
                                    ? 'Sunting Laporan'
                                    : 'Penyusunan Laporan'}
                            </h1>
                            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                <span className="flex items-center gap-1.5 rounded bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {new Date(
                                        kegiatan.tanggal_kegiatan,
                                    ).toLocaleDateString('id-ID', {
                                        dateStyle: 'long',
                                    })}
                                </span>
                                <span className="text-border">|</span>
                                <span className="font-semibold text-foreground italic">
                                    {kegiatan.nama_kegiatan}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="grid flex-1 gap-8 lg:grid-cols-12"
                >
                    {/* Kolom Editor (Kiri) */}
                    <div className="flex h-full flex-col lg:col-span-8">
                        <div className="flex flex-1 flex-col rounded-xl border border-border bg-card shadow-sm">
                            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                                <Label.Root
                                    className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase"
                                    htmlFor="isi"
                                >
                                    Konten Dokumentasi Utama
                                </Label.Root>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>

                            <textarea
                                id="isi"
                                value={data.isi_laporan}
                                onChange={(e) =>
                                    setData('isi_laporan', e.target.value)
                                }
                                className="w-full flex-1 resize-none bg-transparent p-8 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                                placeholder="Tuliskan jalannya kegiatan secara mendalam di sini..."
                            />
                        </div>
                    </div>

                    {/* Kolom Sidebar (Kanan) */}
                    <div className="flex flex-col gap-6 lg:col-span-4">
                        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                            <h3 className="mb-4 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                Pengaturan Status
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {(['Draft', 'Selesai'] as const).map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setData('status', s)}
                                        className={`flex items-center justify-between rounded-lg border px-5 py-4 text-xs font-bold transition-all active:scale-[0.98] ${
                                            data.status === s
                                                ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                                                : 'border-border bg-background text-muted-foreground hover:bg-secondary'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {s === 'Draft' ? (
                                                <Clock className="h-4 w-4" />
                                            ) : (
                                                <CheckCircle className="h-4 w-4" />
                                            )}
                                            {s}
                                        </div>
                                        {data.status === s && (
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                            <div className="flex gap-3 text-destructive">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <p className="text-[10px] leading-tight font-bold tracking-tight uppercase">
                                    Status{' '}
                                    <span className="text-foreground underline">
                                        Selesai
                                    </span>{' '}
                                    akan mempublikasikan laporan ke publik.
                                </p>
                            </div>
                        </div>

                        <div className="mt-auto rounded-xl border border-border bg-secondary/50 p-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary py-5 text-[11px] font-black tracking-[0.25em] text-primary-foreground uppercase shadow-xl shadow-primary/20 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? 'Memproses...' : 'Simpan Laporan'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

LaporanEditor.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Penyusunan Laporan', href: '#' },
    ],
};

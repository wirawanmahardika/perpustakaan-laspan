import { Head, useForm } from '@inertiajs/react';
import {
    BarChart3,
    TrendingUp,
    Users,
    BookOpen,
    Save,
    FileText,
    Smartphone,
} from 'lucide-react';

export default function StatsIndex({ stats }: { stats: any[] }) {
    // 1. Inisialisasi data sesuai skema database yang diperbarui
    const { data, setData, post, processing } = useForm({
        tahun: new Date().getFullYear(),
        jumlah_koleksi: 0,
        penambahan_koleksi: 0,
        jumlah_anggota: 0,
        jumlah_pengunjung: 0,
        jumlah_peminjaman: 0,
        buku_dibaca: 0,
        koleksi_fiksi: 0, //
        koleksi_nonfiksi: 0, //
        koleksi_digital: 0, // [cite: 52]
        analisis_minat_baca: '', //
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/stats');
    };

    return (
        <>
            <Head title="Statistik Tahunan Perpustakaan" />
            <div className="space-y-8 p-8">
                <div>
                    <h1 className="text-2xl font-[1000] tracking-tighter uppercase">
                        Statistik Perkembangan
                    </h1>
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        Data Pertumbuhan Perpustakaan 3 Tahun Terakhir [cite:
                        53, 55, 59]
                    </p>
                </div>

                {/* Grid Ringkasan dengan Indikator Keberagaman */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {stats.slice(0, 3).map((stat) => (
                        <div
                            key={stat.id}
                            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-lg font-black">
                                    {stat.tahun}
                                </span>
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <StatRow
                                    label="Total Koleksi"
                                    value={stat.jumlah_koleksi}
                                    icon={<BookOpen className="h-3 w-3" />}
                                />
                                <div className="ml-4 space-y-1 border-l border-muted pl-2 opacity-70">
                                    <StatRow
                                        label="Fiksi"
                                        value={stat.koleksi_fiksi}
                                    />
                                    <StatRow
                                        label="Non-Fiksi"
                                        value={stat.koleksi_nonfiksi}
                                    />
                                    <StatRow
                                        label="Digital"
                                        value={stat.koleksi_digital}
                                    />
                                </div>
                                <StatRow
                                    label="Anggota Baru"
                                    value={stat.jumlah_anggota}
                                    icon={<Users className="h-3 w-3" />}
                                />
                                <StatRow
                                    label="Peminjaman"
                                    value={stat.jumlah_peminjaman}
                                    icon={<BarChart3 className="h-3 w-3" />}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Input Terintegrasi Instrumen Penilaian */}
                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-3xl border border-border bg-card p-8"
                >
                    <h2 className="border-l-4 border-primary pl-3 text-sm font-black uppercase italic">
                        Input Data Instrumen Penilaian [cite: 47]
                    </h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Kolom Kiri: Anggota & Kunjungan */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-primary uppercase">
                                Data Pemanfaatan & Anggota [cite: 59, 88]
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Tahun"
                                    type="number"
                                    value={data.tahun}
                                    onChange={(v: any) => setData('tahun', v)}
                                />
                                <FormInput
                                    label="Peningkatan Anggota"
                                    type="number"
                                    value={data.jumlah_anggota}
                                    onChange={(v: any) =>
                                        setData('jumlah_anggota', v)
                                    }
                                />
                                <FormInput
                                    label="Jml Pengunjung"
                                    type="number"
                                    value={data.jumlah_pengunjung}
                                    onChange={(v: any) =>
                                        setData('jumlah_pengunjung', v)
                                    }
                                />
                                <FormInput
                                    label="Jml Peminjaman"
                                    type="number"
                                    value={data.jumlah_peminjaman}
                                    onChange={(v: any) =>
                                        setData('jumlah_peminjaman', v)
                                    }
                                />
                                <FormInput
                                    label="Buku Dibaca"
                                    type="number"
                                    value={data.buku_dibaca}
                                    onChange={(v: any) =>
                                        setData('buku_dibaca', v)
                                    }
                                />
                            </div>
                        </div>

                        {/* Kolom Kanan: Detail Koleksi */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-primary uppercase">
                                Detail Keberagaman Koleksi [cite: 51, 52]
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    label="Total Judul"
                                    type="number"
                                    value={data.jumlah_koleksi}
                                    onChange={(v: any) =>
                                        setData('jumlah_koleksi', v)
                                    }
                                />
                                <FormInput
                                    label="Tambah/Tahun"
                                    type="number"
                                    value={data.penambahan_koleksi}
                                    onChange={(v: any) =>
                                        setData('penambahan_koleksi', v)
                                    }
                                />
                                <FormInput
                                    label="Koleksi Fiksi"
                                    type="number"
                                    value={data.koleksi_fiksi}
                                    onChange={(v: any) =>
                                        setData('koleksi_fiksi', v)
                                    }
                                />
                                <FormInput
                                    label="Koleksi Non-Fiksi"
                                    type="number"
                                    value={data.koleksi_nonfiksi}
                                    onChange={(v: any) =>
                                        setData('koleksi_nonfiksi', v)
                                    }
                                />
                                <div className="col-span-2">
                                    <FormInput
                                        label="Koleksi Digital (E-Book/Lainnya)"
                                        type="number"
                                        value={data.koleksi_digital}
                                        onChange={(v: any) =>
                                            setData('koleksi_digital', v)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analisis Kualitatif */}
                    <div className="space-y-2 border-t border-dashed pt-4">
                        <label className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase">
                            <FileText className="h-3 w-3" /> Analisis Buku yang
                            Diminati (Kualitatif)
                        </label>
                        <textarea
                            value={data.analisis_minat_baca}
                            onChange={(e) =>
                                setData('analisis_minat_baca', e.target.value)
                            }
                            className="min-h-25 w-full rounded-xl border-input bg-muted/30 p-4 text-xs focus:ring-primary"
                            placeholder="Sebutkan kategori buku yang paling sering dipinjam dan alasannya berdasarkan data statistik..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-[11px] font-black text-primary-foreground uppercase transition-all hover:opacity-90 md:w-auto"
                        >
                            <Save className="h-4 w-4" /> Simpan Data Statistik{' '}
                            {data.tahun}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

// Komponen Helper tetap sama dengan penyesuaian gaya sedikit
function StatRow({ label, value, icon }: any) {
    return (
        <div className="flex items-center justify-between py-0.5 text-[10px] font-bold uppercase">
            <span className="flex items-center gap-2 text-muted-foreground">
                {icon && icon} {label}
            </span>
            <span className="font-black text-foreground">
                {value.toLocaleString()}
            </span>
        </div>
    );
}

function FormInput({ label, type, value, onChange }: any) {
    return (
        <div className="space-y-1.5">
            <label className="text-[9px] font-black tracking-wider text-muted-foreground uppercase">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border-border bg-background px-4 py-2.5 text-xs font-bold transition-all outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
        </div>
    );
}

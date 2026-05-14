import { Head, useForm } from '@inertiajs/react';
import { BarChart3, TrendingUp, Users, BookOpen, Save } from 'lucide-react';

export default function StatsIndex({ stats }: { stats: any[] }) {
    const { data, setData, post, processing } = useForm({
        tahun: new Date().getFullYear(),
        jumlah_koleksi: 0,
        penambahan_koleksi: 0,
        jumlah_anggota: 0,
        jumlah_pengunjung: 0,
        jumlah_peminjaman: 0,
        buku_dibaca: 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/stats', {
            onError: (err: any) => {
                console.log(err);
            },
        });
    };

    return (
        <>
            <Head title="Statistik Tahunan" />
            <div className="space-y-8 p-8">
                <div>
                    <h1 className="text-2xl font-[1000] tracking-tighter uppercase">
                        Statistik Perkembangan
                    </h1>
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        Data Pertumbuhan Perpustakaan 3 Tahun Terakhir
                    </p>
                </div>

                {/* Grid Ringkasan (Opsional - Bisa dikembangkan dengan Chart) */}
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
                                <StatRow
                                    label="Anggota"
                                    value={stat.jumlah_anggota}
                                    icon={<Users className="h-3 w-3" />}
                                />
                                <StatRow
                                    label="Pengunjung"
                                    value={stat.jumlah_pengunjung}
                                    icon={<BarChart3 className="h-3 w-3" />}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Input/Edit */}
                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-3xl border border-border bg-card p-8"
                >
                    <h2 className="border-l-4 border-primary pl-3 text-sm font-black uppercase italic">
                        Update Data Tahunan
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        <FormInput
                            label="Tahun"
                            type="number"
                            value={data.tahun}
                            onChange={(v: any) => setData('tahun', v)}
                        />
                        <FormInput
                            label="Total Judul Koleksi"
                            type="number"
                            value={data.jumlah_koleksi}
                            onChange={(v: any) => setData('jumlah_koleksi', v)}
                        />
                        <FormInput
                            label="Penambahan Koleksi"
                            type="number"
                            value={data.penambahan_koleksi}
                            onChange={(v: any) =>
                                setData('penambahan_koleksi', v)
                            }
                        />
                        <FormInput
                            label="Jumlah Anggota"
                            type="number"
                            value={data.jumlah_anggota}
                            onChange={(v: any) => setData('jumlah_anggota', v)}
                        />
                        <FormInput
                            label="Jumlah Pengunjung"
                            type="number"
                            value={data.jumlah_pengunjung}
                            onChange={(v: any) =>
                                setData('jumlah_pengunjung', v)
                            }
                        />
                        <FormInput
                            label="Jumlah Peminjaman"
                            type="number"
                            value={data.jumlah_peminjaman}
                            onChange={(v: any) =>
                                setData('jumlah_peminjaman', v)
                            }
                        />
                        <FormInput
                            label="Buku Dibaca di Tempat"
                            type="number"
                            value={data.buku_dibaca}
                            onChange={(v: any) => setData('buku_dibaca', v)}
                        />

                        <div className="flex items-end">
                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[10px] font-black text-primary-foreground uppercase">
                                <Save className="h-4 w-4" /> Simpan Statistik
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

function StatRow({ label, value, icon }: any) {
    return (
        <div className="flex items-center justify-between text-[10px] font-bold uppercase">
            <span className="flex items-center gap-2 text-muted-foreground">
                {icon} {label}
            </span>
            <span>{value.toLocaleString()}</span>
        </div>
    );
}

function FormInput({ label, type, value, onChange }: any) {
    return (
        <div className="space-y-1">
            <label className="text-[9px] font-black text-muted-foreground uppercase">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border-input bg-muted/30 px-3 py-2 text-xs"
            />
        </div>
    );
}

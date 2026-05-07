import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    ListChecks,
} from 'lucide-react';

interface Activity {
    id: number;
    nama_kegiatan: string;
    tanggal_kegiatan: string;
    laporan?: {
        status: 'Draft' | 'Selesai';
    };
}

interface DashboardProps {
    stats: {
        total_kegiatan: number;
        laporan_selesai: number;
        laporan_draft: number;
    };
    activities: Activity[];
}

export default function Dashboard({ stats, activities }: DashboardProps) {
    // Memetakan data statistik ke array untuk iterasi UI
    const statCards = [
        {
            label: 'Total Kegiatan',
            value: stats.total_kegiatan,
            icon: Calendar,
        },
        {
            label: 'Laporan Selesai',
            value: stats.laporan_selesai,
            icon: CheckCircle2,
        },
        { label: 'Laporan Draft', value: stats.laporan_draft, icon: Clock },
    ];

    return (
        <>
            <Head title="Dashboard Petugas" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 transition-colors duration-300">
                {/* Section 1: Statistik Dinamis */}
                <div className="grid gap-6 md:grid-cols-3">
                    {statCards.map((stat, i) => (
                        <div
                            key={i}
                            className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-black text-foreground">
                                    {String(stat.value).padStart(2, '0')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section 2: Ringkasan Aktivitas Terkini (Data Asli) */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between border-b border-border bg-card p-6">
                        <div>
                            <h2 className="flex items-center gap-2 text-xl font-black tracking-tight text-foreground">
                                <ListChecks className="h-5 w-5 text-primary" />
                                Aktivitas Terkini
                            </h2>
                            <p className="text-xs font-medium text-muted-foreground">
                                Ringkasan 5 kegiatan terbaru yang diperbarui.
                            </p>
                        </div>

                        <Link
                            href="/kegiatan" // Pastikan route ini sesuai dengan route CRUD Anda
                            className="group flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-[10px] font-black tracking-widest text-secondary-foreground uppercase transition-all hover:bg-primary hover:text-primary-foreground"
                        >
                            Kelola Semua
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30">
                                    <th className="border-b border-border p-4 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Nama Kegiatan
                                    </th>
                                    <th className="border-b border-border p-4 text-right text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Status Laporan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {activities.length > 0 ? (
                                    activities.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="group transition-colors hover:bg-muted/20"
                                        >
                                            <td className="p-4">
                                                <div className="text-sm font-bold text-foreground">
                                                    {item.nama_kegiatan}
                                                </div>
                                                <div className="text-[10px] font-medium tracking-tighter text-muted-foreground uppercase">
                                                    Dilaksanakan pada{' '}
                                                    {new Date(
                                                        item.tanggal_kegiatan,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        { dateStyle: 'long' },
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black tracking-tighter uppercase ${
                                                        item.laporan?.status ===
                                                        'Selesai'
                                                            ? 'border border-primary/20 bg-primary/10 text-primary'
                                                            : 'border border-border bg-muted text-muted-foreground'
                                                    }`}
                                                >
                                                    {item.laporan?.status ??
                                                        'Belum Dibuat'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="p-12 text-center text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Belum ada data kegiatan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-border bg-muted/10 p-4 text-center">
                        <p className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                            Data sinkron dengan database pusat
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }],
};

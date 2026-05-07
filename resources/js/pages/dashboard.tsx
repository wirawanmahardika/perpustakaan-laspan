import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    ListChecks,
    ChevronRight,
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
    const statCards = [
        {
            label: 'Total',
            value: stats.total_kegiatan,
            icon: Calendar,
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
        },
        {
            label: 'Selesai',
            value: stats.laporan_selesai,
            icon: CheckCircle2,
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        },
        {
            label: 'Draft',
            value: stats.laporan_draft,
            icon: Clock,
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-500/10',
        },
    ];

    return (
        <>
            <Head title="Dashboard Petugas" />

            <div className="flex min-h-full flex-col gap-6 bg-transparent p-4 text-foreground md:p-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-[1000] tracking-tighter uppercase dark:text-white">
                            Dashboard
                        </h1>
                        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                            Monitoring Petugas
                        </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card shadow-sm md:hidden">
                        <ListChecks className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>

                {/* Section 1: Statistik Adaptive Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {statCards.map((stat, i) => (
                        <div
                            key={i}
                            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 active:scale-[0.98]"
                        >
                            <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                            >
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-black tracking-tighter dark:text-white">
                                    {String(stat.value).padStart(2, '0')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section 2: Aktivitas Terkini - Mobile Friendly Card */}
                <div className="flex flex-col overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between border-b border-border bg-muted/20 p-5 md:p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                <ListChecks className="h-5 w-5" />
                            </div>
                            <h2 className="text-sm font-black tracking-tight uppercase dark:text-slate-200">
                                Aktivitas Terbaru
                            </h2>
                        </div>

                        <Link
                            href="/kegiatan"
                            className="group flex items-center gap-1.5 text-[10px] font-black tracking-widest text-primary uppercase transition-colors hover:text-primary/80"
                        >
                            Lihat Semua
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    {/* List Items */}
                    <div className="divide-y divide-border">
                        {activities.length > 0 ? (
                            activities.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex items-center justify-between p-5 transition-colors hover:bg-muted/50 active:bg-muted"
                                >
                                    <div className="min-w-0 flex-1 pr-4">
                                        <div className="mb-1 truncate text-sm font-bold dark:text-slate-200">
                                            {item.nama_kegiatan}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight text-muted-foreground uppercase">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(
                                                item.tanggal_kegiatan,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`rounded-full border px-2.5 py-1 text-[8px] font-black tracking-tighter whitespace-nowrap uppercase ${
                                                item.laporan?.status ===
                                                'Selesai'
                                                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'border-border bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {item.laporan?.status ?? 'N/A'}
                                        </span>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground/30 md:hidden" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-16 text-center">
                                <div className="text-[10px] font-black tracking-widest text-muted-foreground uppercase italic">
                                    Belum ada data aktivitas
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="bg-muted/30 p-4 text-center">
                        <p className="text-[8px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                            Database Sincronized • Real-time Monitoring
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => ({
    breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }],
    children: page,
});

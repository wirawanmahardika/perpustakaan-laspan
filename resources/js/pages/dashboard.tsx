import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    FileText,
    BookOpen,
    ArrowUpRight,
    ListChecks,
    ChevronRight,
    AlertTriangle,
    CheckCircle,
} from 'lucide-react';

interface Activity {
    id: number;
    nama_kegiatan: string;
    tanggal: string; // Sesuai tabel activity_logs
    tipe: string;
}

interface DashboardProps {
    stats: {
        total_kegiatan: number;
        total_dokumen: number;
        total_koleksi: number;
    };
    activities: Activity[];
    profile_status: boolean;
}

export default function Dashboard({
    stats,
    activities,
    profile_status,
}: DashboardProps) {
    const statCards = [
        {
            label: 'Total Kegiatan',
            value: stats.total_kegiatan,
            icon: Calendar,
            color: 'text-blue-600',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
        },
        {
            label: 'Bukti Fisik (Dokumen)',
            value: stats.total_dokumen,
            icon: FileText,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        },
        {
            label: 'Koleksi Saat Ini',
            value: stats.total_koleksi,
            icon: BookOpen,
            color: 'text-purple-600',
            bg: 'bg-purple-50 dark:bg-purple-500/10',
        },
    ];

    return (
        <>
            <Head title="Dashboard Akreditasi" />

            <div className="flex flex-col gap-6 p-4 md:p-8">
                {/* Header & Profil Alert */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-[1000] tracking-tighter uppercase">
                            Overview
                        </h1>
                        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                            Monitoring Persiapan Akreditasi 2025
                        </p>
                    </div>

                    {!profile_status && (
                        <Link
                            href="/admin/profile"
                            className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2 text-destructive transition-colors hover:bg-destructive/10"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase">
                                Lengkapi Identitas Perpus!
                            </span>
                        </Link>
                    )}
                </div>

                {/* Section 1: Statistik Utama */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {statCards.map((stat, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/50"
                        >
                            <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                            >
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-black tracking-tighter italic">
                                    {stat.value.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section 2: Aktivitas & Dokumen Terakhir */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="flex flex-col overflow-hidden rounded-[24px] border border-border bg-card shadow-sm lg:col-span-8">
                        <div className="flex items-center justify-between border-b border-border bg-muted/20 p-5">
                            <div className="flex items-center gap-3">
                                <ListChecks className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black tracking-tight uppercase">
                                    Log Kegiatan Terbaru
                                </h2>
                            </div>
                            <Link
                                href="/kegiatan"
                                className="group flex items-center gap-1 text-[10px] font-black text-primary uppercase"
                            >
                                Semua <ArrowUpRight className="h-3 w-3" />
                            </Link>
                        </div>

                        <div className="divide-y divide-border">
                            {activities.length > 0 ? (
                                activities.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group flex items-center justify-between p-5 hover:bg-muted/30"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate text-sm font-bold uppercase">
                                                {item.nama_kegiatan}
                                            </div>
                                            <div className="flex items-center gap-3 text-[9px] font-bold text-muted-foreground uppercase">
                                                <span className="text-primary">
                                                    {item.tipe}
                                                </span>
                                                <span>•</span>
                                                <span>{item.tanggal}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground/30" />
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-[10px] font-bold text-muted-foreground uppercase">
                                    Belum ada kegiatan
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 3: Shortcut Akses (Sidebar) */}
                    <div className="space-y-4 lg:col-span-4">
                        <h3 className="ml-1 text-[10px] font-black text-muted-foreground uppercase">
                            Akses Cepat
                        </h3>
                        <ShortcutLink
                            href="/documents"
                            title="Pusat Dokumen"
                            sub="Kelola Bukti Fisik"
                            icon={<FileText />}
                            color="bg-emerald-500"
                        />
                        <ShortcutLink
                            href="/stats"
                            title="Statistik Koleksi"
                            sub="Rekap Tahunan"
                            icon={<BookOpen />}
                            color="bg-purple-500"
                        />
                        <ShortcutLink
                            href="/admin/profile"
                            title="Profil Unit"
                            sub="Identitas Perpus"
                            icon={<CheckCircle />}
                            color="bg-blue-500"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function ShortcutLink({ href, title, sub, icon, color }: any) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:bg-muted/50"
        >
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${color} shadow-lg shadow-current/20`}
            >
                {icon}
            </div>
            <div>
                <h4 className="text-[11px] font-black tracking-tight uppercase">
                    {title}
                </h4>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">
                    {sub}
                </p>
            </div>
            <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
        </Link>
    );
}

Dashboard.layout = (page: React.ReactNode) => ({
    breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }],
    children: page,
});

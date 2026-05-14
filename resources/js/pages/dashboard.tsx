import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    FileText,
    BookOpen,
    ArrowUpRight,
    ListChecks,
    ChevronRight,
    AlertTriangle,
    Users,
    TrendingUp,
    Library,
} from 'lucide-react';

interface Activity {
    id: number;
    nama_kegiatan: string;
    tanggal: string;
    tipe: string;
}

interface DashboardProps {
    stats: {
        total_kegiatan: number;
        total_dokumen: number;
        total_koleksi: number;
        total_pengunjung: number; // Dari yearly_stats terbaru
        total_anggota: number; // Dari yearly_stats terbaru
        koleksi_digital: number; // Dari yearly_stats terbaru
    };
    activities: Activity[];
    profile_status: boolean;
}

export default function Dashboard({
    stats,
    activities,
    profile_status,
}: DashboardProps) {
    // Statistik Utama yang disesuaikan dengan yearly_stats dan activity_logs
    const mainStats = [
        {
            label: 'Total Koleksi',
            value: stats.total_koleksi,
            icon: Library,
            color: 'text-purple-600',
            bg: 'bg-purple-50 dark:bg-purple-500/10',
        },
        {
            label: 'Jumlah Pengunjung',
            value: stats.total_pengunjung,
            icon: Users,
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
    ];

    return (
        <>
            <Head title="Dashboard Akreditasi" />

            <div className="flex flex-col gap-6 p-4 md:p-8">
                {/* Header & Profil Alert */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-[1000] tracking-tighter uppercase">
                            Overview Akreditasi
                        </h1>
                        <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                            Statistik & Log Instrumen Penilaian 2025
                        </p>
                    </div>

                    {!profile_status && (
                        <Link
                            href="/profile"
                            className="flex animate-pulse items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2 text-destructive transition-colors hover:bg-destructive/10"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase">
                                Identitas Belum Lengkap!
                            </span>
                        </Link>
                    )}
                </div>

                {/* Section 1: Main Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {mainStats.map((stat, i) => (
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
                                <p className="text-2xl font-black tracking-tighter">
                                    {stat.value.toLocaleString('id-ID')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section 2: Secondary Stats & Activities */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Log Kegiatan (activity_logs) */}
                    <div className="flex flex-col overflow-hidden rounded-[24px] border border-border bg-card shadow-sm lg:col-span-8">
                        <div className="flex items-center justify-between border-b border-border bg-muted/20 p-5">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                <h2 className="text-sm font-black tracking-tight uppercase">
                                    Aktivitas Terkini
                                </h2>
                            </div>
                            <Link
                                href="/kegiatan"
                                className="group flex items-center gap-1 text-[10px] font-black text-primary uppercase"
                            >
                                Lihat Semua <ArrowUpRight className="h-3 w-3" />
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
                                            <div className="truncate text-sm font-bold tracking-tight text-card-foreground uppercase">
                                                {item.nama_kegiatan}
                                            </div>
                                            <div className="mt-1 flex items-center gap-3 text-[9px] font-bold text-muted-foreground uppercase">
                                                <span
                                                    className={`rounded bg-primary/10 px-2 py-0.5 text-primary`}
                                                >
                                                    {item.tipe}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-2.5 w-2.5" />{' '}
                                                    {item.tanggal}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-1" />
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-[10px] font-bold text-muted-foreground uppercase">
                                    Belum ada log kegiatan yang tercatat
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 3: Summary Bukti Fisik (documents) */}
                    <div className="space-y-6 lg:col-span-4">
                        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                            <h3 className="mb-4 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                Status Bukti Fisik
                            </h3>
                            <div className="space-y-3">
                                <ProgressItem
                                    label="Koleksi"
                                    count={stats.total_dokumen}
                                />
                                <ProgressItem label="Sarpras" count={0} />
                                <ProgressItem
                                    label="Layanan"
                                    count={stats.total_kegiatan}
                                />
                                <ProgressItem label="Tenaga" count={0} />
                            </div>
                            <Link
                                href="/documents"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-muted py-3 text-[10px] font-black uppercase transition-all hover:bg-primary hover:text-white"
                            >
                                <FileText className="h-3 w-3" /> Lengkapi
                                Dokumen
                            </Link>
                        </div>

                        {/* Quick Shortcuts */}
                        <div className="grid grid-cols-1 gap-3">
                            <ShortcutLink
                                href="/stats"
                                title="Data Koleksi"
                                sub="Yearly Stats"
                                icon={<BookOpen className="h-4 w-4" />}
                                color="bg-purple-500"
                            />
                            <ShortcutLink
                                href="/users"
                                title="Tenaga Perpus"
                                sub="Manajemen SDM"
                                icon={<Users className="h-4 w-4" />}
                                color="bg-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Sub-komponen untuk visualisasi progress per kategori dokumen
function ProgressItem({ label, count }: { label: string; count: number }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-black uppercase">
                <span className="text-muted-foreground">{label}</span>
                <span>{count} File</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}
                />
            </div>
        </div>
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

import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Search, ArrowRight } from 'lucide-react';

interface Props {
    activities: {
        data: any[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
        type?: string;
    };
}

const Index: React.FC<Props> = ({ activities, filters }) => {
    // Fungsi Handle Pencarian & Filter
    const handleFilter = (key: string, value: string) => {
        router.get(
            '/aktivitas',
            { ...filters, [key]: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans text-slate-900">
            <Head title="Arsip Lengkap Kegiatan" />

            {/* Header Mini */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase transition-colors hover:text-blue-600"
                    >
                        <ArrowLeft size={14} /> Kembali ke Beranda
                    </Link>
                    <span className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase">
                        Archive Mode
                    </span>
                </div>
            </nav>

            <header className="border-b border-slate-200 bg-white px-6 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-8 text-5xl leading-none font-[1000] tracking-tighter uppercase italic md:text-8xl">
                        Daftar <br />{' '}
                        <span className="text-blue-600">Aktivitas.</span>
                    </h1>

                    {/* Filter Bar */}
                    <div className="mt-12 flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search
                                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Cari nama kegiatan atau deskripsi..."
                                defaultValue={filters.search}
                                onChange={(e) =>
                                    handleFilter('search', e.target.value)
                                }
                                className="w-full rounded-2xl border-2 border-slate-100 py-4 pr-6 pl-12 font-bold transition-all focus:border-blue-600 focus:ring-0"
                            />
                        </div>
                        <select
                            defaultValue={filters.type}
                            onChange={(e) =>
                                handleFilter('type', e.target.value)
                            }
                            className="rounded-2xl border-2 border-slate-100 px-8 py-4 text-[10px] font-black tracking-widest uppercase focus:border-blue-600"
                        >
                            <option value="">Semua Tipe</option>
                            <option value="pemberdayaan">Pemberdayaan</option>
                            <option value="promosi">Promosi</option>
                            <option value="kerjasama">Kerjasama</option>
                            <option value="layanan_khusus">
                                Layanan Khusus
                            </option>
                        </select>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-16">
                {/* Grid Kegiatan */}
                <div className="grid gap-6 md:grid-cols-3">
                    {activities.data.length > 0 ? (
                        activities.data.map((act) => {
                            const hasArticle =
                                act.artikel && act.artikel.trim() !== '';

                            return (
                                <Link
                                    key={act.id}
                                    // Jika tidak ada artikel, href dihilangkan (mencegah navigasi)
                                    href={
                                        hasArticle
                                            ? `/kegiatan/${act.id}/read/artikel`
                                            : '#'
                                    }
                                    // Cegah scroll ke atas jika klik '#'
                                    onClick={(e) =>
                                        !hasArticle && e.preventDefault()
                                    }
                                    className={`group relative flex flex-col rounded-[2.5rem] border p-10 transition-all ${
                                        hasArticle
                                            ? 'cursor-pointer border-slate-200 bg-white hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100'
                                            : 'cursor-not-allowed border-slate-100 bg-slate-50/50 opacity-60'
                                    }`}
                                >
                                    <div className="mb-6 flex items-center justify-between">
                                        <span
                                            className={`rounded-full px-4 py-1.5 text-[9px] font-black tracking-widest uppercase ${hasArticle ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-500'}`}
                                        >
                                            {act.tipe}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {act.tanggal}
                                        </span>
                                    </div>

                                    <h3
                                        className={`mb-5 text-2xl font-[1000] tracking-tight uppercase italic transition-colors ${hasArticle ? 'text-slate-950 group-hover:text-blue-600' : 'text-slate-400'}`}
                                    >
                                        {act.nama_kegiatan}
                                    </h3>

                                    <p className="mb-10 line-clamp-4 text-sm leading-relaxed font-medium text-slate-500 italic">
                                        "{act.deskripsi}"
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-8">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase">
                                                Pihak:{' '}
                                                {act.pihak_terlibat || 'Lokal'}
                                            </p>
                                            {!hasArticle && (
                                                <p className="mt-1 text-[8px] font-bold text-amber-500 uppercase">
                                                    [ Narasi Sedang Disusun ]
                                                </p>
                                            )}
                                        </div>

                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                                                hasArticle
                                                    ? 'bg-slate-950 text-white group-hover:scale-110 group-hover:bg-blue-600'
                                                    : 'bg-slate-200 text-slate-400'
                                            }`}
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-24 text-center">
                            <p className="text-2xl font-black tracking-tighter text-slate-300 uppercase italic">
                                Data Tidak Ditemukan
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination Berkelas */}
                <div className="mt-20 flex items-center justify-center gap-2">
                    {activities.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`flex h-12 w-12 items-center justify-center rounded-xl text-[10px] font-black transition-all ${link.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-400 hover:bg-slate-100'} ${!link.url ? 'cursor-not-allowed opacity-30' : ''} `}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Index;

import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Calendar,
    Plus,
    MapPin,
    MoreVertical,
    Trash2,
    Edit3,
    FilePlus,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Save,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Kegiatan } from '@/types/library';

interface Props {
    kegiatan: Kegiatan[];
}

export default function KegiatanIndex({ kegiatan }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        nama_kegiatan: '',
        tanggal_kegiatan: '',
        lokasi: '',
        deskripsi_kegiatan: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setNotification(null);

        post('/kegiatan', {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
                setNotification({
                    type: 'success',
                    text: 'Agenda berhasil ditambahkan!',
                });
                setTimeout(() => setNotification(null), 4000);
            },
            onError: () => {
                setNotification({
                    type: 'error',
                    text: 'Gagal menyimpan agenda. Cek kembali form.',
                });
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus agenda ini?')) {
            router.delete(`/kegiatan/${id}`, {
                onSuccess: () => {
                    setNotification({
                        type: 'success',
                        text: 'Agenda dihapus.',
                    });
                    setTimeout(() => setNotification(null), 3000);
                },
            });
        }
    };

    return (
        <>
            <Head title="Manajemen Kegiatan" />

            <div className="flex min-h-full flex-col gap-6 p-4 text-foreground transition-all md:p-8">
                {/* Banner Notifikasi Floating */}
                {notification && (
                    <div className="fixed top-20 right-4 left-4 z-[100] animate-in duration-300 slide-in-from-right-5 fade-in md:left-auto md:w-96">
                        <div
                            className={`flex items-center gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md ${
                                notification.type === 'success'
                                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                    : 'border-destructive/20 bg-destructive/10 text-destructive'
                            }`}
                        >
                            {notification.type === 'success' ? (
                                <CheckCircle2 className="h-5 w-5" />
                            ) : (
                                <AlertCircle className="h-5 w-5" />
                            )}
                            <span className="text-[10px] font-black tracking-widest uppercase">
                                {notification.text}
                            </span>
                        </div>
                    </div>
                )}

                {/* Header & Trigger Modal */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-[1000] tracking-tighter uppercase md:text-3xl dark:text-white">
                            Agenda Kegiatan
                        </h1>
                        <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            Manajemen Jadwal Perpustakaan
                        </p>
                    </div>

                    <Dialog.Root
                        open={isModalOpen}
                        onOpenChange={(val) => {
                            setIsModalOpen(val);
                            if (!val) reset();
                        }}
                    >
                        <Dialog.Trigger asChild>
                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-[10px] font-black tracking-[0.2em] text-primary-foreground uppercase shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 md:w-auto">
                                <Plus className="h-4 w-4" />
                                TAMBAH AGENDA
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 z-50 animate-in bg-slate-950/40 backdrop-blur-sm fade-in" />
                            <Dialog.Content className="fixed right-0 bottom-0 left-0 z-50 max-h-[90vh] w-full animate-in overflow-y-auto rounded-t-[32px] border border-border bg-card p-6 shadow-2xl duration-300 slide-in-from-bottom-full md:top-[50%] md:bottom-auto md:left-[50%] md:max-w-lg md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-2xl md:p-8 md:zoom-in-95">
                                <div className="mb-8 flex items-center justify-between">
                                    <Dialog.Title className="text-xl font-black tracking-tight text-foreground uppercase">
                                        Agenda Baru
                                    </Dialog.Title>
                                    <Dialog.Close className="rounded-full bg-muted/50 p-2 text-muted-foreground transition-colors hover:bg-secondary">
                                        <X className="h-5 w-5" />
                                    </Dialog.Close>
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                            Nama Kegiatan
                                        </label>
                                        <input
                                            className="w-full rounded-xl border border-input bg-muted/30 px-4 py-4 text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none dark:text-white"
                                            value={data.nama_kegiatan}
                                            onChange={(e) =>
                                                setData(
                                                    'nama_kegiatan',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama Agenda"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                                Tanggal
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full rounded-xl border border-input bg-muted/30 px-4 py-4 text-sm focus:border-primary focus:outline-none dark:text-white"
                                                value={data.tanggal_kegiatan}
                                                onChange={(e) =>
                                                    setData(
                                                        'tanggal_kegiatan',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                                Lokasi
                                            </label>
                                            <input
                                                className="w-full rounded-xl border border-input bg-muted/30 px-4 py-4 text-sm focus:border-primary focus:outline-none dark:text-white"
                                                value={data.lokasi}
                                                onChange={(e) =>
                                                    setData(
                                                        'lokasi',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Tempat"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-xl border border-input bg-muted/30 px-4 py-4 text-sm focus:border-primary focus:outline-none dark:text-white"
                                            value={data.deskripsi_kegiatan}
                                            onChange={(e) =>
                                                setData(
                                                    'deskripsi_kegiatan',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Detail singkat..."
                                        />
                                    </div>

                                    <button
                                        disabled={processing}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-[11px] font-black tracking-[0.25em] text-primary-foreground uppercase shadow-lg shadow-primary/20 transition-all hover:brightness-110 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Save className="h-4 w-4" />
                                        )}
                                        {processing
                                            ? 'Proses...'
                                            : 'Simpan Agenda'}
                                    </button>
                                </form>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                {/* Content Section: Mobile Card List & Desktop Table */}
                <div className="overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="hidden md:table-header-group">
                                <tr className="bg-muted/30">
                                    <th className="border-b border-border p-5 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Agenda
                                    </th>
                                    <th className="border-b border-border p-5 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Waktu & Tempat
                                    </th>
                                    <th className="border-b border-border p-5 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Laporan
                                    </th>
                                    <th className="border-b border-border p-5 text-right text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Opsi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="flex flex-col divide-y divide-border md:table-row-group">
                                {kegiatan.length > 0 ? (
                                    kegiatan.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="group flex flex-col p-5 transition-all hover:bg-muted/30 md:table-row md:p-0"
                                        >
                                            {/* Agenda Info */}
                                            <td className="flex flex-col gap-1 md:p-5">
                                                <div className="flex items-center justify-between md:block">
                                                    <p className="text-sm font-bold tracking-tight text-foreground uppercase md:text-base dark:text-slate-200">
                                                        {item.nama_kegiatan}
                                                    </p>
                                                    {/* Dropdown for Mobile (di pojok kanan card) */}
                                                    <div className="md:hidden">
                                                        <ActionDropdown
                                                            item={item}
                                                            handleDelete={
                                                                handleDelete
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed font-medium text-muted-foreground uppercase">
                                                    {item.deskripsi_kegiatan}
                                                </p>
                                            </td>

                                            {/* Time & Place */}
                                            <td className="mt-4 md:mt-0 md:p-5">
                                                <div className="flex flex-wrap gap-4 md:flex-col md:gap-2">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight text-foreground/70 uppercase dark:text-slate-300">
                                                        <Calendar className="h-3.5 w-3.5 text-primary" />
                                                        {new Date(
                                                            item.tanggal_kegiatan,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                dateStyle:
                                                                    'medium',
                                                            },
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight text-muted-foreground uppercase">
                                                        <MapPin className="h-3.5 w-3.5" />{' '}
                                                        {item.lokasi}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Report Status */}
                                            <td className="mt-5 md:mt-0 md:p-5">
                                                {item.laporan ? (
                                                    <button
                                                        onClick={() =>
                                                            router.get(
                                                                `/laporan/edit/${item.laporan?.id}`,
                                                            )
                                                        }
                                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[9px] font-black tracking-tighter text-emerald-600 uppercase md:w-auto md:py-1.5 dark:text-emerald-400"
                                                    >
                                                        <CheckCircle2 className="h-3.5 w-3.5" />{' '}
                                                        Edit Laporan
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            router.get(
                                                                `/laporan/create/${item.id}`,
                                                            )
                                                        }
                                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary px-4 py-3 text-[9px] font-black tracking-tighter text-primary uppercase transition-all active:bg-primary/20 md:w-auto md:py-1.5"
                                                    >
                                                        <FilePlus className="h-3.5 w-3.5" />{' '}
                                                        Buat Laporan
                                                    </button>
                                                )}
                                            </td>

                                            {/* Options for Desktop */}
                                            <td className="hidden p-5 text-right md:table-cell">
                                                <ActionDropdown
                                                    item={item}
                                                    handleDelete={handleDelete}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="flex flex-col p-20 text-center md:table-row">
                                        <td colSpan={4}>
                                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                                <div className="rounded-full bg-muted/50 p-5">
                                                    <Calendar className="h-10 w-10 opacity-20" />
                                                </div>
                                                <p className="text-[10px] font-black tracking-[0.2em] uppercase italic">
                                                    Belum ada agenda terdaftar
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

// Sub-component untuk dropdown agar kode lebih rapi
function ActionDropdown({
    item,
    handleDelete,
}: {
    item: Kegiatan;
    handleDelete: (id: number) => void;
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-90">
                    <MoreVertical className="h-4 w-4" />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="z-[110] min-w-[160px] animate-in rounded-2xl border border-border bg-popover/90 p-2 shadow-2xl backdrop-blur-md duration-200 slide-in-from-top-2">
                    <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest uppercase transition-colors outline-none hover:bg-primary/10 hover:text-primary">
                        <Edit3 className="h-4 w-4 italic" /> Edit Agenda (Coming
                        Soon)
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="my-1 h-px bg-border" />
                    <DropdownMenu.Item
                        onClick={() => handleDelete(item.id)}
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-[10px] font-black tracking-widest text-destructive uppercase transition-colors outline-none hover:bg-destructive/10"
                    >
                        <Trash2 className="h-4 w-4" /> Hapus
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

KegiatanIndex.layout = (page: React.ReactNode) => ({
    breadcrumbs: [{ title: 'Agenda Kegiatan', href: '#' }],
    children: page,
});

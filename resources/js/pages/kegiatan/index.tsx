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
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Kegiatan } from '@/types/library';

interface Props {
    kegiatan: Kegiatan[]; // Laravel akan mengisi ini
}

export default function KegiatanIndex({ kegiatan }: Props) {
    // 1. Pastikan useForm mengarah ke route aksi yang benar
    const { data, setData, post, processing, reset, errors } = useForm({
        nama_kegiatan: '',
        tanggal_kegiatan: '',
        lokasi: '',
        deskripsi_kegiatan: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Arahkan ke route store di backend Anda
        post('/kegiatan', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Manajemen Kegiatan" />

            <div className="flex h-full flex-col gap-6 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-[900] tracking-tight text-foreground">
                            Agenda Kegiatan
                        </h1>
                        <p className="text-sm font-medium text-muted-foreground">
                            Kelola jadwal dan rencana aktivitas perpustakaan
                            secara riil.
                        </p>
                    </div>

                    {/* Dialog Modal Tambah Kegiatan */}
                    <Dialog.Root onOpenChange={() => reset()}>
                        <Dialog.Trigger asChild>
                            <button className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-black tracking-widest text-primary-foreground uppercase shadow-lg shadow-primary/10 transition-all hover:opacity-90 active:scale-95">
                                <Plus className="h-4 w-4" />
                                TAMBAH AGENDA
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 z-50 animate-in bg-background/80 backdrop-blur-sm duration-200 fade-in" />
                            <Dialog.Content className="fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] animate-in rounded-lg border border-border bg-card p-8 shadow-2xl duration-200 zoom-in-95">
                                <div className="mb-6 flex items-center justify-between">
                                    <Dialog.Title className="text-xl font-black tracking-tight text-foreground uppercase">
                                        Kegiatan Baru
                                    </Dialog.Title>
                                    <Dialog.Close className="rounded-full p-1 text-foreground text-muted-foreground transition-colors hover:bg-secondary">
                                        <X className="h-5 w-5" />
                                    </Dialog.Close>
                                </div>

                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                            Nama Kegiatan
                                        </label>
                                        <input
                                            className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:outline-none"
                                            value={data.nama_kegiatan}
                                            onChange={(e) =>
                                                setData(
                                                    'nama_kegiatan',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.nama_kegiatan && (
                                            <p className="text-[10px] font-bold text-destructive">
                                                {errors.nama_kegiatan}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                                Tanggal
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:outline-none"
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
                                            <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                                Lokasi
                                            </label>
                                            <input
                                                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:outline-none"
                                                value={data.lokasi}
                                                onChange={(e) =>
                                                    setData(
                                                        'lokasi',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:outline-none"
                                            value={data.deskripsi_kegiatan}
                                            onChange={(e) =>
                                                setData(
                                                    'deskripsi_kegiatan',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <button
                                        disabled={processing}
                                        className="mt-4 w-full rounded-md bg-primary py-3 text-xs font-black tracking-[0.2em] text-primary-foreground uppercase transition-all hover:opacity-90 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan Agenda'}
                                    </button>
                                </form>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                {/* Table Section (Data Riil) */}
                <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30">
                                    <th className="border-b border-border p-4 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Agenda
                                    </th>
                                    <th className="border-b border-border p-4 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Waktu & Tempat
                                    </th>
                                    <th className="border-b border-border p-4 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                        Laporan
                                    </th>
                                    <th className="border-b border-border p-4 text-right text-[10px] font-black tracking-widest text-foreground text-muted-foreground uppercase">
                                        Opsi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border text-foreground">
                                {kegiatan.length > 0 ? (
                                    kegiatan.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="group transition-colors hover:bg-accent/30"
                                        >
                                            <td className="p-4">
                                                <p className="text-sm leading-tight font-bold text-foreground">
                                                    {item.nama_kegiatan}
                                                </p>
                                                <p className="mt-1 line-clamp-1 text-[10px] text-muted-foreground">
                                                    {item.deskripsi_kegiatan}
                                                </p>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                                                    <Calendar className="h-3 w-3 text-primary" />
                                                    {new Date(
                                                        item.tanggal_kegiatan,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        { dateStyle: 'medium' },
                                                    )}
                                                </div>
                                                <div className="mt-1 flex items-center gap-2 text-[10px] font-bold tracking-tighter text-muted-foreground uppercase">
                                                    <MapPin className="h-3 w-3" />{' '}
                                                    {item.lokasi}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {item.laporan ? (
                                                    <button
                                                        onClick={() =>
                                                            router.get(
                                                                `/laporan/edit/${item.id}`,
                                                            )
                                                        }
                                                        className="flex items-center gap-1 text-[9px] font-black tracking-tighter text-primary uppercase hover:underline"
                                                    >
                                                        <FilePlus className="h-3 w-3" />{' '}
                                                        Edit Laporan
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            router.get(
                                                                `/laporan/create/${item.id}`,
                                                            )
                                                        }
                                                        className="flex items-center gap-1 text-[9px] font-black tracking-tighter text-primary uppercase hover:underline"
                                                    >
                                                        <FilePlus className="h-3 w-3" />{' '}
                                                        Buat Laporan
                                                    </button>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                {/* Dropdown Menu untuk Edit/Hapus */}
                                                <DropdownMenu.Root>
                                                    <DropdownMenu.Trigger
                                                        asChild
                                                    >
                                                        <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </button>
                                                    </DropdownMenu.Trigger>
                                                    {/* Portal Content Dropdown */}
                                                    <DropdownMenu.Portal>
                                                        <DropdownMenu.Content className="z-50 min-w-[140px] animate-in rounded-md border border-border bg-popover p-1 text-foreground shadow-xl zoom-in-95 fade-in">
                                                            <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-[10px] font-bold tracking-widest uppercase outline-none hover:bg-accent hover:text-accent-foreground">
                                                                <Edit3 className="h-3.5 w-3.5" />{' '}
                                                                Edit
                                                            </DropdownMenu.Item>
                                                            <DropdownMenu.Separator className="my-1 h-px bg-border" />
                                                            <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-[10px] font-bold tracking-widest text-destructive uppercase outline-none hover:bg-destructive/10">
                                                                <Trash2 className="h-3.5 w-3.5" />{' '}
                                                                Hapus
                                                            </DropdownMenu.Item>
                                                        </DropdownMenu.Content>
                                                    </DropdownMenu.Portal>
                                                </DropdownMenu.Root>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="p-12 text-center text-[10px] font-black tracking-widest text-muted-foreground uppercase"
                                        >
                                            Tidak ada agenda ditemukan.
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

KegiatanIndex.layout = {
    breadcrumbs: [{ title: 'Agenda Kegiatan', href: '/admin/kegiatan' }],
};

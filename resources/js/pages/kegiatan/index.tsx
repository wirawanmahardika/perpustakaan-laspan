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
    Users,
    Tag,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Kegiatan } from '@/types/library';

interface Props {
    kegiatan: Kegiatan[];
}

export default function KegiatanIndex({ kegiatan }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Kegiatan | null>(null);

    // Inisialisasi useForm sesuai skema Database
    const { data, setData, post, put, processing, reset, errors } = useForm({
        nama: '',
        jenis_kegiatan: 'layanan',
        sub_jenis_layanan: '',
        media_promosi: '',
        tanggal_pelaksanaan: '',
        deskripsi: '',
        pihak_kolaborasi: '',
        testimoni_masyarakat: '',
    });

    const openEditModal = (item: Kegiatan) => {
        setEditingItem(item);
        setData({
            nama: item.nama,
            jenis_kegiatan: item.jenis_kegiatan,
            sub_jenis_layanan: item.sub_jenis_layanan ?? '',
            media_promosi: item.media_promosi ?? '',
            tanggal_pelaksanaan: item.tanggal_pelaksanaan,
            deskripsi: item.deskripsi,
            pihak_kolaborasi: item.pihak_kolaborasi ?? '',
            testimoni_masyarakat: item.testimoni_masyarakat ?? '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        reset();
    };

    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                closeModal();
                setNotification({
                    type: 'success',
                    text: editingItem
                        ? 'Kegiatan diperbarui!'
                        : 'Kegiatan ditambahkan!',
                });
                setTimeout(() => setNotification(null), 4000);
            },
            onError: (err: any) => {
                setNotification({
                    type: 'error',
                    text: 'Terjadi kesalahan. Cek kembali form.',
                });
            },
        };

        if (editingItem) {
            put(`/kegiatan/${editingItem.id}`, options);
        } else {
            post('/kegiatan', options);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus kegiatan ini?')) {
            router.delete(`/kegiatan/${id}`, {
                onSuccess: () => {
                    setNotification({
                        type: 'success',
                        text: 'Kegiatan dihapus.',
                    });
                    setTimeout(() => setNotification(null), 3000);
                },
            });
        }
    };

    return (
        <>
            <Head title="Manajemen Kegiatan" />

            <div className="flex min-h-full flex-col gap-6 p-4 text-foreground md:p-8">
                {/* Notification Banner */}
                {notification && (
                    <div className="fixed top-20 right-4 left-4 z-[100] animate-in slide-in-from-right-5 fade-in md:left-auto md:w-96">
                        <div
                            className={`flex items-center gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md ${notification.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' : 'border-destructive/20 bg-destructive/10 text-destructive'}`}
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

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-[1000] tracking-tighter uppercase md:text-3xl">
                            Agenda & Kegiatan
                        </h1>
                        <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            Sesuai Dimensi 3 & 7 Akreditasi
                        </p>
                    </div>

                    <Dialog.Root
                        open={isModalOpen}
                        onOpenChange={(val) => {
                            setIsModalOpen(val);
                            if (!val) closeModal();
                        }}
                    >
                        <Dialog.Trigger asChild>
                            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-[10px] font-black tracking-[0.2em] text-primary-foreground uppercase shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                                <Plus className="h-4 w-4" /> TAMBAH KEGIATAN
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 z-50 animate-in bg-slate-950/40 backdrop-blur-sm fade-in" />
                            <Dialog.Content className="fixed right-0 bottom-0 left-0 z-50 max-h-[95vh] w-full animate-in overflow-y-auto rounded-t-[32px] border border-border bg-card p-6 shadow-2xl slide-in-from-bottom-full md:top-[50%] md:bottom-auto md:left-[50%] md:max-w-2xl md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-2xl md:p-8">
                                <div className="mb-6 flex items-center justify-between">
                                    <Dialog.Title className="text-xl font-black uppercase">
                                        {editingItem
                                            ? 'Edit Kegiatan'
                                            : 'Kegiatan Baru'}
                                    </Dialog.Title>
                                    <Dialog.Close className="rounded-full bg-muted/50 p-2">
                                        <X className="h-5 w-5" />
                                    </Dialog.Close>
                                </div>

                                <form onSubmit={submit} className="space-y-5">
                                    <FormGroup
                                        label="Nama Kegiatan"
                                        error={errors.nama}
                                    >
                                        <input
                                            className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm focus:border-primary focus:outline-none"
                                            value={data.nama}
                                            onChange={(e) =>
                                                setData('nama', e.target.value)
                                            }
                                            placeholder="Contoh: Literasi Digital Desa"
                                        />
                                    </FormGroup>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <FormGroup label="Jenis Kegiatan">
                                            <select
                                                className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none"
                                                value={data.jenis_kegiatan}
                                                onChange={(e) =>
                                                    setData(
                                                        'jenis_kegiatan',
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="layanan">
                                                    Layanan
                                                </option>
                                                <option value="promosi">
                                                    Promosi
                                                </option>
                                                <option value="inovasi">
                                                    Inovasi
                                                </option>
                                                <option value="pemberdayaan">
                                                    Pemberdayaan
                                                </option>
                                                <option value="kerjasama">
                                                    Kerjasama
                                                </option>
                                            </select>
                                        </FormGroup>

                                        <FormGroup label="Tanggal Pelaksanaan">
                                            <input
                                                type="date"
                                                className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none"
                                                value={data.tanggal_pelaksanaan}
                                                onChange={(e) =>
                                                    setData(
                                                        'tanggal_pelaksanaan',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </FormGroup>
                                    </div>

                                    {/* Conditional Selects based on Jenis Kegiatan */}
                                    {data.jenis_kegiatan === 'layanan' && (
                                        <FormGroup label="Sub Jenis Layanan">
                                            <select
                                                className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none"
                                                value={data.sub_jenis_layanan}
                                                onChange={(e) =>
                                                    setData(
                                                        'sub_jenis_layanan',
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Pilih Sub Layanan...
                                                </option>
                                                <option value="baca_ditempat">
                                                    Baca di Tempat
                                                </option>
                                                <option value="sirkulasi">
                                                    Sirkulasi
                                                </option>
                                                <option value="referensi">
                                                    Referensi
                                                </option>
                                                <option value="literasi">
                                                    Literasi
                                                </option>
                                                <option value="ramah_anak_disabilitas">
                                                    Ramah Anak & Disabilitas
                                                </option>
                                            </select>
                                        </FormGroup>
                                    )}

                                    {data.jenis_kegiatan === 'promosi' && (
                                        <FormGroup label="Media Promosi">
                                            <select
                                                className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none"
                                                value={data.media_promosi}
                                                onChange={(e) =>
                                                    setData(
                                                        'media_promosi',
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Pilih Media...
                                                </option>
                                                <option value="medsos">
                                                    Media Sosial
                                                </option>
                                                <option value="brosur">
                                                    Brosur/Banner
                                                </option>
                                                <option value="lomba">
                                                    Lomba/Pameran
                                                </option>
                                            </select>
                                        </FormGroup>
                                    )}

                                    <FormGroup label="Pihak Kolaborasi (Opsional)">
                                        <input
                                            className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none"
                                            value={data.pihak_kolaborasi}
                                            onChange={(e) =>
                                                setData(
                                                    'pihak_kolaborasi',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Instansi / Tokoh masyarakat"
                                        />
                                    </FormGroup>

                                    <FormGroup label="Deskripsi / Narasi Kegiatan">
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm outline-none"
                                            value={data.deskripsi}
                                            onChange={(e) =>
                                                setData(
                                                    'deskripsi',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ceritakan jalannya kegiatan..."
                                        />
                                    </FormGroup>

                                    <button
                                        disabled={processing}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-[11px] font-black tracking-[0.25em] text-primary-foreground uppercase shadow-lg transition-all hover:brightness-110 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Save className="h-4 w-4" />
                                        )}
                                        {editingItem
                                            ? 'Perbarui Data'
                                            : 'Simpan Kegiatan'}
                                    </button>
                                </form>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-[24px] border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="hidden md:table-header-group">
                                <tr className="bg-muted/30 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                                    <th className="p-5">Kegiatan & Jenis</th>
                                    <th className="p-5">Waktu</th>
                                    <th className="p-5">
                                        Laporan (Bukti Fisik)
                                    </th>
                                    <th className="p-5 text-right">Opsi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {kegiatan.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="group hover:bg-muted/30"
                                    >
                                        <td className="p-5">
                                            <p className="text-sm font-bold tracking-tight uppercase">
                                                {item.nama}
                                            </p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[8px] font-black tracking-tighter text-primary uppercase">
                                                    {item.jenis_kegiatan}
                                                </span>
                                                {item.pihak_kolaborasi && (
                                                    <span className="text-[8px] font-bold text-muted-foreground uppercase italic">
                                                        w/{' '}
                                                        {item.pihak_kolaborasi}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight uppercase">
                                                <Calendar className="h-3.5 w-3.5 text-primary" />
                                                {new Date(
                                                    item.tanggal_pelaksanaan,
                                                ).toLocaleDateString('id-ID', {
                                                    dateStyle: 'medium',
                                                })}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            {item.laporan ? (
                                                <button
                                                    onClick={() =>
                                                        router.get(
                                                            `/laporan/edit/${item.laporan?.id}`,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-black text-emerald-600 uppercase transition-all hover:bg-emerald-500/10"
                                                >
                                                    <CheckCircle2 className="h-3 w-3" />{' '}
                                                    Edit Laporan
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        router.get(
                                                            `/laporan/create/${item.id}`,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-[9px] font-black text-primary-foreground uppercase transition-all hover:brightness-110"
                                                >
                                                    <FilePlus className="h-3 w-3" />{' '}
                                                    Buat Laporan
                                                </button>
                                            )}
                                        </td>
                                        <td className="p-5 text-right">
                                            <ActionDropdown
                                                item={item}
                                                handleDelete={handleDelete}
                                                onEdit={() =>
                                                    openEditModal(item)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

// Sub-components untuk kerapihan
function FormGroup({
    label,
    children,
    error,
}: {
    label: string;
    children: React.ReactNode;
    error?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-[9px] font-bold tracking-tighter text-destructive uppercase">
                    {error}
                </p>
            )}
        </div>
    );
}

function ActionDropdown({
    item,
    handleDelete,
    onEdit,
}: {
    item: Kegiatan;
    handleDelete: (id: number) => void;
    onEdit: () => void;
}) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="h-8 w-8 rounded-lg bg-muted/50 transition-colors hover:bg-secondary">
                    <MoreVertical className="mx-auto h-4 w-4" />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="z-[110] min-w-[140px] animate-in rounded-xl border border-border bg-popover p-1 shadow-xl zoom-in-95 fade-in">
                    <DropdownMenu.Item
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold uppercase transition-colors outline-none hover:bg-primary/10"
                    >
                        <Edit3 className="h-3.5 w-3.5 text-primary" /> Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={() => handleDelete(item.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold text-destructive uppercase transition-colors outline-none hover:bg-destructive/10"
                    >
                        <Trash2 className="h-3.5 w-3.5" /> Hapus
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

KegiatanIndex.layout = (page: React.ReactNode) => ({
    breadcrumbs: [{ title: 'Manajemen Kegiatan', href: '#' }],
    children: page,
});

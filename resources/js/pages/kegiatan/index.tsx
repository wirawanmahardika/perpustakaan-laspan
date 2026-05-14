import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Calendar,
    Plus,
    MoreVertical,
    Trash2,
    Edit3,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Save,
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Kegiatan } from '@/types/library';

export default function KegiatanIndex({ kegiatan }: { kegiatan: Kegiatan[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Kegiatan | null>(null);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    // Form disesuaikan tepat dengan skema tabel activity_logs
    const { data, setData, post, put, processing, reset, errors } = useForm({
        nama_kegiatan: '',
        tanggal: '',
        tipe: 'promosi' as any,
        deskripsi: '',
        pihak_terlibat: '',
    });

    const openEditModal = (item: Kegiatan) => {
        setEditingItem(item);
        setData({
            nama_kegiatan: item.nama_kegiatan,
            tanggal: item.tanggal,
            tipe: item.tipe,
            deskripsi: item.deskripsi,
            pihak_terlibat: item.pihak_terlibat ?? '',
        });
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                setIsModalOpen(false);
                setEditingItem(null);
                reset();
                setNotification({
                    type: 'success',
                    text: editingItem ? 'Data diperbarui!' : 'Data disimpan!',
                });
                setTimeout(() => setNotification(null), 3000);
            },
            onError: (err: any) => {
                console.log(err);
            },
        };
        editingItem
            ? put(`/kegiatan/${editingItem.id}`, options)
            : post('/kegiatan', options);
    };

    return (
        <>
            <Head title="Manajemen Kegiatan" />
            <div className="flex flex-col gap-6 p-4 md:p-8">
                {notification && (
                    <div className="fixed top-20 right-4 z-[100] w-72 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 shadow-2xl backdrop-blur-md">
                        <span className="text-[10px] font-black uppercase">
                            {notification.text}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-[1000] tracking-tighter uppercase md:text-3xl">
                        Agenda Kegiatan
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-4 text-[10px] font-black tracking-widest text-primary-foreground uppercase"
                    >
                        <Plus className="h-4 w-4" /> TAMBAH
                    </button>
                </div>

                <div className="overflow-hidden rounded-3xl border border-border bg-card">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                            <tr>
                                <th className="p-5">Kegiatan</th>
                                <th className="p-5">Waktu</th>
                                <th className="p-5">Pihak Terlibat</th>
                                <th className="p-5 text-right">Opsi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {kegiatan.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/30">
                                    <td className="p-5">
                                        <p className="text-sm font-bold uppercase">
                                            {item.nama_kegiatan}
                                        </p>
                                        <span className="text-[8px] font-black text-primary uppercase">
                                            {item.tipe}
                                        </span>
                                    </td>
                                    <td className="p-5 text-[10px] font-bold uppercase">
                                        <Calendar className="mr-2 inline h-3 w-3" />{' '}
                                        {item.tanggal}
                                    </td>
                                    <td className="p-5 text-xs text-muted-foreground">
                                        {item.pihak_terlibat || '-'}
                                    </td>
                                    <td className="p-5 text-right">
                                        <ActionDropdown
                                            onEdit={() => openEditModal(item)}
                                            onDelete={() =>
                                                router.delete(
                                                    `/kegiatan/${item.id}`,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card p-8 shadow-2xl">
                            <form onSubmit={submit} className="space-y-5">
                                <FormGroup
                                    label="Nama Kegiatan"
                                    error={errors.nama_kegiatan}
                                >
                                    <input
                                        className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm"
                                        value={data.nama_kegiatan}
                                        onChange={(e) =>
                                            setData(
                                                'nama_kegiatan',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormGroup>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormGroup label="Tipe">
                                        <select
                                            className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm"
                                            value={data.tipe}
                                            onChange={(e) =>
                                                setData(
                                                    'tipe',
                                                    e.target.value as any,
                                                )
                                            }
                                        >
                                            <option value="promosi">
                                                Promosi
                                            </option>
                                            <option value="kerjasama">
                                                Kerjasama
                                            </option>
                                            <option value="pemberdayaan">
                                                Pemberdayaan
                                            </option>
                                            <option value="layanan_khusus">
                                                Layanan Khusus
                                            </option>
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="Tanggal">
                                        <input
                                            type="date"
                                            className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm"
                                            value={data.tanggal}
                                            onChange={(e) =>
                                                setData(
                                                    'tanggal',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </FormGroup>
                                </div>

                                <FormGroup label="Pihak Terlibat">
                                    <input
                                        className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm"
                                        value={data.pihak_terlibat}
                                        onChange={(e) =>
                                            setData(
                                                'pihak_terlibat',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Instansi/Tokoh"
                                    />
                                </FormGroup>

                                <FormGroup label="Deskripsi">
                                    <textarea
                                        rows={3}
                                        className="w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm"
                                        value={data.deskripsi}
                                        onChange={(e) =>
                                            setData('deskripsi', e.target.value)
                                        }
                                    />
                                </FormGroup>

                                <button
                                    disabled={processing}
                                    className="w-full rounded-xl bg-primary py-4 text-[11px] font-black tracking-widest text-primary-foreground uppercase shadow-lg"
                                >
                                    {processing
                                        ? 'MEMPROSES...'
                                        : 'SIMPAN DATA'}
                                </button>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    );
}

function FormGroup({ label, children, error }: any) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-[9px] font-bold text-destructive uppercase">
                    {error}
                </p>
            )}
        </div>
    );
}

function ActionDropdown({ onEdit, onDelete }: any) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="h-8 w-8 rounded-lg bg-muted/50">
                <MoreVertical className="mx-auto h-4 w-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="z-[110] min-w-[140px] rounded-xl border bg-popover p-1 shadow-xl">
                    <DropdownMenu.Item
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold uppercase outline-none hover:bg-primary/10"
                    >
                        <Edit3 className="h-3 w-3 text-primary" /> Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={onDelete}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold text-destructive uppercase outline-none hover:bg-destructive/10"
                    >
                        <Trash2 className="h-3 w-3" /> Hapus
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

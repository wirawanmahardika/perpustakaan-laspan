import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Calendar,
    Plus,
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
import DocumentManager from '../dokumen/detail';

interface Props {
    kegiatan: Kegiatan[];
}

export default function KegiatanIndex({ kegiatan }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Kegiatan | null>(null);

    // --- STATE UNTUK OPSI 2 (DOKUMEN) ---
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [selectedItemForDocs, setSelectedItemForDocs] =
        useState<Kegiatan | null>(null);

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
                    text: editingItem ? 'Data diperbarui!' : 'Data disimpan!',
                });
                setTimeout(() => setNotification(null), 4000);
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
            router.delete(`/kegiatan/${id}`);
        }
    };

    return (
        <>
            <Head title="Manajemen Kegiatan" />

            <div className="flex min-h-full flex-col gap-6 p-4 text-foreground md:p-8">
                {/* Notification */}
                {notification && (
                    <div className="fixed top-20 right-4 z-[100] w-72 animate-in slide-in-from-right-5 fade-in">
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

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-[1000] tracking-tighter uppercase md:text-3xl">
                            Agenda & Kegiatan
                        </h1>
                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            Sesuai Dimensi Akreditasi
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-4 text-[10px] font-black tracking-[0.2em] text-primary-foreground uppercase shadow-lg transition-all hover:scale-[1.02]"
                    >
                        <Plus className="h-4 w-4" /> TAMBAH KEGIATAN
                    </button>
                </div>

                {/* --- TABLE --- */}
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                            <tr>
                                <th className="p-5">Kegiatan</th>
                                <th className="p-5">Waktu</th>
                                <th className="p-5">Laporan (Bukti Fisik)</th>
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
                                        <p className="text-sm font-bold uppercase">
                                            {item.nama}
                                        </p>
                                        <span className="text-[8px] font-black text-primary uppercase">
                                            {item.jenis_kegiatan}
                                        </span>
                                    </td>
                                    <td className="p-5 text-[10px] font-bold uppercase">
                                        <Calendar className="mr-2 inline h-3 w-3" />
                                        {new Date(
                                            item.tanggal_pelaksanaan,
                                        ).toLocaleDateString('id-ID')}
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
                                        {/* Action Dropdown dengan fungsi Manage Docs */}
                                        <ActionDropdown
                                            item={item}
                                            handleDelete={handleDelete}
                                            onEdit={() => openEditModal(item)}
                                            onManageDocs={() => {
                                                setSelectedItemForDocs(item);
                                                setIsDocModalOpen(true);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- MODAL FORM UTAMA (CREATE/EDIT) --- */}
                <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-card p-8 shadow-2xl">
                            <div className="mb-6 flex items-center justify-between">
                                <Dialog.Title className="text-xl font-black uppercase">
                                    {editingItem
                                        ? 'Edit Kegiatan'
                                        : 'Kegiatan Baru'}
                                </Dialog.Title>
                                <Dialog.Close className="p-2">
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
                                            setData('deskripsi', e.target.value)
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

                {/* --- MODAL KHUSUS DOKUMEN (OPSI 2) --- */}
                <Dialog.Root
                    open={isDocModalOpen}
                    onOpenChange={setIsDocModalOpen}
                >
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-[120] animate-in bg-slate-950/60 backdrop-blur-md fade-in" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 z-[130] max-h-[90vh] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 animate-in overflow-y-auto rounded-[32px] border border-border bg-card shadow-2xl zoom-in-95">
                            <div className="flex items-start justify-between p-8 pb-0">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                                        Kelola Bukti Fisik
                                    </h2>
                                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Kegiatan: {selectedItemForDocs?.nama}
                                    </p>
                                </div>
                                <Dialog.Close className="rounded-full bg-muted p-2 transition-colors hover:bg-destructive hover:text-white">
                                    <X className="h-5 w-5" />
                                </Dialog.Close>
                            </div>

                            {/* PANGGIL KOMPONEN DOCUMENT MANAGER DI SINI */}
                            <div className="p-2">
                                {selectedItemForDocs && (
                                    <DocumentManager
                                        documents={
                                            selectedItemForDocs.bukti_dokumen ||
                                            []
                                        }
                                        documentable_id={selectedItemForDocs.id}
                                        documentable_type="App\Models\Kegiatan"
                                        title=""
                                    />
                                )}
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    );
}

// --- SUB COMPONENTS ---

function ActionDropdown({ item, handleDelete, onEdit, onManageDocs }: any) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="h-8 w-8 rounded-lg bg-muted/50 transition-colors hover:bg-secondary">
                    <MoreVertical className="mx-auto h-4 w-4" />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="z-[110] min-w-[160px] rounded-xl border border-border bg-popover p-1 shadow-xl">
                    <DropdownMenu.Item
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold uppercase transition-colors outline-none hover:bg-primary/10"
                    >
                        <Edit3 className="h-3.5 w-3.5 text-primary" /> Edit Data
                    </DropdownMenu.Item>

                    {/* ITEM DROPDOWN UNTUK BUKA MODAL DOKUMEN */}
                    <DropdownMenu.Item
                        onClick={onManageDocs}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold text-blue-600 uppercase transition-colors outline-none hover:bg-blue-500/10"
                    >
                        <FilePlus className="h-3.5 w-3.5" /> Dokumen Bukti
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

function FormGroup({ label, children, error }: any) {
    return (
        <div className="space-y-1">
            <label className="ml-1 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
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

KegiatanIndex.layout = (page: React.ReactNode) => ({
    breadcrumbs: [{ title: 'Manajemen Kegiatan', href: '#' }],
    children: page,
});

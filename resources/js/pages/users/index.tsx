import { Head, router, useForm } from '@inertiajs/react';
import {
    Users,
    ShieldCheck,
    UserCircle,
    Mail,
    GraduationCap,
    FileBadge,
    MoreVertical,
    Trash2,
    UserPlus,
    X,
    Save,
    Edit3,
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { User } from '@/types';
import { useState } from 'react';

export default function UserIndex({ users }: { users: User[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '', // Hanya untuk user baru
        jabatan: '',
        pendidikan_terakhir: '',
        role: 'petugas' as 'admin' | 'petugas',
    });

    const openAddModal = () => {
        setEditingUser(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '', // Password dikosongkan saat edit (kecuali ingin reset)
            jabatan: user.jabatan || '',
            pendidikan_terakhir: user.pendidikan_terakhir || '',
            role: user.role,
        });
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            put(`/users/${editingUser.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/users', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const deleteUser = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus petugas ini?')) {
            router.delete(`/users/${id}`);
        }
    };

    return (
        <>
            <Head title="Manajemen Tenaga" />
            <div className="space-y-8 p-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-[1000] tracking-tighter uppercase">
                            Manajemen Tenaga
                        </h1>
                        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            Monitoring SDM & Kualifikasi Sertifikasi
                        </p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-4 text-[10px] font-black tracking-widest text-primary-foreground uppercase shadow-lg transition-transform active:scale-95"
                    >
                        <UserPlus className="h-4 w-4" /> TAMBAH PETUGAS
                    </button>
                </div>

                {/* Statistics Mini Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <StatCard
                        label="Total Tenaga"
                        value={users.length}
                        icon={<Users className="text-blue-500" />}
                    />
                    <StatCard
                        label="Tersertifikasi"
                        value={
                            users.filter((u) => u.sertifikat_kompetensi_path)
                                .length
                        }
                        icon={<FileBadge className="text-emerald-500" />}
                    />
                    <StatCard
                        label="Administrator"
                        value={users.filter((u) => u.role === 'admin').length}
                        icon={<ShieldCheck className="text-amber-500" />}
                    />
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                            <tr>
                                <th className="p-5">Petugas / Jabatan</th>
                                <th className="p-5">Kualifikasi</th>
                                <th className="p-5">Sertifikat</th>
                                <th className="p-5">Akses</th>
                                <th className="p-5 text-right">Opsi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition-colors hover:bg-muted/20"
                                >
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                <UserCircle className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm leading-tight font-black uppercase">
                                                    {user.name}
                                                </p>
                                                <p className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                                                    <Mail className="h-3 w-3" />{' '}
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-[10px] font-black uppercase">
                                        <div className="space-y-1">
                                            <p>{user.jabatan || 'Staf'}</p>
                                            <p className="flex items-center gap-1 text-[9px] font-bold text-muted-foreground uppercase italic">
                                                <GraduationCap className="h-3 w-3" />{' '}
                                                {user.pendidikan_terakhir ||
                                                    '-'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        {user.sertifikat_kompetensi_path ? (
                                            <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 uppercase">
                                                <FileBadge className="h-3 w-3" />{' '}
                                                Valid
                                            </span>
                                        ) : (
                                            <span className="text-[9px] text-muted-foreground/50 uppercase italic">
                                                Kosong
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        <span
                                            className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase ${user.role === 'admin' ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-slate-300 bg-slate-50 text-slate-600'}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <ActionDropdown
                                            onEdit={() => openEditModal(user)}
                                            onDelete={() => deleteUser(user.id)}
                                            onManageSertifikat={() => {
                                                router.get(
                                                    `/users/${user.id}/sertifikat`,
                                                );
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal Create/Edit */}
                <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-50 animate-in bg-black/40 backdrop-blur-sm fade-in" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-in rounded-3xl border bg-card p-8 shadow-2xl duration-200 zoom-in-95">
                            <div className="mb-6 flex items-center justify-between border-b pb-4">
                                <h2 className="text-xl font-black tracking-tighter uppercase">
                                    {editingUser
                                        ? 'Edit Petugas'
                                        : 'Tambah Petugas Baru'}
                                </h2>
                                <Dialog.Close className="rounded-full p-2 hover:bg-muted">
                                    <X className="h-5 w-5" />
                                </Dialog.Close>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                <FormInput
                                    label="Nama Lengkap"
                                    value={data.name}
                                    onChange={(v: any) => setData('name', v)}
                                    error={errors.name}
                                />
                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    value={data.email}
                                    onChange={(v: any) => setData('email', v)}
                                    error={errors.email}
                                />

                                {!editingUser && (
                                    <FormInput
                                        label="Password"
                                        type="password"
                                        value={data.password}
                                        onChange={(v: any) =>
                                            setData('password', v)
                                        }
                                        error={errors.password}
                                    />
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        label="Jabatan"
                                        value={data.jabatan}
                                        onChange={(v: any) =>
                                            setData('jabatan', v)
                                        }
                                        placeholder="Contoh: Kepala / Staf"
                                    />
                                    <FormSelect
                                        label="Akses Sistem"
                                        value={data.role}
                                        onChange={(v: any) =>
                                            setData('role', v as any)
                                        }
                                        options={[
                                            { label: 'Admin', value: 'admin' },
                                            {
                                                label: 'Petugas',
                                                value: 'petugas',
                                            },
                                        ]}
                                    />
                                </div>

                                <FormInput
                                    label="Pendidikan Terakhir"
                                    value={data.pendidikan_terakhir}
                                    onChange={(v: any) =>
                                        setData('pendidikan_terakhir', v)
                                    }
                                    placeholder="Contoh: S1 Perpustakaan / SMA"
                                />

                                <button
                                    disabled={processing}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-[11px] font-black text-primary-foreground uppercase shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
                                >
                                    {processing ? (
                                        'Sedang Memproses...'
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" /> Simpan
                                            Data Tenaga
                                        </>
                                    )}
                                </button>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    );
}

// --- Helper Components ---

function FormInput({
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
}: any) {
    return (
        <div className="space-y-1.5">
            <label className="ml-1 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                {label}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm transition-all outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            {error && (
                <p className="text-[9px] font-bold text-destructive uppercase">
                    {error}
                </p>
            )}
        </div>
    );
}

function FormSelect({ label, value, onChange, options }: any) {
    return (
        <div className="space-y-1.5">
            <label className="ml-1 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function StatCard({ label, value, icon }: any) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div>
                <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    {label}
                </p>
                <h3 className="mt-1 text-2xl font-black">{value}</h3>
            </div>
            <div className="rounded-xl bg-muted/50 p-3">{icon}</div>
        </div>
    );
}
// UBAH bagian parameter untuk menerima properti onManageSertifikat
function ActionDropdown({ onEdit, onDelete, onManageSertifikat }: any) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="h-8 w-8 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
                <MoreVertical className="mx-auto h-4 w-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="z-110 min-w-35 animate-in rounded-xl border bg-popover p-1 shadow-xl duration-100 zoom-in-95 fade-in">
                    {/* TOMBOL BARU YANG DITAMBAHKAN */}
                    <DropdownMenu.Item
                        onClick={onManageSertifikat}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold text-emerald-600 uppercase outline-none hover:bg-primary/10"
                    >
                        <FileBadge className="h-3 w-3" /> Kelola Sertifikat
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="my-1 h-px bg-muted" />

                    <DropdownMenu.Item
                        onClick={onEdit}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold uppercase outline-none hover:bg-primary/10"
                    >
                        <Edit3 className="h-3 w-3 text-primary" /> Edit Petugas
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="my-1 h-px bg-muted" />
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

import { Head, router, useForm } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    FileUp,
    Trash2,
    ExternalLink,
    ArrowLeft,
    Plus,
    X,
    Save,
} from 'lucide-react';

interface Sertifikat {
    id: number;
    nama_sertifikat: string;
    penerbit: string;
    tahun_terbit: number;
    file_path: string;
    file_url: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    jabatan: string | null;
    sertifikats: Sertifikat[];
}

export default function SertifikatCreate({ user }: { user: User }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'POST',
        sertifikat_baru: [] as Array<{
            nama_sertifikat: string;
            penerbit: string;
            tahun_terbit: string;
            file: File | null;
        }>,
    });

    const tambahBarisSertifikat = () => {
        setData('sertifikat_baru', [
            ...data.sertifikat_baru,
            { nama_sertifikat: '', penerbit: '', tahun_terbit: '', file: null },
        ]);
    };

    const hapusBarisSertifikat = (index: number) => {
        const updated = [...data.sertifikat_baru];
        updated.splice(index, 1);
        setData('sertifikat_baru', updated);
    };

    const ubahInputSertifikat = (index: number, field: string, value: any) => {
        const updated = [...data.sertifikat_baru];
        updated[index] = { ...updated[index], [field]: value };
        setData('sertifikat_baru', updated);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.sertifikat_baru.length === 0) {
            alert('Tambahkan minimal satu baris sertifikat sebelum menyimpan.');
            return;
        }

        post(`/users/${user.id}/sertifikat`, {
            onSuccess: () => {
                reset('sertifikat_baru');
                alert('Seluruh sertifikat kompetensi berhasil disimpan.');
            },
        });
    };

    const deleteSertifikatEksis = (sertifikatId: number) => {
        if (
            confirm(
                'Apakah Anda yakin ingin menghapus sertifikat ini secara permanen dari sistem?',
            )
        ) {
            router.delete(`/sertifikat/${sertifikatId}`);
        }
    };

    return (
        <>
            <Head title={`Kelola Sertifikat - ${user.name}`} />

            <div className="mx-auto w-full space-y-8 p-8">
                {/* Header Navigasi Internal */}
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => router.get('/users')}
                            className="rounded-xl border border-border bg-card p-3 shadow-sm transition-colors hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                        <div>
                            <h1 className="text-xl font-[1000] tracking-tighter uppercase">
                                {user.name}
                            </h1>
                            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                {user.jabatan || 'Staf'} — Monitoring
                                Sertifikasi Formil
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={tambahBarisSertifikat}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-[10px] font-black tracking-widest text-white uppercase shadow-md transition-transform hover:bg-emerald-700 active:scale-95"
                    >
                        <Plus className="h-4 w-4" /> Tambah Baris Form
                    </button>
                </div>

                {/* Bagian 1: Daftar Sertifikat Eksis */}
                <div className="space-y-4">
                    <h2 className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                        Sertifikat yang Sudah Terunggah (
                        {user.sertifikats?.length || 0})
                    </h2>

                    {user.sertifikats && user.sertifikats.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {user.sertifikats.map((sertif) => (
                                <div
                                    key={sertif.id}
                                    className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
                                >
                                    <div className="min-w-0 space-y-1">
                                        <p className="truncate text-sm font-black uppercase">
                                            {sertif.nama_sertifikat}
                                        </p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-muted-foreground uppercase">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="h-3 w-3" />{' '}
                                                {sertif.penerbit}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />{' '}
                                                {sertif.tahun_terbit}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex shrink-0 items-center gap-2">
                                        <a
                                            href={sertif.file_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-xl border border-blue-200 bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteSertifikatEksis(sertif.id)
                                            }
                                            className="rounded-xl border border-destructive/20 bg-destructive/5 p-2 text-destructive transition-colors hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-xs text-muted-foreground/60 uppercase italic shadow-sm">
                            Petugas ini belum memiliki riwayat sertifikat
                            kompetensi formal yang valid.
                        </div>
                    )}
                </div>

                {/* Bagian 2: Form Pengunggahan Batch Baru */}
                <form onSubmit={submit} className="space-y-6">
                    {data.sertifikat_baru.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xs font-black tracking-widest text-primary uppercase">
                                Input Batch Sertifikat Baru
                            </h2>

                            <div className="space-y-4">
                                {data.sertifikat_baru.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                hapusBarisSertifikat(index)
                                            }
                                            className="absolute top-4 right-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                            <div className="space-y-1.5 md:col-span-1">
                                                <label className="ml-1 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                                    Nama Sertifikat Kompetensi
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={item.nama_sertifikat}
                                                    onChange={(e) =>
                                                        ubahInputSertifikat(
                                                            index,
                                                            'nama_sertifikat',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Contoh: Sertifikat Ahli Madya"
                                                    className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
                                                />
                                                {errors[
                                                    `sertifikat_baru.${index}.nama_sertifikat` as any
                                                ] && (
                                                    <p className="mt-1 text-[9px] font-bold text-destructive uppercase">
                                                        {
                                                            errors[
                                                                `sertifikat_baru.${index}.nama_sertifikat` as any
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="ml-1 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                                    Lembaga Penerbit
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={item.penerbit}
                                                    onChange={(e) =>
                                                        ubahInputSertifikat(
                                                            index,
                                                            'penerbit',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Contoh: Perpusnas RI / BNSP"
                                                    className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
                                                />
                                                {errors[
                                                    `sertifikat_baru.${index}.penerbit` as any
                                                ] && (
                                                    <p className="mt-1 text-[9px] font-bold text-destructive uppercase">
                                                        {
                                                            errors[
                                                                `sertifikat_baru.${index}.penerbit` as any
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="ml-1 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                                    Tahun Terbit
                                                </label>
                                                <input
                                                    type="number"
                                                    required
                                                    min="1900"
                                                    max={new Date().getFullYear()}
                                                    value={item.tahun_terbit}
                                                    onChange={(e) =>
                                                        ubahInputSertifikat(
                                                            index,
                                                            'tahun_terbit',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="2026"
                                                    className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
                                                />
                                                {errors[
                                                    `sertifikat_baru.${index}.tahun_terbit` as any
                                                ] && (
                                                    <p className="mt-1 text-[9px] font-bold text-destructive uppercase">
                                                        {
                                                            errors[
                                                                `sertifikat_baru.${index}.tahun_terbit` as any
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 border-t pt-3">
                                            <label className="mb-1 ml-1 block text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                                Berkas Scan Sertifikat (PDF /
                                                JPG / PNG - Maks 2MB)
                                            </label>
                                            <div className="flex items-center gap-2 rounded-xl border border-input bg-muted/10 p-2">
                                                <FileUp className="ml-2 h-4 w-4 text-muted-foreground" />
                                                <input
                                                    type="file"
                                                    required
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) =>
                                                        ubahInputSertifikat(
                                                            index,
                                                            'file',
                                                            e.target.files
                                                                ? e.target
                                                                      .files[0]
                                                                : null,
                                                        )
                                                    }
                                                    className="cursor-pointer text-xs file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-[10px] file:font-black file:text-primary file:uppercase hover:file:bg-primary/25"
                                                />
                                            </div>
                                            {errors[
                                                `sertifikat_baru.${index}.file` as any
                                            ] && (
                                                <p className="mt-1 text-[9px] font-bold text-destructive uppercase">
                                                    {
                                                        errors[
                                                            `sertifikat_baru.${index}.file` as any
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[11px] font-black text-primary-foreground uppercase shadow-lg transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />{' '}
                                {processing
                                    ? 'Menyimpan Berkas...'
                                    : 'Simpan Semua Sertifikat Baru'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

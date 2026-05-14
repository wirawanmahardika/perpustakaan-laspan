import React, { useMemo } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    FileText,
    Image as ImageIcon,
    Video,
    BarChart3,
    Trash2,
    FileIcon,
    ExternalLink,
    Plus,
    Loader2,
} from 'lucide-react';
import { BuktiDokumen } from '@/types/library';

interface Props {
    documents: BuktiDokumen[];
    title?: string;
    // Props tambahan untuk keperluan upload
    documentable_id: number;
    documentable_type: string;
}

export default function DocumentManager({
    documents,
    title = 'Arsip Dokumen',
    documentable_id,
    documentable_type,
}: Props) {
    // --- FORM LOGIC ---
    const { data, setData, post, processing, errors, reset } = useForm({
        label_bukti: '',
        tipe_file: 'foto',
        file: null as File | null,
        documentable_id: documentable_id,
        documentable_type: documentable_type,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dokumen', {
            onSuccess: () => reset('label_bukti', 'file'),
            forceFormData: true, // Wajib untuk upload file
        });
    };

    // --- DISPLAY LOGIC ---
    const groupedDocs = useMemo(() => {
        return documents.reduce(
            (acc, doc) => {
                const key = doc.tipe_file;
                if (!acc[key]) acc[key] = [];
                acc[key].push(doc);
                return acc;
            },
            {} as Record<string, BuktiDokumen[]>,
        );
    }, [documents]);

    const handleDelete = (id: number) => {
        if (confirm('Hapus dokumen ini secara permanen?')) {
            router.delete('dokumen/' + id);
        }
    };

    const typeConfig: any = {
        foto: {
            icon: <ImageIcon className="h-4 w-4" />,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
        },
        video: {
            icon: <Video className="h-4 w-4" />,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
        },
        pdf_scan: {
            icon: <FileText className="h-4 w-4" />,
            color: 'text-red-500',
            bg: 'bg-red-500/10',
        },
        infografis: {
            icon: <BarChart3 className="h-4 w-4" />,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
        },
    };

    return (
        <div className="space-y-10 p-4 md:p-8">
            <Head title="Manajemen Dokumen" />

            {/* Header Section */}
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 md:flex-row md:items-end">
                <div>
                    <h1 className="text-2xl font-[1000] tracking-tighter uppercase md:text-3xl">
                        {title}
                    </h1>
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        Bukti fisik dan lampiran pendukung
                    </p>
                </div>
            </div>

            {/* --- UPLOAD FORM SECTION --- */}
            <form
                onSubmit={submit}
                className="rounded-2xl border border-dashed border-border bg-muted/30 p-6"
            >
                <div className="mb-4 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <h2 className="text-[10px] font-black tracking-[0.2em] uppercase">
                        Tambah Dokumen Baru
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {/* Input Label */}
                    <div className="space-y-1">
                        <input
                            type="text"
                            placeholder="NAMA DOKUMEN (CONTOH: FOTO KEGIATAN)"
                            className="w-full rounded-lg border-border bg-background text-[10px] font-bold tracking-wider uppercase focus:ring-primary"
                            value={data.label_bukti}
                            onChange={(e) =>
                                setData('label_bukti', e.target.value)
                            }
                        />
                        {errors.label_bukti && (
                            <p className="text-[9px] font-bold text-destructive">
                                {errors.label_bukti}
                            </p>
                        )}
                    </div>

                    {/* Input Tipe */}
                    <div className="space-y-1">
                        <select
                            className="w-full rounded-lg border-border bg-background text-[10px] font-bold tracking-wider uppercase focus:ring-primary"
                            value={data.tipe_file}
                            onChange={(e) =>
                                setData('tipe_file', e.target.value as any)
                            }
                        >
                            <option value="foto">FOTO</option>
                            <option value="video">VIDEO</option>
                            <option value="pdf_scan">PDF / SCAN</option>
                            <option value="infografis">INFOGRAFIS</option>
                        </select>
                    </div>

                    {/* Input File */}
                    <div className="space-y-1">
                        <input
                            type="file"
                            className="w-full text-[10px] font-bold uppercase file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-[10px] file:font-black file:text-primary-foreground file:uppercase"
                            onChange={(e) =>
                                setData(
                                    'file',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                        />
                        {errors.file && (
                            <p className="text-[9px] font-bold text-destructive">
                                {errors.file}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center justify-center gap-2 rounded-lg bg-foreground py-2 text-[10px] font-black tracking-[0.2em] text-background uppercase transition-all hover:opacity-90 disabled:opacity-50"
                    >
                        {processing ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                            <Plus className="h-3 w-3" />
                        )}
                        Simpan Dokumen
                    </button>
                </div>
            </form>

            {/* --- LIST SECTION --- */}
            {Object.keys(groupedDocs).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <FileIcon className="h-12 w-12 opacity-20" />
                    <p className="mt-4 text-[10px] font-black tracking-widest uppercase">
                        Tidak ada dokumen ditemukan
                    </p>
                </div>
            ) : (
                Object.entries(groupedDocs).map(([type, items]) => (
                    <section key={type} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`rounded-lg p-2 ${typeConfig[type]?.bg}`}
                            >
                                <span className={typeConfig[type]?.color}>
                                    {typeConfig[type]?.icon}
                                </span>
                            </div>
                            <h2 className="text-xs font-black tracking-[0.2em] uppercase">
                                {type.replace('_', ' ')}{' '}
                                <span className="ml-2 text-muted-foreground">
                                    ({items.length})
                                </span>
                            </h2>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {items.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
                                >
                                    <div className="flex aspect-video w-full items-center justify-center overflow-hidden bg-muted/50">
                                        {doc.tipe_file === 'foto' ||
                                        doc.tipe_file === 'infografis' ? (
                                            <img
                                                src={doc.file_url}
                                                alt={doc.label_bukti}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 opacity-40">
                                                {
                                                    typeConfig[doc.tipe_file]
                                                        ?.icon
                                                }
                                                <span className="text-[8px] font-bold tracking-widest uppercase">
                                                    {doc.tipe_file}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="line-clamp-1 text-[10px] font-black tracking-tight text-foreground uppercase">
                                            {doc.label_bukti}
                                        </h3>
                                        <p className="mt-1 text-[9px] font-bold text-muted-foreground uppercase italic">
                                            Uploaded{' '}
                                            {new Date(
                                                doc.created_at!,
                                            ).toLocaleDateString('id-ID')}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2">
                                            <a
                                                href={doc.file_url}
                                                target="_blank"
                                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-2 text-[8px] font-black tracking-widest uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
                                            >
                                                <ExternalLink className="h-3 w-3" />{' '}
                                                Lihat
                                            </a>
                                            <button
                                                onClick={() =>
                                                    handleDelete(doc.id)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-destructive/20 text-destructive transition-colors hover:bg-destructive hover:text-white"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))
            )}
        </div>
    );
}

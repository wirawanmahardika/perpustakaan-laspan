import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import {
    Upload,
    FileText,
    Trash2,
    Search,
    Filter,
    Image as ImageIcon,
    File,
} from 'lucide-react';
import { Document } from '@/types/library';

export default function DocumentIndex({
    documents,
}: {
    documents: Document[];
}) {
    const [filter, setFilter] = useState('all');
    const categories = [
        'koleksi',
        'sarpras',
        'layanan',
        'tenaga',
        'penyelenggaraan',
        'pengelolaan',
        'inovasi',
        'dampak',
    ];

    const { data, setData, post, processing, reset, errors } = useForm({
        file: null as File | null,
        kategori: 'penyelenggaraan',
        keterangan: '',
    });

    const filteredDocs =
        filter === 'all'
            ? documents
            : documents.filter((d) => d.kategori === filter);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/documents', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Pusat Bukti Fisik" />
            <div className="space-y-8 p-4 md:p-8">
                <div>
                    <h1 className="text-2xl font-[1000] tracking-tighter uppercase">
                        Pusat Bukti Fisik
                    </h1>
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        Arsip Dokumen Akreditasi Perpustakaan
                    </p>
                </div>

                {/* Form Upload Cepat */}
                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 items-end gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-4"
                >
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-muted-foreground uppercase">
                            Pilih File (Gambar/PDF)
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData(
                                    'file',
                                    e.target.files ? e.target.files[0] : null,
                                )
                            }
                            className="w-full text-xs"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-muted-foreground uppercase">
                            Kategori Dimensi
                        </label>
                        <select
                            value={data.kategori}
                            onChange={(e) =>
                                setData('kategori', e.target.value as any)
                            }
                            className="w-full rounded-lg border-input bg-muted/30 py-2 text-xs"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-muted-foreground uppercase">
                            Keterangan Dokumen
                        </label>
                        <input
                            value={data.keterangan}
                            onChange={(e) =>
                                setData('keterangan', e.target.value)
                            }
                            placeholder="Contoh: Foto Gedung Depan"
                            className="w-full rounded-lg border-input bg-muted/30 px-3 py-2 text-xs"
                        />
                    </div>
                    <button
                        disabled={processing}
                        className="rounded-lg bg-primary py-2 text-[10px] font-black text-primary-foreground uppercase hover:brightness-110"
                    >
                        {processing ? 'Uploading...' : 'Unggah Bukti'}
                    </button>
                </form>

                {/* Filter Tab */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`rounded-full border px-4 py-2 text-[9px] font-black uppercase transition-all ${filter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background'}`}
                    >
                        Semua
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`rounded-full border px-4 py-2 text-[9px] font-black uppercase transition-all ${filter === cat ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid Dokumen */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {filteredDocs.map((doc) => (
                        <div
                            key={doc.id}
                            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex aspect-square items-center justify-center overflow-hidden bg-muted">
                                {doc.file_path.endsWith('.pdf') ? (
                                    <FileText className="h-12 w-12 text-muted-foreground" />
                                ) : (
                                    <img
                                        src={`/storage/${doc.file_path}`}
                                        className="h-full w-full object-cover"
                                        alt={doc.keterangan}
                                    />
                                )}
                            </div>
                            <div className="space-y-1 p-3">
                                <p className="truncate text-[10px] font-bold uppercase">
                                    {doc.keterangan}
                                </p>
                                <p className="text-[8px] font-black text-primary uppercase">
                                    {doc.kategori}
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    router.delete('/documents/' + doc.id)
                                }
                                className="absolute top-2 right-2 rounded-lg bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

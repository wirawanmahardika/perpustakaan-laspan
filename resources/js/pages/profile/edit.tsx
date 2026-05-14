import { Head, useForm } from '@inertiajs/react';
import {
    Save,
    Building2,
    MapPin,
    Phone,
    Info,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Hash,
    Calendar,
    FileText,
    User,
    Maximize,
    Users,
    Globe,
} from 'lucide-react';
import * as Label from '@radix-ui/react-label';
import { ProfilPerpus } from '@/types/library';
import { useState } from 'react';

export default function EditProfile({ profile }: { profile: ProfilPerpus }) {
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    // Menyesuaikan dengan kolom di migration 'profil_perpus'
    const { data, setData, put, processing, errors } = useForm({
        nama_perpustakaan: profile?.nama_perpustakaan ?? '',
        npp: profile?.npp ?? '',
        alamat: profile?.alamat ?? '',
        desa_kelurahan: profile?.desa_kelurahan ?? '',
        kecamatan: profile?.kecamatan ?? '',
        kabupaten_kota: profile?.kabupaten_kota ?? '',
        provinsi: profile?.provinsi ?? '',
        kontak: profile?.kontak ?? '',
        tahun_berdiri: profile?.tahun_berdiri ?? new Date().getFullYear(),
        nomor_sk: profile?.nomor_sk ?? '',
        tanggal_operasi_efektif: profile?.tanggal_operasi_efektif ?? '',
        nama_petugas: profile?.nama_petugas ?? '',
        nama_penanggung_jawab: profile?.nama_penanggung_jawab ?? '',
        sifat_bangunan: profile?.sifat_bangunan ?? 'sendiri',
        luas_wilayah: profile?.luas_wilayah ?? 0,
        jumlah_penduduk: profile?.jumlah_penduduk ?? 0,
        jarak_ke_kabkota: profile?.jarak_ke_kabkota ?? 0,
        mata_pencaharian_utama: profile?.mata_pencaharian_utama ?? [],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Endpoint disesuaikan dengan route singleton perpustakaan Anda
        put('/profile', {
            onSuccess: () => {
                setMessage({
                    type: 'success',
                    text: 'Data profil perpustakaan berhasil diperbarui!',
                });
                setTimeout(() => setMessage(null), 3000);
            },
            onError: () => {
                setMessage({
                    type: 'error',
                    text: 'Terjadi kesalahan. Mohon periksa kembali inputan Anda.',
                });
            },
        });
    };

    return (
        <>
            <Head title="Edit Profil Perpustakaan" />
            <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
                <div className="mb-8 border-b border-border pb-5">
                    <h1 className="text-2xl font-[1000] tracking-tighter uppercase md:text-3xl">
                        Identitas Unit
                    </h1>
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        Sesuai Instrumen Penilaian Perpustakaan 2025
                    </p>
                </div>

                {message && (
                    <div
                        className={`mb-6 flex items-center gap-3 rounded-xl border p-4 shadow-sm ${message.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' : 'border-destructive/20 bg-destructive/10 text-destructive'}`}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="text-xs font-bold uppercase">
                            {message.text}
                        </span>
                    </div>
                )}

                <form onSubmit={submit} className="grid gap-8 lg:grid-cols-12">
                    <div className="space-y-8 lg:col-span-8">
                        <Section title="I. Identitas Dasar">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Nama Resmi Perpustakaan"
                                    icon={<Building2 className="h-4 w-4" />}
                                    value={data.nama_perpustakaan}
                                    onChange={(v: string) =>
                                        setData('nama_perpustakaan', v)
                                    }
                                    error={errors.nama_perpustakaan}
                                />
                                <FormInput
                                    label="NPP (Nomor Pokok Perpustakaan)"
                                    icon={<Hash className="h-4 w-4" />}
                                    value={data.npp}
                                    onChange={(v: string) => setData('npp', v)}
                                    error={errors.npp}
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Nama Petugas"
                                    icon={<User className="h-4 w-4" />}
                                    value={data.nama_petugas}
                                    onChange={(v: string) =>
                                        setData('nama_petugas', v)
                                    }
                                />
                                <FormInput
                                    label="Penanggung Jawab (Kepala)"
                                    icon={<User className="h-4 w-4" />}
                                    value={data.nama_penanggung_jawab}
                                    onChange={(v: string) =>
                                        setData('nama_penanggung_jawab', v)
                                    }
                                />
                            </div>
                        </Section>

                        <Section title="II. Legalitas & Operasional">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Nomor SK"
                                    icon={<FileText className="h-4 w-4" />}
                                    value={data.nomor_sk}
                                    onChange={(v: string) =>
                                        setData('nomor_sk', v)
                                    }
                                    error={errors.nomor_sk}
                                />
                                <FormInput
                                    label="Tahun Berdiri"
                                    icon={<Calendar className="h-4 w-4" />}
                                    type="number"
                                    value={data.tahun_berdiri}
                                    onChange={(v: string) =>
                                        setData('tahun_berdiri', parseInt(v))
                                    }
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Tanggal Operasi Efektif"
                                    icon={<Calendar className="h-4 w-4" />}
                                    type="date"
                                    value={data.tanggal_operasi_efektif}
                                    onChange={(v: string) =>
                                        setData('tanggal_operasi_efektif', v)
                                    }
                                />
                                <div className="grid gap-2">
                                    <Label.Root className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                        Sifat Bangunan
                                    </Label.Root>
                                    <select
                                        value={data.sifat_bangunan}
                                        onChange={(e) =>
                                            setData(
                                                'sifat_bangunan',
                                                e.target.value as
                                                    | 'gabung'
                                                    | 'sendiri',
                                            )
                                        }
                                        className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
                                    >
                                        <option value="sendiri">
                                            Mandiri / Berdiri Sendiri
                                        </option>
                                        <option value="gabung">
                                            Gabung Dengan Bangunan Lain
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </Section>

                        <Section title="III. Lokasi & Wilayah">
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Provinsi"
                                    icon={<MapPin className="h-4 w-4" />}
                                    value={data.provinsi}
                                    onChange={(v: string) =>
                                        setData('provinsi', v)
                                    }
                                />
                                <FormInput
                                    label="Kabupaten / Kota"
                                    icon={<MapPin className="h-4 w-4" />}
                                    value={data.kabupaten_kota}
                                    onChange={(v: string) =>
                                        setData('kabupaten_kota', v)
                                    }
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Kecamatan"
                                    icon={<MapPin className="h-4 w-4" />}
                                    value={data.kecamatan}
                                    onChange={(v: string) =>
                                        setData('kecamatan', v)
                                    }
                                />
                                <FormInput
                                    label="Desa / Kelurahan"
                                    icon={<MapPin className="h-4 w-4" />}
                                    value={data.desa_kelurahan}
                                    onChange={(v: string) =>
                                        setData('desa_kelurahan', v)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label.Root className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                    Alamat Lengkap
                                </Label.Root>
                                <textarea
                                    className="min-h-[80px] w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData('alamat', e.target.value)
                                    }
                                />
                            </div>
                        </Section>

                        <Section title="IV. Data Geografis & Sosio-Ekonomi">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Luas Wilayah"
                                    icon={<Maximize className="h-4 w-4" />}
                                    type="number"
                                    step="0.01"
                                    value={data.luas_wilayah}
                                    onChange={(v: string) =>
                                        setData('luas_wilayah', parseFloat(v))
                                    }
                                />
                                <FormInput
                                    label="Jarak ke Kab/Kota (KM)"
                                    icon={<MapPin className="h-4 w-4" />}
                                    type="number"
                                    step="0.1"
                                    value={data.jarak_ke_kabkota}
                                    onChange={(v: string) =>
                                        setData(
                                            'jarak_ke_kabkota',
                                            parseFloat(v),
                                        )
                                    }
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Jumlah Penduduk"
                                    icon={<Users className="h-4 w-4" />}
                                    type="number"
                                    value={data.jumlah_penduduk}
                                    onChange={(v: string) =>
                                        setData('jumlah_penduduk', parseInt(v))
                                    }
                                />
                                <div className="grid gap-2">
                                    <Label.Root className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                        Mata Pencaharian Utama (Pisahkan Koma)
                                    </Label.Root>
                                    <div className="group relative">
                                        <Info className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                                        <input
                                            className="w-full rounded-xl border border-input bg-muted/20 px-11 py-3 text-sm outline-none focus:border-primary"
                                            value={data.mata_pencaharian_utama.join(
                                                ', ',
                                            )}
                                            onChange={(e) =>
                                                setData(
                                                    'mata_pencaharian_utama',
                                                    e.target.value
                                                        .split(',')
                                                        .map((s) => s.trim()),
                                                )
                                            }
                                            placeholder="Tani, Dagang, Buruh..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>

                    <div className="space-y-6 lg:col-span-4">
                        <div className="sticky top-6 space-y-6">
                            <Section title="Kontak & Media">
                                <FormInput
                                    label="Kontak Digital (Email/WA/Sosmed)"
                                    icon={<Globe className="h-4 w-4" />}
                                    value={data.kontak}
                                    onChange={(v: string) =>
                                        setData('kontak', v)
                                    }
                                    placeholder="Email / IG / Web"
                                />
                            </Section>

                            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 text-xs font-black tracking-[0.2em] text-primary-foreground uppercase transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {processing ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Perbarui Profil'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

// Sub-komponen tetap sama seperti sebelumnya (Section, FormInput)

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
            <h2 className="border-l-4 border-primary pl-3 text-[11px] font-black tracking-[0.2em] text-primary uppercase">
                {title}
            </h2>
            <div className="space-y-5">{children}</div>
        </div>
    );
}

// Sub-komponen FormInput agar kode tidak repetitif
function FormInput({
    label,
    icon,
    value,
    onChange,
    error,
    type = 'text',
    placeholder,
    step,
}: any) {
    return (
        <div className="grid gap-2">
            <Label.Root className="ml-1 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                {label}
            </Label.Root>
            <div className="group relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                    {icon}
                </div>
                <input
                    type={type}
                    step={step}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-xl border border-input bg-muted/20 px-11 py-3 text-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:text-white"
                />
            </div>
            {error && (
                <p className="text-[9px] font-bold tracking-tighter text-destructive uppercase">
                    {error}
                </p>
            )}
        </div>
    );
}

EditProfile.layout = (page: React.ReactNode) => ({
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Profil Perpustakaan', href: '#' },
    ],
    children: page,
});

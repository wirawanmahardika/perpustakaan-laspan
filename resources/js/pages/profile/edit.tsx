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
    Mail,
    Printer,
} from 'lucide-react';
import * as Label from '@radix-ui/react-label';
import { ProfilPerpus } from '@/types/library';
import { profileEditPut } from '@/routes/admin';
import { useState } from 'react';

export default function EditProfile({ profile }: { profile: ProfilPerpus }) {
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const { data, setData, put, processing, errors } = useForm({
        id: profile?.id ?? '',
        nama_perpus: profile?.nama_perpus ?? '',
        npp: profile?.npp ?? '',
        desa_kelurahan: profile?.desa_kelurahan ?? '',
        kecamatan: profile?.kecamatan ?? '',
        kabupaten_kota: profile?.kabupaten_kota ?? '',
        provinsi: profile?.provinsi ?? '',
        alamat: profile?.alamat ?? '',
        media_sosial: profile?.media_sosial ?? '',
        telp: profile?.telp ?? '',
        fax: profile?.fax ?? '',
        email: profile?.email ?? '',
        tahun_berdiri: profile?.tahun_berdiri ?? new Date().getFullYear(),
        nomor_sk_pendirian: profile?.nomor_sk_pendirian ?? '',
        bulan_tahun_efektif: profile?.bulan_tahun_efektif ?? '',
        nama_petugas: profile?.nama_petugas ?? '',
        nama_penanggung_jawab: profile?.nama_penanggung_jawab ?? '',
        sifat_bangunan: profile?.sifat_bangunan ?? 'mandiri',
        jumlah_anggota: profile?.jumlah_anggota ?? 0,
        luas_wilayah_km2: profile?.luas_wilayah_km2 ?? 0,
        jumlah_penduduk: profile?.jumlah_penduduk ?? 0,
        jarak_ke_perpus_kab: profile?.jarak_ke_perpus_kab ?? 0,
        // Karena mata_pencaharian_utama adalah array, kita handle perubahannya secara khusus
        mata_pencaharian_utama: profile?.mata_pencaharian_utama ?? [],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(profileEditPut().url, {
            onSuccess: () => {
                setMessage({
                    type: 'success',
                    text: 'Profil berhasil disimpan!',
                });
                setTimeout(() => setMessage(null), 3000);
            },
            onError: (err) => {
                console.log(err);
                setMessage({
                    type: 'error',
                    text: 'Gagal menyimpan. Periksa kembali form.',
                });
            },
        });
    };

    return (
        <>
            <Head title="Edit Profil Perpustakaan" />

            <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
                {/* Header */}
                <div className="mb-8 border-b border-border pb-5">
                    <h1 className="text-2xl font-[1000] tracking-tighter uppercase md:text-3xl">
                        Identitas Unit
                    </h1>
                    <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        Sesuai Instrumen Akreditasi Perpustakaan
                    </p>
                </div>

                {/* Notifikasi */}
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
                        {/* SECTION 1: Identitas Utama */}
                        <Section title="I. Identitas Dasar">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Nama Resmi Perpustakaan"
                                    icon={<Building2 />}
                                    value={data.nama_perpus}
                                    onChange={(v: any) =>
                                        setData('nama_perpus', v)
                                    }
                                    error={errors.nama_perpus}
                                />
                                <FormInput
                                    label="NPP (Nomor Pokok Perpustakaan)"
                                    icon={<Hash />}
                                    value={data.npp}
                                    onChange={(v: any) => setData('npp', v)}
                                    error={errors.npp}
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Nama Petugas"
                                    icon={<User />}
                                    value={data.nama_petugas}
                                    onChange={(v: any) =>
                                        setData('nama_petugas', v)
                                    }
                                />
                                <FormInput
                                    label="Nama Penanggung Jawab (Kepala)"
                                    icon={<User />}
                                    value={data.nama_penanggung_jawab}
                                    onChange={(v: any) =>
                                        setData('nama_penanggung_jawab', v)
                                    }
                                />
                            </div>
                        </Section>

                        {/* SECTION 2: Legalitas */}
                        <Section title="II. Legalitas & Operasional">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Nomor SK Pendirian"
                                    icon={<FileText />}
                                    value={data.nomor_sk_pendirian}
                                    onChange={(v: any) =>
                                        setData('nomor_sk_pendirian', v)
                                    }
                                />
                                <FormInput
                                    label="Tahun Berdiri"
                                    icon={<Calendar />}
                                    type="number"
                                    value={data.tahun_berdiri}
                                    onChange={(v: any) =>
                                        setData('tahun_berdiri', v)
                                    }
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Bulan & Tahun Efektif"
                                    icon={<Calendar />}
                                    value={data.bulan_tahun_efektif}
                                    onChange={(v: any) =>
                                        setData('bulan_tahun_efektif', v)
                                    }
                                    placeholder="Contoh: Januari 2024"
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
                                                    | 'mandiri',
                                            )
                                        }
                                        className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
                                    >
                                        <option value="mandiri">
                                            Mandiri / Berdiri Sendiri
                                        </option>
                                        <option value="gabung">
                                            Gabung Dengan Bangunan Lain
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </Section>

                        {/* SECTION 3: Alamat & Lokasi */}
                        <Section title="III. Lokasi & Wilayah">
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Provinsi"
                                    icon={<MapPin />}
                                    value={data.provinsi}
                                    onChange={(v: any) =>
                                        setData('provinsi', v)
                                    }
                                />
                                <FormInput
                                    label="Kabupaten / Kota"
                                    icon={<MapPin />}
                                    value={data.kabupaten_kota}
                                    onChange={(v: any) =>
                                        setData('kabupaten_kota', v)
                                    }
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormInput
                                    label="Kecamatan"
                                    icon={<MapPin />}
                                    value={data.kecamatan}
                                    onChange={(v: any) =>
                                        setData('kecamatan', v)
                                    }
                                />
                                <FormInput
                                    label="Desa / Kelurahan"
                                    icon={<MapPin />}
                                    value={data.desa_kelurahan}
                                    onChange={(v: any) =>
                                        setData('desa_kelurahan', v)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label.Root className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                    Alamat Lengkap (Jl, No. Rumah, RT/RW)
                                </Label.Root>
                                <textarea
                                    className="min-h-[100px] w-full rounded-xl border border-input bg-muted/20 px-4 py-3 text-sm outline-none focus:border-primary"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData('alamat', e.target.value)
                                    }
                                />
                            </div>
                        </Section>

                        {/* SECTION 4: Data Geografis & Demografis */}
                        <Section title="IV. Statistik Geografis & Sosio-Ekonomi">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Luas Wilayah (KM2)"
                                    icon={<Maximize />}
                                    type="number"
                                    step="0.01"
                                    value={data.luas_wilayah_km2}
                                    onChange={(v: any) =>
                                        setData('luas_wilayah_km2', v)
                                    }
                                />
                                <FormInput
                                    label="Jarak ke Perpus Kab (KM)"
                                    icon={<MapPin />}
                                    type="number"
                                    step="0.1"
                                    value={data.jarak_ke_perpus_kab}
                                    onChange={(v: any) =>
                                        setData('jarak_ke_perpus_kab', v)
                                    }
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormInput
                                    label="Jumlah Penduduk (Jiwa)"
                                    icon={<Users />}
                                    type="number"
                                    value={data.jumlah_penduduk}
                                    onChange={(v: any) =>
                                        setData('jumlah_penduduk', v)
                                    }
                                />
                                <FormInput
                                    label="Jumlah Anggota Aktif"
                                    icon={<Users />}
                                    type="number"
                                    value={data.jumlah_anggota}
                                    onChange={(v: any) =>
                                        setData('jumlah_anggota', v)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label.Root className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                    Mata Pencaharian Utama (Pisahkan dengan
                                    koma, Maks 5)
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
                                        placeholder="Petani, Buruh, PNS..."
                                    />
                                </div>
                            </div>
                        </Section>
                    </div>

                    {/* SIDEBAR: Kontak & Aksi */}
                    <div className="space-y-6 lg:col-span-4">
                        <div className="sticky top-6 space-y-6">
                            <Section title="Kontak & Media">
                                <FormInput
                                    label="Email Unit"
                                    icon={<Mail />}
                                    type="email"
                                    value={data.email}
                                    onChange={(v: any) => setData('email', v)}
                                />
                                <FormInput
                                    label="No. Telepon / WhatsApp"
                                    icon={<Phone />}
                                    value={data.telp}
                                    onChange={(v: any) => setData('telp', v)}
                                />
                                <FormInput
                                    label="Nomor Fax"
                                    icon={<Printer />}
                                    value={data.fax}
                                    onChange={(v: any) => setData('fax', v)}
                                />
                                <FormInput
                                    label="Web / Blog / Sosial Media"
                                    icon={<Globe />}
                                    value={data.media_sosial}
                                    onChange={(v: any) =>
                                        setData('media_sosial', v)
                                    }
                                    placeholder="https://..."
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
                                        ? 'Proses Simpan...'
                                        : 'Simpan Data Profil'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

// Sub-komponen Section untuk wrapping group input
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

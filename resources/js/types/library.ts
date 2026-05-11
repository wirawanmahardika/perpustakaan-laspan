export interface Kegiatan {
    id: number;
    profil_perpus_id: number;
    nama_kegiatan: string;
    tanggal_kegiatan: string; // ISO Date string dari backend
    lokasi: string;
    deskripsi_kegiatan: string;
    created_at?: string;
    updated_at?: string;
    // Optional relationship
    laporan?: Laporan;
}

export interface Laporan {
    id: number;
    kegiatan_id: number;
    tanggal_buat: string;
    isi_laporan: string;
    status: 'Draft' | 'Selesai';
    created_at?: string;
    updated_at?: string;
}

// Props interface untuk Komponen React
export interface LibraryProfileProps {
    profile: ProfilPerpus;
    activities: Kegiatan[];
}

export interface ProfilPerpus {
    id: number;
    nama_perpus: string;
    npp: string;
    desa_kelurahan: string;
    kecamatan: string;
    kabupaten_kota: string;
    provinsi: string;
    alamat: string;
    media_sosial: string | null;
    telp: string | null;
    fax: string | null;
    email: string | null;
    tahun_berdiri: number;
    nomor_sk_pendirian: string;
    bulan_tahun_efektif: string;
    nama_petugas: string;
    nama_penanggung_jawab: string;
    sifat_bangunan: 'gabung' | 'mandiri';
    jumlah_anggota: number;
    luas_wilayah_km2: number;
    jumlah_penduduk: number;
    jarak_ke_perpus_kab: number;
    mata_pencaharian_utama: string[]; // Disimpan sebagai JSON di DB, diconvert ke Array oleh Laravel
    created_at?: string;
    updated_at?: string;

    // Relasi (Opsional, jika Anda memanggil with('...'))
    // statistik?: StatistikPerpus[];
    // tata_kelola?: TataKelolaPerpus[];
    // kegiatan?: KegiatanPerpus[];
    // tenaga?: TenagaPerpus[];
}

// export interface StatistikPerpus {
//     id: number;
//     profil_perpus_id: number;
//     tahun_periode: number;
//     jumlah_fiksi: number;
//     jumlah_nonfiksi: number;
//     jumlah_koleksi_digital: number;
//     penambahan_koleksi_tahunan: number;
//     jumlah_buku_dipinjam: number;
//     jumlah_buku_dibaca: number;
//     jumlah_pengunjung: number;
//     analisis_buku_diminati: string | null;
// }

// export interface TataKelolaPerpus {
//     id: number;
//     profil_perpus_id: number;
//     status_kepemilikan_ruang: 'milik_sendiri' | 'sewa';
//     inventaris_sarana: Record<string, any>; // Untuk data JSON fleksibel
//     kebijakan_dokumen: string | null;
//     struktur_organisasi: Record<string, any> | null;
//     program_kerja: string | null;
//     anggaran_tahunan: number;
//     sumber_anggaran: string | null;
//     realisasi_program: string | null;
// }

// export interface KegiatanPerpus {
//     id: number;
//     profil_perpus_id: number;
//     nama_kegiatan: string;
//     jenis_kegiatan: 'layanan' | 'promosi' | 'inovasi' | 'pemberdayaan' | 'kerjasama';
//     sub_jenis_layanan?: 'baca_ditempat' | 'sirkulasi' | 'referensi' | 'literasi' | 'membaca_cepat' | 'berbasis_projek' | 'ekstensi' | 'ramah_anak_disabilitas' | 'inklusif';
//     media_promosi?: 'papan_pengumuman' | 'brosur' | 'banner' | 'poster' | 'seminar' | 'lomba' | 'pameran' | 'penyiaran' | 'jumpa_penulis' | 'medsos';
//     tanggal_pelaksanaan: string;
//     deskripsi_kegiatan: string;
//     pihak_kolaborasi: string | null;
//     testimoni_masyarakat: string | null;
// }

// export interface TenagaPerpus {
//     id: number;
//     profil_perpus_id: number;
//     nama_tenaga: string;
//     no_sk_tenaga: string;
//     sertifikat_kompetensi: string | null;
//     kreativitas_penghargaan: string | null;
// }

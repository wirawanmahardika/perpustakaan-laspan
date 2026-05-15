export interface BuktiDokumen {
    id: number;
    documentable_id: number;
    documentable_type: string;
    label_bukti: string;
    file_path: string;
    tipe_file: 'foto' | 'video' | 'pdf_scan' | 'infografis';

    // file_url biasanya dihasilkan oleh Accessor di Laravel (Storage::url)
    file_url?: string;

    created_at?: string;
    updated_at?: string;
}

export interface Document {
    id: number;
    file_path: string;
    file_url: string;
    keterangan: string;
    kategori:
        | 'koleksi'
        | 'sarpras'
        | 'layanan'
        | 'tenaga'
        | 'penyelenggaraan'
        | 'pengelolaan'
        | 'inovasi'
        | 'dampak';
    created_at: string;
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

export interface Kegiatan {
    id: number;
    nama_kegiatan: string;
    tanggal: string;
    tipe:
        | 'promosi'
        | 'kerjasama'
        | 'pemberdayaan'
        | 'layanan_khusus'
        | 'penghargaan';
    deskripsi: string;
    testimoni?: string;
    pihak_terlibat?: string;
    artikel?: string;
    created_at?: string;
}

export interface ProfilPerpus {
    id: number;
    nama_perpustakaan: string;
    npp?: string;
    alamat: string;
    desa_kelurahan: string;
    kecamatan: string;
    kabupaten_kota: string;
    provinsi: string;
    kontak: string; // Gabungan Telp/Email/Sosmed dari database
    tahun_berdiri: number;
    nomor_sk: string;
    tanggal_operasi_efektif?: string; // Format YYYY-MM-DD
    nama_petugas?: string;
    nama_penanggung_jawab?: string;
    sifat_bangunan: 'gabung' | 'sendiri';
    media_sosial: any[];

    // Data Demografi & Geografis
    luas_wilayah?: number;
    jumlah_penduduk?: number;
    jarak_ke_kabkota?: number;
    mata_pencaharian_utama?: string[]; // Di-cast sebagai array di Laravel

    created_at?: string;
    updated_at?: string;
}

// Props untuk Page
export interface KegiatanIndexProps {
    kegiatan: Kegiatan[];
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

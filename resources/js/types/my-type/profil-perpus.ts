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

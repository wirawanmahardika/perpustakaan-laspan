export interface Stat {
    id: number;
    tahun: number; // Tipe data year di database direpresentasikan sebagai angka (e.g., 2026)
    jumlah_koleksi: number;
    penambahan_koleksi: number;
    jumlah_anggota: number;
    jumlah_pengunjung: number;
    jumlah_peminjaman: number;
    buku_dibaca: number;
    koleksi_fiksi: number;
    koleksi_nonfiksi: number;
    koleksi_digital: number;
    analisis_minat_baca: string | null; // Nullable text kolom
    created_at: string; // Diisi otomatis oleh Laravel timestamps
    updated_at: string; // Diisi otomatis oleh Laravel timestamps
}

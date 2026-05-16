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

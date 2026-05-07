export interface ProfilPerpus {
    id: number;
    nama_perpus: string;
    alamat: string;
    kontak: string;
    deskripsi: string | null;
    created_at?: string;
    updated_at?: string;
}

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

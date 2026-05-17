export interface Document {
    id: number;
    file_path: string;
    file_url: string;
    keterangan: string;
    tipe_file: 'foto' | 'video' | 'pdf_scan' | 'infografis';
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
    updated_at?: string;
}

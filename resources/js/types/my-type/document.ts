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
    updated_at?: string;

    tipe_file: 'foto' | 'video' | 'pdf_scan' | 'infografis';
    label_bukti: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;

    jabatan: string | null;
    pendidikan_terakhir: string | null;
    sertifikat_kompetensi_path: string | null;
    kreativitas_karya: string | null;
    role: 'admin' | 'petugas';
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};

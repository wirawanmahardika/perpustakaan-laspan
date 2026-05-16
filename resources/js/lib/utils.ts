import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export const formatHumanDate = (dateString: string): string => {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        // Validasi jika string bukan format tanggal yang valid
        if (isNaN(date.getTime())) return dateString;

        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    } catch (error) {
        return dateString;
    }
};

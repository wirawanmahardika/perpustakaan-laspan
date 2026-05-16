import React from 'react';

export const StatBox = ({ icon, label, value }: any) => (
    <div className="group flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-600/30 md:gap-5 md:rounded-4xl md:p-8">
        {/* Kontainer Icon yang Responsif */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg transition-colors group-hover:bg-blue-50 md:h-14 md:w-14 md:rounded-2xl md:text-2xl">
            {/* Solusi Error: Gunakan div pembungkus atau casting icon ke ReactElement dengan className */}
            {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<any>, {
                      className:
                          'h-5 w-5 md:h-7 md:w-7 transition-transform group-hover:scale-110',
                  })
                : icon}
        </div>

        <div className="min-w-0 flex-1">
            {/* Label yang lebih kecil dan rapat di mobile */}
            <p className="mb-0.5 truncate text-[8px] font-black tracking-[0.15em] text-slate-400 uppercase md:mb-1 md:text-[10px]">
                {label}
            </p>
            {/* Angka yang menyesuaikan ukuran layar agar tidak terpotong */}
            <p className="text-xl leading-none font-[1000] tracking-tighter text-slate-900 italic md:text-3xl">
                {value.toLocaleString('id-ID')}
            </p>
        </div>
    </div>
);

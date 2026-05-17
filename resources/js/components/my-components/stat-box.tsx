import React from 'react';

export const StatBox = ({ icon, label, value }: any) => (
    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-xs transition-all hover:border-blue-500/30 md:gap-4 md:p-6 dark:border-slate-800/60 dark:bg-slate-900">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:group-hover:bg-blue-900/50">
            {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<any>, {
                      className:
                          'h-6 w-6 transition-transform group-hover:scale-110',
                  })
                : icon}
        </div>

        <div className="min-w-0 flex-1">
            <p className="mb-0.5 truncate text-[9px] font-black tracking-widest text-slate-400 uppercase">
                {label}
            </p>
            <p className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl dark:text-white">
                {typeof value === 'number'
                    ? value.toLocaleString('id-ID')
                    : value}
            </p>
        </div>
    </div>
);

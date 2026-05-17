export const LegendItem = ({ color, label, value }: any) => (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
        <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${color}`} />
            <span className="text-[10px] font-black text-slate-500 uppercase dark:text-slate-400">
                {label}
            </span>
        </div>
        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
            {value?.toLocaleString() || 0} eks
        </span>
    </div>
);

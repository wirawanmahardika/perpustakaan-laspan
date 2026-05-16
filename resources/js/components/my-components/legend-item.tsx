export const LegendItem = ({ color, label, value }: any) => (
    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
        <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${color}`} />
            <span className="text-[10px] font-black text-slate-500 uppercase">
                {label}
            </span>
        </div>
        <span className="text-xs font-bold">{value?.toLocaleString()} eks</span>
    </div>
);

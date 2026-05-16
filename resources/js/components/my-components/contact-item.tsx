export const ContactItem = ({ icon, label, value }: any) => (
    <div className="flex gap-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-blue-400">
            {icon}
        </div>
        <div className="flex flex-col justify-center">
            <p className="mb-1 text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">
                {label}
            </p>
            <p className="text-base leading-tight font-bold">{value || '-'}</p>
        </div>
    </div>
);

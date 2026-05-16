import React from 'react';

export const SocialIcon = ({ href, icon }: { href: string; icon: any }) => (
    <a
        href={href}
        target="_blank"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white transition-all hover:-translate-y-1 hover:bg-blue-600"
    >
        {React.cloneElement(icon, { size: 20 })}
    </a>
);

export default function AppLogo() {
    return (
        <>
            <div className="mr-1 flex w-full items-center justify-center text-center text-xl">
                <div className="flex items-center justify-center gap-x-8 rounded-md text-sidebar-primary-foreground">
                    <img
                        src="logo-noname.png"
                        alt="logo"
                        className="mb-2 w-12"
                    />
                </div>
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Admin Panel
                </span>
            </div>
        </>
    );
}

import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    CalendarDays,
    Library,
    FileArchive,
    ChartAreaIcon,
    User,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, kegiatan, profileEdit, users } from '@/routes/admin';
import type { NavItem } from '@/types';
import { index } from '@/routes/documents';
import { index as StatsIndex } from '@/routes/stats/index';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Stats',
        href: StatsIndex(),
        icon: ChartAreaIcon,
    },
    {
        title: 'Kegiatan',
        href: kegiatan(),
        icon: CalendarDays,
    },
    {
        title: 'Info Perpus',
        href: profileEdit(),
        icon: Library,
    },
    {
        title: 'Documents',
        href: index(),
        icon: FileArchive,
    },
    {
        title: 'Operator',
        href: users(),
        icon: User,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: FolderGit2,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

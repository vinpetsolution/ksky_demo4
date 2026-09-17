import type { NavItem } from '@/components/layouts/NavBar/navItems';

export const isItemActive = (
    item: NavItem,
    pathname: string,
    searchParams: URLSearchParams
): boolean => {
    if (item.children) {
        return item.children.some((child) => pathname === child.href);
    }
    if (item.href.startsWith('/?')) {
        const type = new URLSearchParams(item.href.split('?')[1]).get('type');
        return pathname === '/' && searchParams.get('type') === type;
    }
    return pathname === item.href;
};

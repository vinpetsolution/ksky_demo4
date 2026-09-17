import Link from 'next/link';
import { cn } from '@/utils/classNames';
import { NavDropdown } from './NavDropdown';
import type { NavItem } from './navItems';

interface NavItemWithDropdownProps {
  item: NavItem;
  active: boolean;
  pathname: string;
}

const ARROW_CLASS = cn(
  'text-2xl font-semibold absolute right-2 top-1/2 -translate-y-1/2',
  'inline-flex items-center transition-all duration-300 origin-center',
  'group-hover:scale-x-80 group-hover:scale-y-110 scale-x-60 group-hover:right-1',
  'group-hover:rotate-90'
);

export const NavItemWithDropdown = ({ item, active, pathname }: NavItemWithDropdownProps) => (
  <>
    <Link
      href={item.href}
      className={cn(
        'nav-link flex items-center relative pl-2 pr-7 py-2',
        active && 'text-glow-static'
      )}
    >
      {item.label}
      <span className={ARROW_CLASS}>&gt;</span>
    </Link>
    <NavDropdown items={item.children || []} pathname={pathname} />
  </>
);

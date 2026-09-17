import { cn } from '@/utils/classNames';
import { NavDropdownLink } from './NavDropdownLink';
import type { NavChild } from './navItems';

interface NavDropdownProps {
  items: NavChild[];
  pathname: string;
}

const DROPDOWN_PANEL_CLASS = cn(
  'min-w-[140px]',
  'bg-[#11141d] backdrop-blur-sm',
  'border-t-[3px] border-t-[#ff8c00] shadow-lg'
);

export const NavDropdown = ({ items, pathname }: NavDropdownProps) => (
  <div
    className={cn(
      'absolute left-0 top-full pt-1',
      'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
      'transition-opacity duration-200 z-50'
    )}
  >
    <div className={DROPDOWN_PANEL_CLASS}>
      {items.length > 1 ? (
        <ul className="flex">
          {items.map((item) => (
            <NavDropdownLink key={item.href} child={item} pathname={pathname} />
          ))}
        </ul>
      ) : (
        <ul>
          {items.map((item) => (
            <NavDropdownLink key={item.href} child={item} pathname={pathname} />
          ))}
        </ul>
      )}
    </div>
  </div>
);

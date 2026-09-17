'use client';

import { cn } from '@/utils/classNames';
import type { NavChild } from './navItems';
import { AuthLink } from '@/components/ui/AuthLink';

interface NavDropdownLinkProps {
  child: NavChild;
  pathname: string;
}

const DROPDOWN_LINK_CLASS = cn(
  'nav-link block py-3 px-4 hover:bg-[#29324b] whitespace-nowrap'
);

export const NavDropdownLink = ({ child, pathname }: NavDropdownLinkProps) => (
  <li key={child.href}>
    <AuthLink
      href={child.href}
      className={cn(DROPDOWN_LINK_CLASS, pathname === child.href && 'text-glow-static')}
    >
      {child.label}
    </AuthLink>
  </li>
);

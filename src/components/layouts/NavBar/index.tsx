'use client';

import { cn } from '@/utils/classNames';
import { usePathname, useSearchParams } from 'next/navigation';
import { NAV_ITEMS } from './navItems';
import { NavItemWithDropdown } from './NavItemWithDropdown';
import { isItemActive } from '@/utils/helper';
import { AuthLink } from '@/components/ui/AuthLink';
import { useMailboxCounts } from '@/hooks/useMailboxCounts';

const NavBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { qnaUnread } = useMailboxCounts();

  return (
    <nav className="flex w-full items-center justify-center">
      <ul className="flex items-center justify-center gap-x-0.5 text-[13px] font-semibold xl:gap-x-1 xl:text-sm">
        {NAV_ITEMS.map((item) => {
          const active = isItemActive(item, pathname, searchParams);
          const isInquiries = item.href === '/inquiries';
          return (
            <li
              key={item.label}
              className="group relative flex items-center"
            >
              {item.children ? (
                <NavItemWithDropdown item={item} active={active} pathname={pathname} />
              ) : (
                <AuthLink
                  href={item.href}
                  className={cn('nav-link whitespace-nowrap px-1.5 py-2 xl:px-2', active && 'text-glow-static')}
                >
                  <span className="inline-flex items-center gap-1">
                    {item.label}
                    {isInquiries && qnaUnread > 0 && (
                      <span className="inline-flex h-4.5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] leading-none font-bold text-white">
                        +{qnaUnread > 99 ? '99' : qnaUnread}
                      </span>
                    )}
                  </span>
                </AuthLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;

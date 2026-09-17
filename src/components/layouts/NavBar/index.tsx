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
    <nav
      className={cn(
        'absolute bottom-0 left-1/2 -translate-x-1/2',
        'flex justify-center items-center w-full',
        'z-50'
      )}
    >
      <ul className="flex items-center gap-1.5 xl:gap-2 text-base font-semibold">
        {NAV_ITEMS.map((item) => {
          const active = isItemActive(item, pathname, searchParams);
          const isInquiries = item.href === '/inquiries';
          return (
            <li
              key={item.label}
              className={cn('relative group flex items-center h-14')}
            >
              {item.children ? (
                <NavItemWithDropdown item={item} active={active} pathname={pathname} />
              ) : (
                <AuthLink
                  href={item.href}
                  className={cn('nav-link px-3 py-2', active && 'text-glow-static')}
                >
                  <span className="inline-flex items-center gap-1">
                    {item.label}
                    {isInquiries && qnaUnread > 0 && (
                      <span className="inline-flex min-w-[1.25rem] h-4.5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold leading-none text-white">
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

'use client';

import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import { cn } from '@/utils/classNames';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const FIRST_PAGES_COUNT = 4;
const LAST_PAGES_COUNT = 4;

type PaginationConfig = {
  pages: number[];
  showEllipsisBefore: boolean;
  showEllipsisAfter: boolean;
  lastPage: number;
};

const getPageNumbers = (currentPage: number, totalPages: number): PaginationConfig => {
  const lastPage = totalPages;

  if (totalPages <= FIRST_PAGES_COUNT) {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return { pages, showEllipsisBefore: false, showEllipsisAfter: false, lastPage };
  }

  if (currentPage <= FIRST_PAGES_COUNT) {
    const pages: number[] = [];
    for (let i = 1; i <= FIRST_PAGES_COUNT; i++) pages.push(i);
    return { pages, showEllipsisBefore: false, showEllipsisAfter: true, lastPage };
  }

  if (currentPage >= totalPages - LAST_PAGES_COUNT + 1) {
    const pages: number[] = [];
    const start = totalPages - LAST_PAGES_COUNT + 1;
    for (let i = start; i <= totalPages; i++) pages.push(i);
    return { pages, showEllipsisBefore: true, showEllipsisAfter: false, lastPage };
  }

  const pages = [currentPage - 1, currentPage, currentPage + 1];
  return { pages, showEllipsisBefore: true, showEllipsisAfter: true, lastPage };
};

const navButtonClass = cn(
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-md md:h-10 md:w-10 md:rounded-lg',
  'bg-[#29324b] text-gray',
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const canGoFirst = currentPage > 1;
  const canGoLast = currentPage < totalPages;

  if (totalPages <= 0) return null;

  const { pages, showEllipsisBefore, showEllipsisAfter, lastPage } = getPageNumbers(
    currentPage,
    totalPages
  );

  return (
    <div className={cn('inline-flex items-center gap-1 md:gap-2', className)}>
      <Button
        variant="darkBlue"
        disabled={!canGoFirst}
        onClick={() => onPageChange(1)}
        className={navButtonClass}
        aria-label="Trang đầu"
      >
        <HiChevronDoubleLeft className="text-base md:text-lg" />
      </Button>

      <Button
        variant="darkBlue"
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        className={navButtonClass}
        aria-label="Trang trước"
      >
        <HiChevronLeft className="text-base md:text-lg" />
      </Button>

      <div className="flex items-center gap-1 px-0.5 md:gap-2 md:px-1">
        {showEllipsisBefore && (
          <>
            <Button
              variant="transparent"
              onClick={() => onPageChange(1)}
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors md:h-10 md:w-10 md:text-sm',
                1 === currentPage
                  ? 'border-2 border-[#ff8c00] text-[#ff8c00] hover:text-[#ff8c00]/80 bg-transparent'
                  : 'text-gray hover:text-white cursor-pointer hover:bg-[#29324b] hover:border-[#efefef] hover:border-2'
              )}
              aria-label="Trang 1"
              aria-current={1 === currentPage ? 'page' : undefined}
            >
              1
            </Button>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center text-xs text-gray rounded-full transition-colors hover:text-white cursor-pointer hover:bg-[#29324b] hover:border-[#efefef] hover:border-2 md:h-10 md:w-10 md:text-sm">
              ...
            </span>
          </>
        )}
        {pages.map((page) => (
          <Button
            key={page}
            variant="transparent"
            onClick={() => onPageChange(page)}
            className={cn(
              'flex h-8 w-8 p-0! shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors md:h-10 md:w-10 md:text-sm',
              page === currentPage
                ? 'border-2 border-[#ff8c00] text-[#ff8c00] hover:text-[#ff8c00]/80 bg-transparent'
                : 'text-gray hover:text-white cursor-pointer hover:bg-[#29324b] hover:border-[#efefef] hover:border-2'
            )}
            aria-label={`Trang ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}
        {showEllipsisAfter && (
          <>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center text-xs text-gray rounded-full transition-colors hover:text-white cursor-pointer hover:bg-[#29324b] hover:border-[#efefef] hover:border-2 md:h-10 md:w-10 md:text-sm">
              ...
            </span>
            <Button
              variant="transparent"
              onClick={() => onPageChange(lastPage)}
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors md:h-10 md:w-10 md:text-sm',
                lastPage === currentPage
                  ? 'border-2 border-[#ff8c00] text-[#ff8c00] hover:text-[#ff8c00]/80 bg-transparent'
                  : 'text-gray hover:text-white cursor-pointer hover:bg-[#29324b] hover:border-[#efefef] hover:border-2'
              )}
              aria-label={`Trang ${lastPage}`}
              aria-current={lastPage === currentPage ? 'page' : undefined}
            >
              {lastPage}
            </Button>
          </>
        )}
      </div>

      <Button
        type="button"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={navButtonClass}
        aria-label="Trang sau"
      >
        <HiChevronRight className="text-base md:text-lg" />
      </Button>

      <Button
        variant="darkBlue"
        disabled={!canGoLast}
        onClick={() => onPageChange(totalPages)}
        className={navButtonClass}
        aria-label="Trang cuối"
      >
        <HiChevronDoubleRight className="text-base md:text-lg" />
      </Button>
    </div>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };

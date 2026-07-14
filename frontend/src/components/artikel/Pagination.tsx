import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function getVisiblePages(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const sortedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return sortedPages.reduce<PageItem[]>((items, page, index) => {
    const previousPage = sortedPages[index - 1];
    if (previousPage && page - previousPage > 1) {
      items.push(previousPage === 1 ? 'start-ellipsis' : 'end-ellipsis');
    }
    items.push(page);
    return items;
  }, []);
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="flex justify-center" aria-label="Navigasi artikel">
      <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            currentPage === 1
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-700 hover:bg-[#fff8e6] hover:text-[#B69133]'
          }`}
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1">
          {visiblePages.map((page) =>
            typeof page === 'number' ? (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`h-10 min-w-[2.5rem] rounded-lg px-3 text-sm font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-[#171717] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#fff8e6] hover:text-[#B69133]'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span key={page} className="px-2 text-sm font-semibold text-gray-400">
                ...
              </span>
            ),
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            currentPage === totalPages
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-700 hover:bg-[#fff8e6] hover:text-[#B69133]'
          }`}
          aria-label="Halaman berikutnya"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}

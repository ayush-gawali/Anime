import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Pagination({ paginationInfo, currentFilters, searchQuery, onPageChange }) {
    const { currentPage = 1, totalPages = 1, hasNext, hasPrev } = paginationInfo;
    const maxVisiblePages = 5;

    const handlePageChange = (page) => {
        onPageChange({
            page,
            ...currentFilters,
            search: searchQuery || undefined
        });
    };

    const getVisiblePages = () => {
        const pages = [];
        let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 bg-gray-900/50 backdrop-blur-xl px-8 py-4 rounded-2xl border border-gray-800 shadow-2xl shadow-black/30">
            {/* Previous */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrev}
                className="group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white/10 hover:bg-white/20 border border-gray-700 hover:border-gray-500"
            >
                <FaChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Previous
            </button>

            {/* Page numbers */}
            {getVisiblePages().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2.5 min-w-[44px] text-sm font-semibold rounded-xl transition-all shadow-md ${currentPage === page
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 hover:shadow-lg'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNext}
                className="group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white/10 hover:bg-white/20 border border-gray-700 hover:border-gray-500"
            >
                Next
                <FaChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Page info */}
            <div className="ml-6 pl-6 border-l border-gray-700">
                <span className="text-sm text-gray-400 font-medium">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="text-xs text-gray-500 mt-1">{paginationInfo.totalItems || 0} total animes</div>
            </div>
        </div>
    );
}

import { useState, useEffect , useCallback } from 'react';

import Card from '../components/Card';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import { getAnimes } from '../services/user.api';


export default function Catalog() {

  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState({});


  const fetchAnimeList = useCallback(async (filters = {}) => {
    setLoading(true);
    const params = {
      page: filters.page || 1,
      limit: 8,
      ...currentFilters, // No need
      ...filters,
      search: filters.clearSerachQuery ? "" : searchQuery || undefined,
      ...(filters.genres && { genres: filters.genres.join(',') })
    };
    const response = await getAnimes(params);
    if (response?.data.success) {
      setAnimeList(response.data.data);
      setPaginationInfo(response.data.pagination)
      setLoading(false)
    }
  }, [currentFilters, searchQuery]);

  const handleSearch = () => {
    fetchAnimeList({ page: 1 });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchAnimeList({ page: 1, clearSerachQuery: true });
  };

  const applyFilters = (newFilters) => {
    setCurrentFilters(newFilters);
    fetchAnimeList({ page: 1, ...newFilters });
    setMobileFiltersOpen(false);
  };

  useEffect(() => {
    fetchAnimeList();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-gray-800 pb-6 mb-8 gap-4">
          <h1 className="text-4xl font-bold tracking-tight">Anime Catalog</h1>
          {/* Search */}
          <div className="flex flex-1 max-w-md gap-3">
            <div className="relative flex-1">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search animes..."
                className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button onClick={handleClearSearch}>
                  <IoClose className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400 transition-colors w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Search
            </button>
          </div>
          {/* Sort & View */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split(':');
                  fetchAnimeList({ sortBy, sortOrder, page: 1 });
                }}
                className="appearance-none bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Sort</option>
                <option value="seasonYear:desc">Newest First</option>
                <option value="rating:desc">Best Rating</option>
                <option value="popularity:desc">Most Popular</option>
                <option value="title:asc">A-Z</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button className="p-2 text-gray-400 hover:text-white transition-colors lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        )}

        <section className="pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <Filter
              filters={currentFilters}
              onApply={applyFilters}
              className="hidden lg:block"
            />

            {/* Anime Grid */}
            <div className="lg:col-span-3">
              {animeList?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {animeList.map((anime) => (
                    <Card key={anime._id} animeData={anime} />
                  ))}
                </div>
              ) : !loading ? (
                <div className="text-center py-24">
                  <div className="inline-block p-8 bg-gray-900 rounded-2xl border border-gray-800">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <p className="text-xl text-gray-400 font-medium">No animes found matching your criteria.</p>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Pagination */}
        {paginationInfo.totalPages > 1 && (
          <div className="flex justify-center pt-12">
            <Pagination
              paginationInfo={paginationInfo}
              currentFilters={currentFilters}
              searchQuery={searchQuery}
              onPageChange={fetchAnimeList}
            />
          </div>
        )}

      </main>

      {/* Mobile Filter Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-black border-l-2 border-gray-800 p-6 flex flex-col max-h-screen overflow-hidden">
            <Filter
              filters={currentFilters}
              onApply={applyFilters}
              isMobile
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  )
}
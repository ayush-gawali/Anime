import { useState, useEffect } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const FILTERS = [
    {
        id: "season", name: "Season", options: [
            { value: "WINTER", label: "Winter" },
            { value: "SPRING", label: "Spring" },
            { value: "SUMMER", label: "Summer" },
            { value: "FALL", label: "Fall" },
        ]
    },
    {
        id: "genres", name: "Genres", options: [
            { value: "Action", label: "Action" },
            { value: "Adventure", label: "Adventure" },
            { value: "Comedy", label: "Comedy" },
            { value: "Drama", label: "Drama" },
            { value: "Fantasy", label: "Fantasy" },
        ]
    },
    {
        id: "format", name: "Format", options: [
            { value: "TV", label: "TV Series" },
            { value: "MOVIE", label: "Movies" },
            { value: "OVA", label: "OVA" },
            { value: "ONA", label: "ONA" },
        ]
    },
    {
        id: "status", name: "Status", options: [
            { value: "RELEASING", label: "Ongoing" },
            { value: "FINISHED", label: "Completed" },
            { value: "NOT_YET_RELEASED", label: "Coming Soon" },
        ]
    },
];

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

export default function Filter({ filters, onApply, className = "", isMobile = false, onClose }) {
    const [localFilters, setLocalFilters] = useState({
        year: null, season: null, genres: [], format: null, status: null
    });
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const toggleSection = (sectionId) => {
        setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    const handleCheckboxChange = (sectionId, value, checked) => {
        setLocalFilters(prev => {
            if (sectionId === "genres") {
                return {
                    ...prev,
                    genres: checked ? [...prev.genres, value] : prev.genres.filter(g => g !== value)
                };
            }
            return { ...prev, [sectionId]: checked ? value : null };
        });
    };

    const handleYearClick = (year) => {
        setLocalFilters(prev => ({ ...prev, year }));
    };

    const clearFilters = () => {
        const resetFilters = { year: null, season: null, genres: [], format: null, status: null };
        setLocalFilters(resetFilters);
        setOpenSections({});
        onApply(resetFilters);
    };

    const applyFilters = () => {
        onApply(localFilters);
    };

    if (isMobile) {
        return (
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
                    <h2 className="text-2xl font-bold">Filters</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-900 rounded-xl transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mb-8">
                    <button
                        onClick={clearFilters}
                        className="flex-1 bg-gray-900 hover:bg-gray-800 py-3 px-4 rounded-xl border border-gray-700 transition-all"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={applyFilters}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Filter sections */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    {/* Year */}
                    <section className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                        <button
                            onClick={() => toggleSection('year')}
                            className="flex w-full items-center justify-between py-3"
                        >
                            <span className="text-lg font-semibold">Year</span>
                            <div className="flex items-center gap-1">
                                <MdKeyboardArrowUp className={`w-5 h-5 transition-transform ${openSections.year ? 'rotate-180' : ''}`} />
                                <MdKeyboardArrowDown className={`w-5 h-5 transition-transform ${openSections.year ? '' : 'rotate-180'}`} />
                            </div>
                        </button>
                        <div className={`overflow-hidden transition-all ${openSections.year ? 'max-h-96 py-4' : 'max-h-0'}`}>
                            <div className="grid grid-cols-4 gap-2">
                                {YEARS.map(year => (
                                    <button
                                        key={year}
                                        onClick={() => handleYearClick(year)}
                                        className={`p-3 rounded-lg text-sm font-medium border-2 transition-all ${localFilters.year === year
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                            : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Other filters */}
                    {FILTERS.map((section) => (
                        <section key={section.id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="flex w-full items-center justify-between py-3"
                            >
                                <span className="text-lg font-semibold">{section.name}</span>
                                <div className="flex items-center gap-1">
                                    <MdKeyboardArrowUp className={`w-5 h-5 transition-transform ${openSections[section.id] ? 'rotate-180' : ''}`} />
                                    <MdKeyboardArrowDown className={`w-5 h-5 transition-transform ${openSections[section.id] ? '' : 'rotate-180'}`} />
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all ${openSections[section.id] ? 'max-h-96 pt-4' : 'max-h-0'}`}>
                                <div className="space-y-3">
                                    {section.options.map((option) => (
                                        <label key={option.value} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-900/50 cursor-pointer transition-colors group">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    section.id === "genres"
                                                        ? localFilters.genres.includes(option.value)
                                                        : localFilters[section.id] === option.value
                                                }
                                                onChange={(e) => handleCheckboxChange(section.id, option.value, e.target.checked)}
                                                className="w-5 h-5 accent-indigo-600 rounded border-gray-600 focus:ring-indigo-500 transition-all"
                                            />
                                            <span className="text-sm font-medium group-hover:text-white">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div className={`border border-gray-800 rounded-2xl p-8 bg-gray-900/30 backdrop-blur-sm ${className}`}>
            <div className="flex flex-col sm:flex-col gap-4 mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Filters
                </h3>
                <div className="flex gap-3 flex-1">
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-all font-medium"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={applyFilters}
                        className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Same filter sections as mobile but desktop-optimized */}
            <div className="space-y-6">
                {/* Year section */}
                <section className="bg-gray-900/30 rounded-xl px-6 py-3 border border-gray-800 hover:border-gray-700 transition-all">
                    <button onClick={() => toggleSection('year')} className="flex w-full items-center justify-between">
                        <span className="text-lg font-semibold">Year</span>
                        <div className="flex items-center gap-1">
                            <MdKeyboardArrowUp className={`w-5 h-5 transition-transform ${openSections.year ? 'rotate-180' : ''}`} />
                        </div>
                    </button>
                    <div className={`overflow-hidden transition-all ${openSections.year ? 'max-h-96 py-4' : 'max-h-0'}`}>
                        <div className="grid grid-cols-3 gap-2">
                            {YEARS.map(year => (
                                <button
                                    key={year}
                                    onClick={() => handleYearClick(year)}
                                    className={`p-2 rounded-lg text-sm font-medium border-2 transition-all 
                        ${localFilters.year === year
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                            : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                                        }`}>
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Other filters - same structure */}
                {FILTERS.map(section => (
                    <section key={section.id} className="bg-gray-900/30 rounded-xl px-6 py-3 border border-gray-800 hover:border-gray-700 transition-all">
                        {/* Same structure as mobile */}
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex w-full items-center justify-between"
                        >
                            <span className="text-lg font-semibold">{section.name}</span>
                            <div className="flex items-center gap-1">
                                <MdKeyboardArrowUp className={`w-5 h-5 transition-transform ${openSections[section.id] ? 'rotate-180' : ''}`} />
                            </div>
                        </button>
                        <div className={`overflow-hidden transition-all ${openSections[section.id] ? 'max-h-96 pt-4' : 'max-h-0'}`}>
                            <div className="space-y-3">
                                {section?.options?.map((option) => (
                                    <label key={option.value} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-900/50 cursor-pointer transition-colors group">
                                        <input
                                            type="checkbox"
                                            checked={
                                                section.id === "genres"
                                                    ? localFilters?.genres?.includes(option.value)
                                                    : localFilters[section.id] === option.value
                                            }
                                            onChange={(e) => handleCheckboxChange(section.id, option.value, e.target.checked)}
                                            className="w-5 h-5 accent-indigo-600 rounded border-gray-600 focus:ring-indigo-500 transition-all"
                                        />
                                        <span className="text-sm font-medium group-hover:text-white">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

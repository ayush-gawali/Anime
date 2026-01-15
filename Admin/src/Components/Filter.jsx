import { useState, useEffect } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";

/* =======================
   FILTER CONFIG
======================= */

const FILTERS = [
    {
        id: "season",
        name: "Season",
        options: [
            { value: "WINTER", label: "Winter" },
            { value: "SPRING", label: "Spring" },
            { value: "SUMMER", label: "Summer" },
            { value: "FALL", label: "Fall" },
        ],
    },
    {
        id: "genres",
        name: "Genres",
        options: [
            { value: "Action", label: "Action" },
            { value: "Adventure", label: "Adventure" },
            { value: "Comedy", label: "Comedy" },
            { value: "Drama", label: "Drama" },
            { value: "Fantasy", label: "Fantasy" },
            { value: "Sports", label: "Sports" },
        ],
    },
    {
        id: "format",
        name: "Format",
        options: [
            { value: "TV", label: "TV Series" },
            { value: "OVA", label: "OVA" },
            { value: "ONA", label: "ONA" },
            { value: "MOVIE", label: "Movies" },
            { value: "SPECIAL", label: "Specials" },
        ],
    },
    {
        id: "status",
        name: "Airing Status",
        options: [
            { value: "RELEASING", label: "Ongoing" },
            { value: "FINISHED", label: "Completed" },
            { value: "NOT_YET_RELEASED", label: "Coming Soon" },
        ],
    },
];

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

/* =======================
   COMPONENT
======================= */

function Filter({ applyFilter }) {
    const [filter, setFilter] = useState({
        year: null,
        season: null,
        genres: [],
        format: null,
        status: null,
    });

    useEffect(() => {
        console.log("Current filter:", filter);
    }, [filter]);

    /* =======================
       HANDLERS
    ======================= */

    const handleCheckboxChange = (sectionId, value, checked) => {
        setFilter((prev) => {
            if (sectionId === "genres") {
                return {
                    ...prev,
                    genres: checked
                        ? [...prev.genres, value]
                        : prev.genres.filter((g) => g !== value),
                };
            }

            return {
                ...prev,
                [sectionId]: checked ? value : null,
            };
        });
    };

    const clearFilters = () => {
        setFilter({
            year: null,
            season: null,
            genres: [],
            format: null,
            status: null,
        });
    };

    /* =======================
      RENDER
    ======================= */

    return (
        <div className="hidden lg:block border p-4 rounded-md text-white h-fit">
            {/* ACTION BUTTONS */}
            <div className="flex justify-between mb-4">
                <button
                    onClick={clearFilters}
                    className="border px-3 py-1 rounded"
                >
                    Clear
                </button>
                <button
                    onClick={() => applyFilter(filter)}
                    className="border px-3 py-1 rounded"
                >
                    Apply Filter
                </button>
            </div>

            {/* YEAR */}
            <Disclosure as="div" defaultOpen className="py-4">
                <DisclosureButton className="group flex w-full justify-between py-3 border-b">
                    <span>Year</span>
                    <span className="flex items-center">
                        <MdKeyboardArrowUp className="group-data-open:hidden" />
                        <MdKeyboardArrowDown className="group-not-data-open:hidden" />
                    </span>
                </DisclosureButton>

                <DisclosurePanel className="pt-4">
                    <ul className="grid grid-cols-4 gap-2">
                        {YEARS.map((yr) => (
                            <li
                                key={yr}
                                onClick={() =>
                                    setFilter((prev) => ({ ...prev, year: yr }))
                                }
                                className={`cursor-pointer border p-2 rounded text-center ${filter.year === yr
                                        ? "bg-indigo-600 text-white"
                                        : ""
                                    }`}
                            >
                                {yr}
                            </li>
                        ))}
                    </ul>
                </DisclosurePanel>
            </Disclosure>

            {/* OTHER FILTERS */}
            {FILTERS.map((section) => (
                <Disclosure
                    as="div"
                    key={section.id}
                    className="py-4"
                >
                    <DisclosureButton className="group flex w-full items-center justify-between py-3 border-b">
                        <span>{section.name}</span>
                        <span className="flex">
                            <MdKeyboardArrowUp className="group-data-open:hidden" />
                            <MdKeyboardArrowDown className="group-not-data-open:hidden" />
                        </span>
                    </DisclosureButton>

                    <DisclosurePanel className="pt-4 space-y-3">
                        {section.options.map((option, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        section.id === "genres"
                                            ? filter.genres.includes(option.value)
                                            : filter[section.id] === option.value
                                    }
                                    onChange={(e) =>
                                        handleCheckboxChange(
                                            section.id,
                                            option.value,
                                            e.target.checked
                                        )
                                    }
                                    className="accent-indigo-600"
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </DisclosurePanel>
                </Disclosure>
            ))}
        </div>
    );
}

export default Filter;

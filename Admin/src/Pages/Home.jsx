import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import axios from 'axios';
import Card from '../Components/Card';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

const ANILIST_API = 'https://graphql.anilist.co';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Home() {

  const [searchAnime, setSearchAnime] = useState('');

  const [animeList, setAnimeList] = useState([]);

  const [query, setQuery] = useState('');

  const applyFilter = (filters) => {
    searchAnimeFunc(filters);
  }

  const searchAnimeFunc = async (filters) => {
    const query = `
    query SearchAnime(
      $search: String
      $season: MediaSeason
      $seasonYear: Int
      $genres: [String]
      $format: MediaFormat
    ) {
      Page(page: 1, perPage: 24) {
        media(
          type: ANIME
          search: $search
          season: $season
          seasonYear: $seasonYear
          genre_in: $genres
          format: $format
        ) {
          id
          title {
            romaji
            english
            native
          }
          season
          seasonYear
          format
          genres
          studios(isMain: true) {
            nodes {
              name
            }
          }
          coverImage {
            large
          }
          averageScore
          episodes
        }
      }
    }
  `;

    const variables = {
      season: filters.season || null,
      seasonYear: filters.year || null,
      genres: filters.genres?.length ? filters.genres : null,
      format: filters.format || null,
    };

    const response = await axios.post(
      ANILIST_API,
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    let animeList = response.data.data.Page.media;

    console.log(animeList);
  };

  const fetchAnimeData = async (pageNo) => {
    const query = `
        query {
          Page(page: ${pageNo}, perPage: 24) {
            media(type: ANIME, sort: POPULARITY_DESC) {
              id
              title {
                english
              }
              format
              seasonYear
              episodes
              averageScore
              coverImage{
                extraLarge,
                large,
                medium,
                color
              }
            }
          }
        }
      `;

    const url = "https://graphql.anilist.co";

    try {
      const response = await axios.post(url, { query }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAnimeList(response.data.data.Page.media);
    }
    catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  const fetchsearchAnimeList = async (animeName) => {
    const query = `
      query ($search: String) {
        Page(perPage: 24) {  # Change perPage value to control the number of results
          media(search: $search, type: ANIME) {
            id
            title {
              english
              romaji
            }
            format
            seasonYear
            episodes
            averageScore
            coverImage {
              extraLarge
              large
              medium
              color
            }
          }
        }
      }
    `;

    const variables = { search: animeName };

    try {
      const response = await axios.post(
        'https://graphql.anilist.co',
        { query, variables },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setAnimeList(response.data.data.Page.media);
      console.log(response.data.data.Page.media); // Logs an array of anime results
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };

  const handleOnclick = (v) => {
    if (v == 'search') {
      fetchsearchAnimeList(searchAnime);
    }
    else {
      setSearchAnime('')
    }
  }

  useEffect(() => {
    fetchAnimeData();
  }, []);


  return (
    <div className="bg-black text-white">
      <div>

        <main className="mx-auto max-w-7xl mb-24">

          {/* top section with heading */}
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold">Anilist</h1>
            <div className='flex items-center justify-center'>
              <input type="text" value={searchAnime} onChange={(e) => setSearchAnime(e.target.value)} className='border rounded-md px-4 py-1 text-white' />
              <span className='flex ms-2 gap-2 justify-center items-center'>
                <IoSearch
                  onClick={() => handleOnclick('search')}
                  size={28}
                  className='border p-0.5 rounded text-green-500 hover:size-8 hover:cursor-pointer'
                />
                <IoClose
                  onClick={() => handleOnclick('clear')}
                  size={28}
                  className='border p-0.5 rounded text-red-500 hover:size-8 hover:cursor-pointer'
                />
              </span>
            </div>
            <div className="flex items-center">

              {/* <button className='me-10 border-2 py-1 px-2 rounded-md border-yellow-400'>DB List</button> */}

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton disabled className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          {/* section bottom padding 24 */}
          {/* main section */}
          <section aria-labelledby="products-heading" className="pt-6 pb-18">

            <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div>
                <Filter applyFilter={applyFilter} />
              </div>

              {/* Product grid */}
              <div className={`grid grid-cols-4 gap-x-6 gap-y-10 grid-flow-row w-4xl ${query.length > 2 ? 'pointer-events-none' : ''}`}>
                {/* Your content */}
                {animeList.length > 0 && animeList.map((animeData, index) => (
                  <Fragment key={index}>
                    <Card animeData={animeData} />
                  </Fragment>
                ))}
              </div>
            </div>

          </section>


          {/* paging section */}
          <div className='flex justify-center'>
            <Pagination fetchAnimeData={fetchAnimeData} />
          </div>

        </main>


      </div>
    </div>
  )
}
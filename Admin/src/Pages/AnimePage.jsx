import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios"
import { FaRegEye } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import Overview from '../components/SingleAnime/Overview';
import Relations from '../components/SingleAnime/Relations';
import Charater from '../components/SingleAnime/Charater';
import Staff from '../components/SingleAnime/Staff';
import Reviews from '../components/SingleAnime/Reviews';
import { context } from '../store/contest';
import { addAnime, deleteAnime } from '../services/api.js';
import { MdDelete } from "react-icons/md";
import DelectDialog from '../Components/DelectDialog.jsx';


const arr = ['Overview', 'Relations', 'Charater', 'Staff', 'Reviews'];

function AnimePage() {

  const { id } = useParams();

  const { BACKEND_URL, userData } = useContext(context);

  const [anime, setAnime] = useState({});
  const [selectedItem, setSelectedItem] = useState('Overview');
  const [fromDatabase, setFromDatabase] = useState(false);

  const fetchAnimeFromAnilist = async () => {
    const query = `query ($id: Int, $search: String) {
        Media(id: $id, search: $search, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        bannerImage
        coverImage {
          extraLarge
        }
        averageScore
        description
        format
        seasonYear
        episodes
        status
        season
        source
        genres
        duration
        meanScore
        popularity
        favourites
        trending
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        studios {
          nodes {
            id
            name
            isAnimationStudio
          }
        }
        staff {
          edges {
            role
            node {
              id
              name {
                full
                native
              }
              image {
                large
              }
            }
          }
        }
        characters {
          edges {
            role
            voiceActors(language: JAPANESE) {
              id
              name {
                full
                native
              }
              image {
                large
              }
            }
            node {
              id
              name {
                full
                native
              }
              image {
                large
              }
            }
          }
        }
        reviews(sort: RATING_DESC, perPage: 5) {
          nodes {
            id
            summary
            rating
            score
            user {
              id
              name
              avatar {
                large
              }
            }
          }
        }
        rankings {
          rank
          context
          season
          year
        }
        tags {
          id
          name
          rank
          isGeneralSpoiler
        }
        externalLinks {
          url
          site
          type
        }
        trailer {
          id
          site
          thumbnail
        }
        relations {
            edges {
                relationType
                node {
                    id
                    title {
                        english
                    }
                    coverImage {
                        extraLarge
                    }
                    format
                    seasonYear
                }
            }
        }   
        airingSchedule {
            edges {
                node {
                  airingAt
                  timeUntilAiring
                  episode
                }
            }
        }
        }
        }
    `;

    const variables = { id: id };

    try {
      const response = await axios.post(
        "https://graphql.anilist.co",
        { query, variables },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data.errors) {
        console.log(response.data.errors);
      }
      else {
        setAnime(response.data.data.Media);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again.");
    }
  };

  const fetchFromDatabase = async () => {
    try {
      const responce = await axios.get(`${BACKEND_URL}/anime/get_anime_by_Anilistid/${id}`);
      if (responce.data.success) {
        setAnime(responce.data.data);
        setFromDatabase(true);
      }
      else {
        fetchAnimeFromAnilist();
        setFromDatabase(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmDelete = async (animeId) => {
    if (await deleteAnime(animeId)) {
      fetchAnimeFromAnilist();
      setFromDatabase(false);
      document.getElementById("my_modal_4").close();
    }
  };

  const handleAdd_Delete = async (animeData) => {
    if (fromDatabase) {
      document.getElementById('my_modal_4').showModal();
    }
    else {
      const responce = await addAnime(animeData);
      if (responce.success) {
        setFromDatabase(true);
        setAnime(responce.animeData);
      }
    }
  };

  useEffect(() => {
    fetchFromDatabase();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <div>

        {/* banner 1 */}
        <div className='h-fit bg-neutral-900'>
          <div className='absolute h-90 w-full flex items-end justify-end'>
            <a
              style={{ color: 'black' }}
              href={anime?.externalLinks?.filter(item => item.type === 'INFO').map(item => item.url)}
              target="_blank"
              rel="noopener noreferrer"
              className='z-10 flex font-medium items-center justify-center gap-2 py-2 px-4 rounded-lg mb-4 mr-6 bg-white text-black '
            >
              <FaGlobe />Official Site
            </a>
            <a
              style={{ color: 'black' }}
              href={`https://youtu.be/${anime?.trailer?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className='z-10 flex font-medium items-center justify-center gap-2 py-2 px-4 rounded-lg mb-4 mr-6 bg-white text-black '
            >
              <FaCirclePlay />Watch Trailer
            </a>
          </div>
          <img
            className='h-90 w-full'
            // src={anime?.bannerImage || anime?.trailer?.thumbnail}
            alt="banner image"
          />
        </div>

        {/* image and name  */}
        <div className='flex px-20 justify-center items-center relative bottom-20'>
          <img
            className='w-100 h-100 rounded'
            // src={anime?.coverImage?.extraLarge} 
            alt=""
          />
          {/* name and collection */}
          <div className='ps-20 mt-auto py-16 flex flex-col gap-16 w-full'>
            <div className='flex flex-col gap-6'>
              <h1 className='text-4xl font-bold'>
                {anime?.title && anime?.title?.english || anime?.title?.romaji || anime?.title?.native}
              </h1>
              <span className='text-base font-medium flex items-center gap-1'>
                <FaStar className='text-yellow-500' />
                {(anime?.averageScore) / 10}
              </span>
            </div>
            <div className='flex justify-between'>
              {userData?.role == "admin" &&
                <button
                  onClick={() => handleAdd_Delete(anime)}
                  className={`border-2 py-2 px-4 rounded-lg flex items-center gap-2 ${fromDatabase ? 'bg-red-600 text-white border-red-600' : 'border-white'}`}
                >
                  {fromDatabase ? <><MdDelete /> Delect from Database </> : <><IoAdd /> Add to Database</>}
                </button>}
            </div>
          </div>
        </div>

        {/* other details */}
        <div className='mb-20'>
          <div className='flex px-30 gap-20 mb-2 items-center'>
            {arr.map((value, index) => (
              <p key={index} onClick={() => setSelectedItem(value)} className={`font-medium text-lg ${selectedItem == value ? 'border-b' : ''} `}>{value}</p>
            ))}
          </div>
          <div className='px-5'>
            <hr className='text-white/30 border' />
          </div>
          <>
            {selectedItem == 'Overview' && <Overview anime={anime} />}   {/* Done */}
            {selectedItem == 'Relations' && <Relations anime={anime.relations} />}  {/* Done */}
            {selectedItem == 'Charater' && <Charater anime={anime.characters} />}  {/* Done */}
            {selectedItem == 'Staff' && <Staff anime={anime} />}
            {selectedItem == 'Reviews' && <Reviews anime={anime} />}
          </>
        </div>

      </div>
      <DelectDialog animeData={anime} confirmDelete={confirmDelete} />
    </>

  )
}

export default AnimePage
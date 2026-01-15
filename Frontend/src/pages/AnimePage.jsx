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
import { MdDelete, MdClose } from "react-icons/md";
import { setAnimeStatus } from '../services/user.api';
import CollectionLayout from '../components/Collection/Layout';


const arr = ['Overview', 'Relations', 'Charater', 'Staff', 'Reviews'];

function AnimePage() {

  const { id } = useParams();

  const { BACKEND_URL } = useContext(context);

  const [anime, setAnime] = useState({});
  const [selectedItem, setSelectedItem] = useState('Overview');
  const [status, setStatus] = useState(null);
  const [collection, setCollection] = useState(false);

  const fetchAnimeFromDatabase = async () => {
    try {
      const responce = await axios.get(`${BACKEND_URL}/anime/get_anime_by_id/${id}`);
      if (responce.data.success) {
        setAnime(responce.data.data);
      } else {
        setAnime(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAnimeStatus = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/user-anime-list/status/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        setStatus(response.data.data.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeStatus = async (animeId, newStatus) => {
    const reponce = await setAnimeStatus(animeId, newStatus);
    setStatus(reponce);
  }

  useEffect(() => {
    fetchAnimeFromDatabase();
    fetchAnimeStatus();
    window.scrollTo(0, 0);
  }, [id]);

  return (
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
              {anime?.title?.english || anime?.title?.romaji || anime?.title?.native}
            </h1>
            <span className='text-base font-medium flex items-center gap-1'>
              <FaStar className='text-yellow-500' />
              {(anime?.averageScore) / 10}
            </span>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-4'>
              <button onClick={() => changeStatus(anime._id, 'watching')} className={`border-2  py-2 px-4 rounded-lg flex items-center gap-2 hover:cursor-pointer ${status === 'watching' ? 'border-green-500 text-green-400' : ''}`}><FaRegEye />Watching</button>
              <button onClick={() => changeStatus(anime._id, 'watch_later')} className={`border-2  py-2 px-4 rounded-lg flex items-center gap-2 hover:cursor-pointer ${status === 'watch_later' ? 'border-green-500 text-green-400' : ''}`}><FaRegBookmark />Watch Later</button>
              <button onClick={() => changeStatus(anime._id, 'watched')} className={`border-2  py-2 px-4 rounded-lg flex items-center gap-2 hover:cursor-pointer ${status === 'watched' ? 'border-green-500 text-green-400' : ''}`}><FaCheck />Watched</button>
            </div>
            <button
              className={`border-2 py-2 px-4 rounded-lg flex items-center gap-2 ${collection ? 'border-red-500 text-red-400' : ''}`}
              onClick={() => setCollection((prev) => !prev)}
            >
              {collection ? <><MdClose /> Close collection</> : <><IoAdd /> Add to collection</>}
            </button>
          </div>
        </div>
      </div>

      {/* other details */}
      {
        collection ?
          <CollectionLayout animeId={anime._id} />
          :
          <div className='mb-20'>
            <div className='flex px-30 gap-20 mb-2 items-center'>
              {arr.map((value, index) => (
                <p key={index} onClick={() => setSelectedItem(value)} className={`font-medium text-lg ${selectedItem == value ? 'border-b' : ''} `}>{value}</p>
              ))}
            </div>
            <div className='px-5'>
              <hr className='text-white/30 border-1' />
            </div>
            <>
              {selectedItem == 'Overview' && <Overview anime={anime} />}   {/* Done */}
              {selectedItem == 'Relations' && <Relations anime={anime.relations} />}  {/* Done */}
              {selectedItem == 'Charater' && <Charater anime={anime.characters} />}  {/* Done */}
              {selectedItem == 'Staff' && <Staff anime={anime} />}
              {selectedItem == 'Reviews' && <Reviews anime={anime} />}
            </>
          </div>
      }
    </div>
  )
}

export default AnimePage
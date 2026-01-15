import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({animeData}) {

  const navigate = useNavigate();

  const { _id, aniplixId ,  title, averageScore, coverImage, episodes, format, seasonYear } = animeData;

  return (
    <div onClick={() => navigate(`/anime/${_id}`)} className='w-50 h-fit rounded-lg hover:cursor-pointer hover:scale-103 group transition duration-500'>
      <img className='w-50 h-70 rounded'
        // src={coverImage?.extraLarge} 
        alt=""
      />
      <div>
        <h3 className='text-center px-1 my-1 text-lg font-semibold w-full h-7 overflow-hidden group-hover:h-fit transition duration-500'>{title?.english}</h3>
        <div className=' flex gap-2 justify-between px-1'>
          <span className='bg-neutral-800 py-0.5 px-1.5 rounded text-xs'>{format}</span>
          <span className='bg-neutral-800 py-0.5 px-1.5 rounded text-xs'>{seasonYear}</span>
          <span className='bg-neutral-800 py-0.5 px-1.5 rounded text-xs'>{episodes}</span>
          <span className='bg-neutral-800 py-0.5 px-1.5 rounded text-xs'>{averageScore}</span>
        </div>
      </div>
    </div>
  )
}

export default Card


// 200 280
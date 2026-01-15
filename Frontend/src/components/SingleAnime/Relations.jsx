import React from 'react'
import { useNavigate } from 'react-router-dom'

function Relations({ anime }) {
    return (
        <div>
            <h2>Alpha</h2>
            <div className='grid grid-cols-4 gap-2 items-center justify-center'>
                {anime.edges.map((item, index) => {
                    if (item.relationType == 'ADAPTATION' || item.relationType == 'SEQUEL' || item.relationType == 'SUMMARY') {
                        return <Card data={item.node} key={index} />
                    }
                })}
            </div>
        </div>
    )
}


export default Relations




function Card({ data }) {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/anime/${data.id}`)} 
            className='flex items-center justify-center hover:cursor-pointer hover:scale-103 group transition duration-500'
        >
            <span className='flex flex-col items-center justify-center w-fit rounded-lg'>
                <img 
                    // src={data.coverImage.extraLarge} 
                    alt="" 
                    className='w-60 rounded-t-lg' 
                />
                <div className='bg-white/5 w-full rounded-b-lg flex flex-col items-center justify-center'>
                    <h3 className='text-center px-1 my-1 text-lg font-semibold w-50 h-7 overflow-hidden group-hover:h-fit transition duration-500'>{data?.title?.english}</h3>
                    <div className='flex px-4 gap-2'>
                        <span className='rounded text-xs'>{data.format}</span>
                        <span className='rounded text-xs'>,</span>
                        <span className='rounded text-xs'>{data.seasonYear}</span>
                    </div>
                </div>
            </span>
        </div>
    )
}
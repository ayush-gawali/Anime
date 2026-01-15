import React, { useState } from 'react'

function Charater({ anime }) {
  return (
    <div className=''>
      <h2>Charater</h2>
      <div className='grid grid-cols-6 gap-5 px-16'>
        {anime?.edges?.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Charater



function Card({ data }) {
  const [mouseOver,setMouseOver] = useState(false);
  
  return (
    <div 
      onMouseOver={() => setMouseOver(true)}
      onMouseOut ={() => setMouseOver(false)}
      className='flex items-center justify-center rounded-lg'
    >
      <div
        // style={{ backgroundImage: `url('${!mouseOver ? data.node.image.large : data.voiceActors[0]?.image.large }')` }}
        // style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg')` }}
        className=' w-full h-80 rounded-lg bg-cover bg-center flex items-end justify-center'
      >
        <span 
          className='w-full flex flex-col justify-center items-center py-2 rounded-b-lg
            bg-gradient-to-b from-black/40 via-black/60 to-black/80
          '>
          <h4 className='font-semibold'>{data.node.name.full}</h4>
          <p className='text-xs'>{!mouseOver ? data.role : `${data.voiceActors[0]?.name.full} / Voice Actor` }</p>
        </span>
      </div>
    </div>
  )
}
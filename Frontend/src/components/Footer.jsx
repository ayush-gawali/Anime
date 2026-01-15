import React from 'react'
import { FaDiscord , FaTelegramPlane , FaInstagram , FaWhatsapp} from "react-icons/fa";


function Footer() {
  return (
    <>
      <footer className="border-t border-zinc-800 text-center py-8 text-zinc-500">
        © {new Date().getFullYear()} Anime Platform · Built with MERN
      </footer>
{/* <div className='border-t-2 border-white/40 py-6 px-24 flex justify-between'>
        <div className='flex gap-10 items-center'>
            <p className='text-lg font-semibold hover:cursor-pointer hover:text-blue-600'>Kurosaw.com</p>
            <p className='text-base font-medium hover:cursor-pointer hover:text-blue-600'>Terms & Privecy</p>
            <p className='font-medium hover:cursor-pointer hover:text-blue-600'>Contact</p>
        </div>
        <div className='flex gap-10 items-center'>
            <span className='bg-white rounded-full p-2 hover:cursor-pointer hover:bg-yellow-300'>
              <FaDiscord className='text-xl text-black' />
            </span>
            <span className='bg-white rounded-full p-2 hover:cursor-pointer hover:bg-yellow-300'>
              <FaTelegramPlane className='text-xl text-black' />
            </span>
            <span className='bg-white rounded-full p-2 hover:cursor-pointer hover:bg-yellow-300'>
              <FaInstagram className='text-xl text-black' />
            </span>
            <span className='bg-white rounded-full p-2 hover:cursor-pointer hover:bg-yellow-300'>
              <FaWhatsapp className='text-xl text-black' />
            </span>
        </div>
    </div> */}
    </>
    
  )
}

export default Footer
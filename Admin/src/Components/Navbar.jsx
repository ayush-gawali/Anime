import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaCaretDown } from "react-icons/fa";
import { context } from '../store/contest';

function Navbar() {

    const { userData } = useContext(context);

    const navigate = useNavigate();

    return (
        <div className='bg-black/60 w-full border-b-2 border-white/40 text-white flex items-center px-20 gap-10 justify-between py-4'>
            {/* logo */}
            <div>
                <h1
                    className='text-3xl font-bold hover:cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    Admin
                </h1>
            </div>

            {/* Nav items */}
            <nav>
                <ul className='flex gap-10'>
                    <li><Link to='/' >Anilist</Link> </li>
                    <li><Link to='/db-list' >DB List</Link> </li>
                    {/* <li><Link to='/profile' >Profile</Link> </li>
                    <li><Link to='/collection' >Collection</Link> </li> */}
                </ul>
            </nav>

            {/* login and get started */}
            <div>
                {userData
                    ?
                    <div>
                        <div className='flex gap-8 items-center'>
                            <span className='font-medium flex items-center gap-2 hover:cursor-pointer'>
                                My Library
                                <FaCaretDown />
                            </span>
                            <img
                                onClick={() => navigate('/profile')}
                                className='w-9 aspect-square rounded-full hover:cursor-pointer'
                                src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yc0l6amFaOUtLNFozdzg0Z0M0dTE5OW03dk8ifQ" alt=""
                            />
                        </div>
                    </div>
                    :
                    <div className='flex gap-6 items-center'>
                        <button onClick={() => navigate('/login')} className='border-white border-2 py-1 px-3 rounded hover:cursor-pointer'>Login</button>
                        <button className='py-1 px-3 rounded bg-white text-black hover:cursor-pointer'>Get Started</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
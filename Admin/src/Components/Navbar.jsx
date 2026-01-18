import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaCaretDown } from "react-icons/fa";
import { context } from '../store/contest';

function Navbar() {

    const { userData } = useContext(context);

    const navigate = useNavigate();

    const adminImageURL = "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/358b3f20-64d8-5075-8853-4acf7d7e41c0/ff3982e7-8eb6-5893-b2ed-0d9d94afa737.jpg"

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
                                src={userData.role=="admin" && adminImageURL} alt=""
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





// https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/358b3f20-64d8-5075-8853-4acf7d7e41c0/ff3982e7-8eb6-5893-b2ed-0d9d94afa737.jpg


// https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6eff19321fbf87aa6b79968990e2e0cfcd685dfba83ab192a9064bb7168819f831a8e966729ad0e17ae16b99ab3b2779b8


// https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/e4b933ef-fb18-51fd-a76e-ba14e1557fbe/9a2bcea5-5f00-5dbe-af49-8664e692e309.jpg
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaCaretDown } from "react-icons/fa";
import { context } from '../store/context';

function Navbar() {

    const { userData } = useContext(context);

    const closeDropdown = () => {
        document.activeElement?.blur();
    };


    return (
        <div className="navbar bg-base-400 shadow-sm px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link to={"/"} >Home</Link></li>
                        <li><Link to={"/catalog"} >Catalog</Link></li>
                        <li><Link to={"/about"} >About</Link></li>
                        <li><Link to={"/profile"} >Profile</Link></li>
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-2xl font-bold">Kurosaw</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li><Link to={"/"} >Home</Link></li>
                    <li><Link to={"/catalog"} >Catalog</Link></li>
                    <li><Link to={"/about"} >About</Link></li>
                    <li><Link to={"/profile"} >Profile</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {userData ?
                    <div className="flex gap-4">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost"
                            >
                                <div className="flex items-center justify-center gap-1">
                                    My Libaray  <FaCaretDown />
                                </div>
                            </div>
                            {/* <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li><a>Profile</a> </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul> */}
                        </div>
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yc0l6amFaOUtLNFozdzg0Z0M0dTE5OW03dk8ifQ" />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-48 p-2 shadow"
                            >
                                <li><Link to={"/profile"} onClick={closeDropdown}>Profile</Link> </li>
                                <li><Link to={"/settings"} onClick={closeDropdown}>Settings</Link></li>
                                {/* <li><a onClick={closeDropdown}>Logout</a></li> */}
                            </ul>
                        </div>
                    </div>
                    :
                    <div className='flex gap-3'>
                        <Link to={'/login'} className='btn btn-soft rounded-lg'>Login</Link>
                        <button className='btn rounded-lg bg-white text-black hover:bg-white/95'>Get Started</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar

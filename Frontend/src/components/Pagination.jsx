import React, { useContext, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { context } from '../store/contest';

function Pagination() {

    const {pageNo,setPageNo} = useContext(context);

    let pgNoLength = 5


    return (
        <div className="flex items-center gap-6">
            <button
                onClick={() => setPageNo((prev) => (prev - 1))}
                disabled={pageNo === 1}
                className={`hover:cursor-pointer flex items-center gap-2 py-2 px-4 rounded ${pageNo !== 1 ? "hover:bg-white hover:text-black" : "text-white/50"} `}
            // variant="text"
            // onClick={prev}
            // disabled={active === 1}
            >
                <FaArrowLeft className="h-4 w-4" />
                Previous
            </button>
            <div className="flex items-center gap-2">
                {Array.from({length: pgNoLength }, (_, i) => (
                     <span
                     key={i}
                     onClick={() => setPageNo(i+1)}
                     className={`${pageNo === i+1 ? "bg-white/60" : ''} hover:cursor-pointer py-2 px-4 rounded hover:bg-white hover:text-black`}
                 >
                    {i+1}
                 </span>
                ))}
            </div>
            <button
                onClick={() => setPageNo((prev) => (prev + 1))}
                className={`hover:cursor-pointer flex items-center gap-2 py-2 px-4 rounded ${pageNo !== pgNoLength ? "hover:bg-white hover:text-black" : "text-white/50"} `}
                disabled={pageNo === pgNoLength}
            >
                <FaArrowRight className="h-4 w-4" />
                Next
            </button>
        </div>
    )
}

export default Pagination
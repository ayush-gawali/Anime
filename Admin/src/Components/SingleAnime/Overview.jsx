import React from 'react'

function Overview({anime}) {

    const details = [
        ["Type", anime?.format],
        ["Episodes", anime?.episodes],
        // ["Genres", anime.genres?.map((item) => (item + ", "))],
        // ["Aired", (anime?.startDate?.day + " " + anime?.startDate?.month + " " + anime?.startDate?.year) + " to Aug 30, 2021 Fix"],
        ["Status", anime?.status],
        ["Year", anime?.seasonYear],
        // ["Studios", anime?.studios?.nodes?.map((item) => item.isAnimationStudio && (item.name + ", "))],
        ["Source", anime?.source],
        // ["Rating", "R-17+ Fix"],
        // ["Duration", anime.duration + " min"]
    ];

    return (
        
            <div className='flex px-25 mt-20 gap-50'>
                <div>
                    <h2 className='mb-6 font-bold text-3xl'>Details</h2>
                    <table>
                        <tbody>
                            {details.map((item, index) => (
                                <tr key={index} >
                                    <td className='pe-6 pb-4 flex self-start pt-1'>{item[0]}</td>
                                    <td className='pb-4 w-34'>{item[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className='mb-6 font-bold text-3xl'>Description</h2>
                    <p className='text-gray-300 font-medium' dangerouslySetInnerHTML={{ __html: anime.description }}></p>
                </div>
            </div>
    )
}

export default Overview
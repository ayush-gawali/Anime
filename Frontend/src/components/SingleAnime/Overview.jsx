import React from 'react'

function Overview({ anime }) {
    // Helper to convert month number (1-12) to full name
    const getMonthName = (monthNum) => {
        if (!monthNum) return '';
        const date = new Date();
        date.setMonth(monthNum - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    };

    const details = [
        ["Type", anime?.format],
        ["Episodes", anime?.episodes],
        ["Status", anime?.status],
        ["Year", anime?.seasonYear],
        ["Source", anime?.source],
        ["Aired", anime?.startDate ? `${anime.startDate.day} ${getMonthName(anime.startDate.month)} ${anime.startDate.year}` : 'N/A'],
        ["End", anime?.endDate ? `${anime.endDate.day} ${getMonthName(anime.endDate.month)} ${anime.endDate.year}` : 'N/A'],
    ];

    return (
        <div className='flex mx-25 mt-20 gap-40 w-fit'>
            <div className='w-3/5'>
                <h2 className='mb-6 font-bold text-3xl'>Details</h2>
                <table>
                    <tbody>
                        {details.map((item, index) => (
                            <tr key={index} >
                                <td className='pe-6 pb-4 flex self-start pt-1'>{item[0]}</td>
                                <td className='pb-4 w-38'>{item[1]}</td>
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

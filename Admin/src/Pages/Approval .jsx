import React from 'react'
import { Check, X } from "lucide-react";
import { useEffect } from 'react';
import { approveApprovalAnime, getApproveAnimeList, rejectApprovalAnime } from '../services/api';
import { useState } from 'react';

function Approval() {

    const [requests, setRequests] = useState([]);
    const onApprove = (requestId) => {
        approveApprovalAnime(requestId);
    };
    
    const onReject = (requestId) => {
        rejectApprovalAnime(requestId)
    };

    const getList = async () => {
        const responce = await getApproveAnimeList();
        setRequests(responce);
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 px-10 py-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Anime Update Requests</h1>
                <p className="text-zinc-400 mt-1">
                    Review and approve automated anime updates
                </p>
            </div>

            {requests?.count === 0 && (
                <div className="text-zinc-400">No pending update requests.</div>
            )}

            <div className="space-y-6">
                {requests?.data?.map((items) => (
                    <div
                        key={items._id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
                    >
                        {/* Anime Title */}
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">
                                {items?.oldData?.title?.english || items?.oldData?.title?.romaji || items?.oldData?.title?.native || "Unknown Anime"}
                            </h2>
                            <p className="text-sm text-zinc-400">
                                Source: {items?.source} • Requested on {new Date(items.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Diff Table */}
                        <div className="overflow-hidden rounded-lg border border-zinc-800">
                            <table className="w-full text-sm">
                                <thead className="bg-zinc-800 text-zinc-300">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Field</th>
                                        <th className="px-4 py-2 text-left">Old</th>
                                        <th className="px-4 py-2 text-left">New</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(items.diff).map(([field, values]) => (
                                        <tr key={field} className="border-t border-zinc-800">
                                            <td className="px-4 py-2 font-medium capitalize">
                                                {field}
                                            </td>
                                            <td className="px-4 py-2 text-red-400">
                                                {String(values.old)}
                                            </td>
                                            <td className="px-4 py-2 text-green-400">
                                                {String(values.new)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => onApprove(items._id)}
                                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
                            >
                                <Check size={18} /> Approve
                            </button>
                            <button
                                onClick={() => onReject(items._id)}
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                            >
                                <X size={18} /> Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Approval



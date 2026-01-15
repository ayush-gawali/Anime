import React, { useEffect, useState } from 'react'
import { Plus, Check, X } from "lucide-react";
import { addAnimeToCollection, addUserCollections, removeAnimeFromCollection } from '../../services/user.api';

function ColectionCard({
    collections,
    setCollections,
    animeId
}) {

    const onCreate = async (collectionName) => {
        const responce = await addUserCollections(collectionName);
        if (responce.success) {
            setCollections(responce.data);
        }
    }

    const add_Anime_to_collection = async (collectionId, animeId) => {
        const responce = await addAnimeToCollection(collectionId, animeId);
        setCollections(responce.data);
    }

    const delete_Anime_from_collection = async (collectionId, animeId) => {
        const reposnce = await removeAnimeFromCollection(collectionId, animeId);
        setCollections(reposnce.data);
    };

    const check_in_collection = (animes) => {
        const find = animes.find(({ _id }) => _id === animeId);
        return find ? true : false;
    }


    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 px-10 pb-20">
            {collections?.map((collection) => {
                const isAdded = check_in_collection(collection.animes);

                return (
                    <div
                        key={collection._id}
                        className="group relative aspect-square rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                        {/* Show badge ONLY if added */}
                        {isAdded && (
                            <span className="absolute top-3 right-3 z-10 text-xs px-3 py-1 rounded-full font-medium bg-green-600 text-white">
                                Added
                            </span>
                        )}

                        {/* Collection Name */}
                        <span className="text-zinc-100 font-medium text-center px-2">
                            {collection.name}
                        </span>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            {isAdded ? (
                                <button
                                    type="button"
                                    onClick={() => delete_Anime_from_collection(collection._id, animeId)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <X size={18} /> Remove
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => add_Anime_to_collection(collection._id, animeId)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    <Plus size={18} /> Add Anime
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Add New Collection Card */}
            <button
                type="button"
                onClick={() => document.getElementById("my_modal_4").showModal()}
                className="aspect-square rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 hover:border-purple-500 hover:text-purple-400 cursor-pointer transition"
            >
                <Plus size={36} />
                <span className="mt-2 text-md">New Collection</span>
            </button>

            <Dialog onCreate={onCreate} />
        </div>
    )
}

const Dialog = ({ onCreate }) => {

    const [name, setName] = useState("");

    return (
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-1/3 max-w-md bg-zinc-950 text-zinc-100 border border-zinc-800">

                {/* Title */}
                <h3 className="font-bold text-lg mb-4">
                    Create New Collection
                </h3>

                {/* Input */}
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Collection name"
                    className="input input-bordered w-full bg-zinc-900 border-zinc-700 mb-2"
                    id="collection_name"
                />

                {/* Optional helper text */}
                <p className="text-sm text-zinc-400">
                    Give your collection a unique name
                </p>

                {/* Actions */}
                <div className="modal-action">
                    <form method="dialog" className="flex gap-3">
                        <button className="btn btn-ghost">
                            Cancel
                        </button>

                        <button
                            className="btn bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => { onCreate(name), setName(""), document.getElementById('my_modal_4').close() }}
                        >
                            Create
                        </button>
                    </form>
                </div>

            </div>
        </dialog>
    )
}

export default ColectionCard
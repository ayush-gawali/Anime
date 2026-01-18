import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteColletion, getUserCollections } from "../services/user.api";

// Collections Page
// Shows all user collections with delete option
// NOTE:
// This version does NOT rely on react-router hooks (useNavigate)
// to avoid crashes when rendered outside <Router>.
// Navigation is delegated to the parent via onOpen callback.

export default function CollectionsPage() {

    const [collections, setCollections] = useState([]);

    const deleteCollection = async (collectionId) => {
        deleteColletion(collectionId);
    }

    useEffect(() => {
        getUserCollections().then(res => {
            setCollections(res.data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 px-10 py-10">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Collections</h1>
                <p className="text-zinc-400 mt-1">
                    Manage and explore your anime collections
                </p>
            </div>

            {/* Empty State */}
            {collections?.length === 0 && (
                <div className="text-zinc-400">No collections created yet.</div>
            )}

            {/* Collection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {collections?.map((collection) => (
                    <div
                        key={collection._id}
                        role="button"
                        tabIndex={0}
                        className="relative group aspect-square rounded-xl border border-zinc-800 bg-zinc-900 cursor-pointer hover:border-purple-500 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {/* Delete Button */}
                        <button
                            type="button"
                            onClick={ ()=>deleteCollection(collection._id) }
                            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-red-500 opacity-0 group-hover:opacity-100 transition hover:scale-150"
                            aria-label="Delete collection"
                        >
                            <Trash2 size={18} />
                        </button>

                        {/* Collection Name */}
                        <div className="flex items-center justify-center h-full px-4">
                            <span className="text-lg font-semibold text-center">
                                {collection?.name} {` - `} {collection?.animes?.length} 
                            </span>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    // onClick={() => document.getElementById("my_modal_4").showModal()}
                    className="aspect-square rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 hover:border-purple-500 hover:text-purple-400 cursor-pointer transition"
                >
                    <Plus size={40} />
                    <span className="mt-2 text-lg">New Collection</span>
                </button>
            </div>

            
        </div>
    );
}

/*
USAGE EXAMPLE (inside Router):

<CollectionsPage
  collections={collections}
  onDelete={(id) => deleteCollection(id)}
  onOpen={(id) => navigate(`/collections/${id}`)}
/>

USAGE EXAMPLE (outside Router):

<CollectionsPage
  collections={collections}
  onDelete={handleDelete}
  onOpen={(id) => window.location.href = `/collections/${id}`}
/>
*/

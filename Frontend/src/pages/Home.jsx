import { useContext, useEffect, useState } from "react";
import { context } from "../store/contest";
import axios from "axios";

export default function Home() {
  const [animes, setAnimes] = useState([]);

  const { BACKEND_URL } = useContext(context);

  const fetchAnimes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/anime/get_all_animes`);
      setAnimes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching animes:", error);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Discover Your Next
            <span className="block text-purple-400">Favorite Anime</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-zinc-300">
            Track what you’re watching, build collections, and explore top anime — all in one place.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-purple-500 btn hover:bg-purple-600">Explore Anime</button>
            <button variant="outline" className="btn btn-outline border-zinc-500 text-white">Create Collection</button>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">🔥 Trending Anime</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {animes.slice(0, 8).map(anime => (
            <div key={anime._id} className="card bg-zinc-900 border-zinc-800 hover:scale-[1.02] transition">
              <div className="card-body p-4 space-y-3">
                <div className="h-40 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500">
                  Cover Image
                </div>
                <h3 className="font-semibold truncate card-title">
                  {console.log(anime)}
                  {anime?.title?.english || anime?.title?.romaji || anime?.title?.native}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="badge" >Action</span>
                  <span className="badge">Fantasy</span>
                </div>
                <button size="sm" className="btn w-full">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold">📺 Track Progress</h3>
            <p className="text-zinc-400 mt-2">Manage watching, watched, and watch-later lists effortlessly.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">📂 Custom Collections</h3>
            <p className="text-zinc-400 mt-2">Create personalized collections for every mood.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">⚡ Fast & Secure</h3>
            <p className="text-zinc-400 mt-2">JWT-secured backend with optimized APIs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

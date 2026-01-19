import express from "express";
import { addAnimeDB, approveAnimeUpdate, deleteAnimeDB, getAllAnimes, getAnimeByAniplixId, getAnimeByFilter, getAnimeById, getAnimes, getPendingAnimeUpdates, manualSingleAnimeUpdateCheck, rejectAnimeUpdate, updateAnimeDB } from "../Controllers/animeController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import isAdmin from "../Middleware/roleMiddleware.js";

const animeRoute = express.Router();

animeRoute.get("/", (req, res) => {
    res.send("<h1>Anime Route Working</h1>");
});

// Public Routes
animeRoute.get("/get_anime_by_id/:id", getAnimeById);
animeRoute.get("/get_all_animes", getAllAnimes);
animeRoute.get("/get_animes", getAnimes);
animeRoute.get("/get_anime_by_Anilistid/:id", getAnimeByAniplixId);
animeRoute.get("/get_anime_by_filter", getAnimeByFilter);

// Protected Routes


// Admin Routes
animeRoute.post("/add_anime_in_db", authMiddleware, isAdmin, addAnimeDB);
animeRoute.delete("/delete_anime_in_db/:id", authMiddleware, isAdmin, deleteAnimeDB);
animeRoute.patch("/update_anime_in_db/:id", authMiddleware, isAdmin, updateAnimeDB);

animeRoute.post("/check-update/:animeId", manualSingleAnimeUpdateCheck);
// animeRoute.post("/check-update-all-anime");
animeRoute.post("/reject-anime-approval/:requestId", authMiddleware, isAdmin, rejectAnimeUpdate);
animeRoute.post("/approve-anime-approval/:requestId", authMiddleware, isAdmin, approveAnimeUpdate);
animeRoute.get("/get-approve-anime", authMiddleware, isAdmin, getPendingAnimeUpdates);



export default animeRoute
import express from "express";
import { addAnimeToCollection, addOrUpdateAnimeStatus, createCollection, deleteCollection, getCollections, getStatusCount, getUserAnimeList, getUserAnimeListById, removeAnimeFromCollection, removeAnimeFromList } from "../Controllers/animeListController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
    res.send("<h1>User Route Working</h1>");
});



// Protected Routes
userRoute.get("/user-anime-list", authMiddleware, getUserAnimeList);
userRoute.get("/user-animeList-status-number", authMiddleware, getStatusCount);
userRoute.get("/user-anime-list/status/:animeId", authMiddleware, getUserAnimeListById);
userRoute.post("/user-anime-list/status", authMiddleware, addOrUpdateAnimeStatus);
userRoute.delete("/user-anime-list/:animeId", authMiddleware, removeAnimeFromList);

userRoute.post("/collections",authMiddleware, createCollection);
userRoute.post("/collections/add",authMiddleware, addAnimeToCollection);
userRoute.get("/collections",authMiddleware, getCollections);
userRoute.delete("/delect-collections/:collectionId",authMiddleware, deleteCollection);
userRoute.delete("/collections/remove-anime",authMiddleware, removeAnimeFromCollection);






export default userRoute
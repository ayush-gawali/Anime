import userAnimeListModel from "../Models/UserAnimeListModel.js";
import userModel from "../Models/userModel.js";

export const getUserAnimeList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;

        const user = await userModel.findById(userId);
        if (!user || !user.listId) {
            return res.status(404).json({ message: "Anime list not found" });
        }

        const animeList = await userAnimeListModel.findById(user.listId)
            .populate("animes.anime", "title coverImage rating");

        let result = animeList.animes;

        if (status) {
            result = result.filter(item => item.status === status);
        }

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getStatusCount = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if (!user || !user.listId) {
            return res.status(404).json({ message: "Anime list not found" });
        }

        const animeList = await userAnimeListModel.findById(user.listId)
            .populate("animes.anime", "title coverImage rating");


        const counts = animeList.animes.reduce(
            (acc, item) => {
                acc[item.status] = (acc[item.status] || 0) + 1;
                return acc;
            },
            { watching: 0, watched: 0, watch_later: 0 }
        );

        counts.collections = animeList.collections.length;

        res.status(200).json({
            success: true,
            data: counts
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getUserAnimeListById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { animeId } = req.params;

        const user = await userModel.findById(userId);
        if (!user || !user.listId) {
            return res.status(404).json({ message: "Anime list not found" });
        }

        const { animes } = await userAnimeListModel.findById(user.listId);

        const animeStatus = animes.find(
            item => item.anime.toString() === animeId
        );
        if (animeStatus) {
            return res.status(200).json({
                success: true,
                data: animeStatus
            });
        } else {
            return res.status(200).json({
                success: false,
            });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
        console.log(err);
    }
};

export const addOrUpdateAnimeStatus = async (req, res) => {
    try {
        const { animeId, status } = req.body;
        const userId = req.user.id;

        if (!animeId || !status) {
            return res.status(400).json({
                success: false,
                message: "animeId and status are required"
            });
        }

        const user = await userModel.findById(userId);

        if (!user || !user.listId) {
            return res.status(404).json({ message: "Anime list not found" });
        }

        const animeList = await userAnimeListModel.findById(user.listId);

        const existing = animeList.animes.find(
            a => a.anime.toString() === animeId
        );

        if (existing) {
            existing.status = status;
            existing.updatedAt = Date.now();
        } else {
            animeList.animes.push({
                anime: animeId,
                status
            });
        }

        await animeList.save();

        res.status(200).json({
            success: true,
            message: "Anime status updated"
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const removeAnimeFromList = async (req, res) => {
    try {
        const { animeId } = req.params;
        const userId = req.user.userId;

        const user = await userModel.findById(userId);
        const animeList = await userAnimeListModel.findById(user.listId);

        animeList.animes = animeList.animes.filter(
            item => item.anime.toString() !== animeId
        );

        await animeList.save();

        res.status(200).json({
            success: true,
            message: "Anime removed from list"
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// creteate collection
export const createCollection = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        if (!name) {
            return res.status(400).json({ message: "Collection name required" });
        }

        const user = await userModel.findById(userId);
        const animeList = await userAnimeListModel.findById(user.listId);

        const exists = animeList.collections.find(
            c => c.name.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
            return res.status(400).json({ message: "Collection already exists" });
        }

        animeList.collections.push({ name });
        await animeList.save();

        const animeListPopulated = await userAnimeListModel.findById(animeList._id)
            .populate("collections.animes", "title coverImage");

        res.status(201).json({
            success: true,
            message: "Collection created",
            data: animeListPopulated.collections
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
        console.log(err);
    }
};

// add anime to collection
export const addAnimeToCollection = async (req, res) => {
    try {
        const { animeId, collectionId } = req.body;
        const userId = req.user.id;
        if (!animeId || !collectionId) {
            return res.status(400).json({ message: "animeId and collectionId are required" });
        }
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const user = await userModel.findById(userId);
        const animeList = await userAnimeListModel.findById(user.listId);

        const collection = animeList.collections.id(collectionId);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }

        if (!collection.animes.includes(animeId)) {
            collection.animes.push(animeId);
        }

        await animeList.save();

        const animeListPopulated = await userAnimeListModel.findById(animeList._id)
            .populate("collections.animes", "title coverImage");

        res.status(200).json({
            success: true,
            message: "Anime added to collection",
            data: animeListPopulated.collections
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// get all collections
export const getCollections = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        const animeList = await userAnimeListModel.findById(user.listId)
            .populate("collections.animes", "title coverImage");

        res.status(200).json({
            success: true,
            data: animeList.collections
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// delete collection
export const deleteCollection = async (req, res) => {
    try {
        const { collectionId } = req.params;

        if (!collectionId) {
            return res.status(400).json({ success: false, message: "Collection ID required" });
        }

        const user = await userModel.findById(req.user.id);
        if (!user || !user.listId) {
            return res.status(404).json({ success: false, message: "User list not found" });
        }

        const animeList = await userAnimeListModel.findById(user.listId);
        if (!animeList) {
            return res.status(404).json({ success: false, message: "Anime list not found" });
        }

        animeList.collections = animeList.collections.filter(
            c => c._id.toString() !== collectionId
        );

        await animeList.save();

        res.status(200).json({
            success: true,
            message: `Collection deleted`,
            data: animeList.collections
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
        console.log(err);
    }
};

export const removeAnimeFromCollection = async (req, res) => {
    try {
        const { collectionId, animeId } = req.query;

        const userId = req.user.id;
        if (!animeId || !collectionId) {
            return res.status(400).json({ message: "animeId and collectionId are required" });
        }
        const user = await userModel.findById(userId);
        const animeList = await userAnimeListModel.findById(user.listId);
        const collection = animeList.collections.id(collectionId);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        collection.animes = collection.animes.filter(
            anime => anime.toString() !== animeId
        );
        await animeList.save();
        const animeListPopulated = await userAnimeListModel.findById(animeList._id)
            .populate("collections.animes", "title coverImage");
        res.status(200).json({
            success: true,
            message: "Anime removed from collection",
            data: animeListPopulated.collections
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

import animeModel from "../Models/animeModel.js";
import animeUpdateRequestModel from "../Models/animeUpdateRequestModel.js";
import { checkAnimeForUpdate } from "../services/animeUpdate.service.js";


// add anime in database
export const addAnimeDB = async (req, res) => {
    try {
        // Logic to add anime in database
        const { id, title, startDate, endDate, averageScore, episodes, description, season, seasonYear, source, status, bannerImage, coverImage, format } = req.body;

        // validation
        if (!id || !title) {
            return res.status(400).json({
                success: false,
                message: "Anime ID and title are required"
            });
        }

        // check if anime already exists
        const existingAnime = await animeModel.findOne({ aniplixId: id });

        if (existingAnime) {
            return res.status(400).json({
                success: false,
                message: "Anime already exists"
            });
        }

        const anime = await animeModel.create({
            aniplixId: id,
            title: title,
            startDate: startDate,
            endDate: endDate,
            episodes: episodes,
            season: season,
            seasonYear: seasonYear,
            source: source,
            status: status,
            bannerImage: bannerImage,
            coverImage: coverImage,
            format: format,
            description: description,
            averageScore: averageScore
        });

        res.status(201).json({
            success: true,
            animeData: anime
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Side Error" });
    }
}

// delete anime from database
export const deleteAnimeDB = async (req, res) => {
    try {
        // Logic to delete anime from database
        const { id } = req.params;
        await animeModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Anime deleted from database"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Side Error" });
    }
}

export const getAnimes = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 8,
            sortBy = 'seasonYear',
            sortOrder = 'desc',
            format,
            genres,
            season,
            status,
            year,
            search,
            rating
        } = req.query;

        // Convert page and limit to numbers
        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;

        // Build filter object
        const filter = {};

        // Search across multiple fields
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Format filter (TV, MOVIE, etc.)
        if (format) {
            filter.format = format.toUpperCase();
        }

        // Genres filter (array match - anime can have multiple genres)
        if (genres) {
            const genreArray = genres.split(",").map(g => g.trim());
            filter.genres = { $in: genreArray };
        }

        // Season filter (WINTER, SPRING, SUMMER, FALL)
        if (season) {
            filter.season = season.toUpperCase();
        }

        // Status filter (ONGOING, COMPLETED, etc.)
        if (status) {
            filter.status = status.toUpperCase();
        }

        // Year filter (using seasonYear as per your schema)
        if (year) {
            filter.seasonYear = parseInt(year);
        }

        // Rating filter
        if (rating) {
            filter.rating = { $gte: parseFloat(rating) };
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query
        const animes = await animeModel
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNum)
            .lean();

        // Get total count
        const total = await animeModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limitNum);
        const hasNext = pageNum < totalPages;
        const hasPrev = pageNum > 1;

        res.status(200).json({
            success: true,
            data: animes,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalItems: total,
                itemsPerPage: limitNum,
                hasNext,
                hasPrev
            }
        });

    } catch (error) {
        console.error('Anime filter error:', error.message);
        res.status(500).json({
            success: false,
            message: "getAnimeByFilter failed"
        });
    }
};


// update anime in database
export const updateAnimeDB = async (req, res) => {
    try {
        // Logic to update anime in database
        const { id } = req.params;
        const { title, imageUrl, episodes, genres } = req.body;
        const updatedAnime = await animeModel.findByIdAndUpdate(id, {
            title,
            imageUrl,
            episodes,
            genres
        }, { new: true });
        res.status(200).json({
            success: true,
            message: "Anime updated in database",
            animeData: updatedAnime
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Side Error" });
    }
}

// get all animes
export const getAllAnimes = async (req, res) => {
    try {
        const animes = await animeModel.find({});
        res.status(200).json({
            success: true,
            data: animes
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Side Error" });
    }
}

// get anime by id
export const getAnimeById = async (req, res) => {
    try {
        const { id } = req.params;
        const anime = await animeModel.findById(id);
        if (!anime) {
            return res.status(404).json({
                success: false,
                message: "Anime not found"
            });
        }
        res.status(200).json({
            success: true,
            data: anime
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Side Error" });
    }
}

export const getAnimeByAniplixId = async (req, res) => {
    try {
        const { id } = req.params;

        const anime = await animeModel.findOne({ aniplixId: id });
        if (!anime) {
            return res.status(200).json({
                success: false,
                message: "Anime not found"
            });
        }
        res.status(200).json({
            success: true,
            data: anime
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Side Error" });
    }
}


export const getAnimeByFilter = async (req, res) => {
    try {
        const { format, genres, season, status, year } = req.query;
        const filter = {};

        // format filter
        if (format) {
            filter.format = format.toUpperCase();
        }

        // genres filter (array match)
        if (genres) {
            filter.genres = {
                $in: genres.split(",").map(g => g.trim())
            };
        }

        // season filter
        if (season) {
            filter.season = season.toUpperCase();
        }

        // status filter
        if (status) {
            filter.status = status.toUpperCase();
        }

        // year filter
        if (year) {
            filter.seasonYear = year;
        }

        const animes = await animeModel.find(filter);

        res.status(200).json({ success: true, data: animes });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "getAnimeByFilter fail", success: fail });
    }
}

export const manualAnimeUpdateCheck = async (req, res) => {
    const animes = await animeModel.find({});

    for (const anime of animes) {
        await checkAnimeForUpdate(anime, "manual");
    }

    res.json({
        success: true,
        message: "Anime update check completed"
    });
};

export const manualSingleAnimeUpdateCheck = async (req, res) => {
    try {
        const { animeId } = req.params;

        const anime = await animeModel.findById(animeId);
        if (!anime) {
            return res.status(404).json({
                success: false,
                message: "Anime not found"
            });
        }

        const data = await checkAnimeForUpdate(anime, "manual");

        return res.json({
            success: true,
            message: "Anime update check completed",
            animeId,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const approveAnimeUpdate = async (req, res) => {
    try {
        const { requestId } = req.params;
        const adminId = req.user.id; // from JWT middleware

        const updateRequest = await animeUpdateRequestModel.findById(requestId);

        if (!updateRequest) {
            return res.status(404).json({
                success: false,
                message: "Update request not found"
            });
        }

        if (updateRequest.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: `Request already ${updateRequest.status}`
            });
        }

        // Apply update to Anime

        // Mark request as approved
        updateRequest.status = "approved";
        updateRequest.approvedBy = adminId;
        updateRequest.approvedAt = new Date();
        await updateRequest.save();

        return res.json({
            success: true,
            message: "Anime update approved and applied"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const rejectAnimeUpdate = async (req, res) => {
    try {
        const { requestId } = req.params;
        const adminId = req.user.id;

        const updateRequest = await animeUpdateRequestModel.findById(requestId);

        if (!updateRequest) {
            return res.status(404).json({
                success: false,
                message: "Update request not found"
            });
        }

        if (updateRequest.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: `Request already ${updateRequest.status}`
            });
        }

        updateRequest.status = "rejected";
        updateRequest.approvedBy = adminId;
        updateRequest.approvedAt = new Date();
        await updateRequest.save();

        return res.json({
            success: true,
            message: "Anime update rejected"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPendingAnimeUpdates = async (req, res) => {
    try {
        // const requests = await animeUpdateRequestModel.find({ status: "pending" })
        const requests = await animeUpdateRequestModel.find()
            .populate("anime", "title aniplixId")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
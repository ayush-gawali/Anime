import animeModel from "../Models/animeModel.js";


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
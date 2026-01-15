import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
    aniplixId: { type: Number, required: true, unique: true }, // Done
    title: { type: {}, required: true, default: {} }, //Done
    startDate: { type: {} }, 
    endDate: { type: {} }, 
    episodes: { type: Number }, 
    season: { type: String}, 
    seasonYear: { type: String }, 
    source: { type: String }, 
    status: { type: String }, 
    bannerImage: { type: String }, 
    coverImage: { type: {} }, 
    format  : { type: String }, 
    averageScore: { type: Number },
    description: { type: String },

    // imageUrl: { type: String, default: "" },
    // episodes: { type: Number, default: 0 },
    // genres: { type: [String], default: [] },
}, { timestamps: true });

const animeModel = mongoose.model.Anime || mongoose.model("Anime", animeSchema);

export default animeModel;
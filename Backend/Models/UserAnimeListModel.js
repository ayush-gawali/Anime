import mongoose from "mongoose";

const userAnimeListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    animes: [
      {
        anime: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Anime",
          required: true
        },
        status: {
          type: String,
          enum: ["watching", "watch_later", "watched"],
          required: true
        },
        updatedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // user-defined collections
    collections: [
      {
        name: {
          type: String,
          required: true,
          trim: true
        },

        animes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Anime"
          }
        ],

        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]

  },
  { timestamps: true }
);

const userAnimeListModel = mongoose.model.UserAnimeList || mongoose.model("UserAnimeList", userAnimeListSchema);

export default userAnimeListModel
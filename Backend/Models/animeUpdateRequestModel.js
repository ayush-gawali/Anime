import mongoose from "mongoose";

const AnimeUpdateRequestSchema = new mongoose.Schema(
  {
    // Reference to the original anime
    anime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
      required: true,
      index: true
    },

    // Snapshot before update
    oldData: {
      type: Object,
      required: true
    },

    // Data fetched from external API (candidate update)
    newData: {
      type: Object,
      required: true
    },

    // Only changed fields (diff)
    diff: {
      type: Object,
      required: true
    },

    // Where the update came from
    source: {
      type: String,
      enum: ["cron", "manual"],
      required: true
    },

    // Approval status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true
    },

    // Admin who approved / rejected
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    approvedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

const animeUpdateRequestModel = mongoose.model.AnimeUpdateRequestSchema || mongoose.model("AnimeUpdateRequest", AnimeUpdateRequestSchema);

export default animeUpdateRequestModel
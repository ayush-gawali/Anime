import cron from "node-cron";
import animeModel from "../Models/animeModel.js";
import { checkAnimeForUpdate } from "../services/animeUpdate.service.js";

export const startAnimeUpdateCron = () => {
  // Runs every day at 3 AM
  cron.schedule("0 3 * * *", async () => {
    console.log("🔄 Anime update cron started");

    try {
      const animes = await animeModel.find({});

      for (const anime of animes) {
        try {
          await checkAnimeForUpdate(anime, "cron");
        } catch (err) {
          console.error(
            `❌ Failed update check for anime ${anime._id}`,
            err.message
          );
        }
      }

      console.log("✅ Anime update cron finished");
    } catch (error) {
      console.error("❌ Anime cron job failed", error.message);
    }
  });
};

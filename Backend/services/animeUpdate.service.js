
import animeModel from "../Models/animeModel.js";
import axios from "axios";
import animeUpdateRequestModel from "../Models/animeUpdateRequestModel.js";

/**
 * Compare old vs new anime data and return diff
 */
const generateDiff = (oldData, newData, ignoreFields = ['_id', 'aniplixId', 'updatedAt']) => {
  const diff = {};
  

  // Get ALL keys from both objects
  const allKeys = new Set([
    ...Object.keys(oldData || {}),
    ...Object.keys(newData || {})
  ]);

  allKeys.forEach(key => {
    // Skip ignored fields
    if (ignoreFields.includes(key)) return;

    const oldVal = oldData?.[key];
    const newVal = newData?.[key];

    // Skip if both undefined/null
    if (oldVal == null && newVal == null) return;

    // Handle nested objects recursively
    if (oldVal !== null && typeof oldVal === 'object' &&
      newVal !== null && typeof newVal === 'object') {
      const nestedDiff = generateDiff(oldVal, newVal, ignoreFields);
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff;
      }
    }
    // Simple value comparison (handles null/undefined properly)
    else if (oldVal !== newVal) {
      diff[key] = { old: oldVal, new: newVal };
    }
  });

  return diff;
};


/**
 * Check & create update request for one anime
 */
export const checkAnimeForUpdate = async (anime, source = "cron") => {

  // 1️⃣ Fetch latest data (example external API)
  const data =  await fetchAnimeFromAniList(anime.aniplixId);

  // 2️⃣ Normalize only fields you allow to update
  const newData = {
    title: data.title,
    startDate: data.startDate,
    endDate: data.endDate,
    status: data.status
  };

  const oldData = {
    title: anime.title,
    startDate: anime.startDate,
    endDate: anime.endDate,
    status: anime.status
  };

  // 3️⃣ Generate diff
  const diff = generateDiff(oldData, newData);

  // 4️⃣ If no changes → do nothing
  if (Object.keys(diff).length === 0) return;

  // 5️⃣ Prevent duplicate pending requests
  const exists = await animeUpdateRequestModel.findOne({
    anime: anime._id,
    status: "pending"
  });

  if (exists) return "Alredy exits";

  // 6️⃣ Create update request
  const responce = await animeUpdateRequestModel.create({
    anime: anime._id,
    oldData,
    newData,
    diff,
    source,
    status: "pending"
  });

  return responce;
};


// Fetch by AniList ID
async function fetchAnimeFromAniList(anilistId) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        title { romaji english native }
        status
        startDate { year month day }
        endDate { year month day }
        season
        seasonYear
      }
    }
  `;

  const variables = { id: anilistId };

  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });

    const { data } = await response.json();
    const media = data.Media;

    return media;
  } catch (error) {
    console.error('AniList fetch failed:', error);
    return null;
  }
}


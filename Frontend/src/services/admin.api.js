import api from "./api";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem("token");

// ADMIN ONLY
export const addAnime = async (data) => {
  // api.post("/anime/add_anime_in_db", data);
  try {
    const { title , id } = data;
    const response = await axios.post(baseURL + "/anime/add_anime_in_db",
      {
        id:id, 
        title:title.english || title.romaji || title.native,
      },
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export const deleteAnime = (id) =>
  api.delete(`/anime/delete_anime_in_db/${id}`);



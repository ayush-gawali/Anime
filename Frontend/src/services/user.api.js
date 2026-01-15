import axios from "axios";
import api from "./api";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem("token");

export const getAllAnimes = async () => {
  try {
    const reponse = await axios.get(`${baseURL}/anime/get_all_animes`);
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const setAnimeStatus = async (animeId, status) => {
  try {
    const reponse = await axios.post(`${baseURL}/user/user-anime-list/status`, {
      animeId,
      status
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (reponse.data.success) {
      return status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUserCollections = async (collectionName) => {
  try {
    const reponse = await axios.post(`${baseURL}/user/collections`, {
      name: collectionName
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}

export const getUserCollections = async () => {
  try {
    const reponse = await axios.get(`${baseURL}/user/collections`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return reponse.data;
  } catch (error) {
    console.log(error);
  }
}

export const addAnimeToCollection = async (collectionId, animeId) => {
  try {
    const reponse = await axios.post(`${baseURL}/user/collections/add`, {
      collectionId,
      animeId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (reponse.data.success) {
      return reponse.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const removeAnimeFromCollection = async (collectionId, animeId) => {
  try {
    const responce = await axios.delete(`${baseURL}/user/collections/remove-anime?animeId=${animeId}&collectionId=${collectionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log(responce);
    if (responce.data.success) {
      return responce.data
    }

  } catch (error) {
    console.log(error);
  }
}


export const searchFilter = async (filters) => {
  try {
    const { format, genres, season, status, year } = filters;
    const response = await axios.get(
      `${baseURL}/anime/get_anime_by_filter`,
      {
        params: {
          format,
          genres,
          season,
          status,
          year,
        },
      }
    );

    if(response.data.success){
      return response.data ; 
    }

  } catch (error) {
    console.log(error);
  }
}



// import api from "./api";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem("token");

// ADMIN ONLY
export const addAnime = async (data) => {
  // api.post("/anime/add_anime_in_db", data);
  try {
    const { title, id, startDate, endDate, trailer, episodes, description, season, seasonYear, source, status, bannerImage, coverImage, format, averageScore } = data;
    const response = await axios.post(baseURL + "/anime/add_anime_in_db",
      {
        id: id,
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
        averageScore: averageScore,
        trailer: trailer,
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


export const deleteAnime = async (id) => {
  try {
    const response = await axios.delete(baseURL + "/anime/delete_anime_in_db" + `/${id}`,
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

export const updateAnime = async (id, data) => {
  try {
    const response = await axios.post(baseURL + "/anime/update_anime_in_db" + `/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    console.log(response);

  } catch (error) {
    console.log(error);
  }
}



export const getApproveAnimeList = async () => {
  try {
    const response = await axios.get(`${baseURL}/anime/get-approve-anime`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.data.success) {
      return response.data;
    }

  } catch (error) {
    console.log(error);
  }
}

export const rejectApprovalAnime = async (requestId) => {
  try {
    const response = await axios.post(`${baseURL}/anime/reject-anime-approval/${requestId}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response);

    // if (response.data.success) {
    //   return response.data;
    // }

  } catch (error) {
    console.log(error);
  }
}

export const approveApprovalAnime = async (requestId) => {
  try {
    const response = await axios.post(`${baseURL}/anime/approve-anime-approval/${requestId}`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response);

    // if (response.data.success) {
    //   return response.data;
    // }

  } catch (error) {
    console.log(error);
  }
}

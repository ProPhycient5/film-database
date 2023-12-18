import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_MOVIEFLIX_TOKEN;
const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const data = axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d
// &sort_by=popularity.desc
// &primary_release_year=2023
// &page=1
// &vote_count.gte=100
// &with_genres=16,80,14

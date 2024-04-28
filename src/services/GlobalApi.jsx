const { default: axios } = require("axios");

const API_KEY = "77d7bda14f2f481787bdd0b0a148ef92";
const axiosCreate = axios.axiosCreate({
  baseURL: "https://api.rawg.io/api",
});

const getGenreList = axiosCreate.get("/genres?key=" + API_KEY);

export default { getGenreList };

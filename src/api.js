import axios from "axios";

const api = axios.create({
  baseURL: "https://66e2f551494df9a478e3c7ef.mockapi.io/Contacts",
});

export default api;

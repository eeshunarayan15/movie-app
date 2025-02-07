import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWIzNTdkYjgxODA1NmY4ODI4ZTBlOWRhMmE1ODBmZSIsIm5iZiI6MTczODAxODU5Mi41NDQsInN1YiI6IjY3OTgwZjIwMDljMjUyZTNhYjIzZWY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTGNjDTc6DQvJp_syN6emy5V0e8sRj8PPbcSQ6N9RQE",
  },
});

export default instance;
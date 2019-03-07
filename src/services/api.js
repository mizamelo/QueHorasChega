import axios from "axios";

const api = axios.create({
  baseURL: "http://wellingtonsoares-001-site3.atempurl.com/api/getrak/teste/"
});

export default api;

import axios from "axios";
import axiosClient from "./axiosClient";

const DishAPI = {
  Get_All: (user_id) => {
    const url = `/api/dish/getAll/${user_id}`;
    return axiosClient.get(url);
  },

  Get_Item: (id) => {
    const url = `/api/dish/getItem/${id}`;
    return axiosClient.get(url);
  },

  Search: (input) => {
    const url = `/api/dish/search/${input}`;
    return axiosClient.get(url);
  },

  Put: (data) => {
    const url = `/api/dish/update`;
    return axiosClient.put(url, data);
  },

  Create: (data) => {
    const url = "/api/dish/create";
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/dish/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default DishAPI;

import axios from "axios";
import axiosClient from "./axiosClient";

const ReviewAPI = {
  Get_All: () => {
    const url = "/api/dish/getAll";
    return axiosClient.get(url);
  },

  Get_Res: (id) => {
    const url = `/api/comment/getItemByRestaurant/${id}`;
    return axiosClient.get(url);
  },

  Get_Item_: (id) => {
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

export default ReviewAPI;

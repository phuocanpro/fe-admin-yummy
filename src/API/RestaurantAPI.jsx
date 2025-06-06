import axios from "axios";
import axiosClient from "./axiosClient";

const RestaurantAPI = {
  Get_All: () => {
    const url = "/api/restaurant/getAll";
    return axiosClient.get(url);
  },

  Get_Item: (id) => {
    const url = `/api/restaurant/getItem/${id}`;
    return axiosClient.get(url);
  },

  Get_Item_Owner: (id) => {
    const url = `/api/restaurant/getItemOwner/${id}`;
    return axiosClient.get(url);
  },

  Search: (input) => {
    const url = `/api/restaurant/search/${input}`;
    return axiosClient.get(url);
  },

  SearchColumn: (label, input) => {
    const url = `/api/restaurant/searchColumn/${label}/${input}`;
    return axiosClient.get(url);
  },

  Put: (id, data) => {
    const url = `/api/restaurant/update/${id}`;
    return axiosClient.put(url, data);
  },

  Create: (data) => {
    const url = "/api/restaurant/create";
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/restaurant/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default RestaurantAPI;

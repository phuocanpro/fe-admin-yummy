import axios from "axios";
import axiosClient from "./axiosClient";

const UserAPI = {
  Get_All_User: () => {
    const url = "/api/getAll";
    return axiosClient.get(url);
  },

  Get_User: (id) => {
    const url = `/api/getUser/${id}`;
    return axiosClient.get(url);
  },

  Put_User: (data) => {
    const url = `/api/update`;
    return axiosClient.put(url, data);
  },

  Login: async (data) => {
    const url = "/api/login";
    // console.log('called')
    return axiosClient.post(url, data);
  },

  Get_Detail_User: (query) => {
    const url = `/api/login${query}`;
    return axiosClient.get(url);
  },

  Register: (data) => {
    const url = "/api/register";
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default UserAPI;

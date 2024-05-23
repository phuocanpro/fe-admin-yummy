import axios from "axios";
import axiosClient from "./axiosClient";

const UserAPI = {
  Get_All_User: () => {
    const url = "/api/user/getAll";
    return axiosClient.get(url);
  },

  Get_User: (id) => {
    const url = `/api/user/getUser/${id}`;
    return axiosClient.get(url);
  },

  Search: (input) => {
    const url = `/api/user/search/${input}`;
    return axiosClient.get(url);
  },

  Put_User: (data) => {
    const url = `/api/user/update`;
    return axiosClient.put(url, data);
  },

  Login: async (data) => {
    const url = "/api/login";
    // console.log('called')
    return axiosClient.post(url, data);
  },

  Register: (data) => {
    const url = "/api/register";
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/user/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default UserAPI;

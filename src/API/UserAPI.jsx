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

  ForgotPassword: (data) => {
    const url = "/api/user/forgot-password";
    return axiosClient.post(url, data);
  },
};

export default UserAPI;

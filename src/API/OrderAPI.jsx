import axios from "axios";
import axiosClient from "./axiosClient";

const OrderAPI = {
  Get_All: () => {
    const url = "/api/orderItems/getAllAll";
    return axiosClient.get(url);
  },

  Get_Res: (id) => {
    const url = `/api/orderItems/getAllByRes/${id}`;
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

  Delete_Admin: (order_id) => {
    const url = `/api/orderItems/deleteAll/${order_id}`;
    return axiosClient.delete(url);
  },
};

export default OrderAPI;

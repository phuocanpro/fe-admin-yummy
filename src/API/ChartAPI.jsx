import axios from "axios";
import axiosClient from "./axiosClient";

const ChartAPI = {
  Get_revenueByMonth: () => {
    const url = "/api/order/revenueByMonth";
    return axiosClient.get(url);
  },

  Get_totalOrderByWeekday: () => {
    const url = `/api/order/totalOrderByWeekday`;
    return axiosClient.get(url);
  },

  Get_totalRating: () => {
    const url = `/api/comment/totalRating`;
    return axiosClient.get(url);
  },

  countRegister: () => {
    const url = `/api/comment/countRegister`;
    return axiosClient.get(url);
  },

  revenueByMonthByOwer: (id) => {
    const url = `/api/order/revenueByMonthByOwer/${id}`;
    return axiosClient.get(url);
  },

  totalOrderByWeekdayByOwner: (id) => {
    const url = `/api/order/totalOrderByWeekdayByOwner/${id}`;
    return axiosClient.get(url);
  },

  totalRatingByOwner: (user_id) => {
    const url = `api/comment/totalRatingByOwner/${user_id}`;
    return axiosClient.get(url);
  },

  dishAmount: (user_id) => {
    const url = `api/dish/dishAmount/${user_id}`;
    return axiosClient.get(url);
  },
};
export default ChartAPI;

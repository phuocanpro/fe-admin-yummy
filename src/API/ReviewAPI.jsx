import axios from "axios";
import axiosClient from "./axiosClient";

const ReviewAPI = {
  Get_Res: (id) => {
    const url = `/api/comment/getItemByRestaurant/${id}`;
    return axiosClient.get(url);
  },


  Delete: (id) => {
    const url = `/api/comment/delete/${id}`;
    return axiosClient.delete(url);
  },
};

export default ReviewAPI;

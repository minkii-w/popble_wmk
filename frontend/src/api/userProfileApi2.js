import axios from "axios";
import { API_SERVER_HOST } from "./popupstoreApi";


const host = `${API_SERVER_HOST}/api/userProfile`;


//유저프로필로 예약내역 가져오기
export const getReservationsByUserProfileId = async (userProfileId) => {
  const res = await axios.get(`${host}/${userProfileId}/reservations`);
  return res.data;
};


//유저프로필 가져오기
export const getUserProfileById = async (id) => {
  const res = await axios.get(`${host}/${id}`);
  return res.data;
};
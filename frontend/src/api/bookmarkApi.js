import axios from "axios";
import jwtAxios from "../utill/jwtUtill";
import { API_SERVER_HOST } from "./popupstoreApi";

const prefix = `${API_SERVER_HOST}/api/bookmark`;

//북마크 추가하기
export const addBookmark = async (userId, popupId) => {
  const res = await jwtAxios.post(`${prefix}/${userId}/${popupId}`);
  return res.data;
};

//북마크 삭제하기
export const deleteBookmark = async (userId, popupId) => {
  const res = await jwtAxios.delete(`${prefix}/${userId}/${popupId}`);
  return res.data;
};

//북마크 목록 조회
export const getBookmarkList = async (userId) => {
  const res = await jwtAxios.get(`${prefix}/list/${userId}`);
  return res.data;
};

//북마크 여부
export const isBookmark = async (userId, popupId) => {
  const res = await jwtAxios.get(`${prefix}/check/${userId}/${popupId}`);
  return res.data;
};

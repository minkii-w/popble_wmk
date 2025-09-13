import axios from "axios";

//스프링부트
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/popup`;

//목록보기
export const getList = async (pageParam, id) => {
  const { page, size } = pageParam;

  const res = await axios.get(`${prefix}/reservation/${id}`);

  return res.data;
};

//팝업스토어예약하기
export const getReservation = async (id) => {
  const res = await axios.get(`${prefix}/reservation/${id}`);
  return res.data;
};

//팝업 상세보기 페이지 가져오기
export const getPopup = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);

  return res.data;
};

//팝업스토어 홍보 게시판 등록하기(사진첨부)
export const postAdd = async (formData) => {
  const res = await axios.post(`${prefix}/`, formData);

  return res.data;
};

export const putOne = async (id, popupStore) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.put(`${prefix}/${id}`, popupStore, header);

  return res.data;
};

export const deleteOne = async (id) => {
  const res = await axios.delete(`${prefix}/${id}`);

  return res.data;
};

export const getOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);

  return res.data;
};

export const postReservation = async (payload) => {
  const res = await axios.post(`${API_SERVER_HOST}/api/reservation`, payload);
  return res.data;
};

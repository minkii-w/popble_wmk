import axios from "axios";
import jwtAxios from "../utill/jwtUtill";

//스프링부트

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/popup`;

//목록보기
export const getList = async (filterData) => {
  console.log("categoryType:", filterData.categoryType);
  const { status, sort, categoryType, categoryId, keyword, pageRequestDTO } =
    filterData;
  const { page, size } = pageRequestDTO;

  const res = await axios.get(`${prefix}/list`, {
    params: {
      status,
      sort,
      categoryType,
      categoryId,
      keyword,
      page,
      size,
    },
  });

  return res.data;
};

//팝업스토어예약하기
export const getReservation = async (id) => {
  const res = await axios.get(`${prefix}/reservation/${id}`);
  return res.data;
};

//카테고리 조회
export const getCategories = async (type) => {
  try {
    const res = await axios.get(`${API_SERVER_HOST}/api/filter/category`, {
      params: { type },
    });
    return res.data;
  } catch (err) {
    console.log("getCategories 실패", err);
    return [];
  }
};

//팝업스토어 진행상태
export const getStatusList = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/api/filter/status`);
  return res.data;
};

//팝업 상세보기 페이지 가져오기
export const getPopup = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);

  return res.data;
};

//팝업스토어 홍보 게시판 등록하기(사진첨부)
export const postAdd = async (popupStore) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.post(`${prefix}/`, popupStore, header);

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

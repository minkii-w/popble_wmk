import axios from "axios";

//스프링부트
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/popup`;

//목록보기
export const getList = async (filterData) => {
  const { status, sort, categoryType, categoryId, pageRequestDTO } = filterData;
  const { page, size } = pageRequestDTO;

  const res = await axios.get(`${prefix}/list`, {
    params: {
      status,
      sort,
      categoryType,
      categoryId,
      page,
      size,
    },
  });

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

//
export const getStatusList = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/api/filter/status`);
  return res.data;
};

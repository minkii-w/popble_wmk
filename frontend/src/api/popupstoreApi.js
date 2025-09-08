import axios from "axios";

//스프링부트
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/popup`;

//목록보기
export const getList = async (filterData) => {
  console.log("categoryType:", filterData.categoryType);
  const { status, sort, categoryType, categoryId,keyword, pageRequestDTO } = filterData;
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
  
  const res = await axios.get(`${prefix}/${id}`)

  return res.data
}
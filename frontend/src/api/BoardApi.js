import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/boards`; 

// ✅ 게시글 단건 조회
export const getOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`); 
  return res.data;
};

// ✅ 게시글 목록 조회
export const getList = async ({ type, order = "latest" }) => {
  const res = await axios.get(`${prefix}`, {
    params: { type, order },
  });
  return res.data; // 백엔드에서 List<BoardResponse> 반환
};

// ✅ 게시글 등록 
export const postAdd = async (boardObj) => {
  // boardObj: { title, content, type, writerId ... }
  const res = await axios.post(`${prefix}`, boardObj); 
  return res.data; // 생성된 게시글 id 
};

// ✅ 게시글 수정 
export const patchOne = async (id, boardObj) => {
  await axios.patch(`${prefix}/${id}`, boardObj); 
  return true;
};

// ✅ 게시글 삭제
export const deleteOne = async (id) => {
  await axios.delete(`${prefix}/${id}`); 
  return true;
};

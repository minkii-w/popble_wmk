import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/ad`;  // ✅ prefix

// 🔹 목록 조회 (페이지네이션 반영)
export const getAdList = async ({ page = 1, size = 10, order, keyword } = {}) => {
  const res = await axios.get(`${prefix}/list`, {
    params: { page, size, order, keyword },
  });
  return res.data;
};

// 🔹 단건 조회
export const getAdOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);
  return res.data;
};

// 🔹 등록 (JSON 전송)
export const createAd = async (payload) => {
  const res = await axios.post(prefix, payload);
  return res.data;
};

// 🔹 등록 (이미지 포함 전송)
export const createAdWithImages = async (payload, files = [], thumbnailIndex = 0) => {
  const fd = new FormData();
  fd.append(
    "board", // ✅ 백엔드 @RequestPart("board")
    new Blob(
      [JSON.stringify({ ...payload, thumbnailIndex })],
      { type: "application/json" }
    )
  );
  files.forEach((file) => fd.append("images", file));

  const res = await axios.post(`${prefix}/with-images`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// 🔹 수정 (JSON 전송)
export const updateAd = async (id, payload) => {
  await axios.put(`${prefix}/${id}`, payload);
};

// 🔹 수정 (이미지 포함 전송)
export const updateAdWithImages = async (
  id,
  payload,
  files = [],
  keepImages = [],
  thumbnailIndex = 0
) => {
  const fd = new FormData();
  fd.append(
    "board", // ✅ 수정도 동일하게 "board"
    new Blob(
      [JSON.stringify({ ...payload, thumbnailIndex })],
      { type: "application/json" }
    )
  );

  files.forEach((f) => fd.append("images", f));
  keepImages.forEach((k) => fd.append("keepImages", k));

  await axios.put(`${prefix}/${id}/with-images`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🔹 삭제
export const deleteAd = async (id) => {
  await axios.delete(`${prefix}/${id}`);
};

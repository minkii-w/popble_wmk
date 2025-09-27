// src/api/adBoardApi.js
import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/ad`;  // ✅ prefix

// 🔹 목록 조회 (페이지네이션 반영)
export const getAdList = async ({ page = 1, size = 10, order, keyword } = {}) => {
  const res = await axios.get(`${prefix}/list`, {
    params: { page, size, order, keyword }, // ✅ page, size 포함
  });
  return res.data;
};

// 🔹 단건 조회
export const getAdOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);
  return res.data;
};

// 🔹 등록 (JSON)
export const createAd = async (payload) => {
  const res = await axios.post(prefix, payload);
  return res.data;
};

// 🔹 등록 (이미지 포함)
export const createAdWithImages = async (payload, files = []) => {
  const fd = new FormData();
  fd.append(
    "board",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );
  files.forEach((file) => fd.append("images", file));

  // ⚠️ headers 직접 지정 제거 → axios가 자동 처리
  const res = await axios.post(`${prefix}/with-images`, fd);
  return res.data;
};

// 🔹 수정 (JSON)
export const updateAd = async (id, payload) => {
  await axios.put(`${prefix}/${id}`, payload);
};

// 🔹 수정 (이미지 포함)
export const updateAdWithImages = async (
  id,
  payload,
  files = [],
  keepImages = []
) => {
  const fd = new FormData();
  fd.append(
    "board",
    new Blob([JSON.stringify(payload)], { type: "application/json" })
  );
  files.forEach((f) => fd.append("images", f));
  keepImages.forEach((k) => fd.append("keepImages", k));

  await axios.put(`${prefix}/${id}/with-images`, fd);
};

// 🔹 삭제
export const deleteAd = async (id) => {
  await axios.delete(`${prefix}/${id}`);
};

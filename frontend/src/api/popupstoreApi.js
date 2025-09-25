import axios from "axios";

// 스프링부트
export const API_SERVER_HOST = "http://localhost:8000";
const prefix = `${API_SERVER_HOST}/api/popup`;

// ===== 목록 조회 =====
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, { params: { page, size } });
  return res.data;
};

// ===== 등록 =====
export const createPopupStore = async (payload, imageFile) => {
  try {
    if (imageFile) {
      const fd = new FormData();
      fd.append(
        "popup",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
      fd.append("images", imageFile);

      const res = await axios.post(`${prefix}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } else {
      const res = await axios.post(`${prefix}`, payload);
      return res.data;
    }
  } catch (err) {
    console.error("[createPopupStore]", err);
    throw err;
  }
};

// ===== 단건 조회 =====
export const getOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);
  return res.data;
};

// ===== 수정 (이미지 없이) =====
export const updatePopupStore = async (id, payload) => {
  try {
    const res = await axios.put(`${prefix}/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("[updatePopupStore]", err);
    throw err;
  }
};

// ===== 수정 (이미지 포함) =====
export const updatePopupStoreWithImages = async (id, payload, files = [], keepImages = []) => {
  try {
    const fd = new FormData();
    fd.append(
      "popup",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    // 기존 이미지 유지 목록 (백엔드에서 keepImages 처리할 경우)
    keepImages.forEach((img) => fd.append("keepImages", img));

    // 신규 이미지 추가
    files.forEach((f) => fd.append("images", f));

    const res = await axios.put(`${prefix}/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("[updatePopupStoreWithImages]", err);
    throw err;
  }
};

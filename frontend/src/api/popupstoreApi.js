import axios from "axios";

//스프링부트
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/popup`;




//팝업스토어 예약내역조회
export const getReservation = async (id) => {
  const res = await axios.get(`${prefix}/reservation/${id}`);
  return res.data;
};


//팝업스토어 홍보 게시판 등록하기(사진첨부)
export const postAdd = async (formData) => {
  const res = await axios.post(`${prefix}/`, formData);

  return res.data;
};


//팝업스토어정보수정(사진변경)
export const putOne = async (id, popupStore) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.put(`${prefix}/${id}`, popupStore, header);

  return res.data;
};

//팝업스토어 정보 삭제
export const deleteOne = async (id) => {
  const res = await axios.delete(`${prefix}/${id}`);

  return res.data;
};

//팝업스토어 정보 가져오기
export const getOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);
  return res.data;
};

//팝업스토어 예약 등록
// export const postReservation = async (payload) => {
// const res = await axios.post(`${prefix}/reservation`,payload,{
//   headers:{
//     "Content-Type":"application/json"
//   }
// })
//   return res.data;
// };



//팝업스토어 예약 등록
export const postReservation = async ({ popupStoreId, userProfileId, date, time, count }) => {
  
  const payload = {
    popupStoreId: popupStoreId,  
    userProfileId: userProfileId,              
    userName: "",                        
    reservationCount: count,
    date: date,
    time: time
  };

  const res = await axios.post(`${prefix}/reservation`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  return res.data;
};

import axios from "axios";

//스프링부트
export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/popup`

//목록보기
export const getList = async (pageParam) => {

    const {page, size} = pageParam;

    const res = await axios.get(`${prefix}/list`, {params:{page:page,size:size}})

    return res.data;
}


//팝업스토어예약하기
export const getReservation = async (id) => {

    const res = await axios.get(`${prefix}/${id}`)

    return res.data;
}
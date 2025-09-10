import axios  from "axios";
import { API_SERVER_HOST } from "./popupstoreApi";

const host = `${API_SERVER_HOST}/api/user`

export const loginPost = async (loginParam) => {

    const header = {headers: {"Content-Type":"x-www-form-urlencoded"}}

    const form = new FormData()
    form.append("username",loginParam.loginId)
    form.append("password", loginParam.password)

    const res = await axios.post(`${host}/login`,form, header)

    return res.data

}

export const postAdd = async (join) => {

    const head = {headers: {"Content-Type":"application/json"}}

    const res = await axios.post(`${host}/join`,join, head)

    return res.data
}
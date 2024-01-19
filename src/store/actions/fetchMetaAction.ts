import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT,
    GET_META_URL,
    GET_META_SUCCESS,
    GET_META_ERROR,

    SAVE_META_URL,
    SAVE_META_SUCCESS,
    SAVE_META_ERROR,
} from "src/store/constants";
import { resolve6 } from "dns";

export const fetchMeta = (type, uniqueId) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT}${GET_META_URL}?type=${type}&uniqueId=${uniqueId}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_META_SUCCESS,
                    payload: res.data.data,
                });
            } else {
                dispatch({
                    type: GET_META_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log('errinffetchmeta', err.response)
            dispatch({
                type: GET_META_ERROR,
                payload: err?.response?.data,
            });
        })
}
export const saveMeta = (data) => async (dispatch) => {
    try {
        const param = {
            ...data
        };

        const res = await http.post(
            `${ADMIN_API_ENDPOINT}${SAVE_META_URL}`,
            param
        );
        console.log("ressponse", res)

        if (res.data.status === true) {
            dispatch({
                type: SAVE_META_SUCCESS,
                payload: res.data.data,
            });
        } else {
            dispatch({
                type: SAVE_META_ERROR,
                payload: res.data,
            });
        }
    } catch (error) {
        console.log("error", error);
    }
};

import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_BYPASS,
    GET_BLOGSVIDEOS_API,
    GET_BLOGSVIDEOS_SUCCESS,
    GET_BLOGSVIDEOS_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getBlogsVideos = (page = 0, limit = 50) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit
    });
    const url = `${ADMIN_DATA_API_ENDPOINT_BYPASS}${GET_BLOGSVIDEOS_API}${query ? `?${query}` : ``}`;
    return http.get(url)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_BLOGSVIDEOS_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_BLOGSVIDEOS_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_BLOGSVIDEOS_ERROR,
                payload: err.message,
            });
        })
}

export {
    getBlogsVideos
}
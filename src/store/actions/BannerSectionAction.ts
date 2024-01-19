import http from "../../utils/http";
import {
    GET_BANNER_SECTION_API,
    ADMIN_DATA_API_ENDPOINT_BYPASS,
    GET_BANNER_SECTION_SUCCESS,
    GET_BANNER_SECTION_ERROR,
    ADMIN_API_ENDPOINT_V2,
    DELETE_BANNER_SECTION_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getBannerSection = (page = 0, limit = 50) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit
    });
    const url = `${ADMIN_DATA_API_ENDPOINT_BYPASS}${GET_BANNER_SECTION_API}${query ? `?${query}` : ``}`;
    return http.get(url)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_BANNER_SECTION_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_BANNER_SECTION_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_BANNER_SECTION_ERROR,
                payload: err.message,
            });
        })
}

const deleteBannerSection = (id: string) => async dispatch => {
    const url = (`${ADMIN_API_ENDPOINT_V2}${DELETE_BANNER_SECTION_API}/${id}`);
    return http.delete(url)
        .then((res) => {
            if (res.data.status === true) {
                return { ...res, error: null };
            }
            return { data: null, error: res.data };
        }).catch(err => {
            return { data: null, error: err };
        })
}

export { getBannerSection, deleteBannerSection }
import http from "../../utils/http";
import {
  GET_TESTIMONIAL_API,
  DELETE_TESTIMONIAL_API,
  ADMIN_DATA_API_ENDPOINT_BYPASS,
  ADMIN_API_ENDPOINT_V2,
  GET_TESTIMONIAL_SUCCESS,
  GET_TESTIMONIAL_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const deleteTestimonial = (id: string) => async dispatch => {
  const url = (`${ADMIN_API_ENDPOINT_V2}${DELETE_TESTIMONIAL_API}/${id}`);
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

const getTestimonial = (page = 0, limit = 50) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit
  });
  const url = `${ADMIN_DATA_API_ENDPOINT_BYPASS}${GET_TESTIMONIAL_API}${query ? `?${query}` : ``}`;
  return http.get(url)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_TESTIMONIAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_TESTIMONIAL_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      dispatch({
        type: GET_TESTIMONIAL_ERROR,
        payload: err.message,
      });
    })
}

export { getTestimonial, deleteTestimonial }

import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_MASTER_ENTITY_LIST_SUCCESS,
  GET_MASTER_ENTITY_LIST_ERROR,
  GET_MASTER_ENTITY_LIST_API,
  GET_MASTER_ENTITY_COLLEGE_LIST_API,
  GET_MASTER_ENTITY_COLLEGE_LIST_SUCCESS,
  GET_MASTER_ENTITY_COLLEGE_LIST_ERROR
} from "src/store/constants";

const getMasterCollegeEntityList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_ENTITY_COLLEGE_LIST_API}`)
    .then((res) => {
      console.log("res data ===>", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_MASTER_ENTITY_COLLEGE_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_MASTER_ENTITY_COLLEGE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getMasterEntityList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_ENTITY_LIST_API}`)
    .then((res) => {
      console.log("res data ===>", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_MASTER_ENTITY_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_MASTER_ENTITY_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getMasterEntity = (EntityId: string) => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_ENTITY_LIST_API}/${EntityId}`)
    .then((res) => {
      console.log("res data ===>", res.data);
      if (res.data.isSuccess) {
        return res?.data?.data;
      }
      return {}
      // if (res.data.isSuccess) {
      //     dispatch({
      //         type: GET_MASTER_ENTITY_SUCCESS,
      //         payload: res.data,
      //       });
      // } else {
      //     dispatch({
      //       type: GET_MASTER_ENTITY_ERROR,
      //       payload: res.data,
      //     });
      //   }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

export { getMasterEntity, getMasterEntityList, getMasterCollegeEntityList }
import http from "../../utils/http";

import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_LANGUAGE_LIST,
  GET_LANGUAGE_LIIST_SUCCESS,
  GET_LANGUAGE_LIIST_ERROR,
  
  GET_SKILL_LIST,
  GET_SKILL_LIST_SUCCESS,
  GET_SKILL_LIST_ERROR,

  GET_INTEREST_PATHWAY_LIST,
  GET_INTEREST_PATHWAY_LIST_SUCCESS,
  GET_INTEREST_PATHWAY_LIST_ERROR,

  GET_PUBLISHER_LIST,
  GET_PUBLISHER_LIST_SUCCESS,
  GET_PUBLISHER_LIST_ERROR
} from "src/store/constants";

const getPublisherList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PUBLISHER_LIST}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_PUBLISHER_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_PUBLISHER_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}
const getLanguageList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_LANGUAGE_LIST}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_LANGUAGE_LIIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_LANGUAGE_LIIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}
const getSkillList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_SKILL_LIST}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_SKILL_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_SKILL_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const getIntrestPathwayList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_INTEREST_PATHWAY_LIST}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_INTEREST_PATHWAY_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_INTEREST_PATHWAY_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}
export { getLanguageList, getSkillList, getIntrestPathwayList, getPublisherList }
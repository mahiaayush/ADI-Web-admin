import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_RBAC_ALLOWED_APIS,
  GET_ROLE_ALLOWED_APIS_SUCCESS,
  GET_ROLE_ALLOWED_APIS_ERROR,
  GET_RBAC_ALLOWED_APIS_SUCCESS,
  GET_RBAC_ALLOWED_APIS_ERROR,
  GET_RBAC_POSSIBLE_APIS,
  GET_RBAC_POSSIBLE_APIS_SUCCESS,
  GET_RBAC_POSSIBLE_APIS_ERROR,
  GET_ALLOWED_ROUTES,
  GET_ALLOWED_ROUTES_SUCCESS,
  GET_ALLOWED_ROUTES_ERROR,
  GET_ALL_POSSIBLE_ROUTES,
  GET_ALL_POSSIBLE_ROUTES_SUCCESS,
  GET_ALL_POSSIBLE_ROUTES_ERROR,
  GET_PARTICULAR_ROUTES,
  GET_PARTICULAR_ROUTES_SUCCESS,
  GET_PARTICULAR_ROUTES_ERROR
} from "src/store/constants";

// getting all system apis
const getAllPossibleApisAction = () => (dispatch) => {
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_RBAC_POSSIBLE_APIS}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_RBAC_POSSIBLE_APIS_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_RBAC_POSSIBLE_APIS_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)     
        })
}

//! for the perticular role access
const getAllowedApisAction = (roleId: number) => (dispatch) => {
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_RBAC_ALLOWED_APIS}/${roleId}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_ROLE_ALLOWED_APIS_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_ROLE_ALLOWED_APIS_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)     
        })
}

// for the login user's role
const getRBACAllowedApisAction = () => (dispatch) => {
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_RBAC_ALLOWED_APIS}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_RBAC_ALLOWED_APIS_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_RBAC_ALLOWED_APIS_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)     
        })
}

//! for getting existing Access of the user Not for Role
const getAllowedRoutesAction = () => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ALLOWED_ROUTES}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_ALLOWED_ROUTES_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_ALLOWED_ROUTES_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)     
        })
}

const getAllPossibleRoutes = () => (dispatch) => {
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ALL_POSSIBLE_ROUTES}`)
      .then((res) => {
          if (res.data.status) {
              dispatch({
                  type: GET_ALL_POSSIBLE_ROUTES_SUCCESS,
                  payload: res.data.data,
                });
          } else {
              dispatch({
                type: GET_ALL_POSSIBLE_ROUTES_ERROR,
                payload: res.data,
              });
            }
      }).catch(err => {
           console.log("erroraction", err)     
      })
}

const getParticularRoutesAction = (roleId) => (dispatch) => {
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_PARTICULAR_ROUTES}/${roleId}/routes`)
      .then((res) => {
          if (res.data.status) {
              dispatch({
                  type: GET_PARTICULAR_ROUTES_SUCCESS,
                  payload: res.data.data,
                });
          } else {
              dispatch({
                type: GET_PARTICULAR_ROUTES_ERROR,
                payload: res.data,
              });
            }
      }).catch(err => {
           console.log("erroraction", err)  
      })
}

export { getAllowedRoutesAction, getAllPossibleRoutes, getParticularRoutesAction, getRBACAllowedApisAction, getAllowedApisAction, getAllPossibleApisAction };
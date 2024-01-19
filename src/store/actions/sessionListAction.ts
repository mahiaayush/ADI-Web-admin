import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_SESSION_LIST_URL, GET_SESSION_LIST, GET_RUNNING_SESSIONS, GET_RUNNING_SESSIONS_URL
} from '../constants';

let resp;
const getSessionList = (id, /* paginationToken = null, */ limit = null, type = null, search = null) => (dispatch) => {
    let query = "";
    query = queryBuilder({
        /* paginationToken, */
        limit,
        type,
        search
    });
    resp = (http.get(`${ADMIN_API_ENDPOINT_V2}${GET_SESSION_LIST_URL}?hash=${id}${`&${query}`}`)
    .then((res) => {
        const { data, status } = res.data;
        if (status === true) {
            dispatch({
                type: GET_SESSION_LIST,
                payload: {
                    /* ...({ paginationToken: data.paginationToken }), */
                    limit,
                    list: data,
                    count: data.count,
                    error: null
                },

            });
        }
    }).catch(err => {
        errorHandler(err, dispatch, GET_SESSION_LIST, {
            list: [],
            count: 0
        })
    }))
    return resp;
}

const getRunningSessions = () => async (dispatch) => {
    try {
      const res = await http.get(`${ADMIN_API_ENDPOINT_V2}${GET_RUNNING_SESSIONS_URL}`);
      if (res.data.status === true) {
        dispatch({
          type: GET_RUNNING_SESSIONS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_RUNNING_SESSIONS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

export { getSessionList, getRunningSessions };
import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_TASKS_STMT_MASTER_API,
  GET_TASKS_STMT_MASTER_SUCCESS,
  GET_TASKS_STMT_MASTER_ERROR,
  EXPORT_TASKS_STMT_MASTER_ALLDATA_API,
  EXPORT_TASKS_STMT_MASTER_API,
  IMPORT_TASKS_STMT_MASTER_API,
  POST_TASKS_STMT_MASTER_SUCCESS,
  POST_TASKS_STMT_MASTER_ERROR,
  PUT_TASKS_STMT_MASTER_SUCCESS,
  PUT_TASKS_STMT_MASTER_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getTaskstmtMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_TASKS_STMT_MASTER_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_TASKS_STMT_MASTER_SUCCESS,
          payload: res?.data,
        });
      } else {
        dispatch({
          type: GET_TASKS_STMT_MASTER_ERROR,
          payload: res?.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteTaskstmtMaster = (TaskstmtId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_TASKS_STMT_MASTER_API}/${TaskstmtId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportTaskstmtMasterAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_TASKS_STMT_MASTER_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'TaskstmtMaster.xlsx';
      link.click();
      if (res.data) {
        return { data: res.data, error: null };
      }
      return { data: null, error: res.data.detail.message };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err };
    })
}
const exportTaskstmtMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_TASKS_STMT_MASTER_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'TaskstmtMaster.xlsx';
      link.click();
      if (res.data) {
        return { data: res.data, error: null };
      }
      return { data: null, error: res.data.detail.message };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err };
    })
}
const importTaskstmtMaster = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_TASKS_STMT_MASTER_API}`, fromData)
    .then((res) => {
      console.log("importTaskstmtMaster", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occerd' };
    })
}

const saveTaskstmtMaster = (TaskstmtMastereData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_TASKS_STMT_MASTER_API}`, TaskstmtMastereData)
    .then((res) => {
      console.log("saveTaskstmtMaster", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_TASKS_STMT_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_TASKS_STMT_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateTaskstmtMaster = (TaskstmtId: number, TaskstmtMastereData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_TASKS_STMT_MASTER_API}/${TaskstmtId}`, TaskstmtMastereData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_TASKS_STMT_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_TASKS_STMT_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getTaskstmtMaster, deleteTaskstmtMaster, exportTaskstmtMaster, importTaskstmtMaster, saveTaskstmtMaster, updateTaskstmtMaster, exportTaskstmtMasterAll }
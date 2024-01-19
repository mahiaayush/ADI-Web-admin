import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_RMOBENCHMARKHOUR_API,
  GET_RMOBENCHMARKHOUR_SUCCESS,
  GET_RMOBENCHMARKHOUR_ERROR,
  DELETE_RMOBENCHMARKHOUR_API,
  EXPORT_RMOBENCHMARKHOUR_API,
  IMPORT_RMOBENCHMARKHOUR_API,
  CREATE_RMOBENCHMARKHOUR_API,
  EXPORT_ALL_RMOBENCHMARKHOUR_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getRMOBenchmarkhour = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_RMOBENCHMARKHOUR_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("getRMOBenchmarkhour------>", res);

      if (res.data.isSuccess) {
        dispatch({
          type: GET_RMOBENCHMARKHOUR_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_RMOBENCHMARKHOUR_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteRMOBenchmarkhour = (bmregcarId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_RMOBENCHMARKHOUR_API}/${bmregcarId}`)
    .then((res) => {
      console.log("delete RMOBenchmarkhour----->", res);
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importRMOBenchmarkhour = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_RMOBENCHMARKHOUR_API}`, formData)
    .then((res) => {
      console.log("importRMOBenchmarkhour----------->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    })
    .catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: err };
    })
}
const exportRMOBenchmarkhour = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_RMOBENCHMARKHOUR_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'RMOBenchmarkhour.xlsx';
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
const exportAllRMOBenchmarkhour = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_RMOBENCHMARKHOUR_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllRMOBenchmarkhour.xlsx';
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
const CreateRMOBenchmarkhour = (regcarcode: string, benchmarkHPW: number, benchmarkHPD: number,
  benchmarkDPW: number, benchmarkFN: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RMOBENCHMARKHOUR_API}`, {
      Regcarcode: regcarcode,
      BenchmarkHPW: benchmarkHPW,
      BenchmarkHPD: benchmarkHPD,
      BenchmarkDPW: benchmarkDPW,
      BenchmarkFN: benchmarkFN
    }).then((res) => {
      console.log("Create RMOBenchmarkhour---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }
const EditRMOBenchmarkhour = (bmregcarId: number, regcarcode: string, benchmarkHPW: number, benchmarkHPD: number,
  benchmarkDPW: number, benchmarkFN: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RMOBENCHMARKHOUR_API}/${bmregcarId}`, {
      Regcarcode: regcarcode,
      BenchmarkHPW: benchmarkHPW,
      BenchmarkHPD: benchmarkHPD,
      BenchmarkDPW: benchmarkDPW,
      BenchmarkFN: benchmarkFN
    }).then((res) => {
      console.log("Edit RMOBenchmarkhour---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }

export {
  getRMOBenchmarkhour,
  deleteRMOBenchmarkhour,
  importRMOBenchmarkhour,
  exportRMOBenchmarkhour,
  exportAllRMOBenchmarkhour,
  CreateRMOBenchmarkhour,
  EditRMOBenchmarkhour
}

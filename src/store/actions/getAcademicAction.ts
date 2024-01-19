import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ACADEMIC_API,
  GET_ACADEMIC_SUCCESS,
  GET_ACADEMIC_ERROR,
  DELETE_ACADEMIC_API,
  EXPORT_ACADEMIC_API,
  EXPORT_ALL_ACADEMIC_API,
  IMPORT_ACADEMIC_API,
  CREATE_ACADEMIC_API,
  GET_PROGRAM_LIST_API,
  GET_PROGRAM_LIST_SUCCESS,
  GET_PROGRAM_LIST_ERROR,
  GET_PROGRAMLEVEL_LIST_API,
  GET_PROGRAMLEVEL_LIST_SUCCESS,
  GET_PROGRAMLEVEL_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getProgramLevelList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PROGRAMLEVEL_LIST_API}`)
    .then((res) => {
      console.log("Program Level List---->", res);
      if (res.data.status) {
        dispatch({
          type: GET_PROGRAMLEVEL_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_PROGRAMLEVEL_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getProgramList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PROGRAM_LIST_API}`)
    .then((res) => {
      console.log("Program List---->", res);
      if (res.data.status) {
        dispatch({
          type: GET_PROGRAM_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_PROGRAM_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getAcademicMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });

  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACADEMIC_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("getacademic data---->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ACADEMIC_SUCCESS,
          payload: res?.data,
        });
      } else {
        dispatch({
          type: GET_ACADEMIC_ERROR,
          payload: res?.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const CreateAcademicMaster = (programId: number, programLevelId: number, eligibilty: string) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ACADEMIC_API}`, {
    ProgramId: programId,
    ProgramLevelId: programLevelId,
    Eligibility: eligibilty
  }).then((res) => {
    console.log("create data------>", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

const EditAcademicMaster = (academicEligibilityId: number, programId: number, programLevelId: number, eligibilty: string) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ACADEMIC_API}/${academicEligibilityId}`, {
    ProgramId: programId,
    ProgramLevelId: programLevelId,
    Eligibility: eligibilty
  }).then((res) => {
    const { data, isSuccess, message, errorMessage } = res.data;
    console.log("edit data---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage || message, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

const deleteAcademicMaster = (academicEligibilityId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_ACADEMIC_API}/${academicEligibilityId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const importAcademicMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_ACADEMIC_API}`, formData)
    .then((res) => {
      if (res.data.isSuccess === true) {
        console.log("res----------->", res);
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    })
    .catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: err };
    })
}

const exportAcademicMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ACADEMIC_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("Export Academic Data", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'Academic.xlsx';
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
const exportAllAcademicMaster = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_ACADEMIC_API}`, { responseType: 'blob' })
    .then((res) => {
      console.log("Export Academic Data", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllAcademic.xlsx';
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

export {
  getAcademicMaster,
  deleteAcademicMaster,
  importAcademicMaster,
  exportAcademicMaster,
  exportAllAcademicMaster,
  CreateAcademicMaster,
  EditAcademicMaster,
  getProgramList,
  getProgramLevelList
}
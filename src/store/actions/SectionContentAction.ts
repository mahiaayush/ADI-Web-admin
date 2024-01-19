import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_SECTION_CONTENT_API,
  EXPORT_SECTION_CONTENT_ALLDATA_API,
  GET_SECTION_CONTENT_SUCCESS,
  GET_SECTION_CONTENT_ERROR,
  EXPORT_SECTION_CONTENT_API,
  IMPORT_SECTION_CONTENT_API,
  POST_SECTION_CONTENT_SUCCESS,
  POST_SECTION_CONTENT_ERROR,
  PUT_SECTION_CONTENT_SUCCESS,
  PUT_SECTION_CONTENT_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getSectionContent = (page = 1, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_SECTION_CONTENT_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_SECTION_CONTENT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SECTION_CONTENT_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteSectionContent = (entityAmId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_SECTION_CONTENT_API}/${entityAmId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportSectionContentAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_SECTION_CONTENT_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'SectionContent.xlsx';
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
const exportSectionContent = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_SECTION_CONTENT_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'SectionContent.xlsx';
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
const importSectionContent = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_SECTION_CONTENT_API}`, fromData)
    .then((res) => {
      console.log("importSectionContent", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occerd' };
    })
}

const saveSectionContent = (SectionContenteData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_SECTION_CONTENT_API}`, SectionContenteData)
    .then((res) => {
      console.log("saveSectionContent", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_SECTION_CONTENT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_SECTION_CONTENT_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateSectionContent = (entityAmId: number, SectionContenteData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_SECTION_CONTENT_API}/${entityAmId}`, SectionContenteData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_SECTION_CONTENT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_SECTION_CONTENT_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getSectionContent, deleteSectionContent, exportSectionContent, importSectionContent, saveSectionContent, updateSectionContent, exportSectionContentAll }
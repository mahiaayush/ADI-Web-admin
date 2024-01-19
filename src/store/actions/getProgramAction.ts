import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_PROGRAM_API,
  CREATE_PROGRAM_API,
  GET_PROGRAM_SUCCESS,
  GET_PROGRAM_ERROR,
  DELETE_PROGRAM_API,
  EXPORT_PROGRAM_API,
  IMPORT_PROGRAM_API,
  EXPORT_ALL_PROGRAM_API,
  GET_DISCIPLINE_LIST_API,
  GET_DISCIPLINE_LIST_SUCCESS,
  GET_DISCIPLINE_LIST_ERROR,
  GET_INTAKE_LIST_API,
  GET_INTAKE_LIST_SUCCESS,
  GET_INTAKE_LIST_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getIntakeList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_INTAKE_LIST_API}`)
    .then((res) => {
      console.log("Intake LIst Data------->", res);
      if (res.data.status) {
        dispatch({
          type: GET_INTAKE_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_INTAKE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getDisciplineList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_DISCIPLINE_LIST_API}`)
    .then((res) => {
      console.log("Discipline LIst Data------->", res);
      if (res.data.status) {
        dispatch({
          type: GET_DISCIPLINE_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_DISCIPLINE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getProgramMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PROGRAM_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("Program Data------->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_PROGRAM_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PROGRAM_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const CreateProgramMaster = (entityId: string, programLevelId: number, intakeId: number,
  disciplineId: number, programTitle: string, programAlias: string, programHighlights: string,
  programduration: string, tutionFee: number, applicationFee: number, applicationDeadline: Date,
  programEligibilityOther: string, status: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_PROGRAM_API}`, {
      EntityId: entityId,
      ProgramLevelId: programLevelId,
      IntakeId: intakeId,
      DisciplineId: disciplineId,
      ProgramTitle: programTitle,
      ProgramAlias: programAlias,
      ProgramHighlights: programHighlights,
      Programduration: programduration,
      TutionFee: tutionFee,
      ApplicationFee: applicationFee,
      ApplicationDeadline: applicationDeadline,
      ProgramEligibilityOther: programEligibilityOther,
      Status: status
    }).then((res) => {
      console.log("program response------------->", res.data);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage || res.data.message, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }
const editProgramMaster = (programId: number, entityId: string, programLevelId: number, intakeId: number,
  disciplineId: number, programTitle: string, programAlias: string, programHighlights: string,
  programduration: string, tutionFee: number, applicationFee: number, applicationDeadline: Date,
  programEligibilityOther: string, status: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_PROGRAM_API}/${programId}`, {
      EntityId: entityId,
      ProgramLevelId: programLevelId,
      IntakeId: intakeId,
      DisciplineId: disciplineId,
      ProgramTitle: programTitle,
      ProgramAlias: programAlias,
      ProgramHighlights: programHighlights,
      Programduration: programduration,
      TutionFee: tutionFee,
      ApplicationFee: applicationFee,
      ApplicationDeadline: applicationDeadline,
      ProgramEligibilityOther: programEligibilityOther,
      Status: status
    }).then((res) => {
      console.log("program response------------->", res.data);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }

const deleteProgramMaster = (academicEligibilityId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_PROGRAM_API}/${academicEligibilityId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const importProgramMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_PROGRAM_API}`, formData)
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

const exportProgramMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_PROGRAM_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'Program.xlsx';
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
const exportAllProgramMaster = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_PROGRAM_API}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllProgram.xlsx';
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
  getDisciplineList,
  getIntakeList,
  getProgramMaster,
  deleteProgramMaster,
  importProgramMaster,
  exportProgramMaster,
  exportAllProgramMaster,
  CreateProgramMaster,
  editProgramMaster
}
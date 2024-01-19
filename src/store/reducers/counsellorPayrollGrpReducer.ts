import {
    GET_COUNSELLOR_PAYROLL_GRP_SUCCESS,
    GET_COUNSELLOR_PAYROLL_GRP_ERROR,
  } from "../constants";
  
  const initialState = {
    counsellorPayrollGrpResponse: {
      data: {},
    }
  };
  
  const CounsellorPayrollGrpReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_PAYROLL_GRP_SUCCESS:
        return {
          ...state,
          counsellorPayrollGrpResponse: {
            ...state.counsellorPayrollGrpResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_COUNSELLOR_PAYROLL_GRP_ERROR:
        return {
          ...state,
          counsellorPayrollGrpResponse: {
            ...state.counsellorPayrollGrpResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default CounsellorPayrollGrpReducer;
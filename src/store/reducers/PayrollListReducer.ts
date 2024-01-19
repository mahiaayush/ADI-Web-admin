import {
    GET_PAYROLL_SUCCESS,
    GET_PAYROLL_ERROR,
  } from "../constants";
  
  const initialState = {
    payrollListResponse: {
      data: {},
    }
  };
  
  const PayrollListReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PAYROLL_SUCCESS:
        return {
          ...state,
          payrollListResponse: {
            ...state.payrollListResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_PAYROLL_ERROR:
        return {
          ...state,
          payrollListResponse: {
            ...state.payrollListResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default PayrollListReducer;
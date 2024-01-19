import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_PAYROLL_URL,
  GET_PAYROLL_SUCCESS,
  GET_PAYROLL_ERROR,
} from "src/store/constants";

const PayrollListAction = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_PAYROLL_URL}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_PAYROLL_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_PAYROLL_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default PayrollListAction
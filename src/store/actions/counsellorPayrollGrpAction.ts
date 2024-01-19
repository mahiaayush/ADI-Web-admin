import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_PAYROLL_GRP,
  GET_COUNSELLOR_PAYROLL_GRP_SUCCESS,
  GET_COUNSELLOR_PAYROLL_GRP_ERROR,
} from "src/store/constants";

const CounsellorPayrollGrpAction = (status) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_PAYROLL_GRP}?status=${status}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_COUNSELLOR_PAYROLL_GRP_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COUNSELLOR_PAYROLL_GRP_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default CounsellorPayrollGrpAction
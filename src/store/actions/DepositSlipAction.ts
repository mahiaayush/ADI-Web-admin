import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  DEPOSIT_SLIP,
  POST_DEPOSIT_SLIP_SUCCESS,
  POST_DEPOSIT_SLIP_ERROR,
} from "src/store/constants";

export const postDepositSlipAction = (data = {}) => async (dispatch) => {
  try {
    const res = await http.post(
      `${ADMIN_API_ENDPOINT_V2}${DEPOSIT_SLIP}`,
      data
    );
    if (res.data.status === true) {
      dispatch({
        type: POST_DEPOSIT_SLIP_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: POST_DEPOSIT_SLIP_ERROR,
        payload: res.data,
      });
    }
    return res.data;
  } catch (error) {
    console.log("error", error);
    return { message: error?.message || error.response?.data.message };
  }
};

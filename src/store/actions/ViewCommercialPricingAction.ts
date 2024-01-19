import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COMMERCIAL_PRICING,
  GET_COMMERCIAL_SUCCESS,
  GET_COMMERCIAL_ERROR,
} from "../constants";

const ViewCommercialPricingAction = (applicationId) => async (dispatch) => {
  try {
    const res = await http.get(
      `${ADMIN_API_ENDPOINT_V2}${GET_COMMERCIAL_PRICING}/${applicationId}`
    );
    if (res.data.status === true) {
      dispatch({
        type: GET_COMMERCIAL_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_COMMERCIAL_ERROR,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default ViewCommercialPricingAction;

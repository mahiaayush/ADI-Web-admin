import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  ADMIN_UPDATE_ICSC_STATUS,
  ADMIN_UPDATE_ICSC_STATUS_SUCCESS,
  ADMIN_UPDATE_ICSC_STATUS_ERROR,
} from "src/store/constants";

import { cognito } from '../../../config';

export const approveAction = (APPLICATION_ID, applicationStatus) => async (dispatch) => {
  console.log("console", cognito)
  try {
    const param = {
      testId: cognito.testId,
      assigmentId: cognito.assignmentId,
      ApplicationId: APPLICATION_ID,
      Attribute: {
        Key: applicationStatus.Key,
        Value: applicationStatus.Value,
      },
      Tagging: applicationStatus.checkedItems,
      CscPayrollType: applicationStatus.CscPayrollType
    };

    const res = await http.post(
      `${ADMIN_API_ENDPOINT_V2}${ADMIN_UPDATE_ICSC_STATUS}`,
      param
    );
    
    if (res.data.status === true) {
      dispatch({
        type: ADMIN_UPDATE_ICSC_STATUS_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: ADMIN_UPDATE_ICSC_STATUS_ERROR,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const rejectAction = (APPLICATION_ID, applicationStatus, Feedback) => async (dispatch) => {
  try {
    const param = {
      ApplicationId: APPLICATION_ID,
      Attribute: {
        Key: applicationStatus.Key,
        Value: applicationStatus.Value,
      },
      Feedback
    };
    const res = await http.post(
      `${ADMIN_API_ENDPOINT_V2}${ADMIN_UPDATE_ICSC_STATUS}`,
      param
    );
    if (res.data.status === true) {
      dispatch({
        type: ADMIN_UPDATE_ICSC_STATUS_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: ADMIN_UPDATE_ICSC_STATUS_ERROR,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
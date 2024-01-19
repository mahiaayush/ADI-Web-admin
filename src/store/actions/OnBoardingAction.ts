import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_INTERVIEWER_LIST_URL,
    GET_INTERVIEWER_LIST_SUCCESS,
    GET_INTERVIEWER_LIST_ERROR,
    POST_MOCK_INTERVIEW_ERROR,
    POST_MOCK_INTERVIEW_SUCCESS,
    POST_MOCK_INTERVIEW_URL,
    GET_INTERVIEWER_LIST,
    GET_INTERVIEWER_SUCCESS,
    GET_INTERVIEWER_ERROR,
    GET_DOCUMENT_LIST_URL,
    GET_DOCUMENT_LIST_SUCCESS, 
    GET_DOCUMENT_LIST_ERROR,
    CHANGE_DOCUMENT_STATUS_URL,
    CHANGE_DOCUMENT_STATUS_SUCCESS,
    CHANGE_DOCUMENT_STATUS_ERROR,
    GET_SCORE_TRACE_URL,
    GET_SCORE_TRACE_SUCCESS,
    GET_SCORE_TRACE_ERROR,
    POST_MOCK_SESSION_URL,
    POST_MOCK_SESSION_SUCCESS,
    POST_MOCK_SESSION_ERROR,
    GET_ONBOARDING_STATUS,
    GET_ONBOARDING_STATUS_SUCCESS,
    GET_ONBOARDING_STATUS_ERROR,
    GET_ONBOARDING_STATUS_TRAINING_COUNT,
    GET_ONBOARDING_STATUS_TRAINING_COUNT_SUCCESS,
    GET_ONBOARDING_STATUS_TRAINING_COUNT_ERROR,
    GET_ONBOARDING_STATUS_REMAINING_COUNT,
    GET_ONBOARDING_STATUS_REMAINING_COUNT_SUCCESS,
    GET_ONBOARDING_STATUS_REMAINING_COUNT_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const InterviewerListing = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_INTERVIEWER_LIST_URL}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_INTERVIEWER_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_INTERVIEWER_LIST_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getDocListing = (id) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_DOCUMENT_LIST_URL}${id}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_DOCUMENT_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_DOCUMENT_LIST_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const postMockInterviewDetails = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_MOCK_INTERVIEW_URL}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: POST_MOCK_INTERVIEW_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: POST_MOCK_INTERVIEW_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const changeDocumentStatus = (id, data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${CHANGE_DOCUMENT_STATUS_URL}${id}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: CHANGE_DOCUMENT_STATUS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: CHANGE_DOCUMENT_STATUS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const InterviewersAction = (search = null, page = null, limit = null, sortBy = null, order = null) => async (dispatch) => {
    const query = queryBuilder({
      search,
      page,
      limit,
      sortBy,
      order,
  });
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_INTERVIEWER_LIST}${query ? `?${query}` : ``}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_INTERVIEWER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_INTERVIEWER_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getScoreTrace = (applicationId) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_SCORE_TRACE_URL}/${applicationId}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_SCORE_TRACE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SCORE_TRACE_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const postMockSessionDetails = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_MOCK_SESSION_URL}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: POST_MOCK_SESSION_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: POST_MOCK_SESSION_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getOnBoardingStatus = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ONBOARDING_STATUS}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ONBOARDING_STATUS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_ONBOARDING_STATUS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getOnBoardingTrainingStatus = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ONBOARDING_STATUS_TRAINING_COUNT}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ONBOARDING_STATUS_TRAINING_COUNT_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_ONBOARDING_STATUS_TRAINING_COUNT_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getOnBoardingRemainingStatus = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ONBOARDING_STATUS_REMAINING_COUNT}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ONBOARDING_STATUS_REMAINING_COUNT_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_ONBOARDING_STATUS_REMAINING_COUNT_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export { getScoreTrace, changeDocumentStatus, getDocListing, InterviewerListing, postMockInterviewDetails, InterviewersAction, postMockSessionDetails, getOnBoardingStatus, getOnBoardingTrainingStatus, getOnBoardingRemainingStatus }
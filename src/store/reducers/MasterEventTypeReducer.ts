import {
  GET_EVENTTYPE_SUCCESS,
  GET_EVENTTYPE_ERROR,
  GET_EVENTTYPE_LIST_SUCCESS,
  GET_EVENTTYPE_LIST_ERROR,
} from "../constants";

const initialState = {
  eventTypeResponse: {
    data: {},
  }
};
const listState = {
  eventTypeListResponse: {
    data: {},
  }
};

const EventTypeListReducer = (state = listState, action) => {
  switch (action.type) {
    case GET_EVENTTYPE_LIST_SUCCESS:
      return {
        ...state,
        eventTypeListResponse: {
          ...state.eventTypeListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_EVENTTYPE_LIST_ERROR:
      return {
        ...state,
        eventTypeListResponse: {
          ...state.eventTypeListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const EventTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTTYPE_SUCCESS:
      return {
        ...state,
        eventTypeResponse: {
          ...state.eventTypeResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_EVENTTYPE_ERROR:
      return {
        ...state,
        eventTypeResponse: {
          ...state.eventTypeResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  EventTypeListReducer,
  EventTypeReducer
};
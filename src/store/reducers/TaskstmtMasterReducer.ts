import {
  GET_TASKS_STMT_MASTER_SUCCESS,
  GET_TASKS_STMT_MASTER_ERROR,
  POST_TASKS_STMT_MASTER_SUCCESS,
  POST_TASKS_STMT_MASTER_ERROR,
  PUT_TASKS_STMT_MASTER_SUCCESS,
  PUT_TASKS_STMT_MASTER_ERROR
} from "../constants";

const initialState = {
  TaskstmlMasterResponse: {
    data: {},
  }
};

const getTaskstmlMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_STMT_MASTER_SUCCESS:
      return {
        ...state,
        TaskstmlMasterResponse: {
          ...state.TaskstmlMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_TASKS_STMT_MASTER_ERROR:
      return {
        ...state,
        TaskstmlMasterResponse: {
          ...state.TaskstmlMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postTaskstmlMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TASKS_STMT_MASTER_SUCCESS:
      return {
        ...state,
        TaskstmlMasterResponse: {
          ...state.TaskstmlMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_TASKS_STMT_MASTER_ERROR:
      return {
        ...state,
        TaskstmlMasterResponse: {
          ...state.TaskstmlMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putTaskstmlMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_TASKS_STMT_MASTER_SUCCESS:
      return {
        ...state,
        TaskstmlMasterResponse: {
          ...state.TaskstmlMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_TASKS_STMT_MASTER_ERROR:
      return {
        ...state,
        TaskstmlMasterResponse: {
          ...state.TaskstmlMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

//
export { getTaskstmlMasterReducer, postTaskstmlMasterReducer, putTaskstmlMasterReducer };
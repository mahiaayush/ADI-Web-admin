import {
    GET_REGIONAL_OCCUPATION_SUCCESS,
    GET_REGIONAL_OCCUPATION_ERROR,
    POST_REGIONAL_OCCUPATION_SUCCESS,
    POST_REGIONAL_OCCUPATION_ERROR,
    PUT_REGIONAL_OCCUPATION_SUCCESS,
    PUT_REGIONAL_OCCUPATION_ERROR,
    GET_REGIONAL_OCCUPATION_LIST_SUCCESS,
    GET_REGIONAL_OCCUPATION_LIST_ERROR
    } from "../constants";
    
    const initialState = {
      RMOccupationResponse: {
        data: {},
      }
    };
    const initialListState = {
      RMOccupationListResponse: {
        data: {},
      }
    };
    const getRMOccupationListReducer = (state = initialListState, action) => {
      switch (action.type) {
        case GET_REGIONAL_OCCUPATION_LIST_SUCCESS:
          return {
            ...state,
            RMOccupationListResponse: {
              ...state.RMOccupationListResponse,
              data: action.payload.data,
              success: true,
            },
          };
        case GET_REGIONAL_OCCUPATION_LIST_ERROR:
          return {
            ...state,
            RMOccupationListResponse: {
              ...state.RMOccupationListResponse,
              data: { rows: [] },
              success: false,
            },
          };
        default:
          return state;
      }
    };
    const getRMOccupationReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_REGIONAL_OCCUPATION_SUCCESS:
          return {
            ...state,
            RMOccupationResponse: {
              ...state.RMOccupationResponse,
              data: action.payload.data,
              success: true,
            },
          };
        case GET_REGIONAL_OCCUPATION_ERROR:
          return {
            ...state,
            RMOccupationResponse: {
              ...state.RMOccupationResponse,
              data: { rows: [] },
              success: false,
            },
          };
        default:
          return state;
      }
    };
    const postRMOccupationReducer = (state = initialState, action) => {
      switch (action.type) {
       case POST_REGIONAL_OCCUPATION_SUCCESS:
            return {
              ...state,
              RMOccupationResponse: {
                ...state.RMOccupationResponse,
                data: action.payload.data,
                success: true,
              },
            };
            case POST_REGIONAL_OCCUPATION_ERROR:
              return {
                ...state,
                RMOccupationResponse: {
                  ...state.RMOccupationResponse,
                  data: action.payload.data,
                  success: false,
                },
              };
        default:
          return state;
      }
    }
  
    const putRMOccupationReducer = (state = initialState, action) => {
      switch (action.type) {
       case PUT_REGIONAL_OCCUPATION_SUCCESS:
            return {
              ...state,
              RMOccupationResponse: {
                ...state.RMOccupationResponse,
                data: action.payload.data,
                success: true,
              },
            };
            case PUT_REGIONAL_OCCUPATION_ERROR:
              return {
                ...state,
                RMOccupationResponse: {
                  ...state.RMOccupationResponse,
                  data: action.payload.data,
                  success: false,
                },
              };
        default:
          return state;
      }
    }
    //
    export { getRMOccupationListReducer, getRMOccupationReducer, postRMOccupationReducer, putRMOccupationReducer };
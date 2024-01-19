import {
    COUNSELOR_LEARNERS_DETAIL_SUCCESS,
    COUNSELOR_LEARNERS_DETAIL_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    counsellorLearnersDetail: {
      data: {},
    }
  };
  
  const counsellorLearnersDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case COUNSELOR_LEARNERS_DETAIL_SUCCESS:
        return {
          ...state,
          counsellorLearnersDetail: {
            ...state.counsellorLearnersDetail,
            data: action.payload,
            success: true,
          },
          
        };
      case COUNSELOR_LEARNERS_DETAIL_ERROR:
        return {
          ...state,
          counsellorLearnersDetail: {
            ...state.counsellorLearnersDetail,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default counsellorLearnersDetailReducer;
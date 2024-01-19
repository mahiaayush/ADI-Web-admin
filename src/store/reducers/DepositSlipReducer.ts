import {
  POST_DEPOSIT_SLIP_SUCCESS,
  POST_DEPOSIT_SLIP_ERROR,
} from "src/store/constants";

const initialState = {
  postSlip: {
      data: {},
  }
};

const DepositSlipReducer = (state = initialState, action) => {
  switch (action.type) {
      case POST_DEPOSIT_SLIP_SUCCESS:
          return {
              ...state,
              slip: {
                  ...state.postSlip,
                  data: action.payload,
                  success: true,
              },
          };
      case POST_DEPOSIT_SLIP_ERROR:
          return {
              ...state,
              slip: {
                  ...state.postSlip,
                  data: action.payload,
                  success: false,
              },
          };
      default:
          return state;
  }
};
export default DepositSlipReducer;

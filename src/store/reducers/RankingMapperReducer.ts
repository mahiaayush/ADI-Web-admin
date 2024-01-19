import {
  GET_RANKINGMAPPER_SUCCESS,
  GET_RANKINGMAPPER_ERROR,
  GET_RANKING_LIST_SUCCESS,
  GET_RANKING_LIST_ERROR
} from "../constants";

const RankingListState = {
  rankingListResponse: {
    data: {},
  }
};

const RankingListReducer = (state = RankingListState, action) => {
  switch (action.type) {
    case GET_RANKING_LIST_SUCCESS:
      return {
        ...state,
        rankingListResponse: {
          ...state.rankingListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_RANKING_LIST_ERROR:
      return {
        ...state,
        rankingListResponse: {
          ...state.rankingListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const initialState = {
  rankingMapperResponse: {
    data: {},
  }
};

const RankingMapperReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RANKINGMAPPER_SUCCESS:
      return {
        ...state,
        rankingMapperResponse: {
          ...state.rankingMapperResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_RANKINGMAPPER_ERROR:
      return {
        ...state,
        rankingMapperResponse: {
          ...state.rankingMapperResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  RankingMapperReducer,
  RankingListReducer
}
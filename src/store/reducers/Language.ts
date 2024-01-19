import {
  GET_LANGUAGE_LIIST_SUCCESS,
  GET_LANGUAGE_LIIST_ERROR,
  
  GET_SKILL_LIST_SUCCESS,
  GET_SKILL_LIST_ERROR,

  GET_INTEREST_PATHWAY_LIST_SUCCESS,
  GET_INTEREST_PATHWAY_LIST_ERROR,
  GET_PUBLISHER_LIST_SUCCESS,
  GET_PUBLISHER_LIST_ERROR,
  } from "../constants";

  const LanguageList = {
    LanguageListResponse: {
      data: {},
    }
  };

  const SkillList = {
    SkillListResponse: {
      data: {},
    }
  };
  
  const IntrestPathwayList = {
    IntrestPathwayListResponse: {
      data: {},
    }
  };

  const PublisherList = {
    PublisherListResponse: {
      data: {},
    }
  };

  const getIntrestPathwayListReducer = (state = IntrestPathwayList, action) => {
    switch (action.type) {
      case GET_INTEREST_PATHWAY_LIST_SUCCESS:
        return {
          ...state,
          IntrestPathwayListResponse: {
            ...state.IntrestPathwayListResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_INTEREST_PATHWAY_LIST_ERROR:
        return {
          ...state,
          IntrestPathwayListResponse: {
            ...state.IntrestPathwayListResponse,
            data: [],
            success: true,
          },
        };
      default:
        return state;
    }
  };

  const getSkillListReducer = (state = SkillList, action) => {
    switch (action.type) {
      case GET_SKILL_LIST_SUCCESS:
        return {
          ...state,
          SkillListResponse: {
            ...state.SkillListResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_SKILL_LIST_ERROR:
        return {
          ...state,
          SkillListResponse: {
            ...state.SkillListResponse,
            data: [],
            success: true,
          },
        };
      default:
        return state;
    }
  };

  const getLanguageListReducer = (state = LanguageList, action) => {
    switch (action.type) {
      case GET_LANGUAGE_LIIST_SUCCESS:
        return {
          ...state,
          LanguageListResponse: {
            ...state.LanguageListResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_LANGUAGE_LIIST_ERROR:
        return {
          ...state,
          LanguageListResponse: {
            ...state.LanguageListResponse,
            data: [],
            success: false,
          },
        };
      default:
        return state;
    }
  };
  
  const getPublisherListReducer = (state = PublisherList, action) => {
    switch (action.type) {
      case GET_PUBLISHER_LIST_SUCCESS:
        return {
          ...state,
          PublisherListResponse: {
            ...state.PublisherListResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_PUBLISHER_LIST_ERROR:
        return {
          ...state,
          PublisherListResponse: {
            ...state.PublisherListResponse,
            data: [],
            success: false,
          },
        };
      default:
        return state;
    }
  };
  
  export { 
    getLanguageListReducer,
    getSkillListReducer,
    getIntrestPathwayListReducer,
    getPublisherListReducer
  };
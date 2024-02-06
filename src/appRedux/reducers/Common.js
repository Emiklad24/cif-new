import {
  CREATE_CASE,
  FETCH_CASE,
  FETCH_ERROR,
  FETCH_LOCAL_GOVERNMENT_AREA_LIST,
  FETCH_SORMAS_DATA,
  FETCH_START,
  FETCH_STATE_LIST,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  TOGGLE_COLLAPSED_NAV,
  UPDATE_CASE,
  USER_ROLE,
  WINDOW_WIDTH
} from "constants/ActionTypes";

const INIT_STATE = {
  error: "",
  loading: false,
  message: "",
  navCollapsed: true,
  width: window.innerWidth,
  pathname: "/",
  data: [],
  localGovernmentAreaList: [],
  caseList: [],
  stateList: [],
  case: {},
  sormasCase: {},
  userRole: "",
};

const CommonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE": {
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false,
      };
    }
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case TOGGLE_COLLAPSED_NAV: {
      return {
        ...state,
        navCollapsed: action.navCollapsed,
      };
    }
    case FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: "", message: "", loading: false };
    }
    case SHOW_MESSAGE: {
      return { ...state, error: "", message: action.payload, loading: false };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload, message: "" };
    }
    case HIDE_MESSAGE: {
      return { ...state, loading: false, error: "", message: "" };
    }
    case USER_ROLE: {
      return {
        ...state,
        userRole: action.payload,
      };
    }
    case CREATE_CASE: {
      let updatedList = state.caseList;
      updatedList = [action.payload, ...updatedList];

      return {
        ...state,
        caseList: updatedList,
      };
    }
    case FETCH_CASE: {
      return {
        ...state,
        case: action.payload,
      };
    }
    case UPDATE_CASE: {
      return {
        ...state,
        caseList: state.caseList?.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    case FETCH_STATE_LIST: {
      return {
        ...state,
        stateList: action.payload,
      };
    }
    case FETCH_LOCAL_GOVERNMENT_AREA_LIST: {
      return {
        ...state,
        localGovernmentAreaList: action.payload,
      };
    }

    case FETCH_SORMAS_DATA: {
      return {
        ...state,
        sormasCase: action.payload,
      };
    }

    default:
      return state;
  }
};

export default CommonReducer;

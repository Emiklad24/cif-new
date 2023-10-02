import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE, UPDATE_CASE,
  CREATE_CASE,
  FETCH_CASE} from '../../constants/ActionTypes'
import {TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "../../constants/ActionTypes";

const INIT_STATE = {
  error: "",
  loading: false,
  message: '',
  navCollapsed: true,
  width: window.innerWidth,
  pathname: '/',
  data: [],
  caseList: [],
  case: {},
};



const CommonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false
      }
    }
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case TOGGLE_COLLAPSED_NAV: {
      return {
        ...state,
        navCollapsed: action.navCollapsed
      }
    }
    case FETCH_START: {
      return {...state, error: '', message: '', loading: true};
    }
    case FETCH_SUCCESS: {
      return {...state, error: '', message: '', loading: false};
    }
    case SHOW_MESSAGE: {
      return {...state, error: '', message: action.payload, loading: false};
    }
    case FETCH_ERROR: {
      return {...state, loading: false, error: action.payload, message: ''};
    }
    case HIDE_MESSAGE: {
      return {...state, loading: false, error: '', message: ''};
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



    default:
      return state;
  }
}

export default CommonReducer;

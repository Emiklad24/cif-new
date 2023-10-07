import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE, UPDATE_CASE,
  CREATE_CASE,
  FETCH_CASE,FETCH_LOCAL_GOVERNMENT_AREA_LIST,
  FETCH_CASE_LIST,FETCH_STATE_LIST } from "../../constants/ActionTypes";
import { httpClient } from "util/Api";


export const fetchStart = () => {
  return {
    type: FETCH_START
  }
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  }
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error
  }
};

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  }
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
};



export const createCase = (formData) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    await httpClient
      .post(`cases-integration/`, formData)
      .then((res) => {
        dispatch(fetchSuccess("Successfully created"));
        dispatch({ type: CREATE_CASE, payload: res.data });
      })
      .catch((error) => {
        dispatch(fetchError(error));
        throw error;
      });
  };
};

// =========
export const updateCase = (id, formData) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    await httpClient
      .put(`cases-integration/${id}/`, formData)
      .then((res) => {
        dispatch(fetchSuccess("Facility successfully updated"));
        dispatch({ type: UPDATE_CASE, payload: res.data });
      })
      .catch((error) => {
        dispatch(fetchError(error));
        throw error;
      });
  };
};

/**
 * @function getCaseById
 * @param arg
 * @return object
 */
export const getCaseById = (arg) => {
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const { data } = await httpClient.get(`cases-integration/${arg}/`);
      dispatch({ type: FETCH_CASE, payload: data });
      dispatch(fetchSuccess());
      return data;
    } catch (error) {
      dispatch(fetchError(error.message));
      throw error;
    }
  };
};

// for getting State list
export const fetchStateList = (params) => {
  return async (dispatch) => {
    dispatch(fetchStart());
    await httpClient
      .get("/state/", { params })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: FETCH_STATE_LIST, payload: data.data });
        } else {
          dispatch(fetchError(data.error));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const fetchLocalGovernmentAreaList = (params) => {
  let _params = params
    ? `/local_government_area/?state=${params}`
    : "/local_government_area/";

  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const res = await httpClient.get(_params);
      dispatch(fetchSuccess());
      dispatch({
        type: FETCH_LOCAL_GOVERNMENT_AREA_LIST,
        payload: res.data,
      });
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};

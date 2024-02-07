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
  UPDATE_CASE,
  USER_ROLE,
} from "constants/ActionTypes";
import { httpClient } from "util/Api";
import {
  flattenNestedObjectAndRemoveEmpty,
  parseNestedDates,
} from "util/Helpers";

export const fetchStart = () => {
  return {
    type: FETCH_START,
  };
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
};

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
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
      .get("/states/", { params })
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
  const _params = params
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

/**
 * @function getSormasCaseAction
 * @description This function is used to get the form data from the api
 */
export const getSormasCaseAction = (params) => {
  const url = `cases-integration/${params}`;
  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const { data } = await httpClient.get(url);
      const parsedData = await flattenNestedObjectAndRemoveEmpty(data);
      await parseNestedDates(parsedData);
      dispatch({
        type: FETCH_SORMAS_DATA,
        payload: parsedData,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      const errorMessage = error.response.data ?? error.message;
      dispatch(fetchError(errorMessage));
      throw errorMessage;
    } finally {
      dispatch(fetchSuccess());
    }
  };
};

/**
 * @function updateSormasCaseAction
 * @description This function is used to update the form data from the api
 */
export const updateSormasCaseAction = (params, _data) => {
  const url = `cases-integration/${params}`;

  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const { data } = await httpClient.put(url, _data);
      dispatch(fetchSuccess());
      return data;
    } catch (error) {
      const errorMessage = error.response.data ?? error.message;
      dispatch(fetchError(error.message));
      throw errorMessage;
    } finally {
      dispatch(fetchSuccess());
    }
  };
};

/**
 * @function createSormasCaseAction
 * @description This function is used to create the sorams form data
 */
export const createSormasCaseAction = (_data) => {
  const url = `cases-integration`;

  return async (dispatch) => {
    try {
      dispatch(fetchStart());
      const { data } = await httpClient.post(url, _data);
      dispatch(fetchSuccess());
      return data;
    } catch (error) {
      const errorMessage = error.response.data ?? error.message;
      dispatch(fetchError(error.message));
      throw errorMessage;
    } finally {
      dispatch(fetchSuccess());
    }
  };
};

export const setUserRole = (params) => {
  return (dispatch) => {
    dispatch({
      type: USER_ROLE,
      payload: params,
    });
  };
};

import { Reducer } from "redux";

import { AppReducerState, AppTypes } from "./types";

const INITIAL_STATE: AppReducerState = {
  showLoader: false,
  showAlert: false,
  alertClass: "",
  alertText: "",
  isIdle: false,
  username: ""
};

const reducer: Reducer<AppReducerState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppTypes.TOGGLE_ALERT:
      return action.payload.show
        ? {
            ...state,
            showAlert: action.payload.show,
            alertText: action.payload.text ? action.payload.text : "",
            alertClass: action.payload.className ? action.payload.className : ""
          }
        : {
            ...state,
            showAlert: action.payload.show,
            alertText: "",
            alertClass: ""
          };
    case AppTypes.TOGGLE_LOADER:
      return {
        ...state,
        showLoader: action.payload
      };
    case AppTypes.IDLE:
      return {
        ...state,
        isIdle: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

import { Reducer } from "redux";
import { HomeModals, CallStatus } from "../../../models";
import { HomeReducerState, HomeTypes } from "./types";

const INITAL_MODALS: HomeModals = {
  createOpen: false,
  attendQueueModal: false
};

const INITIAL_FILTE: CallStatus = {
  type: ""
};

const INITIAL_STATE: HomeReducerState = {
  data: [],
  modals: INITAL_MODALS,
  filters: INITIAL_FILTE
};

const reducer: Reducer<HomeReducerState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeTypes.RECEIVE_DATA:
      return {
        ...state,
        data: action.payload
      };
    case HomeTypes.TOGGLE_CREATE_MODAL:
      return {
        ...state,
        modals: { ...state.modals, createOpen: !state.modals.createOpen }
      };
    case HomeTypes.TOGGLE_ATTEND_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          attendQueueModal: !state.modals.attendQueueModal
        }
      };
    case HomeTypes.CHANGE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;

import { Reducer } from "redux";
import { HomeModals } from "../../../models";
import { HomeReducerState, HomeTypes } from "./types";

const INITAL_MODALS: HomeModals = {
  createOpen: false,
  attendQueueModal: false
};

const INITIAL_STATE: HomeReducerState = {
  data: [],
  modals: INITAL_MODALS
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
    default:
      return state;
  }
};

export default reducer;

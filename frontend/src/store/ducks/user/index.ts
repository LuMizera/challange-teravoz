import { Reducer } from "redux";
import { UserReducerState, UserTypes } from "./types";

const INITIAL_STATE: UserReducerState = {
  ws: null
};

const reducer: Reducer<UserReducerState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.SET_WEBSOCKET:
      return {
        ...state,
        ws: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

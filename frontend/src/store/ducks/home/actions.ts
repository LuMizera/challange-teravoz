import { HomeTypes } from "./types";
import { Call } from "../../../models";

export const loadCalls = (payload: Call[]) => ({
  type: HomeTypes.RECEIVE_DATA,
  payload
});

export const toggleCreateModal = () => ({
  type: HomeTypes.TOGGLE_CREATE_MODAL
});

export const toggleAttendModal = () => ({
  type: HomeTypes.TOGGLE_ATTEND_MODAL
});

export const changeFilter = (payload: string) => ({
  type: HomeTypes.CHANGE_FILTER,
  payload
});

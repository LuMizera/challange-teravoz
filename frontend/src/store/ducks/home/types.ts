import { Call, HomeModals, CallStatus } from "../../../models";

export enum HomeTypes {
  RECEIVE_DATA = "@home/RECEIVE_DATA",
  TOGGLE_CREATE_MODAL = "@home/TOGGLE_CREATE_MODAL",
  TOGGLE_ATTEND_MODAL = "@home/TOGGLE_ATTEND_MODAL",
  CHANGE_FILTER = "@home/CHANGE_FILTER"
}

export interface HomeReducerState {
  readonly data: Call[];
  readonly modals: HomeModals;
  readonly filters: CallStatus;
}

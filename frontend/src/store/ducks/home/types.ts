import { Call, HomeModals } from "../../../models";

export enum HomeTypes {
  RECEIVE_DATA = "@home/RECEIVE_DATA",
  TOGGLE_CREATE_MODAL = "@home/TOGGLE_CREATE_MODAL",
  TOGGLE_ATTEND_MODAL = "@home/TOGGLE_ATTEND_MODAL"
}

export interface HomeReducerState {
  readonly data: Call[];
  readonly modals: HomeModals;
}

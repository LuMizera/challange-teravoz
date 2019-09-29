export enum AppTypes {
  ALERT = "@app/ALERT",
  TOGGLE_ALERT = "@app/TOGGLE_ALERT",
  TOGGLE_LOADER = "@app/LOADER",
  IDLE = "@app/IDLE"
}

export interface AppReducerState {
  showAlert: boolean;
  showLoader: boolean;
  alertText: string;
  alertClass: string;
  isIdle: boolean;
  username: string;
}

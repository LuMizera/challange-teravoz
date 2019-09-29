import { AppTypes } from "./types";
import { Alert } from "../../../models";

export const isIdle = (payload: boolean = true) => ({
  type: AppTypes.IDLE,
  payload
});

export const toggleAlert = (payload: Alert) => ({
  type: AppTypes.TOGGLE_ALERT,
  payload
});

export const toggleLoader = (payload: boolean = true) => ({
  type: AppTypes.TOGGLE_LOADER,
  payload
});

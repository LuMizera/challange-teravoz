import { UserTypes } from "./types";

export const setWebsocket = (payload: WebSocket) => ({
  type: UserTypes.SET_WEBSOCKET,
  payload
});

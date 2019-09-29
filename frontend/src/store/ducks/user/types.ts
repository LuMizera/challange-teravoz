export enum UserTypes {
  SET_WEBSOCKET = "@user/SET_WEBSOCKET"
}

export interface UserReducerState {
  readonly ws: WebSocket | null;
}

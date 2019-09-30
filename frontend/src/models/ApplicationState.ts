import { HomeReducerState } from "../store/ducks/home/types";
import { UserReducerState } from "../store/ducks/user/types";

export interface ApplicationState {
  home: HomeReducerState;
  user: UserReducerState;
}

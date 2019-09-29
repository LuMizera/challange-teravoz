import { AppReducerState } from "../store/ducks/app/types";
import { HomeReducerState } from "../store/ducks/home/types";
import { UserReducerState } from "../store/ducks/user/types";

export interface ApplicationState {
  app: AppReducerState;
  home: HomeReducerState;
  user: UserReducerState;
}

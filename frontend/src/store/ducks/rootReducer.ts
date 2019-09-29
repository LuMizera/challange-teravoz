import { combineReducers } from "redux";
import app from "./app";
import home from "./home";
import user from "./user";

export default combineReducers({
  app,
  home,
  user
});

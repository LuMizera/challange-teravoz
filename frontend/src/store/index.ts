import { createStore, Store } from "redux";

import rootReducer from "./ducks/rootReducer";

import { ApplicationState } from "../models";

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;

import { combineReducers } from "redux";
import { statsReducer } from "./stats/reducers";

export const rootReducer = combineReducers({
  canvasStats: statsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

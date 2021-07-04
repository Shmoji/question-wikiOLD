/* This is the Root Reducer */

import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import curQuestionReducer from "./curQuestionReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  curQuestionData: curQuestionReducer,
});
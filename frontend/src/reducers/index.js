import { combineReducers } from "redux";
import LoginReducer from "./login";
import AccountReducer from "./Account.reducer";

const allReducers = combineReducers({
    LoginReducer,
    AccountReducer
  
  });
  
  export default allReducers;
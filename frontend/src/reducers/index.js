import { combineReducers } from "redux";
import LoginReducer from "./login";
import AccountReducer from "./Account.reducer";
import UserReducer from "./User.reducer";

const allReducers = combineReducers({
    LoginReducer,
    AccountReducer,
    UserReducer
  
  });
  
  export default allReducers;
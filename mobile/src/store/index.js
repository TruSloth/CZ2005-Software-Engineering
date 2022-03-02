import authReducer from "./auth/reducers";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
})

export default store = createStore(rootReducer)
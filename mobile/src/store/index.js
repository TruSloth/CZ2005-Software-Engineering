import authReducer from "./auth/reducers";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
})

export default store = createStore(rootReducer, applyMiddleware(thunk))
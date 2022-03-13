import authReducer from "./auth/reducers";
import { combineReducers, createStore} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
    debug: true,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: persistReducer(
        {
            key: 'auth',
            storage: AsyncStorage,
            stateReconciler: hardSet,
            debug: true,
        }, authReducer
    ),
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const storeConfig = () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return {store, persistor}
}

export default storeConfig

//export default store = createStore(rootReducer)
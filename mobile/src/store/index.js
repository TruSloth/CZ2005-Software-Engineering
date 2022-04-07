import accountReducer from './account/reducers';
import socketReducer from './socket/reducers';
import {combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	stateReconciler: hardSet,
	debug: true,
	whitelist: ['account'],
};

const rootReducer = combineReducers({
	account: persistReducer(
		{
			key: 'account',
			storage: AsyncStorage,
			stateReconciler: hardSet,
			debug: true,
		},
		accountReducer
	),
	socket: socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeConfig = () => {
	let store = createStore(persistedReducer);
	let persistor = persistStore(store);
	return {store, persistor};
};

export default storeConfig;

//export default store = createStore(rootReducer)

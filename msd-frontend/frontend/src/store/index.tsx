import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import userReducer from './slices/userSlice';
import toastReducer from './slices/toatSlice';
import loadingReducer from './slices/loadingSlice';
// import locationReducer from './slices/locationSlice';
// import modalLoginReducer from './slices/modalLoginSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["user", "location", "modalLogin"]
}

const rootReducer = combineReducers({
    // user: userReducer,
    notifications: toastReducer,
    loading: loadingReducer,
    // location: locationReducer,
    // modalLogin: modalLoginReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware({
    //     serializableCheck: {
    //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    //     }
    // })
});
// export const persistor = persistStore(store);
export default store;
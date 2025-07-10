import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from "../reducers/login";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const reducers = combineReducers({ login });

const persistConfig = { key: "DeliThi", storage: AsyncStorage };

const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

type StoreProviderProps = {
    children: React.ReactNode;
  };

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

const Store = ({ children }:StoreProviderProps) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
            {children}
            </PersistGate>
        </Provider>
    );
};

export {Store}
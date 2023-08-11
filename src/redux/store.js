import { configureStore } from '@reduxjs/toolkit'
import { reducerEvents } from './slices/eventsSlice';
import { reducerSearch } from './slices/searchSlice';

import {
    persistStore,
    persistReducer,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
} from "redux-persist";

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
    key: 'event-planner',
    storage,
    // whitelist: ['search'],
}

const persistedEventsReducer = persistReducer(persistConfig, reducerEvents);
const persistedSearchReducer = persistReducer(persistConfig, reducerSearch);

export const store = configureStore({
    reducer: {
        events: persistedEventsReducer,
        search: persistedSearchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // },
        }),
    devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store);
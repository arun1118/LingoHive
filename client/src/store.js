import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import questionReducer from './slices/questionSlice.js';
import {apiSlice} from './slices/apiSlice.js';

const store=configureStore({
    reducer:{
        auth: authReducer,
        questions: questionReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true
});

export default store;
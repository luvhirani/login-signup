// store.ts
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './redux-services/slices/AuthSlice'; // Adjust the path accordingly

 export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});



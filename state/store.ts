import { configureStore } from '@reduxjs/toolkit';
import { exploreApi } from './services/explore/exploreApi';


export const store = configureStore({
    reducer: {
     [exploreApi.reducerPath]:exploreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(exploreApi.middleware),
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
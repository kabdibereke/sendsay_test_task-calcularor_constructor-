import { configureStore } from '@reduxjs/toolkit'
import dropReducer from './slices/dropSlice'
import elementReducer from './slices/canvasSlice'
import selectReducer from './slices/selectSlice'
import calcReducer from './slices/calcSlice'
export const store = configureStore({
  reducer: {
   dropList: dropReducer,
   elementList : elementReducer,
   selected: selectReducer,
   calc: calcReducer
  },

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
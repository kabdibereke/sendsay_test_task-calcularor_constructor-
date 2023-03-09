import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IElement } from '../../interface/interface'


interface IElements {
    elements: IElement[]
}

const initialState: IElements = {
    elements: [] 
}

export const ElementSlice = createSlice({
  name: 'drop',
  initialState,
  reducers: {
    addElement: (state, action) => {
        if (state.elements.find((obj) => obj.id === action.payload.id)) {
          return;
        } else {
          state.elements.push({
            ...action.payload,
          });
        }
    },
    removeElements: (state, action) => {
        state.elements =state.elements.filter(item=> item.id !==action.payload)
    },
  },
  
  
})


export const { addElement,removeElements} = ElementSlice.actions

export default ElementSlice.reducer
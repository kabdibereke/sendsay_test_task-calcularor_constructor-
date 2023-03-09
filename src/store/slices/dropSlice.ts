import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IDrop {
    displayIsDrop: boolean
    obIsDrop: boolean
    numBlockIsDrop: boolean
    equalIsDrop: boolean
}


const initialState: IDrop = {
    displayIsDrop:false,
    obIsDrop: false,
    numBlockIsDrop: false,
    equalIsDrop: false
}

export const DropSlice = createSlice({
  name: 'drop',
  initialState,
  reducers: {
    isDropDisplay: (state, action) => {
        state.displayIsDrop = action.payload   
    },
    isDropOB: (state, action) => {
        state.obIsDrop = action.payload   
    },
    isDropNumBlock: (state, action) => {
        state.numBlockIsDrop = action.payload   
    },
    isDropEqual: (state, action) => {
        state.equalIsDrop = action.payload   
    },
  },
  
  
})


export const { isDropDisplay,isDropOB,isDropNumBlock,isDropEqual} = DropSlice.actions

export default DropSlice.reducer